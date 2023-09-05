import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Usuario } from '../../../interfaces/usuario'
import { finalize, tap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-lista-ad',
  templateUrl: './lista-ad.component.html',
  styleUrls: ['./lista-ad.component.scss']
})
export class ListaAdComponent implements OnInit {
  cargando = false
  usuarios!: Usuario[]
  constructor(private usevices: UserService,private toastr: ToastrService) {
  
   }

  ngOnInit(): void {
    this.getlistUsers()
    
  }

  getlistUsers() {
    this.cargando=true
    this.usevices.getUsers().subscribe((data:Usuario[]) => {
      this.usuarios = data
      console.log(this.usuarios)
      this.cargando=false
    })

  }

  eliminar(cedula: string) {
    this.cargando = true;
  
    this.usevices.elimirarU(cedula).pipe(
      finalize(() => {
        this.getlistUsers();
        this.cargando = false;
        this.toastr.warning('Usuario eliminado: Se elimino el usuario exitosamente')
      }),
      tap({
        error: () => {
          this.cargando = false;
        }
      })
    ).subscribe();
  }
  

}
