import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Matricula } from '../interfaces/matricula';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MatriculasService {
  private myAppUrl: string
  private myApi: string
  constructor(private http: HttpClient) { 
    this.myAppUrl = 'http://localhost:3001';
    this.myApi = '/matriculas/'
  }
  NuevaMateia(matricula: Matricula): Observable<any> {
    return this.http.post(this.myAppUrl + this.myApi+'crearMatricula', matricula)

  }

  getMatriculas(): Observable<Matricula[]> {

    return this.http.get<Matricula[]>(this.myAppUrl + this.myApi+'listaMatriculas')
  }
  getMatricula(id:number):Observable<Matricula>{
    return this.http.get<Matricula>(this.myAppUrl+this.myApi+id)

  }
  actualizarMatricula(id:number,matricula:Matricula): Observable<void>{

    return this.http.put<void>(this.myAppUrl+this.myApi+'editarMatricula/'+id, matricula)
  }

  deletMatricula(id:number): Observable<void> {
    return this.http.delete<void>(this.myAppUrl+this.myApi+id)
  }

  getMatriculasbyEscuela(escuela: string): Observable<Matricula[]> {
    const params = new HttpParams()
      .set('escuela', escuela);

    return this.http.get<Matricula[]>(`${this.myAppUrl}${this.myApi}/`,{ params });
  }

}
