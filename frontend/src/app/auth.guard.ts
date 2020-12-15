import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AutenticacionService } from './services/autenticacion.service';
import { Router } from "@angular/router";
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authserv:AutenticacionService, private router:Router){

  }
  
  
  canActivate(){
    if (this.authserv.verifyLoggedUser()== true) {
      return true;
    }else {
      this.router.navigate(['/ingreso']);
      return false
    }

  }
  
}
