import { Pageable, Sort } from './../model/model.interfaces';
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ICompra } from "../model/model.interfaces";
import { API_URL } from "src/environment/environment";

@Injectable({
    providedIn: 'root'
})
export class CompraAjaxService {

    private url = API_URL + '/compra';

    constructor(private http: HttpClient) {
    }

    getCompraById(id: number): Observable<ICompra> {
        return this.http.get<ICompra>(this.url + '/' + id);
    }

    getCompraByUsuarioId(usuarioId: number, page: number, size: number, direction: string, sort: string): Observable<ICompra> {
        return this.http.get<ICompra>(this.url + '/usuario/' + usuarioId + '?page=' + page + '&size=' + size + '&sort=' + sort + ',' + direction);
    }

    getPageCompras(page: number, size: number, sort: string, direction: string): Observable<ICompra> {
        return this.http.get<ICompra>(this.url + '?page=' + page + '&size=' + size + '&sort=' + sort + ',' + direction);
    }

    getCompraRandom(): Observable<ICompra> {
        return this.http.get<ICompra>(this.url + '/random');
    }

    getComprasMasRecientes(page: number, size: number, sort: string, direction: string): Observable<ICompra> {
        return this.http.get<ICompra>(this.url + '/compras-mas-recientes?page=' + page + '&size=' + size + '&sort=' + sort + ',' + direction);
    }

    getComprasMasAntiguas(page: number, size: number, sort: string, direction: string): Observable<ICompra> {
        return this.http.get<ICompra>(this.url + '/compras-mas-antiguas?page=' + page + '&size=' + size + '&sort=' + sort + ',' + direction);
    }

    getComprasMasCarasByUsuario(usuarioId: number, page: number, size: number, sort: string, direction: string): Observable<ICompra> {
        return this.http.get<ICompra>(this.url + '/compras-mas-caras-usuario/' + usuarioId + '?page=' + page + '&size=' + size + '&sort=' + sort + ',' + direction);
    }

    getComprasMasBaratasByUsuario(usuarioId: number, page: number, size: number, sort: string, direction: string): Observable<ICompra> {
        return this.http.get<ICompra>(this.url + '/compras-mas-baratas-usuario/' + usuarioId + '?page=' + page + '&size=' + size + '&sort=' + sort + ',' + direction);
    }

    createCompraUnicoCarrito(usuarioId: number, carritoId: number): Observable<ICompra> {
        return this.http.post<ICompra>(this.url + '/realizar-compra-unico-carrito/' + usuarioId + '/' + carritoId, {});
    }

    createCompraTodosCarritos(usuarioId: number): Observable<ICompra> {
        return this.http.post<ICompra>(this.url + '/realizar-compra-todos-carritos/' + usuarioId, {});
    }

    generateCompras(amount: number): Observable<number> {
        return this.http.post<number>(this.url + '/populate/' + amount, {});
    }

    deleteCompra(id: number | undefined): Observable<number> {
        return this.http.delete<number>(this.url + '/' + id);
    }

    deleteAllCompras(): Observable<number> {
        return this.http.delete<number>(this.url + '/empty');
    }

}