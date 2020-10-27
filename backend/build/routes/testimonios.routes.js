"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const testimonios_controller_1 = require("../controllers/testimonios.controller");
const multer_1 = __importDefault(require("../libs/multer"));
let testimoniosController = new testimonios_controller_1.TestimoniosController();
const enrutadorTestimonios = express_1.Router();
enrutadorTestimonios.route('/testimonios').get(testimoniosController.listarTestimonios);
enrutadorTestimonios.route('/testimonios').post(multer_1.default.single('imagen'), testimoniosController.guardarTestimonios);
enrutadorTestimonios.route('/testimonios/:id').delete(testimoniosController.eliminarTestimonios);
enrutadorTestimonios.route('/testimonios/:id').put(testimoniosController.actualizarTestimonios);
enrutadorTestimonios.route('/testimonios/:id').get(testimoniosController.buscarTestimonios);
exports.default = enrutadorTestimonios;
