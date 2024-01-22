import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { API_URL } from "src/environment/environment";
import { UsuarioAjaxService } from "./usuario.ajax.service.service";
import { IPrelogin, IToken, IUsuario, SessionEvent } from "../model/model.interfaces";
import { Observable, Subject } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class SesionAjaxService {

    private url = API_URL + '/sesion';

    subjectSession = new Subject<SessionEvent>();

    constructor(private http: HttpClient, private usuarioAjaxService: UsuarioAjaxService) {

    }

    private parseJwt(token: string): IToken {
       var base64url = token.split('.')[1];
       var base64 = base64url.replace(/-/g, '+').replace(/_/g, '/');
       var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
           return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
       }).join(''));

       return JSON.parse(jsonPayload);
    }

    prelogin(): Observable<IPrelogin> {
        return this.http.get<IPrelogin>(this.url + '/prelogin');
    }

    login(username: string, password: string, token: string, answer: string): Observable<IToken> {
        return this.http.post<IToken>(this.url + '/login', {username, password, token, answer});
    }

    setToken(token: string): void {
        localStorage.setItem('token', token); 
    }

    getToken(): string | null {
        return localStorage.getItem('token');
    }

    logout(): void {
        localStorage.removeItem('token');
    }

    isSessionActive(): boolean {
        let token: string | null = localStorage.getItem('token');
        if (token) {
            let decodedToken: IToken = this.parseJwt(token);
            if (Date.now() >= decodedToken.exp * 1000) {
                return false;
            } else {
                return true;
            }
        } else {
            return false;
        }
    }

    getUsername(): string {
        if (this.isSessionActive()) {
            let token: string | null = localStorage.getItem('token');
            if (!token) {
                return '';
            } else {
                return this.parseJwt(token).name;
            }
        } else {
            return '';
        }
    }

    on(): Observable<SessionEvent> {
        return this.subjectSession.asObservable();
    }

    emit(event: SessionEvent): void {
        this.subjectSession.next(event);
    }

    getSessionUser(): Observable<IUsuario> | null {
        if (this.isSessionActive()) {
            return this.usuarioAjaxService.getUsuarioByUsername(this.getUsername());
        } else {
            return null;
        }
    }

}