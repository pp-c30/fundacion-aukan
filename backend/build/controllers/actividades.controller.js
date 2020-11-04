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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActividadesController = void 0;
const database_1 = require("../database");
const cloudinary_1 = __importDefault(require("cloudinary"));
const fs_extra_1 = __importDefault(require("fs-extra"));
cloudinary_1.default.v2.config({
    cloud_name: 'lemillion',
    api_key: '323978568364464',
    api_secret: 'xgECcAjSh7FL_bzLWt3QKBv3doY'
});
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
            const files = req.files;
            const ti = req.body.titulo;
            const des = req.body.descripcion;
            const cat = req.body.categoria_actividad;
            const fe = req.body.fecha_hora;
            const es = req.body.estado;
            const db = yield database_1.conexion();
            const unaActividad = {
                titulo: ti,
                descripcion: des,
                categoria_actividad: cat,
                fecha_hora: fe,
                estado: es
            };
            const resultado = yield db.query('insert into actividades set ?', [unaActividad]);
            for (let i = 0; i < files.length; i++) {
                const resultado_c = yield cloudinary_1.default.v2.uploader.upload(files[i].path);
                const img_actividad = {
                    id_actividad: resultado.insertId,
                    imagen_url: resultado_c.url,
                    public_id: resultado_c.public_id
                };
                yield db.query('insert into imagenes_actividades set ?', [img_actividad]);
                yield fs_extra_1.default.unlink(files[i].path);
            }
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
