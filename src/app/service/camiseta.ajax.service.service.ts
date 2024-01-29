import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { API_URL } from "src/environment/environment";
import { ICamiseta, ICamisetaPage } from "../model/model.interfaces";

@Injectable({
    providedIn: 'root'
})
export class CamisetaAjaxService {

    private url = API_URL + '/camiseta';

    constructor(private http: HttpClient) {
    }

    getCamisetaById(id: number): Observable<ICamiseta> {
        return this.http.get<ICamiseta>(this.url + '/' + id);
    }

    getPageCamisetas(size: number, page: number,  sort: string, direction: string): Observable<ICamisetaPage> {
        if (!size) size = 10;
        if (!page) page = 0;
        return this.http.get<ICamisetaPage>(this.url + '?size=' + size +'&page=' + page + '&sort=' + sort + ',' + direction);
    }

    getCamisetaRandom(): Observable<ICamiseta> {
        return this.http.get<ICamiseta>(this.url + '/random');
    }

    getCamisetasByEquipo(equipoId: number, size: number, page: number, sort: string, direction: string): Observable<ICamisetaPage> {
        return this.http.get<ICamisetaPage>(this.url + '/equipo/' + equipoId + '?size=' + page + '&page=' + size + '&sort=' + sort + ',' + direction);
    }

    getCamisetasByModalidad(modalidadId: number, size: number, page: number, sort: string, direction: string): Observable<ICamisetaPage> {
        return this.http.get<ICamisetaPage>(this.url + '/modalidad/' + modalidadId + '?size=' + size + '&page=' + page + '&sort=' + sort + ',' + direction);
    }

    getCamisetasByLiga(ligaId: number, page: number, size: number, sort: string, direction: string): Observable<ICamisetaPage> {
        return this.http.get<ICamisetaPage>(this.url + '/liga/' + ligaId + '?size=' + size + '&page=' + page + '&sort=' + sort + ',' + direction);
    }

    getCamisetasMasVendidas(page: number, size: number): Observable<ICamisetaPage> {
        return this.http.get<ICamisetaPage>(this.url + '/mas-vendidas?page=' + page + '&size=' + size);
    }

    searchCamisetas(searchText: string, page: number, size: number, sort: string, direction: string): Observable<ICamisetaPage> {
        return this.http.get<ICamisetaPage>(this.url + '/search/' + searchText + '?page=' + page + '&size=' + size + '&sort=' + sort + ',' + direction);
    }

    getCamisetasDescuento(page: number, size: number, sort: string, direction: string): Observable<ICamisetaPage> {
        return this.http.get<ICamisetaPage>(this.url + '/descuento?size=' + size + '&page=' + page + '&sort=' + sort + ',' + direction);
    }

    getPrecioTotalCamiseta(id: number): Observable<number> {
        return this.http.get<number>(this.url + '/precio/' + id);
    }

    createCamiseta(camiseta: ICamiseta): Observable<ICamiseta> {
        return this.http.post<ICamiseta>(this.url, camiseta);
    }

    generateCamisetas(amount: number): Observable<number> {
        return this.http.post<number>(this.url + '/populate/' + amount, {});
    }

    updateCamiseta(camiseta: ICamiseta): Observable<ICamiseta> {
        return this.http.put<ICamiseta>(this.url, camiseta);
    }

    deleteCamiseta(id: number | undefined): Observable<number> {
        if (!id) return new Observable<number>();
        return this.http.delete<number>(this.url + '/' + id);
    }

    deleteAllCamisetas(): Observable<number> {
        return this.http.delete<number>(this.url + '/empty');
    }
}