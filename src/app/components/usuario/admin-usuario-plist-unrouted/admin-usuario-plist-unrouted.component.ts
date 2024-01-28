import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ConfirmEventType, ConfirmationService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { PaginatorState } from 'primeng/paginator';
import { Subject } from 'rxjs';
import { IUsuario, IUsuarioPage } from 'src/app/model/model.interfaces';
import { UsuarioAjaxService } from 'src/app/service/usuario.ajax.service.service';
import { AdminUsuarioDetailUnroutedComponent } from '../admin-usuario-detail-unrouted/admin-usuario-detail-unrouted.component';

@Component({
  selector: 'app-admin-usuario-plist-unrouted',
  templateUrl: './admin-usuario-plist-unrouted.component.html',
  styleUrls: ['./admin-usuario-plist-unrouted.component.css']
})
export class AdminUsuarioPlistUnroutedComponent implements OnInit {

  @Input() forceReload: Subject<boolean> = new Subject<boolean>();

  page: IUsuarioPage | undefined;
  orderField: string = "id";
  orderDirection: string = "asc";
  paginatorState: PaginatorState = { first: 0, rows: 10, page: 0, pageCount: 0};
  status: HttpErrorResponse | null = null;
  usuarioABorrar: IUsuario | null = null;
  
  constructor(
    private usuarioAjaxService: UsuarioAjaxService,
    public dialogService: DialogService,
    private confirmationService: ConfirmationService,
    private matSnackBar: MatSnackBar
  ) { }

  ngOnInit() {
  }

  getPage(): void {
    const page: number = this.paginatorState.page ?? 0;
    const rows: number = this.paginatorState.rows ?? 0;
    this.usuarioAjaxService.getUsuariosPage(rows, page, this.orderField, this.orderDirection).subscribe({
      next: (page: IUsuarioPage) => {
        this.page = page;
        this.paginatorState.pageCount = page.totalPages;
      },
      error: (response: HttpErrorResponse) => {
        this.status = response;
      }
    });
    }

    onPageChange(event: PaginatorState) {
      this.paginatorState.rows = event.rows;
      this.paginatorState.page = event.page;
      this.getPage();
    }

    doOrder(fieldorder: string) {
      this.orderField = fieldorder;
      this.orderDirection = this.orderDirection == "asc" ? "desc" : "asc";
      this.getPage();
    }

    doView(usuario: IUsuario) {
      let ref: DynamicDialogRef | undefined;
      ref = this.dialogService.open(AdminUsuarioDetailUnroutedComponent, {
        header: 'Detalle de usuario',
        width: '70%',
        maximizable: false,
        data: { id: usuario.id, ref }
        });
      }

      doRemove(usuario: IUsuario) {
        this.usuarioABorrar = usuario;
        this.confirmationService.confirm({
          accept: () => {
            this.matSnackBar.open("Se ha eliminado el usuario", 'Aceptar', { duration: 3000 });
            this.usuarioAjaxService.deleteUsuario(usuario.id).subscribe({
              next: () => {
                this.getPage();
              },
              error: (err: HttpErrorResponse) => {
                this.status = err;
              }
            });
          },
          reject: (type: ConfirmEventType) => {
            this.matSnackBar.open("No se ha podido eliminar el usuario", 'Aceptar', { duration: 3000 });
          }
        })
      }


    }
  

