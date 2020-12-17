import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { PrevencionService } from "../../services/prevencion.service";
import { IPrevencion } from "../../models/prevencion";

@Component({
  selector: 'app-detalle-prevencion',
  templateUrl: './detalle-prevencion.component.html',
  styleUrls: ['./detalle-prevencion.component.css']
})
export class DetallePrevencionComponent implements OnInit {

  id:number;

  unaPrevencion:IPrevencion;

  constructor(private activatedRouter:ActivatedRoute, private servicePrevencion:PrevencionService) { }

  ngOnInit(): void {
    this.activatedRouter.params.subscribe(
      params =>{
        this.id= params.id;
      }
    );

    this.obtenerUnaPrevencion(this.id);
  }

  obtenerUnaPrevencion(id:number){
    this.servicePrevencion.getOnePrevencion(id).subscribe(
      resultado =>{
        this.unaPrevencion = resultado;
      },
      error => console.log(error)
    )
  }

}
