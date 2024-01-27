import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit, Optional } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { IUsuario } from 'src/app/model/model.interfaces';
import { UsuarioAjaxService } from 'src/app/service/usuario.ajax.service.service';

@Component({
  selector: 'app-admin-usuario-detail-unrouted',
  templateUrl: './admin-usuario-detail-unrouted.component.html',
  styleUrls: ['./admin-usuario-detail-unrouted.component.css']
})
export class AdminUsuarioDetailUnroutedComponent implements OnInit {

  @Input() id: number = 1;

  usuario: IUsuario = {} as IUsuario;
  status: HttpErrorResponse | null = null;

  constructor(
    private usuarioAjaxService: UsuarioAjaxService,
    @Optional() public ref: DynamicDialogRef,
    @Optional() public config: DynamicDialogConfig
  ) {
    if (config) {
      if (config.data) {
        this.id = config.data.id;
      }
    }
  }

  ngOnInit() {
    this.getOne();
  }

  getOne(): void {
    this.usuarioAjaxService.getUsuarioById(this.id).subscribe({
      next: (data: IUsuario) => {
        this.usuario = data;
      },
      error: (err: HttpErrorResponse) => {
        this.status = err;
      }
    });
    }
     
  }


