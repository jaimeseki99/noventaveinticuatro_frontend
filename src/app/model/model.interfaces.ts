import { HttpErrorResponse } from '@angular/common/http';

export interface Sort {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
}

export interface Pageable {
    sort: Sort;
    offset: number;
    pageSize: number;
    pageNumber: number;
    paged: boolean;
    unpaged: boolean;
}

export interface IPage<T> {
    content: T[];
    pageable: Pageable;
    totalPages: number;
    totalElements: number;
    last: boolean;
    size: number;
    number: number;
    sort: Sort;
    numberOfElements: number;
    first: boolean;
    empty: boolean;

    strSortField: string;
    strSortDirection: string;
    strFilter: string;
    strFilteredTitle: string;
    strFilteredMessage: string;
    nRecords: number;
}

export interface IEntity {
    id: number;
}

export interface IUsuario extends IEntity {
    nombre: string,
    apellido: string,
    username: string,
    email: string,
    direccion: string,
    telefono: string,
    tipo: boolean,
    contrasenya: string,
    carritos: number,
    valoraciones: number,
    compras: number
}

export interface IUsuarioPage extends IPage<IUsuario> {

}

export interface ICamiseta extends IEntity {
    titulo: string,
    talla: string,
    manga: string,
    nombre?: string,
    dorsal?: number,
    temporada: string,
    imagen?: string,
    precio: number,
    iva: number,
    descuento?: boolean,
    porcentajeDescuento?: number,
    stock: number,
    equipo: IEquipo,
    modalidad: IModalidad,
    liga: ILiga,
    valoraciones: number,
    carritos: number,
    detalleCompras: number
}

export interface ICamisetaPage extends IPage<ICamiseta> {

}

export interface ICarrito extends IEntity {
    usuario: IUsuario,
    camiseta: ICamiseta,
    cantidad: number,
    nombre?: string,
    dorsal?: number
}

export interface ICarritoPage extends IPage<ICarrito> {

}

export interface IValoracion extends IEntity {
    comentario: string,
    imagen?: string,
    fecha: Date,
    usuario: IUsuario,
    camiseta: ICamiseta,
}

export interface IValoracionPage extends IPage<IValoracion> {

}

export interface ICompra extends IEntity {
    usuario: IUsuario,
    fecha: Date,
    codigoPedido: string,
    detalleCompras: number
}

export interface ICompraPage extends IPage<ICompra> {
    
}

export interface IDetalleCompra extends IEntity {
    compra: ICompra,
    camiseta: ICamiseta,
    precio: number,
    cantidad: number,
    iva: number,
    descuento?: boolean,
    porcentajeDescuento?: number,
    nombre?: string,
    dorsal?: string
}

export interface IDetalleCompraPage extends IPage<IDetalleCompra> {

}

export interface IModalidad extends IEntity {
    nombre: string,
    imagen?: string,
    camisetas: number
}

export interface IModalidadPage extends IPage<IModalidad> {

}

export interface IEquipo extends IEntity {
    nombre: string,
    imagen?: string,
    liga: ILiga,
    camisetas: number
}

export interface IEquipoPage extends IPage<IEquipo> {

}

export interface ILiga extends IEntity {
    nombre: string,
    pais: string,
    deporte: string,
    imagen?: string,
    equipos: number,
    camisetas: number
}

export interface ILigaPage extends IPage<ILiga> {

}

export interface IPrelogin extends IEntity {
    token: string,
    captchaImage: string
}

export type formOperation = 'EDIT' | 'NEW';

export interface SessionEvent {
    type: string;
}

export interface IToken {
    jti: string,
    iss: string,
    iat: number,
    exp: number,
    name: string;
}