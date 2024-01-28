import { ConfirmationService } from 'primeng/api';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { PaginatorState } from 'primeng/paginator';
import { Subject } from 'rxjs';
import { ICamiseta, ICarrito, ICarritoPage, IUsuario } from 'src/app/model/model.interfaces';
import { CamisetaAjaxService } from 'src/app/service/camiseta.ajax.service.service';
import { CarritoAjaxService } from 'src/app/service/carrito.ajax.service.service';
import { UsuarioAjaxService } from 'src/app/service/usuario.ajax.service.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdminCarritoDetailUnroutedComponent } from '../admin-carrito-detail-unrouted/admin-carrito-detail-unrouted.component';

@Component({
  selector: 'app-admin-carrito-plist-unrouted',
  templateUrl: './admin-carrito-plist-unrouted.component.html',
  styleUrls: ['./admin-carrito-plist-unrouted.component.css']
})
export class AdminCarritoPlistUnroutedComponent implements OnInit {

  @Input() forceReload: Subject<boolean> = new Subject<boolean>();
  @Input() id_usuario: number = 0;
  @Input() id_camiseta: number = 0;

  page: ICarritoPage | undefined;
  usuario: IUsuario | null = null;
  camiseta: ICamiseta | null = null;
  orderField: string = "id";
  orderDirection: string = "asc";
  paginatorState: PaginatorState = { first: 0, rows: 10, page: 0, pageCount: 0};
  status: HttpErrorResponse | null = null;
  carritoABorrar: ICarrito | null = null;
  
  constructor(
    private usuarioAjaxService: UsuarioAjaxService,
    private camisetaAjaxService: CamisetaAjaxService,
    private carritoAjaxService: CarritoAjaxService,
    public dialogService: DialogService,
    private confirmationService: ConfirmationService,
    private matSnackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.getPage();
    if (this.id_usuario > 0) {
      this.getUsuario();
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
    this.carritoAjaxService.getPageCarritos(this.paginatorState.rows ?? 0, this.paginatorState.page ?? 0, this.orderField, this.orderDirection).subscribe({
      next: (data: ICarritoPage) => {
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

  doView(carrito: ICarrito) {
    let ref: DynamicDialogRef | undefined;
    ref = this.dialogService.open(AdminCarritoDetailUnroutedComponent, {
      data: {
        id: carrito.id
      },
      header: "Detalle del carrito",
      width: "70%",
      height: "80%",
      maximizable: false
    });
  }

  doRemove(carrito: ICarrito) {
    this.carritoABorrar = carrito;
    this.confirmationService.confirm({
      accept: () => {
        this.carritoAjaxService.deleteCarrito(carrito.id).subscribe({
          next: () => {
            this.getPage();
            this.matSnackBar.open("Carrito eliminado correctamente", "Aceptar", {duration: 3000});
          },
          error: (err: HttpErrorResponse) => {
            this.status = err;
            this.matSnackBar.open("Error al eliminar el carrito", "Aceptar", {duration: 3000});
          }
        });
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
    })
  } 

  getCamiseta(): void {
    this.camisetaAjaxService.getCamisetaById(this.id_camiseta).subscribe({
      next: (data: ICamiseta) => {
        this.camiseta = data;
        this.getPage();
      },
      error: (err: HttpErrorResponse) => {
        this.status = err;
      }
    })
  }

}
