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
exports.PrevencionController = void 0;
const database_1 = require("../database");
class PrevencionController {
    listarPrevencion(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = yield database_1.conexion();
            let prevencion = yield db.query('select * from prevencion');
            return res.json(prevencion);
        });
    }
    guardarPrevencion(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = yield database_1.conexion();
            const prevencion = req.body;
            yield db.query('inset into prevencion set ?', [prevencion]);
            return res.json('Los datos fueron guardados con exito');
        });
    }
    eliminarPrevencion(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = yield database_1.conexion();
            let id = req.params.id;
            yield db.query('delete from prevencion where id_prevencion = ?', [id]);
            return res.json('Los datos fueron eliminados con exito');
        });
    }
    actualizarPrevencion(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = yield database_1.conexion();
            let id = req.params.id;
            let prevencionActualizada = req.body;
            yield db.query('update prevencion set ? where id_prevencion = ?', [prevencionActualizada, id]);
            return res.json('Los datos fueron actualizados con exito');
        });
    }
    buscarPrevencion(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = yield database_1.conexion();
            let id = req.params.id;
            let prevencion = yield db.query('select * from prevencion where id_prevencion = ?', [id]);
            return res.json(prevencion[0]);
        });
    }
}
exports.PrevencionController = PrevencionController;
