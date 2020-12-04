"use strict";
var __awaiter = (this && this.__awaiter) || function(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function(resolve) { resolve(value); }); }
    return new(P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }

        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }

        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CatprevencionController = void 0;
const database_1 = require("../database");
class CatprevencionController {
    listarCatprevencion(req, res) {
        return __awaiter(this, void 0, void 0, function*() {
            const db = yield database_1.conexion();
            let catprevencion = yield db.query('select * from categoria_prevencion');
            return res.json(catprevencion);
        });
    }
    guardarCatprevencion(req, res) {
        return __awaiter(this, void 0, void 0, function*() {
            const db = yield database_1.conexion();
            const catprevencion = req.body;
            yield db.query('insert into categoria_prevencion set ?', [catprevencion]);
            return res.json('Los datos fueron guardados con exito');
        });
    }
    eliminarCatprevencion(req, res) {
        return __awaiter(this, void 0, void 0, function*() {
            const db = yield database_1.conexion();
            let id = req.params.id;
            yield db.query('delete from categoria_prevencion where id_cp = ?', [id]);
            return res.json('Los datos fueron eliminados con exito');
        });
    }
    actualizarCatprevencion(req, res) {
        return __awaiter(this, void 0, void 0, function*() {
            const db = yield database_1.conexion();
            let id = req.params.id;
            let catprevencionActualizada = req.body;
            yield db.query('update categoria_prevencion set ? where id_cp = ?', [catprevencionActualizada, id]);
            return res.json('Los datos fueron actualizados con exito');
        });
    }
    buscarCatprevencion(req, res) {
        return __awaiter(this, void 0, void 0, function*() {
            const db = yield database_1.conexion();
            let id = req.params.id;
            let catprevencion = yield db.query('select * from categoria_prevencion where id_cp = ?', [id]);
            return res.json(catprevencion[0]);
        });
    }
}
exports.CatprevencionController = CatprevencionController;