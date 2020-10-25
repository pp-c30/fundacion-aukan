import { conexion } from "../database";
import { Request,Response } from "express";
import { ITestimonios } from "../models/testimonios";

export class TestimoniosController{

    public async listarTestimonios(req:Request,res:Response){

        const db = await conexion();

        let testimonios = await db.query('select * from testimonios');

        return res.json (testimonios);
    }

    public async guardarTestimonios(req:Request,res:Response){

        const db= await conexion();

        const testimonios:ITestimonios = req.body;

        await db.query('inset into testimonios set ?', [testimonios]);

        return res.json('Los datos fueron guardados con exito');
    }

    public async eliminarTestimonios(req:Request,res:Response){

        const db = await conexion();

        let id = req.params.id;

        await db.query('delete from testimonios where id_testimonios = ?', [id]);

        return res.json('Los datos fueron eliminados con exito');

    }

    public async actualizarTestimonios(req:Request,res:Response){

        const db = await conexion();

        let id= req.params.id;

        let testimoniosActualizada = req.body;

        await db.query('update testimonios set ? where id_testimonios = ?', [testimoniosActualizada,id]);

        return res.json('Los datos fueron actualizados con exito');
    }

    public async buscarTestimonios(req:Request,res:Response){

        const db = await conexion();

        let id = req.params.id;

        let testimonios = await db.query('select * from testimonios where id_testimonios = ?', [id]);
        
        return res.json(testimonios [0]);
    }
}