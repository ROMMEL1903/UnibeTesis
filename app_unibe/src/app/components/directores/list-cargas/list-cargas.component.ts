import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable, finalize, tap } from 'rxjs';
import { CargaAcademica, MateriasCarga } from 'src/app/interfaces/carga-academica';
import { CargasService } from 'src/app/services/cargas.service';
import { FacturasService } from 'src/app/services/facturas.service';

@Component({
  selector: 'app-list-cargas',
  templateUrl: './list-cargas.component.html',
  styleUrls: ['./list-cargas.component.scss']
})
export class ListCargasComponent implements OnInit {
  materiasCarga!:MateriasCarga[]
  dialogVisible: boolean = false;
  cargas!: CargaAcademica[];
  constructor(private cServices: CargasService, private Fservices: FacturasService, private toastr: ToastrService) { }
  ngOnInit() {
    this.obtenerCargas()
  }

  eliminar(id: number) {
    this.Fservices.eliminarFacturas(id).subscribe(
      () => {
        this.toastr.success('Se elimino la carga academica con exito', 'Exito');
        this.eliminarMateriasCarga(id)

      },
      (error) => {
        // En caso de error
        if (error && error.status === 400) {
          this.toastr.error('No se puede eliminar porque el estudiante ha realizado pagos en esta carga');
        } else {
          this.toastr.error('No se puede eliminar porque el estudiante ha realizado pagos en esta carga', 'Error');
        }
      }
    );
  }


  eliminarMateriasCarga(idCarga: number) {
    this.cServices.delet(idCarga).subscribe(
      () => {
        this.eliminarCarga(idCarga)
       

      },
      (error) => {
        // En caso de error
        if (error && error.status === 400) {
       
        } else {
     
        }
      }
    );
  }

  eliminarCarga(id:number){
    this.cServices.deletCarga(id).subscribe(
      () => {
        this.obtenerCargas()

      },
      (error) => {
        // En caso de error
        if (error && error.status === 400) {

        } else {
       
        }
      }
    );
  }

  obtenerCargas(): void {

    const escuela=localStorage.getItem('ESCUELA')?? ''
    this.cServices.getCargasbyEscuela(escuela)
      .subscribe(
        (listcargas: CargaAcademica[]) => {
          this.cargas = listcargas;

          console.log(this.cargas)
        },
        (error: any) => {
          console.error(error);
        }
      );

  }
  showDialog(id:number) {
    this.obtenerMaterias(id)
    this.dialogVisible = true;
}
  obtenerMaterias(id:number):any{
    this.cServices.getMateriascarga(id).subscribe(
      (materiasCarga: MateriasCarga[]) => {
        this.materiasCarga=materiasCarga;

        console.log(this.cargas)
      },
      (error: any) => {
        console.error(error);
      }
    );


  }

}
