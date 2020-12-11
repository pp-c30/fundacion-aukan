import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { from } from 'rxjs';
import { AdminActividadesComponent } from './components/admin-actividades/admin-actividades.component';
import { AdminDetalleGaleriaComponent } from './components/admin-detalle-galeria/admin-detalle-galeria.component';
import { AdminGaleriaComponent } from './components/admin-galeria/admin-galeria.component';

import { AdminTestimoniosComponent } from "./components/admin-testimonios/admin-testimonios.component";
import { DetalleTestimoniosComponent } from './components/detalle-testimonios/detalle-testimonios.component';
import { TestimoniosComponent } from "./components/testimonios/testimonios.component";
import { AdminNoticiaComponent } from "./components/admin-noticia/admin-noticia.component";
import { NoticiaComponent } from "./components/noticia/noticia.component";
import { DetalleNoticiaComponent } from "./components/detalle-noticia/detalle-noticia.component";
import { GaleriaComponent } from './components/galeria/galeria.component';
import { GaleriaDetalleComponent } from './components/galeria-detalle/galeria-detalle.component';
import { CatGaleriaComponent } from './components/cat-galeria/cat-galeria.component';
import { CatDonacionesComponent } from './components/cat-donaciones/cat-donaciones.component';
import { CatNoticiasComponent } from './components/cat-noticias/cat-noticias.component';
import { CatPrevencionComponent } from './components/cat-prevencion/cat-prevencion.component';
import { CategoriasComponent } from './components/categorias/categorias.component';
import { PrevencionComponent } from "./components/prevencion/prevencion.component";
import { AdminPrevencionComponent } from "./components/admin-prevencion/admin-prevencion.component";
import { DonacionesComponent } from './components/donaciones/donaciones.component';

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
    path:'admin-noticia',
    component: AdminNoticiaComponent
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
    path:'noticia',
    component:NoticiaComponent
  },
  {
    path: 'detalle-noticia/:id',
    component:DetalleNoticiaComponent
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
  },
  {
    path:'prevencion',
    component:PrevencionComponent
  },
  {
    path:'admin-prevencion',
    component:AdminPrevencionComponent
  },
  {
    path:'donaciones', component:DonacionesComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
