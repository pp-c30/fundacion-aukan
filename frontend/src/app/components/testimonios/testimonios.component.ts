import { Component, OnInit } from '@angular/core';
import { TestimoniosService } from "../../services/testimonios.service";
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import {NgxSpinnerService } from "ngx-spinner";
import { AngularEditorConfig } from '@kolkov/angular-editor';

interface HtmlInputEvent{
  target:HTMLInputElement & EventTarget;
}

@Component({
  selector: 'app-testimonios',
  templateUrl: './testimonios.component.html',
  styleUrls: ['./testimonios.component.css']
})
export class TestimoniosComponent implements OnInit {

  editorConfig: AngularEditorConfig = {
    editable: true,
      spellcheck: true,
      height: 'auto',
      minHeight: '0',
      maxHeight: 'auto',
      width: 'auto',
      minWidth: '0',
      translate: 'yes',
      enableToolbar: true,
      showToolbar: true,
      placeholder: 'Enter text here...',
      defaultParagraphSeparator: '',
      defaultFontName: '',
      defaultFontSize: '',
      fonts: [
        {class: 'arial', name: 'Arial'},
        {class: 'times-new-roman', name: 'Times New Roman'},
        {class: 'calibri', name: 'Calibri'},
        {class: 'comic-sans-ms', name: 'Comic Sans MS'}
      ],
      customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],
    uploadUrl: 'v1/image',
    uploadWithCredentials: false,
    sanitize: true,
    toolbarPosition: 'top',
    toolbarHiddenButtons: [
      ['italic'],
      //['fontSize']
    ]
};

  lista_datos = [];

  formTestimonios:FormGroup;

  file:File;

  imagenPreview:string | ArrayBuffer;

  constructor(private serviceTestimonios:TestimoniosService, private router:Router, private fb:FormBuilder, private spinner:NgxSpinnerService) {

    this.formTestimonios = this.fb.group({
      id_testimonio:[null],
      nombre:['',[Validators.required,Validators.minLength(3)]],
      edad:[null],
      descripcion:['',[Validators.required,Validators.minLength]],
      archivo:[''],
      estado:[null] 
    });

   }

  ngOnInit(): void {

    this.listarTestimonio();

  }

  guardarTestimonio(){
     
    if(this.formTestimonios.value.id_testimonio){

      this.spinner.show();
      this.serviceTestimonios.updateTestimonio(this.formTestimonios.value,this.file).subscribe(
        resultado =>{
          console.log(resultado);
          this.imagenPreview = '';
          this.formTestimonios.reset();
          this.listarTestimonio();

          this.spinner.hide();
        },
        error=> console.log(error)
      )

    }else{
      this.serviceTestimonios.saveTestimonio(this.formTestimonios.value,this.file).subscribe(
        resultado => {
          console.log(resultado);
          
          this.imagenPreview = '';
          this.formTestimonios.reset();
          this.listarTestimonio();
          
        },
        error => console.log(error)
      )
    }


  }

  listarTestimonio(){
    this.serviceTestimonios.getTestimoniospublic().subscribe(
      resultado => {
        this.lista_datos = resultado;
      },
      error => console.log(error)
    );
  }

  verDetalle(id:number){
    this.router.navigate(['/detalle-testimonios',id]);
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
