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
   getTestimonios(){
     return this.http.get<ITestimonios[]>('http://localhost:3000/testimonios');
   }
   
   saveTestimonio(dataTestimonio:ITestimonios, file:File){

    const fd = new FormData();

    fd.append('nombre', dataTestimonio.nombre);
    fd.append('descripcion',dataTestimonio.descripcion);
    fd.append('imagen',file);

    return this.http.post('http://localhost:3000/testimonios',fd);
   }
}
