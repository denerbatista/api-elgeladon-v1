import {
  findPaletasController,
  findPaletaByIdController,
  createPaletaController,
  updatePaletaController,
  deletePaletaController,
  senhaPaletaController,
  segurancaPaletaController
} from '../controllers/paletas.controller.js';
import {Router}  from 'express';

export const router = Router();

router.get('/find-paletas', findPaletasController);
router.get('/find-paleta/:id', findPaletaByIdController);
router.post('/create/:token', createPaletaController);
router.put('/update/:id,:token', updatePaletaController);
router.delete('/delete/:id,:token', deletePaletaController);
router.get('/seguranca/:senha,:token', senhaPaletaController);
router.get('/segurancaverific/:token', segurancaPaletaController)
