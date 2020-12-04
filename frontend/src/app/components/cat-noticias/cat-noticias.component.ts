import { Component, OnInit } from '@angular/core';

import { CatNoticiasService } from '../../services/cat-noticias.service';
import { FormBuilder,FormGroup } from "@angular/forms";
import { ICategoriaN } from '../../models/catnoticias';

@Component({
  selector: 'app-cat-noticias',
  templateUrl: './cat-noticias.component.html',
  styleUrls: ['./cat-noticias.component.css']
})
export class CatNoticiasComponent implements OnInit {

  listacategorias = [];

  formCategoria:FormGroup;

  constructor(private catnoticiaserv:CatNoticiasService, private fb:FormBuilder) { 
    
    this.formCategoria = this.fb.group({
      id_cn:[null],
      descripcion:['']
    });
  }

  ngOnInit(): void {
    this.obtenerCategoriaN();
  }

  obtenerCategoriaN()
  {
    this.catnoticiaserv.getCategoria().subscribe(
      resultado =>{
        this.listacategorias = resultado
      }, error => console.log(error)

    )
  }
  guadarCategoria()
  {
    if(this.formCategoria.value.id_cn)
    {
      this.catnoticiaserv.updatecategoria(this.formCategoria.value).subscribe(
        respuesta => {
          console.log(respuesta)
          this.obtenerCategoriaN();
          this.formCategoria.reset();
      }, error => console.log(error)     
          )
     }else {
        //console.log(this.formCategoria.value)
        this.catnoticiaserv.savecategoria(this.formCategoria.value).subscribe(
        resultado => {
          console.log('guardado exitoso')
          // se refresca la grilla
          this.obtenerCategoriaN();
          this.formCategoria.reset();

        }
    )
    }
  }

  editarCategoria(categoria:ICategoriaN)
  {
    this.formCategoria.setValue(categoria);
  }

  borrar(id:number)
  {
    if(confirm('¿Esta seguro de querer borra la categoria?'))
    {
      this.catnoticiaserv.deletecategoria(id).subscribe(
        resultado => {
          console.log(resultado);
          this.obtenerCategoriaN();
        }, error => console.log(error)
      )
    }
     
  }
}
