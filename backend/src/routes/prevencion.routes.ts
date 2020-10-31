import { Router } from "express";
import { PrevencionController } from "../controllers/prevencion.controller";
import multer from "../libs/multer";

let prevencionController = new PrevencionController();

const enrutadorPrevencion = Router();

enrutadorPrevencion.route('/prevencion').get(prevencionController.listarPrevencion);
enrutadorPrevencion.route('/prevencion').post(multer.single('imagen'),prevencionController.guardarPrevencion);
enrutadorPrevencion.route('/prevencion/:id').delete(prevencionController.eliminarPrevencion);
enrutadorPrevencion.route('/prevencion/:id').put(prevencionController.actualizarPrevencion);
enrutadorPrevencion.route('/prevencion/:id').get(prevencionController.buscarPrevencion);

export default enrutadorPrevencion;