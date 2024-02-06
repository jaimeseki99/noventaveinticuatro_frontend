import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { throws } from 'assert';

@Component({
  selector: 'app-user-compra-view-routed',
  templateUrl: './user-compra-view-routed.component.html',
  styleUrls: ['./user-compra-view-routed.component.css']
})
export class UserCompraViewRoutedComponent implements OnInit {

  id: number = 1;

  constructor(
    private activatedRoute: ActivatedRoute
  ) { 
    this.id = parseInt(this.activatedRoute.snapshot.paramMap.get('id') || "1" );
  }

  ngOnInit() {
  }

}
