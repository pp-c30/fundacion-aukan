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



}
