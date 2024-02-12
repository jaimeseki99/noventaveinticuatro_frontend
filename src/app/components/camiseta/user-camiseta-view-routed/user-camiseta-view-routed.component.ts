import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { UserValoracionPlistUnroutedComponent } from '../../valoracion/user-valoracion-plist-unrouted/user-valoracion-plist-unrouted.component';
import { UserCamisetaValoracionFormUnroutedComponent } from '../user-camiseta-valoracion-form-unrouted/user-camiseta-valoracion-form-unrouted.component';

@Component({
  selector: 'app-user-camiseta-view-routed',
  templateUrl: './user-camiseta-view-routed.component.html',
  styleUrls: ['./user-camiseta-view-routed.component.css']
})
export class UserCamisetaViewRoutedComponent implements OnInit {

  forceReload: Subject<boolean> = new Subject<boolean>();
  id: number = 1;

  constructor(
    private activatedRoute: ActivatedRoute,
  ) {
    this.id = parseInt(this.activatedRoute.snapshot.paramMap.get('id') || "1"); 
   }

  ngOnInit() {
    
  }



}
