import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Escuela, NombresEscuela } from '../interfaces/escuela';


@Injectable({
  providedIn: 'root'
})

export class EscuelasService {

  private myAppUrl: string
  private myApi: string
  constructor(private http: HttpClient) {
    this.myAppUrl = 'http://localhost:3001';
    this.myApi = '/escuelas/'
   }

   listaEscuelas(): Observable<Escuela[]>{
    return this.http.get<Escuela[]>(this.myAppUrl + this.myApi+'lista')
  }
  NuevaEscuela(escuela: Escuela): Observable<any> {
    return this.http.post(this.myAppUrl + this.myApi+'crearEscuela', escuela)

  }
  getEscuela(id:number):Observable<Escuela>{
    return this.http.get<Escuela>(this.myAppUrl+this.myApi+id)

  }
  actualizarEscuela(id:number,escuela:Escuela): Observable<void>{
    return this.http.put<void>(this.myAppUrl+this.myApi+id, escuela)
  }
  getNameEscuelas(): Observable<NombresEscuela[]> {
    return this.http.get<NombresEscuela[]>(this.myAppUrl+this.myApi+'nombres/escuelas')
  }

  getValoresByEscuela(nombre: string): Observable<Escuela> {
    const params = new HttpParams()
      .set('nombre', nombre)
    return this.http.get<Escuela>(`${this.myAppUrl}${this.myApi}valores/escuela`, { params });
  }
}
