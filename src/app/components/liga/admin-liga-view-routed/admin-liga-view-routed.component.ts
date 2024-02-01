import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-admin-liga-view-routed',
  templateUrl: './admin-liga-view-routed.component.html',
  styleUrls: ['./admin-liga-view-routed.component.css']
})
export class AdminLigaViewRoutedComponent implements OnInit {

  id: number = 1;

  constructor(
    private activatedRoute: ActivatedRoute
  ) { 
    this.id = parseInt(this.activatedRoute.snapshot.paramMap.get('id') || '1');
  }

  ngOnInit() {
  }

}
