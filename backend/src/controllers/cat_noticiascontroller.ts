import {Response, Request} from 'express';
import {conexion} from '../database';
import { ICatnoticia } from '../models/cat_noticias';

export class Catnoticiacontroller
{
    public async listarcatnoticias(req:Request,res:Response)
    {
        const db = await conexion();

        let catnoticia = await db.query('select * from categoria_noticia');

        return res.json(catnoticia) 
    };

    public async guardarcatnoticias(req:Request,res:Response)
    {
        const db = await conexion();

        const catnoticia:ICatnoticia = req.body;

        await db.query("insert into categoria_noticia set ?",[catnoticia]);

        return res.json('los datos se ingresaron exitosamente');

    }

    public async eliminarcatnoticia(req:Request, res:Response)
    {
        const db = await conexion();

        let id = req.params.id;

        await db.query('delete from categoria_noticia where id_cn =?',id);

        return res.json("los datos se eliminaron exitosamente");
    }

    public async actualizarcatnoticia(req:Request, res:Response)
    {
        const db = await conexion();

        let id = req.params.id;

        let catnoticia:ICatnoticia = req.body;

        await db.query('update categoria_noticia set ? where id_cn =?',[catnoticia,id]);

        return res.json('los datos se actualizaron exitosamente');

    }

    public async buscarcatnoticia(req:Request, res:Response)
    {
        const db = await conexion();

        let id = req.params.id;

        let catnoticia = await db.query('select * from categoria_noticia where id_cn = ? ',[id]);

        return res.json(catnoticia[0]);

    }


}