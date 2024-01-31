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

  { path: 'admin/usuario/plist', component: AdminUsuarioPlistRoutedComponent},
  { path: 'admin/usuario/edit/:id', component: AdminUsuarioEditRoutedComponent},
  { path: 'admin/usuario/new', component: AdminUsuarioNewRoutedComponent},

  { path: 'admin/valoracion/plist', component: AdminValoracionPlistRoutedComponent},

  { path: 'admin/equipo/plist', component: AdminEquipoPlistRoutedComponent},

  { path: 'admin/liga/plist', component: AdminLigaPlistRoutedComponent},

  { path: 'admin/modalidad/plist', component: AdminModalidadPlistRoutedComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
