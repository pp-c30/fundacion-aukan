"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImgactividadesController = void 0;
const database_1 = require("../database");
class ImgactividadesController {
    listarImgactividades(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = yield database_1.conexion();
            let imgactividades = yield db.query('select * from imagenes_actividades');
            return res.json(imgactividades);
        });
    }
    guardarImgactividades(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = yield database_1.conexion();
            const imgactividades = req.body;
            yield db.query('inset into imagenes_actividades set ?', [imgactividades]);
            return res.json('Los datos fueron guardados con exito');
        });
    }
    eliminarImgactividades(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = yield database_1.conexion();
            let id = req.params.id;
            yield db.query('delete from imagenes_actividades where id_ai = ?', [id]);
            return res.json('Los datos fueron eliminados con exito');
        });
    }
    actualizaImgactividades(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = yield database_1.conexion();
            let id = req.params.id;
            let imgactividadesActualizada = req.body;
            yield db.query('update imagenes_actividades set ? where id_ai = ?', [imgactividadesActualizada, id]);
            return res.json('Los datos fueron actualizados con exito');
        });
    }
    buscarImgactividades(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = yield database_1.conexion();
            let id = req.params.id;
            let imgactividades = yield db.query('select * from imagenes_actividades where id_ai = ?', [id]);
            return res.json(imgactividades[0]);
        });
    }
}
exports.ImgactividadesController = ImgactividadesController;
