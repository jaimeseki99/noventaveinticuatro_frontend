import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit } from '@angular/core';
import { SesionAjaxService } from 'src/app/service/sesion.ajax.service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout-routed',
  templateUrl: './logout-routed.component.html',
  styleUrls: ['./logout-routed.component.css']
})
export class LogoutRoutedComponent implements OnInit {

  constructor(
    private sesionAjaxService: SesionAjaxService,
    private matSnackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit() {
  }

  logout() {
    this.sesionAjaxService.logout();
    this.sesionAjaxService.emit({ type: 'logout' });
    this.matSnackBar.open('Sesión cerrada', 'Cerrar', { duration: 3000 });
    this.router.navigate(['/home']);
  }

  cancel() {
    this.router.navigate(['/home']);
  }



}
