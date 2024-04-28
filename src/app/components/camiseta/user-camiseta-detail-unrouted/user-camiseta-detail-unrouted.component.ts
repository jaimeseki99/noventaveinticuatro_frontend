import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit, Optional } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ICamiseta, ICarrito, IUsuario, IValoracion, IValoracionPage } from 'src/app/model/model.interfaces';
import { CamisetaAjaxService } from 'src/app/service/camiseta.ajax.service.service';
import { CarritoAjaxService } from 'src/app/service/carrito.ajax.service.service';
import { CompraAjaxService } from 'src/app/service/compra.ajax.service.service';
import { SesionAjaxService } from 'src/app/service/sesion.ajax.service.service';
import { UserCamisetaValoracionFormUnroutedComponent } from '../user-camiseta-valoracion-form-unrouted/user-camiseta-valoracion-form-unrouted.component';
import { Subject } from 'rxjs';
import { PaginatorState } from 'primeng/paginator';
import { ValoracionAjaxService } from 'src/app/service/valoracion.ajax.service.service';
import { ConfirmationUnroutedComponent } from '../../shared/confirmation-unrouted/confirmation-unrouted.component';

@Component({
  selector: 'app-user-camiseta-detail-unrouted',
  templateUrl: './user-camiseta-detail-unrouted.component.html',
  styleUrls: ['./user-camiseta-detail-unrouted.component.css']
})
export class UserCamisetaDetailUnroutedComponent implements OnInit {

  @Input() forceReload: Subject<boolean> = new Subject<boolean>();
  @Input() id: number = 0;
  camiseta: ICamiseta = {} as ICamiseta;
  usuario: IUsuario | null = null;
  carrito: ICarrito = { usuario: {}, camiseta: {}, cantidad: 0 } as ICarrito;
  cantidadSeleccionada: number = 1;
  page: IValoracionPage | null = null;
  orderField: string = 'id';
  orderDirection: string = 'asc';
  paginatorState: PaginatorState = { first: 0, rows: 30, page: 0, pageCount: 0 };
  status: HttpErrorResponse | null = null;
  
  constructor(
    private camisetaAjaxService: CamisetaAjaxService,
    private sesionAjaxService: SesionAjaxService,
    private carritoAjaxService: CarritoAjaxService,
    private compraAjaxService: CompraAjaxService,
    private valoracionAjaxService: ValoracionAjaxService,
    private router: Router,
    private matSnackBar: MatSnackBar,
    private confirmService: ConfirmationService,
    public dialogService: DialogService,
    @Optional() public ref: DynamicDialogRef,
    @Optional() public config: DynamicDialogConfig
  ) {
    if (config) {
      if (config.data) {
        this.id = config.data.id;
      }
    }
  }

  ngOnInit() {
    this.getCamiseta();
    this.getUsuario();
    this.getValoraciones();
    this.forceReload.subscribe({
      next: (v) => {
        if (v) {
          this.getValoraciones();
        }
      }
    });
  }

  getCamiseta() {
    this.camisetaAjaxService.getCamisetaById(this.id).subscribe({
      next: (data: ICamiseta) => {
        this.camiseta = data;
      },
      error: (err: HttpErrorResponse) => {
        this.status = err;
      }
    })
  }

  getUsuario() {
    this.sesionAjaxService.getSessionUser()?.subscribe({
      next: (data: IUsuario) => {
        this.usuario = data;
      },
      error: (err: HttpErrorResponse) => {
        this.status = err;
      }
    })
  }

  getValoraciones() {
    const rows: number = this.paginatorState.rows ?? 0;
    const page: number = this.paginatorState.page ?? 0;
    this.valoracionAjaxService.getValoracionPageByCamiseta(this.id, page, rows, this.orderField, this.orderDirection).subscribe({
      next: (data: IValoracionPage) => {
        this.page = data;
        this.paginatorState.pageCount = data.totalPages;
      },
      error: (err: HttpErrorResponse) => {
        this.status = err;
      }
    })
  }

  handleKeyDown(event: KeyboardEvent): void {
    if (event.key !== 'ArrowUp' && event.key !== 'ArrowDown') {
      event.preventDefault();
    }
  }

  agregarAlCarrito(): void {
    if (this.sesionAjaxService.isSessionActive()) {
      this.carrito.usuario = {username: this.sesionAjaxService.getUsername()} as IUsuario; 
      this.carrito.camiseta = {id: this.camiseta.id} as ICamiseta;
      this.carrito.cantidad = this.cantidadSeleccionada;
      this.carritoAjaxService.createCarrito(this.carrito).subscribe({
        next: (data: ICarrito) => {
          this.carrito = data;
          this.matSnackBar.open('Camiseta añadida al carrito', 'Aceptar', {duration: 3000});
          this.router.navigate(['/usuario', 'carrito', 'plist']);
        },
        error: (err: HttpErrorResponse) => {
          this.status = err;
          this.matSnackBar.open('Error al añadir la camiseta al carrito', 'Aceptar', {duration: 3000});
        }
      });
  }
  }

  comprarDirectamente(): void {
    if (this.usuario) {
      const usuarioid = this.usuario.id;
      this.confirmService.confirm({
        message: `¿Quieres comprar ${this.cantidadSeleccionada} camiseta(s)?`,
        accept: () => {
          this.compraAjaxService.createCompraCamiseta(this.camiseta.id, usuarioid, this.cantidadSeleccionada).subscribe({
            next: () => {
              this.matSnackBar.open(`Has comprado ${this.cantidadSeleccionada} camisetas(s)`, 'Aceptar', {duration: 3000});
              this.router.navigate(['/usuario', 'compra', 'plist', usuarioid]);
            }
          });
        },
        reject: () => {
          this.matSnackBar.open('Compra cancelada', 'Aceptar', {duration: 3000});
        }
      });
    } else {
      this.matSnackBar.open('Debes estar logueado para comprar camisetas', 'Aceptar', {duration: 3000});
    }
  }

  realizarValoracion(camiseta: ICamiseta): void {
    const id_camiseta = camiseta.id;
    if (this.sesionAjaxService.isSessionActive()) {
      this.ref = this.dialogService.open(UserCamisetaValoracionFormUnroutedComponent, {
        data: {
          id_usuario: this.usuario?.id,
          id_camiseta: id_camiseta
        },
        header: 'Valorar camiseta',
        width: '70%',
        contentStyle: {"max-height": "500px", "overflow": "auto"},
        maximizable: false
        });
        this.ref.onClose.subscribe({
          next: (v) => {
            if (v) {
              this.getValoraciones();
            }
          }
        })
      };
    }

    isUsuarioValoracion(valoracion: IValoracion): boolean {
      return this.usuario !== null && valoracion.usuario.id === this.usuario.id;
    }

    borrarValoracion(id_valoracion: number) {
      this.dialogService.open(ConfirmationUnroutedComponent, {
        header: 'Confirmación',
        data: {
          message: '¿Quieres borrar la valoración?'
        },
        width: '400px',
        baseZIndex: 10000,
        style: {
          "border-radius": "8px",
          "box-shadow": "0 4px 6px rgba(0, 0, 0, 0.1)"
        }
      }).onClose.subscribe((confirmed: boolean) => {
        if (confirmed) {
          this.valoracionAjaxService.deleteValoracion(id_valoracion).subscribe({
            next: () => {
              this.matSnackBar.open('Valoración borrada', 'Aceptar', {duration: 3000});
              this.getValoraciones();
            },
            error: (err: HttpErrorResponse) => {
              this.status = err;
              this.matSnackBar.open('Error al borrar la valoración', 'Aceptar', {duration: 3000});
            }
          });
        }
      });
    }

    // borrarValoracion(id_valoracion: number) {
    //   this.confirmService.confirm({
    //     message: '¿Quieres borrar la valoración?',
    //     accept: () => {
    //       this.valoracionAjaxService.deleteValoracion(id_valoracion).subscribe({
    //         next: () => {
    //           this.matSnackBar.open('Valoración borrada', 'Aceptar', {duration: 3000});
    //           this.getValoraciones();
    //         },
    //         error: (err: HttpErrorResponse) => {
    //           this.status = err;
    //           this.matSnackBar.open('Error al borrar la valoración', 'Aceptar', {duration: 3000});
    //         }
    //       });
    //     }
    //   });
    // }

  }


