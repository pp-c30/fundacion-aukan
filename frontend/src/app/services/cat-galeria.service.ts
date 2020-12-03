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
  return this.http.get<ICategoriaG[]>('http://localhost:3000/catgaleria')
}









}
