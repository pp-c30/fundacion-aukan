import { Component, OnInit } from '@angular/core';

import { ActividadesService } from "../../services/actividades.service";
import { IActividades } from 'src/app/models/actividades';

import { IHtmlImputEvent } from '../../models/previewGaleria';

import { NgxSpinnerService } from "ngx-spinner";

import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { Router } from "@angular/router";

import { CatGaleriaService } from '../../services/cat-galeria.service';

import { ICategoriaG } from '../../models/catgaleria';
import { AngularEditorConfig } from '@kolkov/angular-editor';
@Component({
  selector: 'app-admin-actividades',
  templateUrl: './admin-actividades.component.html',
  styleUrls: ['./admin-actividades.component.css']
})
export class AdminActividadesComponent implements OnInit {

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

  actividades:IActividades[] = []; 

  formActividades:FormGroup; 

  archivos:FileList;

  img_url = [];

  listar_categoria:ICategoriaG[] = [];

  ocultar_btnfile:any = "display:block";

  constructor(private fb:FormBuilder,private serviceActividades:ActividadesService, private spinner:NgxSpinnerService, private router:Router,private catgaleriaserv:CatGaleriaService) { 

    this.formActividades = this.fb.group({
        id_actividad:[null],
        titulo:['',[Validators.required]],
        descripcion:['',[Validators.required]],
        categoria_actividad:[null],
        fecha_hora:['',[Validators.required]],
        estado:['',[Validators.required]], 
        archivo:['']
    });
  }

  ngOnInit(): void {
    this.listaActividades(); 
    this.obtenercategoria();
  }

  listaActividades()
  {
    this.serviceActividades.getActividades().subscribe(
      resultado => {
        this.actividades = resultado; 
      }
    )
  }

  guardaractividad()
  {
    if (this.formActividades.value.id_actividades) 
    {
      this.spinner.show()
      this.serviceActividades.updateActividades(this.formActividades.value).subscribe(
        resultado => {
          this.formActividades.reset();
          this.listaActividades();
          this.spinner.hide
        }
      )       
    }else {
      this.spinner.show();
    this.serviceActividades.saveActividades(this.formActividades.value,this.archivos).subscribe(
      resultado => {
        console.log(resultado);
        this.img_url = [];
        this.listaActividades();
        this.formActividades.reset();
        this.spinner.hide();
      }, 
      error => console.log(error)
    )
    }
  }

  previewimagen(evento:IHtmlImputEvent)
  {

    this.archivos = evento.target.files;

    if (this.archivos) 
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

  detalleEvento(id_actividad:number)
  {
    this.router.navigate(['/admin-detalle-actividad',id_actividad]);
  }

  eliminarActividad(id_actividades:number)
  {
    if(confirm('esta seguro de eliminar esta coleccion de imagenes?'))
    {
      this.serviceActividades.deleteactividades(id_actividades).subscribe(
        resultado=>{
          console.log(resultado);
          this.listaActividades();
        }
      )
    }
  }

  editaractividad(datosActividades:IActividades)
  {
    this.ocultar_btnfile ='display:none;'

    this.formActividades.setValue({
      id_actividad:datosActividades.id_actividades,
      titulo:datosActividades.titulo,
      descripcion:datosActividades.descripcion,
      categoria_actividad:datosActividades.categoria_actividad,
      fecha_hora:datosActividades.fecha_hora,
      estado:datosActividades.estado,
      archivo:''
    })
  }

  vaciarForm()
  { 
    this.ocultar_btnfile ='display:block;'

    this.formActividades.setValue({
      id_actividad:null,
      titulo:null,
      descripcion:null,
      categoria_actividad:null,
      fecha_hora:null,
      estado:null,
      archivo:''
    })
  }

  obtenercategoria()
  {
    this.catgaleriaserv.getCategoria().subscribe(
      resultado => {
        this.listar_categoria = resultado;
      }, error => console.log(error)
    )

  }
}
