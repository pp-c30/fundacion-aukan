import {Response, Request} from 'express';
import {conexion} from '../database';
import { Igaleria } from '../models/galeria';
import cloudinary from "cloudinary";
import path from 'path';
import  fs  from "fs-extra";

cloudinary.v2.config({
    cloud_name:'lemillion',
    api_key:'323978568364464',
    api_secret:'xgECcAjSh7FL_bzLWt3QKBv3doY'
})

export class Galeriacontroller
{
    public async listargaleria(req:Request,res:Response)
    {
        const db = await conexion();

        let galeria = await db.query('select * from galeria');

        return res.json(galeria)   
    }

    public async guardargaleria(req:Request,res:Response)
    {
      
      
        const files:any = req.files;

        const ti = req.body.titulo;
        const des = req.body.descripcion;
        const cat = req.body.categoria_galeria;
        const fe = req.body.fecha_hora;
        const es = req.body.estado;

        const db = await conexion();

        const unaGaleria = {
            titulo:ti,
            descripcion:des,
            categoria_galeria:cat,
            fecha_hora:fe,
            estado:es
        }

        const resultado = await db.query('insert into galeria set ?', [unaGaleria]);

        for(let i=0; i< files.length; i++){

           const resultado_c = await cloudinary.v2.uploader.upload(files[i].path);


            const img_galeria = {
                id_galeria:resultado.insertId,
                imagen_url:resultado_c.url,
                public_id:resultado_c.public_id

            }


            await db.query('insert into imagenes_galeria set ?',[img_galeria])
            
            await fs.unlink(files[i].path);
        }
        
        const galeria:Igaleria = req.body;

        await db.query("insert into galeria set ?",[galeria]);

        return res.json('los datos se ingresaron exitosamente');

    }

    public async eliminargaleria(req:Request, res:Response)
    {
        const db = await conexion();

        let id = req.params.id;

        await db.query('delete from galeria where id_galeria =?',id);

        return res.json("los datos se eliminaron exitosamente");
    }

    public async actualizargaleria(req:Request, res:Response)
    {
        const db = await conexion();

        let id = req.params.id;

        let galeria:Igaleria = req.body;

        await db.query('update galeria set ? where id_galeria =?',[galeria,id]);

        return res.json('los datos se actualizaron exitosamente');

    }

    public async buscargaleria(req:Request, res:Response)
    {
        const db = await conexion();

        let id = req.params.id;

        let galeria = await db.query('select * from galeria where id_galeria = ? ',[id]);

        return res.json(galeria[0]);

    }

    













}