import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IEquipo, ILiga, formOperation } from 'src/app/model/model.interfaces';
import { EquipoAjaxService } from 'src/app/service/equipo.ajax.service.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-admin-equipo-form-unrouted',
  templateUrl: './admin-equipo-form-unrouted.component.html',
  styleUrls: ['./admin-equipo-form-unrouted.component.css']
})
export class AdminEquipoFormUnroutedComponent implements OnInit {

  @Input() id: number = 1;
  @Input() operation: formOperation = 'NEW';

  equipoForm!: FormGroup;
  equipo: IEquipo = { liga: {} } as IEquipo;
  status: HttpErrorResponse | null = null;
  dynamicDialogRef: DynamicDialogRef | undefined;


  constructor(
    private formBuilder: FormBuilder,
    private equipoAjaxService: EquipoAjaxService,
    private router: Router,
    private matSnackBar: MatSnackBar,
    private dialogService: DialogService
  ) {
    this.initializeForm(this.equipo);
   }

   initializeForm(equipo: IEquipo) {
    this.equipoForm = this.formBuilder.group({
      id: [equipo.id],
      nombre: [equipo.nombre, [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      liga: this.formBuilder.group({
        id: [equipo.liga.id, [Validators.required]],
      }),
    });
   }

  ngOnInit() {
    if (this.operation == 'EDIT') {
      this.equipoAjaxService.getEquipoById(this.id).subscribe({
        next: (data: IEquipo) => {
          this.equipo = data;
          this.initializeForm(this.equipo);
        }
      })
    }
  }

}
