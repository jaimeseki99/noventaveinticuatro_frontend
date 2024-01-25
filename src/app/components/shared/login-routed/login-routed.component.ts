import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { IPrelogin } from 'src/app/model/model.interfaces';
import { CryptoService } from 'src/app/service/crypto.service';
import { SesionAjaxService } from 'src/app/service/sesion.ajax.service.service';

@Component({
  selector: 'app-login-routed',
  templateUrl: './login-routed.component.html',
  styleUrls: ['./login-routed.component.css']
})
export class LoginRoutedComponent implements OnInit {

  loginForm: FormGroup;
  status: HttpErrorResponse | null = null;
  prelogin: IPrelogin | null = null;

  constructor(
    private fb: FormBuilder,
    private sesionService: SesionAjaxService,
    private router: Router,
    private snackBar: MatSnackBar,
    private cryptoService: CryptoService
  ) { 
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      contrasenya: ['', [Validators.required]],
      captcha: ['', [Validators.required]]
    });
  }

  getPreloginData() {
    this.sesionService.prelogin().subscribe({
      next: (data: IPrelogin) => {
        this.prelogin = data;
      },
      error: (error) => {
        this.status = error;
        this.snackBar.open('Error al obtener los datos de prelogin', 'Cerrar', {duration: 2000});
      }
    });
  }

  ngOnInit() {
    this.getPreloginData();
  }

  onSubmit() {
    if (this.loginForm.valid && this.prelogin) {
      let username = this.loginForm.get('username')?.value;
      let contrasenya = this.loginForm.get('contrasenya')?.value;
      let contrasenyaSHA256 = this.cryptoService.getSHA256(contrasenya);
      let token = this.prelogin.token;
      let answer = this.loginForm.get('captcha')?.value;
      this.sesionService.loginCaptcha(username, contrasenyaSHA256, token, answer).subscribe({
        next: (data: string) => {
          this.sesionService.setToken(data);
          this.sesionService.emit({type: 'login'});
          this.router.navigate(['/home']);
        }, error: (error: HttpErrorResponse) => {
          this.status = error;
          this.snackBar.open('Error al iniciar sesión', 'Cerrar', {duration: 2000});
          this.getPreloginData();
          this.loginForm.reset();
        }
    });
  }

}

onReset() {
  this.loginForm.reset();
  this.getPreloginData();
}

loginAdmin() {
  this.loginForm.setValue({ username: 'jaimeseki99', contrasenya: 'noventaveinticuatro9024', captcha: ''});
}

loginUser() {
  this.loginForm.setValue({ username: 'sekimmortenn', contrasenya: 'noventaveinticuatro9024', captcha: ''});
}

}
