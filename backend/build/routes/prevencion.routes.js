"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const prevencion_controller_1 = require("../controllers/prevencion.controller");
const multer_1 = __importDefault(require("../libs/multer"));
const verificarToken_1 = require("../libs/verificarToken");
let prevencionController = new prevencion_controller_1.PrevencionController();
const enrutadorPrevencion = express_1.Router();
enrutadorPrevencion.route('/prevencion').get(verificarToken_1.validarToken, prevencionController.listarPrevencion);
enrutadorPrevencion.route('/prevencion-public').get(prevencionController.listarPrevencionpublic);
enrutadorPrevencion.route('/prevencion').post(multer_1.default.single('imagen'), prevencionController.guardarPrevencion);
enrutadorPrevencion.route('/prevencion/:id/:public_id').delete(prevencionController.eliminarPrevencion);
enrutadorPrevencion.route('/prevencion/:id').put(multer_1.default.single('imagen'), prevencionController.actualizarPrevencion);
enrutadorPrevencion.route('/prevencion/:id').get(prevencionController.buscarPrevencion);
exports.default = enrutadorPrevencion;
