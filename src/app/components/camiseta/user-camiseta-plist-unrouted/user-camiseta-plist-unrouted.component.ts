import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmationService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { Paginator, PaginatorState } from 'primeng/paginator';
import { Subject } from 'rxjs';
import { ICamiseta, ICamisetaPage, ICarrito, IEquipo, ILiga, IModalidad, IUsuario } from 'src/app/model/model.interfaces';
import { CamisetaAjaxService } from 'src/app/service/camiseta.ajax.service.service';
import { CarritoAjaxService } from 'src/app/service/carrito.ajax.service.service';
import { EquipoAjaxService } from 'src/app/service/equipo.ajax.service.service';
import { LigaAjaxService } from 'src/app/service/liga.ajax.service.service';
import { ModalidadAjaxService } from 'src/app/service/modalidad.ajax.service.service';
import { SesionAjaxService } from 'src/app/service/sesion.ajax.service.service';

@Component({
  selector: 'app-user-camiseta-plist-unrouted',
  templateUrl: './user-camiseta-plist-unrouted.component.html',
  styleUrls: ['./user-camiseta-plist-unrouted.component.css']
})
export class UserCamisetaPlistUnroutedComponent implements OnInit {

  @Input() forceReload: Subject<boolean> = new Subject<boolean>();
  @Input() id_equipo: number = 0;
  @Input() id_modalidad: number = 0;
  @Input() id_liga: number = 0;

  page: ICamisetaPage | undefined;
  equipo: IEquipo | null = null;
  modalidad: IModalidad | null = null;
  liga: ILiga | null = null;
  usuario: IUsuario | null = null;
  orderField: string = "id";
  orderDirection: string = "asc";
  paginatorState: PaginatorState = { first: 0, rows: 15, page: 0, pageCount: 0 };
  status: HttpErrorResponse | null = null;
  
  constructor(
    private camisetaAjaxService: CamisetaAjaxService,
    private sesionAjaxService: SesionAjaxService,
    private carritoAjaxService: CarritoAjaxService,
    private equipoAjaxService: EquipoAjaxService,
    private modalidadAjaxService: ModalidadAjaxService,
    private ligaAjaxService: LigaAjaxService,
    public dialogService: DialogService,
    private confirmService: ConfirmationService,
    private matSnackBar: MatSnackBar

  ) { }

  ngOnInit() {
    this.getCamisetas();
    if (this.id_equipo > 0) {
      this.getEquipo();
    }
    if (this.id_modalidad > 0) {
      this.getModalidad();
    }
    if (this.id_liga > 0) {
      this.getLiga();
    }
    this.forceReload.subscribe({
      next: (v) => {
        if (v) {
          this.getCamisetas();
        }
      }
    });
  }

  getCamisetas(): void {
    const rows = this.paginatorState.rows || 0;
    const page = this.paginatorState.page || 0;
    this.camisetaAjaxService.getPageCamisetas(rows, page, this.orderField, this.orderDirection, this.id_equipo, this.id_modalidad, this.id_liga).subscribe({
      next: (data: ICamisetaPage) => {
        this.page = data;
        this.paginatorState.pageCount = data.totalPages;
      },
      error: (err: HttpErrorResponse) => {
        this.status = err;
      }
    })
  }

  onPageChange(event: PaginatorState): void {
    this.paginatorState.rows = event.rows;
    this.paginatorState.page = event.page;
    this.getCamisetas();
  }

  getEquipo(): void {
    this.equipoAjaxService.getEquipoById(this.id_equipo).subscribe({
      next: (data: IEquipo) => {
        this.equipo = data;
        this.getCamisetas();
      },
      error: (err: HttpErrorResponse) => {
        this.status = err;
      }
    });
  }

  getModalidad(): void {
    this.modalidadAjaxService.getModalidadById(this.id_modalidad).subscribe({
      next: (data: IModalidad) => {
        this.modalidad = data;
        this.getCamisetas();
      },
      error: (err: HttpErrorResponse) => {
        this.status = err;
      }
    });
  }

  getLiga(): void {
    this.ligaAjaxService.getLigaById(this.id_liga).subscribe({
      next: (data: ILiga) => {
        this.liga = data;
        this.getCamisetas();
      },
      error: (err: HttpErrorResponse) => {
        this.status = err;
      }
    });
  }

  agregarAlCarrito(camiseta: ICamiseta): void {
   this.sesionAjaxService.getSessionUser()?.subscribe({
    next: (usuario: IUsuario) => {
      if (usuario) {
        const carrito: ICarrito = {
          id: 0,
          usuario: usuario,
          camiseta: camiseta,
          cantidad: 1,
        };

        this.carritoAjaxService.createCarrito(carrito).subscribe({
          next: () => {
            this.matSnackBar.open('Camiseta añadida al carrito', 'Aceptar', {duration: 3000});
          },
          error: (err: HttpErrorResponse) => {
            this.status = err;
            this.matSnackBar.open('Error al añadir la camiseta al carrito', 'Aceptar', {duration: 3000});
          }
        });
      } else {
        this.matSnackBar.open('Debes estar logueado para añadir camisetas al carrito', 'Aceptar', {duration: 3000});
      }
    },
    error: (err: HttpErrorResponse) => {
      this.status = err;
      this.matSnackBar.open('Error al obtener el usuario', 'Aceptar', {duration: 3000});
    }
   });
  }

  }







