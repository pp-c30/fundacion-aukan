import { Component, OnInit } from '@angular/core';

import { CatDonacionesService } from '../../services/cat-donaciones.service';
import { FormBuilder,FormGroup } from "@angular/forms";
import { ICategoriaD } from '../../models/catdonaciones';

@Component({
  selector: 'app-cat-donaciones',
  templateUrl: './cat-donaciones.component.html',
  styleUrls: ['./cat-donaciones.component.css']
})
export class CatDonacionesComponent implements OnInit {

  listacategorias = [];

  formCategoria:FormGroup;

  constructor(private catdonacionesserv:CatDonacionesService, private fb:FormBuilder) { 
    this.formCategoria = this.fb.group({
      id_cd:[null],
      descripcion:['']
    });
  }

  ngOnInit(): void {
    this.obtenerCategoriaD();
  }


  obtenerCategoriaD()
  {
    this.catdonacionesserv.getCategoria().subscribe(
      resultado =>{
        this.listacategorias = resultado
      }, error => console.log(error)

    )
  }

  guadarCategoria()
  {
    if(this.formCategoria.value.id_cd)
    {
      this.catdonacionesserv.updatecategoria(this.formCategoria.value).subscribe(
        respuesta => {
          console.log(respuesta)
          this.obtenerCategoriaD();
          this.formCategoria.reset();
      }, error => console.log(error)     
          )
     }else {
        //console.log(this.formCategoria.value)
        this.catdonacionesserv.savecategoria(this.formCategoria.value).subscribe(
        resultado => {
          console.log('guardado exitoso')
          // se refresca la grilla
          this.obtenerCategoriaD();
          this.formCategoria.reset();

        }
    )
    }
  }

  editarCategoria(categoria:ICategoriaD)
  {
    this.formCategoria.setValue(categoria);
  }

  borrar(id:number)
  {
    if(confirm('¿Esta seguro de querer borra la categoria?'))
    {
      this.catdonacionesserv.deletecategoria(id).subscribe(
        resultado => {
          console.log(resultado);
          this.obtenerCategoriaD();
        }, error => console.log(error)
      )
    }
     
  }

}
