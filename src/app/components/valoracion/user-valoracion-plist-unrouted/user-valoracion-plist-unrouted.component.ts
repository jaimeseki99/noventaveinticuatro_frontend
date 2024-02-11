import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { PaginatorState } from 'primeng/paginator';
import { Subject } from 'rxjs';
import { ICamiseta, IUsuario, IValoracion, IValoracionPage } from 'src/app/model/model.interfaces';
import { CamisetaAjaxService } from 'src/app/service/camiseta.ajax.service.service';
import { SesionAjaxService } from 'src/app/service/sesion.ajax.service.service';
import { ValoracionAjaxService } from 'src/app/service/valoracion.ajax.service.service';

@Component({
  selector: 'app-user-valoracion-plist-unrouted',
  templateUrl: './user-valoracion-plist-unrouted.component.html',
  styleUrls: ['./user-valoracion-plist-unrouted.component.css']
})
export class UserValoracionPlistUnroutedComponent implements OnInit {

  @Input() forceReload: Subject<boolean> = new Subject<boolean>();
  @Input() id_camiseta: number = 0;

  page: IValoracionPage | undefined;
  camiseta: ICamiseta | null = null;
  orderField: string = 'id';
  orderDirection: string = 'asc';
  paginatorState: PaginatorState = { first: 0, rows: 30, page: 0, pageCount: 0 };
  status: HttpErrorResponse | null = null;
  usuario: IUsuario | null = null;

  constructor(
    private valoracionAjaxService: ValoracionAjaxService,
    private camisetaAjaxService: CamisetaAjaxService,
    private sesionAjaxService: SesionAjaxService
  ) { }

  ngOnInit() {
    this.getValoraciones();
    this.forceReload.subscribe({
      next: (v) => {
        if (v) {
          this.getValoraciones();}
      }
    });
    this.sesionAjaxService.getSessionUser()?.subscribe({
      next: (usuario: IUsuario) => {
        this.usuario = usuario;
      },
      error: (err: HttpErrorResponse) => {
        this.status = err;
      }
    })
  }

  getValoraciones() {
    const rows: number = this.paginatorState.rows ?? 0;
    const page: number = this.paginatorState.page ?? 0;
    this.valoracionAjaxService.getValoracionPageByCamiseta(this.id_camiseta, page, rows, this.orderField, this.orderDirection).subscribe({
      next: (page: IValoracionPage) => {
        this.page = page;
        this.paginatorState.pageCount = page.totalPages;
      },
      error: (err: HttpErrorResponse) => {
        this.status = err;
      }
    })
  }

  getPage(event: PaginatorState) {
    this.paginatorState.rows = event.rows;
    this.paginatorState.page = event.page;
  }

  isUsuarioValoracion(valoracion: IValoracion): boolean {
    return this.usuario !== null && valoracion.usuario.id === this.usuario.id;
  }

  borrarValoracion(id_valoracion: number) {
    this.valoracionAjaxService.deleteValoracion(id_valoracion).subscribe({
      next: () => {
        this.getValoraciones();
      },
      error: (err: HttpErrorResponse) => {
        this.status = err;
      }
    })
  }



}
