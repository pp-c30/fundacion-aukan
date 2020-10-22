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
exports.server = void 0;
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const galeria_routes_1 = __importDefault(require("./routes/galeria.routes"));
const cat_galeria_routes_1 = __importDefault(require("./routes/cat_galeria.routes"));
const cat_noticias_routes_1 = __importDefault(require("./routes/cat_noticias.routes"));
const cat_donaciones_routes_1 = __importDefault(require("./routes/cat_donaciones.routes"));
const actividades_routes_1 = __importDefault(require("./routes/actividades.routes"));
const cat_prevencion_routes_1 = __importDefault(require("./routes/cat_prevencion.routes"));
const prevencion_routes_1 = __importDefault(require("./routes/prevencion.routes"));
const noticia_routes_1 = __importDefault(require("./routes/noticia.routes"));
const img_actividades_routes_1 = __importDefault(require("./routes/img_actividades.routes"));
class server {
    constructor() {
        this.app = express_1.default();
        this.configuracion();
        this.middleware();
        this.routes();
    }
    configuracion() {
        //se configura el puerto que se utilizara para correr el servidor
        this.app.set('port', process.env.port || 3000);
    }
    //
    routes() {
        this.app.use(galeria_routes_1.default);
        this.app.use(cat_galeria_routes_1.default);
        this.app.use(cat_noticias_routes_1.default);
        this.app.use(cat_donaciones_routes_1.default);
        this.app.use(actividades_routes_1.default);
        this.app.use(cat_prevencion_routes_1.default);
        this.app.use(prevencion_routes_1.default);
        this.app.use(noticia_routes_1.default);
        this.app.use(img_actividades_routes_1.default);
    }
    middleware() {
        this.app.use(morgan_1.default('dev'));
        this.app.use(express_1.default.json());
    }
    //este metodo se encarga de correr el servidor
    listen() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.app.listen(this.app.get('port'));
            console.log("Servidor corriendo en el puerto 3000");
        });
    }
}
exports.server = server;
