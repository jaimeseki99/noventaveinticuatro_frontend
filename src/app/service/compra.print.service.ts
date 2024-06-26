import { jsPDF } from 'jspdf';
import { Injectable } from "@angular/core";
import { CompraAjaxService } from "./compra.ajax.service.service";
import { DetalleCompraAjaxService } from "./detallecompra.ajax.service.service";
import { ICompra, IDetalleCompra, IDetalleCompraPage } from "../model/model.interfaces";
import { formatDate } from "@angular/common";


@Injectable({
    providedIn: 'root'
})

export class CompraPrintService {

    constructor(
        private compraAjaxService: CompraAjaxService,
        private detalleCompraAjaxService: DetalleCompraAjaxService
    ) {

    }

    private loadImage(url: string) {
        return new Promise((resolve) => {
            let img = new Image();
            img.onload = () => resolve(img);
            img.src = url;
        })
    }

    sp = (n: number): string => n.toLocaleString('es', { minimumFractionDigits: 2, maximumFractionDigits: 2});

    printFacturaCompra = (id_compra: number): void => {
        this.compraAjaxService.getCompraById(id_compra).subscribe({
            next: (compra: ICompra) => {
                this.detalleCompraAjaxService.getDetalleCompraPageByCompraId(id_compra, 10, 0, 'id', 'asc').subscribe({
                    next: (detallesCompraPage: IDetalleCompraPage) => {
                        const detallesCompra = detallesCompraPage.content;
                        var doc = new jsPDF();
                        doc.setFont('Montserrat-VariableFont_wght', 'normal');
                        var imgData: string = '/assets/img/Captura de pantalla 2024-01-26 a las 12.35.57.png'
                        this.loadImage(imgData).then((logo) => {
                            doc = this.cabecera(doc, compra, logo);
                            doc.setFontSize(12);
                            var linea = 155;
                            let totalFactura = 0;
                            detallesCompra.forEach((detalleCompra, index) => {
                                this.lineaFactura(doc, detalleCompra, linea);
                                linea += 12;  // Increased space between lines
                                if (linea > 230 && index + 1 < detallesCompra.length) {
                                    doc.addPage();
                                    doc = this.cabecera(doc, compra, logo);
                                    linea = 155;
                                    doc.setFontSize(12);
                                }
                                totalFactura += (detalleCompra.cantidad * (detalleCompra.precio + (detalleCompra.precio * detalleCompra.iva / 100)));
                            });
                            this.endFactura(doc, linea, totalFactura, compra);
                            doc.save('Factura.pdf');
                        }).catch(error => {
                            console.error('Error al cargar el logo:', error);
                        });
                    },
                    error: (error) => {
                        console.error("Ha habido un error al obtener los detalles de la compra:", error);
                    }
                });
            },
            error: (error) => {
                console.error("Ha habido un error al obtener la compra:", error);
            }
        });
    }

    private cabecera(doc: any, compra2Print: ICompra, logo: any): any {
        const baseX = 10;
        doc.setFontSize(20);
        doc.text('Factura', 90, 30);

        doc.addImage(logo, 'PNG', 20, 40, 80, 25);

        // Apply colors from the specified palette
        doc.setTextColor(63, 53, 122);  // Using governor-bay 900
        doc.setFontSize(12);
        doc.text(`Número de Factura: ${compra2Print.codigoPedido}`, 130, 44);
        doc.text('Fecha: ' + formatDate(compra2Print.fecha, 'dd/MM/yyyy', 'es-ES'), 130, 64);

        // Client information
        doc.setFontSize(14)
        doc.text('Cliente: ', 15, 85)
        doc.setFontSize(15)
        const cliente = compra2Print?.usuario?.nombre + ' ' + compra2Print?.usuario?.apellido + ' ' + `${compra2Print?.usuario?.username}`;
        doc.text(cliente, 25, 95)
        doc.setFontSize(14)
        doc.text(compra2Print?.direccion, 25, 105)
        doc.text(compra2Print?.usuario?.email, 25, 115)

        // Issuer information
        doc.setFontSize(14)
        doc.text('Emitida por: ', 130, 85)
        doc.setFontSize(18);
        doc.text('90:24', 140, 95);
        doc.setFontSize(12);
        doc.text('noventaveinticuatro@gmail.com', 140, 105)
        doc.setFontSize(10);
        doc.text('C/ Ronaldo Messi Bryant 114', 140, 115)

        doc.line(15, 130, 195, 130);

        // Table headers
        doc.setTextColor(31, 81, 81);  // Using tradewind 900
        doc.text('Producto', 30, 140);
        doc.text('Talla', 80, 140);
        doc.text('Manga', 100, 140);
        doc.text('Cantidad', 120, 140);
        doc.text('Precio (€)', 140, 140);
        doc.text('IVA %', 160, 140);
        doc.text('Importe sin IVA', 175, 140);
        
        doc.line(15, 145, 195, 145);

        return doc;
    }

    private lineaFactura(doc: any, detalleCompra: IDetalleCompra, linea: number): void {

        doc.setFillColor(242, 251, 250);
        doc.rect(10, linea - 3,  190, 10, 'F');

        doc.setFontSize(8);
        const titulo = detalleCompra.camiseta.titulo;
        const maxLength = 30;
        if (titulo.length > maxLength) {
            const firstLine = titulo.substring(0, maxLength);
            const secondLine = titulo.substring(maxLength);
            doc.text(firstLine, 15, linea);
            doc.text(secondLine, 15, linea + 5);
            // Add an extra blank line
            doc.text('', 15, linea + 10);
        } else {
            doc.text(titulo, 15, linea);
            // Add an extra blank line
            doc.text('', 15, linea + 5);
        }

        const manga = detalleCompra.camiseta.manga === "Sin Mangas" ? "Sin" : detalleCompra.camiseta.manga;
       
        doc.setFontSize(12);
        doc.text(detalleCompra.camiseta.talla + '', 90, linea, 'right');
        doc.text(manga + '', 110, linea, 'right');
        doc.text(detalleCompra.cantidad + '', 130, linea, 'right');
        doc.text(this.sp(detalleCompra.camiseta.precio), 156, linea, 'right');
        doc.text(this.sp(detalleCompra.iva), 173, linea, 'right');
        doc.text(this.sp(detalleCompra.cantidad * detalleCompra.camiseta.precio), 194, linea, 'right');
    }

    endFactura(doc: any, linea: number, totalFactura: number, compra2Print: ICompra): void {
        doc.setFontSize(12);
        doc.line(15, linea, 195, linea);
        let xtit = 150;
        let xnum = 190;
        doc.text('Total: ', xtit, linea + 7, 'right');
        doc.text(this.sp(totalFactura) + ' €', xnum, linea + 7, 'right');
    }

}