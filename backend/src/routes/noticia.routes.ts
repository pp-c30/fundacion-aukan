import { Router } from "express";
import { NoticiaController } from "../controllers/noticia.controller";
import multer from "../libs/multer";


let noticiaController = new NoticiaController();

const enrutadorNoticia = Router();

enrutadorNoticia.route('/noticia').get(noticiaController.listarNoticia);
enrutadorNoticia.route('/noticia').post(multer.single('imagen'),noticiaController.guardarNoticia);
enrutadorNoticia.route('/noticia/:id').delete(noticiaController.eliminarNoticia);
enrutadorNoticia.route('/noticia/:id').put(noticiaController.actualizarNoticia);
enrutadorNoticia.route('/noticia/:id').get(noticiaController.buscarNoticia);

export default enrutadorNoticia;