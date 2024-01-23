import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UsuarioAjaxService } from './service/usuario.ajax.service.service';
import { CamisetaAjaxService } from './service/camiseta.ajax.service.service';
import { CompraAjaxService } from './service/compra.ajax.service.service';
import { DetalleCompraAjaxService } from './service/detallecompra.ajax.service.service';
import { CarritoAjaxService } from './service/carrito.ajax.service.service';
import { ValoracionAjaxService } from './service/valoracion.ajax.service.service';
import { LigaAjaxService } from './service/liga.ajax.service.service';
import { EquipoAjaxService } from './service/equipo.ajax.service.service';
import { ModalidadAjaxService } from './service/modalidad.ajax.service.service';
import { SesionAjaxService } from './service/sesion.ajax.service.service';
import { CryptoService } from './service/crypto.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './interceptor/auth.interceptor';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    UsuarioAjaxService,
    CamisetaAjaxService,
    CompraAjaxService,
    DetalleCompraAjaxService,
    CarritoAjaxService,
    ValoracionAjaxService,
    LigaAjaxService,
    EquipoAjaxService,
    ModalidadAjaxService,
    SesionAjaxService,
    CryptoService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
