import { conexion } from "../database";
import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt, { sign } from "jsonwebtoken";

export class AutenticacionController 
{

    async registrar (req:Request, res:Response)
    {
        const salt =await bcrypt.genSalt(10);

        const password_cifrada = await bcrypt.hash(req.body.password,salt);

        const unUsuario = {
            username:req.body.username,
            password:password_cifrada,
            email:req.body.email
        }

        const db = await conexion();

        const resultado =  await db.query('insert into usuario set ?',[unUsuario]);

        const token:string = jwt.sign({_id:resultado.insertId},process.env.TOKEN_SECRET || 'tkn3scrt4fkn8')

        res.json(token);
    }

    async ingresar (req:Request, res:Response)
    {
        const db = await conexion();

        const usuario = await db.query('select * from usuario where username = ?',[req.body.username]);

        if (!usuario[0]) 
        {
            res.json('usuario o contraeña incorrecta')
        }else {
            const correctpassword = await bcrypt.compare(req.body.password, usuario[0].password);
            
            if (!correctpassword) {
                res.json('Constraseña incorrecta');
            }else{

                const token:string = jwt.sign({_id:usuario[0].id_usuario},process.env.TOKEN_SECRET || 'tkn3scrt4fkn8',{
                    expiresIn:60*60*24
                })

                res.header('auth-token',token).json(usuario[0]);

            }

        }

    }

}