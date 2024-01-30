import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { Subject } from 'rxjs';
import { ValoracionAjaxService } from 'src/app/service/valoracion.ajax.service.service';
import { HttpErrorResponse } from '@angular/common/http';

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
    private confirmationService: ConfirmationService,
    private matSnackBar: MatSnackBar
  ) {
    this.id_usuario = parseInt(this.activatedRoute.snapshot.paramMap.get('id_usuario') ?? "0");
    this.id_camiseta = parseInt(this.activatedRoute.snapshot.paramMap.get('id_camiseta') ?? "0");
   }

  ngOnInit() {
  }

  doGenerateRandom(amount: number) {
    this.bLoading = true;
    this.valoracionAjaxService.generateValoraciones(amount).subscribe({
      next: (response: number) => {
        this.matSnackBar.open(`Se han generado ${response} valoraciones`, 'Aceptar', { duration: 3000 });
        this.bLoading = false;
      },
      error: (err: HttpErrorResponse) => {
        this.matSnackBar.open(`Se ha producido un error al generar valoraciones aleatorias: ${err.message}`, 'Aceptar', { duration: 3000 });
        this.bLoading = false;
      }
    })
  }

  doEmpty($event: Event) {
    this.confirmationService.confirm({
      target: $event.target as EventTarget,
      message: '¿Está seguro que desea eliminar todas las valoraciones?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.valoracionAjaxService.deleteAllValoraciones().subscribe({
          next: (response: number) => {
            this.matSnackBar.open(`Todas las valoraciones han sido eliminadas, ahora hay ${response} valoraciones`, 'Aceptar', { duration: 3000 });
            this.forceReload.next(true);
            this.bLoading = false;
          },
          error: (err: HttpErrorResponse) => {
            this.matSnackBar.open(`Se ha producido un error al eliminar todas las valoraciones: ${err.message}`, 'Aceptar', { duration: 3000 });
            this.bLoading = false;
          }
        })
      },
      reject: () => {
        this.matSnackBar.open("Se ha cancelado la eliminación de las valoraciones", "Aceptar", { duration: 3000 });
      }
    })
  }

}
