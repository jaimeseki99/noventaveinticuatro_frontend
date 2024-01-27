import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit, Optional } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { IValoracion } from 'src/app/model/model.interfaces';
import { ValoracionAjaxService } from 'src/app/service/valoracion.ajax.service.service';

@Component({
  selector: 'app-admin-valoracion-detail-unrouted',
  templateUrl: './admin-valoracion-detail-unrouted.component.html',
  styleUrls: ['./admin-valoracion-detail-unrouted.component.css']
})
export class AdminValoracionDetailUnroutedComponent implements OnInit {

  @Input() id: number = 1;

  valoracion: IValoracion = {} as IValoracion;
  status: HttpErrorResponse | null = null;

  constructor(
    private valoracionAjaxService: ValoracionAjaxService,
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
    this.valoracionAjaxService.getValoracionById(this.id).subscribe({
      next: (data: IValoracion) => {
        this.valoracion = data;
      },
      error: (err: HttpErrorResponse) => {
        this.status = err;
      }
    });
  }

}
