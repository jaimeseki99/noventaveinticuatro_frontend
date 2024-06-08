import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EmailValuesDto } from 'src/app/model/model.emailValuesDto';
import { EmailAjaxService } from 'src/app/service/email.ajax.service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-send-email',
  templateUrl: './send-email.component.html',
  styleUrls: ['./send-email.component.css']
})
export class SendEmailComponent implements OnInit {

  sendEmailForm!: FormGroup;


  constructor(
    private emailAjaxService: EmailAjaxService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { 
    this.sendEmailForm = this.formBuilder.group({
      mailTo: ['', [Validators.required]],
    });
  }

  ngOnInit() {
  }

  onSubmit() {
    const mailTo = this.sendEmailForm.get('mailTo')?.value;
    this.emailAjaxService.sendEmail(new EmailValuesDto(mailTo)).subscribe({
      next: (data: string) => {
        Swal.fire({
          icon: 'success',
          position: 'center',
          title: 'Email enviado correctamente',
          text: 'Revisa tu bandeja de entrada',
          timer: 1500,
          timerProgressBar: true,
        });
        this.router.navigate(['/home']);
      },
      error: (err: HttpErrorResponse) => {
        Swal.fire({
          icon: 'error',
          position: 'center',
          title: 'Error al enviar el email',
          text: 'Inténtalo de nuevo',
          timer: 1500,
          timerProgressBar: true,
        })
      }
    })
  }

}
