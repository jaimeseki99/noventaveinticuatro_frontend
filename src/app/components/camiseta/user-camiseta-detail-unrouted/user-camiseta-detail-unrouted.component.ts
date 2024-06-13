import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit, Optional } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ICamiseta, ICamisetaPage, ICarrito, ICompra, IUsuario, IValoracion, IValoracionPage } from 'src/app/model/model.interfaces';
import { CamisetaAjaxService } from 'src/app/service/camiseta.ajax.service.service';
import { CarritoAjaxService } from 'src/app/service/carrito.ajax.service.service';
import { CompraAjaxService } from 'src/app/service/compra.ajax.service.service';
import { SesionAjaxService } from 'src/app/service/sesion.ajax.service.service';
import { UserCamisetaValoracionFormUnroutedComponent } from '../user-camiseta-valoracion-form-unrouted/user-camiseta-valoracion-form-unrouted.component';
import { Subject, switchMap } from 'rxjs';
import { PaginatorState } from 'primeng/paginator';
import { ValoracionAjaxService } from 'src/app/service/valoracion.ajax.service.service';
import { ConfirmationUnroutedComponent } from '../../shared/confirmation-unrouted/confirmation-unrouted.component';
import { data } from 'autoprefixer';
import Swal from 'sweetalert2';

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
  nombre: string = '';
  nombreTocado: boolean = false;
  dorsal: number = 0;
  dorsalTocado: boolean = false;
  page: IValoracionPage | null = null;
  orderField: string = 'id';
  orderDirection: string = 'asc';
  paginatorState: PaginatorState = { first: 0, rows: 30, page: 0, pageCount: 0 };
  status: HttpErrorResponse | null = null;
  usuarioHaComprado: boolean = false;
  usuarioHaValorado: boolean = false;

  
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
    this.verificarCompraYValoracion()
    this.forceReload.subscribe({
      next: (v) => {
        if (v) {
          this.getValoraciones();
          this.verificarCompraYValoracion();
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

 
  verificarCompraYValoracion() {
    this.sesionAjaxService.getSessionUser()?.subscribe({
      next: (data: IUsuario) => {
        this.usuario = data;
  
        if (this.usuario) {
          this.camisetaAjaxService.getCamisetasCompradas(this.usuario.id, 100, 0, 'id', 'asc').subscribe({
            next: (page: ICamisetaPage) => {
              const camisetas = page.content;
              this.usuarioHaComprado = camisetas.some(camiseta => camiseta.id === this.camiseta.id);
            },
            error: (err: HttpErrorResponse) => {
              this.status = err;
            }
          });
  
          this.valoracionAjaxService.getValoracionByUsuarioAndCamiseta(this.usuario.id, this.camiseta.id).subscribe({
            next: (valoracion: IValoracion) => {
              this.usuarioHaValorado = !!valoracion;
            },
            error: (err: HttpErrorResponse) => {
              this.status = err;
            }
          });
        }
      },
      error: (err: HttpErrorResponse) => {
        this.status = err;
      }
    });
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
      this.carrito.nombre = this.nombre;
      this.carrito.dorsal = this.dorsal;

      this.carritoAjaxService.createCarrito(this.carrito).subscribe({
        next: (data: ICarrito) => {
          Swal.fire({
            position: "center",
            icon: "success",
            title: `Has añadido ${this.cantidadSeleccionada} camisetas al carrito`,
            showConfirmButton: false,
            timer: 1000,
            timerProgressBar: true,
            width: 700,
          });
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
      this.dialogService.open(ConfirmationUnroutedComponent, {
        header: 'Confirmación de compra',
        data: {
          message: `¿Quieres comprar ${this.cantidadSeleccionada} camiseta(s)?`
        },
        width: '400px',
        style: {
          'border-radius': '8px',
          'box-shadow': '0 4px 6px rgba(0, 0, 0, 0.1)'
        },
        baseZIndex: 10000
      }).onClose.subscribe((confirmed: boolean) => {
        if (confirmed) {
          this.compraAjaxService.createCompraCamiseta(this.camiseta.id, usuarioid, this.cantidadSeleccionada).subscribe({
            next: (compra: ICompra) => {
              Swal.fire({
                position: "center",
                icon: "success",
                title: `Has comprado ${this.cantidadSeleccionada} unidades de la camiseta ${this.camiseta.titulo}`,
                showConfirmButton: false,
                timer: 2000,
                width: 700,
              });
              this.router.navigate(['/usuario', 'compra', 'view', compra.id]);
            }
          });
        } else {
          this.matSnackBar.open('Compra cancelada', 'Aceptar', {duration: 3000});
        }
      });
    } else {
      this.matSnackBar.open('Debes estar logueado para comprar camisetas', 'Aceptar', { duration: 3000});
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
              this.verificarCompraYValoracion();
            }
          }
        })
      };
    }

    mostrarAdvertenciaCompra(): void {
      Swal.fire({
        position: 'center',
        icon: "warning",
        title: 'Advertencia',
        text: 'Para valorar esta camiseta primero has de comprarla',
        showConfirmButton: true,
        confirmButtonText: "Aceptar",
        timerProgressBar: true,
        timer: 2000,
        width: 700,
      });
    }

    mostrarAdvertenciaValoracion(): void {
      Swal.fire({
        position: 'center',
        icon: "warning",
        title: 'Advertencia',
        text: 'Ya has valorado esta camiseta, por lo que no puedes volver a valorarla',
        showConfirmButton: true,
        confirmButtonText: "Aceptar",
        timerProgressBar: true,
        timer: 2000,
        width: 700,
      })
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
              Swal.fire({
                position: "center",
                icon: "success",
                title: "Valoración borrada con éxito",
                showConfirmButton: false,
                timer: 1000,
                timerProgressBar: true,
                width: 700,
              });
              this.getValoraciones();
              this.verificarCompraYValoracion();
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


