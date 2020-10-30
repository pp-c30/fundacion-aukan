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
exports.NoticiaController = void 0;
const database_1 = require("../database");
const cloudinary_1 = __importDefault(require("cloudinary"));
const fs_extra_1 = __importDefault(require("fs-extra"));
cloudinary_1.default.v2.config({
    cloud_name: 'dnap4dywk',
    api_key: '941663136346744',
    api_secret: 'RxuYIKsxJ00EccBCrtyogCj9DTc'
});
class NoticiaController {
    listarNoticia(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = yield database_1.conexion();
            let noticia = yield db.query('select * from noticia');
            return res.json(noticia);
        });
    }
    guardarNoticia(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = yield database_1.conexion();
            const url_img = req.file.path;
            const resultado_cloud = yield cloudinary_1.default.v2.uploader.upload(req.file.path);
            console.log(resultado_cloud);
            const guardarnoticia = {
                titulo: req.body.titulo,
                descripcion: req.body.descripcion,
                imagen_url: resultado_cloud.url,
                fecha_hora: req.body.fecha_hora,
                categoria: req.body.categoria,
                estado: req.body.estado,
                public_id: resultado_cloud.public_id
            };
            yield db.query('insert into noticia set ?', [guardarnoticia]);
            fs_extra_1.default.unlink(req.file.path);
            return res.json('Los datos fueron guardados con exito');
        });
    }
    eliminarNoticia(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = yield database_1.conexion();
            let id = req.params.id;
            yield db.query('delete from noticia where id_noticia = ?', [id]);
            return res.json('Los datos fueron eliminados con exito');
        });
    }
    actualizarNoticia(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = yield database_1.conexion();
            let id = req.params.id;
            let noticiaActualizada = req.body;
            yield db.query('update noticia set ? where id_noticia = ?', [noticiaActualizada, id]);
            return res.json('Los datos fueron actualizados con exito');
        });
    }
    buscarNoticia(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = yield database_1.conexion();
            let id = req.params.id;
            let noticia = yield db.query('select * from noticia where id_noticia= ?', [id]);
            return res.json(noticia[0]);
        });
    }
}
exports.NoticiaController = NoticiaController;
