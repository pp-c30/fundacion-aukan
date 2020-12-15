"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cat_noticiascontroller_1 = require("../controllers/cat_noticiascontroller");
/*se importa el archivo verificartoken y luego se utiliza la funcion validarToken
para proteger la routa que se quiera proteger*/
const verificarToken_1 = require("../libs/verificarToken");
let catnoticiacontroller = new cat_noticiascontroller_1.Catnoticiacontroller;
const enrutadorCatnoticia = express_1.Router();
enrutadorCatnoticia.route('/catnoticia').get(verificarToken_1.validarToken, catnoticiacontroller.listarcatnoticias);
enrutadorCatnoticia.route('/catnoticia').post(catnoticiacontroller.guardarcatnoticias);
enrutadorCatnoticia.route('/catnoticia/:id').delete(catnoticiacontroller.eliminarcatnoticia);
enrutadorCatnoticia.route('/catnoticia/:id').put(catnoticiacontroller.actualizarcatnoticia);
enrutadorCatnoticia.route('/catnoticia/:id').get(catnoticiacontroller.buscarcatnoticia);
exports.default = enrutadorCatnoticia;
