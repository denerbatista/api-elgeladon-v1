import {
  findPaletasService,
  findPaletaByIdService,
  createPaletaService,
  updatePaletaService,
  deletePaletaService,
  senhaPaletaService,
  segurancaPaletaService
} from '../services/paletas.service.js';

export let seguranca = false;

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
  if (seguranca == true) {
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
}else{
  return res
      .status(404)
      .send({ mensagem: 'Acesso bloqueado, insira senha de administrador' });
}
};

export const updatePaletaController = async (req, res) => {
  if (seguranca == true) {
    const idParam = Number(req.params.id);
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
  if (seguranca == true) {
    const idParam = Number(req.params.id);
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
  if (seguranca == false) {
    const senhaParams = req.params.senha;
    const resultado = senhaPaletaService(senhaParams);
    if (resultado == true) {
      res.send({ mensagem: 'Acesso liberado !' });
      return (seguranca = true);
    } else {
      res.status(400).send({ mensagem: 'Senha invalida !' });
    }
  } else {
    res.send({ mensagem: 'Acesso bloqueado com sucesso !' });
    return (seguranca = false);
  }
};

export const segurancaPaletaController=(req,res)=>{
  const statusSeguranca = segurancaPaletaService(seguranca)
  if(statusSeguranca==true){
    return res.send({ mensagem: 'Aberto' }); 
  }else{
    return res.send({ mensagem: 'Fechado' });
  }
}
