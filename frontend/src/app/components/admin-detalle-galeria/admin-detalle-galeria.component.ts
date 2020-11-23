import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from "@angular/router";

import { GaleriaService } from "../../services/galeria.service";

import { IGaleriaDetalle } from '../../models/galeriaDetalle';

import { FormBuilder, FormGroup } from "@angular/forms";

import { IHtmlImputEvent } from '../../models/previewGaleria';

import { NgxSpinnerService } from "ngx-spinner";

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

  constructor(private fb:FormBuilder, private activatedrouter:ActivatedRoute, private servicegaleria:GaleriaService, private spinner: NgxSpinnerService) 
  { 
    this.formDetalleGaleria = this.fb.group({
      archive:['']
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
    this.spinner.show();
      this.servicegaleria.addimageGaleria(this.id_galeria, this.archivos).subscribe(
        resultado => {
          this.formDetalleGaleria.reset();
          this.listarImgGaleria(this.id_galeria);
          this.img_leidas = []
        },

        
        error => console.log(error)
        
      )
  }

}
