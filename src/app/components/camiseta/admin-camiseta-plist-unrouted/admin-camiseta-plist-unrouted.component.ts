import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Component, Input, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { PaginatorState } from 'primeng/paginator';
import { ICamiseta, ICamisetaPage, IEquipo, ILiga, IModalidad } from 'src/app/model/model.interfaces';
import { HttpErrorResponse } from '@angular/common/http';
import { CamisetaAjaxService } from 'src/app/service/camiseta.ajax.service.service';
import { EquipoAjaxService } from 'src/app/service/equipo.ajax.service.service';
import { ModalidadAjaxService } from 'src/app/service/modalidad.ajax.service.service';
import { LigaAjaxService } from 'src/app/service/liga.ajax.service.service';
import { ConfirmEventType, ConfirmationService } from 'primeng/api';
import { AdminCamisetaDetailUnroutedComponent } from '../admin-camiseta-detail-unrouted/admin-camiseta-detail-unrouted.component';
import { ConfirmationUnroutedComponent } from '../../shared/confirmation-unrouted/confirmation-unrouted.component';
import { data } from 'autoprefixer';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-camiseta-plist-unrouted',
  templateUrl: './admin-camiseta-plist-unrouted.component.html',
  styleUrls: ['./admin-camiseta-plist-unrouted.component.css']
})
export class AdminCamisetaPlistUnroutedComponent implements OnInit {

  @Input() forceReload: Subject<boolean> = new Subject<boolean>();
  @Input() id_equipo: number = 0;
  @Input() id_modalidad: number = 0;
  @Input() id_liga: number = 0;
  filtro: string = '';

  page: ICamisetaPage | undefined;
  equipo: IEquipo | null = null;
  modalidad: IModalidad | null = null;
  liga: ILiga | null = null;
  orderField: string = "id";
  orderDirection: string = "asc";
  paginatorState: PaginatorState = { first: 0, rows: 12, page: 0, pageCount: 0};
  status: HttpErrorResponse | null = null;
  camisetaABorrar: ICamiseta | null = null;
  searchText: any;
  

  constructor(
    private camisetaAjaxService: CamisetaAjaxService,
    private equipoAjaxService: EquipoAjaxService,
    private modalidadAjaxService: ModalidadAjaxService,
    private ligaAjaxService: LigaAjaxService,
    public dialogService: DialogService,
    private confirmService: ConfirmationService,
    private matSnackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.getPage();
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
          this.getPage();
        }
      }
    })
  }

  getPage(): void {
    const rows = this.paginatorState.rows || 0;
    const page = this.paginatorState.page || 0;
    this.camisetaAjaxService.getPageCamisetas(rows, page ,this.orderField, this.orderDirection, this.id_equipo, this.id_modalidad, this.id_liga, this.filtro).subscribe({
      next: (data: ICamisetaPage) => {
        this.page = data;
        this.paginatorState.pageCount = data.totalPages;
      },
      error: (err: HttpErrorResponse) => {
        this.status = err;
      }
    })
  }

  onPageChange(event: PaginatorState) {
    this.paginatorState.rows = event.rows;
    this.paginatorState.page = event.page;
    this.getPage();
  }

  onInputChange(query: string): void {
    const rows = this.paginatorState.rows || 0;
    const page = this.paginatorState.page || 0;
    if (query.length > 2) {
      this.camisetaAjaxService.getPageCamisetas(rows, page, this.orderField, this.orderDirection, this.id_equipo, this.id_modalidad, this.id_liga, query).subscribe({
        next: (data: ICamisetaPage) => {
          this.page = data;
          this.paginatorState.pageCount = data.totalPages;
        },
        error: (err: HttpErrorResponse) => {
          this.status = err;
        }
      })
    } else {
      this.getPage();
    }
  }

  doOrder(field: string) {
   this.orderField = field;
   if (this.orderDirection == "asc") {
      this.orderDirection = "desc";
   } else {
      this.orderDirection = "asc";
   }
    this.getPage();
  }

  doView(camiseta: ICamiseta) {
    let ref: DynamicDialogRef | undefined;
    ref = this.dialogService.open(AdminCamisetaDetailUnroutedComponent, {
      data: {
        id: camiseta.id
      },
      header: "Detalle de camiseta",
      width: "70%",
      height: "80%",
      maximizable: false
    });
  }

  doRemove(camiseta: ICamiseta) {
    this.camisetaABorrar = camiseta;
    this.dialogService.open(ConfirmationUnroutedComponent, {
      header: 'Confirmación',
      data: {
        message: '¿Está seguro que desea eliminar la camiseta?'
      },
      width: '400px',
      style: {
        'border-radius': '8px',
        'box-shadow': '0 4px 6px rgba(0, 0, 0, 0.1)'
      },
      baseZIndex: 10000
    }).onClose.subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.camisetaAjaxService.deleteCamiseta(camiseta.id).subscribe({
          next: () => {
            Swal.fire({
              title: 'Camiseta eliminada',
              text: 'Se ha eliminado la camiseta',
              icon: 'success',
              timer: 1000,
              timerProgressBar: true
            });
            this.getPage();
          },
          error: (err: HttpErrorResponse) => {
            this.status = err;
            this.matSnackBar.open('Ha habido un error al eliminar la camiseta', 'Aceptar', { duration: 3000})
          }
        })
      }
    })
  }

  // doRemove(camiseta: ICamiseta) {
  //   this.camisetaABorrar = camiseta;
  //   this.confirmService.confirm({
  //     accept: () => {
  //       this.camisetaAjaxService.deleteCamiseta(camiseta.id).subscribe({
  //         next: () => {
  //           this.matSnackBar.open("Camiseta borrada correctamente", "Aceptar", {duration: 3000});
  //           this.getPage();
  //         },
  //         error: (err: HttpErrorResponse) => {
  //           this.status = err;
  //           this.matSnackBar.open("Error al borrar la camiseta", "Aceptar", {duration: 3000});
  //         }
  //       });
  //     },
  //     reject: (type: ConfirmEventType) => {
  //       this.matSnackBar.open("Operación cancelada", "Aceptar", {duration: 3000});
  //   }
  // });
  // }

  getEquipo(): void {
    this.equipoAjaxService.getEquipoById(this.id_equipo).subscribe({
      next: (data: IEquipo) => {
        this.equipo = data;
        this.getPage();
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
        this.getPage();
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
        this.getPage();
      },
      error: (err: HttpErrorResponse) => {
        this.status = err;
      }
    });
  }

  getCamisetasPorEquipo(): void{
    const psPage = this.paginatorState.page || 0;
    const rows = this.paginatorState.rows || 0;
    this.camisetaAjaxService.getCamisetasByEquipo(this.id_equipo, rows, psPage, this.orderField, this.orderDirection).subscribe({
      next: (data: ICamisetaPage) => {
        this.page = data;
        this.paginatorState.pageCount = data.totalPages;
      },
      error: (err: HttpErrorResponse) => {
        this.status = err;
      }
    })
  }

  getCamisetasPorModalidad(): void{
    const psPage = this.paginatorState.page || 0;
    const rows = this.paginatorState.rows || 0;
    this.camisetaAjaxService.getCamisetasByModalidad(this.id_modalidad, rows, psPage, this.orderField, this.orderDirection).subscribe({
      next: (data: ICamisetaPage) => {
        this.page = data;
        this.paginatorState.pageCount = data.totalPages;
      },
      error: (err: HttpErrorResponse) => {
        this.status = err;
      }
    })
  }

  getCamisetasPorLiga(): void{
    const psPage = this.paginatorState.page || 0;
    const rows = this.paginatorState.rows || 0;
    this.camisetaAjaxService.getCamisetasByLiga(this.id_liga, rows, psPage, this.orderField, this.orderDirection).subscribe({
      next: (data: ICamisetaPage) => {
        this.page = data;
        this.paginatorState.pageCount = data.totalPages;
      },
      error: (err: HttpErrorResponse) => {
        this.status = err;
      }
    })
  }

  searchCamisetas(searchText: string): void {
    const psPage = this.paginatorState.page || 0;
    const rows = this.paginatorState.rows || 0;
    this.camisetaAjaxService.searchCamisetas(searchText, psPage, rows, this.orderField, this.orderDirection).subscribe({
      next: (data: ICamisetaPage) => {
        this.page = data;
        this.paginatorState.pageCount = data.totalPages;
      },
      error: (err: HttpErrorResponse) => {
        this.status = err;
      }
    })
  }

}



