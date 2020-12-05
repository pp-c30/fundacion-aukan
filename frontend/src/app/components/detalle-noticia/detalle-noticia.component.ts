import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { NoticiaService } from "../../services/noticia.service";
import { INoticia } from "../../models/noticia";

@Component({
  selector: 'app-detalle-noticia',
  templateUrl: './detalle-noticia.component.html',
  styleUrls: ['./detalle-noticia.component.css']
})
export class DetalleNoticiaComponent implements OnInit {

  id:number;

  unaNoticia:INoticia;

  constructor(private activatedRouter:ActivatedRoute, private serviceNoticia:NoticiaService) { }

  ngOnInit(): void {
    this.activatedRouter.params.subscribe(
      params =>{
        this.id= params.id;
      }
    );

    this.obtenerUnaNoticia(this.id);
  }

  obtenerUnaNoticia(id:number){
    this.serviceNoticia.getOneNoticia(id).subscribe(
      resultado =>{
        this.unaNoticia = resultado;
      },
      error => console.log(error)
    )
  }

}
