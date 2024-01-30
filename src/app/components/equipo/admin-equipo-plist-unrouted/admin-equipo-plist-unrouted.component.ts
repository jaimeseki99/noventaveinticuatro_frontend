import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmationService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { PaginatorState } from 'primeng/paginator';
import { Subject } from 'rxjs';
import { IEquipo, IEquipoPage, ILiga } from 'src/app/model/model.interfaces';
import { EquipoAjaxService } from 'src/app/service/equipo.ajax.service.service';
import { LigaAjaxService } from 'src/app/service/liga.ajax.service.service';
import { AdminEquipoDetailUnroutedComponent } from '../admin-equipo-detail-unrouted/admin-equipo-detail-unrouted.component';

@Component({
  selector: 'app-admin-equipo-plist-unrouted',
  templateUrl: './admin-equipo-plist-unrouted.component.html',
  styleUrls: ['./admin-equipo-plist-unrouted.component.css']
})
export class AdminEquipoPlistUnroutedComponent implements OnInit {

  @Input() forceReload: Subject<boolean> = new Subject<boolean>();
  @Input() id_liga: number = 0;

  page: IEquipoPage | undefined;
  liga: ILiga | null = null;
  orderField: string = "id";
  orderDirection: string = "asc";
  paginatorState: PaginatorState = { first: 0, rows: 10, page: 0, pageCount: 0};
  status: HttpErrorResponse | null = null;
  equipoABorrar: IEquipo | null = null;
  

  constructor(
    private ligaAjaxService: LigaAjaxService,
    private equipoAjaxService: EquipoAjaxService,
    public dialogService: DialogService,
    private confirmationSerivce: ConfirmationService,
    private matSnackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.getPage();
    if (this.id_liga > 0) {
      this.getLiga();
    }
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
    this.equipoAjaxService.getEquiposPage(rows, page, this.orderField, this.orderDirection).subscribe({
      next: (data: IEquipoPage) => {
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

  doView(equipo: IEquipo) {
    let ref: DynamicDialogRef | undefined;
    ref = this.dialogService.open(AdminEquipoDetailUnroutedComponent, {
      header: "Detalle de equipo",
      width: '70%',
      maximizable: false,
      data: {
        id: equipo.id
      }
    });
  }

  doRemove(equipo: IEquipo) {
    this.equipoABorrar = equipo;
    this.confirmationSerivce.confirm({
      accept: () => {
        this.matSnackBar.open("Borrando equipo...", "Aceptar", { duration: 3000 });
        this.equipoAjaxService.deleteEquipo(equipo.id).subscribe({
          next: () => {
            this.matSnackBar.open("Equipo borrado correctamente", "Aceptar", { duration: 3000 });
            this.getPage();
          },
          error: (err: HttpErrorResponse) => {
            this.matSnackBar.open("Error al borrar el equipo", "Aceptar", { duration: 3000 });
            this.status = err;
          }
        });
      },
      reject: () => {
        this.matSnackBar.open("Cancelando borrado de equipo...", "Aceptar", { duration: 3000 });
      }
    })
  }

  getLiga(): void {
    this.ligaAjaxService.getLigaById(this.id_liga).subscribe({
      next: (data: ILiga) => {
        this.liga = data;
        this.getPage();
      },
      error: (err: HttpErrorResponse) => {
        this.status = err;
      }
    });
  }

  getEquiposByLiga(): void {
    const psPage = this.paginatorState.page ?? 0;
    const psRows = this.paginatorState.rows ?? 0;
    this.equipoAjaxService.getEquiposByLiga(this.id_liga, psRows, psPage, this.orderField, this.orderDirection).subscribe({
      next: (data: IEquipoPage) => {
        this.page = data;
        this.paginatorState.pageCount = data.totalPages;
        this.getPage();
      },
      error: (err: HttpErrorResponse) => {
        this.status = err;
      }
    });
  }

  
}
