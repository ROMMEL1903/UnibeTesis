import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Factura } from '../interfaces/factura';
import { Observable, firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FacturasService {
  private idFactura: number| undefined;
  private total: number | undefined;
  private apiUrl = 'https://pay.payphonetodoesposible.com/api';
  private myAppUrl: string
  private myApi: string
  private token='kO83khezj9D2KYO5iN3bncNttryCWFcgaiG0gkR__jH95BjA1ffi2Kf2SDl_4y64MZC-FiCopPoj9ZzNgVWh9ZaR72s8EsaM4-KpmLGEBwse6zdohMUWcguejSiRqW6EydSHjRiH-SF6pWJVXKbAIc4mD6LKpl2QuEJxEZT0_teaSunLhZg3KPJGMg-3pqDglyGlxHTGL9L3M0AJXdwtblAgS1e1x83ihhHC6DQhAQwHamcUMe5pg3kczLwaXgJ39I62_JstgsJ1A6lIYNpX3XUSt6ALrUSbh0MVs7NDD3LiYtTuhHYLSUNdhVgVlqcaQrbAE5Mdje2ehhMxmjEIO0eiqyE'
  constructor(private http: HttpClient) {
    this.myAppUrl = 'http://localhost:3001';
    this.myApi = '/facturas/'
  }


  lisatFacturas(): Observable<Factura[]>{
    return this.http.get<Factura[]>(this.myAppUrl + this.myApi+'listaFacturas')
  }
  NuevaFactura(factura: Factura): Observable<any> {
    return this.http.post(this.myAppUrl + this.myApi+'crearFactura', factura)

  }

  misFacturas(ciEstudiante:string):Observable<Factura[]>{
    const params = new HttpParams()
    .set('ciEstudiante', ciEstudiante)
    return this.http.get<Factura[]>(this.myAppUrl + this.myApi+'/misFacturas',{params})
  }
  miFacturasPendientes(ciEstudiante:string){
    const params = new HttpParams()
    .set('ciEstudiante', ciEstudiante)
    return this.http.get<Factura[]>(this.myAppUrl + this.myApi+'/misFacturasPendientes',{params})

  }

  facuraApagar(id:number):Observable<Factura>{
    const params = new HttpParams()
    .set('id', id)
    return this.http.get<Factura>(this.myAppUrl + this.myApi+'pagarFactura',{params})
  }

 eliminarFacturas(idRazon:number): Observable<void>{
  const params = new HttpParams().set('idRazon', idRazon.toString());
  const options = { params: params };

  return this.http.delete<void>(this.myAppUrl+this.myApi+'eliminar',options)
 }


 verificarEstado(idRazon:number):Observable<Factura>{
  const params = new HttpParams().set('idRazon', idRazon.toString());
  const options = { params: params };

  return this.http.get<Factura>(this.myAppUrl+this.myApi+'/verificarfactura',options)  
 }

 obtenerFacturoaDescuento(id:number):Observable<Factura>{
  const params = new HttpParams().set('id', id.toString());
  const options = { params: params };
  return this.http.get<Factura>(this.myAppUrl+this.myApi+'/modificarFactura',options)  
 }
  confirmaPago(id: string, clientTransactionId: string) {
    
    const data = {
      id: Number(id),
      clientTxId: clientTransactionId,
    };
    return this.http.post<any>(this.myAppUrl + this.myApi + 'confirmarPago', data);
  }

  actualizarfactura(id:number,factura:Factura): Observable<void>{

    return this.http.put<void>(this.myAppUrl+this.myApi+id, factura)
  }
  getConfirmacion(id:string,clientTransactionId:number ){
   
    return this.http.get(this.myAppUrl+this.myApi+'getConfirmacion',{
      params:{
        id: Number(id),
      clientTxId: clientTransactionId,
      }
    })

  }





}
