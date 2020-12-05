import { Component, OnInit } from '@angular/core';
import { NoticiaService } from "../../services/noticia.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-noticia',
  templateUrl: './noticia.component.html',
  styleUrls: ['./noticia.component.css']
})
export class NoticiaComponent implements OnInit {

  lista_datos = [];
  constructor(private serviceNoticia:NoticiaService, private router:Router) { }

  ngOnInit(): void {
    this.listarNoticia();
  }

  listarNoticia(){
    this.serviceNoticia.getNoticia().subscribe(
      resultado =>{
        this.lista_datos = resultado;
      },
      error => console.log(error)
    );
  }

  verDetalle(id:number){
    this.router.navigate(['/detalle-noticia',id]);
  }

}
