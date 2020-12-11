import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { IGaleria } from '../models/galeria';

import { IGaleriaDetalle } from '../models/galeriaDetalle';

@Injectable({
  providedIn: 'root'
})
export class GaleriaService {

  constructor(private http: HttpClient) {
  }
    updateGaleria(datosGaleria:IGaleria)
    {
      let id_galeria = datosGaleria.id_galeria
      return this.http.put('http://localhost:3000/galeriaimg/'+id_galeria,datosGaleria)
    }

    savegaleria(datosgaleria: IGaleria,files:FileList)
    {
      let fecha = datosgaleria.fecha.year+'-'+datosgaleria.fecha.month+'-'+datosgaleria.fecha.day;
      const fd = new FormData();

      fd.append('titulo', datosgaleria.titulo);
      fd.append('categoria_gale', datosgaleria.categoria_gale);
      fd.append('fecha', fecha);
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

   getImgGaleria(id_galeria:number)
   {
     return this.http.get<IGaleriaDetalle[]>('http://localhost:3000/galeria-imagenes/'+id_galeria);
   }

   addimageGaleria(id_galeria:number, files:FileList)
   {
      const fd = new FormData();

      for (let index = 0; index < files.length; index++) {
        

        fd.append('imagen', files[index])
      }

      

     return this.http.put('http://localhost:3000/agregar-imagenes-galeria/'+id_galeria, fd);
   }

   deleteImgGaleria (id_gi:number, public_id:string)
   {
    return this.http.delete('http://localhost:3000/galeria-imagenes-detalle/'+id_gi+'/'+public_id);
   }

   deleteGaleria(id_galeria:number)
   {
     return this.http.delete('http://localhost:3000/galeriaimg/'+id_galeria);
   }


   //metodo encargado de editar un registro y poner la portada en estado 0 (cero)
   assingPortada(id_gi:number,id_galeria:number)
   {
    return this.http.get('http://localhost:3000/galeria-portada/'+id_gi+'/'+id_galeria)
   }
}
