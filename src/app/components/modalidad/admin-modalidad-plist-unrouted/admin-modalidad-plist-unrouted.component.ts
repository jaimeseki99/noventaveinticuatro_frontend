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

@Component({
  selector: 'app-admin-modalidad-plist-unrouted',
  templateUrl: './admin-modalidad-plist-unrouted.component.html',
  styleUrls: ['./admin-modalidad-plist-unrouted.component.css']
})
export class AdminModalidadPlistUnroutedComponent implements OnInit {

  @Input() forceReload: Subject<boolean> = new Subject<boolean>();
  
  page: IModalidadPage | undefined;
  orderField: string = "id";
  orderDirection: string = "asc";
  paginatorState: PaginatorState = { first: 0, rows: 10, page: 0, pageCount: 0};
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
    this.modalidadAjaxService.getModalidadPage(rows, page, this.orderField, this.orderDirection).subscribe({
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
    this.confirmationService.confirm({
      accept: () => {
        this.matSnackBar.open("Se ha eliminado la modalidad", 'Aceptar', { duration: 3000});
        this.modalidadAjaxService.deleteModalidad(modalidad.id).subscribe({
          next: () => {
            this.getPage();
          },
          error: (err: HttpErrorResponse) => {
            this.status = err;
            this.matSnackBar.open("No se ha podido eliminar la modalidad", 'Aceptar', { duration: 3000});
          }
        });
      },
      reject: (type: ConfirmEventType) => {
        this.matSnackBar.open("Se ha anulado la eliminación de la modalidad", 'Aceptar', { duration: 3000});
      }
    })
  }

}
