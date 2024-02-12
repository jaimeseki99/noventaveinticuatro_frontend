import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-user-camiseta-view-routed',
  templateUrl: './user-camiseta-view-routed.component.html',
  styleUrls: ['./user-camiseta-view-routed.component.css']
})
export class UserCamisetaViewRoutedComponent implements OnInit {

  id: number = 1;
 

  constructor(
    private activatedRoute: ActivatedRoute
  ) {
    this.id = parseInt(this.activatedRoute.snapshot.paramMap.get('id') || "1"); 
   }

  ngOnInit() {
  }

}
