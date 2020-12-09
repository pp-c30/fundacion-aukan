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
exports.Catdonacionescontroller = void 0;
const database_1 = require("../database");
class Catdonacionescontroller {
    listarcatdonaciones(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = yield database_1.conexion();
            let catdonaciones = yield db.query('select * from categoria_donaciones');
            return res.json(catdonaciones);
        });
    }
    guardarcatdonaciones(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = yield database_1.conexion();
            const catdonaciones = req.body;
            yield db.query("insert into categoria_donaciones set ?", [catdonaciones]);
            return res.json('los datos se ingresaron exitosamente');
        });
    }
    eliminarcatdonaciones(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = yield database_1.conexion();
            let id = req.params.id;
            try {
                yield db.query('delete from categoria_donaciones where id_cd =?', id);
                return res.json("los datos se eliminaron exitosamente");
            }
            catch (error) {
                return res.json("No se pudo eliminar esta categoria por que esta siendo utilizada");
            }
            yield db.query('delete from categoria_donaciones where id_cd =?', id);
            return res.json("los datos se eliminaron exitosamente");
        });
    }
    actualizarcatdonaciones(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = yield database_1.conexion();
            let id = req.params.id;
            let catdonaciones = req.body;
            yield db.query('update categoria_donaciones set ? where id_cd =?', [catdonaciones, id]);
            return res.json('los datos se actualizaron exitosamente');
        });
    }
    buscarcatdonaciones(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = yield database_1.conexion();
            let id = req.params.id;
            let catdonaciones = yield db.query('select * from categoria_donaciones where id_cd = ? ', [id]);
            return res.json(catdonaciones[0]);
        });
    }
}
exports.Catdonacionescontroller = Catdonacionescontroller;
