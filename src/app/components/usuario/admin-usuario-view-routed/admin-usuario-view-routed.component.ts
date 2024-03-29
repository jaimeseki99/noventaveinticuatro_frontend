import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-admin-usuario-view-routed',
  templateUrl: './admin-usuario-view-routed.component.html',
  styleUrls: ['./admin-usuario-view-routed.component.css']
})
export class AdminUsuarioViewRoutedComponent implements OnInit {

  id: number = 1;

  constructor(
    private activatedRoute: ActivatedRoute
  ) { 
    this.id = parseInt(this.activatedRoute.snapshot.paramMap.get('id') || "1");
  }

  ngOnInit() {
  }

}
