import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { ConfirmEventType, ConfirmationService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { PaginatorState } from 'primeng/paginator';
import { Subject } from 'rxjs';
import { IUsuario, IUsuarioPage } from 'src/app/model/model.interfaces';
import { UsuarioAjaxService } from 'src/app/service/usuario.ajax.service.service';
import { AdminUsuarioDetailUnroutedComponent } from '../admin-usuario-detail-unrouted/admin-usuario-detail-unrouted.component';
import { ConfirmationUnroutedComponent } from '../../shared/confirmation-unrouted/confirmation-unrouted.component';
import * as Masonry from 'masonry-layout';

@Component({
  providers: [DialogService, ConfirmationService],
  selector: 'app-admin-usuario-plist-unrouted',
  templateUrl: './admin-usuario-plist-unrouted.component.html',
  styleUrls: ['./admin-usuario-plist-unrouted.component.css']
})
export class AdminUsuarioPlistUnroutedComponent implements OnInit {

  @Input() forceReload: Subject<boolean> = new Subject<boolean>();

  page: IUsuarioPage | undefined;
  orderField: string = "id";
  orderDirection: string = "asc";
  paginatorState: PaginatorState = { first: 0, rows: 12, page: 0, pageCount: 0};
  status: HttpErrorResponse | null = null;
  usuarioABorrar: IUsuario | null = null;
  
  constructor(
    private usuarioAjaxService: UsuarioAjaxService,
    public dialogService: DialogService,
    private confirmationService: ConfirmationService,
    private matSnackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.getPage();
    this.forceReload.subscribe({
      next: (v) => {
        if (v) {
          this.getPage();
        }
      }
    })
  }

  getPage(): void {
    const page: number = this.paginatorState.page || 0;
    const rows: number = this.paginatorState.rows || 0;
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
        this.dialogService.open(ConfirmationUnroutedComponent, {
          header: 'Confirmación',
          data: {
            message: '¿Está seguro que desea eliminar el usuario?'
          },
          width: '400px',
          style: {
            'border-radius': '8px',
            'box-shadow': '0 4px 6px rgba(0, 0, 0, 0.1)'
          },
          baseZIndex: 10000
        }).onClose.subscribe((confirmed: boolean) => {
          if (confirmed) {
            this.usuarioAjaxService.deleteUsuario(usuario.id).subscribe({
              next: () => {
                this.matSnackBar.open('Usuario eliminado', 'Aceptar', { duration: 3000 });
                this.forceReload.next(true);
                this.getPage();
              },
              error: (err: HttpErrorResponse) => {
                this.matSnackBar.open("No se ha podido eliminar el usuario", 'Aceptar', { duration: 3000 });
                this.status = err;
              }
            });
          } else {
            this.matSnackBar.open('Operación cancelada', 'Aceptar', { duration: 3000 });
          }
        
        })
      }

      // doRemove(usuario: IUsuario) {
      //   this.usuarioABorrar = usuario;
      //   this.confirmationService.confirm({
      //     accept: () => {
      //       this.matSnackBar.open("Se ha eliminado el usuario", 'Aceptar', { duration: 3000 });
      //       this.usuarioAjaxService.deleteUsuario(usuario.id).subscribe({
      //         next: () => {
      //           this.getPage();
      //         },
      //         error: (err: HttpErrorResponse) => {
      //           this.status = err;
      //         }
      //       });
      //     },
      //     reject: (type: ConfirmEventType) => {
      //       this.matSnackBar.open("No se ha podido eliminar el usuario", 'Aceptar', { duration: 3000 });
      //     }
      //   })
      // }


    }
  

