import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { API_URL } from "src/environment/environment";
import { ILiga, ILigaPage } from "../model/model.interfaces";

@Injectable({
    providedIn: 'root'
})
export class LigaAjaxService {

    private url = API_URL + '/liga';

    constructor(private http: HttpClient) {

    }

    getLigaById(id: number): Observable<ILiga> {
        return this.http.get<ILiga>(this.url + '/' + id);
    }

    getLigaRandom(): Observable<ILiga> {
        return this.http.get<ILiga>(this.url + '/random');
    }

    getLigaPage(page: number, size: number, sort: string, direction: string): Observable<ILigaPage> {
        return this.http.get<ILigaPage>(this.url + '?page=' + page + '&size=' + size + '&sort=' + sort + ',' + direction);
    }

    createLiga(liga: ILiga): Observable<ILiga> {
        return this.http.post<ILiga>(this.url, liga);
    }

    generateLigas(amount: number): Observable<number> {
        return this.http.post<number>(this.url + '/populate/' + amount, {});
    }

    updateLiga(liga: ILiga): Observable<ILiga> {
        return this.http.put<ILiga>(this.url, liga);
    }

    deleteLiga(id: number | undefined): Observable<number> {
        return this.http.delete<number>(this.url + '/' + id);
    }

    deleteAllLigas(): Observable<number> {
        return this.http.delete<number>(this.url + '/empty');
    }
    
}