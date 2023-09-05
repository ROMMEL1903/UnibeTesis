import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Usuario } from 'src/app/interfaces/usuario';
import { MateriasService } from 'src/app/services/materias.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-crear-est',
  templateUrl: './crear-est.component.html',
  styleUrls: ['./crear-est.component.scss']
})
export class CrearEstComponent implements OnInit {
  nombres = ''
  cedula = ''
  correo = ''
  clave = ''

  cargando = false
  priemerI!: boolean
  titulo = 'Crear Estudiante'
  tituloB = 'Crear'
  idUpdate: number = 0
  ci: string = ''
  selectRol=''
  selectescuela=''


  constructor(private toastr: ToastrService, private uServices: UserService, private router: Router, private aRoute: ActivatedRoute) {
    this.ci = String(aRoute.snapshot.paramMap.get('cedula'))
  }

  ngOnInit() {

    if(this.ci!='null'){
      this.titulo='Editar Usuario'
      this.tituloB='Editar'
      this.getUsuario(this.ci)

    }
   

  }
  guaradActualizar(){
    if(this.ci!='null'){
      this.updateU()
    }else{
      this.guardar()
    }
    
  }



  guardar() {
    if (this.nombres == '' || this.correo == '' || this.cedula == '' || this.clave == '') {
      this.toastr.error('Todos los campos son obligatorios !', 'Upps Error!');
    } else {
      const usuario: Usuario = {
        cedula: this.cedula,
        nombres: this.nombres,
        rol: 'Estudiante',
        escuela: localStorage.getItem('ESCUELA') || '',
        correo: this.correo,
        clave: this.clave,
        primer_Inicio: true,

      }

      this.cargando = true

      this.uServices.singIn(usuario).subscribe({
        next: (v) => {
          this.cargando = false;
          this.toastr.success(`El estudiante ${this.cedula} fue registrado con exito`, 'Usuario registrado');
          this.router.navigate(['/listaEstudiante']);
        }, error: (e: HttpErrorResponse) => {
          this.cargando = false;
          if (e.error.msg) {
            this.toastr.error(e.error.msg, 'Error');
          } else {
            this.toastr.error('Upps ocurrio un error, comuniquese con el administrador', 'Error');
          }

        }
      })
    }
  }

  

  getUsuario(cedula: string) {
    this.cargando = true;
    this.uServices.getUser(cedula).subscribe((data: Usuario) => {
      console.log(data);
      this.cargando = false;
      this.cedula = data.cedula;
      this.nombres = data.nombres;
      this.correo = data.correo;
      this.clave = data.clave;
      this.selectRol=data.rol
      this.selectescuela=data.escuela
      this.priemerI = data.primer_Inicio;
  
      
    });
  }

  updateU() {
    const usuario: Usuario = {
      cedula: this.cedula,
      nombres: this.nombres,
      correo:this.correo,
      rol: 'Estudiante',
      escuela: localStorage.getItem('ESCUELA') || '',
      clave: this.clave,
      primer_Inicio: this.priemerI
    };
  
    this.cargando = true;
  
    this.uServices.actualizarU(this.ci, usuario).subscribe(
      () => {
        this.toastr.info('El Estudiante fue actualizado con éxito', 'Estudiante actualizado');
        this.cargando = false;
        this.router.navigate(['/listaEstudiante']);
      },
      (error: HttpErrorResponse) => {
        this.cargando = false;
        if (error.error.msg) {
          this.toastr.error(error.error.msg, 'Error');
        } else {
          this.toastr.error('Upps ocurrió un error, comuníquese con el administrador', 'Error');
        }
      }
    );
  }

}
