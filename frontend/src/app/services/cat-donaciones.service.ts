import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

import { ICategoriaD } from '../models/catdonaciones';

@Injectable({
  providedIn: 'root'
})
export class CatDonacionesService {

  constructor(private http:HttpClient) { }


getCategoria()
{
  return this.http.get<ICategoriaD[]>('http://localhost:3000/catdonaciones')
}

savecategoria(categoria:ICategoriaD)
{
  return this.http.post('http://localhost:3000/catdonaciones',categoria); 
}

updatecategoria(categoria:ICategoriaD)
  {
    let id:number = categoria.id_cd;
    return this.http.put('http://localhost:3000/catdonaciones/'+id,categoria);
  }

  deletecategoria(id:number)
  {
    return this.http.delete('http://localhost:3000/catdonaciones/'+id);
  }

}
