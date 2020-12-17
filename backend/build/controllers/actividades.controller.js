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
    listarActividades(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = yield database_1.conexion();
            let actividades = yield db.query('select * from actividades');
            res.json(actividades);
        });
    }
    listarActividad(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = yield database_1.conexion();
            let actividad = yield db.query('select * from actividades');
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
    listarImgActividad(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let id_actividad = req.params.id_actividad;
            const db = yield database_1.conexion();
            let lista_img_actividad = yield db.query('select * from imagenes_actividades where id_actividad = ?', [id_actividad]);
            res.json(lista_img_actividad);
        });
    }
    agregarimagenactividad(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const archivos = req.files;
            let id_actividad = req.params.id_actividad;
            const db = yield database_1.conexion();
            for (let index = 0; index < archivos.length; index++) {
                const resultado_c = yield cloudinary_1.default.v2.uploader.upload(archivos[index].path);
                const imagen_galeria = {
                    id_actividad: id_actividad,
                    imagen_url: resultado_c.url,
                    public_id: resultado_c.public_id
                };
                yield db.query('insert into imagenes_actividades set ?', [imagen_galeria]);
                yield fs_extra_1.default.unlink(archivos[index].path);
            }
            res.json('se agregaron las imagenes de manera exitosa');
        });
    }
    eliminarimagenactividad(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let id_ai = req.params.id_ai;
            let public_id = req.params.public_id;
            //conectarme a la base de datos
            const db = yield database_1.conexion();
            yield db.query('delete from imagenes_actividades where id_ai = ?', [id_ai]);
            yield cloudinary_1.default.v2.uploader.destroy(public_id);
            res.json('se elimino la imagen exitosamente');
        });
    }
    eliminaractividadesimg(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let id_actividades = req.params.id_actividades;
            const db = yield database_1.conexion();
            yield db.query('delete from actividades where id_actividades = ?', [id_actividades]);
            let lista_imagenes_galeria = yield db.query('select * from imagenes_actividades where id_actividad = ?', [id_actividades]);
            for (let index = 0; index < lista_imagenes_galeria.length; index++) {
                yield cloudinary_1.default.v2.uploader.destroy(lista_imagenes_galeria[index].public_id);
            }
            console.log(id_actividades);
            yield db.query('delete from imagenes_actividades where id_actividad = ?', [id_actividades]);
            res.json('Se elimino la completamente la galeria');
        });
    }
    actualizarActividadesImg(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!req.files) {
                const updateActividades = {
                    titulo: req.body.titulo,
                    descripcion: req.body.descripcion,
                    categoria_actividad: req.body.categoria_actividad,
                    fecha: req.body.fecha_hora,
                    estado: req.body.estado
                };
                const db = yield database_1.conexion();
                yield db.query('update actividades set ? where id_actividades = ?', [updateActividades, req.body.id_actividades]);
                res.json('se actualizo correctamente');
            }
        });
    }
    establecerPortada(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let id_ai = req.params.id_ai;
            let id_actividad = req.params.id_actividad;
            const db = yield database_1.conexion();
            //primero todas las imagenes pasan a estado cero
            const portadasEnEstadoCero = {
                portada: 0,
            };
            yield db.query('update imagenes_actividades set ? where id_actividad = ?', [portadasEnEstadoCero, id_actividad]);
            //se selecciona una portada cambiando el valor a 1
            const datosImgActividad = {
                portada: 1,
            };
            yield db.query('update imagenes_actividades set ? where id_ai = ?', [datosImgActividad, id_ai]);
            //se guarda la imagen seleccionada como portada en la tabla galeria
            const unaFila = yield db.query('select * from imagenes_actividades where id_ai = ?', [id_ai]);
            let datosActividades = {
                imagen_portada: unaFila[0].imagen_url
            };
            //se edita la url en con el dato sacado de iaganes_galeria en galeria
            yield db.query('update actividades set ? where id_actividades = ?', [datosActividades, id_actividad]);
            res.json('se establecio una portada');
        });
    }
}
exports.ActividadesController = ActividadesController;
