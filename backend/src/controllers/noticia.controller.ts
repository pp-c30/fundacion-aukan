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

        let id = req.params.id;
        let public_id = req.params.public_id;

        //eliminamos imagen de cloudinary
        await cloudinary.v2.uploader.destroy(public_id);        

        const db = await conexion();
        //eliminamos registro en la base
        await db.query('delete from noticia where id_noticia = ?', [id]);

        return res.json('Los datos fueron eliminados con exito');

    }

    public async actualizarNoticia(req:Request,res:Response){
        try {
            const db = await conexion();
            let id= req.params.id;
            var updateNoticia;
            var public_id_anterior = req.body.public_id;

            if(req.file){
                //se sube imagen a cloudinary y se genera public_id
                const resultado_cloud = await cloudinary.v2.uploader.upload(req.file.path);
                updateNoticia = {
                    titulo:req.body.titulo,
                    descripcion:req.body.descripcion,
                    imagen:resultado_cloud.url,
                    fecha_hora:req.body.fecha_hora,
                    categoria:req.body.categoria,
                    estado:req.body.estado,
                    public_id:resultado_cloud.public_id
                }
                await db.query('update noticia set ? where id_noticia = ?', [updateNoticia,id]);

                fs.unlink(req.file.path);
                await cloudinary.v2.uploader.destroy(public_id_anterior);
            }else{
                updateNoticia = {
                    titulo:req.body.titulo,
                    descripcion:req.body.descripcion,
                    fecha_hora:req.body.fecha_hora,
                    categoria:req.body.categoria,
                    estado:req.body.estado
                }
                await db.query('update noticia set ? where id_noticia = ?', [updateNoticia,id]);
            }
            res.json('Se actualizo exitosamente');
        } catch (error) {
            console.error(error);
        }
    }

    public async listarUnaNoticia(req:Request,res:Response){

        const db = await conexion();

        let id = req.params.id;

        let noticia = await db.query('select * from noticia where id_noticia= ?', [id]);
        
        return res.json(noticia [0]);
    }
}