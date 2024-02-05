import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { PaginatorState } from 'primeng/paginator';
import { Subject } from 'rxjs';
import { IEquipoPage } from 'src/app/model/model.interfaces';
import { EquipoAjaxService } from 'src/app/service/equipo.ajax.service.service';

@Component({
  selector: 'app-user-equipo-plist-unrouted',
  templateUrl: './user-equipo-plist-unrouted.component.html',
  styleUrls: ['./user-equipo-plist-unrouted.component.css']
})
export class UserEquipoPlistUnroutedComponent implements OnInit {

  @Input() forceReload: Subject<boolean> = new Subject<boolean>();
  
  page: IEquipoPage | undefined;
  orderField: string = 'id';
  orderDirection: string = 'asc';
  paginatorState: PaginatorState = { first: 0, rows: 10, page: 0, pageCount: 0};
  status: HttpErrorResponse | null = null;

  constructor(private equipoAjaxService: EquipoAjaxService) 
  {}

  ngOnInit() {
  }

  getEquipos(): void {
    const rows = this.paginatorState.rows ?? 0;
    const page = this.paginatorState.page ?? 0;
    this.equipoAjaxService.getEquiposPage(rows, page, this.orderField, this.orderDirection, 0).subscribe({
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
    this.getEquipos();
  }

}
