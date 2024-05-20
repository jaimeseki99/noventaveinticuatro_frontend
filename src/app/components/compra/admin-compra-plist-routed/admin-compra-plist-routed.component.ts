import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-admin-compra-plist-routed',
  templateUrl: './admin-compra-plist-routed.component.html',
  styleUrls: ['./admin-compra-plist-routed.component.css']
})
export class AdminCompraPlistRoutedComponent implements OnInit {

  forceReload: Subject<boolean> = new Subject<boolean>();
  id_usuario: number;

  constructor(
    private activatedRoute: ActivatedRoute
  ) { 
    this.id_usuario = parseInt(this.activatedRoute.snapshot.paramMap.get("idusuario") || "0");
  }

  ngOnInit() {
  }

}
