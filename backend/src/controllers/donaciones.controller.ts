import { conexion } from "../database";
import { Request,Response } from "express";
import { IDonaciones } from "../models/donaciones";

export class DonacionesController{

    public async listarDonaciones(req:Request,res:Response){

        const db = await conexion();

        let donaciones = await db.query('select * from donaciones');

        return res.json (donaciones);
    }

    public async guardarDonaciones(req:Request,res:Response){

        const db= await conexion();

        const donaciones:IDonaciones = req.body;

        await db.query('insert into donaciones set ?', [donaciones]);

        return res.json('Los datos fueron guardados con exito');
    }

    public async eliminarDonaciones(req:Request,res:Response){

        const db = await conexion();

        let id = req.params.id;

        await db.query('delete from donaciones where id_donacion = ?', [id]);

        return res.json('Los datos fueron eliminados con exito');

    }

    public async actualizarDonaciones(req:Request,res:Response){

        const db = await conexion();

        let id= req.params.id;

        let donacionesActualizada = req.body;

        await db.query('update donaciones set ? where id_donacion = ?', [donacionesActualizada,id]);

        return res.json('Los datos fueron actualizados con exito');
    }

    public async buscarDonaciones(req:Request,res:Response){

        const db = await conexion();

        let id = req.params.id;

        let donaciones = await db.query('select * from donaciones where id_donacion = ?', [id]);
        
        return res.json(donaciones [0]);
    } 
}