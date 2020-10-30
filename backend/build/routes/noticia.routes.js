"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const noticia_controller_1 = require("../controllers/noticia.controller");
const multer_1 = __importDefault(require("../libs/multer"));
let noticiaController = new noticia_controller_1.NoticiaController();
const enrutadorNoticia = express_1.Router();
enrutadorNoticia.route('/noticia').get(noticiaController.listarNoticia);
enrutadorNoticia.route('/noticia').post(multer_1.default.single('imagen'), noticiaController.guardarNoticia);
enrutadorNoticia.route('/noticia/:id').delete(noticiaController.eliminarNoticia);
enrutadorNoticia.route('/noticia/:id').put(noticiaController.actualizarNoticia);
enrutadorNoticia.route('/noticia/:id').get(noticiaController.buscarNoticia);
exports.default = enrutadorNoticia;
