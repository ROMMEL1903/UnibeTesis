import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CargaAcademica, MateriasCarga } from '../interfaces/carga-academica';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CargasService {

  private myAppUrl: string
  private myApi: string
  constructor(private http: HttpClient) {
    this.myAppUrl = 'http://localhost:3001';
    this.myApi = '/cargasAcademicas/'
  }
  getCargas(): Observable<CargaAcademica[]> {
    return this.http.get<CargaAcademica[]>(this.myAppUrl + this.myApi + 'lista')
  }

  NuevaCarga(carga: CargaAcademica): Observable<any> {
    return this.http.post(this.myAppUrl + this.myApi + 'crearCarga', carga)

  }


  getCarga(id: number): Observable<CargaAcademica> {
    return this.http.get<CargaAcademica>(this.myAppUrl + this.myApi + id)

  }

  MateriasIntoCargas(materiasintocarga: MateriasCarga) {
    return this.http.post(this.myAppUrl + '/materiasCarga/crear', materiasintocarga)
  }

  delet(idCarga: number): Observable<void> {
    const params = new HttpParams().set('idCarga', idCarga.toString());
    const options = { params: params };

    return this.http.delete<void>(this.myAppUrl + '/materiasCarga/eliminar', options);
  }

  getMateriascarga(idCarga: number): Observable<any[]> {
    const params = new HttpParams().set('idCarga', idCarga.toString());
    const options = { params: params };
    return this.http.get<any>(this.myAppUrl + '/materiasCarga/lista', options);


  }

  deletCarga(id: number): Observable<void> {
    return this.http.delete<void>(this.myAppUrl + this.myApi + id)
  }



  actualizarC(id: number, carga: CargaAcademica): Observable<void> {

    return this.http.put<void>(this.myAppUrl + this.myApi + id, carga)



  }
  getCargasbyEscuela(escuela: string): Observable<CargaAcademica[]> {
    const params = new HttpParams()
      .set('escuela', escuela);

    return this.http.get<CargaAcademica[]>(`${this.myAppUrl}${this.myApi}/`,{ params });
  }
}