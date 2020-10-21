import { Response, Request } from 'express';
import {conexion} from '../database';
import { ICatdonaciones } from '../models/cat_donaciones';

export class Catdonacionescontroller
{
    public async listarcatdonaciones(req:Request,res:Response)
    {
        const db = await conexion();

        let catdonaciones = await db.query('select * from categoria_donaciones');

        return res.json(catdonaciones)   
    }

    public async guardarcatdonaciones(req:Request,res:Response)
    {
        const db = await conexion();

        const catdonaciones:ICatdonaciones = req.body;

        await db.query("insert into categoria_donaciones set ?",[catdonaciones]);

        return res.json('los datos se ingresaron exitosamente');

    }

    public async eliminarcatdonaciones(req:Request, res:Response)
    {
        const db = await conexion();

        let id = req.params.id;

        await db.query('delete from categoria_donaciones where id_cd =?',id);

        return res.json("los datos se eliminaron exitosamente");
    }

    public async actualizarcatdonaciones(req:Request, res:Response)
    {
        const db = await conexion();

        let id = req.params.id;

        let catdonaciones:ICatdonaciones = req.body;

        await db.query('update categoria_donaciones set ? where id_cd =?',[catdonaciones,id]);

        return res.json('los datos se actualizaron exitosamente');

    }

    public async buscarcatdonaciones(req:Request, res:Response)
    {
        const db = await conexion();

        let id = req.params.id;

        let catdonaciones = await db.query('select * from categoria_donaciones where id_cd = ? ',[id]);

        return res.json(catdonaciones[0]);

    }

}

