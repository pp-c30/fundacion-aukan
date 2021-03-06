"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cat_donaciones_controller_1 = require("../controllers/cat_donaciones.controller");
let catdonacionescontroller = new cat_donaciones_controller_1.Catdonacionescontroller;
const enrutadorcatdonaciones = express_1.Router();
enrutadorcatdonaciones.route('/catdonaciones').get(catdonacionescontroller.listarcatdonaciones);
enrutadorcatdonaciones.route('/catdonaciones').post(catdonacionescontroller.guardarcatdonaciones);
enrutadorcatdonaciones.route('/catdonaciones/:id').delete(catdonacionescontroller.eliminarcatdonaciones);
enrutadorcatdonaciones.route('/catdonaciones/:id').put(catdonacionescontroller.actualizarcatdonaciones);
enrutadorcatdonaciones.route('/catdonaciones/:id').get(catdonacionescontroller.buscarcatdonaciones);
exports.default = enrutadorcatdonaciones;
