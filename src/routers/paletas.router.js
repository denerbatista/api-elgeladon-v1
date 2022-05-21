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
router.post('/create', createPaletaController);
router.put('/update/:id', updatePaletaController);
router.delete('/delete/:id', deletePaletaController);
router.get('/seguranca/:senha', senhaPaletaController);
router.get('/seguranca', segurancaPaletaController)
