import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit, Optional } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { IModalidad } from 'src/app/model/model.interfaces';
import { ModalidadAjaxService } from 'src/app/service/modalidad.ajax.service.service';

@Component({
  selector: 'app-admin-modalidad-detail-unrouted',
  templateUrl: './admin-modalidad-detail-unrouted.component.html',
  styleUrls: ['./admin-modalidad-detail-unrouted.component.css']
})
export class AdminModalidadDetailUnroutedComponent implements OnInit {

  @Input() id: number = 1;

  modalidad: IModalidad = {} as IModalidad;
  status: HttpErrorResponse | null = null;

  constructor(
    private modalidadAjaxService: ModalidadAjaxService,
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

  getOne() {
    this.modalidadAjaxService.getModalidadById(this.id).subscribe({
      next: (data: IModalidad) => {
        this.modalidad = data;
      },
      error: (error: HttpErrorResponse) => {
        this.status = error;
      }
    });
  }

}
