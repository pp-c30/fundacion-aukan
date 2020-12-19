import { Component, OnInit } from '@angular/core';
import { ActividadesService } from "../../services/actividades.service";
import { IActividades } from "../../models/actividades";
import { Router, NavigationExtras } from "@angular/router";

@Component({
  selector: 'app-actividades',
  templateUrl: './actividades.component.html',
  styleUrls: ['./actividades.component.css']
})
export class ActividadesComponent implements OnInit {

  lista_actividades:IActividades[] = [];
  constructor(private serviceActividades:ActividadesService, private router:Router) { }

  ngOnInit(): void {
    this.obtenerActividades();
  }


  obtenerActividades()
  {
    this.serviceActividades.getActividadespublic().subscribe(
      resultado => {
        this.lista_actividades = resultado;
      }
    )
  }

  verMas(actividades:IActividades)
  {
    let datosExtras:NavigationExtras = {
      queryParams:actividades
    }
    this.router.navigate(['actividades-detalle',actividades],datosExtras);
  }

}
