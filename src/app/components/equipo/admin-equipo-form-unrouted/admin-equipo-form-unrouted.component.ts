import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IEquipo, ILiga, formOperation } from 'src/app/model/model.interfaces';
import { EquipoAjaxService } from 'src/app/service/equipo.ajax.service.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdminLigaSelectionUnroutedComponent } from '../../liga/admin-liga-selection-unrouted/admin-liga-selection-unrouted.component';
import { MediaService } from 'src/app/service/media.service';

@Component({
  selector: 'app-admin-equipo-form-unrouted',
  templateUrl: './admin-equipo-form-unrouted.component.html',
  styleUrls: ['./admin-equipo-form-unrouted.component.css']
})
export class AdminEquipoFormUnroutedComponent implements OnInit {

  @Input() id: number = 1;
  @Input() operation: formOperation = 'NEW';

  equipoForm!: FormGroup;
  equipo: IEquipo = { imagen: '', liga: {} } as IEquipo;
  status: HttpErrorResponse | null = null;
  dynamicDialogRef: DynamicDialogRef | undefined;


  constructor(
    private formBuilder: FormBuilder,
    private equipoAjaxService: EquipoAjaxService,
    private mediaService: MediaService,
    private router: Router,
    private matSnackBar: MatSnackBar,
    private dialogService: DialogService
  ) {
    this.initializeForm(this.equipo);
   }

   initializeForm(equipo: IEquipo) {
    this.equipoForm = this.formBuilder.group({
      id: [equipo.id],
      nombre: [equipo.nombre, [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      imagen: [equipo.imagen],
      liga: this.formBuilder.group({
        id: [equipo.liga.id, [Validators.required]],
      }),
    });
   }

  ngOnInit() {
    if (this.operation == 'EDIT') {
      this.equipoAjaxService.getEquipoById(this.id).subscribe({
        next: (data: IEquipo) => {
          this.equipo = data;
          this.initializeForm(this.equipo);
        },
        error: (err: HttpErrorResponse) => {
          this.status = err;
          this.matSnackBar.open('Error al obtener el registro', 'Aceptar', {duration: 3000});
        }
      });
    } else {
      this.initializeForm(this.equipo);
    }
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);

      this.mediaService.uploadFile(formData).subscribe({
        next: (response) => {
          this.equipo.imagen = response.url;
          this.equipoForm.controls['imagen'].patchValue(response.url);
        },
        error: (error) => {
          this.matSnackBar.open('Error al subir el fichero', 'Aceptar', {duration: 3000});
        }
      });
    }
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.equipoForm.controls[controlName].hasError(errorName);
  }

  onSubmit() {
    if (this.equipoForm.valid) {
      if (this.operation == 'NEW') {
        this.equipoAjaxService.createEquipo(this.equipoForm.value).subscribe({
          next: (data: IEquipo) => {
            this.equipo = { "liga": {} } as IEquipo;
            this.initializeForm(this.equipo);
            this.matSnackBar.open('Registro creado', 'Aceptar', {duration: 3000});
            this.router.navigate(['/admin', 'equipo', 'plist']);
          },
          error: (err: HttpErrorResponse) => {
            this.status = err;
            this.matSnackBar.open('Error al crear el registro', 'Aceptar', {duration: 3000});
          }
        });
        } else {
          this.equipoAjaxService.updateEquipo(this.equipoForm.value).subscribe({
            next: (data: IEquipo) => {
              this.equipo = data;
              this.initializeForm(this.equipo);
              this.matSnackBar.open('Registro actualizado', 'Aceptar', {duration: 3000});
              this.router.navigate(['/admin', 'equipo', 'plist']);
            },
            error: (err: HttpErrorResponse) => {
              this.status = err;
              this.matSnackBar.open('Error al actualizar el registro', 'Aceptar', {duration: 3000});
            }
          });
        }
      }
    }

    onShowLigaSelection() {
      this.dynamicDialogRef = this.dialogService.open(AdminLigaSelectionUnroutedComponent, {
        header: 'Seleccione una liga',
        width: '70%',
        contentStyle: {"max-height": "500px", "overflow": "auto"},
        maximizable: true
      });

      if (this.dynamicDialogRef) {
        this.dynamicDialogRef.onClose.subscribe((liga: ILiga) => {
          if (liga) {
            this.equipo.liga = liga;
            this.equipoForm.controls['liga'].patchValue({id: liga.id});
          }
        });
      }

      }
    }
  


