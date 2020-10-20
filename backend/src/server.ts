import express, { Application } from "express";

import enrutadorGaleria from  './routes/galeria.routes';
import enrutadorCatgaleria from './routes/cat_galeria.routes';
import enrutadorCatnoticias from "./routes/cat_noticias.routes";

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
        this.app.set('port', process.env.port || 3000)
    }

    //
    routes()
    {
        this.app.use(enrutadorGaleria);
        this.app.use(enrutadorCatgaleria);
        this.app.use(enrutadorCatnoticias);
    }


    middleware()
    {
        this.app.use(express.json());
    }


    //este metodo se encarga de correr el servidor
    async listen()
    {
        await this.app.listen(this.app.get('port'));
        console.log('Servidor corriendo en el puerto 3000');
    }


    
}