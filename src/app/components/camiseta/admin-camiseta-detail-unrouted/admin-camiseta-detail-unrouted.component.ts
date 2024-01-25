import { CamisetaAjaxService } from './../../../service/camiseta.ajax.service.service';
import { HttpErrorResponse } from '@angular/common/http';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Component, Input, OnInit, Optional } from '@angular/core';
import { ICamiseta } from 'src/app/model/model.interfaces';

@Component({
  selector: 'app-admin-camiseta-detail-unrouted',
  templateUrl: './admin-camiseta-detail-unrouted.component.html',
  styleUrls: ['./admin-camiseta-detail-unrouted.component.css']
})
export class AdminCamisetaDetailUnroutedComponent implements OnInit {

  @Input() id: number = 1;
  camiseta: ICamiseta = {} as ICamiseta;
  status: HttpErrorResponse | null = null;
  
  constructor(
    private camisetaAjaxService: CamisetaAjaxService,
    @Optional() public ref: DynamicDialogRef,
    @Optional() public config: DynamicDialogConfig
  ) {
    if (config) {
      if (config.data) {
        this.id = config.data.id;
      }
    }
   }

  ngOnInit(
  ) {
    this.getOne();
  }

  getOne() {
    this.camisetaAjaxService.getCamisetaById(this.id).subscribe({
      next: (data: ICamiseta) => {
        this.camiseta = data;
      },
      error: (error: HttpErrorResponse) => {
        this.status = error;
      }
    });
  }

}
