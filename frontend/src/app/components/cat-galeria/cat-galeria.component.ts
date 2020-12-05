import { Component, OnInit } from '@angular/core';

import { CatGaleriaService } from '../../services/cat-galeria.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ICategoriaG } from '../../models/catgaleria';

@Component({
  selector: 'app-cat-galeria',
  templateUrl: './cat-galeria.component.html',
  styleUrls: ['./cat-galeria.component.css']
})
export class CatGaleriaComponent implements OnInit {

  listacategorias = [];

  formCategoria:FormGroup;

  p:number = 1;

  constructor(private catgaleriaserv:CatGaleriaService, private fb:FormBuilder) {

    this.formCategoria = this.fb.group({
      id_cg:[null],
      descripcion:['',[Validators.required]]
    });
   }

    

  ngOnInit(): void {
    this.obtenerCategoriaG();
  }

  obtenerCategoriaG()
  {
    this.catgaleriaserv.getCategoria().subscribe(
      resultado =>{
        this.listacategorias = resultado
      }, error => console.log(error)

    )
  }

  guadarCategoria()
  {
    if(this.formCategoria.value.id_cg)
    {
      this.catgaleriaserv.updatecategoria(this.formCategoria.value).subscribe(
        respuesta => {
          console.log(respuesta)
          this.obtenerCategoriaG();
          this.formCategoria.reset();
      }, error => console.log(error)     
          )
     }else {
        //console.log(this.formCategoria.value)
        this.catgaleriaserv.savecategoria(this.formCategoria.value).subscribe(
        resultado => {
          console.log('guardado exitoso')
          // se refresca la grilla
          this.obtenerCategoriaG();
          this.formCategoria.reset();

        }
    )
    }
  }


  editarCategoria(categoria:ICategoriaG)
  {
    this.formCategoria.setValue(categoria);
  }

  borrar(id:number)
  {
    if(confirm('¿Esta seguro de querer borra la categoria?'))
    {
      this.catgaleriaserv.deletecategoria(id).subscribe(
        resultado => {
          console.log(resultado);
          this.obtenerCategoriaG();
        }, error => console.log(error)
      )
    }
     
  }
}
