import { Component, OnInit } from '@angular/core';

import { CatNoticiasService } from '../../services/cat-noticias.service';

@Component({
  selector: 'app-cat-noticias',
  templateUrl: './cat-noticias.component.html',
  styleUrls: ['./cat-noticias.component.css']
})
export class CatNoticiasComponent implements OnInit {

  listacategorias = [];


  constructor(private catnoticiaserv:CatNoticiasService) { }

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




}
