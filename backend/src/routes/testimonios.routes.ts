import { Router } from "express";
import { TestimoniosController } from "../controllers/testimonios.controller"; 
import multer from "../libs/multer";

let testimoniosController = new TestimoniosController();

const enrutadorTestimonios = Router();

enrutadorTestimonios.route('/testimonios').get(testimoniosController.listarTestimonios);
enrutadorTestimonios.route('/testimonios').post(multer.single('imagen'),testimoniosController.guardarTestimonios);
enrutadorTestimonios.route('/testimonios/:id/:public_id').delete(testimoniosController.eliminarTestimonios);
enrutadorTestimonios.route('/testimonios/:id').put(multer.single('imagen'),testimoniosController.actualizarTestimonios);
enrutadorTestimonios.route('/testimonios/:id').get(testimoniosController.listarUnTestimonio);

export default enrutadorTestimonios; 