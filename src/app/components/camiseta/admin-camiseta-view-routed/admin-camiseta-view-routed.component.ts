import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-admin-camiseta-view-routed',
  templateUrl: './admin-camiseta-view-routed.component.html',
  styleUrls: ['./admin-camiseta-view-routed.component.css']
})
export class AdminCamisetaViewRoutedComponent implements OnInit {

  id: number = 1;

  constructor(
    private activatedRoute: ActivatedRoute
  ) { 
    this.id = parseInt(this.activatedRoute.snapshot.paramMap.get('id') || "1"); 
  }

  ngOnInit() {
  }

}
