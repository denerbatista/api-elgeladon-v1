import {
  findPaletasService,
  findPaletaByIdService,
  createPaletaService,
  updatePaletaService,
  deletePaletaService,
  senhaPaletaService,
  segurancaPaletaService,
} from '../services/paletas.service.js';

let seguranca = [false, ''];

export const findPaletasController = (req, res) => {
  const allPaletas = findPaletasService();
  if (allPaletas.length == 0) {
    return res
      .status(400)
      .send({ mensagem: 'Não existe nehuma paleta cadastrada' });
  }
  res.send(allPaletas);
};

export const findPaletaByIdController = (req, res) => {
  const idParam = Number(req.params.id);
  const allPaletas = findPaletasService();
  if (!idParam || allPaletas.length < idParam) {
    return res.status(404).send({ mensagem: 'Paleta não encontrada!' });
  }
  const chosenPaleta = findPaletaByIdService(idParam);
  res.send(chosenPaleta);
};

export const createPaletaController = (req, res) => {
  const params = req.params
  const token = params.token
  console.log(token);
  if (seguranca[0] == true && token == seguranca[1]){
    const paleta = req.body;
    if (
      !paleta ||
      !paleta.sabor ||
      !paleta.descricao ||
      !paleta.foto ||
      !paleta.preco
    ) {
      return res.status(400).send({
        mensagem:
          'Você não preencheu todos os dados para adicionar uma nova paleta ao cardápio!',
      });
    }
    const newPaleta = createPaletaService(paleta);
    res.status(201).send(newPaleta);
  } else {
    return res
      .status(404)
      .send({ mensagem: 'Acesso bloqueado, insira senha de administrador' });
  }
};

export const updatePaletaController = async (req, res) => {
  const params = req.params
  const token = params.token
  console.log(token);
  if (seguranca[0] == true && token == seguranca[1]){
    const idParam = Number(params.id);
    const paletaEdit = req.body;
    const allPaletas = findPaletasService();
    if (!idParam || allPaletas.length < idParam) {
      return res.status(404).send({ mensagem: 'Paleta não encontrada!' });
    }

    if (
      !paletaEdit ||
      !paletaEdit.sabor ||
      !paletaEdit.descricao ||
      !paletaEdit.foto ||
      !paletaEdit.preco
    ) {
      return res.status(400).send({
        mensagem: 'Você não preencheu todos os dados para editar a paleta!',
      });
    } else {
      const updatedPaleta = updatePaletaService(idParam, paletaEdit);
      res.send(updatedPaleta);
    }
  } else {
    return res
      .status(404)
      .send({ mensagem: 'Acesso bloqueado, insira senha de administrador' });
  }
};

export const deletePaletaController = (req, res) => {
  const params = req.params
  const token = params.token
  console.log(token)
  if (seguranca[0] == true && token == seguranca[1]) {
    const idParam = Number(params.id);
    console.log(idParam)
    if (!idParam) {
      return res.status(404).send({ mensagem: 'Paleta não encontrada!' });
    }
    deletePaletaService(idParam);
    return res.send({ mensagem: 'Paleta deletada com sucesso!' });
  } else {
    return res
      .status(404)
      .send({ mensagem: 'Acesso bloqueado, insira senha de administrador' });
  }
};

export const senhaPaletaController = (req, res) => {
  if (seguranca[0] == false) {
    const senhaParams = req.params;
    const senha = senhaParams.senha;
    const token = senhaParams.token;
    seguranca[0] = senhaPaletaService(senha);
    if (seguranca[0] == true) {
      seguranca[1] = token;
      setTimeout(() => {
        seguranca = false;
        console.log('senha expirada');
        seguranca[1] = '';
      }, 1800000);
      return res.send({
        mensagem: `Acesso Liberado`,
        token: `${Number(seguranca[1])}`,
      });
    } else {
      res.status(400).send({ mensagem: 'Senha inválida !' });
    }
  } else {
    const senhaParams = req.params;
    const token = senhaParams.token;
    if (seguranca[1] == token) {
      seguranca[0] = false;
      seguranca[1] = '';
      return res.send({
        mensagem: 'Acesso bloqueado com sucesso !',
        token: '',
      });
    } else if (seguranca[1] != token || !token) {
      res.send({ mensagem: 'Administrador já logado em outro local !' });
    }
  }
};

export const segurancaPaletaController = (req, res) => {
  const resposta = req.params.token;
  console.log(resposta);
  const statusSeguranca = segurancaPaletaService(
    seguranca[1],
    resposta,
    seguranca[0],
  );
  if (statusSeguranca == resposta) {
    return res.send({
      mensagem: 'Você já está logado digite a senha para sair.',
      token: `${Number(statusSeguranca)}`,
    });
  } else {
    if (statusSeguranca == 0) {
      return res.send({
        mensagem: 'Administrador já esta logado mas tenta a sorte ai ;)',
        token: `${Number(statusSeguranca)}`,
      });
    } else {
      return res.send({
        mensagem: 'Você ainda não esta logado digite a senha pra entrar.',
        token: `${Number(statusSeguranca)}`,
      });
    }
  }
};
