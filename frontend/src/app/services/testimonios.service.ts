import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { ITestimonios } from "../models/testimonios";


@Injectable({
  providedIn: 'root'
})
export class TestimoniosService {

  constructor(private http:HttpClient) {


   }
  
   //obtener datos de testimonios desde la api
   getTestimonios()
   {
     return this.http.get<ITestimonios[]>('http://localhost:3000/testimonios');
   }

   getTestimoniospublic()
   {
     return this.http.get<ITestimonios[]>('http://localhost:3000/testimonios-public');
   }

   getOneTestimonio(id:number){
    return this.http.get<ITestimonios>('http://localhost:3000/testimonios/'+id);
   }

   
   saveTestimonio(dataTestimonio:ITestimonios, file:File){

    const fd = new FormData();

    fd.append('nombre', dataTestimonio.nombre);
    fd.append('edad', dataTestimonio.edad);
    fd.append('descripcion',dataTestimonio.descripcion);
    fd.append('imagen',file);
    fd.append('estado', dataTestimonio.estado);

    return this.http.post('http://localhost:3000/testimonios',fd);
   }

   updateTestimonio(dataTestimonio:ITestimonios,file:File){

    const fd= new FormData;

    let id = dataTestimonio.id_testimonio;

    fd.append('nombre', dataTestimonio.nombre);
    fd.append('edad', dataTestimonio.edad);
    fd.append('descripcion',dataTestimonio.descripcion);
    fd.append('imagen', file);
    fd.append('estado', dataTestimonio.estado);
    fd.append('public_id', dataTestimonio.public_id);

    return this.http.put('http://localhost:3000/testimonios/'+id, fd);
   }

   deleteTestimonio(fila:ITestimonios){
    let id = fila.id_testimonio;
    let public_id = fila.public_id;

    return this.http.delete('http://localhost:3000/testimonios/'+id+'/'+public_id);

   }


}
