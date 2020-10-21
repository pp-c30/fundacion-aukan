import express, { Application } from "express";
import morgan from "morgan";


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
        
    }


    middleware()
    {
        this.app.use(morgan('dev'));
        this.app.use(express.json());
    }


    //este metodo se encarga de correr el servidor
    async listen()
    {
        await this.app.listen(this.app.get('port'));
        console.log("Servidor corriendo en el puerto 3000");
    }


    
}