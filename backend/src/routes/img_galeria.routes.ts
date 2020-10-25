import { Router } from "express";
import { ImggaleriaController } from '../controllers/img_galeria.controller';

let imggaleria = new ImggaleriaController;

const enrutadorimggaleria = Router();

enrutadorimggaleria.route('/imggaleria').get(imggaleria.listarImggaleria);
enrutadorimggaleria.route('/imggaleria').post(imggaleria.guardarImggaleria);
enrutadorimggaleria.route('/imggaleria/:id').delete(imggaleria.eliminarImggaleria);
enrutadorimggaleria.route('/imggaleria/:id').put(imggaleria.actualizaImggaleria);
enrutadorimggaleria.route('/imggaleria/:id').get(imggaleria.buscarImggaleria);

export default enrutadorimggaleria