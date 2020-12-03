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








}
