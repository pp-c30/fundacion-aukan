import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { INoticia } from "../models/noticia";

@Injectable({
  providedIn: 'root'
})
export class NoticiaService {

  constructor(private http:HttpClient) {
    
  }

  getNoticia()
  {
    return this.http.get<INoticia[]>('http://localhost:3000/noticia');
  }

  getNoticiapublic()
  {
    return this.http.get<INoticia[]>('http://localhost:3000/noticia-public');
  }

  getOneNoticia(id:number){
    return this.http.get<INoticia>('http://localhost:3000/noticia/'+id);
   }


  saveNoticia(dataNoticia:INoticia, file:File){

    const fd = new FormData();

    fd.append('titulo', dataNoticia.titulo);
    fd.append('descripcion',dataNoticia.descripcion);
    fd.append('imagen',file);
    fd.append('fecha_hora', dataNoticia.fecha_hora);
    fd.append('categoria', dataNoticia.categoria);
    fd.append('estado', dataNoticia.estado);

    return this.http.post('http://localhost:3000/noticia',fd);
  }

  updateNoticia(dataNoticia:INoticia,file:File){

    const fd= new FormData;

    let id = dataNoticia.id_noticia;

    fd.append('titulo', dataNoticia.titulo);
    fd.append('descripcion',dataNoticia.descripcion);
    fd.append('imagen',file);
    fd.append('fecha_hora', dataNoticia.fecha_hora);
    fd.append('categoria', dataNoticia.categoria);
    fd.append('estado', dataNoticia.estado);
    fd.append('public_id', dataNoticia.public_id);

    return this.http.put('http://localhost:3000/noticia/'+id, fd);
   }

   deleteNoticia(fila:INoticia){
    let id = fila.id_noticia;
    let public_id = fila.public_id;

    return this.http.delete('http://localhost:3000/noticia/'+id+'/'+public_id);

   }

}
