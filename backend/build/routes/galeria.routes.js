"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const galeria_controller_1 = require("../controllers/galeria.controller");
const multer_1 = __importDefault(require("../libs/multer"));
let galeriacontroller = new galeria_controller_1.Galeriacontroller;
const enrutadorGaleria = express_1.Router();
enrutadorGaleria.route('/galeria').get(galeriacontroller.listargaleria);
enrutadorGaleria.route('/galeria').post(multer_1.default.array('imagen'), galeriacontroller.guardargaleria);
enrutadorGaleria.route('/galeria/:id').delete(galeriacontroller.eliminargaleria);
enrutadorGaleria.route('/galeria/:id').put(galeriacontroller.actualizargaleria);
enrutadorGaleria.route('/galeria/:id').get(galeriacontroller.buscargaleria);
exports.default = enrutadorGaleria;
