import { conexion } from "../database";
import { Request,Response } from "express";
import { IActividades } from "../models/actividades";

export class ActividadesController{

    public async listarActividad(req:Request,res:Response){

        const db = await conexion();

        let actividad = await db.query('select * from actividad');

        return res.json (actividad);
    }

    public async guardarActividad(req:Request,res:Response){

        const db= await conexion();

        const actividad:IActividades = req.body;

        await db.query('insert into actividades set ?', [actividad]);

        return res.json('La actividad fue guardada con exito');
    }


    public async eliminarActividad(req:Request,res:Response){

        const db = await conexion();

        let id = req.params.id;

        await db.query('delete from actividades where id_actividades = ?', [id]);

        return res.json('La actividad fue eliminada con exito');

    }

    public async actualizarActividad(req:Request,res:Response){

        const db = await conexion();

        let id= req.params.id;

        let actividadActualizada = req.body;

        await db.query('update actividades set ? where id_actividades = ?', [actividadActualizada,id]);

        return res.json('La actividad se a actualizado con exito');
    }

    public async buscarActividad(req:Request,res:Response){

        const db = await conexion();

        let id = req.params.id;

        let actividad = await db.query('select * from actividades where id_actividades = ?', [id]);
        
        return res.json(actividad[0]);
    }

}