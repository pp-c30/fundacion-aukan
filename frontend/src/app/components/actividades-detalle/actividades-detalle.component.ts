import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { ActividadesService } from '../../services/actividades.service';
import { IActividades } from '../../../../../backend/src/models/actividades';


@Component({
  selector: 'app-actividades-detalle',
  templateUrl: './actividades-detalle.component.html',
  styleUrls: ['./actividades-detalle.component.css']
})
export class ActividadesDetalleComponent implements OnInit {

  actividad:IActividades;

  id_actividad:number;
  titulo:string;
  descripcion:string;
  fecha_hora:any;

  lista_imagenes:any = []


  constructor(private activroute:ActivatedRoute, private actividadesserv:ActividadesService) { }

  ngOnInit(): void {
    this.activroute.queryParams.subscribe(
      params =>{
        this.id_actividad = params.id_actividades;
        this.titulo = params.titulo;
        this.descripcion = params.descripcion;
        this.fecha_hora = params.fecha_hora;
      }
    )
    this.obtenerimagenesactividades()
  }

  obtenerimagenesactividades()
  {
    this.actividadesserv.getImagesActividades(this.id_actividad).subscribe(
      resultado => {
        this.lista_imagenes = resultado
      },
      error => console.log(error)
      
    ) 
    
  }

}
