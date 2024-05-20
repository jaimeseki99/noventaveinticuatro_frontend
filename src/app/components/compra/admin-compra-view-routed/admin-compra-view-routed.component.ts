import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { ICompraPage } from 'src/app/model/model.interfaces';

@Component({
  selector: 'app-admin-compra-view-routed',
  templateUrl: './admin-compra-view-routed.component.html',
  styleUrls: ['./admin-compra-view-routed.component.css']
})
export class AdminCompraViewRoutedComponent implements OnInit {

  id: number = 1;

  constructor(
    private activatedRoute: ActivatedRoute
  ) { 
    this.id = parseInt(this.activatedRoute.snapshot.paramMap.get('id') || "1");
  }

  ngOnInit() {
  }

}
