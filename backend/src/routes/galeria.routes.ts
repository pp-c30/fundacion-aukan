import { Router } from "express";
import {Galeriacontroller}  from "../controllers/galeria.controller";
import multer from "../libs/multer";
let galeriacontroller = new Galeriacontroller;

const enrutadorGaleria = Router();

enrutadorGaleria.route('/galeria').get(galeriacontroller.listargaleria);
enrutadorGaleria.route('/galeria').post(multer.array('imagen'),galeriacontroller.guardargaleria);
enrutadorGaleria.route('/galeria/:id').delete(galeriacontroller.eliminargaleria);
enrutadorGaleria.route('/galeria/:id').put(galeriacontroller.actualizargaleria);
enrutadorGaleria.route('/galeria/:id').get(galeriacontroller.buscargaleria);

export default enrutadorGaleria;