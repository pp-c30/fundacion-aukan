"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const galeria_controller_1 = require("../controllers/galeria.controller");
const multer_1 = __importDefault(require("../libs/multer"));
const verificarToken_1 = require("../libs/verificarToken");
let galeriacontroller = new galeria_controller_1.Galeriacontroller;
const enrutadorGaleria = express_1.Router();
enrutadorGaleria.route('/galeria-public').get(galeriacontroller.listargaleria);
enrutadorGaleria.route('/galeria').get(verificarToken_1.validarToken, galeriacontroller.listargaleria);
enrutadorGaleria.route('/galeria').post(multer_1.default.array('imagen'), galeriacontroller.guardargaleria);
enrutadorGaleria.route('/galeria/:id').delete(galeriacontroller.eliminargaleria);
enrutadorGaleria.route('/galeria/:id').put(galeriacontroller.actualizargaleria);
enrutadorGaleria.route('/galeria/:id').get(galeriacontroller.buscargaleria);
enrutadorGaleria.route('/galeria-imagenes/:id_galeria').get(galeriacontroller.listarImgGaleria);
enrutadorGaleria.route('/agregar-imagenes-galeria/:id_galeria').put(multer_1.default.array('imagen'), galeriacontroller.agregarimagengaleria);
enrutadorGaleria.route('/galeria-imagenes-detalle/:id_gi/:public_id').delete(galeriacontroller.eliminarimagengaleria);
enrutadorGaleria.route('/galeriaimg/:id_galeria').delete(galeriacontroller.eliminargaleriaimg);
enrutadorGaleria.route('/galeriaimg/:id_galeria').put(galeriacontroller.actualizarGaleriaImg);
enrutadorGaleria.route('/galeria-portada/:id_gi/:id_galeria').get(galeriacontroller.establecerPortada);
exports.default = enrutadorGaleria;
