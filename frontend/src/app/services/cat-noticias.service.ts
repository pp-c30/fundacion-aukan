import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

import { ICategoriaN } from "../models/catnoticias";

@Injectable({
  providedIn: 'root'
})
export class CatNoticiasService {

  constructor(private http:HttpClient) { }

  getCategoria()
  {
    return this.http.get<ICategoriaN[]>('http://localhost:3000/catnoticia')
  }

  savecategoria(categoria:ICategoriaN)
  {
    return this.http.post('http://localhost:3000/catnoticia',categoria); 
  }

  updatecategoria(categoria:ICategoriaN)
  {
    let id:number = categoria.id_cn;
    return this.http.put('http://localhost:3000/catnoticia/'+id,categoria);
  }

  deletecategoria(id:number)
  {
    return this.http.delete('http://localhost:3000/catnoticia/'+id);
  }




}
