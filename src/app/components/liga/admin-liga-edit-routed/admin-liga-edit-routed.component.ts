import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-admin-liga-edit-routed',
  templateUrl: './admin-liga-edit-routed.component.html',
  styleUrls: ['./admin-liga-edit-routed.component.css']
})
export class AdminLigaEditRoutedComponent implements OnInit {

  id: number = 1;

  constructor(
    private activatedRoute: ActivatedRoute
  ) { 
    this.id = parseInt(this.activatedRoute.snapshot.paramMap.get('id') || '1');
  }

  ngOnInit() {
  }

}
