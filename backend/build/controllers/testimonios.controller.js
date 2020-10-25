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
exports.TestimoniosController = void 0;
const database_1 = require("../database");
class TestimoniosController {
    listarTestimonios(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = yield database_1.conexion();
            let testimonios = yield db.query('select * from testimonios');
            return res.json(testimonios);
        });
    }
    guardarTestimonios(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = yield database_1.conexion();
            const testimonios = req.body;
            yield db.query('inset into testimonios set ?', [testimonios]);
            return res.json('Los datos fueron guardados con exito');
        });
    }
    eliminarTestimonios(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = yield database_1.conexion();
            let id = req.params.id;
            yield db.query('delete from testimonios where id_testimonios = ?', [id]);
            return res.json('Los datos fueron eliminados con exito');
        });
    }
    actualizarTestimonios(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = yield database_1.conexion();
            let id = req.params.id;
            let testimoniosActualizada = req.body;
            yield db.query('update testimonios set ? where id_testimonios = ?', [testimoniosActualizada, id]);
            return res.json('Los datos fueron actualizados con exito');
        });
    }
    buscarTestimonios(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = yield database_1.conexion();
            let id = req.params.id;
            let testimonios = yield db.query('select * from testimonios where id_testimonios = ?', [id]);
            return res.json(testimonios[0]);
        });
    }
}
exports.TestimoniosController = TestimoniosController;
