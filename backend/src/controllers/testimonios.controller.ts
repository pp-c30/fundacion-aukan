import { conexion } from "../database";
import { query, Request,Response } from "express";
import cloudinary from "cloudinary";
import  fs  from "fs-extra";

cloudinary.v2.config({
    cloud_name:'lemillion',
    api_key:'323978568364464',
    api_secret:'xgECcAjSh7FL_bzLWt3QKBv3doY'
})



export class TestimoniosController{

    public async listarTestimonios(req:Request,res:Response){

        const db = await conexion();

        let testimonios = await db.query('select * from testimonios');

        return res.json (testimonios);
    }

    public async guardarTestimonios(req:Request,res:Response){

        const db= await conexion();

        const url_img = req.file.path;

        const resultado_cloud  = await cloudinary.v2.uploader.upload(req.file.path);

         console.log(resultado_cloud)
        const guardartestimonio = {
            nombre:req.body.nombre,
            edad:req.body.edad,
            descripcion:req.body.descripcion,
            imagen:resultado_cloud.url,
            estado:req.body.estado,
            public_id:resultado_cloud.public_id

        }


        await db.query('insert into testimonios set ?', [guardartestimonio]);

        fs.unlink(req.file.path)

        return res.json('La imagen fue guardada con exito');
    }

    public async eliminarTestimonios(req:Request,res:Response){

        let id = req.params.id;
        let public_id = req.params.public_id;

        //eliminamos imagen de cloudinary
        await cloudinary.v2.uploader.destroy(public_id);        

        const db = await conexion();
        //eliminamos registro en la base
        await db.query('delete from testimonios where id_testimonio = ?', [id]);

        return res.json('Los datos fueron eliminados con exito');

    }

    public async actualizarTestimonios(req:Request,res:Response){
        try {
            const db = await conexion();
            let id= req.params.id;
            var updateTestimonio;
            var public_id_anterior = req.body.public_id;

            if(req.file){
                //se sube imagen a cloudinary y se genera public_id
                const resultado_cloud = await cloudinary.v2.uploader.upload(req.file.path);
                updateTestimonio = {
                    nombre:req.body.nombre,
                    edad:req.body.edad,
                    descripcion:req.body.descripcion,
                    imagen:resultado_cloud.url,
                    estado:req.body.estado,
                    public_id:resultado_cloud.public_id
                }
                await db.query('update testimonios set ? where id_testimonio = ?', [updateTestimonio,id]);

                fs.unlink(req.file.path);
                await cloudinary.v2.uploader.destroy(public_id_anterior);
            }else{
                updateTestimonio = {
                    nombre:req.body.nombre,
                    edad:req.body.edad,
                    descripcion:req.body.descripcion,
                    estado:req.body.estado
                }
                await db.query('update testimonios set ? where id_testimonio = ?', [updateTestimonio,id]);
            }
            res.json('Se actualizo exitosamente');
        } catch (error) {
            console.error(error);
        }
    }

    public async listarUnTestimonio(req:Request,res:Response){

        const db = await conexion();

        let id = req.params.id;

        let testimonios = await db.query('select * from testimonios where id_testimonio = ?', [id]);
        
        return res.json(testimonios [0]);
    }
}