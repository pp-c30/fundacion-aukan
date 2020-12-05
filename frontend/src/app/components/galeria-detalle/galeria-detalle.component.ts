import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { IGaleria } from '../../models/galeria';
import { GaleriaService } from '../../services/galeria.service';

@Component({
  selector: 'app-galeria-detalle',
  templateUrl: './galeria-detalle.component.html',
  styleUrls: ['./galeria-detalle.component.css']
})
export class GaleriaDetalleComponent implements OnInit {

  galeria:IGaleria

  id_galeria:number;
  titulo:string;
  categoria_gale:number;
  fecha:any;

  lista_imagenes:any = []



  constructor(private activeroute:ActivatedRoute, private servicegaleria:GaleriaService) { }



  ngOnInit(): void {
    this.activeroute.queryParams.subscribe(
      params =>{
        this.id_galeria = params.id_galeria;
        this.titulo = params.titulo;
        this.categoria_gale = params.categoria_gale;
        this.fecha = params.fecha;
      }
    )

    this.obtenerimagenesGaleria();
  }

  obtenerimagenesGaleria()
  {
    this.servicegaleria.getImgGaleria(this.id_galeria).subscribe(
      resultado => {
        this.lista_imagenes = resultado
      },
      error => console.log(error)
      
    ) 
    
  }


}
