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
exports.Catnoticiacontroller = void 0;
const database_1 = require("../database");
class Catnoticiacontroller {
    listarcatnoticias(req, res) {
        return __awaiter(this, void 0, void 0, function*() {
            const db = yield database_1.conexion();
            let catnoticia = yield db.query('select * from categoria_noticia');
            return res.json(catnoticia);
        });
    };
    guardarcatnoticias(req, res) {
        return __awaiter(this, void 0, void 0, function*() {
            const db = yield database_1.conexion();
            const catnoticia = req.body;
            yield db.query("insert into categoria_noticia set ?", [catnoticia]);
            return res.json('los datos se ingresaron exitosamente');
        });
    }
    eliminarcatnoticia(req, res) {
        return __awaiter(this, void 0, void 0, function*() {
            const db = yield database_1.conexion();
            let id = req.params.id;
            yield db.query('delete from categoria_noticia where id_cn =?', id);
            return res.json("los datos se eliminaron exitosamente");
        });
    }
    actualizarcatnoticia(req, res) {
        return __awaiter(this, void 0, void 0, function*() {
            const db = yield database_1.conexion();
            let id = req.params.id;
            let catnoticia = req.body;
            yield db.query('update categoria_noticia set ? where id_cn =?', [catnoticia, id]);
            return res.json('los datos se actualizaron exitosamente');
        });
    }
    buscarcatnoticia(req, res) {
        return __awaiter(this, void 0, void 0, function*() {
            const db = yield database_1.conexion();
            let id = req.params.id;
            let catnoticia = yield db.query('select * from categoria_noticia where id_cn = ? ', [id]);
            return res.json(catnoticia[0]);
        });
    }
}
exports.Catnoticiacontroller = Catnoticiacontroller;