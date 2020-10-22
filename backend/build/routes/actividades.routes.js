"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const actividades_controller_1 = require("../controllers/actividades.controller");
let actividadesController = new actividades_controller_1.ActividadesController();
const enrutadorActividades = express_1.Router();
enrutadorActividades.route('/actividades').get(actividadesController.listarActividad);
enrutadorActividades.route('/actividades').post(actividadesController.guardarActividad);
enrutadorActividades.route('/actividades/:id').delete(actividadesController.eliminarActividad);
enrutadorActividades.route('actividades/:id').put(actividadesController.actualizarActividad);
enrutadorActividades.route('/actividades/:id').get(actividadesController.buscarActividad);
exports.default = enrutadorActividades;
