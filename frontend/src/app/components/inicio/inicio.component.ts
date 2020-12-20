import { Component, OnInit } from '@angular/core';
import { GaleriaService } from '../../services/galeria.service';
import { IGaleria } from '../../models/galeria';
import { NoticiaService } from '../../services/noticia.service';
import { INoticia } from "../../models/noticia";
import { Router, NavigationExtras } from "@angular/router";
@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  listaGaleria:IGaleria[] = [];
  lista_datos = [];


  constructor(private galeriaserv:GaleriaService, private router:Router, private noticiasserv:NoticiaService) { }

  ngOnInit(): void {
    this.obtenerGaleria();
    this.listarNoticia();
  }


obtenerGaleria()
{
  this.galeriaserv.getGaleriapublic().subscribe(
    respuesta => {
      this.listaGaleria = respuesta
    }
  )
}

verMas(galeria:IGaleria)
{
  let datosExtras:NavigationExtras = {
    queryParams:galeria
  }
  this.router.navigate(['galeria-detalle',galeria],datosExtras);
}s

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
