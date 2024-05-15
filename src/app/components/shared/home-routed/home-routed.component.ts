import { HttpErrorResponse } from '@angular/common/http';
import { UsuarioAjaxService } from './../../../service/usuario.ajax.service.service';
import { Component, OnInit } from '@angular/core';
import { IUsuario, SessionEvent } from 'src/app/model/model.interfaces';
import { SesionAjaxService } from 'src/app/service/sesion.ajax.service.service';

@Component({
  selector: 'app-home-routed',
  templateUrl: './home-routed.component.html',
  styleUrls: ['./home-routed.component.css']
})
export class HomeRoutedComponent implements OnInit {

  username: string = '';
  userSesion: IUsuario | null = null;

  constructor(
    private sesionAjaxService: SesionAjaxService,
    private usuarioAjaxService: UsuarioAjaxService
  ) { }

  ngOnInit() {
    this.isLogged();
    this.sesionAjaxService.on().subscribe({
      next: (data: SessionEvent) => {
        if (data.type === 'login') {
          this.username = this.sesionAjaxService.getUsername();
          this.usuarioAjaxService.getUsuarioByUsername(this.sesionAjaxService.getUsername()).subscribe({
            next: (usuario: IUsuario) => {
              this.userSesion = usuario;
            },
            error: (err: HttpErrorResponse) => {
              console.log(err);
            }
          });
        } else if (data.type === 'logout') {
          this.username = '';
        }
      }
    });
  }

  isLogged(): boolean {
    return this.sesionAjaxService.isSessionActive();
  }

  

}
