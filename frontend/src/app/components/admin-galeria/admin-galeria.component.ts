import { Component, OnInit } from '@angular/core';

import { GaleriaService } from '../../services/galeria.service';
import { IGaleria } from '../../models/galeria';

import {FormBuilder, FormGroup, Validators } from "@angular/forms";

import { IHtmlImputEvent } from '../../models/previewGaleria';

import { NgxSpinnerService } from "ngx-spinner";

import { Router } from "@angular/router";

import { CatGaleriaService } from "../../services/cat-galeria.service";

import { ICategoriaG } from '../../models/catgaleria';

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

  listar_categoria:ICategoriaG[] = [];

  ocultar_btnfile:any = "display:block";

  constructor(private router:Router, private fb:FormBuilder, private serviceGaleria:GaleriaService,private spinner: NgxSpinnerService,private servicecatgaleria:CatGaleriaService ) { 

    this.formGaleria = this.fb.group({
      id_galeria:[null],
      titulo:['',[Validators.required]],
      categoria_gale:[null],
      fecha:['',[Validators.required]],
      estado:['',[Validators.required]],
      archivo:['']
    })
  }

  ngOnInit(): void {
    this.listaGaleria();
    this.obtenercategoria();
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
    if (this.formGaleria.value.id_galeria) 
    {
      this.spinner.show()
      this.serviceGaleria.updateGaleria(this.formGaleria.value).subscribe(
        resultado => {
          this.formGaleria.reset();
          this.listaGaleria();
          this.spinner.hide
        }
      )
    
    
    } else {
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
  }

  //este metodo se encarga de mostrar las imagenes seleccionadas antes de subirlas
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

  eliminarGaleria(id_galeria:number)
  {
    if(confirm('esta seguro de eliminar esta coleccion de imagenes?'))
    {
      this.serviceGaleria.deleteGaleria(id_galeria).subscribe(
        resultado=>{
          console.log(resultado);
          this.listaGaleria();
        }
      )
    }
  }

  editarGaleria(datosGaleria:IGaleria)
  {
    this.ocultar_btnfile ='display:none;'

    this.formGaleria.setValue({
      id_galeria:datosGaleria.id_galeria,
      titulo:datosGaleria.titulo,
      categoria_gale:datosGaleria.categoria_gale,
      fecha:datosGaleria.fecha,
      estado:datosGaleria.estado,
      archivo:''
    })
  }
  vaciarForm()
  { 
    this.ocultar_btnfile ='display:block;'

    this.formGaleria.setValue({
      id_galeria:null,
      titulo:null,
      categoria_gale:null,
      fecha:null,
      estado:null,
      archivo:''
    })
  }


  obtenercategoria()
  {
    this.servicecatgaleria.getCategoria().subscribe(
      resultado => {
        this.listar_categoria = resultado;
      }, error => console.log(error)
    )

  }


}
