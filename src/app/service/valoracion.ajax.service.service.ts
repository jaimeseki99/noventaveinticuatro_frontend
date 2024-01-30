import { DetalleCompraAjaxService } from './detallecompra.ajax.service.service';
import { Injectable } from "@angular/core";
import { API_URL } from "src/environment/environment";
import { IValoracion, IValoracionPage } from "../model/model.interfaces";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class ValoracionAjaxService {

    private url = API_URL + '/valoracion';

    constructor(private http: HttpClient) {
            
     }

    getValoracionById(id: number): Observable<IValoracion>{
        return this.http.get<IValoracion>(this.url + '/' + id);
    }

    getValoracionRandom(): Observable<IValoracion> {
        return this.http.get<IValoracion>(this.url + '/random');
    }

    getValoracionPage(size: number, page: number, sort: string, direction: string): Observable<IValoracionPage> {
        return this.http.get<IValoracionPage>(this.url + '?size=' + size + '&page=' + page + '&sort=' + sort + ',' + direction);
    }

    getValoracionPageByUsuario(usuarioId: number, size: number, page: number, sort: string, direction: string): Observable<IValoracionPage> {
        return this.http.get<IValoracionPage>(this.url + '/usuario/' + usuarioId + '?size=' + size + '&page=' + page + '&sort=' + sort + ',' + direction);
    }

    getValoracionPageByCamiseta(camisetaId: number, page: number, size: number, sort: string, direction: string): Observable<IValoracionPage> {
        return this.http.get<IValoracionPage>(this.url + '/camiseta/' + camisetaId + '?size=' + size + '&page=' + page + '&sort=' + sort + ',' + direction);
    }

    getValoracionByUsuarioAndCamiseta(usuarioId: number, camisetaId: number): Observable<IValoracion> {
        return this.http.get<IValoracion>(this.url + '/usuario/' + usuarioId + '/camiseta/' + camisetaId);
    }

    getValoracionesMasAntiguasByCamiseta(camisetaId: number, page: number, size: number, sort: string, direction: string): Observable<IValoracionPage> {
        return this.http.get<IValoracionPage>(this.url + '/camiseta/' + camisetaId + '/antiguas?size=' + size + '&page=' + page + '&sort=' + sort + ',' + direction);
    }

    getValoracionesMasRecientesByCamiseta(camisetaId: number, page: number, size: number, sort: string, direction: string): Observable<IValoracionPage> {
        return this.http.get<IValoracionPage>(this.url + '/camiseta/' + camisetaId + '/recientes?size=' + size + '&page=' + page + '&sort=' + sort + ',' + direction);
    }

    getValoracionesMasAntiguasByUsuario(usuarioId: number, page: number, size: number, sort: string, direction: string): Observable<IValoracionPage> {
        return this.http.get<IValoracionPage>(this.url + '/usuario/' + usuarioId + '/antiguas?size=' + size + '&page=' + page + '&sort=' + sort + ',' + direction);
    }

    getValoracionesMasRecientesByUsuario(usuarioId: number, page: number, size: number, sort: string, direction: string): Observable<IValoracionPage> {
        return this.http.get<IValoracionPage>(this.url + '/usuario/' + usuarioId + '/recientes?size=' + size + '&page=' + page + '&sort=' + sort + ',' + direction);
    }

    createValoracion(valoracion: IValoracion): Observable<IValoracion> {
        return this.http.post<IValoracion>(this.url, valoracion);
    }

    generateValoraciones(amount: number): Observable<number> {
        return this.http.post<number>(this.url + '/populate/' + amount, {});
    }

    updateValoracion(valoracion: IValoracion): Observable<IValoracion> {
        return this.http.put<IValoracion>(this.url, valoracion);
    }

    deleteValoracion(id: number | undefined): Observable<number> {
        return this.http.delete<number>(this.url + '/' + id);
    }

    deleteAllValoraciones(): Observable<number> {
        return this.http.delete<number>(this.url);
    }


}