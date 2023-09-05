import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Materia } from '../interfaces/materia';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MateriasService {
  private myAppUrl: string
  private myApi: string
  constructor(private http: HttpClient) { 
    this.myAppUrl = 'http://localhost:3001';
    this.myApi = '/materias/'
  }

  getMaterias(): Observable<Materia[]> {

    return this.http.get<Materia[]>(this.myAppUrl + this.myApi+'lista')
  }

    NuevaMateia(materia: Materia): Observable<any> {
    return this.http.post(this.myAppUrl + this.myApi+'crearMateria', materia)

  }

  elimirarM(id: number): Observable<void> {
    return this.http.delete<void>(this.myAppUrl+this.myApi+id)
  }

  getMateria(id:number):Observable<Materia>{
    return this.http.get<Materia>(this.myAppUrl+this.myApi+id)

  }

  actualizarM(id:number,materia:Materia): Observable<void>{

    return this.http.put<void>(this.myAppUrl+this.myApi+id, materia)

    

  }

}
