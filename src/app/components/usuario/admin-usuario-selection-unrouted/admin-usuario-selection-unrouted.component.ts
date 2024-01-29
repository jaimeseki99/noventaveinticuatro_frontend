import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { PaginatorState } from 'primeng/paginator';
import { IUsuario, IUsuarioPage } from 'src/app/model/model.interfaces';
import { UsuarioAjaxService } from 'src/app/service/usuario.ajax.service.service';

@Component({
  selector: 'app-admin-usuario-selection-unrouted',
  templateUrl: './admin-usuario-selection-unrouted.component.html',
  styleUrls: ['./admin-usuario-selection-unrouted.component.css']
})
export class AdminUsuarioSelectionUnroutedComponent implements OnInit {

  page: IUsuarioPage | undefined;
  orderField: string = "id";
  orderDirection: string = "asc";
  paginatorState: PaginatorState = { first: 0, rows: 10, page: 0, pageCount: 0};
  status: HttpErrorResponse | null = null;
  usuarioABorrar: IUsuario | null = null;

  constructor(
    private usuarioAjaxService: UsuarioAjaxService,
    public dialogService: DialogService,
    public dynamicDialogRef: DynamicDialogRef
  ) { }

  ngOnInit() {
    this.getPage();
  }

  getPage(): void {
    const page = this.paginatorState.page || 0;
    const rows = this.paginatorState.rows || 0;
    this.usuarioAjaxService.getUsuariosPage(rows, page, this.orderField, this.orderDirection).subscribe({
      next: (data: IUsuarioPage) => {
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

  onSelectUsuario(usuario: IUsuario) {
    this.dynamicDialogRef.close(usuario);
  }


}
