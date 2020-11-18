import { Component, OnInit } from '@angular/core';
import { ITestimonios } from 'src/app/models/testimonios';
import { TestimoniosService } from "../../services/testimonios.service";

@Component({
  selector: 'app-admin-testimonios',
  templateUrl: './admin-testimonios.component.html',
  styleUrls: ['./admin-testimonios.component.css']
})
export class AdminTestimoniosComponent implements OnInit {

  listado_datos_testimonios = [];

  constructor(private serTestimonios:TestimoniosService) { }

  ngOnInit(): void {
    this.listarTestimonios();
  }

  listarTestimonios(){
    this.serTestimonios.getTestimonios().subscribe(
      resultado =>{
        this.listado_datos_testimonios = resultado;
      },
      error => console.log(error)
    );

  }

}
