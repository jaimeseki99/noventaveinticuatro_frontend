import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-admin-camiseta-edit-routed',
  templateUrl: './admin-camiseta-edit-routed.component.html',
  styleUrls: ['./admin-camiseta-edit-routed.component.css']
})
export class AdminCamisetaEditRoutedComponent implements OnInit {

  id: number = 1;

  constructor(
    private activatedRoute: ActivatedRoute
  ) { 
    this.id = parseInt(this.activatedRoute.snapshot.paramMap.get('id') || '1');
  }

  ngOnInit() {
  }

}
