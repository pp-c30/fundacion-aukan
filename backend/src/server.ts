import express, { Application } from "express";
import morgan from "morgan";
import cors from "cors";
import path from "path";

import enrutadorGaleria from  './routes/galeria.routes';
import enrutadorCatgaleria from './routes/cat_galeria.routes';
import enrutadorCatnoticias from "./routes/cat_noticias.routes";
import enrutadorCatdonaciones from './routes/cat_donaciones.routes';
import enrutadorActividades from "./routes/actividades.routes";
import enrutadorCatprevencion from "./routes/cat_prevencion.routes";
import enrutadorPrevencion from "./routes/prevencion.routes";
import enrutadorNoticia from "./routes/noticia.routes";
import enrutadorImgactividades from "./routes/img_actividades.routes";
import enrutadorimggaleria from './routes/img_galeria.routes';
import enrutadorDonaciones from "./routes/donaciones.routes";
import enrutadorTestimonios from "./routes/testimonios.routes";
import enrutadorAut from "./routes/autenticacion.routes";

export class server {

    app:Application;

    constructor()
    {
        this.app = express();
        this.configuracion();
        this.middleware();
        this.routes();


    }

    configuracion()
    {
        //se configura el puerto que se utilizara para correr el servidor
        this.app.set('port', process.env.port || 3000);
    }

    //
    routes()
    {
        this.app.use(enrutadorGaleria);
        this.app.use(enrutadorCatgaleria);
        this.app.use(enrutadorCatnoticias);
        this.app.use(enrutadorCatdonaciones);
        this.app.use(enrutadorActividades);
        this.app.use(enrutadorCatprevencion);
        this.app.use(enrutadorPrevencion);
        this.app.use(enrutadorNoticia);
        this.app.use(enrutadorImgactividades);
        this.app.use(enrutadorimggaleria);
        this.app.use(enrutadorDonaciones);
        this.app.use(enrutadorTestimonios);
        this.app.use(enrutadorAut)
        //se configura el server para que el navegador pueda leer esta carpeta y tambien las imagenes
        this.app.use('/uploads',express.static(path.resolve('uploads')));
    }


    middleware()
    {
        this.app.use(morgan('dev'));
        this.app.use(cors());
        this.app.use(express.json());
    }


    //este metodo se encarga de correr el servidor
    async listen()
    {
        await this.app.listen(this.app.get('port'));
        console.log("Servidor corriendo en el puerto 3000");
    }


    
}