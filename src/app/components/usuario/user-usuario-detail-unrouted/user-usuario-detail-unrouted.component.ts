import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { IUsuario } from 'src/app/model/model.interfaces';
import { SesionAjaxService } from 'src/app/service/sesion.ajax.service.service';
import { UsuarioAjaxService } from 'src/app/service/usuario.ajax.service.service';


@Component({
  selector: 'app-user-usuario-detail-unrouted',
  templateUrl: './user-usuario-detail-unrouted.component.html',
  styleUrls: ['./user-usuario-detail-unrouted.component.css']
})
export class UserUsuarioDetailUnroutedComponent implements OnInit {

  @Input() id: number = 1;

  usuario: IUsuario = {} as IUsuario;
  status: HttpErrorResponse | null = null;
  

  constructor(
    private usuarioAjaxService: UsuarioAjaxService
  ) { }

  ngOnInit() {
    this.getUsuario();
  }

  getUsuario(): void {
    this.usuarioAjaxService.getUsuarioById(this.id).subscribe({
      next: (usuario: IUsuario) => {
        this.usuario = usuario;
      },
      error: (error: HttpErrorResponse) => {
        this.status = error;
      }
    })
  }

}
