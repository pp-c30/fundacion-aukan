import {Response, Request} from 'express';
import {conexion} from '../database';

export class Catgaleriacontroller
{
    public async listarcatgaleria(req:Request,res:Response)
    {
        const db = await conexion();

        let catgaleria = await db.query('select * from categoria_galeria');

        return res.json(catgaleria)   
    }



}