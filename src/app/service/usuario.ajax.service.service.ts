import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, map } from "rxjs";
import { API_URL } from "src/environment/environment";
import { IUsuario, IUsuarioPage } from "../model/model.interfaces";
import { SassMixin } from "sass";

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

    getUsuarioIdByUsername(username: string): Observable<number | null> {
        return this.http.get<IUsuario[]>(this.url + '/username/' + username).pipe(
            map((usuarios: IUsuario[]) => {
            if (usuarios.length > 0) {
                return usuarios[0].id;
            } else {
                return null;
            }
        }));
            
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

    getUsuariosPage(size: number, page: number, sort: string, direction: string): Observable<IUsuarioPage> {
        if (!size) size = 10;
        if (!page) page = 0;
        return this.http.get<IUsuarioPage>(this.url + '?size=' + size + '&page=' + page + '&sort=' + sort + ',' + direction);
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
        return this.http.get<IUsuarioPage>(this.url + '/mas-compras?size' + size + '&page=' + page);
    }

    getUsuariosMasValoraciones(page: number, size: number): Observable<IUsuarioPage> {
        return this.http.get<IUsuarioPage>(this.url + '/mas-valoraciones?size=' + size + '&page=' + page);
    }

}