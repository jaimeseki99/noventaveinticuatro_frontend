import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { PaginatorState } from 'primeng/paginator';
import { Subject } from 'rxjs';
import { ICompra, IDetalleCompraPage } from 'src/app/model/model.interfaces';
import { CompraAjaxService } from 'src/app/service/compra.ajax.service.service';
import { DetalleCompraAjaxService } from 'src/app/service/detallecompra.ajax.service.service';

@Component({
  selector: 'app-user-detalle_compra-plist-unrouted',
  templateUrl: './user-detalle_compra-plist-unrouted.component.html',
  styleUrls: ['./user-detalle_compra-plist-unrouted.component.css']
})
export class UserDetalle_compraPlistUnroutedComponent implements OnInit {

  @Input() forceReload: Subject<boolean> = new Subject<boolean>();
  @Input() id_compra: number = 0;
  @Input() id_camiseta: number = 0;

  page: IDetalleCompraPage | undefined;
  compra: ICompra | null = null;
  orderField: string = 'id';
  orderDirection: string = 'asc';
  paginatorState: PaginatorState = { first: 0, rows: 10, page: 0, pageCount: 0};
  status: HttpErrorResponse | null = null;
  
  constructor(
    private detalleCompraAjaxService: DetalleCompraAjaxService,
    private compraAjaxService: CompraAjaxService
  ) { }

  ngOnInit() {
    this.getPage();
    if (this.id_compra > 0) {
      this.getCompra();
    } 
    this.forceReload.subscribe({
      next: (v) => {
        if (v) {
          this.getPage();
        }
      }
    })
  }

  getPage(): void {
    const rows = this.paginatorState.rows ?? 0;
    const page = this.paginatorState.page ?? 0;
    this.detalleCompraAjaxService.getDetalleCompraPageByCompraId(this.id_compra, rows, page, this.orderField, this.orderDirection).subscribe({
      next: (data: IDetalleCompraPage) => {
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

    getCompra(): void {
      this.compraAjaxService.getCompraById(this.id_compra).subscribe({
        next: (data: ICompra) => {
          this.compra = data;
        },
        error: (err: HttpErrorResponse) => {
          this.status = err;
        }
      })
    }

  }

  

