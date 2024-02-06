import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { API_URL } from "src/environment/environment";
import { IDetalleCompra, IDetalleCompraPage } from "../model/model.interfaces";

@Injectable({
    providedIn: 'root'
})
export class DetalleCompraAjaxService {

    private url = API_URL + '/detallecompra';

    constructor(private http: HttpClient) {

    }

    getDetalleCompraById(id: number): Observable<IDetalleCompra> {
        return this.http.get<IDetalleCompra>(this.url + '/' + id);
    }

    getDetalleCompraPage(size: number, page: number, sort: string, direction: string, camisetaId: number, compraId: number): Observable<IDetalleCompraPage> {
        return this.http.get<IDetalleCompraPage>(this.url + '?size=' + size + '&page=' + page + '&sort=' + sort + ',' + direction + '&camisetaId=' + camisetaId + '&compraId=' + compraId);
    }

    getDetalleCompraPageByCompraId(id_compra: number, size: number, page: number, sort: string, direction: string): Observable<IDetalleCompraPage> {
        return this.http.get<IDetalleCompraPage>(this.url + '/byCompra/' + id_compra + '?size=' + size + '&page=' + page + '&sort=' + sort + ',' + direction);
    }

    updateDetalleCompra(detalleCompra: IDetalleCompra): Observable<IDetalleCompra> {
        return this.http.put<IDetalleCompra>(this.url, detalleCompra);
    }

    deleteDetalleCompra(id: number | undefined): Observable<number> {
        return this.http.delete<number>(this.url + '/' + id);
    }





    


}