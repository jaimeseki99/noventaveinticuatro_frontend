import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { Paginator, PaginatorState } from 'primeng/paginator';
import { Subject, switchMap } from 'rxjs';
import { ICamiseta, ICamisetaPage, ICarrito, IEquipo, ILiga, IModalidad, IUsuario } from 'src/app/model/model.interfaces';
import { CamisetaAjaxService } from 'src/app/service/camiseta.ajax.service.service';
import { CarritoAjaxService } from 'src/app/service/carrito.ajax.service.service';
import { CompraAjaxService } from 'src/app/service/compra.ajax.service.service';
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
  carrito: ICarrito = { usuario: {}, camiseta: {}, cantidad: 0 } as ICarrito;
  orderField: string = "id";
  orderDirection: string = "asc";
  paginatorState: PaginatorState = { first: 0, rows: 15, page: 0, pageCount: 0 };
  status: HttpErrorResponse | null = null;
  
  constructor(
    private camisetaAjaxService: CamisetaAjaxService,
    private sesionAjaxService: SesionAjaxService,
    private carritoAjaxService: CarritoAjaxService,
    private compraAjaxService: CompraAjaxService,
    private equipoAjaxService: EquipoAjaxService,
    private modalidadAjaxService: ModalidadAjaxService,
    private ligaAjaxService: LigaAjaxService,
    public dialogService: DialogService,
    private confirmService: ConfirmationService,
    private router: Router,
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

        const camisetaIds = this.page.content.map(camiseta => camiseta.id);
        const precios: { [id: number]: number } = {};

        camisetaIds.forEach(id => {
          this.camisetaAjaxService.getPrecioTotalCamiseta(id).subscribe({
            next: (precio: number) => {
              precios[id] = precio;

              if (Object.keys(precios).length === camisetaIds.length) {
                this.page?.content.forEach(camiseta => {
                  camiseta.precio = precios[camiseta.id];
                });
              }
            },
            error: (err: HttpErrorResponse) => {
              this.status = err;
            }
          });
        });
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

      

  // agregarAlCarrito(camiseta: ICamiseta): void {
  //   this.sesionAjaxService.getSessionUser()?.pipe(
  //     switchMap((usuario: IUsuario) => {
  //       this.carrito.usuario = { id: usuario.id } as IUsuario;
  //       this.carrito.camiseta = { id: camiseta.id } as ICamiseta;
  //       this.carrito.cantidad = 1;
  //       return this.carritoAjaxService.createCarrito(this.carrito);
  //     })
  //   ).subscribe({
  //     next: (data: ICarrito) => {
  //       this.carrito = data;
  //       this.matSnackBar.open('Camiseta añadida al carrito', 'Aceptar', { duration: 3000 });
  //     },
  //     error: (err: HttpErrorResponse) => {
  //       this.status = err;
  //       this.matSnackBar.open('Error al añadir la camiseta al carrito', 'Aceptar', { duration: 3000 });
  //   }
  // });
  // }

  // agregarAlCarrito(camiseta: ICamiseta): void {
  //         this.sesionAjaxService.getSessionUser()?.subscribe({
  //           next: (usuario: IUsuario) => {
  //             if (usuario) {
  //               this.carrito.usuario = {id: usuario.id} as IUsuario;
  //               this.carrito.camiseta = {id: camiseta.id} as ICamiseta;
  //               this.carrito.cantidad = 1;
  //               this.carritoAjaxService.createCarrito(this.carrito).subscribe({
  //                 next: (data: ICarrito) => {
  //                   this.carrito = data;
  //                   this.matSnackBar.open('Camiseta añadida al carrito', 'Aceptar', {duration: 3000});
  //                 },
  //                 error: (err: HttpErrorResponse) => {
  //                   this.status = err;
  //                   this.matSnackBar.open('Error al añadir la camiseta al carrito', 'Aceptar', {duration: 3000});
  //                 }
  //               });
  //             } else {
  //               this.matSnackBar.open('Debes estar logueado para añadir camisetas al carrito', 'Aceptar', {duration: 3000});
  //             }
  //           },
  //           error: (err: HttpErrorResponse) => {
  //             this.status = err;
  //             this.matSnackBar.open('Error al obtener el usuario', 'Aceptar', {duration: 3000});
  //           }
  //         })
      
  //   }
  

  agregarAlCarrito(camiseta: ICamiseta): void {
    if (this.sesionAjaxService.isSessionActive()) {
        this.carrito.usuario = {username: this.sesionAjaxService.getUsername()} as IUsuario; 
        this.carrito.camiseta = {id: camiseta.id} as ICamiseta;
        this.carrito.cantidad = 1;
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

  comprarDirectamente(camiseta: ICamiseta): void {
    this.sesionAjaxService.getSessionUser()?.subscribe({
      next: (usuario: IUsuario) => {
        if (usuario) {
          this.confirmService.confirm({
            message: '¿Quieres comprar la camiseta?',
            accept: () => {
              const cantidad = 1;
              this.compraAjaxService.createCompraCamiseta(camiseta.id, usuario.id, cantidad).subscribe({
                next: () => {
                  this.matSnackBar.open('Camiseta comprada', 'Aceptar', {duration: 3000});
                  this.router.navigate(['/usuario', 'compra', 'plist', usuario.id]);
                  
                },
                error: (err: HttpErrorResponse) => {
                  this.status = err;
                  this.matSnackBar.open('Error al comprar la camiseta', 'Aceptar', {duration: 3000});
                }
              });
              },
            reject: () => {
              this.matSnackBar.open('Compra cancelada', 'Aceptar', {duration: 3000});
            }
            })
        } else {
          this.matSnackBar.open('Debes estar logueado para comprar camisetas', 'Aceptar', {duration: 3000});
        };
        },
      error: (err: HttpErrorResponse) => {
        this.status = err;
        this.matSnackBar.open('Error al obtener el usuario', 'Aceptar', {duration: 3000});
      }
      });
    }
        
  }
 







