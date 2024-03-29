import { ICompraPage, Pageable, Sort } from './../model/model.interfaces';
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

    getCompraByUsuarioId(usuarioId: number, size: number, page: number, direction: string, sort: string): Observable<ICompraPage> {
        return this.http.get<ICompraPage>(this.url + '/usuario/' + usuarioId + '?size=' + size + '&page=' + page + '&sort=' + sort + ',' + direction);
    }

    getPageCompras(size: number, page: number, sort: string, direction: string, id_usuario: number): Observable<ICompraPage> {
        let usuario = '';
        if (id_usuario > 0) {
            usuario = '&usuario=' + id_usuario;
        }
        return this.http.get<ICompraPage>(this.url + '?size=' + size + '&page=' + page + '&sort=' + sort + ',' + direction + usuario);
    }

    getCompraRandom(): Observable<ICompra> {
        return this.http.get<ICompra>(this.url + '/random');
    }

    getComprasMasRecientes(size: number, page: number, sort: string, direction: string): Observable<ICompraPage> {
        return this.http.get<ICompraPage>(this.url + '/compras-mas-recientes?size=' + size + '&page=' + page + '&sort=' + sort + ',' + direction);
    }

    getComprasMasAntiguas(size: number, page: number, sort: string, direction: string): Observable<ICompraPage> {
        return this.http.get<ICompraPage>(this.url + '/compras-mas-antiguas?size=' + size + '&page=' + page + '&sort=' + sort + ',' + direction);
    }

    getComprasMasCarasByUsuario(usuarioId: number, size: number, page: number, sort: string, direction: string): Observable<ICompraPage> {
        return this.http.get<ICompraPage>(this.url + '/compras-mas-caras-usuario/' + usuarioId + '?size=' + size + '&page=' + page + '&sort=' + sort + ',' + direction);
    }

    getComprasMasBaratasByUsuario(usuarioId: number, size: number, page: number, sort: string, direction: string): Observable<ICompraPage> {
        return this.http.get<ICompraPage>(this.url + '/compras-mas-baratas-usuario/' + usuarioId + '?size=' + size + '&page=' + page + '&sort=' + sort + ',' + direction);
    }

    createCompraCamiseta(camisetaId: number, usuarioId: number, cantidad: number): Observable<ICompra> {
        return this.http.post<ICompra>(this.url + '/realizar-compra-camiseta/' + camisetaId + '/' + usuarioId + '/' + cantidad, {});
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