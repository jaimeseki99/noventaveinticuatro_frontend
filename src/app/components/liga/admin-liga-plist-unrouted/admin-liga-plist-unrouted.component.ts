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
import { ConfirmationUnroutedComponent } from '../../shared/confirmation-unrouted/confirmation-unrouted.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-liga-plist-unrouted',
  templateUrl: './admin-liga-plist-unrouted.component.html',
  styleUrls: ['./admin-liga-plist-unrouted.component.css']
})
export class AdminLigaPlistUnroutedComponent implements OnInit {

  @Input() forceReload: Subject<boolean> = new Subject<boolean>();
  filtro: string = '';

  page: ILigaPage | undefined;
  orderField: string = "id";
  orderDirection: string = "asc";
  paginatorState: PaginatorState = { first: 0, rows: 12, page: 0, pageCount: 0};
  status: HttpErrorResponse | null = null;
  ligaABorrar: ILiga | null = null;
  

  constructor(
    private ligaAjaxService: LigaAjaxService,
    public dialogService: DialogService,
    private confirmationService: ConfirmationService,
    private matSnackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.getPage();
  }

  getPage(): void {
    const rows = this.paginatorState.rows ?? 0;
    const page = this.paginatorState.page ?? 0;
    this.ligaAjaxService.getLigaPage(rows, page, this.orderField, this.orderDirection, this.filtro).subscribe({
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

  onInputChange(query: string): void {
    const rows = this.paginatorState.rows || 0;
    const page = this.paginatorState.page || 0;
    if (query.length > 2) {
      this.ligaAjaxService.getLigaPage(rows, page, this.orderField, this.orderDirection, query).subscribe({
        next: (data: ILigaPage) => {
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
    this.dialogService.open(ConfirmationUnroutedComponent, {
      header: 'Confirmación',
      data: {
        message: '¿Estás seguro de que quieres borrar esta liga de la base de datos?'
      },
      width: '400px',
      style: {
        'border-radius': '8px',
        'box-shadow': '0 4px 6px rgba(0, 0, 0, 0.1)'
      },
      baseZIndex: 10000
    }).onClose.subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.ligaAjaxService.deleteLiga(liga.id).subscribe({
          next: () => {
            Swal.fire({
              title: 'Liga borrada con éxito',
              icon: 'success',
              timer: 1000,
              timerProgressBar: true
            })
            this.matSnackBar.open('Liga borrada', 'Aceptar', { duration: 3000 });
            this.getPage();
          },
          error: (err: HttpErrorResponse) => {
            this.status = err;
            this.matSnackBar.open('Error al borrar la liga', 'Aceptar', { duration: 3000 });
          }
        });
      } else {
        this.matSnackBar.open('Operación cancelada', 'Aceptar', { duration: 3000 });
      }
    })
  }

  // doRemove(liga: ILiga) {
  //   this.ligaABorrar = liga;
  //   this.confirmationService.confirm({
  //     accept: () => {
  //       this.ligaAjaxService.deleteLiga(liga.id).subscribe({
  //         next: () => {
  //           this.matSnackBar.open("Liga borrada correctamente", "Aceptar", { duration: 3000 });
  //           this.getPage();
  //         },
  //         error: (err: HttpErrorResponse) => {
  //           this.status = err;
  //           this.matSnackBar.open("No se ha podido borrar la liga", "Aceptar", { duration: 3000 })
  //         }
  //       });
  //     },
  //     reject: (type: ConfirmEventType) => {
  //       this.matSnackBar.open("Cancelando borrado de liga...", "Aceptar", { duration: 3000 });
  //     }
  //   });
  // }

}
