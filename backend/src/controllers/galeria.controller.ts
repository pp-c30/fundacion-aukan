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

    public async listargaleriapublic(req:Request,res:Response)
    {
        const db = await conexion();

        let galeria = await db.query('select * from galeria order by fecha desc limit 6');

        return res.json(galeria)   
    }

    public async guardargaleria(req:Request,res:Response)
    {
      

        const files:any = req.files;

        const ti = req.body.titulo;
        const cat = req.body.categoria_gale;
        const fe = req.body.fecha;
        const es = req.body.estado;

        const db = await conexion();

        const unaGaleria = {
            titulo:ti,
            categoria_gale:cat,
            fecha:fe,
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


    async listarImgGaleria(req:Request,res:Response)
    {
        let id_galeria = req.params.id_galeria;

        const db = await conexion();

        let lista_img_galeria = await db.query('select * from imagenes_galeria where id_galeria = ?',[id_galeria]);

        res.json(lista_img_galeria);

    }

    
   async agregarimagengaleria(req:Request, res:Response)
    {
        const archivos:any = req.files;

        let id_galeria = req.params.id_galeria;

        const db = await conexion();


        for (let index = 0; index < archivos.length; index++) {

            const resultado_c = await cloudinary.v2.uploader.upload(archivos[index].path);

            const imagen_galeria = {
                id_galeria:id_galeria,
                imagen_url:resultado_c.url,
                public_id:resultado_c.public_id

            }

            await db.query('insert into imagenes_galeria set ?', [imagen_galeria])

            await fs.unlink(archivos[index].path);
        }

        res.json('se agregaron las imagenes de manera exitosa')
    }

    async eliminarimagengaleria(req:Request,res:Response)
    {
        let id_gi = req.params.id_gi;
        let public_id = req.params.public_id;

        //conectarme a la base de datos
        const db = await conexion();
        await db.query('delete from imagenes_galeria where id_gi = ?',[id_gi]);
        await cloudinary.v2.uploader.destroy(public_id);

        res.json('se elimino la imagen exitosamente');
    }

    async eliminargaleriaimg(req:Request,res:Response)
    {
        let id_galeria = req.params.id_galeria;
 
        const db = await conexion();

        await db.query('delete from galeria where id_galeria = ?',[id_galeria]);

        let lista_imagenes_galeria = await db.query('select * from imagenes_galeria where id_galeria = ?',[id_galeria]);

        for (let index = 0; index < lista_imagenes_galeria.length; index++) {
            
            await cloudinary.v2.uploader.destroy(lista_imagenes_galeria[index].public_id);

        }
        console.log(id_galeria);
        await db.query('delete from imagenes_galeria where id_galeria = ?',[id_galeria]);

        res.json('Se elimino la completamente la galeria')

    }   


    async actualizarGaleriaImg(req:Request,res:Response) 
    {
        if (!req.files) 
        {

            const updateGaleria = {
                titulo:req.body.titulo,
                categoria_gale:req.body.categoria_gale,
                fecha:req.body.fecha,
                estado:req.body.estado
            }
            
            const db = await conexion();

            await db.query('update galeria set ? where id_galeria = ?',[updateGaleria,req.body.id_galeria])

            res.json('se actualizo correctamente')
        }

    }

    async establecerPortada(req:Request,res:Response)
    {
        let id_gi = req.params.id_gi;
        let id_galeria = req.params.id_galeria;

        const db = await conexion();

        //primero todas las imagenes pasan a estado cero
        const portadasEnEstadoCero = {
            portada:0,
        }
        await db.query('update imagenes_galeria set ? where id_galeria = ?',[portadasEnEstadoCero,id_galeria])

        //se selecciona una portada cambiando el valor a 1
        const datosImgGaleria = {
            portada:1,
        }
        await db.query('update imagenes_galeria set ? where id_gi = ?',[datosImgGaleria,id_gi])

        //se guarda la imagen seleccionada como portada en la tabla galeria
        const unaFila = await db.query('select * from imagenes_galeria where id_gi = ?',[id_gi])
        
        let datosGaleria = {
            imagen_portada:unaFila[0].imagen_url
        }
        //se edita la url en con el dato sacado de iaganes_galeria en galeria
        await db.query('update galeria set ? where id_galeria = ?',[datosGaleria,id_galeria])


        res.json('se establecio una portada')
    }
}