import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ChangePasswordDto } from 'src/app/model/model.changePasswordDto';
import { CryptoService } from 'src/app/service/crypto.service';
import { EmailAjaxService } from 'src/app/service/email.ajax.service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  updatePasswordForm!: FormGroup;
  tokenContrasenya: string | null = '';

  constructor(
    private emailAjaxService: EmailAjaxService,
    private cryptoService: CryptoService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
  ) { 
    this.updatePasswordForm = this.formBuilder.group({
      contrasenya: ['', [Validators.required]],
      confirmarContrasenya: ['', [Validators.required]],
    });
  }

  ngOnInit() {
  }

  onSumbit() {
    if (this.updatePasswordForm.get('contrasenya')?.value != this.updatePasswordForm.get('confirmarContrasenya')?.value) {
      Swal.fire({
        icon: 'error',
        position: 'center',
        title: 'Error al cambiar la contraseña',
        text: 'Las contraseñas no coinciden',
        timer: 1500,
        timerProgressBar: true,
      });
      return;
      }

      this.tokenContrasenya = this.activatedRoute.snapshot.paramMap.get('tokenContrasenya');

      const contrasenyaEncriptada = this.cryptoService.getSHA256(this.updatePasswordForm.get('contrasenya')?.value);

      const changePasswordDto = new ChangePasswordDto(contrasenyaEncriptada, contrasenyaEncriptada, this.tokenContrasenya);

      this.emailAjaxService.changePassword(changePasswordDto).subscribe({
        next: (data: string) => {
          Swal.fire({
            icon: 'success',
            position: 'center',
            title: 'Contraseña cambiada correctamente',
            text: 'Inicia sesión con tu nueva contraseña',
            timer: 1500,
            timerProgressBar: true,
          });
          this.router.navigate(['/login']);
        },
        error: (err: HttpErrorResponse) => {
          Swal.fire({
            icon: 'error',
            position: 'center',
            title: 'Error al cambiar la contraseña',
            text: 'Inténtalo de nuevo',
            timer: 1500,
            timerProgressBar: true,
          })
        }
      })

    }
  }


