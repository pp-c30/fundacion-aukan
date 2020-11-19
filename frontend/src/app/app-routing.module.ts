import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { from } from 'rxjs';
import { AdminActividadesComponent } from './components/admin-actividades/admin-actividades.component';

import { AdminGaleriaComponent } from './components/admin-galeria/admin-galeria.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/admin-galeria',
    pathMatch: 'full'
  },

  {
    path: 'admin-galeria', component: AdminGaleriaComponent
  },
  {
    path: 'admin-actividades', component: AdminActividadesComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
