import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { PaginatorState } from 'primeng/paginator';
import { Subject } from 'rxjs';
import { ICamiseta, IUsuario, IValoracion, IValoracionPage } from 'src/app/model/model.interfaces';
import { CamisetaAjaxService } from 'src/app/service/camiseta.ajax.service.service';
import { UsuarioAjaxService } from 'src/app/service/usuario.ajax.service.service';
import { ValoracionAjaxService } from 'src/app/service/valoracion.ajax.service.service';
import { AdminValoracionDetailUnroutedComponent } from '../admin-valoracion-detail-unrouted/admin-valoracion-detail-unrouted.component';

@Component({
  selector: 'app-admin-valoracion-plis-unrouted',
  templateUrl: './admin-valoracion-plis-unrouted.component.html',
  styleUrls: ['./admin-valoracion-plis-unrouted.component.css']
})
export class AdminValoracionPlisUnroutedComponent implements OnInit {

  @Input() forceReload: Subject<boolean> = new Subject<boolean>();
  @Input() id_usuario: number = 0;
  @Input() id_camiseta: number = 0;

  page: IValoracionPage | undefined;
  usuario: IUsuario | null = null;
  camiseta: ICamiseta | null = null;
  orderField: string = "id";
  orderDirection: string = "asc";
  paginatorState: PaginatorState = { first: 0, rows: 10, page: 0, pageCount: 0};
  status: HttpErrorResponse | null = null;
  valoracionABorrar: IValoracion | null = null;

  constructor(
    private usuarioAjaxService: UsuarioAjaxService,
    private camisetaAjaxService: CamisetaAjaxService,
    private valoracionAjaxService: ValoracionAjaxService,
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
    const page: number = this.paginatorState.page ?? 0;
    const rows: number = this.paginatorState.rows ?? 0;
    this.valoracionAjaxService.getValoracionPage(rows, page, this.orderField, this.orderDirection).subscribe({
      next: (page: IValoracionPage) => {
        this.page = page;
        this.paginatorState.pageCount = page.totalPages;
      },
      error: (response: HttpErrorResponse) => {
        this.status = response;
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
      this.orderDirection = this.orderDirection == "asc" ? "desc" : "asc";
      this.getPage();
    }

    doView(valoracion: IValoracion) {
      let ref: DynamicDialogRef | undefined;
      ref = this.dialogService.open(AdminValoracionDetailUnroutedComponent, {
        data: { id: valoracion.id },
        header: "Detalle de la valoracion",
        width: "70%",
        maximizable: false
      });
    }

    doRemove(valoracion: IValoracion) {
      this.valoracionABorrar = valoracion;
      this.confirmationService.confirm({
        accept: () => {
          this.valoracionAjaxService.deleteValoracion(valoracion.id).subscribe({
            next: () => {
              this.matSnackBar.open("Valoracion borrada", "Aceptar", { duration: 3000 });
              this.getPage();
            },
            error: (err: HttpErrorResponse) => {
              this.status = err;
              this.matSnackBar.open("Error al borrar la valoracion", "Aceptar", { duration: 3000 });
            }
          });
        },
        reject: () => {
          this.matSnackBar.open("No se ha borrado la valoracion", "Aceptar", { duration: 3000 });
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

  

