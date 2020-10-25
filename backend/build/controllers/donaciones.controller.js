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
exports.DonacionesController = void 0;
const database_1 = require("../database");
class DonacionesController {
    listarDonaciones(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = yield database_1.conexion();
            let donaciones = yield db.query('select * from donaciones');
            return res.json(donaciones);
        });
    }
    guardarDonaciones(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = yield database_1.conexion();
            const donaciones = req.body;
            yield db.query('insert into donaciones set ?', [donaciones]);
            return res.json('Los datos fueron guardados con exito');
        });
    }
    eliminarDonaciones(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = yield database_1.conexion();
            let id = req.params.id;
            yield db.query('delete from donaciones where id_donacion = ?', [id]);
            return res.json('Los datos fueron eliminados con exito');
        });
    }
    actualizarDonaciones(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = yield database_1.conexion();
            let id = req.params.id;
            let donacionesActualizada = req.body;
            yield db.query('update donaciones set ? where id_donacion = ?', [donacionesActualizada, id]);
            return res.json('Los datos fueron actualizados con exito');
        });
    }
    buscarDonaciones(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = yield database_1.conexion();
            let id = req.params.id;
            let donaciones = yield db.query('select * from donaciones where id_donacion = ?', [id]);
            return res.json(donaciones[0]);
        });
    }
}
exports.DonacionesController = DonacionesController;
