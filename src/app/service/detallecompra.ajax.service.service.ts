import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { API_URL } from "src/environment/environment";
import { IDetalleCompra } from "../model/model.interfaces";

@Injectable({
    providedIn: 'root'
})
export class DetalleCompraAjaxService {

    private url = API_URL + '/detalleCompra';

    constructor(private http: HttpClient) {

    }

    getDetalleCompraById(id: number): Observable<IDetalleCompra> {
        return this.http.get<IDetalleCompra>(this.url + '/' + id);
    }

    getDetalleCompraPage(page: number, size: number, sort: string, direction: string, compraId: number, camisetaId: number): Observable<IDetalleCompra> {
        return this.http.get<IDetalleCompra>(this.url + '?page=' + page + '&size=' + size + '&sort=' + sort + ',' + direction + '&compraId=' + compraId + '&camisetaId=' + camisetaId);
    }

    updateDetalleCompra(detalleCompra: IDetalleCompra): Observable<IDetalleCompra> {
        return this.http.put<IDetalleCompra>(this.url, detalleCompra);
    }

    deleteDetalleCompra(id: number | undefined): Observable<number> {
        return this.http.delete<number>(this.url + '/' + id);
    }





    


}