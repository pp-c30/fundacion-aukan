import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { IUsuario } from '../models/usuario';
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {

  constructor(private http:HttpClient, private router:Router) {}


  register(datosregistro:IUsuario)
  {
   return this.http.post('http://localhost:3000/registro',datosregistro);
  }

  login(datosingreso:IUsuario)
  {
    return this.http.post('http://localhost:3000/ingreso',datosingreso)
  }

  verifyLoggedUser()
  {
    if (localStorage.getItem('token')) {
      return true;
    }
  }

  logOut()
  {
    localStorage.removeItem('token');
    this.router.navigate(['/ingreso'])
  }

  }
