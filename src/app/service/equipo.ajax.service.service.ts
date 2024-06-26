import { AdminLigaNewRoutedComponent } from './../components/liga/admin-liga-new-routed/admin-liga-new-routed.component';
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { API_URL } from "src/environment/environment";
import { IEquipo, IEquipoPage } from "../model/model.interfaces";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class EquipoAjaxService {
    
    private url = API_URL + '/equipo';

    constructor(private http: HttpClient) {
    }

    getEquipoById(id: number): Observable<IEquipo> {
        return this.http.get<IEquipo>(this.url + '/' + id);
    }

    getEquipoRandom(): Observable<IEquipo> {
        return this.http.get<IEquipo>(this.url + '/random');
    }

    getEquiposPage(size: number, page: number, sort: string, direction: string, id_liga: number, filtro_string?: string): Observable<IEquipoPage> {
        let liga = "";
        if (id_liga > 0) {
            liga = "&liga=" + id_liga;
        }
        let filtro: string;
        if (filtro_string && filtro_string.trim().length > 0) {
            filtro = `&filtro=${filtro_string}`;
        } else {
            filtro = ""
        }
        return this.http.get<IEquipoPage>(this.url + '?size=' + size + '&page=' + page + '&sort=' + sort + ',' + direction + liga + filtro);
    }

    getEquiposByLiga(ligaId: number, page: number, size: number, sort: string, direction: string): Observable<IEquipoPage> {
        return this.http.get<IEquipoPage>(this.url + '/liga/' + ligaId + '?size=' + size + '&page=' + page + '&sort=' + sort + ',' + direction);
    }

    createEquipo(equipo: IEquipo): Observable<IEquipo> {
        return this.http.post<IEquipo>(this.url, equipo);
    }

    generateEquipos(amount: number): Observable<number> {
        return this.http.post<number>(this.url + '/populate/' + amount, {});
    }

    updateEquipo(equipo: IEquipo): Observable<IEquipo> {
        return this.http.put<IEquipo>(this.url, equipo);
    }

    deleteEquipo(id: number | undefined): Observable<number> {
        return this.http.delete<number>(this.url + '/' + id);
    }

    deleteAllEquipos(): Observable<number> {
        return this.http.delete<number>(this.url + '/empty');
    }



}