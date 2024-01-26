import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit, Optional } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { IDetalleCompra } from 'src/app/model/model.interfaces';
import { DetalleCompraAjaxService } from 'src/app/service/detallecompra.ajax.service.service';

@Component({
  selector: 'app-admin-detalle_compra-detail-unrouted',
  templateUrl: './admin-detalle_compra-detail-unrouted.component.html',
  styleUrls: ['./admin-detalle_compra-detail-unrouted.component.css']
})
export class AdminDetalle_compraDetailUnroutedComponent implements OnInit {

  @Input() id: number = 1;

  detalleCompra: IDetalleCompra = {} as IDetalleCompra;
  status: HttpErrorResponse | null = null;

  constructor(
    private detalleCompraAjaxService: DetalleCompraAjaxService,
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
    this.detalleCompraAjaxService.getDetalleCompraById(this.id).subscribe({
      next: (data: IDetalleCompra) => {
        this.detalleCompra = data;
      },
      error: (err: HttpErrorResponse) => {
        this.status = err;
      }
    });
  }

}
