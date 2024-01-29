import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { API_URL } from "src/environment/environment";
import { IModalidad, IModalidadPage } from "../model/model.interfaces";

@Injectable({
    providedIn: 'root'
})
export class ModalidadAjaxService {

    private url = API_URL + '/modalidad';

    constructor(private http: HttpClient) {
    }

    getModalidadById(id: number): Observable<IModalidad> {
        return this.http.get<IModalidad>(this.url + '/' + id);
    }

    getModalidadRandom(): Observable<IModalidad> {
        return this.http.get<IModalidad>(this.url + '/random');
    }

    getModalidadPage(page: number, size: number, sort: string, direction: string): Observable<IModalidadPage> {
        return this.http.get<IModalidadPage>(this.url + '?size=' + size + '&page=' + page + '&sort=' + sort + ',' + direction);
    } 

    createModalidad(modalidad: IModalidad): Observable<IModalidad> {
        return this.http.post<IModalidad>(this.url, modalidad);
    }

    generateModalidades(amount: number): Observable<number> {
        return this.http.post<number>(this.url + '/populate/' + amount, {});
    }

    updateModalidad(modalidad: IModalidad): Observable<IModalidad> {
        return this.http.put<IModalidad>(this.url, modalidad);
    }

    deleteModalidad(id: number | undefined): Observable<number> {
        return this.http.delete<number>(this.url + '/' + id);
    }

    deleteAllModalidades(): Observable<number> {
        return this.http.delete<number>(this.url + '/empty');
    }


}