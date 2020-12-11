import { Component, OnInit } from '@angular/core';
import { IPrevencion } from "../../models/prevencion";
import { PrevencionService } from "../../services/prevencion.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import {NgxSpinnerService } from "ngx-spinner";
import { CatPrevencionService } from "../../services/cat-prevencion.service";
import { ICategoriaP } from '../../models/catprevencion';

interface HtmlInputEvent{
  target:HTMLInputElement & EventTarget;
}

@Component({
  selector: 'app-admin-prevencion',
  templateUrl: './admin-prevencion.component.html',
  styleUrls: ['./admin-prevencion.component.css']
})
export class AdminPrevencionComponent implements OnInit {

  listado_datos_prevencion = [];

  formPrevencion:FormGroup;

  file:File;

  imagenPreview:string | ArrayBuffer;

  listar_categoria:ICategoriaP[] = [];

  constructor(private serPrevencion:PrevencionService, private fb:FormBuilder, private spinner:NgxSpinnerService, private catprevservice:CatPrevencionService) { 

    this.formPrevencion = this.fb.group({
      id_prevencion:[null],
      titulo:['',[Validators.required,Validators.minLength(3)]],
      descripcion:['',[Validators.required]],
      archivo:['',[Validators.required]],
      categoria_prev:[null],
      estado:['',[Validators.required]] 
    });
  }

  ngOnInit(): void {
    this.listarPrevencion();
    this.obtenercategoria();
  }

  listarPrevencion(){
    this.serPrevencion.getPrevencion().subscribe(
      resultado =>{
        this.listado_datos_prevencion = resultado;
      },
      error => console.log(error)
    );
  }

  guardarPrevencion(){
     
    if(this.formPrevencion.value.id_prevencion){

      this.spinner.show();
      this.serPrevencion.updatePrevencion(this.formPrevencion.value,this.file).subscribe(
        resultado =>{
          console.log(resultado);
          this.imagenPreview = '';
          this.formPrevencion.reset();
          this.listarPrevencion();

          this.spinner.hide();
        },
        error=> console.log(error)
      )

    }else{
      this.serPrevencion.savePrevencion(this.formPrevencion.value,this.file).subscribe(
        resultado => {
          console.log(resultado);
          this.imagenPreview = '';
          this.formPrevencion.reset();
          this.listarPrevencion();
          
        },
        error => console.log(error)
      )
    }
  }

  editarPrevencion(fila:IPrevencion){
    this.formPrevencion.setValue({
      id_prevencion:fila.id_prevencion,
      titulo:fila.titulo,
      descripcion:fila.descripcion,
      archivo:'',
      categoria_prev:fila.categoria_prev,
      estado:fila.estado
    });

    this.imagenPreview = fila.imagen;
  }

  eliminarPrevencion(fila:IPrevencion){
    if(confirm('¿Esta seguro que desea eliminar este testimonio?')){
      this.spinner.show();
      this.serPrevencion.deletePrevencion(fila).subscribe(
        resultado =>{
          console.log(resultado);
          this.listarPrevencion();
          this.spinner.hide();
        },
        error => console.log(error)
      )
    }
  }

  mostrarFotoSeleccionada(evento:HtmlInputEvent){
    //lectura de la foto
    //se consulta la existencia de una img, si es asi se consulta la existencia de la primer img
    if(evento.target.files && evento.target.files[0]){
      this.file = evento.target.files[0];

      //reader lee los archivos
      const reader = new FileReader();
      /*
      *configuramos reader para que al momento de lectura sepa donde guardar la misma
      *Se guardara en imagenPreview
      */
      reader.onload = (e) =>{
        this.imagenPreview = reader.result;
      }

      //finalmente se le dice que archivo debe leer para mostrarlo como vista previa
      //se ejecuta la lectura
      reader.readAsDataURL(this.file)
    }
  }
  obtenercategoria()
  {
    this.catprevservice.getCategoria().subscribe(
      resultado => {
        this.listar_categoria = resultado;
      }, error => console.log(error)
    )

  }


}
