import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmationService } from 'primeng/api';
import { Subject } from 'rxjs';
import { ModalidadAjaxService } from 'src/app/service/modalidad.ajax.service.service';

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
    this.confirmationService.confirm({
      target: $event.target as EventTarget,
      message: '¿Estás seguro de que quieres eliminar todas las modalidades?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.modalidadAjaxService.deleteAllModalidades().subscribe({
          next: () => {
            this.matSnackBar.open('Modalidades eliminadas', 'Aceptar', { duration: 3000 });
            this.forceReload.next(true);
          },
          error: (err: HttpErrorResponse) => {
            this.matSnackBar.open(`Error al eliminar las modalidades: ${err.message}`, 'Aceptar', { duration: 3000 });
          }
        });
      },
      reject: () => {
        this.matSnackBar.open('Operación cancelada', 'Aceptar', { duration: 3000 });
      }
    })
  }

}
