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
exports.PrevencionController = void 0;
const database_1 = require("../database");
const cloudinary_1 = __importDefault(require("cloudinary"));
const fs_extra_1 = __importDefault(require("fs-extra"));
cloudinary_1.default.v2.config({
    cloud_name: 'lemillion',
    api_key: '323978568364464',
    api_secret: 'xgECcAjSh7FL_bzLWt3QKBv3doY'
});
class PrevencionController {
    listarPrevencion(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = yield database_1.conexion();
            let prevencion = yield db.query('select * from prevencion');
            return res.json(prevencion);
        });
    }
    guardarPrevencion(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = yield database_1.conexion();
            const url_img = req.file.path;
            const resultado_cloud = yield cloudinary_1.default.v2.uploader.upload(req.file.path);
            console.log(resultado_cloud);
            const guardarprevencion = {
                titulo: req.body.titulo,
                descripcion: req.body.descripcion,
                imagen: resultado_cloud.url,
                categoria_prev: req.body.categoria_prev,
                estado: req.body.estado,
                public_id: resultado_cloud.public_id
            };
            yield db.query('insert into prevencion set ?', [guardarprevencion]);
            fs_extra_1.default.unlink(req.file.path);
            return res.json('La imagen fue guardada con exito');
        });
    }
    eliminarPrevencion(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = yield database_1.conexion();
            let id = req.params.id;
            let public_id = req.params.public_id;
            yield cloudinary_1.default.v2.uploader.destroy(public_id);
            yield db.query('delete from prevencion where id_prevencion = ?', [id]);
            return res.json('Los datos fueron eliminados con exito');
        });
    }
    actualizarPrevencion(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const db = yield database_1.conexion();
                let id = req.params.id;
                var updatePrevencion;
                var public_id_anterior = req.body.public_id;
                if (req.file) {
                    //se sube imagen a cloudinary y se genera public_id
                    const resultado_cloud = yield cloudinary_1.default.v2.uploader.upload(req.file.path);
                    updatePrevencion = {
                        titulo: req.body.titulo,
                        descripcion: req.body.descripcion,
                        imagen: resultado_cloud.url,
                        categoria_prev: req.body.categoria_prev,
                        estado: req.body.estado,
                        public_id: resultado_cloud.public_id
                    };
                    yield db.query('update prevencion set ? where id_prevencion = ?', [updatePrevencion, id]);
                    fs_extra_1.default.unlink(req.file.path);
                    yield cloudinary_1.default.v2.uploader.destroy(public_id_anterior);
                }
                else {
                    updatePrevencion = {
                        titulo: req.body.titulo,
                        descripcion: req.body.descripcion,
                        categoria_prev: req.body.categoria_prev,
                        estado: req.body.estado
                    };
                    yield db.query('update prevencion set ? where id_prevencion = ?', [updatePrevencion, id]);
                }
                res.json('Se actualizo exitosamente');
            }
            catch (error) {
                console.error(error);
            }
        });
    }
    buscarPrevencion(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = yield database_1.conexion();
            let id = req.params.id;
            let prevencion = yield db.query('select * from prevencion where id_prevencion = ?', [id]);
            return res.json(prevencion[0]);
        });
    }
}
exports.PrevencionController = PrevencionController;
