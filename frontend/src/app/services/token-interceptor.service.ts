import { Injectable } from '@angular/core';
import { HttpInterceptor } from "@angular/common/http";
import { Request, NextFunction } from 'express';
@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor() { }


  intercept(req:Request,next:NextFunction)
  {

    const tokenizeRequest = req.clone({
      setHeaders:{
        Authorization:String(localStorage.getItem('token'))
      }
    });

    return next.handle(tokenizeRequest);
  }
}
