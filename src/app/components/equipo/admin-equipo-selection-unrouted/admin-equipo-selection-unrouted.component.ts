import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { PaginatorState } from 'primeng/paginator';
import { IEquipo, IEquipoPage } from 'src/app/model/model.interfaces';
import { EquipoAjaxService } from 'src/app/service/equipo.ajax.service.service';

@Component({
  selector: 'app-admin-equipo-selection-unrouted',
  templateUrl: './admin-equipo-selection-unrouted.component.html',
  styleUrls: ['./admin-equipo-selection-unrouted.component.css']
})
export class AdminEquipoSelectionUnroutedComponent implements OnInit {

  page: IEquipoPage | undefined;
  orderField: string = "id";
  orderDirection: string = "asc";
  paginatorState: PaginatorState = { first: 0, rows: 10, page: 0, pageCount: 0 };
  status: HttpErrorResponse | null = null;
  id_liga: number = 0;


  constructor(
    private equipoAjaxService: EquipoAjaxService,
    public dynamicDialogRef: DynamicDialogRef,
    public dialogService: DialogService,
  ) { }

  ngOnInit() {
    this.getPage();
  }

  getPage(): void {
    const page = this.paginatorState.page || 0;
    const rows = this.paginatorState.rows || 0;
    this.equipoAjaxService.getEquiposPage(rows, page, this.orderField, this.orderDirection, this.id_liga).subscribe({
      next: (data: IEquipoPage) => {
        this.page = data;
        this.paginatorState.pageCount = data.totalPages;
      },
      error: (err: HttpErrorResponse) => {
        this.status = err;
      }
    })
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

  onSelectEquipo(equipo: IEquipo) {
    this.dynamicDialogRef.close(equipo);
  }

}
