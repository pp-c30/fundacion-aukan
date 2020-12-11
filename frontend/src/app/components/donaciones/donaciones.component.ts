import { Component, OnInit } from '@angular/core';

import { DonacionesService } from '../../services/donaciones.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IDonacionesS } from '../../models/donaciones';
import { CatDonacionesService } from '../../services/cat-donaciones.service';
import { ICategoriaD } from "../../models/catdonaciones";
@Component({
  selector: 'app-donaciones',
  templateUrl: './donaciones.component.html',
  styleUrls: ['./donaciones.component.css']
})
export class DonacionesComponent implements OnInit {

  listadonaciones = [];

  formDonaciones:FormGroup;

  p:number = 1;

  listar_categoria:ICategoriaD[] = [];

  constructor(private servicedonacion:DonacionesService, private fb:FormBuilder, private servicecatdonaciones:CatDonacionesService) {
    this.formDonaciones = this.fb.group({
      id_donacion:[null],
    descripcion:['',[Validators.required]],
    categoria:[null],
    telefono:['',[Validators.required]],
    direccion:['',[Validators.required]],
    estado:['',[Validators.required]],
    });


   }

  ngOnInit(): void {
    this.obtenerdonaciones();
    this.obtenercategoria();
  }


  obtenerdonaciones()
  {
    this.servicedonacion.getDonacion().subscribe(
      resultado =>{
        this.listadonaciones = resultado
      }, error => console.log(error)

    )
  }

  guadarDonacion()
  {
    if(this.formDonaciones.value.id_donacion)
    {
      this.servicedonacion.updateDonacion(this.formDonaciones.value).subscribe(
        respuesta => {
          console.log(respuesta)
          this.obtenerdonaciones();
          this.formDonaciones.reset();
      }, error => console.log(error)     
          )
     }else {
        //console.log(this.formCategoria.value)
        this.servicedonacion.saveDonacion(this.formDonaciones.value).subscribe(
        resultado => {
          console.log('guardado exitoso')
          // se refresca la grilla
          this.obtenerdonaciones();
          this.formDonaciones.reset();

        }
    )
    }
  }

  editarDonacion(donaciones:IDonacionesS)
  {
    this.formDonaciones.setValue(donaciones);
  }

  borrar(id:number)
  {
    if(confirm('¿Esta seguro de querer borra la categoria?'))
    {
      this.servicedonacion.deleteDonacion(id).subscribe(
        resultado => {
          console.log(resultado);
          this.obtenerdonaciones();
        }, error => console.log(error)
      )
    }
     
  }

  obtenercategoria()
  {
    this.servicecatdonaciones.getCategoria().subscribe(
      resultado => {
        this.listar_categoria = resultado;
      }, error => console.log(error)
    )

  }
}
