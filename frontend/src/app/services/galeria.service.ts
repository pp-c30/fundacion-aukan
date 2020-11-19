import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { IGaleria } from '../models/galeria';
@Injectable({
  providedIn: 'root'
})
export class GaleriaService {

  constructor(private http: HttpClient) {
  }


    savegaleria(datosgaleria: IGaleria,files:FileList)
    {
      const fd = new FormData();

      fd.append('titulo', datosgaleria.titulo);
      fd.append('categoria_gale', datosgaleria.categoria_gale);
      fd.append('fecha', datosgaleria.fecha);
      fd.append('estado', datosgaleria.estado);



      for (let index = 0; index < files.length; index++) {

        fd.append('imagen',files[index])
      }

      return this.http.post('http://localhost:3000/galeria', fd);

   }

   getGaleria()
   {
    return this.http.get<IGaleria[]>('http://localhost:3000/galeria');
   }
}
