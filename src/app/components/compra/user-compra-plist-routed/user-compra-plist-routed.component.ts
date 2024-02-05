import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-user-compra-plist-routed',
  templateUrl: './user-compra-plist-routed.component.html',
  styleUrls: ['./user-compra-plist-routed.component.css']
})
export class UserCompraPlistRoutedComponent implements OnInit {

  forceReload: Subject<boolean> = new Subject<boolean>();

  constructor(
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
  }

}
