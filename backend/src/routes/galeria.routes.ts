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
enrutadorGaleria.route('/galeria-imagenes/:id_galeria').get(galeriacontroller.listarImgGaleria);
enrutadorGaleria.route('/agregar-imagenes-galeria/:id_galeria').put(multer.array('imagen'), galeriacontroller.agregarimagengaleria);
enrutadorGaleria.route('/galeria-imagenes-detalle/:id_gi/:public_id').delete(galeriacontroller.eliminarimagengaleria);
enrutadorGaleria.route('/galeriaimg/:id_galeria').delete(galeriacontroller.eliminargaleriaimg);
enrutadorGaleria.route('/galeriaimg/:id_galeria').put(galeriacontroller.actualizarGaleriaImg);
enrutadorGaleria.route('/galeria-portada/:id_gi').get(galeriacontroller.establecerPortada);

export default enrutadorGaleria;