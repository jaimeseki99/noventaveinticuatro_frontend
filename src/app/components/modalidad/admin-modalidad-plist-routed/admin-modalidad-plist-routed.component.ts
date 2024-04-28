import { throws } from 'assert';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmationService } from 'primeng/api';
import { Subject } from 'rxjs';
import { ModalidadAjaxService } from 'src/app/service/modalidad.ajax.service.service';
import { DialogService } from 'primeng/dynamicdialog';
import { ConfirmationUnroutedComponent } from '../../shared/confirmation-unrouted/confirmation-unrouted.component';

@Component({
  selector: 'app-admin-modalidad-plist-routed',
  templateUrl: './admin-modalidad-plist-routed.component.html',
  styleUrls: ['./admin-modalidad-plist-routed.component.css']
})
export class AdminModalidadPlistRoutedComponent implements OnInit {

  forceReload: Subject<boolean> = new Subject<boolean>();
  bLoading: boolean = false;

  constructor(
    private modalidadAjaxService: ModalidadAjaxService,
    private confirmationService: ConfirmationService,
    private dialogService: DialogService,
    private matSnackBar: MatSnackBar
  ) { }

  ngOnInit() {
  }

  doGenerateModalidades(amount: number) {
    this.bLoading = true;
    this.modalidadAjaxService.generateModalidades(amount).subscribe({
      next: (response: number) => {
        this.matSnackBar.open(`Se han generado ${response} modalidades`, "Aceptar", { duration: 3000 });
        this.bLoading = false;
      },
      error: (err: HttpErrorResponse) => {
        this.matSnackBar.open(`Error al generar las modalidades: ${err.message}`, "Aceptar", { duration: 3000 });
        this.bLoading = false;
      }
    })
  }

  doEmpty($event: Event) {
    this.dialogService.open(ConfirmationUnroutedComponent, {
      header: 'Confirmación',
      data: {
        message: '¿Estás seguro de eliminar todas las modalidades existentes en la base de datos?'
      },
      width: '400px',
      style: {
        'border-radius': '8px',
        'box-shadow': '0 4px 6px rgba(0, 0, 0, 0.1)'
      },
      baseZIndex: 10000
    }).onClose.subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.modalidadAjaxService.deleteAllModalidades().subscribe({
          next: () => {
            this.matSnackBar.open('Modalidades eliminadas', 'Aceptar', { duration: 3000 });
            this.forceReload.next(true);
          },
          error: (err: HttpErrorResponse) => {
            this.matSnackBar.open(`Error al eliminar las modalidades: ${err.message}`, 'Aceptar', { duration: 3000 });
          }
        });
      } else {
        this.matSnackBar.open('Operación cancelada', 'Aceptar', { duration: 3000 })
      }
    })
  }

  // doEmpty($event: Event) {
  //   this.confirmationService.confirm({
  //     target: $event.target as EventTarget,
  //     message: '¿Estás seguro de que quieres eliminar todas las modalidades?',
  //     icon: 'pi pi-exclamation-triangle',
  //     accept: () => {
  //       this.modalidadAjaxService.deleteAllModalidades().subscribe({
  //         next: () => {
  //           this.matSnackBar.open('Modalidades eliminadas', 'Aceptar', { duration: 3000 });
  //           this.forceReload.next(true);
  //         },
  //         error: (err: HttpErrorResponse) => {
  //           this.matSnackBar.open(`Error al eliminar las modalidades: ${err.message}`, 'Aceptar', { duration: 3000 });
  //         }
  //       });
  //     },
  //     reject: () => {
  //       this.matSnackBar.open('Operación cancelada', 'Aceptar', { duration: 3000 });
  //     }
  //   })
  // }

}
