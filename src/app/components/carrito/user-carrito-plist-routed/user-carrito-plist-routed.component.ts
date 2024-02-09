import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-user-carrito-plist-routed',
  templateUrl: './user-carrito-plist-routed.component.html',
  styleUrls: ['./user-carrito-plist-routed.component.css']
})
export class UserCarritoPlistRoutedComponent implements OnInit {

  forceReload: Subject<boolean> = new Subject<boolean>();

  constructor() { }

  ngOnInit() {
  }

}
