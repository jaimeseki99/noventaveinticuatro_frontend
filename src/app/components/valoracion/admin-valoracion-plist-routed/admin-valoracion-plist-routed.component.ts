import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { Subject } from 'rxjs';
import { ValoracionAjaxService } from 'src/app/service/valoracion.ajax.service.service';
import { HttpErrorResponse } from '@angular/common/http';
import { DialogService } from 'primeng/dynamicdialog';
import { ConfirmationUnroutedComponent } from '../../shared/confirmation-unrouted/confirmation-unrouted.component';
import Swal from 'sweetalert2';

@Component({
  providers: [ConfirmationService],
  selector: 'app-admin-valoracion-plist-routed',
  templateUrl: './admin-valoracion-plist-routed.component.html',
  styleUrls: ['./admin-valoracion-plist-routed.component.css']
})
export class AdminValoracionPlistRoutedComponent implements OnInit {

  forceReload: Subject<boolean> = new Subject<boolean>();
  id_usuario: number;
  id_camiseta: number;
  bLoading: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private valoracionAjaxService: ValoracionAjaxService,
    private dialogService: DialogService,
    private matSnackBar: MatSnackBar
  ) {
    this.id_usuario = parseInt(this.activatedRoute.snapshot.paramMap.get('idusuario') ?? "0");
    this.id_camiseta = parseInt(this.activatedRoute.snapshot.paramMap.get('idcamiseta') ?? "0");
   }

  ngOnInit() {
  }

  doGenerateRandom(amount: number) {
    this.bLoading = true;
    this.valoracionAjaxService.generateValoraciones(amount).subscribe({
      next: (response: number) => {
        Swal.fire({
          title: 'Valoraciones generadas con éxito',
          icon: 'success',
          timer: 1000,
          timerProgressBar: true
        });
        this.bLoading = false;
      },
      error: (err: HttpErrorResponse) => {
        this.matSnackBar.open(`Se ha producido un error al generar valoraciones aleatorias: ${err.message}`, 'Aceptar', { duration: 3000 });
        this.bLoading = false;
      }
    })
  }


  doEmpty($event: Event) {
    this.dialogService.open(ConfirmationUnroutedComponent, {
      header: 'Confirmación',
      data: {
        message: '¿Está seguro que desea eliminar todas las valoraciones?'
      },
      width: '400px',
      style: {
        'border-radius': '8px',
        'box-shadow': '0 4px 6px rgba(0, 0, 0, 0.1)'
      },
      baseZIndex: 10000
    }).onClose.subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.valoracionAjaxService.deleteAllValoraciones().subscribe({
          next: (response: number) => {
            Swal.fire({
              title: 'Valoraciones eliminadas con éxito',
              icon: 'success',
              timer: 1000,
              timerProgressBar: true
            });
            this.forceReload.next(true);
            this.bLoading = false;
          },
          error: (err: HttpErrorResponse) => {
            this.matSnackBar.open('Se ha producido un error al eliminar todas las valoraciones', 'Aceptar', { duration: 3000 });
            this.bLoading = false;
          }
        })
      }
    })
  }
  // doEmpty($event: Event) {
  //   this.confirmationService.confirm({
  //     target: $event.target as EventTarget,
  //     message: '¿Está seguro que desea eliminar todas las valoraciones?',
  //     icon: 'pi pi-exclamation-triangle',
  //     accept: () => {
  //       this.valoracionAjaxService.deleteAllValoraciones().subscribe({
  //         next: (response: number) => {
  //           this.matSnackBar.open(`Todas las valoraciones han sido eliminadas, ahora hay ${response} valoraciones`, 'Aceptar', { duration: 3000 });
  //           this.forceReload.next(true);
  //           this.bLoading = false;
  //         },
  //         error: (err: HttpErrorResponse) => {
  //           this.matSnackBar.open(`Se ha producido un error al eliminar todas las valoraciones: ${err.message}`, 'Aceptar', { duration: 3000 });
  //           this.bLoading = false;
  //         }
  //       })
  //     },
  //     reject: () => {
  //       this.matSnackBar.open("Se ha cancelado la eliminación de las valoraciones", "Aceptar", { duration: 3000 });
  //     }
  //   })
  // }
}
