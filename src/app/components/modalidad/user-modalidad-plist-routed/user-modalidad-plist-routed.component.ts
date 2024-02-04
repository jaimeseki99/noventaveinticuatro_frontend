import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-user-modalidad-plist-routed',
  templateUrl: './user-modalidad-plist-routed.component.html',
  styleUrls: ['./user-modalidad-plist-routed.component.css']
})
export class UserModalidadPlistRoutedComponent implements OnInit {

  forceReload: Subject<boolean> = new Subject<boolean>();

  constructor(
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
  }

}
