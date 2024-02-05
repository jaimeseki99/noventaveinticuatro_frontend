import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-user-liga-plist-routed',
  templateUrl: './user-liga-plist-routed.component.html',
  styleUrls: ['./user-liga-plist-routed.component.css']
})
export class UserLigaPlistRoutedComponent implements OnInit {

  forceReload: Subject<boolean> = new Subject<boolean>();

  constructor(
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
  }

}
