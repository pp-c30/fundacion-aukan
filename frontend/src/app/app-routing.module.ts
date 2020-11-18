import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminGaleriaComponent } from './components/admin-galeria/admin-galeria.component';
import { AdminTestimoniosComponent } from "./components/admin-testimonios/admin-testimonios.component";

import { TestimoniosComponent } from "./components/testimonios/testimonios.component";

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
    path:'admin-testimonios',
    component: AdminTestimoniosComponent
  },
  {
    path:'testimonios',
    component:TestimoniosComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
