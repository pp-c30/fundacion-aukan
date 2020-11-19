import { conexion } from "../database";
import { Request,Response } from "express";
import cloudinary from "cloudinary";
import path from 'path';
import  fs  from "fs-extra";

cloudinary.v2.config({
    cloud_name:'lemillion',
    api_key:'323978568364464',
    api_secret:'xgECcAjSh7FL_bzLWt3QKBv3doY'
}); 

export class ActividadesController{

    async listarActividades(req:Request, res:Response)
    {

        const db = await conexion(); 

        let actividades = await db.query('select * from actividades');

        res.json(actividades);


    }

    public async listarActividad(req:Request,res:Response){

        const db = await conexion();

        let actividad = await db.query('select * from actividades');

        return res.json (actividad);
    }

    public async guardarActividad(req:Request,res:Response){

        

        const files:any = req.files;

        const ti = req.body.titulo;
        const des = req.body.descripcion;
        const cat = req.body.categoria_actividad;
        const fe = req.body.fecha_hora;
        const es = req.body.estado;

        const db= await conexion();
        

        const unaActividad = {
            titulo:ti,
            descripcion:des,
            categoria_actividad:cat,
            fecha_hora:fe,
            estado:es
        }
       
        const resultado = await db.query('insert into actividades set ?', [unaActividad]);

        for(let i=0; i< files.length; i++){

           const resultado_c = await cloudinary.v2.uploader.upload(files[i].path);


            const img_actividad = {
                id_actividad:resultado.insertId,
                imagen_url:resultado_c.url,
                public_id:resultado_c.public_id

            }


            await db.query('insert into imagenes_actividades set ?',[img_actividad])
            
            await fs.unlink(files[i].path);
        }



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