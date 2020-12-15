import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AutenticacionService } from '../../services/autenticacion.service';
import { Router } from "@angular/router";
@Component({
  selector: 'app-registros',
  templateUrl: './registros.component.html',
  styleUrls: ['./registros.component.css']
})
export class RegistrosComponent implements OnInit {

  formregistro:FormGroup;

  constructor(private fb:FormBuilder, private authserv:AutenticacionService, private router:Router) {
    this.formregistro = this.fb.group ({
      username:['',[Validators.required]],
      password:['',[Validators.required]],
      email:['',[Validators.required]]
    });


   }

  ngOnInit(): void {
  }


  registrar()
  {
    this.authserv.register(this.formregistro.value).subscribe(
      respuesta => {
        localStorage.setItem('token',String(respuesta));
        this.formregistro.reset();
        this.router.navigate(['/admin-galeria'])
      }
    )
  }
}
