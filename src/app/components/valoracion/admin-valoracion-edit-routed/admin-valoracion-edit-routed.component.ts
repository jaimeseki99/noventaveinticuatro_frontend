import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-admin-valoracion-edit-routed',
  templateUrl: './admin-valoracion-edit-routed.component.html',
  styleUrls: ['./admin-valoracion-edit-routed.component.css']
})
export class AdminValoracionEditRoutedComponent implements OnInit {

  id: number = 1;

  constructor(
    private activatedRoute: ActivatedRoute
  ) { 
    this.id = parseInt(this.activatedRoute.snapshot.paramMap.get('id') || '1');
  }

  ngOnInit() {
  }

}
