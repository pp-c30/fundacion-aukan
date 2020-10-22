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
exports.Galeriacontroller = void 0;
const database_1 = require("../database");
class Galeriacontroller {
    listargaleria(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = yield database_1.conexion();
            let galeria = yield db.query('select * from galeria');
            return res.json(galeria);
        });
    }
    guardargaleria(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = yield database_1.conexion();
            const galeria = req.body;
            yield db.query("insert into galeria set ?", [galeria]);
            return res.json('los datos se ingresaron exitosamente');
        });
    }
    eliminargaleria(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = yield database_1.conexion();
            let id = req.params.id;
            yield db.query('delete from galeria where id_galeria =?', id);
            return res.json("los datos se eliminaron exitosamente");
        });
    }
    actualizargaleria(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = yield database_1.conexion();
            let id = req.params.id;
            let galeria = req.body;
            yield db.query('update galeria set ? where id_galeria =?', [galeria, id]);
            return res.json('los datos se actualizaron exitosamente');
        });
    }
    buscargaleria(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = yield database_1.conexion();
            let id = req.params.id;
            let galeria = yield db.query('select * from galeria where id_galeria = ? ', [id]);
            return res.json(galeria[0]);
        });
    }
}
exports.Galeriacontroller = Galeriacontroller;
