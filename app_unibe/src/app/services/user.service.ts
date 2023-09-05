import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Usuario } from '../interfaces/usuario';
import { Observable } from 'rxjs';


interface credenciales {
  correo: string,
  clave: string
}
interface filtro {
  rol: string,
  escuela: string
}
@Injectable({
  providedIn: 'root'
})
export class UserService {


  private myAppUrl: string
  private myApi: string



  constructor(private http: HttpClient) {
    this.myAppUrl = 'http://localhost:3001/';
    this.myApi = 'usuarios/'
  }

  singIn(usuario: Usuario): Observable<any> {
    return this.http.post(this.myAppUrl + this.myApi, usuario)

  }

  login(credenciales: credenciales): Observable<string> {
    return this.http.post<string>(this.myAppUrl + this.myApi + 'login', credenciales)
  }

  getUsers(): Observable<Usuario[]> {

    return this.http.get<Usuario[]>(this.myAppUrl + this.myApi + 'lista')
  }


  elimirarU(cedula: string): Observable<void> {
    return this.http.delete<void>(this.myAppUrl + this.myApi + cedula)
  }



  getUser(cedula: string): Observable<Usuario> {
    return this.http.get<Usuario>(this.myAppUrl + this.myApi + cedula)

  }

  actualizarU(cedula: string, usuario: Usuario): Observable<void> {

    return this.http.put<void>(this.myAppUrl + this.myApi + cedula, usuario)
  }

 
  getUsuariosByRolAndEscuela(rol: string, escuela: string): Observable<Usuario[]> {
    const params = new HttpParams()
      .set('rol', rol)
      .set('escuela', escuela);

    return this.http.get<Usuario[]>(`${this.myAppUrl}${this.myApi}get/Estudiantes`, { params });
  }
}
