import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule} from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

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

import { MenuUnroutedComponent } from './components/shared/menu-unrouted/menu-unrouted.component';
import { FooterUnroutedComponent } from './components/shared/footer-unrouted/footer-unrouted.component';
import { HomeRoutedComponent } from './components/shared/home-routed/home-routed.component';
import { LoginRoutedComponent } from './components/shared/login-routed/login-routed.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuUnroutedComponent,
    FooterUnroutedComponent,
    HomeRoutedComponent,
    LoginRoutedComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MatInputModule,
    HttpClientModule,
    MatSnackBarModule,
    BrowserAnimationsModule
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
