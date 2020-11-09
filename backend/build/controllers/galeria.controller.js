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
exports.Galeriacontroller = void 0;
const database_1 = require("../database");
const cloudinary_1 = __importDefault(require("cloudinary"));
const fs_extra_1 = __importDefault(require("fs-extra"));
cloudinary_1.default.v2.config({
    cloud_name: 'lemillion',
    api_key: '323978568364464',
    api_secret: 'xgECcAjSh7FL_bzLWt3QKBv3doY'
});
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
            const files = req.files;
            const ti = req.body.titulo;
            const cat = req.body.categoria_gale;
            const fe = req.body.fecha;
            const es = req.body.estado;
            const db = yield database_1.conexion();
            const unaGaleria = {
                titulo: ti,
                categoria_gale: cat,
                fecha: fe,
                estado: es
            };
            const resultado = yield db.query('insert into galeria set ?', [unaGaleria]);
            for (let i = 0; i < files.length; i++) {
                const resultado_c = yield cloudinary_1.default.v2.uploader.upload(files[i].path);
                const img_galeria = {
                    id_galeria: resultado.insertId,
                    imagen_url: resultado_c.url,
                    public_id: resultado_c.public_id
                };
                yield db.query('insert into imagenes_galeria set ?', [img_galeria]);
                yield fs_extra_1.default.unlink(files[i].path);
            }
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
