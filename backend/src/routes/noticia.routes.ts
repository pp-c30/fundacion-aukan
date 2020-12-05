import { Router } from "express";
import { NoticiaController } from "../controllers/noticia.controller";
import multer from "../libs/multer";


let noticiaController = new NoticiaController();

const enrutadorNoticia = Router();

enrutadorNoticia.route('/noticia').get(noticiaController.listarNoticia);
enrutadorNoticia.route('/noticia').post(multer.single('imagen'),noticiaController.guardarNoticia);
enrutadorNoticia.route('/noticia/:id/:public_id').delete(noticiaController.eliminarNoticia);
enrutadorNoticia.route('/noticia/:id').put(multer.single('imagen'),noticiaController.actualizarNoticia);
enrutadorNoticia.route('/noticia/:id').get(noticiaController.listarUnaNoticia);

export default enrutadorNoticia;