import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { finalize, tap } from 'rxjs';
import { Materia } from 'src/app/interfaces/materia';
import { MateriasService } from 'src/app/services/materias.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-list-materias',
  templateUrl: './list-materias.component.html',
  styleUrls: ['./list-materias.component.scss']
})
export class ListMateriasComponent {

cargando:boolean=false

  materias!:Materia[]
  constructor(private mservices: MateriasService,private toastr: ToastrService) {
  
  }

  ngOnInit(): void {
    this.getlistMaterias()
  }




  getlistMaterias() {
    this.cargando=true
    this.mservices.getMaterias().subscribe((data:Materia[]) => {
      this.materias = data
      console.log(this.materias)

      this.cargando=false
    })

  }

  eliminar(id: number) {
    this.cargando = true;
  
    this.mservices.elimirarM(id).pipe(
      finalize(() => {
        this.getlistMaterias();
        this.cargando = false;
        this.toastr.warning('La Materia se eleimino exitosamente')
      }),
      tap({
        error: () => {
          this.cargando = false;
        }
      })
    ).subscribe();
  }

}
