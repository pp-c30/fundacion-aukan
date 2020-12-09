import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { IPrevencion } from "../models/prevencion";


@Injectable({
  providedIn: 'root'
})
export class PrevencionService {

  constructor(private http:HttpClient) { }

  //obtenes datos desde la api
  getPrevencion(){
    return this.http.get<IPrevencion[]>('http://localhost:3000/prevencion');
  }

  getOnePrevencion(id:number){
    return this.http.get<IPrevencion>('http://localhost:3000/prevencion/'+id);
  }

   savePrevencion(dataPrevencion:IPrevencion, file:File){

    const fd = new FormData();

    fd.append('titulo',dataPrevencion.titulo);
    fd.append('descripcion',dataPrevencion.descripcion);
    fd.append('imagen',file);
    fd.append('categoria_prev',dataPrevencion.categoria_prev);
    fd.append('estado', dataPrevencion.estado);

    return this.http.post('http://localhost:3000/prevencion',fd);
   }

   updatePrevencion(dataPrevencion:IPrevencion,file:File){

    const fd= new FormData;

    let id = dataPrevencion.id_prevencion;

    fd.append('titulo', dataPrevencion.titulo);
    fd.append('descripcion',dataPrevencion.descripcion);
    fd.append('imagen',file);
    fd.append('categoria_prev', dataPrevencion.categoria_prev);
    fd.append('estado', dataPrevencion.estado);
    fd.append('public_id', dataPrevencion.public_id);

    return this.http.put('http://localhost:3000/prevencion/'+id, fd);
   }

   deletePrevencion(fila:IPrevencion){
    let id = fila.id_prevencion;
    let public_id = fila.public_id;

    return this.http.delete('http://localhost:3000/prevencion/'+id+'/'+public_id);

   }

}
