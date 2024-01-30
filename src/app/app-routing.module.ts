import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeRoutedComponent } from './components/shared/home-routed/home-routed.component';
import { LoginRoutedComponent } from './components/shared/login-routed/login-routed.component';
import { LogoutRoutedComponent } from './components/shared/logout-routed/logout-routed.component';
import { AdminCamisetaPlistRoutedComponent } from './components/camiseta/admin-camiseta-plist-routed/admin-camiseta-plist-routed.component';
import { AdminUsuarioPlistRoutedComponent } from './components/usuario/admin-usuario-plist-routed/admin-usuario-plist-routed.component';
import { AdminValoracionPlistRoutedComponent } from './components/valoracion/admin-valoracion-plist-routed/admin-valoracion-plist-routed.component';

const routes: Routes = [
  { path: '', component: HomeRoutedComponent},
  { path: 'home', component: HomeRoutedComponent},
  { path: 'login', component: LoginRoutedComponent},
  { path: 'logout', component: LogoutRoutedComponent},

  { path: 'admin/camiseta/plist', component: AdminCamisetaPlistRoutedComponent},

  { path: 'admin/usuario/plist', component: AdminUsuarioPlistRoutedComponent},

  { path: 'admin/valoracion/plist', component: AdminValoracionPlistRoutedComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
