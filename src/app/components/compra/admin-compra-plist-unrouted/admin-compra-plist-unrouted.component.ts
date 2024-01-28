import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmEventType, ConfirmationService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { PaginatorState } from 'primeng/paginator';
import { Subject } from 'rxjs';
import { ICompra, ICompraPage, IUsuario } from 'src/app/model/model.interfaces';
import { CompraAjaxService } from 'src/app/service/compra.ajax.service.service';
import { UsuarioAjaxService } from 'src/app/service/usuario.ajax.service.service';
import { AdminCompraDetailUnroutedComponent } from '../admin-compra-detail-unrouted/admin-compra-detail-unrouted.component';

@Component({
  selector: 'app-admin-compra-plist-unrouted',
  templateUrl: './admin-compra-plist-unrouted.component.html',
  styleUrls: ['./admin-compra-plist-unrouted.component.css']
})
export class AdminCompraPlistUnroutedComponent implements OnInit {

  @Input() forceReload: Subject<boolean> = new Subject<boolean>();
  @Input() id_usuario: number = 0;

  page: ICompraPage | undefined;
  usuario: IUsuario | null = null;
  orderField: string = "id";
  orderDirection: string = "asc";
  paginatorState: PaginatorState = { first: 0, rows: 10, page: 0, pageCount: 0};
  status: HttpErrorResponse | null = null;
  compraABorrar: ICompra | null = null;
  
  constructor(
    private usuarioAjaxService: UsuarioAjaxService,
    private compraAjaxService: CompraAjaxService,
    public dialogService: DialogService,
    private confirmationService: ConfirmationService,
    private matSnackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.getPage();
    if (this.id_usuario > 0) {
      this.getUsuario();
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
    this.compraAjaxService.getPageCompras(rows, page, this.orderField, this.orderDirection).subscribe({
      next: (data: ICompraPage) => {
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

  doView(compra: ICompra) {
    let ref: DynamicDialogRef | undefined;
    ref = this.dialogService.open(AdminCompraDetailUnroutedComponent, {
      header: "Mostrando los detalles de la compra",
      width: '70%',
      maximizable: false,
      data: {
        id: compra.id
      }
    });
  }

  doRemove(compra: ICompra) {
    this.compraABorrar = compra;
    this.confirmationService.confirm({
      accept: () => {
        this.matSnackBar.open(`Cancelando la compra ${compra.id}`, "Borrando", {duration: 3000});
        this.compraAjaxService.deleteCompra(compra.id).subscribe({
          next: () => {
            this.matSnackBar.open(`Compra ${compra.id} cancelada correctamente`, "Aceptar", {duration: 3000});
            this.getPage();
          },
          error: (err: HttpErrorResponse) => {
            this.matSnackBar.open(`Error al cancelar la compra ${compra.id}`, "Aceptar", {duration: 3000});
            this.status = err;
          }
        });
      },
      reject: (type: ConfirmEventType) => {
        this.matSnackBar.open("Se ha anulado la cancelación de la compra")
      }
    });
  }

  getUsuario(): void {
    this.usuarioAjaxService.getUsuarioById(this.id_usuario).subscribe({
      next: (data: IUsuario) => {
        this.usuario = data;
        this.getPage();
      },
      error: (err: HttpErrorResponse) => {
        this.status = err;
      }
    });
  }

  getComprasByUsuario(): void {
    const psPage = this.paginatorState.page ?? 0;
    const psRows = this.paginatorState.rows ?? 0;
    this.compraAjaxService.getCompraByUsuarioId(this.id_usuario, psPage, psRows, this.orderField, this.orderDirection).subscribe({
      next: (data: ICompraPage) => {
        this.page = data;
        this.paginatorState.pageCount = data.totalPages;
        this.getPage();
      },
      error: (err: HttpErrorResponse) => {
        this.status = err;
      }
    });
  }

}
