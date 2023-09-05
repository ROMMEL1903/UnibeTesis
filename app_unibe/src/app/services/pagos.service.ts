import { Injectable } from '@angular/core';
import { Pago } from '../interfaces/pago';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PagosService {
  private myAppUrl: string
  private myApi: string
  constructor(private http: HttpClient) { 
    this.myAppUrl = 'http://localhost:3001';
    this.myApi = '/pagos/'
  }

  NuevoPago(pago: Pago): Observable<any> {
    return this.http.post(this.myAppUrl + this.myApi+'crearPago', pago)

  }
  obtenerPago(idFactrua:number): Observable<Pago>{
    const params = new HttpParams()
      .set('idFactura', idFactrua)
    
    
      return this.http.get<Pago>(`${this.myAppUrl}${this.myApi}obtenerPago`, { params });

  }

  ontenerPagos():Observable<Pago[]>{
    return this.http.get<Pago[]>(`${this.myAppUrl}${this.myApi}listaPagos`);
  }
}
