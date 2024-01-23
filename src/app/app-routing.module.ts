import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginRoutedComponent } from './components/shared/login-routed/login-routed.component';

const routes: Routes = [
  { path: 'login', component: LoginRoutedComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
