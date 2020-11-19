import { Injectable } from '@angular/core';

import { HttpClient } from "@angular/common/http"; 

import { IActividades } from "../models/actividades";

@Injectable({
  providedIn: 'root'
})
export class ActividadesService {

  constructor( private http:HttpClient) {

   }

   saveActividades(datosActividades: IActividades,files:FileList)
   {
     const fd = new FormData(); 

     fd.append('titulo', datosActividades.titulo);
     fd.append('descripcion', datosActividades.descripcion);
     fd.append('categoria_actividad', datosActividades.categoria_actividad);
     fd.append('fecha_hora', datosActividades.fecha_hora);
     fd.append('estado', datosActividades.estado); 

     for (let index = 0; index < files.length; index++) {
       fd.append('imagen', files[index]); 
       
     }
     return this.http.post('http://localhost:3000/actividades', fd); 
   }
  
getActividades()
{
  return this.http.get<IActividades[]>('http://localhost:3000/actividades'); 
}


}
