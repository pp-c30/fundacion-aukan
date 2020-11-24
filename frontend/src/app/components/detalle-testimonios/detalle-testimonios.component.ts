import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { TestimoniosService } from "../../services/testimonios.service";
import { ITestimonios } from "../../models/testimonios";

@Component({
  selector: 'app-detalle-testimonios',
  templateUrl: './detalle-testimonios.component.html',
  styleUrls: ['./detalle-testimonios.component.css']
})
export class DetalleTestimoniosComponent implements OnInit {

  id:number;

  unTestimonio:ITestimonios;

  constructor(private activatedRouter:ActivatedRoute, private serviceTestimonios:TestimoniosService) { }

  ngOnInit(): void {

    this.activatedRouter.params.subscribe(
      params =>{
        this.id= params.id;
      }
    );

    this.obtenerUnTestimonio(this.id);
  }

  obtenerUnTestimonio(id:number){
    this.serviceTestimonios.getOneTestimonio(id).subscribe(
      resultado =>{
        this.unTestimonio = resultado;
      },
      error => console.log(error)
    )
  }

}
