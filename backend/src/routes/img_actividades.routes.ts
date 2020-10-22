import { Router } from "express";
import { ImgactividadesController } from "../controllers/img_actividades.controller";

let imgactividadesController = new ImgactividadesController();

const enrutadorImgactividades = Router();

enrutadorImgactividades.route('/imgactividades').get(imgactividadesController.listarImgactividades);
enrutadorImgactividades.route('/imgactividades').post(imgactividadesController.guardarImgactividades);
enrutadorImgactividades.route('/imgactividades/:id').delete(imgactividadesController.eliminarImgactividades);
enrutadorImgactividades.route('/imgactividades/:id').put(imgactividadesController.actualizaImgactividades);
enrutadorImgactividades.route('/imgactividades/:id').get(imgactividadesController.buscarImgactividades);

export default enrutadorImgactividades;
