import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ICamiseta, IUsuario, IValoracion } from 'src/app/model/model.interfaces';
import { CamisetaAjaxService } from 'src/app/service/camiseta.ajax.service.service';
import { UsuarioAjaxService } from 'src/app/service/usuario.ajax.service.service';
import { ValoracionAjaxService } from 'src/app/service/valoracion.ajax.service.service';


@Component({
  selector: 'app-user-camiseta-valoracion-form-unrouted',
  templateUrl: './user-camiseta-valoracion-form-unrouted.component.html',
  styleUrls: ['./user-camiseta-valoracion-form-unrouted.component.css']
})
export class UserCamisetaValoracionFormUnroutedComponent implements OnInit {

  @Output() valoracionAgregada: EventEmitter<void> = new EventEmitter<void>();

  id_camiseta: number | undefined;
  id_usuario: number | undefined;
  valoracion: IValoracion = { fecha: new Date(Date.now()), usuario: { id: 0}, camiseta: { id: 0} } as IValoracion;
  usuario: IUsuario | undefined;
  camiseta: ICamiseta | undefined;
  valoracionForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private valoracionAjaxService: ValoracionAjaxService,
    private usuarioAjaxService: UsuarioAjaxService,
    private camisetaAjaxService: CamisetaAjaxService,
    private matSnackBar: MatSnackBar,
    public dialogService: DialogService,
    public dynamicDialogRef: DynamicDialogRef,
    public dynamicDialogCofig: DynamicDialogConfig  
  ) {
    this.id_usuario = this.dynamicDialogCofig.data.id_usuario;
    this.id_camiseta = this.dynamicDialogCofig.data.id_camiseta;
   }

   public hasError = (controlName: string, errorName: string) =>{
    return this.valoracionForm.controls[controlName].hasError(errorName);
   }

  ngOnInit() {
    if (this.id_usuario !== undefined) {
      this.usuarioAjaxService.getUsuarioById(this.id_usuario).subscribe({
        next: (usuario: IUsuario) => {
          this.usuario = usuario;
        },
        error: (err) => {
          this.matSnackBar.open(err.error.message, 'Aceptar', { duration: 3000 });
        }
      });
    }

    if (this.id_camiseta !== undefined) {
      this.camisetaAjaxService.getCamisetaById(this.id_camiseta).subscribe({
        next: (camiseta: ICamiseta) => {
          this.camiseta = camiseta;
        },
        error: (err) => {
          this.matSnackBar.open(err.error.message, 'Aceptar', { duration: 3000 });
        }
      });
      }
      this.initializeForm(this.valoracion);
    }

    initializeForm(valoracion: IValoracion) {
      this.valoracionForm = this.formBuilder.group({
        id: [valoracion.id],
        fecha: [new Date(valoracion.fecha)],
        comentario: [valoracion.comentario, [Validators.required, Validators.minLength(2), Validators.maxLength(255)]],
        usuario: this.formBuilder.group({
          id: [this.id_usuario]
        }),
        camiseta: this.formBuilder.group({
          id: [this.id_camiseta]
        }),
        });
      }

      onSubmit() {
        const valoracion = this.valoracionForm.value;
        this.valoracionAjaxService.createValoracion(valoracion).subscribe({
          next: (data: IValoracion) => {
            this.matSnackBar.open('Valoración creada', 'Aceptar', { duration: 3000 });
            this.dynamicDialogRef.close(data);
            this.valoracionAgregada.emit();
          },
          error: (err) => {
            this.matSnackBar.open(err.error.message, 'Aceptar', { duration: 3000 });
          }
        });
      }

      onCancel() {
        this.dynamicDialogRef.close();
      }

    }
  


