
export interface Factura {
    id?: number,
    nombre?: string,
    ci?: string,
    Fecha?: string,
    Razon?: string,
    idRazon?:number,
    Beca?:boolean,
    financiamiento?:boolean,
    descuentoBeca?:number,
    pagado?:boolean,
    subtotal?:number,
    total?:number


}