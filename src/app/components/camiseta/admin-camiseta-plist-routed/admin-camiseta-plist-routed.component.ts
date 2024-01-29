import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { Subject } from 'rxjs';
import { CamisetaAjaxService } from 'src/app/service/camiseta.ajax.service.service';

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
        this.matSnackBar.open('Se han generado ' + Response + ' camisetas', 'Aceptar', { duration: 3000 });
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
    this.confirmationService.confirm({
      target: $event.target as EventTarget,
      message: '¿Está seguro que desea vaciar el listado de camisetas?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.camisetaAjaxService.deleteAllCamisetas().subscribe({
          next: (response: number) => {
            this.matSnackBar.open('Se han eliminado ' + response + ' camisetas', 'Aceptar', { duration: 3000 });
            this.forceReload.next(true);
            this.bLoading = false;
          },
          error: (err: HttpErrorResponse) => {
            this.matSnackBar.open('Se ha producido un error al eliminar las camisetas', 'Aceptar', { duration: 3000 });
            this.bLoading = false;
          }
        })
      }
    })
  }

}
