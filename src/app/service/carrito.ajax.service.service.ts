import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { API_URL } from "src/environment/environment";
import { ICarrito, ICarritoPage } from "../model/model.interfaces";

@Injectable({
    providedIn: 'root'
})
export class CarritoAjaxService {

    private url = API_URL + '/carrito';

    constructor(private http: HttpClient) {
    }

    getCarritoById(id: number): Observable<ICarrito> {
        return this.http.get<ICarrito>(this.url + '/' + id);
    }

    getCarritosByUsuario(usuarioId: number, size: number, page: number, sort: string, direction: string): Observable<ICarritoPage> {
        return this.http.get<ICarritoPage>(this.url + '/usuario/' + usuarioId + '?size=' + size + '&page=' + page + '&sort=' + sort + ',' + direction);
    }

    getCarritoByUsuarioAndCamiseta(usuarioId: number, camisetaId: number): Observable<ICarrito> {
        return this.http.get<ICarrito>(this.url + '/usuario/' + usuarioId + '/camiseta/' + camisetaId);
    }

    getPageCarritos(page: number, size: number, sort: string, direction: string): Observable<ICarritoPage> {
        return this.http.get<ICarritoPage>(this.url + '?size=' + size + '&page=' + page + '&sort=' + sort + ',' + direction);
    }

    getCosteCarrito(id: number): Observable<number> {
        return this.http.get<number>(this.url + '/coste/' + id);
    }

    getCosteCarritoByUsuario(usuarioId: number): Observable<number> {
        return this.http.get<number>(this.url + '/costetotal/' + usuarioId);
    }

    createCarrito(carrito: ICarrito): Observable<ICarrito> {
        return this.http.post<ICarrito>(this.url, carrito, {});
    }

    generateCarritos(amount: number): Observable<number> {
        return this.http.post<number>(this.url + '/populate/' + amount, {});
    }

    updateCarrito(carrito: ICarrito): Observable<ICarrito> {
        return this.http.put<ICarrito>(this.url, carrito);
    }

    deleteCarrito(id: number | undefined): Observable<number> {
        return this.http.delete<number>(this.url + '/' + id);
    }

    deleteCarritoByUsuario(usuarioId: number): Observable<number> {
        return this.http.delete<number>(this.url + '/usuario/' + usuarioId);
    }

    deleteAllCarritos(): Observable<number> {
        return this.http.delete<number>(this.url + '/empty');
    }

    




}