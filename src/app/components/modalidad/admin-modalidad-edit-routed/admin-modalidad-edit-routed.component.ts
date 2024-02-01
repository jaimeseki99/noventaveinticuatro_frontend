import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-admin-modalidad-edit-routed',
  templateUrl: './admin-modalidad-edit-routed.component.html',
  styleUrls: ['./admin-modalidad-edit-routed.component.css']
})
export class AdminModalidadEditRoutedComponent implements OnInit {

  id: number = 1;

  constructor(
    private activatedRoute: ActivatedRoute
  ) {
    this.id = parseInt(this.activatedRoute.snapshot.paramMap.get('id') || '1');
   }

  ngOnInit() {
  }

}
