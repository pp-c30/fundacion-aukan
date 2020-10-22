import { Router } from "express";
import { CatprevencionController } from "../controllers/cat_prevencion.controller";

let catprevencionController = new CatprevencionController();

const enrutadorCatprevencion = Router();

enrutadorCatprevencion.route('/actividades').get(catprevencionController.listarCatprevencion);
enrutadorCatprevencion.route('/actividades').post(catprevencionController.guardarCatprevencion);
enrutadorCatprevencion.route('/actividades/:id').delete(catprevencionController.eliminarCatprevencion);
enrutadorCatprevencion.route('actividades/:id').put(catprevencionController.actualizarCatprevencion);
enrutadorCatprevencion.route('/actividades/:id').get(catprevencionController.buscarCatprevencion);

export default enrutadorCatprevencion;