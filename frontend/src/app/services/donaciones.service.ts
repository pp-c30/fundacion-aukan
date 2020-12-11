import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

import { IDonacionesS } from '../models/donaciones';
@Injectable({
  providedIn: 'root'
})
export class DonacionesService {

  constructor(private http:HttpClient) { }


  getDonacion()  
  {
    return this.http.get<IDonacionesS[]>('http://localhost:3000/donaciones');
  }

  saveDonacion(donaciones:IDonacionesS)
  {
    return this.http.post('http://localhost:3000/donaciones',donaciones); 
  }

  updateDonacion(donaciones:IDonacionesS)
  {
    let id:number = donaciones.id_donacion;
    return this.http.put('http://localhost:3000/donaciones/'+id,donaciones);
  }

  deleteDonacion(id:number)
  {
    return this.http.delete('http://localhost:3000/donaciones/'+id);
  }




}
