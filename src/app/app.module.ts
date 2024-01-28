import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { LogoutRoutedComponent } from './components/shared/logout-routed/logout-routed.component';
import { DialogService } from 'primeng/dynamicdialog';
import { AdminCamisetaDetailUnroutedComponent } from './components/camiseta/admin-camiseta-detail-unrouted/admin-camiseta-detail-unrouted.component';
import { AdminCamisetaPlistUnroutedComponent } from './components/camiseta/admin-camiseta-plist-unrouted/admin-camiseta-plist-unrouted.component';
import { AdminCarritoDetailUnroutedComponent } from './components/carrito/admin-carrito-detail-unrouted/admin-carrito-detail-unrouted.component';
import { AdminCompraDetailUnroutedComponent } from './components/compra/admin-compra-detail-unrouted/admin-compra-detail-unrouted.component';
import { AdminCompraPlistUnroutedComponent } from './components/compra/admin-compra-plist-unrouted/admin-compra-plist-unrouted.component';
import { AdminDetalle_compraDetailUnroutedComponent } from './components/detalle_compra/admin-detalle_compra-detail-unrouted/admin-detalle_compra-detail-unrouted.component';
import { AdminUsuarioDetailUnroutedComponent } from './components/usuario/admin-usuario-detail-unrouted/admin-usuario-detail-unrouted.component';
import { AdminValoracionDetailUnroutedComponent } from './components/valoracion/admin-valoracion-detail-unrouted/admin-valoracion-detail-unrouted.component';
import { AdminEquipoDetailUnroutedComponent } from './components/equipo/admin-equipo-detail-unrouted/admin-equipo-detail-unrouted.component';
import { AdminLigaDetailUnroutedComponent } from './components/liga/admin-liga-detail-unrouted/admin-liga-detail-unrouted.component';
import { AdminModalidadDetailUnroutedComponent } from './components/modalidad/admin-modalidad-detail-unrouted/admin-modalidad-detail-unrouted.component';
import { PaginatorModule } from 'primeng/paginator';
import { ConfirmationService } from 'primeng/api';
import { RouterModule } from '@angular/router';
import { AdminLigaPlistUnroutedComponent } from './components/liga/admin-liga-plist-unrouted/admin-liga-plist-unrouted.component';
import { AdminEquipoPlistUnroutedComponent } from './components/equipo/admin-equipo-plist-unrouted/admin-equipo-plist-unrouted.component';
import { AdminDetalle_compraPlistUnroutedComponent } from './components/detalle_compra/admin-detalle_compra-plist-unrouted/admin-detalle_compra-plist-unrouted.component';
import { AdminModalidadPlistUnroutedComponent } from './components/modalidad/admin-modalidad-plist-unrouted/admin-modalidad-plist-unrouted.component';
import { AdminUsuarioPlistUnroutedComponent } from './components/usuario/admin-usuario-plist-unrouted/admin-usuario-plist-unrouted.component';
import { AdminValoracionPlisUnroutedComponent } from './components/valoracion/admin-valoracion-plist-unrouted/admin-valoracion-plis-unrouted.component';
import { AdminCarritoPlistUnroutedComponent } from './components/carrito/admin-carrito-plist-unrouted/admin-carrito-plist-unrouted.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuUnroutedComponent,
    FooterUnroutedComponent,
    HomeRoutedComponent,
    LoginRoutedComponent,
    LogoutRoutedComponent,
    AdminCamisetaDetailUnroutedComponent,
    AdminCamisetaPlistUnroutedComponent,
    AdminCarritoDetailUnroutedComponent,
    AdminCarritoPlistUnroutedComponent,
    AdminCompraDetailUnroutedComponent,
    AdminCompraPlistUnroutedComponent,
    AdminDetalle_compraDetailUnroutedComponent,
    AdminDetalle_compraPlistUnroutedComponent,
    AdminUsuarioDetailUnroutedComponent,
    AdminValoracionDetailUnroutedComponent,
    AdminEquipoDetailUnroutedComponent,
    AdminEquipoPlistUnroutedComponent,
    AdminLigaDetailUnroutedComponent,
    AdminLigaPlistUnroutedComponent,
    AdminModalidadDetailUnroutedComponent,
    AdminModalidadPlistUnroutedComponent,
    AdminUsuarioDetailUnroutedComponent,
    AdminUsuarioPlistUnroutedComponent,
    AdminValoracionDetailUnroutedComponent,
    AdminValoracionPlisUnroutedComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MatInputModule,
    HttpClientModule,
    MatSnackBarModule,
    BrowserAnimationsModule,
    FormsModule,
    PaginatorModule,
    RouterModule
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
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    DialogService,
    ConfirmationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
