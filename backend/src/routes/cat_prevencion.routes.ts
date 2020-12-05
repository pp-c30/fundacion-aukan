import { Router } from "express";
import { CatprevencionController } from "../controllers/cat_prevencion.controller";

let catprevencionController = new CatprevencionController();

const enrutadorCatprevencion = Router();

enrutadorCatprevencion.route('/catprevencion').get(catprevencionController.listarCatprevencion);
enrutadorCatprevencion.route('/catprevencion').post(catprevencionController.guardarCatprevencion);
enrutadorCatprevencion.route('/catprevencion/:id').delete(catprevencionController.eliminarCatprevencion);
enrutadorCatprevencion.route('/catprevencion/:id').put(catprevencionController.actualizarCatprevencion);
enrutadorCatprevencion.route('/catprevencion/:id').get(catprevencionController.buscarCatprevencion);

export default enrutadorCatprevencion;