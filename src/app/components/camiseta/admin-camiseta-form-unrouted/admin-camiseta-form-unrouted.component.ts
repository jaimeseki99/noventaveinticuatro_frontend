import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ICamiseta, IEquipo, ILiga, IModalidad, formOperation } from 'src/app/model/model.interfaces';
import { CamisetaAjaxService } from 'src/app/service/camiseta.ajax.service.service';
import { MediaService } from 'src/app/service/media.service';
import { AdminEquipoPlistUnroutedComponent } from '../../equipo/admin-equipo-plist-unrouted/admin-equipo-plist-unrouted.component';
import { AdminModalidadPlistUnroutedComponent } from '../../modalidad/admin-modalidad-plist-unrouted/admin-modalidad-plist-unrouted.component';
import { AdminLigaPlistUnroutedComponent } from '../../liga/admin-liga-plist-unrouted/admin-liga-plist-unrouted.component';
import { AdminEquipoSelectionUnroutedComponent } from '../../equipo/admin-equipo-selection-unrouted/admin-equipo-selection-unrouted.component';
import { AdminModalidadSelectionUnroutedComponent } from '../../modalidad/admin-modalidad-selection-unrouted/admin-modalidad-selection-unrouted.component';
import { AdminLigaSelectionUnroutedComponent } from '../../liga/admin-liga-selection-unrouted/admin-liga-selection-unrouted.component';

@Component({
  selector: 'app-admin-camiseta-form-unrouted',
  templateUrl: './admin-camiseta-form-unrouted.component.html',
  styleUrls: ['./admin-camiseta-form-unrouted.component.css']
})
export class AdminCamisetaFormUnroutedComponent implements OnInit {

  @Input() id: number = 1;
  @Input() operation: formOperation = 'NEW';

  camisetaForm!: FormGroup;
  camiseta: ICamiseta = { imagen: '', equipo: {}, modalidad: {}, liga: {} } as ICamiseta;
  status: HttpErrorResponse | null = null;
  dynamicDialogRef: DynamicDialogRef | undefined;
  temporadas: string[] = [];
  
  constructor(
    private formBuilder: FormBuilder,
    private camisetaAjaxService: CamisetaAjaxService,
    private mediaService: MediaService,
    private router: Router,
    private matSnackBar: MatSnackBar,
    private dialogService: DialogService
  ) {
    this.initializeForm(this.camiseta);
   }

  initializeForm(camiseta: ICamiseta) {
    this.camisetaForm = this.formBuilder.group({
      id: [this.camiseta.id],
      titulo: [this.camiseta.titulo, [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      talla: [this.camiseta.talla, [Validators.required]],
      manga: [this.camiseta.manga, [Validators.required]],
      nombre: [this.camiseta.nombre],
      dorsal: [this.camiseta.dorsal],
      temporada: [this.camiseta.temporada, [Validators.required]],
      imagen: [this.camiseta.imagen],
      precio: [this.camiseta.precio, [Validators.required]],
      iva: [this.camiseta.iva, [Validators.required]],
      descuento: [this.camiseta.descuento],
      porcentajeDescuento: [this.camiseta.porcentajeDescuento],
      stock: [this.camiseta.stock, [Validators.required]],
      equipo: this.formBuilder.group({
        id: [this.camiseta.equipo.id, [Validators.required]],
      }),
      modalidad: this.formBuilder.group({
        id: [this.camiseta.modalidad.id, [Validators.required]],
      }),
      liga: this.formBuilder.group({
        id: [this.camiseta.liga.id, [Validators.required]],
      })
    });
  }

  ngOnInit() {
    if (this.operation == 'EDIT') {
      this.camisetaAjaxService.getCamisetaById(this.id).subscribe({
        next: (data: ICamiseta) => {
          this.camiseta = data;
          this.initializeForm(this.camiseta);
        },
        error: (err: HttpErrorResponse) => {
          this.status = err;
          this.matSnackBar.open('Error al obtener el registro', 'Aceptar', {duration: 3000});
        }
      });
    } else {
      this.initializeForm(this.camiseta);
    }

    this.generarTemporadas();
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('file', file);

      this.mediaService.uploadFile(formData).subscribe({
        next: (response) => {
          this.camiseta.imagen = response.url;
          this.camisetaForm.controls['imagen'].patchValue(response.url);

        },
        error: (error) => {
          this.matSnackBar.open('Error al subir el fichero', 'Aceptar', {duration: 3000});
        }
      });
    }
  }

  generarTemporadas(): string[] {
    const anyoActual = new Date().getFullYear();

    for (let i = anyoActual; i>= 1999; i--) {
      const temporadaInicio = i;
      const temporadaFin = i + 1;
      const temporada = `${temporadaInicio}-${temporadaFin}`;
      this.temporadas.push(temporada);
    }

    return this.temporadas;
  }

  public hasError = (controlName: string, error: string) => {
    return this.camisetaForm.controls[controlName].hasError(error);
  }

  onSubmit() {
    if (this.camisetaForm.valid) {
      if (this.operation == 'NEW') {
        this.camisetaAjaxService.createCamiseta(this.camisetaForm.value).subscribe({
          next: (data: ICamiseta) => {
            this.camiseta = { "imagen": '', "equipo": {}, "modalidad": {}, "liga": {} } as ICamiseta; 
            this.camiseta.id = data.id;
            this.initializeForm(this.camiseta);
            this.matSnackBar.open('Registro creado correctamente', 'Aceptar', {duration: 3000});
            this.router.navigate(['/admin', 'camiseta', 'view', this.camiseta.id]);
          },
          error: (err: HttpErrorResponse) => {
            this.status = err;
            this.matSnackBar.open('Error al crear el registro', 'Aceptar', {duration: 3000});
          }
        });
      } else {
        this.camisetaAjaxService.updateCamiseta(this.camisetaForm.value).subscribe({
          next: (data: ICamiseta) => {
            this.camiseta = data;
            this.initializeForm(this.camiseta);
            this.matSnackBar.open('Registro actualizado correctamente', 'Aceptar', {duration: 3000});
            this.router.navigate(['/admin', 'camiseta', 'view', this.camiseta.id]);
          },
          error: (err: HttpErrorResponse) => {
            this.status = err;
            this.matSnackBar.open('Error al actualizar el registro', 'Aceptar', {duration: 3000});
          }
        });
      }
    }
  }

  onShowEquiposSelection() {
    this.dynamicDialogRef = this.dialogService.open(AdminEquipoSelectionUnroutedComponent, {
      header: 'Selección de Equipo',
      width: '70%',
      maximizable: true
    });

    if (this.dynamicDialogRef) {
      this.dynamicDialogRef.onClose.subscribe((equipo: IEquipo) => {
        if (equipo) {
          this.camiseta.equipo = equipo;
          this.camisetaForm.controls['equipo'].patchValue({ id: equipo.id });
          }
        });
      }
    }

    onShowModalidadSelection() {
      this.dynamicDialogRef = this.dialogService.open(AdminModalidadSelectionUnroutedComponent, {
        header: 'Selección de Modalidad',
        width: '70%',
        maximizable: true
      });
  
      if (this.dynamicDialogRef) {
        this.dynamicDialogRef.onClose.subscribe((modalidad: IModalidad) => {
          if (modalidad) {
            this.camiseta.modalidad = modalidad;
            this.camisetaForm.controls['modalidad'].patchValue({ id: modalidad.id });
            }
          });
        }
      }

      onShowLigaSelection() {
        this.dynamicDialogRef = this.dialogService.open(AdminLigaSelectionUnroutedComponent, {
          header: 'Selección de Liga',
          width: '70%',
          maximizable: true
        });
    
        if (this.dynamicDialogRef) {
          this.dynamicDialogRef.onClose.subscribe((liga: ILiga) => {
            if (liga) {
              this.camiseta.liga = liga;
              this.camisetaForm.controls['liga'].patchValue({ id: liga.id });
              }
            });
          }
      }


    }

  


