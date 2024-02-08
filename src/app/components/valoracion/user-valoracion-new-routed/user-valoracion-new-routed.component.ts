import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-valoracion-new-routed',
  templateUrl: './user-valoracion-new-routed.component.html',
  styleUrls: ['./user-valoracion-new-routed.component.css']
})
export class UserValoracionNewRoutedComponent implements OnInit {

  id_camiseta: number = 1;

  constructor(
    private activatedRoute: ActivatedRoute
  ) { 
    this.id_camiseta = parseInt(this.activatedRoute.snapshot.paramMap.get('idcamiseta') || '1');
  }

  ngOnInit() {
  }

}
