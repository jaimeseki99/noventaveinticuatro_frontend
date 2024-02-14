import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-admin-modalidad-view-routed',
  templateUrl: './admin-modalidad-view-routed.component.html',
  styleUrls: ['./admin-modalidad-view-routed.component.css']
})
export class AdminModalidadViewRoutedComponent implements OnInit {

  id: number = 1;

  constructor(
    private activatedRoute: ActivatedRoute
  ) { 
    this.id = parseInt(this.activatedRoute.snapshot.paramMap.get('id') || '1');
  }

  ngOnInit() {
  }

}
