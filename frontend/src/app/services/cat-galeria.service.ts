import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

import { ICategoriaG } from '../models/catgaleria';

@Injectable({
  providedIn: 'root'
})
export class CatGaleriaService {

  constructor(private http:HttpClient ) { }

  getCategoria()  
  {
    return this.http.get<ICategoriaG[]>('http://localhost:3000/catgaleria');
  }

  savecategoria(categoria:ICategoriaG)
  {
    return this.http.post('http://localhost:3000/catgaleria',categoria); 
  }

  updatecategoria(categoria:ICategoriaG)
  {
    let id:number = categoria.id_cg;
    return this.http.put('http://localhost:3000/catgaleria/'+id,categoria);
  }

  deletecategoria(id:number)
  {
    return this.http.delete('http://localhost:3000/catgaleria/'+id);
  }









}
