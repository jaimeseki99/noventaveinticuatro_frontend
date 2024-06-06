import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IUsuario } from 'src/app/model/model.interfaces';
import { SesionAjaxService } from 'src/app/service/sesion.ajax.service.service';
import Swal from 'sweetalert2';
import { CryptoService } from 'src/app/service/crypto.service';

@Component({
  selector: 'app-register-routed',
  templateUrl: './register-routed.component.html',
  styleUrls: ['./register-routed.component.css']
})
export class RegisterRoutedComponent implements OnInit {

  newUsuarioForm!: FormGroup;
  usuario: IUsuario = {} as IUsuario;
  status: HttpErrorResponse | null = null;

  constructor(
    private sesionAjaxService: SesionAjaxService,
    private cryptoService: CryptoService,
    private formBuilder: FormBuilder,
    private router: Router,
    private matSnackBar: MatSnackBar
  ) { 
    this.initializeForm(this.usuario);
  }

  initializeForm(usuario: IUsuario) {
    this.newUsuarioForm = this.formBuilder.group({
      id: [usuario.id],
      nombre: [usuario.nombre, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      apellido: [usuario.apellido, [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      username: [usuario.username, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      email: [usuario.email, [Validators.required, Validators.email]],
      direccion: [usuario.direccion, [Validators.required, Validators.minLength(3), Validators.maxLength(1000)]],
      telefono: [usuario.telefono, [Validators.required, Validators.minLength(9), Validators.maxLength(15)]],
      contrasenya: [usuario.contrasenya, [Validators.required, Validators.minLength(8)]],
      confirmContrasenya: ['', Validators.required]
    }, {
      validator: this.passwordMatchValidator
    });
  }

  passwordMatchValidator(formGroup: FormGroup) {
    const password = formGroup.get('contrasenya')?.value;
    const confirmPassword = formGroup.get('confirmContrasenya')?.value;

    if (password !== confirmPassword) {
      formGroup.get('confirmContrasenya')?.setErrors({ mustMatch: true });
    } else {
      formGroup.get('confirmContrasenya')?.setErrors(null);
    }
  }

  ngOnInit() {
    this.initializeForm(this.usuario);
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.newUsuarioForm.controls[controlName].hasError(errorName);
  }

  onSubmit() {

    const encryptedPassword = this.cryptoService.getSHA256(this.newUsuarioForm.get('contrasenya')?.value);

    this.newUsuarioForm.patchValue({ contrasenya: encryptedPassword });

    this.sesionAjaxService.register(this.newUsuarioForm.value).subscribe({
      next: (data: IUsuario) => {
        this.usuario = data;
        this.initializeForm(this.usuario);
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Registro completado con éxito",
          timerProgressBar: true,
          timer: 1000,
        });
        this.router.navigate(['/login']);
      },
      error: (err: HttpErrorResponse) => {
        this.status = err;
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Error al registrarte",
          text: "El username o el email ya están en uso",
          timerProgressBar: true,
          timer: 1500,
        });
        this.matSnackBar.open(`Ha habido un error al registrarte. Vuelve a intentarlo`, 'Aceptar', { duration: 3000 });
      }
    })
  }

}
