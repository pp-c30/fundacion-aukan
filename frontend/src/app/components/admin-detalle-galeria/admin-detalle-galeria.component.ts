import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from "@angular/router";

import { GaleriaService } from "../../services/galeria.service";

import { IGaleriaDetalle } from '../../models/galeriaDetalle';

import { FormBuilder, FormGroup } from "@angular/forms";

import { IHtmlImputEvent } from '../../models/previewGaleria';


@Component({
  selector: 'app-admin-detalle-galeria',
  templateUrl: './admin-detalle-galeria.component.html',
  styleUrls: ['./admin-detalle-galeria.component.css']
})
export class AdminDetalleGaleriaComponent implements OnInit {

  id_galeria:number;

  img_galeria:IGaleriaDetalle[] = [];

  formDetalleGaleria:FormGroup

  archivos:FileList;

  img_leidas = [];

  constructor(private fb:FormBuilder, private activatedrouter:ActivatedRoute, private servicegaleria:GaleriaService) 
  { 
    this.formDetalleGaleria = this.fb.group({
      archivo:['']
    });
  }

  ngOnInit(): void {

    this.activatedrouter.params.subscribe(
      params => {
        this.id_galeria = params.id_galeria
      }
    );

    this.listarImgGaleria(this.id_galeria);

  }


  listarImgGaleria(id_galeria:number)
  {
    this.servicegaleria.getImgGaleria(id_galeria).subscribe(
      resultado => {
        this.img_galeria = resultado;
      },
      error => console.log(error)
    )
  }


  mostrarImgSeleccionadas(galeria:IHtmlImputEvent)
  {
    this.img_leidas = []

    this.archivos = galeria.target.files;

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


  agregarimagenesGaleria()
  {
      this.servicegaleria.addimageGaleria(this.id_galeria, this.archivos).subscribe(
        resultado => {
          this.formDetalleGaleria.reset();
          this.listarImgGaleria(this.id_galeria);
          this.img_leidas = [];
        },

        
        error => console.log(error)
        
      )
  }



  eliminarImgGaleria(id_gi:number,public_id:string)
  {
    if(confirm('Esta seguro de llevar a cabo esta accion')){

      this.servicegaleria.deleteImgGaleria(id_gi,public_id).subscribe(
        resultado => {
          console.log(resultado);
          this.listarImgGaleria(this.id_galeria);
        },
      );   
    }
  }

  establecerPortada(id_gi:number,id_galeria:number)
  {
    this.servicegaleria.assingPortada(id_gi,id_galeria).subscribe(
      resultado => {
        this.listarImgGaleria(this.id_galeria)
      }
    )
  }
}


