import {Response, Request} from 'express';
import {conexion} from '../database';
import { ICatgaleria } from '../models/cat_galeria';

export class Catgaleriacontroller
{
    public async listarcatgaleria(req:Request,res:Response)
    {
        const db = await conexion();

        let catgaleria = await db.query('select * from categoria_galeria');

        return res.json(catgaleria)   
    }

    public async guardarcatgaleria(req:Request,res:Response)
    {
        const db = await conexion();

        const catgaleria:ICatgaleria = req.body;

        await db.query("insert into categoria_galeria set ?",[catgaleria]);

        return res.json('los datos se ingresaron exitosamente');

    }

    public async eliminarcatgaleria(req:Request, res:Response)
    {
        const db = await conexion();

        let id = req.params.id;

        await db.query('delete from categoria_galeria where id_cg =?',id);

        return res.json("los datos se eliminaron exitosamente");
    }

    public async actualizarcatgaleria(req:Request, res:Response)
    {
        const db = await conexion();

        let id = req.params.id;

        let catgaleria:ICatgaleria = req.body;

        await db.query('update categoria_galeria set ? where id_cg =?',[catgaleria,id]);

        return res.json('los datos se actualizaron exitosamente');

    }

    public async buscarcatgaleria(req:Request, res:Response)
    {
        const db = await conexion();

        let id = req.params.id;

        let catgaleria = await db.query('select * from categoria_galeria where id_cg = ? ',[id]);

        return res.json(catgaleria[0]);

    }



}