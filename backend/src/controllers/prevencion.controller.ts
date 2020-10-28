import { conexion } from "../database";
import { Request,Response } from "express";
import { IPrevencion } from "../models/prevencion";
import cloudinary from "cloudinary";
import  fs  from "fs-extra";

cloudinary.v2.config({
    cloud_name:'lemillion',
    api_key:'323978568364464',
    api_secret:'xgECcAjSh7FL_bzLWt3QKBv3doY'
})

export class PrevencionController{

    public async listarPrevencion(req:Request,res:Response){

        const db = await conexion();

        let prevencion = await db.query('select * from prevencion');

        return res.json (prevencion);
    }

    public async guardarPrevencion(req:Request,res:Response){

        const db= await conexion();

        const url_img = req.file.path;

        const resultado_cloud  = await cloudinary.v2.uploader.upload(req.file.path);

         console.log(resultado_cloud)
        const guardarprevencion = {
            titulo:req.body.titulo,
            descripcion:req.body.descripcion,
            imagen:resultado_cloud.url,
            categoria_prev:req.body.categoria_prev,
            estado:req.body.estado,
            public_id:resultado_cloud.public_id
        }

        await db.query('insert into prevencion set ?', [guardarprevencion]);

        fs.unlink(req.file.path)

        return res.json('La imagen fue guardada con exito');

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

        await db.query('update prevencion set ? where id_prevencion = ?', [prevencionActualizada,id]);

        return res.json('Los datos fueron actualizados con exito');
    }

    public async buscarPrevencion(req:Request,res:Response){

        const db = await conexion();

        let id = req.params.id;

        let prevencion = await db.query('select * from prevencion where id_prevencion = ?', [id]);
        
        return res.json(prevencion [0]);
    }
}
