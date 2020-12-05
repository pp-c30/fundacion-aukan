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
import { CatGaleriaComponent } from './components/cat-galeria/cat-galeria.component';
import { CatDonacionesComponent } from './components/cat-donaciones/cat-donaciones.component';
import { CatNoticiasComponent } from './components/cat-noticias/cat-noticias.component';
import { CatPrevencionComponent } from './components/cat-prevencion/cat-prevencion.component';
import { CategoriasComponent } from './components/categorias/categorias.component';


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
  },
  {
    path: 'categoria-galeria', component: CatGaleriaComponent
  },
  {
    path: 'categoria-donaciones', component:CatDonacionesComponent
  },
  {
    path: 'categoria-noticias', component:CatNoticiasComponent
  },
  {
    path: 'categoria-prevencion', component:CatPrevencionComponent
  },
  {
    path: 'categorias', component:CategoriasComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
