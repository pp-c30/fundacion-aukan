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
exports.ActividadesController = void 0;
const database_1 = require("../database");
class ActividadesController {
    listarActividad(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = yield database_1.conexion();
            let actividad = yield db.query('select * from actividad');
            return res.json(actividad);
        });
    }
    guardarActividad(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = yield database_1.conexion();
            const actividad = req.body;
            yield db.query('inset into actividades set ?', [actividad]);
            return res.json('La actividad fue guardada con exito');
        });
    }
    eliminarActividad(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = yield database_1.conexion();
            let id = req.params.id;
            yield db.query('delete from actividades where id_actividades = ?', [id]);
            return res.json('La actividad fue eliminada con exito');
        });
    }
    actualizarActividad(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = yield database_1.conexion();
            let id = req.params.id;
            let actividadActualizada = req.body;
            yield db.query('update actividades set ? where id_actividades = ?', [actividadActualizada, id]);
            return res.json('La actividad se a actualizado con exito');
        });
    }
    buscarActividad(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = yield database_1.conexion();
            let id = req.params.id;
            let actividad = yield db.query('select * from actividades where id_actividades = ?', [id]);
            return res.json(actividad[0]);
        });
    }
}
exports.ActividadesController = ActividadesController;
