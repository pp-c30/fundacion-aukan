"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const prevencion_controller_1 = require("../controllers/prevencion.controller");
const multer_1 = __importDefault(require("../libs/multer"));
let prevencionController = new prevencion_controller_1.PrevencionController();
const enrutadorPrevencion = express_1.Router();
enrutadorPrevencion.route('/prevencion').get(prevencionController.listarPrevencion);
enrutadorPrevencion.route('/prevencion').post(multer_1.default.single('imagen'), prevencionController.guardarPrevencion);
enrutadorPrevencion.route('/prevencion/:id/:public_id').delete(prevencionController.eliminarPrevencion);
enrutadorPrevencion.route('/prevencion/:id').put(multer_1.default.single('imagen'), prevencionController.actualizarPrevencion);
enrutadorPrevencion.route('/prevencion/:id').get(prevencionController.buscarPrevencion);
exports.default = enrutadorPrevencion;
