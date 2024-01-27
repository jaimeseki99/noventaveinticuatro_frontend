import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit, Optional } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ICarrito } from 'src/app/model/model.interfaces';
import { CarritoAjaxService } from 'src/app/service/carrito.ajax.service.service';

@Component({
  selector: 'app-admin-carrito-detail-unrouted',
  templateUrl: './admin-carrito-detail-unrouted.component.html',
  styleUrls: ['./admin-carrito-detail-unrouted.component.css']
})
export class AdminCarritoDetailUnroutedComponent implements OnInit {

  @Input() id: number = 1;

  carrito: ICarrito = {} as ICarrito;
  status: HttpErrorResponse | null = null;

  constructor(
    private carriotAjaxService: CarritoAjaxService,
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
    this.getOne();
  }

  getOne(): void {
    this.carriotAjaxService.getCarritoById(this.id).subscribe({
      next: (data: ICarrito) => {
        this.carrito = data;
      },
      error: (err: HttpErrorResponse) => {
        this.status = err;
      }
    });
  }

}
