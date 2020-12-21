import { Component, OnInit } from '@angular/core';
import { DonacionesService } from '../../services/donaciones.service';
import { IDonacionesS } from '../../models/donaciones';

@Component({
  selector: 'app-donaciones-public',
  templateUrl: './donaciones-public.component.html',
  styleUrls: ['./donaciones-public.component.css']
})
export class DonacionesPublicComponent implements OnInit {

  listadonaciones = [];

  p:number = 1;


  constructor(private servdonaciones:DonacionesService) { }

  ngOnInit(): void {
    this.obtenerdonaciones();
  }

  obtenerdonaciones()
  {
    this.servdonaciones.getDonacionpublic().subscribe(
      resultado =>{
        this.listadonaciones = resultado
      }, error => console.log(error)

    )
  }


}
