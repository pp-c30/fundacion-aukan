import { Component, OnInit } from '@angular/core';

import { TestimoniosService } from "../../services/testimonios.service";

import { Router } from "@angular/router";

@Component({
  selector: 'app-testimonios',
  templateUrl: './testimonios.component.html',
  styleUrls: ['./testimonios.component.css']
})
export class TestimoniosComponent implements OnInit {

  lista_datos = [];

  constructor(private serviceTestimonios:TestimoniosService, private router:Router) {

   }

  ngOnInit(): void {

    this.listarTestimonio();

  }

  listarTestimonio(){
    this.serviceTestimonios.getTestimoniospublic().subscribe(
      resultado => {
        this.lista_datos = resultado;
      },
      error => console.log(error)
    );
  }

  verDetalle(id:number){
    this.router.navigate(['/detalle-testimonios',id]);
  }
 
}
