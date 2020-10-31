import { conexion } from "../database";
import { Request,Response } from "express";
import cloudinary from "cloudinary";
import fs from "fs-extra";

cloudinary.v2.config({
    cloud_name:'lemillion',
    api_key:'323978568364464',
    api_secret:'xgECcAjSh7FL_bzLWt3QKBv3doY'
});

export class NoticiaController{

    public async listarNoticia(req:Request,res:Response){

        const db = await conexion();

        let noticia = await db.query('select * from noticia');

        return res.json (noticia);
    }

    public async guardarNoticia(req:Request,res:Response){

        const db= await conexion();

        const url_img = req.file.path;

        const resultado_cloud = await cloudinary.v2.uploader.upload(req.file.path);

        console.log(resultado_cloud)
        
        const guardarnoticia = {
            titulo:req.body.titulo,
            descripcion:req.body.descripcion,
            imagen:resultado_cloud.url,
            fecha_hora:req.body.fecha_hora,
            categoria:req.body.categoria,
            estado:req.body.estado,
            public_id:resultado_cloud.public_id
        }

        await db.query('insert into noticia set ?', [guardarnoticia]);
        
        fs.unlink(req.file.path)

        return res.json('Los imagen fue guardados con exito');
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

        await db.query('update noticia set ? where id_noticia = ?', [noticiaActualizada,id]);

        return res.json('Los datos fueron actualizados con exito');
    }

    public async buscarNoticia(req:Request,res:Response){

        const db = await conexion();

        let id = req.params.id;

        let noticia = await db.query('select * from noticia where id_noticia= ?', [id]);
        
        return res.json(noticia [0]);
    }
}