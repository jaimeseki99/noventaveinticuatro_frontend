import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit, Optional } from '@angular/core';
import { ILiga } from 'src/app/model/model.interfaces';
import { LigaAjaxService } from 'src/app/service/liga.ajax.service.service';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-admin-liga-detail-unrouted',
  templateUrl: './admin-liga-detail-unrouted.component.html',
  styleUrls: ['./admin-liga-detail-unrouted.component.css']
})
export class AdminLigaDetailUnroutedComponent implements OnInit {

  @Input() id: number = 1;

  liga: ILiga = {} as ILiga;

  status: HttpErrorResponse | null = null;

  constructor(
    private ligaAjaxService: LigaAjaxService,
    @Optional() public ref: DynamicDialogRef,
    @Optional() public config: DynamicDialogConfig
  ) { 
    if (config.data) {  
      this.id = config.data.id;
    }
  }

  ngOnInit() {
    this.getOne();
  }

  getOne() {
    this.ligaAjaxService.getLigaById(this.id).subscribe({
      next: (data: ILiga) => {
        this.liga = data;
      },
      error: (error: HttpErrorResponse) => {
        this.status = error;
      }
    });
  }

}
