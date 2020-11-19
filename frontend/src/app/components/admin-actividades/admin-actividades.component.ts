import { Component, OnInit } from '@angular/core';

import { ActividadesService } from "../../services/actividades.service";
import { IActividades } from 'src/app/models/actividades';

import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-admin-actividades',
  templateUrl: './admin-actividades.component.html',
  styleUrls: ['./admin-actividades.component.css']
})
export class AdminActividadesComponent implements OnInit {

  actividades:IActividades[] = []; 

  formActividades:FormGroup; 

  constructor(private fb:FormBuilder,private serviceActividades:ActividadesService) { 

    this.formActividades = this.fb.group({
        titulo:['',[Validators.required]],
        descripcion:[''],
        categoria_actividad:[''],
        fecha_hora:[''],
        estado:[''], 
        archivo:['']
    });
  }

  ngOnInit(): void {
    this.listaActividades(); 
  }

  listaActividades()
  {
    this.serviceActividades.getActividades().subscribe(
      resultado => {
        this.actividades = resultado; 
      }
    )
  }

} 
