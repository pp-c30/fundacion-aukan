import { Injectable } from '@angular/core';

import { HttpClient } from "@angular/common/http"; 

import { IActividades } from "../models/actividades";

import { IActividadesDetalle } from '../models/actividadesDetalle';
@Injectable({
  providedIn: 'root'
})
export class ActividadesService {

  constructor( private http:HttpClient) {

   }

   updateActividades(datosActividades:IActividades)
   {
     let id_actividades = datosActividades.id_actividades
     return this.http.put('http://localhost:3000/actividadesimg/'+id_actividades,datosActividades)
   }

   saveActividades(datosActividades: IActividades,files:FileList)
   {
    let fecha_hora = datosActividades.fecha_hora.year+'-'+datosActividades.fecha_hora.month+'-'+datosActividades.fecha_hora.day;
     const fd = new FormData(); 

     fd.append('titulo', datosActividades.titulo);
     fd.append('descripcion', datosActividades.descripcion);
     fd.append('categoria_actividad', datosActividades.categoria_actividad);
     fd.append('fecha_hora', fecha_hora);
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

  getActividadespublic()
  {
    return this.http.get<IActividades[]>('http://localhost:3000/actividades-public'); 
  }

  getImagesActividades(id_actividad:number)
  {
    return this.http.get<IActividadesDetalle[]>('http://localhost:3000/actividades-imagenes/'+id_actividad);
  }

  addimageActividad(id_actividad:number, files:FileList)
  {
    const fd = new FormData();
    for (let index = 0; index < files.length; index++) {
        

      fd.append('imagen', files[index])
    }
   return this.http.put('http://localhost:3000/agregar-imagenes-actividad/'+id_actividad, fd);
  }

  deleteImgActividad (id_ai:number, public_id:string)
   {
    return this.http.delete('http://localhost:3000/actividad-imagenes-detalle/'+id_ai+'/'+public_id);
   }


  deleteactividades(id_actividades:number)
   {
     return this.http.delete('http://localhost:3000/actividadimg/'+id_actividades);
   }

   
   assingPortada(id_ai:number,id_actividad:number)
   {
    return this.http.get('http://localhost:3000/actividad-portada/'+id_ai+'/'+id_actividad)
   }

}
