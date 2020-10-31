import { conexion } from "../database";
import { Request,Response } from "express";
import { IImgactividades } from "../models/img_actividades";

export class ImgactividadesController{

    public async listarImgactividades(req:Request,res:Response)
    {
        const db = await conexion();

        let imgactividades = await db.query('select * from imagenes_actividades');

        return res.json(imgactividades);   
    }

    public async guardarImgactividades(req:Request,res:Response){

        const db= await conexion();

        const imgactividades:IImgactividades = req.body;

        await db.query('insert into imagenes_actividades set ?', [imgactividades]);

        return res.json('Los datos fueron guardados con exito');
    }

    public async eliminarImgactividades(req:Request,res:Response){

        const db = await conexion();

        let id = req.params.id;

        await db.query('delete from imagenes_actividades where id_ai = ?', [id]);

        return res.json('Los datos fueron eliminados con exito');

    }

    public async actualizaImgactividades(req:Request,res:Response){

        const db = await conexion();

        let id= req.params.id;

        let imgactividadesActualizada = req.body;

        await db.query('update imagenes_actividades set ? where id_ai = ?', [imgactividadesActualizada,id]);

        return res.json('Los datos fueron actualizados con exito');
    }

    public async buscarImgactividades(req:Request,res:Response){

        const db = await conexion();

        let id = req.params.id;

        let imgactividades = await db.query('select * from imagenes_actividades where id_ai = ?', [id]);
        
        return res.json(imgactividades[0]);
    }

}