import { Component, OnInit } from '@angular/core';
import { GaleriaService } from '../../services/galeria.service';
@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  galeria = [];


  constructor(private galeriaserv:GaleriaService) { }

  ngOnInit(): void {
    this.obtenerGaleria();
  }


obtenerGaleria()
{
  this.galeriaserv.getGaleriapublic().subscribe(
    respuesta => {
      this.galeria = respuesta
    }
  )
}

}
