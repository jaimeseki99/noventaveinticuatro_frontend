import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit, Optional } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ICamiseta, ICarrito, IUsuario } from 'src/app/model/model.interfaces';
import { CamisetaAjaxService } from 'src/app/service/camiseta.ajax.service.service';
import { CarritoAjaxService } from 'src/app/service/carrito.ajax.service.service';
import { CompraAjaxService } from 'src/app/service/compra.ajax.service.service';
import { SesionAjaxService } from 'src/app/service/sesion.ajax.service.service';

@Component({
  selector: 'app-user-camiseta-detail-unrouted',
  templateUrl: './user-camiseta-detail-unrouted.component.html',
  styleUrls: ['./user-camiseta-detail-unrouted.component.css']
})
export class UserCamisetaDetailUnroutedComponent implements OnInit {

  @Input() id: number = 0;
  camiseta: ICamiseta = {} as ICamiseta;
  usuario: IUsuario | null = null;
  carrito: ICarrito = { usuario: {}, camiseta: {}, cantidad: 0 } as ICarrito;
  cantidadSeleccionada: number = 1;
  status: HttpErrorResponse | null = null;
  

  constructor(
    private camisetaAjaxService: CamisetaAjaxService,
    private sesionAjaxService: SesionAjaxService,
    private carritoAjaxService: CarritoAjaxService,
    private compraAjaxService: CompraAjaxService,
    private router: Router,
    private matSnackBar: MatSnackBar,
    private confirmService: ConfirmationService,
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

  agregarAlCarrito(): void {
    if (this.sesionAjaxService.isSessionActive()) {
      this.carrito.usuario = {username: this.sesionAjaxService.getUsername()} as IUsuario; 
      this.carrito.camiseta = {id: this.camiseta.id} as ICamiseta;
      this.carrito.cantidad = this.cantidadSeleccionada;
      this.carritoAjaxService.createCarrito(this.carrito).subscribe({
        next: (data: ICarrito) => {
          this.carrito = data;
          this.matSnackBar.open('Camiseta añadida al carrito', 'Aceptar', {duration: 3000});
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
              this.router.navigate(['/usuario', 'compras', this.usuario?.id]);
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

}
