import { ConfirmationService } from 'primeng/api';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit, Optional } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { PaginatorState } from 'primeng/paginator';
import { Subject } from 'rxjs';
import { ICamiseta, ICarrito, ICarritoPage, ICompra, IUsuario } from 'src/app/model/model.interfaces';
import { CarritoAjaxService } from 'src/app/service/carrito.ajax.service.service';
import { CompraAjaxService } from 'src/app/service/compra.ajax.service.service';
import { SesionAjaxService } from 'src/app/service/sesion.ajax.service.service';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ConfirmationUnroutedComponent } from '../../shared/confirmation-unrouted/confirmation-unrouted.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-carrito-plist-unrouted',
  templateUrl: './user-carrito-plist-unrouted.component.html',
  styleUrls: ['./user-carrito-plist-unrouted.component.css']
})
export class UserCarritoPlistUnroutedComponent implements OnInit {

  @Input() forceReload: Subject<boolean> = new Subject<boolean>();

  page: ICarritoPage | undefined;
  usuario: IUsuario | null = null;
  camiseta: ICamiseta | null = null;
  carrito: ICarrito = { usuario: {}, camiseta: {}, cantidad: 0 } as ICarrito;
  costeTotal: number = 0;
  orderField: string = 'id';
  orderDirection: string = 'asc';
  paginatorState: PaginatorState = { first: 0, rows: 10, page: 0, pageCount: 0 };
  status: HttpErrorResponse | null = null;
  precioIndividualMap: Map<number, number> = new Map<number, number>();

  constructor(
    private carritoAjaxService: CarritoAjaxService,
    private sesionAjaxService: SesionAjaxService,
    private compraAjaxService: CompraAjaxService,
    private router: Router,
    private matSnackBar: MatSnackBar,
    private confirmationService: ConfirmationService,
    public dialogService: DialogService,
    @Optional() public ref: DynamicDialogRef,
    @Optional() public config: DynamicDialogConfig
  ) { }

  ngOnInit() {
    this.getCarritos();
    this.forceReload.subscribe({
      next: (v) => {
        if (v) {
          this.getCarritos();
        }
      }
    })

  }

  getCarritos(): void {
    this.sesionAjaxService.getSessionUser()?.subscribe({
      next: (usuario: IUsuario) => {
        this.usuario = usuario;
        const rows: number = this.paginatorState.rows ?? 0;
        const page: number = this.paginatorState.page ?? 0;
        this.carritoAjaxService.getCarritosByUsuario(this.usuario.id, rows, page, this.orderField, this.orderDirection).subscribe({
          next: (page: ICarritoPage) => {
            this.page = page;
            this.paginatorState.pageCount = this.page.totalPages;
            this.page.content.forEach((carrito: ICarrito) => {
              this.getCosteCarrito(carrito);
            })
            this.updateCosteTotal();
          },
          error: (err: HttpErrorResponse) => {
            this.status = err;
            this.matSnackBar.open('Error al recuperar los carritos', 'Aceptar', { duration: 3000 })
          }
        });
      }
    })
  }

  getCosteCarrito(carrito: ICarrito): void {
    const precioCamiseta = carrito.camiseta.precio;
    const cantidad = carrito.cantidad;
    const descuento = carrito.camiseta.porcentajeDescuento || undefined;

    if (descuento != undefined) {
      const precioConDescuento = precioCamiseta - (precioCamiseta * (descuento / 100));
      const precioIndividual = precioConDescuento * cantidad;
      this.precioIndividualMap.set(carrito.id, precioIndividual);
    } else {
      const precioIndividual = precioCamiseta * cantidad;
      this.precioIndividualMap.set(carrito.id, precioIndividual);
    }
    
   
  }

  updateCantidad(carrito: ICarrito, nuevaCantidad: number): void {

    const stockDisponible = carrito.camiseta.stock;

    if (nuevaCantidad >= 0 && nuevaCantidad <= stockDisponible) {
    carrito.usuario = { id: carrito.usuario.id } as IUsuario;
    carrito.camiseta = { id: carrito.camiseta.id } as ICamiseta;
    carrito.cantidad = nuevaCantidad;
    if (nuevaCantidad == 0) {
      this.eliminarDelCarrito(carrito.id)
    } else {
      this.carritoAjaxService.updateCarrito(carrito).subscribe({
        next: (data: ICarrito) => {
          this.matSnackBar.open('Cantidad actualizada', 'Aceptar', { duration: 3000 });
          this.getCosteCarrito(data);
          this.updateCosteTotal();
          this.getCarritos();
        },
        error: (err: HttpErrorResponse) => {
          this.status = err;
          this.matSnackBar.open('Error al actualizar la cantidad', 'Aceptar', { duration: 3000 })
        }
      })
    }
  } else {
    this.matSnackBar.open('No hay suficiente stock en tienda', 'Aceptar', { duration: 3000 })
  }
}

  updateCosteTotal(): void {
    this.sesionAjaxService.getSessionUser()?.subscribe({
      next: (usuario: IUsuario) => {
        this.usuario = usuario;
        this.carritoAjaxService.getCosteCarritoByUsuario(this.usuario.id).subscribe({
          next: (coste: number) => {
            this.costeTotal = coste;
          },
          error: (err: HttpErrorResponse) => {
            this.status = err;
            this.matSnackBar.open('Error al recuperar el coste total', 'Aceptar', { duration: 3000 })
          }
        })
      }
    })
  }

  onPageChange(event: PaginatorState) {
    this.paginatorState.rows = event.rows;
    this.paginatorState.page = event.page;
    this.getCarritos();
  }

  comprarUnicoCarrito(id_carrito: number) {
    this.sesionAjaxService.getSessionUser()?.subscribe({
      next: (usuario: IUsuario) => {
        this.usuario = usuario;
        this.dialogService.open(ConfirmationUnroutedComponent, {
          header: 'Confirmación',
          data: {
            message: '¿Quieres únicamente comprar esta camiseta?'
          },
          width: '400px',
          baseZIndex: 10000
        }).onClose.subscribe((confirmed: boolean) => {
          if (confirmed) {
            this.compraAjaxService.createCompraUnicoCarrito(usuario.id, id_carrito).subscribe({
              next: (compra: ICompra) => {
                Swal.fire({
                  title: 'Compra de la camiseta realizada',
                  icon: 'success',
                  timer: 1500,
                  timerProgressBar: true
                });
                this.router.navigate(['/usuario', 'compra', 'view', compra.id]);
              },
              error: (err: HttpErrorResponse) => {
                this.status = err;
                this.matSnackBar.open('Ha habido un error al realizar la compra', 'Aceptar', { duration: 3000 });
              }
            });
          }
        });
      },
      error: (err: HttpErrorResponse) => {
        this.status = err;
        this.matSnackBar.open('Error al obtener los datos del usuario', 'Aceptar', { duration: 3000 });
      }
    })
  }

 
  // comprarUnicoCarrito(id_carrito: number) {
  //   this.sesionAjaxService.getSessionUser()?.subscribe({
  //     next: (usuario: IUsuario) => {
  //       this.usuario = usuario;
  //       this.confirmationService.confirm({
  //         message: '¿Desea comprar este carrito?',
  //         accept: () => {
  //           this.compraAjaxService.createCompraUnicoCarrito(usuario.id, id_carrito).subscribe({
  //             next: (compra: ICompra) => {
  //               this.matSnackBar.open('Compra realizada', 'Aceptar', { duration: 3000 });
  //               this.router.navigate(['/usuario', 'compra', 'view', compra.id]);
  //             },
  //             error: (err: HttpErrorResponse) => {
  //               this.status = err;
  //               this.matSnackBar.open('Error al realizar la compra', 'Aceptar', { duration: 3000 })
  //             },
  //           });
  //         },
  //         reject: () => {
  //           this.confirmationService.close();
  //         }
  //       });
  //     },

  //     error: (err: HttpErrorResponse) => {
  //       this.status = err;
  //       this.matSnackBar.open('Error al recuperar el usuario', 'Aceptar', { duration: 3000 })
  //     }
  //   });
  // }

  comprarTodosCarritos() {
    this.sesionAjaxService.getSessionUser()?.subscribe({
      next: (usuario: IUsuario) => {
        this.dialogService.open(ConfirmationUnroutedComponent, {
          header: 'Confirmación',
          data: {
            message: '¿Desea comprar todas las camisetas de tu carrito ahora?'
          },
          width: '400px',
          style: {
            'border-radius': '8px',
            'box-shadow': '0 4px 6px rgba(0, 0, 0, 0.1)'
          },
          baseZIndex: 10000
        }).onClose.subscribe((confirmed: boolean) => {
          if (confirmed) {
            this.compraAjaxService.createCompraTodosCarritos(usuario.id).subscribe({
              next: (compra: ICompra) => {
                Swal.fire({
                  title: 'Compra del carrito realizada con éxito',
                  icon: 'success',
                  timer: 1500,
                  timerProgressBar: true
                  
                })
                this.router.navigate(['/usuario', 'compra', 'view', compra.id]);
              },
              error: (err: HttpErrorResponse) => {
                this.status = err;
                this.matSnackBar.open('Ha habido un fallo al realizar la compra del carrito', 'Aceptar', { duration: 3000 })
              }
            });
          }
        });
      },
      error: (err: HttpErrorResponse) => {
        this.status = err;
        this.matSnackBar.open('Error al obtener los datos del usuario');
      }
    })
  }

  // comprarTodosCarritos() {
  //   this.sesionAjaxService.getSessionUser()?.subscribe({
  //     next: (usuario: IUsuario) => {
  //       this.usuario = usuario;
  //       this.confirmationService.confirm({
  //         message: '¿Desea comprar todos los carritos?',
  //         accept: () => {
  //           this.compraAjaxService.createCompraTodosCarritos(usuario.id).subscribe({
  //             next: (compra: ICompra) => {
  //               this.matSnackBar.open('Compra realizada', 'Aceptar', { duration: 3000 });
  //               this.router.navigate(['/usuario', 'compra', 'view', compra.id]);
  //             },
  //             error: (err: HttpErrorResponse) => {
  //               this.status = err;
  //               this.matSnackBar.open('Error al realizar la compra', 'Aceptar', { duration: 3000 })
  //             }
  //           });
  //         }
  //       });
  //     },
  //     error: (err: HttpErrorResponse) => {
  //       this.status = err;
  //       this.matSnackBar.open('Error al recuperar el usuario', 'Aceptar', { duration: 3000 })
  //     }
  //   });

  // }

  

  eliminarDelCarrito(id_carrito: number): void {
        this.carritoAjaxService.eliminarCamisetaCarrito(id_carrito).subscribe({
          next: () => {
            this.matSnackBar.open('Carrito eliminado', 'Aceptar', { duration: 3000 });
            this.getCarritos();
          },
          error: (err: HttpErrorResponse) => {
            this.status = err;
            this.matSnackBar.open('Error al eliminar el carrito', 'Aceptar', { duration: 3000 })
          }
        });
      
  }

  eliminarTodosCarritos(id_usuario: number): void {
    this.dialogService.open(ConfirmationUnroutedComponent, {
      header: 'Confirmación',
      data: {
        message: '¿Está seguro de vaciar el carrito?'
      },
      width: '400px',
      style: {
        'border-radius': '8px',
        'box-shadow': '0 4px 6px rgba(0, 0, 0, 0.1)'
      },
      baseZIndex: 10000
    }).onClose.subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.carritoAjaxService.eliminarTodasCamisetasCarrito(id_usuario).subscribe({
          next: () => {
            this.matSnackBar.open('Carrito vaciado con éxito', 'Aceptar', { duration: 3000 });
            this.getCarritos();
          },
          error: (err: HttpErrorResponse) => {
            this.matSnackBar.open('Ha habido un error al vaciar el carrito', 'Aceptar', { duration: 3000 });
          }
        });
      }
    });
  }

  // eliminarTodosCarritos(id_usuario: number): void {
  //   this.confirmationService.confirm({
  //     message: '¿Desea eliminar todos los carritos?',
  //     accept: () => {
  //       this.carritoAjaxService.deleteCarritoByUsuario(id_usuario).subscribe({
  //         next: () => {
  //           this.matSnackBar.open('Carritos eliminados', 'Aceptar', { duration: 3000 });
  //           this.getCarritos();
  //         },
  //         error: (err: HttpErrorResponse) => {
  //           this.status = err;
  //           this.matSnackBar.open('Error al eliminar los carritos', 'Aceptar', { duration: 3000 })
  //         }
  //       });
  //     }
  //   });
  // }
}
