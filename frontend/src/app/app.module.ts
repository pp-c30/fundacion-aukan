import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ActividadesComponent } from './components/actividades/actividades.component';
import { CatDonacionesComponent } from './components/cat-donaciones/cat-donaciones.component';
import { CatGaleriaComponent } from './components/cat-galeria/cat-galeria.component';
import { CatNoticiasComponent } from './components/cat-noticias/cat-noticias.component';
import { CatPrevencionComponent } from './components/cat-prevencion/cat-prevencion.component';
import { DonacionesComponent } from './components/donaciones/donaciones.component';
import { GaleriaComponent } from './components/galeria/galeria.component';
import { ImgActividadesComponent } from './components/img-actividades/img-actividades.component';
import { ImgGaleriaComponent } from './components/img-galeria/img-galeria.component';
import { NoticiaComponent } from './components/noticia/noticia.component';
import { PrevencionComponent } from './components/prevencion/prevencion.component';
import { TestimoniosComponent } from './components/testimonios/testimonios.component';
import { AdminGaleriaComponent } from './components/admin-galeria/admin-galeria.component';
import { AdminDetalleGaleriaComponent } from './components/admin-detalle-galeria/admin-detalle-galeria.component';
import { NavegacionComponent } from './components/navegacion/navegacion.component';
import { AdminTestimoniosComponent } from './components/admin-testimonios/admin-testimonios.component';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AdminActividadesComponent } from './components/admin-actividades/admin-actividades.component';
import { AdminDetalleActividadesComponent } from './components/admin-detalle-actividades/admin-detalle-actividades.component';

import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { NgxSpinnerModule } from "ngx-spinner";
import { DetalleTestimoniosComponent } from './components/detalle-testimonios/detalle-testimonios.component';

import { AdminNoticiaComponent } from './components/admin-noticia/admin-noticia.component';
import { DetalleNoticiaComponent } from './components/detalle-noticia/detalle-noticia.component';

import { GaleriaDetalleComponent } from './components/galeria-detalle/galeria-detalle.component';
import { CategoriasComponent } from './components/categorias/categorias.component';
import { NgxPaginationModule } from "ngx-pagination";
import { AdminPrevencionComponent } from './components/admin-prevencion/admin-prevencion.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RegistrosComponent } from './components/registros/registros.component';
import { IngresoComponent } from './components/ingreso/ingreso.component';
import { AuthGuard } from './auth.guard';
import { TokenInterceptorService } from './services/token-interceptor.service';
@NgModule({
  declarations: [
    AppComponent,
    ActividadesComponent,
    CatDonacionesComponent,
    CatGaleriaComponent,
    CatNoticiasComponent,
    CatPrevencionComponent,
    DonacionesComponent,
    GaleriaComponent,
    ImgActividadesComponent,
    ImgGaleriaComponent,
    NoticiaComponent,
    PrevencionComponent,
    TestimoniosComponent,
    AdminGaleriaComponent,
    AdminDetalleGaleriaComponent,
    NavegacionComponent,
    AdminTestimoniosComponent,
    AdminActividadesComponent,
    AdminDetalleActividadesComponent,
    DetalleTestimoniosComponent,
    AdminNoticiaComponent,
    DetalleNoticiaComponent,
    GaleriaDetalleComponent,
    CategoriasComponent,
    AdminPrevencionComponent,
    RegistrosComponent,
    IngresoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    NgxPaginationModule,
    NgbModule
  ],
  providers: [
    AuthGuard,
    {
      provide:HTTP_INTERCEPTORS,
      useClass:TokenInterceptorService,
      multi:true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
