import { Component, OnInit } from '@angular/core';
import { GaleriaService } from '../../services/galeria.service';
import { IGaleria } from '../../models/galeria';
import { Router, NavigationExtras } from "@angular/router";
@Component({
  selector: 'app-galeria',
  templateUrl: './galeria.component.html',
  styleUrls: ['./galeria.component.css']
})
export class GaleriaComponent implements OnInit {

  listaGaleria:IGaleria[] = [];


  constructor(private serviceGaleria:GaleriaService, private router:Router) { }

  ngOnInit(): void {
    this.obtenerGaleria();

  }


  obtenerGaleria()
  {
    this.serviceGaleria.getGaleriapublic().subscribe(
      resultado => {
        this.listaGaleria = resultado;
      }
    )
  }

  verMas(galeria:IGaleria)
  {
    let datosExtras:NavigationExtras = {
      queryParams:galeria
    }
    this.router.navigate(['galeria-detalle',galeria],datosExtras);
  }


}
