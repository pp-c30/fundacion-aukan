import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { ActividadesService } from '../../services/actividades.service';
import { IActividadesDetalle } from '../../models/actividadesDetalle';
import { FormBuilder, FormGroup } from "@angular/forms";
import { IHtmlImputEvent } from '../../models/previewGaleria';
@Component({
  selector: 'app-admin-detalle-actividades',
  templateUrl: './admin-detalle-actividades.component.html',
  styleUrls: ['./admin-detalle-actividades.component.css']
})
export class AdminDetalleActividadesComponent implements OnInit {

  id_actividad:number;

  img_actividad:IActividadesDetalle[] = [];

  formDetalleActividad:FormGroup

  archivos:FileList;

  img_leidas = [];


  constructor(private activater:ActivatedRoute, private actividadesserv:ActividadesService, private fb:FormBuilder) {
    this.formDetalleActividad = this.fb.group({
      archive:['']
    });
   }

  ngOnInit(): void {
    
    this.activater.params.subscribe(
      params =>{
        this.id_actividad = params.id_actividad
      }
    )

    this.listarImgActividad(this.id_actividad);
  }

  listarImgActividad(id_actividad:number)
  {
    this.actividadesserv.getImagesActividades(id_actividad).subscribe(
      resultado => {
        this.img_actividad = resultado;
      },
      error => console.log(error)
    )
  }

  mostrarImgSeleccionadas(actividad:IHtmlImputEvent)
  {
    this.img_leidas = []

    this.archivos = actividad.target.files;

    if (this.archivos)
    {
      for (let index = 0; index < this.archivos.length; index++) {
          const reader = new FileReader();

          reader.readAsDataURL(this.archivos[index])

          reader.onload = () => {
              this.img_leidas.push(reader.result);
          }
      }
    }
  }

  agregarimagenesActividad()
  {
      this.actividadesserv.addimageActividad(this.id_actividad, this.archivos).subscribe(
        resultado => {
          this.formDetalleActividad.reset();
          this.listarImgActividad(this.id_actividad);
          this.img_leidas = [];
        },

        
        error => console.log(error)
        
      )
  }

  eliminarImgActividad(id_ai:number,public_id:string)
  {
    if(confirm('Esta seguro de llevar a cabo esta accion')){

      this.actividadesserv.deleteImgActividad(id_ai,public_id).subscribe(
        resultado => {
          console.log(resultado);
          this.listarImgActividad(this.id_actividad);
        },
      );   
    }
  }

  establecerPortada(id_ai:number,id_actividad:number)
  {
    this.actividadesserv.assingPortada(id_ai,this.id_actividad).subscribe(
      resultado => {
        this.listarImgActividad(this.id_actividad)
      }
    )
  }




}
