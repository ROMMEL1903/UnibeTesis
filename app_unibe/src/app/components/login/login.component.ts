import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import jwt_decode from 'jwt-decode';


interface credenciales {
  correo: string,
  clave: string
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
cargando=false
  correo: string = ''
  clave: string = ''

  constructor(private toastr: ToastrService, private uServices: UserService, private router: Router) { }
  ngOnInit(): void { }

  iniciar() {
    if (this.correo == '' || this.clave == '') {
      this.toastr.error('Todos los campos son obligatorios !', 'Upps Error!');
    }else{
      const credenciales: credenciales = {
        correo: this.correo,
        clave: this.clave
      }
  
      this.cargando=true
  
      this.uServices.login(credenciales).subscribe({
        next: (data) => {
          console.log(data)

          localStorage.setItem('TOKEN', data)
          const decodedToken = jwt_decode(data) as { rol: string };
          const decodedTokenE = jwt_decode(data) as { escuela: string };
          const decodedTokenCi = jwt_decode(data) as { cedula: string };
          const ci= decodedTokenCi.cedula
          const rol = decodedToken.rol;
          const escuela=decodedTokenE.escuela
          localStorage.setItem('ROL',rol)
          localStorage.setItem('CI',ci)
          localStorage.setItem('ESCUELA',escuela)
          this.router.navigate(['/home'])
          
        }, error: (e: HttpErrorResponse) => {
  
          if (e.error.msg) {
            this.toastr.error(e.error.msg, 'Error');
          } else {
            this.toastr.error('Upps ocurrio un error, comuniquese con el administrador', 'Error');
          }
          this.cargando=false
  
        }
      })
    }
    

  }

}
