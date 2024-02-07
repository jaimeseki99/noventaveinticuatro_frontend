import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { IValoracion, formOperation } from 'src/app/model/model.interfaces';
import { SesionAjaxService } from 'src/app/service/sesion.ajax.service.service';
import { ValoracionAjaxService } from 'src/app/service/valoracion.ajax.service.service';

@Component({
  selector: 'app-user-valoracion-form-unrouted',
  templateUrl: './user-valoracion-form-unrouted.component.html',
  styleUrls: ['./user-valoracion-form-unrouted.component.css']
})
export class UserValoracionFormUnroutedComponent implements OnInit {

  @Input() id: number = 1;
  @Input() id_camiseta: number = 0;
  @Input() operation: formOperation = 'NEW';

  valoracionForm!: FormGroup;
  valoracion: IValoracion = { fecha: new Date(Date.now()), usuario: {}, camiseta: {}} as IValoracion;
  status: HttpErrorResponse | null = null;
  dynamicDialogRef: DynamicDialogRef | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private valoracionAjaxService: ValoracionAjaxService,
    private router: Router,
    private matSnackBar: MatSnackBar,
    private sesionAjaxService: SesionAjaxService
    
  ) { }

  ngOnInit() {
    this.initializeForm(this.valoracion);
    if (this.operation == 'EDIT') {
      this.valoracionAjaxService.getValoracionById(this.id).subscribe({
        next: (data: IValoracion) => {
          this.valoracion = data;
          this.initializeForm(this.valoracion);
        },
        error: (err: HttpErrorResponse) => {
          this.status = err;
          this.matSnackBar.open('Error al recuperar la valoración', 'Aceptar', { duration: 3000 });
        }
      })
    }
  }

  initializeForm(valoracion: IValoracion) {
    this.valoracionForm = this.formBuilder.group({
      id: [valoracion.id],
      fecha: [new Date(valoracion.fecha)],
      comentario: [valoracion.comentario, [Validators.required, Validators.minLength(5), Validators.maxLength(255)]],
      usuario: [this.sesionAjaxService.getUsername()],
      camiseta: [this.id_camiseta]
    });
  }

  onSubmit() {
    if (this.valoracionForm.valid) {
      if (this.operation == 'NEW') {
        this.valoracionAjaxService.createValoracion(this.valoracionForm.value).subscribe({
          next: (data: IValoracion) => {
            this.matSnackBar.open('Valoración creada', 'Aceptar', { duration: 3000 });
            this.router.navigate(['/usuario', 'camiseta', 'view', this.id_camiseta]);
          },
          error: (err: HttpErrorResponse) => {
            this.status = err;
            this.matSnackBar.open('Error al crear la valoración', 'Aceptar', { duration: 3000 });
          }
        });
      } else {
        this.valoracionAjaxService.updateValoracion(this.valoracionForm.value).subscribe({
          next: (data: IValoracion) => {
            this.matSnackBar.open('Valoración actualizada', 'Aceptar', { duration: 3000 });
            this.router.navigate(['/usuario', 'camiseta', 'view', this.id_camiseta]);
          },
          error: (err: HttpErrorResponse) => {
            this.status = err;
            this.matSnackBar.open('Error al actualizar la valoración', 'Aceptar', { duration: 3000 });
          }
        });
      }
    }
  }

}
