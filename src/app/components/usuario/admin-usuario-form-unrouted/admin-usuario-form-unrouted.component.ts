import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { IUsuario, formOperation } from 'src/app/model/model.interfaces';
import { UsuarioAjaxService } from 'src/app/service/usuario.ajax.service.service';

@Component({
  selector: 'app-admin-usuario-form-unrouted',
  templateUrl: './admin-usuario-form-unrouted.component.html',
  styleUrls: ['./admin-usuario-form-unrouted.component.css']
})
export class AdminUsuarioFormUnroutedComponent implements OnInit {

  @Input() id: number = 1;
  @Input() operation: formOperation = 'NEW';

  usuarioForm!: FormGroup;
  usuario: IUsuario = {} as IUsuario;
  status: HttpErrorResponse | null = null;

  constructor(
    private usuarioAjaxService: UsuarioAjaxService,
    private formBuilder: FormBuilder,
    private router: Router,
    private matSnackBar: MatSnackBar
  ) { 
    this.initializeForm(this.usuario);
  }

  initializeForm(usuario: IUsuario) {
    this.usuarioForm = this.formBuilder.group({
      id: [usuario.id],
      nombre: [usuario.nombre, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      apellido: [usuario.apellido, [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      username: [usuario.username, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      email: [usuario.email, [Validators.required, Validators.email]],
      direccion: [usuario.direccion, [Validators.required, Validators.minLength(3), Validators.maxLength(1000)]],
      telefono: [usuario.telefono, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      tipo: [usuario.tipo, [Validators.required]],
    });
  }

  ngOnInit() {
    if (this.operation === 'EDIT') {
      this.usuarioAjaxService.getUsuarioById(this.id).subscribe({
        next: (data: IUsuario) => {
          this.usuario = data;
          this.initializeForm(this.usuario);
        },
        error: (err: HttpErrorResponse) => {
          this.status = err;
          this.matSnackBar.open("Error al obtener los datos del usuario", 'Aceptar', {duration: 3000});
        }
      })
    } else {
      this.initializeForm(this.usuario);
    }
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.usuarioForm.controls[controlName].hasError(errorName);
  }

  onSubmit() {
    if (this.usuarioForm.valid) {
      if (this.operation === 'NEW') {
        this.usuarioAjaxService.createUsuario(this.usuarioForm.value).subscribe({
          next: (data: IUsuario) => {
            this.usuario = data;
            this.initializeForm(this.usuario);
            this.matSnackBar.open("Usuario creado correctamente", 'Aceptar', {duration: 3000});
            this.router.navigate(['/admin', 'usuario', 'plist']);
          },
          error: (err: HttpErrorResponse) => {
            this.status = err;
            this.matSnackBar.open("Error al crear el usuario", 'Aceptar', {duration: 3000});
          }
        })
      } else {
        this.usuarioAjaxService.updateUsuario(this.usuarioForm.value).subscribe({
          next: (data: IUsuario) => {
            this.usuario = data;
            this.initializeForm(this.usuario);
            this.matSnackBar.open("Usuario actualizado correctamente", 'Aceptar', {duration: 3000});
            this.router.navigate(['/admin', 'usuario', 'view', this.usuario.id]);
          },
          error: (err: HttpErrorResponse) => {
            this.status = err;
            this.matSnackBar.open("Error al actualizar el usuario", 'Aceptar', {duration: 3000});
          }
        })
      }
    }
  }

}
