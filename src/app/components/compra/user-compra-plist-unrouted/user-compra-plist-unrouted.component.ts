import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, Input} from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { throws } from 'assert';
import { PaginatorState } from 'primeng/paginator';
import { Subject } from 'rxjs';
import { ICompraPage, IUsuario } from 'src/app/model/model.interfaces';
import { CompraAjaxService } from 'src/app/service/compra.ajax.service.service';
import { SesionAjaxService } from 'src/app/service/sesion.ajax.service.service';

@Component({
  selector: 'app-user-compra-plist-unrouted',
  templateUrl: './user-compra-plist-unrouted.component.html',
  styleUrls: ['./user-compra-plist-unrouted.component.css']
})
export class UserCompraPlistUnroutedComponent implements OnInit {

  @Input() forceReload: Subject<boolean> = new Subject<boolean>();
  @Input() id_usuario: number = 0;

  page: ICompraPage | undefined;
  usuario: IUsuario | null = null;
  orderField: string = 'id';
  orderDirection: string = 'asc';
  paginatorState: PaginatorState = { first: 0, rows: 10, page: 0, pageCount: 0};
  status: HttpErrorResponse | null = null;

  constructor(
    private compraAjaxService: CompraAjaxService,
    private sesionAjaxService: SesionAjaxService,
    private router: Router,
    private matSnackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.getUserSesion();
    this.getCompras();
    this.forceReload.subscribe({
      next: (v) => {
        if (v) {
          this.getCompras();
        }
      }
    })
  }

  getUserSesion(): void {
    this.sesionAjaxService.getSessionUser()?.subscribe({
      next: (data: IUsuario) => {
        this.usuario = data;
      },
      error: (err: HttpErrorResponse) => {
        this.status = err;
        this.matSnackBar.open('No se ha podido obtener la sesión del usuario', 'Aceptar', {
          duration: 3000,
        });
      }
    });
  }

  getCompras(): void {
    if (this.usuario) {
      this.id_usuario = this.usuario.id;
      const rows = this.paginatorState.rows ?? 0;
      const page = this.paginatorState.page ?? 0;
      this.compraAjaxService.getPageCompras(rows, page, this.orderField, this.orderDirection, this.id_usuario).subscribe({
        next: (data: ICompraPage) => {
          this.page = data;
          this.paginatorState.pageCount = data.totalPages;
        },
        error: (err: HttpErrorResponse) => {
          this.status = err;
          this.matSnackBar.open('No se ha podido obtener la lista de compras', 'Aceptar', {
            duration: 3000,
          });
        }
      });
      }
    }
  
  onPageChange(event: PaginatorState) {
    this.paginatorState.rows = event.rows;
    this.paginatorState.page = event.page;
    this.getCompras();
  }

}
