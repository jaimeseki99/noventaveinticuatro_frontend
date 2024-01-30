import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { DialogService } from 'primeng/dynamicdialog';
import { IUsuario, SessionEvent } from 'src/app/model/model.interfaces';
import { SesionAjaxService } from 'src/app/service/sesion.ajax.service.service';
import { UsuarioAjaxService } from 'src/app/service/usuario.ajax.service.service';

@Component({
  selector: 'app-menu-unrouted',
  templateUrl: './menu-unrouted.component.html',
  styleUrls: ['./menu-unrouted.component.css']
})
export class MenuUnroutedComponent implements OnInit {

  username: string = '';
  userSesion: IUsuario | null = null;
  url: string = '';
  isDropdownOpen: boolean = false;
  
  constructor(
    private sesionAjaxService: SesionAjaxService,
    private usuarioAjaxService: UsuarioAjaxService,
    private dialogService: DialogService,
    private router: Router
  ) { 
    this.router.events.subscribe((ev) => {
    if (ev instanceof NavigationEnd) {
      this.url = ev.url;
    }
  })

  this.username = sesionAjaxService.getUsername();
  this.usuarioAjaxService.getUsuarioByUsername(this.sesionAjaxService.getUsername()).subscribe({
    next: (usuario: IUsuario) => {
      this.userSesion = usuario;
    },
    error: (err: HttpErrorResponse) => {
      console.log(err);
    }
  });
  }

  ngOnInit() {
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

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

}
