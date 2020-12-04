import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

import { ICategoriaP } from "../models/catprevencion";

@Injectable({
  providedIn: 'root'
})
export class CatPrevencionService {

  constructor(private http:HttpClient) { }

  getCategoria()
  {
    return this.http.get<ICategoriaP[]>('http://localhost:3000/catprevencion')
  }

  savecategoria(categoria:ICategoriaP)
  {
    return this.http.post('http://localhost:3000/catprevencion',categoria); 
  }

  updatecategoria(categoria:ICategoriaP)
  {
    let id:number = categoria.id_cp;
    return this.http.put('http://localhost:3000/catprevencion/'+id,categoria);
  }

  deletecategoria(id:number)
  {
    return this.http.delete('http://localhost:3000/catprevencion/'+id);
  }
}
