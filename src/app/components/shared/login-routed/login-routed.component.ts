import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
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

  constructor(
    private fb: FormBuilder,
    private sesionService: SesionAjaxService,
    private router: Router,
    private snackBar: MatSnackBar,
    private cryptoService: CryptoService
  ) { 
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      contrasenya: ['', [Validators.required]]
    });
  }

  ngOnInit() {
  }

  onSubmit() {
    if (this.loginForm.valid) {
      let username = this.loginForm.get('username')?.value;
      let contrasenya = this.loginForm.get('contrasenya')?.value;
      let contrasenyaSHA256 = this.cryptoService.getSHA256(contrasenya);
      this.sesionService.login(username, contrasenyaSHA256).subscribe({
        next: (data: string) => {
          this.sesionService.setToken(data);
          this.sesionService.emit({type: 'login'});
          this.router.navigate(['/home']);
        },
    });
  }

}

onReset() {
  this.loginForm.reset();
}

}
