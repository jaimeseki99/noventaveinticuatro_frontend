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
 

  page: ICompraPage | undefined;
  usuario: IUsuario | null = null;
  orderField: string = 'id';
  orderDirection: string = 'asc';
  paginatorState: PaginatorState = { first: 0, rows: 12, page: 0, pageCount: 0};
  status: HttpErrorResponse | null = null;

  constructor(
    private compraAjaxService: CompraAjaxService,
    private sesionAjaxService: SesionAjaxService,
    private router: Router,
    private matSnackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.getCompras();
    this.forceReload.subscribe({
      next: (v) => {
        if (v) {
          this.getCompras();
        }
      }
    })
  }

  getCompras(): void {
    this.sesionAjaxService.getSessionUser()?.subscribe({
      next: (usuario: IUsuario) => {
        this.usuario = usuario;
        const rows: number = this.paginatorState.rows ?? 0;
        const page: number = this.paginatorState.page ?? 0;
        this.compraAjaxService.getPageCompras(rows, page, this.orderField, this.orderDirection, this.usuario?.id).subscribe({
          next: (page: ICompraPage) => {
            this.page = page;
            this.paginatorState.pageCount = this.page.totalPages;
          },
          error: (error: HttpErrorResponse) => {
            this.status = error;
            this.matSnackBar.open('Error al obtener las compras', 'OK', { duration: 3000 });
          }
        });
      }
    })
    }
  
  onPageChange(event: PaginatorState) {
    this.paginatorState.rows = event.rows;
    this.paginatorState.page = event.page;
    this.getCompras();
  }

}
