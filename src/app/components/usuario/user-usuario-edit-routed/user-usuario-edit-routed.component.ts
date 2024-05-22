import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-usuario-edit-routed',
  templateUrl: './user-usuario-edit-routed.component.html',
  styleUrls: ['./user-usuario-edit-routed.component.css']
})
export class UserUsuarioEditRoutedComponent implements OnInit {

  id: number = 1;

  constructor(
    private activatedRoute: ActivatedRoute
  ) {
    this.id = parseInt(this.activatedRoute.snapshot.paramMap.get('id') || '1');
   }

  ngOnInit() {
  }

}
