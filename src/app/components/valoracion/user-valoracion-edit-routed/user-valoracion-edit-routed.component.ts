import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-valoracion-edit-routed',
  templateUrl: './user-valoracion-edit-routed.component.html',
  styleUrls: ['./user-valoracion-edit-routed.component.css']
})
export class UserValoracionEditRoutedComponent implements OnInit {

  id: number = 1;

  constructor(
    private activatedRoute: ActivatedRoute
  ) { 
    this.id = parseInt(this.activatedRoute.snapshot.paramMap.get('id') || '1');
  }

  ngOnInit() {
  }

}
