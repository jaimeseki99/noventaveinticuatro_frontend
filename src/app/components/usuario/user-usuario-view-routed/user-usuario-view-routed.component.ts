import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-usuario-view-routed',
  templateUrl: './user-usuario-view-routed.component.html',
  styleUrls: ['./user-usuario-view-routed.component.css']
})
export class UserUsuarioViewRoutedComponent implements OnInit {

  id: number = 1;

  constructor(
    private activatedRoute: ActivatedRoute
  ) { 
    this.id = parseInt(this.activatedRoute.snapshot.paramMap.get('id') ?? '1');
  }

  ngOnInit() {
  }

}
