import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { Subject } from 'rxjs';
import { EquipoAjaxService } from 'src/app/service/equipo.ajax.service.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-admin-equipo-plist-routed',
  templateUrl: './admin-equipo-plist-routed.component.html',
  styleUrls: ['./admin-equipo-plist-routed.component.css']
})
export class AdminEquipoPlistRoutedComponent implements OnInit {

  forceReload: Subject<boolean> = new Subject<boolean>();
  bLoading: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private equipoAjaxService: EquipoAjaxService,
    private confirmationService: ConfirmationService,
    private matSnackBar: MatSnackBar
  ) {
   }

  ngOnInit() {
  }

  doGenerateEquipos(amount: number) {
    this.bLoading = true;
    this.equipoAjaxService.generateEquipos(amount).subscribe({
      next: (response: number) => {
        this.matSnackBar.open(`Generados ${response} equipos`, 'Aceptar', {duration: 3000});
        this.bLoading = false;
      },
      error: (err: HttpErrorResponse) => {
        this.matSnackBar.open(`Error al generar equipos: ${err.message}`, 'Aceptar', {duration: 3000});
        this.bLoading = false;
      }
  });
}

  doEmpty($event: Event) {
    this.confirmationService.confirm({
      target: $event.target as EventTarget,
      message: '¿Estás seguro de que quieres vaciar la tabla?',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sí',
      rejectLabel: 'No',
      accept: () => {
        this.equipoAjaxService.deleteAllEquipos().subscribe({
          next: () => {
            this.matSnackBar.open('Equipos eliminados', 'Aceptar', {duration: 3000});
            this.forceReload.next(true);
          },
          error: (err: HttpErrorResponse) => {
            this.matSnackBar.open(`Error al eliminar los equipos: ${err.message}`, 'Aceptar', {duration: 3000});
          }
        });
      }
    });
  }

}