import { Router } from "express";
import { ActividadesController } from "../controllers/actividades.controller";
import multer from "../libs/multer";
let actividadesController = new ActividadesController();

const enrutadorActividades = Router();

enrutadorActividades.route('/actividades').get(actividadesController.listarActividad);
enrutadorActividades.route('/actividades').post(multer.array('imagen'),actividadesController.guardarActividad);
enrutadorActividades.route('/actividades/:id').delete(actividadesController.eliminarActividad);
enrutadorActividades.route('/actividades/:id').put(actividadesController.actualizarActividad);
enrutadorActividades.route('/actividades/:id').get(actividadesController.buscarActividad);

export default enrutadorActividades;  

