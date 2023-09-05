import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { finalize, tap } from 'rxjs';
import { Factura } from 'src/app/interfaces/factura';
import { Matricula } from 'src/app/interfaces/matricula';
import { FacturasService } from 'src/app/services/facturas.service';
import { MateriasService } from 'src/app/services/materias.service';
import { MatriculasService } from 'src/app/services/matriculas.service';

@Component({
  selector: 'app-list-matriculas',
  templateUrl: './list-matriculas.component.html',
  styleUrls: ['./list-matriculas.component.scss']
})
export class ListMatriculasComponent implements OnInit {
  matricula!: Matricula[]
  constructor(private msevices: MatriculasService, private toastr: ToastrService,private fservices:FacturasService,
    private router:Router,
   ) { }
  ngOnInit() {
    this.obtenerMatriculas()
  }


  obtenerMatriculas(): void {

    const escuela=localStorage.getItem('ESCUELA')?? ''
    this.msevices.getMatriculasbyEscuela(escuela)
      .subscribe(
        (matricula: Matricula[]) => {
          this.matricula = matricula;
        },
        (error: any) => {
          console.error(error);
        }
      );
  }





  editar(id: number) {
    this.fservices.verificarEstado(id).subscribe(
      (data: Factura) => {
        if (data) {
          this.toastr.error('No se puede editar porque el estudiante ha realizado pagos en esta matricula');;
        } else {
          this.router.navigate(['/editarMatricula/'+id])
        }
      },
      (error) => {
        console.error('Ocurrió un error en la solicitud:', error);
      }
    );
  }

  eliminar(id:number){
    this.fservices.verificarEstado(id).subscribe((data:Factura)=>{
      if(data){
        this.toastr.error('No se puede eliminar la matricula por que el estudiante ya la cancelo', 'ERROR')
      }else{
        this.eliminarfactura(id)
      }
    },
    (error) => {
      console.error('Ocurrió un error en la solicitud:', error);
    })
  }

  eliminarfactura(id: number) {
    this.fservices.eliminarFacturas(id).subscribe(
      () => {
        this.eliminarMatricula(id)
        this.toastr.success('Se elimino la carga academica con exito', 'Exito');
      },
      (error) => {
  
        if (error && error.status === 400) {
          this.toastr.error('No se puede eliminar porque el estudiante ha realizado pagos en esta carga');
        } else {
          this.toastr.error('No se puede eliminar porque el estudiante ha realizado pagos en esta carga', 'Error');
        }
      }
    );
  }


  eliminarMatricula(id:number){
  this.msevices.deletMatricula(id).pipe(
    finalize(() => {
      this.getlistMaterias();
      this.toastr.warning('La Materia se eleimino exitosamente')
    }),
    tap({
      error: () => {
      }
    })
  ).subscribe();
  }
  getlistMaterias() {
    throw new Error('Method not implemented.');
  }
}
