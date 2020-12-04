import { conexion } from "../database";
import { Request,Response } from "express";
import { ICatprevencion } from "../models/cat_prevencion";

export class CatprevencionController{

    public async listarCatprevencion(req:Request,res:Response){

        const db = await conexion();

        let catprevencion = await db.query('select * from categoria_prevencion');

        return res.json (catprevencion);
    }

    public async guardarCatprevencion(req:Request,res:Response){

        const db= await conexion();

        const catprevencion:ICatprevencion = req.body;

        await db.query('insert into categoria_prevencion set ?', [catprevencion]);

        return res.json('Los datos fueron guardados con exito');
    }

    public async eliminarCatprevencion(req:Request,res:Response){

        const db = await conexion();

        let id = req.params.id;

        await db.query('delete from categoria_prevencion where id_cp = ?', [id]);

        return res.json('Los datos fueron eliminados con exito');

    }

    public async actualizarCatprevencion(req:Request,res:Response){

        const db = await conexion();

        let id= req.params.id;

        let catprevencionActualizada = req.body;

        await db.query('update categoria_prevencion set ? where id_cp = ?', [catprevencionActualizada,id]);

        return res.json('Los datos fueron actualizados con exito');
    }

    public async buscarCatprevencion(req:Request,res:Response){

        const db = await conexion();

        let id = req.params.id;

        let catprevencion = await db.query('select * from categoria_prevencion where id_cp = ?', [id]);
        
        return res.json(catprevencion [0]);
    }


}