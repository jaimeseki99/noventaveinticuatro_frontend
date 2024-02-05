import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-user-equipo-plist-routed',
  templateUrl: './user-equipo-plist-routed.component.html',
  styleUrls: ['./user-equipo-plist-routed.component.css']
})
export class UserEquipoPlistRoutedComponent implements OnInit {

  forceReload: Subject<boolean> = new Subject<boolean>();

  constructor(
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
  }

}
