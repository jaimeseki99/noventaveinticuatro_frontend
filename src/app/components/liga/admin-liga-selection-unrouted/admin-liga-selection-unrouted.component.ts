import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { PaginatorState } from 'primeng/paginator';
import { ILiga, ILigaPage } from 'src/app/model/model.interfaces';
import { LigaAjaxService } from 'src/app/service/liga.ajax.service.service';

@Component({
  selector: 'app-admin-liga-selection-unrouted',
  templateUrl: './admin-liga-selection-unrouted.component.html',
  styleUrls: ['./admin-liga-selection-unrouted.component.css']
})
export class AdminLigaSelectionUnroutedComponent implements OnInit {

  page: ILigaPage | undefined;
  orderField: string = "id";
  orderDirection: string = "asc";
  paginatorState: PaginatorState = { first: 0, rows: 10, page: 0, pageCount: 0 };
  status: HttpErrorResponse | null = null;

  constructor(
    private ligaAjaxService: LigaAjaxService,
    public dynamicDialogRef: DynamicDialogRef,
    public dialogService: DialogService
  ) { }

  ngOnInit() {
    this.getPage();
  }

  getPage(): void {
    const page = this.paginatorState.page || 0;
    const rows = this.paginatorState.rows || 0;
    this.ligaAjaxService.getLigaPage(rows, page, this.orderField, this.orderDirection).subscribe({
      next: (data: ILigaPage) => {
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

  onSelectLiga(liga: ILiga) {
    this.dynamicDialogRef.close(liga);
  }

}
