import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { DynamicDialogRef, DialogService } from 'primeng/dynamicdialog';
import { IValoracion, formOperation } from 'src/app/model/model.interfaces';
import { ValoracionAjaxService } from 'src/app/service/valoracion.ajax.service.service';
import { AdminUsuarioPlistUnroutedComponent } from '../../usuario/admin-usuario-plist-unrouted/admin-usuario-plist-unrouted.component';
import { AdminUsuarioSelectionUnroutedComponent } from '../../usuario/admin-usuario-selection-unrouted/admin-usuario-selection-unrouted.component';
import { AdminCamisetaSelectionUnroutedComponent } from '../../camiseta/admin-camiseta-selection-unrouted/admin-camiseta-selection-unrouted.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-valoracion-form-unrouted',
  templateUrl: './admin-valoracion-form-unrouted.component.html',
  styleUrls: ['./admin-valoracion-form-unrouted.component.css']
})
export class AdminValoracionFormUnroutedComponent implements OnInit {

  @Input() id: number = 1;
  @Input() operation: formOperation = 'NEW';

  valoracionForm!: FormGroup;
  valoracion: IValoracion = { fecha: new Date(Date.now()), usuario: {}, camiseta: {} } as IValoracion;
  status: HttpErrorResponse | null = null;
  dynamicDialogRef: DynamicDialogRef | undefined;
  
  constructor(
    private formBuilder: FormBuilder,
    private valoracionAjaxService: ValoracionAjaxService,
    private router: Router,
    private matSnackBar: MatSnackBar,
    public dialogService: DialogService
  ) { }

  initializeForm(valoracion: IValoracion) {
    this.valoracionForm = this.formBuilder.group({
      id: [valoracion.id],
      fecha: [new Date(valoracion.fecha)],
      comentario: [valoracion.comentario, [Validators.required, Validators.minLength(2), Validators.maxLength(255)]],
      usuario: this.formBuilder.group({
        id: [valoracion.usuario.id, [Validators.required]],
      }),
      camiseta: this.formBuilder.group({
        id: [valoracion.camiseta.id, [Validators.required]],
      })
      });
    }
    
  ngOnInit() {
    if (this.operation == 'EDIT') {
      this.valoracionAjaxService.getValoracionById(this.id).subscribe({
        next: (data: IValoracion) => {
          this.valoracion = data;
          this.initializeForm(this.valoracion);
        },
        error: (err: HttpErrorResponse) => {
          this.status = err;
          this.matSnackBar.open('Error al obtener la valoracion', 'Close', { duration: 3000 });
        }
      });
    } else {
      this.initializeForm(this.valoracion);
    }
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.valoracionForm.controls[controlName].hasError(errorName);
  }

  onSubmit() {
    if (this.valoracionForm.valid) {
      if (this.operation == 'NEW') {
        this.valoracionAjaxService.createValoracion(this.valoracionForm.value).subscribe({
          next: (data: IValoracion) => {
            this.valoracion = { "usuario": {}, "camiseta": {} } as IValoracion;
            this.initializeForm(this.valoracion);
            Swal.fire({
              title: 'Valoración creada con éxito',
              icon: 'success',
              timer: 1000,
              timerProgressBar: true            
            });
            this.router.navigate(['/admin', 'valoracion', 'plist']);
          }, 
          error: (err: HttpErrorResponse) => {
            this.status = err;
            this.matSnackBar.open('Error al crear la valoración', 'Aceptar', { duration: 3000 });
          }
        });
      } else {
        this.valoracionAjaxService.updateValoracion(this.valoracionForm.value).subscribe({
          next: (data: IValoracion) => {
            this.valoracion = data;
            this.initializeForm(this.valoracion);
            Swal.fire({
              title: 'Valoración actualizada con éxito',
              icon: 'success',
              timer: 1000,
              timerProgressBar: true            
            });
            this.router.navigate(['/admin', 'valoracion', 'plist']);
          },
          error: (err: HttpErrorResponse) => {
            this.status = err;
            this.matSnackBar.open('Error al actualizar la valoración', 'Aceptar', { duration: 3000 });
          }
        });
      }
    }
  }

  onShowUsuariosSelection() {
    this.dynamicDialogRef = this.dialogService.open(AdminUsuarioSelectionUnroutedComponent, {
      header: 'Selecciona un usuario',
      width: '70%',
      contentStyle: {"max-height": "350px", "overflow": "auto"},
      maximizable: true
    });
    this.dynamicDialogRef.onClose.subscribe((data: any) => {
      if (data) {
        this.valoracionForm.controls['usuario'].setValue({id: data.id});
      }
    });
  }

  onShowCamisetasSelection() {
    this.dynamicDialogRef = this.dialogService.open(AdminCamisetaSelectionUnroutedComponent, {
      header: 'Selecciona una camiseta',
      width: '70%',
      contentStyle: {"max-height": "350px", "overflow": "auto"},
      maximizable: true
    });
    this.dynamicDialogRef.onClose.subscribe((data: any) => {
      if (data) {
        this.valoracionForm.controls['camiseta'].setValue({id: data.id});
      }
    });
    }
    
  }

