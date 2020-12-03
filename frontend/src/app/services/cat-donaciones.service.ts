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




}
