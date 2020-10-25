import { conexion } from "../database";
import { Request,Response } from "express";
import { Iimggaleria } from '../models/img_galeria';


export class ImggaleriaController 
{

    public async listarImggaleria(req:Request,res:Response)
    {
        const db = await conexion();

        let imggaleria = await db.query('select * from imagenes_galeria');

        return res.json(imggaleria);   
    }

    public async guardarImggaleria(req:Request,res:Response){

        const db= await conexion();

        const imgaleria:Iimggaleria = req.body;

        await db.query('insert into imagenes_galeria set ?', [imgaleria]);

        return res.json('Los datos fueron guardados con exito');
    }

    public async eliminarImggaleria(req:Request,res:Response){

        const db = await conexion();

        let id = req.params.id;

        await db.query('delete from imagenes_galeria where id_gi = ?', [id]);

        return res.json('Los datos fueron eliminados con exito');

    }

    public async actualizaImggaleria(req:Request,res:Response){

        const db = await conexion();

        let id= req.params.id;

        let imggaleria = req.body;

        await db.query('update imagenes_galeria set ? where id_gi = ?', [imggaleria,id]);

        return res.json('Los datos fueron actualizados con exito');
    }

    public async buscarImggaleria(req:Request,res:Response){

        const db = await conexion();

        let id = req.params.id;

        let imggaleria = await db.query('select * from imagenes_galeria where id_gi = ?', [id]);
        
        return res.json(imggaleria[0]);
    }

}