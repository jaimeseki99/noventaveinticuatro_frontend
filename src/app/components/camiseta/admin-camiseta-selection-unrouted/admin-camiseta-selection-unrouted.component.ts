import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { PaginatorState } from 'primeng/paginator';
import { ICamiseta, ICamisetaPage } from 'src/app/model/model.interfaces';
import { CamisetaAjaxService } from 'src/app/service/camiseta.ajax.service.service';

@Component({
  selector: 'app-admin-camiseta-selection-unrouted',
  templateUrl: './admin-camiseta-selection-unrouted.component.html',
  styleUrls: ['./admin-camiseta-selection-unrouted.component.css']
})
export class AdminCamisetaSelectionUnroutedComponent implements OnInit {

  page: ICamisetaPage | undefined;
  orderField: string = "id";
  orderDirection: string = "asc";
  paginatorState: PaginatorState = { first: 0, rows: 10, page: 0, pageCount: 0};
  status: HttpErrorResponse | null = null;
  id_equipo: number = 0;
  id_modalidad: number = 0;
  id_liga: number = 0;
  
  constructor(
    private camisetaAjaxService: CamisetaAjaxService,
    public dialogService: DialogService,
    public dynamicDialogRef: DynamicDialogRef
  ) { }

  ngOnInit() {
    this.getPage();
  }

  getPage(): void {
    const page = this.paginatorState.page || 0;
    const rows = this.paginatorState.rows || 0;
    this.camisetaAjaxService.getPageCamisetas(rows, page, this.orderField, this.orderDirection, this.id_equipo, this.id_modalidad, this.id_liga).subscribe({
      next: (data: ICamisetaPage) => {
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

  selectCamiseta(camiseta: ICamiseta) {
    this.dynamicDialogRef.close(camiseta);
  }

}

