import { Component, OnInit } from '@angular/core';

import { CatPrevencionService } from '../../services/cat-prevencion.service';

@Component({
  selector: 'app-cat-prevencion',
  templateUrl: './cat-prevencion.component.html',
  styleUrls: ['./cat-prevencion.component.css']
})
export class CatPrevencionComponent implements OnInit {

  listacategorias = [];

  constructor(private catprevencionserv:CatPrevencionService) { }

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





}
