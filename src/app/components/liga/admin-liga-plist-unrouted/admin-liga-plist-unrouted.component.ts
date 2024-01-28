import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmEventType, ConfirmationService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { PaginatorState } from 'primeng/paginator';
import { Subject } from 'rxjs';
import { ILiga, ILigaPage } from 'src/app/model/model.interfaces';
import { LigaAjaxService } from 'src/app/service/liga.ajax.service.service';
import { AdminLigaDetailUnroutedComponent } from '../admin-liga-detail-unrouted/admin-liga-detail-unrouted.component';

@Component({
  selector: 'app-admin-liga-plist-unrouted',
  templateUrl: './admin-liga-plist-unrouted.component.html',
  styleUrls: ['./admin-liga-plist-unrouted.component.css']
})
export class AdminLigaPlistUnroutedComponent implements OnInit {

  @Input() forceReload: Subject<boolean> = new Subject<boolean>();

  page: ILigaPage | undefined;
  orderField: string = "id";
  orderDirection: string = "asc";
  paginatorState: PaginatorState = { first: 0, rows: 10, page: 0, pageCount: 0};
  status: HttpErrorResponse | null = null;
  ligaABorrar: ILiga | null = null;
  

  constructor(
    private ligaAjaxService: LigaAjaxService,
    public dialogService: DialogService,
    private confirmationService: ConfirmationService,
    private matSnackBar: MatSnackBar
  ) { }

  ngOnInit() {
  }

  getPage(): void {
    const rows = this.paginatorState.rows ?? 0;
    const page = this.paginatorState.page ?? 0;
    this.ligaAjaxService.getLigaPage(rows, page, this.orderField, this.orderDirection).subscribe({
      next: (data: ILigaPage) => {
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
    if (this.orderDirection == "asc") {
      this.orderDirection = "desc";
    } else {
      this.orderDirection = "asc";
    }
    this.getPage();
  }

  doView(liga: ILiga) {
    let ref: DynamicDialogRef | undefined;
    ref = this.dialogService.open(AdminLigaDetailUnroutedComponent, {
      data: {
        id: liga.id
      },
      header: "Detalle de liga",
      width: "70%",
      maximizable: false
    });
  }

  doRemove(liga: ILiga) {
    this.ligaABorrar = liga;
    this.confirmationService.confirm({
      accept: () => {
        this.ligaAjaxService.deleteLiga(liga.id).subscribe({
          next: () => {
            this.matSnackBar.open("Liga borrada correctamente", "Aceptar", { duration: 3000 });
            this.getPage();
          },
          error: (err: HttpErrorResponse) => {
            this.status = err;
            this.matSnackBar.open("No se ha podido borrar la liga", "Aceptar", { duration: 3000 })
          }
        });
      },
      reject: (type: ConfirmEventType) => {
        this.matSnackBar.open("Cancelando borrado de liga...", "Aceptar", { duration: 3000 });
      }
    });
  }

}
