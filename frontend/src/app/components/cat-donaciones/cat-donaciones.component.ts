import { Component, OnInit } from '@angular/core';

import { CatDonacionesService } from '../../services/cat-donaciones.service';

@Component({
  selector: 'app-cat-donaciones',
  templateUrl: './cat-donaciones.component.html',
  styleUrls: ['./cat-donaciones.component.css']
})
export class CatDonacionesComponent implements OnInit {

  listacategorias = [];

  constructor(private catdonacionesserv:CatDonacionesService) { }

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




}
