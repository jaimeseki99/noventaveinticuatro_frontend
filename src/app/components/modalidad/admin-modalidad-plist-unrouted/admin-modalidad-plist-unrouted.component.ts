import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmEventType, ConfirmationService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { PaginatorState } from 'primeng/paginator';
import { Subject } from 'rxjs';
import { IModalidad, IModalidadPage } from 'src/app/model/model.interfaces';
import { ModalidadAjaxService } from 'src/app/service/modalidad.ajax.service.service';
import { AdminModalidadDetailUnroutedComponent } from '../admin-modalidad-detail-unrouted/admin-modalidad-detail-unrouted.component';
import { ConfirmationUnroutedComponent } from '../../shared/confirmation-unrouted/confirmation-unrouted.component';

@Component({
  selector: 'app-admin-modalidad-plist-unrouted',
  templateUrl: './admin-modalidad-plist-unrouted.component.html',
  styleUrls: ['./admin-modalidad-plist-unrouted.component.css']
})
export class AdminModalidadPlistUnroutedComponent implements OnInit {

  @Input() forceReload: Subject<boolean> = new Subject<boolean>();
  filtro: string = '';
  
  page: IModalidadPage | undefined;
  orderField: string = "id";
  orderDirection: string = "asc";
  paginatorState: PaginatorState = { first: 0, rows: 12, page: 0, pageCount: 0};
  status: HttpErrorResponse | null = null;
  modalidadABorrar: IModalidad | null = null;

  constructor(
    private modalidadAjaxService: ModalidadAjaxService,
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
    });
  }

  getPage(): void {
    const rows = this.paginatorState.rows ?? 0;
    const page = this.paginatorState.page ?? 0;
    this.modalidadAjaxService.getModalidadPage(rows, page, this.orderField, this.orderDirection, this.filtro).subscribe({
      next: (data: IModalidadPage) => {
        this.page = data;
        this.paginatorState.pageCount = data.totalPages;
      },
      error: (err: HttpErrorResponse) => {
        this.status = err;
      }
    });
  }

  onPageChange(event: PaginatorState) {
    this.paginatorState.rows = event.rows;
    this.paginatorState.page = event.page;
    this.getPage();
  }

  onInputChange(query: string): void {
    const rows = this.paginatorState.rows ?? 0;
    const page = this.paginatorState.page ?? 0;
    if (query.length > 2) {
      this.modalidadAjaxService.getModalidadPage(rows, page, this.orderField, this.orderDirection, query).subscribe({
        next: (data: IModalidadPage) => {
          this.page = data;
          this.paginatorState.pageCount = data.totalPages;
        },
        error: (err: HttpErrorResponse) => {
          this.status = err;
        }
      })
    } else {
      this.getPage();
    }
  }

  doOrder(fieldorder: string) {
    this.orderField = fieldorder;
    if (this.orderDirection === "asc") {
      this.orderDirection = "desc";
    } else {
      this.orderDirection = "asc";
    }
    this.getPage();
  }

  doView(modalidad: IModalidad) {
    let ref: DynamicDialogRef | undefined;
    ref = this.dialogService.open(AdminModalidadDetailUnroutedComponent, {
      data: {
        id: modalidad.id
      },
      header: "Detalle de modalidad",
      width: "70%",
      maximizable: false
    });
  }

  doRemove(modalidad: IModalidad) {
    this.modalidadABorrar = modalidad;
    this.dialogService.open(ConfirmationUnroutedComponent, {
      header: 'Confirmación',
      data: {
        message: '¿Estás seguro de eliminar la modalidad?'
      },
      width: '400px',
      style: {
        'border-radius': '8px',
        'box-shadow': '0 4px 6px rgba(0, 0, 0, 0.1)'
      },
      baseZIndex: 10000
    }).onClose.subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.modalidadAjaxService.deleteModalidad(modalidad.id).subscribe({
          next: () => {
            this.matSnackBar.open('Modalidad eliminada', 'Aceptar', { duration: 3000 });
            this.forceReload.next(true);
          },
          error: (err: HttpErrorResponse) => {
            this.matSnackBar.open(`Error al eliminar la modalidad: ${err.message}`, 'Aceptar', { duration: 3000 });
          }
        });
      } else {
        this.matSnackBar.open('Operación cancelada', 'Aceptar', { duration: 3000 });
      }
    });
  }

  // doRemove(modalidad: IModalidad) {
  //   this.modalidadABorrar = modalidad;
  //   this.confirmationService.confirm({
  //     accept: () => {
  //       this.matSnackBar.open("Se ha eliminado la modalidad", 'Aceptar', { duration: 3000});
  //       this.modalidadAjaxService.deleteModalidad(modalidad.id).subscribe({
  //         next: () => {
  //           this.getPage();
  //         },
  //         error: (err: HttpErrorResponse) => {
  //           this.status = err;
  //           this.matSnackBar.open("No se ha podido eliminar la modalidad", 'Aceptar', { duration: 3000});
  //         }
  //       });
  //     },
  //     reject: (type: ConfirmEventType) => {
  //       this.matSnackBar.open("Se ha anulado la eliminación de la modalidad", 'Aceptar', { duration: 3000});
  //     }
  //   })
  // }

}
