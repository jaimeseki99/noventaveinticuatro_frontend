import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { IModalidad, formOperation } from 'src/app/model/model.interfaces';
import { MediaService } from 'src/app/service/media.service';
import { ModalidadAjaxService } from 'src/app/service/modalidad.ajax.service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-modalidad-form-unrouted',
  templateUrl: './admin-modalidad-form-unrouted.component.html',
  styleUrls: ['./admin-modalidad-form-unrouted.component.css']
})
export class AdminModalidadFormUnroutedComponent implements OnInit {

  @Input() id: number = 1;
  @Input() operation: formOperation = 'NEW';

  modalidadForm!: FormGroup;
  modalidad: IModalidad = {} as IModalidad;
  status: HttpErrorResponse | null = null;

  constructor(
    private modalidadAjaxService: ModalidadAjaxService,
    private mediaService: MediaService,
    private formBuilder: FormBuilder,
    private router: Router,
    private matSnackBar: MatSnackBar
  ) { 
    this.initializeForm(this.modalidad);
  }

  initializeForm(modalidad: IModalidad) {
    this.modalidadForm = this.formBuilder.group({
      id: [modalidad.id],
      nombre: [modalidad.nombre, [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      imagen: [modalidad.imagen]
    });
  }

  ngOnInit() {
    if (this.operation === 'EDIT') {
      this.modalidadAjaxService.getModalidadById(this.id).subscribe({
        next: (data: IModalidad) => {
          this.modalidad = data;
          this.initializeForm(this.modalidad);
        },
        error: (err: HttpErrorResponse) => {
          this.status = err;
          this.matSnackBar.open("Error al obtener el registro", 'Aceptar', { duration: 3000});
        }
      });
      } else {
        this.initializeForm(this.modalidad);
      }
    }

    onFileSelected(event: any) {
      const file: File = event.target.files[0];
      if (file) {
        const formData = new FormData();
        formData.append('file', file);

        this.mediaService.uploadFile(formData).subscribe({
          next: (response) => {
            this.modalidad.imagen = response.url;
            this.modalidadForm.controls['imagen'].patchValue(response.url);
          },
          error: (error) => {
            this.matSnackBar.open('Error al subir el archivo', 'Aceptar', { duration: 3000})
          }
        });
    }
  }

    public hasError = (controlName: string, errorName: string) => {
      return this.modalidadForm.controls[controlName].hasError(errorName);
    }

    onSubmit() {
      if (this.operation === 'NEW') {
        this.modalidadAjaxService.createModalidad(this.modalidadForm.value).subscribe({
          next: (data: IModalidad) => {
            this.modalidad = data;
            this.initializeForm(this.modalidad);
            this.router.navigate(['/admin', 'modalidad', 'plist']);
            Swal.fire({
              title: 'Modalidad creada con éxito',
              icon: 'success',
              timer: 1000,
              timerProgressBar: true
            });
          },
          error: (err: HttpErrorResponse) => {
            this.status = err;
            this.matSnackBar.open("Error al crear el registro", 'Aceptar', { duration: 3000});
          }
        })
      } else {
        this.modalidadAjaxService.updateModalidad(this.modalidadForm.value).subscribe({
          next: (data: IModalidad) => {
            this.modalidad = data;
            this.initializeForm(this.modalidad);
            this.router.navigate(['/admin', 'modalidad', 'plist']);
            Swal.fire({
              icon: 'success',
              title: 'Datos de la modalidad actualizados con éxito',
              timer: 1000,
              timerProgressBar: true
            })
          },
          error: (err: HttpErrorResponse) => {
            this.status = err;
            this.matSnackBar.open("Error al actualizar el registro", 'Aceptar', { duration: 3000});
          }
        })
      }
    }


  }


