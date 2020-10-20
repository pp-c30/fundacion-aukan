"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cat_galeria_controller_1 = require("../controllers/cat_galeria.controller");
let catgaleriacontroller = new cat_galeria_controller_1.Catgaleriacontroller;
const enrutadorCatgaleria = express_1.Router();
enrutadorCatgaleria.route('/catgaleria').get(catgaleriacontroller.listarcatgaleria);
exports.default = enrutadorCatgaleria;
