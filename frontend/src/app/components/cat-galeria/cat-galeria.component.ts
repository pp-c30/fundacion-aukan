import { Component, OnInit } from '@angular/core';

import { CatGaleriaService } from '../../services/cat-galeria.service';

@Component({
  selector: 'app-cat-galeria',
  templateUrl: './cat-galeria.component.html',
  styleUrls: ['./cat-galeria.component.css']
})
export class CatGaleriaComponent implements OnInit {

  listacategorias = [];


  constructor(private catgaleriaserv:CatGaleriaService) { }

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

}
