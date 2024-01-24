import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
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
    private MatSnackBar: MatSnackBar,
    private cryptoService: CryptoService,
    ) 
    
    {this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      captcha: ['', [Validators.required]]
    });
  }

 getPreloginData() {
  this.sesionService.prelogin().subscribe({
    next: (data: IPrelogin) => {
      this.prelogin = data;
    },
    error: (err: HttpErrorResponse) => {
      this.status = err;
      this.MatSnackBar.open('Error al obtener los datos de prelogin', 'Cerrar', { duration: 3000 });
    }
    });
  }
 

  ngOnInit() {
    this.getPreloginData();
  }

  onSubmit() {
      if (this.loginForm.valid && this.prelogin) {
        const captchaAnswer = this.loginForm.value.captcha;
        const username = this.loginForm.value.username;
        const hashedPassword = this.cryptoService.getSHA256(this.loginForm.value.password);
        const token = this.prelogin.token;

        this.sesionService.login(username, hashedPassword, token, captchaAnswer).subscribe({
          next: (data: string) => {
            this.sesionService.setToken(data);
            this.sesionService.emit({ type: 'login' });
            this.router.navigate(['/']);
          },
          error: (err: HttpErrorResponse) => {
            this.status = err;
            this.MatSnackBar.open('Error al iniciar sesión', 'Cerrar', { duration: 3000 });
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
  this.loginForm.setValue({username: 'jaimeseki99', password: 'noventaveinticuatro9024', captcha: ''});
}

loginUser() {
  this.loginForm.setValue({username: 'sekimmortenn', password: 'noventaveinticuatro9024', captcha: ''});
}

}
