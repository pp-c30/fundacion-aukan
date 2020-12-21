import { Router } from "express";
import { PrevencionController } from "../controllers/prevencion.controller";
import multer from "../libs/multer";
import { validarToken } from '../libs/verificarToken';
let prevencionController = new PrevencionController();

const enrutadorPrevencion = Router();

enrutadorPrevencion.route('/prevencion').get(validarToken,prevencionController.listarPrevencion);
enrutadorPrevencion.route('/prevencion-public').get(prevencionController.listarPrevencionpublic);
enrutadorPrevencion.route('/prevencion').post(multer.single('imagen'),prevencionController.guardarPrevencion);
enrutadorPrevencion.route('/prevencion/:id/:public_id').delete(prevencionController.eliminarPrevencion);
enrutadorPrevencion.route('/prevencion/:id').put(multer.single('imagen'),prevencionController.actualizarPrevencion);
enrutadorPrevencion.route('/prevencion/:id').get(prevencionController.buscarPrevencion);

export default enrutadorPrevencion;