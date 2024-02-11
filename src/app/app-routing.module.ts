import { UserCamisetaViewRoutedComponent } from './components/camiseta/user-camiseta-view-routed/user-camiseta-view-routed.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeRoutedComponent } from './components/shared/home-routed/home-routed.component';
import { LoginRoutedComponent } from './components/shared/login-routed/login-routed.component';
import { LogoutRoutedComponent } from './components/shared/logout-routed/logout-routed.component';
import { AdminCamisetaPlistRoutedComponent } from './components/camiseta/admin-camiseta-plist-routed/admin-camiseta-plist-routed.component';
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
import { AdminValoracionEditRoutedComponent } from './components/valoracion/admin-valoracion-edit-routed/admin-valoracion-edit-routed.component';
import { AdminValoracionNewRoutedComponent } from './components/valoracion/admin-valoracion-new-routed/admin-valoracion-new-routed.component';
import { AdminValoracionViewRoutedComponent } from './components/valoracion/admin-valoracion-view-routed/admin-valoracion-view-routed.component';
import { AdminEquipoEditRoutedComponent } from './components/equipo/admin-equipo-edit-routed/admin-equipo-edit-routed.component';
import { AdminEquipoNewRoutedComponent } from './components/equipo/admin-equipo-new-routed/admin-equipo-new-routed.component';
import { AdminEquipoViewRoutedComponent } from './components/equipo/admin-equipo-view-routed/admin-equipo-view-routed.component';
import { AdminLigaEditRoutedComponent } from './components/liga/admin-liga-edit-routed/admin-liga-edit-routed.component';
import { AdminLigaNewRoutedComponent } from './components/liga/admin-liga-new-routed/admin-liga-new-routed.component';
import { AdminLigaViewRoutedComponent } from './components/liga/admin-liga-view-routed/admin-liga-view-routed.component';
import { AdminModalidadEditRoutedComponent } from './components/modalidad/admin-modalidad-edit-routed/admin-modalidad-edit-routed.component';
import { AdminModalidadNewRoutedComponent } from './components/modalidad/admin-modalidad-new-routed/admin-modalidad-new-routed.component';
import { AdminModalidadViewRoutedComponent } from './components/modalidad/admin-modalidad-view-routed/admin-modalidad-view-routed.component';
import { UserCamisetaPlistRoutedComponent } from './components/camiseta/user-camiseta-plist-routed/user-camiseta-plist-routed.component';
import { UserModalidadPlistRoutedComponent } from './components/modalidad/user-modalidad-plist-routed/user-modalidad-plist-routed.component';
import { UserLigaPlistRoutedComponent } from './components/liga/user-liga-plist-routed/user-liga-plist-routed.component';
import { UserEquipoPlistRoutedComponent } from './components/equipo/user-equipo-plist-routed/user-equipo-plist-routed.component';
import { UserCompraPlistRoutedComponent } from './components/compra/user-compra-plist-routed/user-compra-plist-routed.component';
import { UserCompraViewRoutedComponent } from './components/compra/user-compra-view-routed/user-compra-view-routed.component';
import { UserUsuarioViewRoutedComponent } from './components/usuario/user-usuario-view-routed/user-usuario-view-routed.component';
import { UserCarritoPlistRoutedComponent } from './components/carrito/user-carrito-plist-routed/user-carrito-plist-routed.component';

const routes: Routes = [
  { path: '', component: HomeRoutedComponent},
  { path: 'home', component: HomeRoutedComponent},
  { path: 'login', component: LoginRoutedComponent},
  { path: 'logout', component: LogoutRoutedComponent},

  { path: 'admin/camiseta/plist', component: AdminCamisetaPlistRoutedComponent},
  { path: 'admin/camiseta/plist/byequipo/:idequipo', component: AdminCamisetaPlistRoutedComponent},
  { path: 'admin/camiseta/plist/bymodalidad/:idmodalidad', component: AdminCamisetaPlistRoutedComponent},
  { path: 'admin/camiseta/plist/byliga/:idliga', component: AdminCamisetaPlistRoutedComponent},
  { path: 'admin/camiseta/edit/:id', component: AdminCamisetaEditRoutedComponent},
  { path: 'admin/camiseta/new', component: AdminCamisetaNewRoutedComponent},
  { path: 'admin/camiseta/view/:id', component: AdminCamisetaViewRoutedComponent},
  { path: 'usuario/camiseta/plist', component: UserCamisetaPlistRoutedComponent},
  { path: 'usuario/camiseta/plist/byequipo/:idequipo', component: UserCamisetaPlistRoutedComponent},
  { path: 'usuario/camiseta/plist/bymodalidad/:idmodalidad', component: UserCamisetaPlistRoutedComponent},
  { path: 'usuario/camiseta/plist/byliga/:idliga', component: UserCamisetaPlistRoutedComponent},
  { path: 'usuario/camiseta/view/:id', component: UserCamisetaViewRoutedComponent},

  { path: 'admin/usuario/plist', component: AdminUsuarioPlistRoutedComponent},
  { path: 'admin/usuario/edit/:id', component: AdminUsuarioEditRoutedComponent},
  { path: 'admin/usuario/new', component: AdminUsuarioNewRoutedComponent},
  { path: 'usuario/usuario/view/:id', component: UserUsuarioViewRoutedComponent},
 
  { path: 'admin/valoracion/plist', component: AdminValoracionPlistRoutedComponent},
  { path: 'admin/valoracion/plist/bycamiseta/:idcamiseta', component: AdminValoracionPlistRoutedComponent},
  { path: 'admin/valoracion/plist/byusuario/:idusuario', component: AdminValoracionPlistRoutedComponent},
  { path: 'admin/valoracion/edit/:id', component: AdminValoracionEditRoutedComponent},
  { path: 'admin/valoracion/new', component: AdminValoracionNewRoutedComponent},
  { path: 'admin/valoracion/view/:id', component: AdminValoracionViewRoutedComponent},

  { path: 'usuario/compra/plist/:idusuario', component: UserCompraPlistRoutedComponent},
  { path: 'usuario/compra/view/:id', component: UserCompraViewRoutedComponent},
  

  { path: 'admin/equipo/plist', component: AdminEquipoPlistRoutedComponent},
  { path: 'admin/equipo/plist/byliga/:idliga', component: AdminEquipoPlistRoutedComponent},
  { path: 'admin/equipo/edit/:id', component: AdminEquipoEditRoutedComponent},
  { path: 'admin/equipo/new', component: AdminEquipoNewRoutedComponent},
  { path: 'admin/equipo/view/:id', component: AdminEquipoViewRoutedComponent},
  { path: 'usuario/equipo/plist', component: UserEquipoPlistRoutedComponent},

  { path: 'admin/liga/plist', component: AdminLigaPlistRoutedComponent},
  { path: 'admin/liga/edit/:id', component: AdminLigaEditRoutedComponent},
  { path: 'admin/liga/new', component: AdminLigaNewRoutedComponent},
  { path: 'admin/liga/view/:id', component: AdminLigaViewRoutedComponent},
  { path: 'usuario/liga/plist', component: UserLigaPlistRoutedComponent},

  { path: 'admin/modalidad/plist', component: AdminModalidadPlistRoutedComponent},
  { path: 'admin/modalidad/edit/:id', component: AdminModalidadEditRoutedComponent},
  { path: 'admin/modalidad/new', component: AdminModalidadNewRoutedComponent},
  { path: 'admin/modalidad/view/:id', component: AdminModalidadViewRoutedComponent},
  { path: 'usuario/modalidad/plist', component: UserModalidadPlistRoutedComponent},

  { path: 'usuario/carrito/plist', component: UserCarritoPlistRoutedComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
