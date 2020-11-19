import { Component, OnInit } from '@angular/core';
import { ITestimonios } from 'src/app/models/testimonios';
import { TestimoniosService } from "../../services/testimonios.service";

import { FormBuilder, FormGroup, Validators } from "@angular/forms";

interface HtmlInputEvent{
  target:HTMLInputElement & EventTarget;
}


@Component({
  selector: 'app-admin-testimonios',
  templateUrl: './admin-testimonios.component.html',
  styleUrls: ['./admin-testimonios.component.css']
})
export class AdminTestimoniosComponent implements OnInit {

  listado_datos_testimonios = [];

  formTestimonios:FormGroup;

  file:File;

  imagenPreview:string | ArrayBuffer;


  constructor(private serTestimonios:TestimoniosService, private fb:FormBuilder) {

    this.formTestimonios = this.fb.group({
      id_testimonio:[''],
      nombre:['',[Validators.required,Validators.minLength(3)]],
      edad:[''],
      descripcion:['',[Validators.required,Validators.minLength]],
      archivo:[''],
      estado:[''] 
    });

   }

  ngOnInit(): void {
    this.listarTestimonios();
  }

  listarTestimonios(){
    this.serTestimonios.getTestimonios().subscribe(
      resultado =>{
        this.listado_datos_testimonios = resultado;
      },
      error => console.log(error)
    );

  }

  guardarTestimonio(){
     
    this.serTestimonios.saveTestimonio(this.formTestimonios.value,this.file).subscribe(
      resultado => {
        console.log(resultado);
        
        this.imagenPreview = '';
        this.formTestimonios.reset();
        this.listarTestimonios();
        
      },
      error => console.log(error)
    )

  }

  editarTestimonio(fila:ITestimonios){
    this.formTestimonios.setValue({
      id_testimonio:fila.id_testimonio,
      nombre:fila.nombre,
      descripcion:fila.descripcion
    });
  }

  mostrarFotoSeleccionada(evento:HtmlInputEvent){
    //realizaremos la lectura de la foto
    //preguntamos si existe una imagen, si es asi preguntamos si existe la primer img
    if(evento.target.files && evento.target.files[0]){
      this.file = evento.target.files[0];

      //reader es una herramienta del navegador para lograr leer archivos
      const reader = new FileReader();

      /*
      *configuramos reader para que al momento de lectura sepa donde guardar la misma
      *Se guardara en imagenPreview
      */
      reader.onload = (e) => {
        this.imagenPreview = reader.result;
      }

      //finalmente se le dice que archivo debe leer para mostrarlo como vista previa
      //se ejecuta la lectura
      reader.readAsDataURL(this.file)
    }

  }
}
