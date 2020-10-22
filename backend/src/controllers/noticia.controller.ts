import { conexion } from "../database";
import { Request,Response } from "express";
import { INoticia } from "../models/noticia";

export class NoticiaController{

    public async listarNoticia(req:Request,res:Response){

        const db = await conexion();

        let noticia = await db.query('select * from noticia');

        return res.json (noticia);
    }

    public async guardarNoticia(req:Request,res:Response){

        const db= await conexion();

        const noticia:INoticia = req.body;

        await db.query('inset into noticia set ?', [noticia]);

        return res.json('Los datos fueron guardados con exito');
    }

    public async eliminarNoticia(req:Request,res:Response){

        const db = await conexion();

        let id = req.params.id;

        await db.query('delete from noticia where id_noticia = ?', [id]);

        return res.json('Los datos fueron eliminados con exito');

    }

    public async actualizarNoticia(req:Request,res:Response){

        const db = await conexion();

        let id= req.params.id;

        let noticiaActualizada = req.body;

        await db.query('update noticia set ? where id_noticia = ?', [noticiaActualizada]);

        return res.json('Los datos fueron actualizados con exito');
    }

    public async buscarNoticia(req:Request,res:Response){

        const db = await conexion();

        let id = req.params.id;

        let noticia = await db.query('select * from noticia where id_noticia= ?', [id]);
        
        return res.json(noticia [0]);
    }
}