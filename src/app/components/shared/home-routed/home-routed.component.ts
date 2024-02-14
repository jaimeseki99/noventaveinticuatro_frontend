import { Component, OnInit } from '@angular/core';
import { SesionAjaxService } from 'src/app/service/sesion.ajax.service.service';

@Component({
  selector: 'app-home-routed',
  templateUrl: './home-routed.component.html',
  styleUrls: ['./home-routed.component.css']
})
export class HomeRoutedComponent implements OnInit {

  constructor(
    private sesionAjaxService: SesionAjaxService
  ) { }

  ngOnInit() {
    this.isLogged();
  }

  isLogged(): boolean {
    return this.sesionAjaxService.isSessionActive();
  }

  

}
