import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { PaginatorState } from 'primeng/paginator';
import { IModalidad, IModalidadPage } from 'src/app/model/model.interfaces';
import { ModalidadAjaxService } from 'src/app/service/modalidad.ajax.service.service';

@Component({
  selector: 'app-admin-modalidad-selection-unrouted',
  templateUrl: './admin-modalidad-selection-unrouted.component.html',
  styleUrls: ['./admin-modalidad-selection-unrouted.component.css']
})
export class AdminModalidadSelectionUnroutedComponent implements OnInit {

  page: IModalidadPage | undefined;
  orderField: string = "id";
  orderDirection: string = "asc";
  paginatorState: PaginatorState = { first: 0, rows: 10, page: 0, pageCount: 0 };
  status: HttpErrorResponse | null = null;

  constructor(
    private modalidadAjaxService: ModalidadAjaxService,
    public dialogService: DialogService,
    public dynamicDialogRef: DynamicDialogRef
  ) { }

  ngOnInit() {
    this.getPage();
  }

  getPage(): void {
    const page = this.paginatorState.page || 0;
    const rows = this.paginatorState.rows || 0;
    this.modalidadAjaxService.getModalidadPage(rows, page, this.orderField, this.orderDirection).subscribe({
      next: (data: IModalidadPage) => {
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

  onSelectModalidad(modalidad: IModalidad) {
    this.dynamicDialogRef.close(modalidad);
  }

}
