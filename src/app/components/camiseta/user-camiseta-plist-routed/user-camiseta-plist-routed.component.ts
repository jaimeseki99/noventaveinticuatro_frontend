import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-user-camiseta-plist-routed',
  templateUrl: './user-camiseta-plist-routed.component.html',
  styleUrls: ['./user-camiseta-plist-routed.component.css']
})
export class UserCamisetaPlistRoutedComponent implements OnInit {

  forceReload: Subject<boolean> = new Subject<boolean>();
  id_equipo: number;
  id_modalidad: number;
  id_liga: number;

  constructor(
    private activatedRoute: ActivatedRoute
  ) {
    this.id_equipo = parseInt(this.activatedRoute.snapshot.paramMap.get('id_equipo') || '0');
    this.id_modalidad = parseInt(this.activatedRoute.snapshot.paramMap.get('id_modalidad') || '0');
    this.id_liga = parseInt(this.activatedRoute.snapshot.paramMap.get('id_liga') || '0');
   }

  ngOnInit() {
  }

}
