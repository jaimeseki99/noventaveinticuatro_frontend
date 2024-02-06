import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, Optional, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ICompra } from 'src/app/model/model.interfaces';
import { CompraAjaxService } from 'src/app/service/compra.ajax.service.service';

@Component({
  selector: 'app-user-compra-detail-unrouted',
  templateUrl: './user-compra-detail-unrouted.component.html',
  styleUrls: ['./user-compra-detail-unrouted.component.css']
})
export class UserCompraDetailUnroutedComponent implements OnInit {

  @Input() id: number = 0;
  compra: ICompra = {} as ICompra;
  status: HttpErrorResponse | null = null;


  constructor(
    private compraAjaxService: CompraAjaxService,
    private router: Router,
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
    this.getCompra();
    this.getDetailsArray();
  }

  getCompra() {
    this.compraAjaxService.getCompraById(this.id).subscribe({
      next: (data: ICompra) => {
        this.compra = data;
      },
      error: (err: HttpErrorResponse) => {
        this.status = err;
      }
    })
  }

  getDetailsArray(): number[] {
    return Array.from({ length: this.compra.detalleCompras }, (_, index) => index);
  }

}
