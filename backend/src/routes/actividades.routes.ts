import { Router } from "express";
import { ActividadesController } from "../controllers/actividades.controller";
import multer from "../libs/multer";
import { validarToken } from '../libs/verificarToken';

let actividadesController = new ActividadesController();

const enrutadorActividades = Router();

enrutadorActividades.route('/actividades').get(validarToken,actividadesController.listarActividad);
enrutadorActividades.route('/actividades-public').get(actividadesController.listarActividad);
enrutadorActividades.route('/actividades').post(multer.array('imagen'),actividadesController.guardarActividad);
enrutadorActividades.route('/actividades/:id').delete(actividadesController.eliminarActividad);
enrutadorActividades.route('/actividades/:id').put(actividadesController.actualizarActividad);
enrutadorActividades.route('/actividades/:id').get(actividadesController.buscarActividad);
enrutadorActividades.route('/actividades-imagenes/:id_actividad').get(actividadesController.listarImgActividad);
enrutadorActividades.route('/agregar-imagenes-actividad/:id_actividad').put(multer.array('imagen'), actividadesController.agregarimagenactividad);
enrutadorActividades.route('/actividad-imagenes-detalle/:id_ai/:public_id').delete(actividadesController.eliminarimagenactividad);
enrutadorActividades.route('/actividadimg/:id_actividades').delete(actividadesController.eliminaractividadesimg);
enrutadorActividades.route('/actividadesimg/:id_actividad').put(actividadesController.actualizarActividadesImg);
enrutadorActividades.route('/actividad-portada/:id_ai/:id_actividad').get(actividadesController.establecerPortada);

export default enrutadorActividades;  

