import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { IActividades } from "../../models/actividades";
import { ActividadesService } from "../../services/actividades.service";

@Component({
  selector: 'app-detalle-actividades',
  templateUrl: './detalle-actividades.component.html',
  styleUrls: ['./detalle-actividades.component.css']
})
export class DetalleActividadesComponent implements OnInit {

  actividades:IActividades
  id_actividades:number;
  titulo:string;
  descripcion:string;
  categoria_actividades:number;
  fecha_hora:any;
  estado:any;

  lista_imagenes:any = []

  constructor(private activeroute:ActivatedRoute, private serviceActividades:ActividadesService) { }

  ngOnInit(): void {
    this.activeroute.queryParams.subscribe(
      params =>{
        this.id_actividades = params.id_actividades;
        this.titulo = params.titulo;
        this.descripcion = params.descripcion;
        this.categoria_actividades = params.categoria_actividades;
        this.fecha_hora = params.fecha_hora;
        this.estado = params.estado;
      }
    )

    this.obtenerimagenesActividades();
  }


  obtenerimagenesActividades()
  {
    this.serviceActividades.getImagesActividades(this.id_actividades).subscribe(
      resultado => {
        this.lista_imagenes = resultado
      },
      error => console.log(error)
      
    ) 
    
  }
}
