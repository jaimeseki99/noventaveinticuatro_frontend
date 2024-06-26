import { ConfirmationUnroutedComponent } from './../../shared/confirmation-unrouted/confirmation-unrouted.component';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { Subject } from 'rxjs';
import { CamisetaAjaxService } from 'src/app/service/camiseta.ajax.service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-camiseta-plist-routed',
  templateUrl: './admin-camiseta-plist-routed.component.html',
  styleUrls: ['./admin-camiseta-plist-routed.component.css']
})
export class AdminCamisetaPlistRoutedComponent implements OnInit {

  forceReload: Subject<boolean> = new Subject<boolean>();
  id_equipo: number;
  id_modalidad: number;
  id_liga: number;
  bLoading: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private camisetaAjaxService: CamisetaAjaxService,
    private confirmationService: ConfirmationService,
    private dialogService: DialogService,
    private matSnackBar: MatSnackBar
  ) { 
    this.id_equipo = parseInt(this.activatedRoute.snapshot.paramMap.get('idequipo') ?? "0");
    this.id_modalidad = parseInt(this.activatedRoute.snapshot.paramMap.get('idmodalidad') ?? "0");
    this.id_liga = parseInt(this.activatedRoute.snapshot.paramMap.get('idliga') ?? "0");
  }


  ngOnInit() {
  }

  doGenerateCamisetas(amount: number) {
    this.bLoading = true;
    this.camisetaAjaxService.generateCamisetas(amount).subscribe({
      next: (Response: number) => {
        Swal.fire({
          title: 'Camisetas generadas',
          text: 'Se han generado ' + Response + ' camisetas',
          icon: 'success',
          timer: 1000,
          timerProgressBar: true
        });
        this.bLoading = false;
      },
      error: (err: HttpErrorResponse) => {
        this.matSnackBar.open('Se ha producido un error al generar las camisetas', 'Aceptar', { duration: 3000 });
        this.bLoading = false;
      }
    }
    );
  }

  doEmpty($event: Event) {
    this.dialogService.open(ConfirmationUnroutedComponent, {
      header: 'Confirmación',
      data: {
        message: '¿Está seguro que desea vaciar el listado de camisetas?'
      },
      width: '400px',
      style: {
        'border-radius': '8px',
        'box-shadow': '0 4px 6px rgba(0, 0, 0, 0.1)'
      },
      baseZIndex: 10000
    }).onClose.subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.camisetaAjaxService.deleteAllCamisetas().subscribe({
          next: (response: number) => {
            Swal.fire({
              title: 'Camisetas eliminadas',
              icon: 'success',
              timer: 1000,
              timerProgressBar: true
            })
            this.forceReload.next(true);
            this.bLoading = false;
          },
          error: (err: HttpErrorResponse) => {
            this.matSnackBar.open('Se ha producido un error al eliminar las camisetas', 'Aceptar', { duration: 3000 });
            this.bLoading = false;
          }
        });
      }
    });
  }

  // doEmpty($event: Event) {
  //   this.confirmationService.confirm({
  //     target: $event.target as EventTarget,
  //     message: '¿Está seguro que desea vaciar el listado de camisetas?',
  //     icon: 'pi pi-exclamation-triangle',
  //     accept: () => {
  //       this.camisetaAjaxService.deleteAllCamisetas().subscribe({
  //         next: (response: number) => {
  //           this.matSnackBar.open('Se han eliminado ' + response + ' camisetas', 'Aceptar', { duration: 3000 });
  //           this.forceReload.next(true);
  //           this.bLoading = false;
  //         },
  //         error: (err: HttpErrorResponse) => {
  //           this.matSnackBar.open('Se ha producido un error al eliminar las camisetas', 'Aceptar', { duration: 3000 });
  //           this.bLoading = false;
  //         }
  //       })
  //     }
  //   })
  // }

}
