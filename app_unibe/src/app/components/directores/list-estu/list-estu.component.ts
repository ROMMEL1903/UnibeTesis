import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { finalize, tap } from 'rxjs';
import { Table } from 'primeng/table';
import { Usuario } from 'src/app/interfaces/usuario';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-list-estu',
  templateUrl: './list-estu.component.html',
  styleUrls: ['./list-estu.component.scss']
})
export class ListEstuComponent {
  cargando = false
  usuarios:  Usuario[]=[]
  usuariosFiltrados: any[] = [];
  constructor(private usevices: UserService, private toastr: ToastrService) { }
  ngOnInit() {
    this.obtenerUsuarios()
  }

  obtenerUsuarios(): void {
    const rol = 'Estudiante';
    const escuela = localStorage.getItem('ESCUELA');

    if (rol !== null && escuela !== null) {
      this.usevices.getUsuariosByRolAndEscuela(rol, escuela)
        .subscribe(
          (usuarios: Usuario[]) => {
            this.usuarios = usuarios;
          },
          (error: any) => {
            console.error(error);
          }
        );
    }
  }

 

  filtrarUsuarios(filtro: string): void {
    if (filtro) {
      this.usuariosFiltrados = this.usuarios.filter(usuario =>
        usuario.cedula.includes(filtro)
      );
    } else {
      this.usuariosFiltrados = this.usuarios;
    }
  }

  
}
