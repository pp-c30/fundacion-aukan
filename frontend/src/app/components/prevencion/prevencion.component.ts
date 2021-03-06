import { Component, OnInit } from '@angular/core';
import { PrevencionService } from "../../services/prevencion.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-prevencion',
  templateUrl: './prevencion.component.html',
  styleUrls: ['./prevencion.component.css']
})
export class PrevencionComponent implements OnInit {

  lista_datos = [];

  constructor(private servicePrevencion:PrevencionService, private router:Router) { }

  ngOnInit(): void {
    this.listarPrevencion();
  }

  listarPrevencion(){
    this.servicePrevencion.getPrevencionpublic().subscribe(
      resultado =>{
        this.lista_datos = resultado;
      },
      error => console.log(error)
    );
  }

  verDetalle(id:number){
    this.router.navigate(['/detalle-prevencion',id]);
  }
 

}
