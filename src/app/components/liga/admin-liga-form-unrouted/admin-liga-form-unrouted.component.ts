import { ImageLoaderConfig } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ILiga, formOperation } from 'src/app/model/model.interfaces';
import { LigaAjaxService } from 'src/app/service/liga.ajax.service.service';
import { MediaService } from 'src/app/service/media.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-liga-form-unrouted',
  templateUrl: './admin-liga-form-unrouted.component.html',
  styleUrls: ['./admin-liga-form-unrouted.component.css']
})
export class AdminLigaFormUnroutedComponent implements OnInit {

  @Input() id: number = 1;
  @Input() operation: formOperation = 'NEW';

  ligaForm!: FormGroup;
  liga: ILiga = {imagen: ''} as ILiga;
  status: HttpErrorResponse | null = null;
  

  constructor(
    private ligaAjaxService: LigaAjaxService,
    private mediaService: MediaService,
    private formBuilder: FormBuilder,
    private router: Router,
    private matSnackBar: MatSnackBar
  ) { 
    this.initializeForm(this.liga);
  }

  initializeForm(liga: ILiga) {
    this.ligaForm = this.formBuilder.group({
      id: [liga.id],
      nombre: [liga.nombre, [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      pais: [liga.pais, [Validators.required]],
      deporte: [liga.deporte, [Validators.required]],
      imagen: [liga.imagen]
    })
  }

  ngOnInit() {
    if (this.operation == 'EDIT') {
      this.ligaAjaxService.getLigaById(this.id).subscribe({
        next: (data: ILiga) => {
          this.liga = data;
          this.initializeForm(this.liga);
        },
        error: (err: HttpErrorResponse) => {
          this.status = err;
          this.matSnackBar.open("Error al obtener el registro", 'Aceptar', { duration: 3000});
        }
      });
    } else {
      this.initializeForm(this.liga);
    }
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);

      this.mediaService.uploadFile(formData).subscribe({
        next: (response) => {
          this.liga.imagen = response.url;
          this.ligaForm.patchValue({imagen: response.url});
        },
        error: (error) => {
          this.matSnackBar.open("Error al subir el fichero", 'Aceptar', { duration: 3000});
        }
      });
    }
    }
  

  public hasError = (controlName: string, errorName: string) => {
    return this.ligaForm.controls[controlName].hasError(errorName);
  }

  onSubmit() {
    if (this.ligaForm.valid) {
      if (this.operation == 'NEW') {
        this.ligaAjaxService.createLiga(this.ligaForm.value).subscribe({
          next: (data: ILiga) => {
            this.liga = data;
            this.initializeForm(this.liga);
            Swal.fire({
              title: 'Liga creada con éxito',
              icon: 'success',
              timer: 1000,
              timerProgressBar: true
            })
            this.router.navigate(['/admin', 'liga', 'plist']);
          },
          error: (err: HttpErrorResponse) => {
            this.status = err;
            this.matSnackBar.open("Error al crear el registro", 'Aceptar', { duration: 3000});
          }
        })
      } else {
        this.ligaAjaxService.updateLiga(this.ligaForm.value).subscribe({
          next: (data: ILiga) => {
            this.liga = data;
            this.initializeForm(this.liga);
            Swal.fire({
              title: 'Datos de la liga actualizados con éxito',
              icon: 'success',
              timer: 1000,
              timerProgressBar: true
            })
            this.router.navigate(['/admin', 'liga', 'plist']);
          },
          error: (err: HttpErrorResponse) => {
            this.status = err;
            this.matSnackBar.open("Error al actualizar el registro", 'Aceptar', { duration: 3000});
          }
        })
      }
    }
  }

  
}
