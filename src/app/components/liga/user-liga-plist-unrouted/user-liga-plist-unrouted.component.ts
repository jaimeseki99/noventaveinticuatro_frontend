import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, Input } from '@angular/core';
import { data } from 'autoprefixer';
import { PaginatorState } from 'primeng/paginator';
import { Subject } from 'rxjs';
import { ILiga, ILigaPage } from 'src/app/model/model.interfaces';
import { LigaAjaxService } from 'src/app/service/liga.ajax.service.service';

@Component({
  selector: 'app-user-liga-plist-unrouted',
  templateUrl: './user-liga-plist-unrouted.component.html',
  styleUrls: ['./user-liga-plist-unrouted.component.css']
})
export class UserLigaPlistUnroutedComponent implements OnInit {

  @Input() forceReload: Subject<boolean> = new Subject<boolean>();
  filtro: string = '';

  page: ILigaPage | undefined;

  ligas: ILiga[] = [];
  orderField: string = "id";
  orderDirection: string = "asc";
  paginatorState: PaginatorState = { first: 0, rows: 12, page: 0, pageCount: 0 };
  status: HttpErrorResponse | null = null;

  constructor(
    private ligaAjaxService: LigaAjaxService
  ) { }

  ngOnInit() {
    this.getLigas();
    this.forceReload.subscribe({
      next: (v) => {
        if (v) {
          this.getLigas();}
      }
    })
  }

  getLigas(): void {
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
    })
  }

  onPageChange(event: PaginatorState) {
    this.paginatorState.rows = event.rows;
    this.paginatorState.page = event.page;
    this.getLigas();
  }

  onInputChange(query: string): void {
    const rows = this.paginatorState.rows || 0;
    const page = this.paginatorState.page || 0;
    if (query.length > 2) {
      this.ligaAjaxService.getLigaPage(rows, page, this.orderField, this.orderDirection, query).subscribe({
        next: (data: ILigaPage) => {
          this.page = data;
          this.ligas = data.content;
          this.paginatorState.pageCount = data.totalPages;
        },
        error: (err: HttpErrorResponse) => {
          this.status = err;
        } 
      })
    } else {
      this.getLigas();
    }
  }

}
