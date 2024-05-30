import { HttpErrorResponse } from '@angular/common/http';
import { UsuarioAjaxService } from './../../../service/usuario.ajax.service.service';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IUsuario, SessionEvent } from 'src/app/model/model.interfaces';
import { SesionAjaxService } from 'src/app/service/sesion.ajax.service.service';
import { interval } from 'rxjs';

declare var Flowbite: any;

@Component({
  selector: 'app-home-routed',
  templateUrl: './home-routed.component.html',
  styleUrls: ['./home-routed.component.css']
})
export class HomeRoutedComponent implements OnInit, AfterViewInit {

  @ViewChild('carouselWrapper') carouselWrapper: ElementRef | undefined;
  currentIndex: number = 0;
  username: string = '';
  userSesion: IUsuario | null = null;

  constructor(
    private sesionAjaxService: SesionAjaxService,
    private usuarioAjaxService: UsuarioAjaxService
  ) { }

  ngOnInit() {
    if (this.isLogged()) {
      this.fetchUserDetails();
    }
    this.sesionAjaxService.on().subscribe({
      next: (data: SessionEvent) => {
        if (data.type === 'login') {
          this.username = this.sesionAjaxService.getUsername();
          this.usuarioAjaxService.getUsuarioByUsername(this.sesionAjaxService.getUsername()).subscribe({
            next: (usuario: IUsuario) => {
              this.userSesion = usuario;
            },
            error: (err: HttpErrorResponse) => {
              console.log(err);
            }
          });
        } else if (data.type === 'logout') {
          this.username = '';
          this.userSesion = null;
        }
      }
    });
  }

  ngAfterViewInit(): void {
      const slides = this.carouselWrapper?.nativeElement.children;
      const slideCount = slides.length;

      document.getElementById('next')?.addEventListener('click', () => {
        this.currentIndex = (this.currentIndex + 1) % slideCount;
        this.updateCarousel();
      });

      document.getElementById('prev')?.addEventListener('click', () => {
        this.currentIndex = (this.currentIndex - 1) % slideCount;
        this.updateCarousel();
      })
  }

  updateCarousel(): void {
    if (this.carouselWrapper) {
      const translateX = -this.currentIndex * 100;
      this.carouselWrapper.nativeElement.style.transform = `translateX(${translateX}%)`
    }
  }

 
  isLogged(): boolean {
    return this.sesionAjaxService.isSessionActive();
  }

  fetchUserDetails(): void {
    this.usuarioAjaxService.getUsuarioByUsername(this.sesionAjaxService.getUsername()).subscribe({
      next: (usuario: IUsuario) => {
        this.userSesion = usuario;
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
      }
    });
  }

  isUserNormal(): boolean {
    return this.userSesion != null && this.userSesion.tipo === false;
  }
  
  

}
