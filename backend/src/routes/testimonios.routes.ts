import { Router } from "express";
import { TestimoniosController } from "../controllers/testimonios.controller"; 

let testimoniosController = new TestimoniosController();

const enrutadorTestimonios = Router();

enrutadorTestimonios.route('/testimonios').get(testimoniosController.listarTestimonios);
enrutadorTestimonios.route('/testimonios').post(testimoniosController.guardarTestimonios);
enrutadorTestimonios.route('/testimonios/:id').delete(testimoniosController.eliminarTestimonios);
enrutadorTestimonios.route('/testimonios/:id').put(testimoniosController.actualizarTestimonios);
enrutadorTestimonios.route('/testimonios/:id').get(testimoniosController.buscarTestimonios);

export default enrutadorTestimonios;