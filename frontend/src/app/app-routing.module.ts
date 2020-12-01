import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { from } from 'rxjs';
import { AdminActividadesComponent } from './components/admin-actividades/admin-actividades.component';
import { AdminDetalleGaleriaComponent } from './components/admin-detalle-galeria/admin-detalle-galeria.component';
import { AdminGaleriaComponent } from './components/admin-galeria/admin-galeria.component';

import { AdminTestimoniosComponent } from "./components/admin-testimonios/admin-testimonios.component";
import { DetalleTestimoniosComponent } from './components/detalle-testimonios/detalle-testimonios.component';
import { TestimoniosComponent } from "./components/testimonios/testimonios.component";
import { GaleriaComponent } from './components/galeria/galeria.component';
import { GaleriaDetalleComponent } from './components/galeria-detalle/galeria-detalle.component';


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
  },
  {
    path: 'admin-actividades', component: AdminActividadesComponent
  },
  {
    path:'detalle-testimonios/:id',
    component:DetalleTestimoniosComponent},
  { 
    path: 'admin-detalle-galeria/:id_galeria', component: AdminDetalleGaleriaComponent
  },
  {
    path: 'galeria', component: GaleriaComponent
  },
  {
    path: 'galeria-detalle', component: GaleriaDetalleComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
