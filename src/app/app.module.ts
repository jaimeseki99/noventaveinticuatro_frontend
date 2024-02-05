import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule} from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { ConfirmPopupModule } from 'primeng/confirmpopup';

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
import { AdminUsuarioFormUnroutedComponent } from './components/usuario/admin-usuario-form-unrouted/admin-usuario-form-unrouted.component';
import { AdminCamisetaFormUnroutedComponent } from './components/camiseta/admin-camiseta-form-unrouted/admin-camiseta-form-unrouted.component';
import { AdminCamisetaPlistRoutedComponent } from './components/camiseta/admin-camiseta-plist-routed/admin-camiseta-plist-routed.component';
import { AdminValoracionFormUnroutedComponent } from './components/valoracion/admin-valoracion-form-unrouted/admin-valoracion-form-unrouted.component';
import { AdminCamisetaSelectionUnroutedComponent } from './components/camiseta/admin-camiseta-selection-unrouted/admin-camiseta-selection-unrouted.component';
import { AdminUsuarioSelectionUnroutedComponent } from './components/usuario/admin-usuario-selection-unrouted/admin-usuario-selection-unrouted.component';
import { AdminEquipoSelectionUnroutedComponent } from './components/equipo/admin-equipo-selection-unrouted/admin-equipo-selection-unrouted.component';
import { AdminLigaSelectionUnroutedComponent } from './components/liga/admin-liga-selection-unrouted/admin-liga-selection-unrouted.component';
import { AdminModalidadSelectionUnroutedComponent } from './components/modalidad/admin-modalidad-selection-unrouted/admin-modalidad-selection-unrouted.component';
import { AdminUsuarioPlistRoutedComponent } from './components/usuario/admin-usuario-plist-routed/admin-usuario-plist-routed.component';
import { AdminValoracionPlistRoutedComponent } from './components/valoracion/admin-valoracion-plist-routed/admin-valoracion-plist-routed.component';
import { AdminCamisetaEditRoutedComponent } from './components/camiseta/admin-camiseta-edit-routed/admin-camiseta-edit-routed.component';
import { AdminCamisetaNewRoutedComponent } from './components/camiseta/admin-camiseta-new-routed/admin-camiseta-new-routed.component';
import { AdminUsuarioEditRoutedComponent } from './components/usuario/admin-usuario-edit-routed/admin-usuario-edit-routed.component';
import { AdminUsuarioNewRoutedComponent } from './components/usuario/admin-usuario-new-routed/admin-usuario-new-routed.component';
import { AdminEquipoPlistRoutedComponent } from './components/equipo/admin-equipo-plist-routed/admin-equipo-plist-routed.component';
import { AdminLigaPlistRoutedComponent } from './components/liga/admin-liga-plist-routed/admin-liga-plist-routed.component';
import { AdminModalidadPlistRoutedComponent } from './components/modalidad/admin-modalidad-plist-routed/admin-modalidad-plist-routed.component';
import { AdminCamisetaViewRoutedComponent } from './components/camiseta/admin-camiseta-view-routed/admin-camiseta-view-routed.component';
import { AdminValoracionNewRoutedComponent } from './components/valoracion/admin-valoracion-new-routed/admin-valoracion-new-routed.component';
import { AdminValoracionEditRoutedComponent } from './components/valoracion/admin-valoracion-edit-routed/admin-valoracion-edit-routed.component';
import { AdminValoracionViewRoutedComponent } from './components/valoracion/admin-valoracion-view-routed/admin-valoracion-view-routed.component';
import { AdminEquipoEditRoutedComponent } from './components/equipo/admin-equipo-edit-routed/admin-equipo-edit-routed.component';
import { AdminEquipoNewRoutedComponent } from './components/equipo/admin-equipo-new-routed/admin-equipo-new-routed.component';
import { AdminEquipoViewRoutedComponent } from './components/equipo/admin-equipo-view-routed/admin-equipo-view-routed.component';
import { AdminLigaNewRoutedComponent } from './components/liga/admin-liga-new-routed/admin-liga-new-routed.component';
import { AdminLigaViewRoutedComponent } from './components/liga/admin-liga-view-routed/admin-liga-view-routed.component';
import { AdminLigaEditRoutedComponent } from './components/liga/admin-liga-edit-routed/admin-liga-edit-routed.component';
import { AdminLigaFormUnroutedComponent } from './components/liga/admin-liga-form-unrouted/admin-liga-form-unrouted.component';
import { AdminEquipoFormUnroutedComponent } from './components/equipo/admin-equipo-form-unrouted/admin-equipo-form-unrouted.component';
import { AdminModalidadFormUnroutedComponent } from './components/modalidad/admin-modalidad-form-unrouted/admin-modalidad-form-unrouted.component';
import { AdminModalidadEditRoutedComponent } from './components/modalidad/admin-modalidad-edit-routed/admin-modalidad-edit-routed.component';
import { AdminModalidadNewRoutedComponent } from './components/modalidad/admin-modalidad-new-routed/admin-modalidad-new-routed.component';
import { AdminModalidadViewRoutedComponent } from './components/modalidad/admin-modalidad-view-routed/admin-modalidad-view-routed.component';
import { AdminUsuarioViewRoutedComponent } from './components/usuario/admin-usuario-view-routed/admin-usuario-view-routed.component';
import { UserCamisetaPlistUnroutedComponent } from './components/camiseta/user-camiseta-plist-unrouted/user-camiseta-plist-unrouted.component';
import { UserCarritoPlistUnroutedComponent } from './components/carrito/user-carrito-plist-unrouted/user-carrito-plist-unrouted.component';
import { UserCarritoPlistRoutedComponent } from './components/carrito/user-carrito-plist-routed/user-carrito-plist-routed.component';
import { UserCamisetaPlistRoutedComponent } from './components/camiseta/user-camiseta-plist-routed/user-camiseta-plist-routed.component';
import { UserCamisetaViewRoutedComponent } from './components/camiseta/user-camiseta-view-routed/user-camiseta-view-routed.component';
import { UserCamisetaDetailUnroutedComponent } from './components/camiseta/user-camiseta-detail-unrouted/user-camiseta-detail-unrouted.component';
import { UserModalidadPlistUnroutedComponent } from './components/modalidad/user-modalidad-plist-unrouted/user-modalidad-plist-unrouted.component';
import { UserModalidadPlistRoutedComponent } from './components/modalidad/user-modalidad-plist-routed/user-modalidad-plist-routed.component';
import { UserLigaPlistUnroutedComponent } from './components/liga/user-liga-plist-unrouted/user-liga-plist-unrouted.component';
import { UserLigaPlistRoutedComponent } from './components/liga/user-liga-plist-routed/user-liga-plist-routed.component';
import { UserEquipoPlistUnroutedComponent } from './components/equipo/user-equipo-plist-unrouted/user-equipo-plist-unrouted.component';
import { UserEquipoPlistRoutedComponent } from './components/equipo/user-equipo-plist-routed/user-equipo-plist-routed.component';
import { UserUsuarioDetailUnroutedComponent } from './components/usuario/user-usuario-detail-unrouted/user-usuario-detail-unrouted.component';
import { UserUsuarioViewRoutedComponent } from './components/usuario/user-usuario-view-routed/user-usuario-view-routed.component';
import { UserCompraPlistUnroutedComponent } from './components/compra/user-compra-plist-unrouted/user-compra-plist-unrouted.component';
import { UserCompraPlistRoutedComponent } from './components/compra/user-compra-plist-routed/user-compra-plist-routed.component';

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
    AdminCamisetaFormUnroutedComponent,
    AdminCamisetaPlistRoutedComponent,
    AdminCamisetaSelectionUnroutedComponent,
    AdminCamisetaEditRoutedComponent,
    AdminCamisetaNewRoutedComponent,
    AdminCamisetaViewRoutedComponent,
    UserCamisetaPlistUnroutedComponent,
    UserCamisetaPlistRoutedComponent,
    UserCamisetaViewRoutedComponent,
    UserCamisetaDetailUnroutedComponent,

    AdminCarritoDetailUnroutedComponent,
    AdminCarritoPlistUnroutedComponent,
    UserCarritoPlistUnroutedComponent,
    UserCarritoPlistRoutedComponent,

    AdminCompraDetailUnroutedComponent,
    AdminCompraPlistUnroutedComponent,
    UserCompraPlistUnroutedComponent,
    UserCompraPlistRoutedComponent,

    AdminDetalle_compraDetailUnroutedComponent,
    AdminDetalle_compraPlistUnroutedComponent,

    AdminUsuarioDetailUnroutedComponent,
    AdminUsuarioFormUnroutedComponent,
    AdminUsuarioPlistUnroutedComponent,
    AdminUsuarioSelectionUnroutedComponent,
    AdminUsuarioPlistRoutedComponent,
    AdminUsuarioEditRoutedComponent,
    AdminUsuarioNewRoutedComponent,
    AdminUsuarioViewRoutedComponent,
    UserUsuarioDetailUnroutedComponent,
    UserUsuarioViewRoutedComponent,

    AdminValoracionDetailUnroutedComponent,
    AdminValoracionPlisUnroutedComponent,
    AdminValoracionFormUnroutedComponent,
    AdminValoracionPlistRoutedComponent,
    AdminValoracionNewRoutedComponent,
    AdminValoracionEditRoutedComponent,
    AdminValoracionViewRoutedComponent,

    AdminEquipoDetailUnroutedComponent,
    AdminEquipoPlistUnroutedComponent,
    AdminEquipoSelectionUnroutedComponent,
    AdminEquipoPlistRoutedComponent,
    AdminEquipoFormUnroutedComponent,
    AdminEquipoEditRoutedComponent,
    AdminEquipoNewRoutedComponent,
    AdminEquipoViewRoutedComponent,
    UserEquipoPlistUnroutedComponent,
    UserEquipoPlistRoutedComponent,

    AdminLigaDetailUnroutedComponent,
    AdminLigaPlistUnroutedComponent,
    AdminLigaSelectionUnroutedComponent,
    AdminLigaFormUnroutedComponent,
    AdminLigaPlistRoutedComponent,
    AdminLigaNewRoutedComponent,
    AdminLigaViewRoutedComponent,
    AdminLigaEditRoutedComponent,
    UserLigaPlistUnroutedComponent,
    UserLigaPlistRoutedComponent,
    
    AdminModalidadDetailUnroutedComponent,
    AdminModalidadPlistUnroutedComponent,
    AdminModalidadSelectionUnroutedComponent,
    AdminModalidadPlistRoutedComponent,
    AdminModalidadFormUnroutedComponent,
    AdminModalidadEditRoutedComponent,
    AdminModalidadNewRoutedComponent,
    AdminModalidadViewRoutedComponent,
    UserModalidadPlistUnroutedComponent,
    UserModalidadPlistRoutedComponent

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
    RouterModule,
    MatProgressSpinnerModule,
    ConfirmPopupModule
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
