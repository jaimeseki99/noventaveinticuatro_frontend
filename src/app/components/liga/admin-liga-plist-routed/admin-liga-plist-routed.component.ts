import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { Subject } from 'rxjs';
import { LigaAjaxService } from 'src/app/service/liga.ajax.service.service';

@Component({
  selector: 'app-admin-liga-plist-routed',
  templateUrl: './admin-liga-plist-routed.component.html',
  styleUrls: ['./admin-liga-plist-routed.component.css']
})
export class AdminLigaPlistRoutedComponent implements OnInit {

  forceReload: Subject<boolean> = new Subject<boolean>();
  bLoading: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private ligaAjaxService: LigaAjaxService,
    private confirmationService: ConfirmationService,
    private matSnackBar: MatSnackBar
  ) { }

  ngOnInit() {
  }

  doGenerateLigas(amount: number) {
    this.bLoading = true;
    this.ligaAjaxService.generateLigas(amount).subscribe({
      next: (response: number) => {
        this.matSnackBar.open(`Se han generado ${response} ligas`, "Aceptar", { duration: 3000 });
        this.bLoading = false;
      },
      error: (err: HttpErrorResponse) => {
        this.matSnackBar.open(`Error al generar las ligas: ${err.message}`, "Aceptar", { duration: 3000 });
        this.bLoading = false;
      }
    })
  }

  doEmpty($event: Event) {
    this.confirmationService.confirm({
      target: $event.target as EventTarget,
      message: '¿Estás seguro de que quieres vaciar la tabla?',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sí',
      rejectLabel: 'No',
      accept: () => {
        this.ligaAjaxService.deleteAllLigas().subscribe({
          next: () => {
            this.matSnackBar.open('Ligas eliminadas', 'Aceptar', {duration: 3000});
            this.forceReload.next(true);
          },
          error: (err: HttpErrorResponse) => {
            this.matSnackBar.open(`Error al eliminar las ligas: ${err.message}`, 'Aceptar', {duration: 3000});
          }
        });
      },
      reject: () => {
        this.matSnackBar.open('Operación cancelada', 'Aceptar', {duration: 3000});
      }
    });
  }

}
