import { IModalidad } from './../../../model/model.interfaces';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, Input } from '@angular/core';
import { data } from 'autoprefixer';
import { PaginatorState } from 'primeng/paginator';
import { Subject } from 'rxjs';
import { IModalidadPage } from 'src/app/model/model.interfaces';
import { ModalidadAjaxService } from 'src/app/service/modalidad.ajax.service.service';

@Component({
  selector: 'app-user-modalidad-plist-unrouted',
  templateUrl: './user-modalidad-plist-unrouted.component.html',
  styleUrls: ['./user-modalidad-plist-unrouted.component.css']
})
export class UserModalidadPlistUnroutedComponent implements OnInit {

  @Input() forceReload: Subject<boolean> = new Subject<boolean>(); 
  filtro: string = '';

  page: IModalidadPage | undefined;
  modalidades: IModalidad[] = [];
  orderField: string = "id";
  orderDirection: string = "asc";
  paginatorState: PaginatorState = { first: 0, rows: 12, page: 0, pageCount: 0};
  status: HttpErrorResponse | null = null;


  constructor(
    private modalidadAjaxService: ModalidadAjaxService,
  ) { }

  ngOnInit() {
    this.getModalidades();
    this.forceReload.subscribe({
      next: (v) => {
        if (v) {
          this.getModalidades();
        }
      }
    })
  }

  getModalidades(): void {
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
    })
  }

  onPageChange(event: PaginatorState) {
    this.paginatorState.rows = event.rows;
    this.paginatorState.page = event.page;
    this.getModalidades();
  }

  onInputChange(query: string): void {
    const rows = this.paginatorState.rows || 0;
    const page = this.paginatorState.page || 0;
    if (query.length > 2) {
      this.modalidadAjaxService.getModalidadPage(rows, page, this.orderField, this.orderDirection, query).subscribe({
        next: (data: IModalidadPage) => {
          this.page = data;
          this.modalidades = data.content;
          this.paginatorState.pageCount = data.totalPages;
        },
        error: (err: HttpErrorResponse) => {
          this.status = err;
        }
      })
    } else {
      this.getModalidades();
    }
  }

}
