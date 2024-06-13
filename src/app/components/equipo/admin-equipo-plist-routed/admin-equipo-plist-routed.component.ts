import { DialogService } from 'primeng/dynamicdialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { Subject } from 'rxjs';
import { EquipoAjaxService } from 'src/app/service/equipo.ajax.service.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ConfirmationUnroutedComponent } from '../../shared/confirmation-unrouted/confirmation-unrouted.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-equipo-plist-routed',
  templateUrl: './admin-equipo-plist-routed.component.html',
  styleUrls: ['./admin-equipo-plist-routed.component.css']
})
export class AdminEquipoPlistRoutedComponent implements OnInit {

  forceReload: Subject<boolean> = new Subject<boolean>();
  bLoading: boolean = false;
  id_liga: number;

  constructor(
    private activatedRoute: ActivatedRoute,
    private equipoAjaxService: EquipoAjaxService,
    private confirmationService: ConfirmationService,
    private dialogService: DialogService,
    private matSnackBar: MatSnackBar
  ) {
    this.id_liga = parseInt(this.activatedRoute.snapshot.paramMap.get('idliga') ?? "0");
  }

  ngOnInit() {
  }

  doGenerateEquipos(amount: number) {
    this.bLoading = true;
    this.equipoAjaxService.generateEquipos(amount).subscribe({
      next: (response: number) => {
        Swal.fire({
          icon: 'success',
          title: `Se han generado ${response} equipos nuevos`,
          timer: 1000,
          timerProgressBar: true
        });
        this.bLoading = false;
      },
      error: (err: HttpErrorResponse) => {
        this.matSnackBar.open(`Error al generar equipos: ${err.message}`, 'Aceptar', {duration: 3000});
        this.bLoading = false;
      }
  });
}

doEmpty($event: Event) {
  this.dialogService.open(ConfirmationUnroutedComponent, {
    header: 'Confirmación',
    data: {
      message: '¿Estás seguro de que quieres eliminar todos los equipos de la lista?'
    },
    width: '400px',
    style: {
      'border-radius': '8px',
      'box-shadow': '0 4px 6px rgba(0, 0, 0, 0.1)'
    },
    baseZIndex: 10000
  }).onClose.subscribe((confirmed: boolean) => {
    if (confirmed) {
      this.equipoAjaxService.deleteAllEquipos().subscribe({
        next: () => {
          Swal.fire({
            icon: 'success',
            title: `Se han eliminado todos los equipos de la lista`,
            timer: 1000,
            timerProgressBar: true
          });
          this.forceReload.next(true);
        },
        error: (err: HttpErrorResponse) => {
          this.matSnackBar.open('Ha habido un error al eliminar los equipos de la lista', 'Aceptar', { duration: 3000 });
        }
      });
    }
  });
}

  // doEmpty($event: Event) {
  //   this.confirmationService.confirm({
  //     target: $event.target as EventTarget,
  //     message: '¿Estás seguro de que quieres vaciar la tabla?',
  //     icon: 'pi pi-exclamation-triangle',
  //     acceptLabel: 'Sí',
  //     rejectLabel: 'No',
  //     accept: () => {
  //       this.equipoAjaxService.deleteAllEquipos().subscribe({
  //         next: () => {
  //           this.matSnackBar.open('Equipos eliminados', 'Aceptar', {duration: 3000});
  //           this.forceReload.next(true);
  //         },
  //         error: (err: HttpErrorResponse) => {
  //           this.matSnackBar.open(`Error al eliminar los equipos: ${err.message}`, 'Aceptar', {duration: 3000});
  //         }
  //       });
  //     }
  //   });
  // }

}