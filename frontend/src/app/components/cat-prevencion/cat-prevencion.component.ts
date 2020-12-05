import { Component, OnInit } from '@angular/core';

import { CatPrevencionService } from '../../services/cat-prevencion.service';
import { FormBuilder,FormGroup,Validators } from "@angular/forms";
import { ICategoriaP } from '../../models/catprevencion';

@Component({
  selector: 'app-cat-prevencion',
  templateUrl: './cat-prevencion.component.html',
  styleUrls: ['./cat-prevencion.component.css']
})
export class CatPrevencionComponent implements OnInit {

  listacategorias = [];

  formCategoria:FormGroup;

  p:number = 1;

  constructor(private catprevencionserv:CatPrevencionService, private fb:FormBuilder) { 
    
    this.formCategoria = this.fb.group({
      id_cp:[null],
      descripcion:['',[Validators.required]]
    });
  }

  ngOnInit(): void {
    this.obtenerCategoriaP();
  }

  obtenerCategoriaP()
  {
    this.catprevencionserv.getCategoria().subscribe(
      resultado =>{
        this.listacategorias = resultado
      }, error => console.log(error)

    )
  }

  guadarCategoria()
  {
    if(this.formCategoria.value.id_cp)
    {
      this.catprevencionserv.updatecategoria(this.formCategoria.value).subscribe(
        respuesta => {
          console.log(respuesta)
          this.obtenerCategoriaP();
          this.formCategoria.reset();
      }, error => console.log(error)     
          )
     }else {
        //console.log(this.formCategoria.value)
        this.catprevencionserv.savecategoria(this.formCategoria.value).subscribe(
        resultado => {
          console.log('guardado exitoso')
          // se refresca la grilla
          this.obtenerCategoriaP();
          this.formCategoria.reset();

        }
    )
    }
  }

  editarCategoria(categoria:ICategoriaP)
  {
    this.formCategoria.setValue(categoria);
  }

  borrar(id:number)
  {
    if(confirm('¿Esta seguro de querer borra la categoria?'))
    {
      this.catprevencionserv.deletecategoria(id).subscribe(
        resultado => {
          console.log(resultado);
          this.obtenerCategoriaP();
        }, error => console.log(error)
      )
    }
     
  }
}
