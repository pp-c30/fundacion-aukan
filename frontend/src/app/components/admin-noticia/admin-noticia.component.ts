import { Component, OnInit } from '@angular/core';
import { INoticia } from "src/app/models/noticia";
import { NoticiaService } from "../../services/noticia.service";

import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import {NgxSpinnerService } from "ngx-spinner";

import { CatNoticiasService } from "../../services/cat-noticias.service";

import { ICategoriaN } from "../../models/catnoticias";
import { AngularEditorConfig } from '@kolkov/angular-editor';

interface HtmlInputEvent{
  target:HTMLInputElement & EventTarget;
}

@Component({
  selector: 'app-admin-noticia',
  templateUrl: './admin-noticia.component.html',
  styleUrls: ['./admin-noticia.component.css']
})
export class AdminNoticiaComponent implements OnInit {

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

  listado_datos_noticia = [];

  formNoticia:FormGroup;

  file:File;

  imagenPreview:string | ArrayBuffer;

  listar_categoria:ICategoriaN[] = [];

  constructor(private serNoticia:NoticiaService, private fb:FormBuilder, private spinner:NgxSpinnerService, private catnoticiaservice:CatNoticiasService) { 
    this.formNoticia = this.fb.group({
      id_noticia:[null],
      titulo:['',[Validators.required,Validators.minLength(3)]],
      descripcion:['',[Validators.required]],
      archivo:['',[Validators.required]],
      fecha_hora:['',[Validators.required]],
      categoria:[null],
      estado:['',[Validators.required]] 
    });
  }

  ngOnInit(): void {
    this.listarNoticia();
    this.obtenercategoria();
  }

  eliminarNoticia(fila:INoticia){

    if(confirm('¿Esta seguro que desea eliminar estos datos?')){
  
      this.spinner.show();
      this.serNoticia.deleteNoticia(fila).subscribe(
        resultado => {
          console.log(resultado);
          this.listarNoticia();
          this.spinner.hide();
        },
        error => console.log(error)
      )
    }    
  }

  listarNoticia(){
    this.serNoticia.getNoticia().subscribe(
      resultado =>{
        this.listado_datos_noticia = resultado;
      },
      error => console.log(error)
    );
  }

  guardarNoticia(){
     
    if(this.formNoticia.value.id_noticia){

      this.spinner.show();
      this.serNoticia.updateNoticia(this.formNoticia.value,this.file).subscribe(
        resultado =>{
          console.log(resultado);
          this.imagenPreview = '';
          this.formNoticia.reset();
          this.listarNoticia();

          this.spinner.hide();
        },
        error=> console.log(error)
      )

    }else{
      this.serNoticia.saveNoticia(this.formNoticia.value,this.file).subscribe(
        resultado => {
          console.log(resultado);
          
          this.imagenPreview = '';
          this.formNoticia.reset();
          this.listarNoticia();
          
        },
        error => console.log(error)
      )
    }
  }

  editarNoticia(fila:INoticia){
    this.formNoticia.setValue({
      id_noticia:fila.id_noticia,
      titulo:fila.titulo,
      descripcion:fila.descripcion,
      archivo:'',
      fecha_hora:fila.fecha_hora,
      categoria:fila.categoria,
      estado:fila.estado
    });

    this.imagenPreview = fila.imagen;
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

  obtenercategoria()
  {
    this.catnoticiaservice.getCategoria().subscribe(
      resultado => {
        this.listar_categoria = resultado;
      }, error => console.log(error)
    )

  }
}
