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
import { RegistrosComponent } from './components/registros/registros.component';
import { IngresoComponent } from './components/ingreso/ingreso.component';
import { AuthGuard } from './auth.guard';
import { AdminDetalleActividadesComponent } from './components/admin-detalle-actividades/admin-detalle-actividades.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/ingreso',
    pathMatch: 'full'
  },
  {
    path: 'admin-galeria', 
    component: AdminGaleriaComponent,
    canActivate:[AuthGuard]
  },
  {
    path:'admin-testimonios',
    component: AdminTestimoniosComponent,
    canActivate:[AuthGuard]
  },
  {
    path:'admin-noticia',
    component: AdminNoticiaComponent,
    canActivate:[AuthGuard]
  },
  {
    path:'testimonios',
    component:TestimoniosComponent
  },
  {
    path: 'admin-actividades', 
    component: AdminActividadesComponent,
    canActivate:[AuthGuard]
  },
  {
    path:'detalle-testimonios/:id',
    component:DetalleTestimoniosComponent
  },
  { 
    path: 'admin-detalle-galeria/:id_galeria', 
    component: AdminDetalleGaleriaComponent
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
    path: 'galeria', 
    component: GaleriaComponent
  },
  {
    path: 'galeria-detalle', 
    component: GaleriaDetalleComponent
  },
  {
    path: 'categoria-galeria', 
    component: CatGaleriaComponent,
    canActivate:[AuthGuard]
  },
  {
    path: 'categoria-donaciones', 
    component:CatDonacionesComponent,
    canActivate:[AuthGuard]
  },
  {
    path: 'categoria-noticias', 
    component:CatNoticiasComponent,
    canActivate:[AuthGuard]
  },
  {
    path: 'categoria-prevencion', 
    component:CatPrevencionComponent,
    canActivate:[AuthGuard]
  },
  {
    path: 'categorias', 
    component:CategoriasComponent,
    canActivate:[AuthGuard]
  },
  {
    path:'prevencion',
    component:PrevencionComponent
  },
  {
    path:'admin-prevencion',
    component:AdminPrevencionComponent,
    canActivate:[AuthGuard]
  },
  {
    path:'donaciones',
    component:DonacionesComponent
  },
  {
    path:'registro',
    component:RegistrosComponent
  },
  {
    path:'ingreso',
    component:IngresoComponent
  },
  {
    path:'admin-detalle-actividad/:id_actividad',
    component:AdminDetalleActividadesComponent

  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
