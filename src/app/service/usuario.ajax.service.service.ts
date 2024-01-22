import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { API_URL } from "src/environment/environment";
import { IUsuario, IUsuarioPage } from "../model/model.interfaces";

@Injectable({
    providedIn: 'root'
})
export class UsuarioAjaxService {
    
    url: string = API_URL + '/usuario';

    constructor(private http: HttpClient) {
    }

    getUsuarioById(id: number): Observable<IUsuario> {
        return this.http.get<IUsuario>(this.url + '/' + id);
    }

    getUsuarioByUsername(username: string): Observable<IUsuario> {
        return this.http.get<IUsuario>(this.url + '/username/' + username);
    }

    createUsuario(usuario: IUsuario): Observable<IUsuario> {
        return this.http.post<IUsuario>(this.url, usuario);
    }

    updateUsuario(usuario: IUsuario): Observable<IUsuario> {
        return this.http.put<IUsuario>(this.url, usuario);
    }

    deleteUsuario(id: number | undefined): Observable<number> {
        return this.http.delete<number>(this.url + '/' + id);
    }

    getUsuariosPage(page: number, size: number, sort: string, direction: string): Observable<IUsuarioPage> {
        return this.http.get<IUsuarioPage>(this.url + '?page=' + page + '&size=' + size + '&sort=' + sort + ',' + direction);
    }

    getUsuarioRandom(): Observable<IUsuario> {
        return this.http.get<IUsuario>(this.url + '/random');
    }

    generateUsuarios(amount: number): Observable<number> {
        return this.http.post<number>(this.url + '/populate/' + amount, {});
    }

    deleteAllUsuarios(): Observable<number> {
        return this.http.delete<number>(this.url + '/empty');
    }

    getUsuariosMasCompras(page: number, size: number): Observable<IUsuarioPage> {
        return this.http.get<IUsuarioPage>(this.url + '/mas-compras?page=' + page + '&size=' + size);
    }

    getUsuariosMasValoraciones(page: number, size: number): Observable<IUsuarioPage> {
        return this.http.get<IUsuarioPage>(this.url + '/mas-valoraciones?page=' + page + '&size=' + size);
    }

}