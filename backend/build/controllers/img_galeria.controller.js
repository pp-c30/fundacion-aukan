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
exports.ImggaleriaController = void 0;
const database_1 = require("../database");
class ImggaleriaController {
    listarImggaleria(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = yield database_1.conexion();
            let imggaleria = yield db.query('select * from imagenes_galeria');
            return res.json(imggaleria);
        });
    }
    guardarImggaleria(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = yield database_1.conexion();
            const imgaleria = req.body;
            yield db.query('insert into imagenes_galeria set ?', [imgaleria]);
            return res.json('Los datos fueron guardados con exito');
        });
    }
    eliminarImggaleria(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = yield database_1.conexion();
            let id = req.params.id;
            yield db.query('delete from imagenes_galeria where id_gi = ?', [id]);
            return res.json('Los datos fueron eliminados con exito');
        });
    }
    actualizaImggaleria(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = yield database_1.conexion();
            let id = req.params.id;
            let imggaleria = req.body;
            yield db.query('update imagenes_galeria set ? where id_gi = ?', [imggaleria, id]);
            return res.json('Los datos fueron actualizados con exito');
        });
    }
    buscarImggaleria(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = yield database_1.conexion();
            let id = req.params.id;
            let imggaleria = yield db.query('select * from imagenes_galeria where id_gi = ?', [id]);
            return res.json(imggaleria[0]);
        });
    }
}
exports.ImggaleriaController = ImggaleriaController;
