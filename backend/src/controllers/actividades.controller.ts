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

    async listarImgActividad(req:Request,res:Response)
    {
        let id_actividad = req.params.id_actividad;

        const db = await conexion();

        let lista_img_actividad = await db.query('select * from imagenes_actividades where id_actividad = ?',[id_actividad]);

        res.json(lista_img_actividad);

    }

    async agregarimagenactividad(req:Request, res:Response)
    {
        const archivos:any = req.files;

        let id_actividad = req.params.id_actividad;

        const db = await conexion();


        for (let index = 0; index < archivos.length; index++) {

            const resultado_c = await cloudinary.v2.uploader.upload(archivos[index].path);

            const imagen_galeria = {
                id_actividad:id_actividad,
                imagen_url:resultado_c.url,
                public_id:resultado_c.public_id

            }

            await db.query('insert into imagenes_actividades set ?', [imagen_galeria])

            await fs.unlink(archivos[index].path);
        }

        res.json('se agregaron las imagenes de manera exitosa')
    }

    async eliminarimagenactividad(req:Request,res:Response)
    {
        let id_ai = req.params.id_ai;
        let public_id = req.params.public_id;

        //conectarme a la base de datos
        const db = await conexion();
        await db.query('delete from imagenes_actividades where id_ai = ?',[id_ai]);
        await cloudinary.v2.uploader.destroy(public_id);

        res.json('se elimino la imagen exitosamente');
    }

    async eliminaractividadesimg(req:Request,res:Response)
    {
        let id_actividades = req.params.id_actividades;
 
        const db = await conexion();

        await db.query('delete from actividades where id_actividades = ?',[id_actividades]);

        let lista_imagenes_galeria = await db.query('select * from imagenes_actividades where id_actividad = ?',[id_actividades]);

        for (let index = 0; index < lista_imagenes_galeria.length; index++) {
            
            await cloudinary.v2.uploader.destroy(lista_imagenes_galeria[index].public_id);

        }
        console.log(id_actividades);
        await db.query('delete from imagenes_actividades where id_actividad = ?',[id_actividades]);

        res.json('Se elimino la completamente la galeria')

    }  

    async actualizarActividadesImg(req:Request,res:Response) 
    {
        if (!req.files) 
        {

            const updateActividades = {
                titulo:req.body.titulo,
                descripcion:req.body.descripcion,
                categoria_actividad:req.body.categoria_actividad,
                fecha:req.body.fecha_hora,
                estado:req.body.estado
            }
            
            const db = await conexion();

            await db.query('update actividades set ? where id_actividades = ?',[updateActividades,req.body.id_actividades])

            res.json('se actualizo correctamente')
        }

    }

    async establecerPortada(req:Request,res:Response)
    {
        let id_ai = req.params.id_ai;
        let id_actividad = req.params.id_actividad;

        const db = await conexion();

        //primero todas las imagenes pasan a estado cero
        const portadasEnEstadoCero = {
            portada:0,
        }
        await db.query('update imagenes_actividades set ? where id_actividad = ?',[portadasEnEstadoCero,id_actividad])

        //se selecciona una portada cambiando el valor a 1
        const datosImgActividad = {
            portada:1,
        }
        await db.query('update imagenes_actividades set ? where id_ai = ?',[datosImgActividad,id_ai])

        //se guarda la imagen seleccionada como portada en la tabla galeria
        const unaFila = await db.query('select * from imagenes_actividades where id_ai = ?',[id_ai])
        
        let datosActividades = {
            imagen_portada:unaFila[0].imagen_url
        }
        //se edita la url en con el dato sacado de iaganes_galeria en galeria
        await db.query('update actividades set ? where id_actividades = ?',[datosActividades,id_actividad])


        res.json('se establecio una portada')
    }
    
} 