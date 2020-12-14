import { Request,Response, NextFunction } from "express";
import jwt from "jsonwebtoken";


export function validarToken(req:Request, res:Response,next:NextFunction)
{
    const token:any =  req.header('auth-token');

    if (!token) {
        res.json('¡acceso denegado!');
    } 

    const datosToken = jwt.verify(token,process.env.TOKEN_SECRET || 'tkn3scrt4fkn8')

    console.log(datosToken);

    next();
}