import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit, Optional } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ICompra } from 'src/app/model/model.interfaces';
import { CompraAjaxService } from 'src/app/service/compra.ajax.service.service';

@Component({
  selector: 'app-admin-compra-detail-unrouted',
  templateUrl: './admin-compra-detail-unrouted.component.html',
  styleUrls: ['./admin-compra-detail-unrouted.component.css']
})
export class AdminCompraDetailUnroutedComponent implements OnInit {

  @Input() id: number = 1;

  compra: ICompra = {} as ICompra;
  status: HttpErrorResponse | null = null;
  
  constructor(
    private compraAjaxService: CompraAjaxService,
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
    this.compraAjaxService.getCompraById(this.id).subscribe({
      next: (data: ICompra) => {
        this.compra = data;
      },
      error: (err: HttpErrorResponse) => {
        this.status = err;
      }
    });
  }

}
