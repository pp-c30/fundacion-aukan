import { conexion } from "../database";
import { Request,Response } from "express";
import { IPrevencion } from "../models/prevencion";

export class PrevencionController{

    public async listarPrevencion(req:Request,res:Response){

        const db = await conexion();

        let prevencion = await db.query('select * from prevencion');

        return res.json (prevencion);
    }

    public async guardarPrevencion(req:Request,res:Response){

        const db= await conexion();

        const prevencion:IPrevencion = req.body;

        await db.query('inset into prevencion set ?', [prevencion]);

        return res.json('Los datos fueron guardados con exito');
    }

    public async eliminarPrevencion(req:Request,res:Response){

        const db = await conexion();

        let id = req.params.id;

        await db.query('delete from prevencion where id_prevencion = ?', [id]);

        return res.json('Los datos fueron eliminados con exito');

    }

    public async actualizarPrevencion(req:Request,res:Response){

        const db = await conexion();

        let id= req.params.id;

        let prevencionActualizada = req.body;

        await db.query('update prevencion set ? where id_prevencion = ?', [prevencionActualizada]);

        return res.json('Los datos fueron actualizados con exito');
    }

    public async buscarPrevencion(req:Request,res:Response){

        const db = await conexion();

        let id = req.params.id;

        let prevencion = await db.query('select * from prevencion where id_prevencion = ?', [id]);
        
        return res.json(prevencion [0]);
    }
}
