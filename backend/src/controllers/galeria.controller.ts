import {Response, Request} from 'express';
import {conexion} from '../database';
import { Igaleria } from '../models/galeria';

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
        const db = await conexion();

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