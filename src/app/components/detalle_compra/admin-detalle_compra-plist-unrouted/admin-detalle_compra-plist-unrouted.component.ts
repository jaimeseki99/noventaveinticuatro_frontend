import { ConfirmEventType, ConfirmationService } from 'primeng/api';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { PaginatorState } from 'primeng/paginator';
import { Subject } from 'rxjs';
import { ICamiseta, ICompra, IDetalleCompra, IDetalleCompraPage } from 'src/app/model/model.interfaces';
import { CamisetaAjaxService } from 'src/app/service/camiseta.ajax.service.service';
import { CompraAjaxService } from 'src/app/service/compra.ajax.service.service';
import { DetalleCompraAjaxService } from 'src/app/service/detallecompra.ajax.service.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdminDetalle_compraDetailUnroutedComponent } from '../admin-detalle_compra-detail-unrouted/admin-detalle_compra-detail-unrouted.component';


@Component({
  selector: 'app-admin-detalle_compra-plist-unrouted',
  templateUrl: './admin-detalle_compra-plist-unrouted.component.html',
  styleUrls: ['./admin-detalle_compra-plist-unrouted.component.css']
})
export class AdminDetalle_compraPlistUnroutedComponent implements OnInit {

  @Input() forceReload: Subject<boolean> = new Subject<boolean>();
  @Input() id_compra: number = 0;
  @Input() id_camiseta: number = 0;

  page: IDetalleCompraPage | undefined;
  compra: ICompra | null = null;
  camiseta: ICamiseta | null = null;
  orderField: string = "id";
  orderDirection: string = "asc";
  paginatorState: PaginatorState = { first: 0, rows: 10, page: 0, pageCount: 0};
  status: HttpErrorResponse | null = null;
  detalle_compraABorrar: IDetalleCompra | null = null;
  

  constructor(
    private detalleCompraAjaxService: DetalleCompraAjaxService,
    private compraAjaxService: CompraAjaxService,
    private camisetaAjaxService: CamisetaAjaxService,
    public dialogService: DialogService,
    private confirmationService: ConfirmationService,
    private matSnackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.getPage();
    if (this.id_compra > 0) {
      this.getCompra();
    }
    if (this.id_camiseta > 0) {
      this.getCamiseta();
    }
    this.forceReload.subscribe({
      next: (v) => {
        if (v) {
        this.getPage();
      }
    }
    });
  }

  getPage(): void {
    const rows = this.paginatorState.rows ?? 0;
    const page = this.paginatorState.page ?? 0;
    this.detalleCompraAjaxService.getDetalleCompraPage(page, rows, this.orderField, this.orderDirection, this.id_compra, this.id_camiseta).subscribe({
      next: (data: IDetalleCompraPage) => {
        this.page = data;
        this.paginatorState.pageCount = data.totalPages;
      },
      error: (err: HttpErrorResponse) => {
        this.status = err;
      }
    });
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

  doView(detalleCompra: IDetalleCompra) {
    let ref: DynamicDialogRef | undefined;
    ref = this.dialogService.open(AdminDetalle_compraDetailUnroutedComponent, {
      data: {
        id: detalleCompra.id
      },
      header: "Detalle Compra",
      width: "70%",
      maximizable: false
    });
  }

  doRemove(detalleCompra: IDetalleCompra) {
    this.detalle_compraABorrar = detalleCompra;
    this.confirmationService.confirm({
      accept: () => {
        this.matSnackBar.open("Se ha eliminado el producto el producto de la comopra", "Aceptar", { duration: 3000 });
        this.detalleCompraAjaxService.deleteDetalleCompra(detalleCompra.id).subscribe({
          next: () => {
            this.getPage();
          },
          error: (err: HttpErrorResponse) => {
            this.status = err;
            this.matSnackBar.open("No se ha podido eliminar el producto de la compra", "Aceptar", { duration: 3000 });
          }
        });
      },
      reject: (type: ConfirmEventType) => {
        this.matSnackBar.open("Se ha anulado la eliminación del producto de la compra", "Aceptar", { duration: 3000 });
      }
    });
  }

  getCompra(): void {
    this.compraAjaxService.getCompraById(this.id_compra).subscribe({
      next: (data: ICompra) => {
        this.compra = data;
      },
      error: (err: HttpErrorResponse) => {
        this.status = err;
      }
    });
  }

  getCamiseta(): void {
    this.camisetaAjaxService.getCamisetaById(this.id_camiseta).subscribe({
      next: (data: ICamiseta) => {
        this.camiseta = data;
      },
      error: (err: HttpErrorResponse) => {
        this.status = err;
      }
    });
  }

}
