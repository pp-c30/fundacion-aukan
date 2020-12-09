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
exports.Catgaleriacontroller = void 0;
const database_1 = require("../database");
class Catgaleriacontroller {
    listarcatgaleria(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = yield database_1.conexion();
            let catgaleria = yield db.query('select * from categoria_galeria');
            return res.json(catgaleria);
        });
    }
    guardarcatgaleria(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = yield database_1.conexion();
            const catgaleria = req.body;
            yield db.query("insert into categoria_galeria set ?", [catgaleria]);
            return res.json('los datos se ingresaron exitosamente');
        });
    }
    eliminarcatgaleria(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = yield database_1.conexion();
            let id = req.params.id;
            try {
                yield db.query('delete from categoria_galeria where id_cg =?', id);
                return res.json("se elimino la categoria");
            }
            catch (error) {
                return res.json("No se pudo eliminar esta categoria por que esta siendo utilizada");
            }
        });
    }
    actualizarcatgaleria(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = yield database_1.conexion();
            let id = req.params.id;
            let catgaleria = req.body;
            yield db.query('update categoria_galeria set ? where id_cg =?', [catgaleria, id]);
            return res.json('los datos se actualizaron exitosamente');
        });
    }
    buscarcatgaleria(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = yield database_1.conexion();
            let id = req.params.id;
            let catgaleria = yield db.query('select * from categoria_galeria where id_cg = ? ', [id]);
            return res.json(catgaleria[0]);
        });
    }
}
exports.Catgaleriacontroller = Catgaleriacontroller;
