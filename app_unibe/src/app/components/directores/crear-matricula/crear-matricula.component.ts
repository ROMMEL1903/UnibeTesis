import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Escuela } from 'src/app/interfaces/escuela';
import { Factura } from 'src/app/interfaces/factura';
import { Matricula } from 'src/app/interfaces/matricula';
import { EscuelasService } from 'src/app/services/escuelas.service';
import { FacturasService } from 'src/app/services/facturas.service';
import { MatriculasService } from 'src/app/services/matriculas.service';
import { UserService } from 'src/app/services/user.service';

interface TipoMatricula {
  name: string;
}
@Component({
  selector: 'app-crear-matricula',
  templateUrl: './crear-matricula.component.html',
  styleUrls: ['./crear-matricula.component.scss']
})
export class CrearMatriculaComponent implements OnInit {
  valorMatricualOrdinaria!:number
  valorMatricualExtraordinaria!:number
  valorMatricualEspecial!:number

  tipoMtricula!:TipoMatricula[]
  selectMatricula: TipoMatricula | undefined
  matriculaOrdinaria:boolean=false
  matriculaExtraordinaria:boolean=false
  matriculaEspecial:boolean=false
  ciEstudiante = ''
  fecha =""
  nivel!: number
  titulo='Crear Matricula'
  tituloB='Guardar'
  id=0
  escuela = ''
  constructor(private Eservices:EscuelasService, private fservices:FacturasService, private uServices:UserService, private toastr: ToastrService, private mServices: MatriculasService, private router: Router, private aRoute: ActivatedRoute) { 
    this.ciEstudiante = String(aRoute.snapshot.paramMap.get('cedula'))
    const escuelaValue = localStorage.getItem('ESCUELA');
    this.id = Number(aRoute.snapshot.paramMap.get('id'))
    this.escuela = escuelaValue !== null ? escuelaValue : '';
  }
  ngOnInit() {
  
    this.fecha = new Date().toLocaleDateString();
    if(this.id!=0){
      this.titulo='Editar Matricula'
      this.tituloB='Editar'
      this.getMatricula(this.id)
    }

    this.tipoMtricula = [
      { name: '' },
      { name: 'Matricula Ordinaria' },
      { name: 'Matricula Extraordinaria', },
      { name: 'Matricula Especial', }
    ];

    this.Eservices.getValoresByEscuela(this.escuela).subscribe((data:Escuela)=>{
      this.valorMatricualOrdinaria=data.matriculaOrdinaria,
      this.valorMatricualExtraordinaria=data.matriculaExtraordinaria,
      this.valorMatricualEspecial=data.matriculaEspecial
     })

     
   

  }
  guaradActualizar(){
    if(this.id!=0){
      this.updateMatricula()
    }else{
      this.guardar()
    }
   }
  guardar() {
    if (this.fecha == '' || this.nivel == 0 || this.selectMatricula?.name=='') {
      this.toastr.error('Todos los campos son obligatorios!', 'Upps Error!');
    } else {
      
       if(this.selectMatricula?.name=='Matricula Ordinaria'){
        const matricula: Matricula = {
          ciEstudiante: this.ciEstudiante,
          escuela: this.escuela,
          Fecha: new Date().toLocaleDateString(),
          nivel: this.nivel,
          valorMatricula: this.valorMatricualOrdinaria,
          tipoMatricula:this.selectMatricula?.name
       }
       this.crearMatricula(matricula)
       this.factura(this.valorMatricualOrdinaria)
      }
      if(this.selectMatricula?.name=='Matricula Extraordinaria'){
        const matricula: Matricula = {
          ciEstudiante: this.ciEstudiante,
          escuela: this.escuela,
          Fecha: new Date().toLocaleDateString(),
          nivel: this.nivel,
          valorMatricula: this.valorMatricualExtraordinaria,
          tipoMatricula:this.selectMatricula?.name
       }
       this.crearMatricula(matricula)
       this.factura(this.valorMatricualExtraordinaria)
      }
      if(this.selectMatricula?.name=='Matricula Especial'){
        const matricula: Matricula = {
          ciEstudiante: this.ciEstudiante,
          escuela: this.escuela,
          Fecha: new Date().toLocaleDateString(),
          nivel: this.nivel,
          valorMatricula: this.valorMatricualEspecial,
          tipoMatricula:this.selectMatricula?.name
       }
       this.crearMatricula(matricula)
       this.factura(this.valorMatricualEspecial)
      }
    }
  }
  getMatricula(id:number) {
    this.mServices.getMatricula(id).subscribe((data: Matricula) => {
      console.log(data);
      this.ciEstudiante=data.ciEstudiante ?? '',
      this.fecha=this.fecha,
      this.nivel=data.nivel ?? 0
  
      
    });
  }
  updateMatricula() {
    const matricula: Matricula = {
      id:this.id,
      ciEstudiante:this.ciEstudiante,
      Fecha:this.fecha,
      nivel:this.nivel
    };
    this.mServices.actualizarMatricula(this.id, matricula).subscribe(
      () => {
        this.toastr.info('Matricula actualizada con éxito', 'Matricula actualizada');
        this.router.navigate(['/listaMatriculas']);
      },
      (error: HttpErrorResponse) => {

        if (error.error.msg) {
          this.toastr.error(error.error.msg, 'Error');
        } else {
          this.toastr.error('Upps ocurrió un error, comuníquese con el administrador', 'Error');
        }
      }
    );
  }  
  factura(total:number) {
    const idCargaStr = localStorage.getItem('idM');
    const Idmatricula = idCargaStr !== null ? +idCargaStr : 0;
  
    this.uServices.getUser(this.ciEstudiante).subscribe(data => {
      
  
      const factura: Factura = {
        ci: this.ciEstudiante,
        nombre: data.nombres,
        Fecha: new Date().toLocaleDateString(),
        Razon: 'Matricula',
        idRazon: Idmatricula,
        Beca:false,
        financiamiento:false,
        pagado: false,
        descuentoBeca:0,
        subtotal:total,
        total:total 
      };
  
      this.fservices.NuevaFactura(factura).subscribe({
        next: (v) => {
          this.toastr.success(`Factura Creada`, 'Factura creada');
        }, error: (e: HttpErrorResponse) => {
          if (e.error.msg) {
            this.toastr.error(e.error.msg, 'Error');
          } else {
            this.toastr.error('Upps ocurrió un error, comuníquese con el administrador', 'Error');
          }
        }
      });
    });
  }

 
crearMatricula(matricula:Matricula){
  this.mServices.NuevaMateia(matricula).subscribe({
    next: (v) => {
      this.toastr.success(`La Matricula fue registrada con éxito`, 'Matricula Creada');
      const Idmatricula = v.matriculID;
      localStorage.setItem('idM', Idmatricula);
   
      this.router.navigate(['/listaEstudiante']);
    },
    error: (e: HttpErrorResponse) => {
      if (e.error.msg) {
        this.toastr.error(e.error.msg, 'Error');
      } else {
        this.toastr.error('Upps ocurrió un error, comuníquese con el administrador', 'Error');
      }
    }
  });

}
}
