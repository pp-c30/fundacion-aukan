import { Component, OnInit } from '@angular/core';

import { GaleriaService } from '../../services/galeria.service';
import { IGaleria } from '../../models/galeria';

import {FormBuilder, FormGroup, Validators } from "@angular/forms";

import { IHtmlImputEvent } from '../../models/previewGaleria';

import { NgxSpinnerService } from "ngx-spinner";

import { Router } from "@angular/router";
@Component({
  selector: 'app-admin-galeria',
  templateUrl: './admin-galeria.component.html',
  styleUrls: ['./admin-galeria.component.css']
})
export class AdminGaleriaComponent implements OnInit {

  galeria:IGaleria[] = [];

  formGaleria:FormGroup;

  archivos:FileList;

  img_url = [];

  constructor(private router:Router, private fb:FormBuilder, private serviceGaleria:GaleriaService,private spinner: NgxSpinnerService ) { 

    this.formGaleria = this.fb.group({
      titulo:['',[Validators.required]],
      categoria_gale:['',[Validators.required]],
      fecha:['',[Validators.required]],
      estado:['',[Validators.required]],
      archivo:['']



    })



  }



  ngOnInit(): void {
    this.listaGaleria();
  }

  listaGaleria()
  {
    this.serviceGaleria.getGaleria().subscribe(
      resultado=>{
        this.galeria = resultado
      }
    )
  }


  guardarGaleria()
  {
    this.spinner.show();
    this.serviceGaleria.savegaleria(this.formGaleria.value,this.archivos).subscribe(
        resultado => {
          console.log(resultado);
          this,this.img_url = []
          this.formGaleria.reset();
          this.listaGaleria();

          this.spinner.hide();
        },
        error => console.log(error)
        
    )
  }



  previewGaleria(galeria:IHtmlImputEvent)
  {
      this.img_url = []

      this.archivos = galeria.target.files;

      if(this.archivos)
      {
        for (let index = 0; index < this.archivos.length; index++) {
       
            const reader = new FileReader();


            //se hace la lectura de los archivos
            reader.readAsDataURL(this.archivos[index]);

            // se obtiene la url de cada archivo
            reader.onload = () => {
                this.img_url.push(reader.result)

            }
          
        }
      }
  }

//metodo encargado de mostrar detalles de galeria
detalleEvento(id_galeria:number)
{
  this.router.navigate(['/admin-detalle-galeria', id_galeria]);
}



}
