import { Component, OnInit } from '@angular/core';
import { GaleriaService } from '../../services/galeria.service';
import { IGaleria } from '../../models/galeria';
import { NoticiaService } from '../../services/noticia.service';
import { INoticia } from "../../models/noticia";
import { Router, NavigationExtras } from "@angular/router";
import { PrevencionService } from "../../services/prevencion.service";

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  listaGaleria:IGaleria[] = [];
  lista_datos = [];
  lista_datos_prev = [];


  constructor(private galeriaserv:GaleriaService, private router:Router, private noticiasserv:NoticiaService, private servprev:PrevencionService) { }

  ngOnInit(): void {
    this.listarNoticia();
    this.listarPrevencion();
  }


  listarPrevencion(){
    this.servprev.getPrevencionpublic().subscribe(
      resultado =>{
        this.lista_datos_prev = resultado;
      },
      error => console.log(error)
    );
  }

  verDetalleP(id:number){
    this.router.navigate(['/detalle-prevencion',id]);
  }


listarNoticia(){
  this.noticiasserv.getNoticiapublic().subscribe(
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
