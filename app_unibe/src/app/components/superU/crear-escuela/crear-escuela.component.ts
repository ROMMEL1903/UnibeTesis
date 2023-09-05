import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Escuela } from 'src/app/interfaces/escuela';
import { EscuelasService } from 'src/app/services/escuelas.service';

@Component({
  selector: 'app-crear-escuela',
  templateUrl: './crear-escuela.component.html',
  styleUrls: ['./crear-escuela.component.scss']
})
export class CrearEscuelaComponent implements OnInit {
  titulo:string='Crear Escuela'
  nombre:string=''
  Inscripcion!:number
  matriculaOrdinaria!:number
  matriculaExtraordinaria!:number
  matriculaEspecial!:number
  modalidadPresencial:boolean = false;
  modalidadSemipresencial:boolean = false;
  modalidadNocturno:boolean = false;
  modalidadDistancia:boolean = false;
  idUpdate:number=0
  tituloB='Crear'

  constructor(private toastr: ToastrService, private router: Router,private aRoute:ActivatedRoute, private Eservices:EscuelasService) {
    this.idUpdate=Number(aRoute.snapshot.paramMap.get('id'))
  }
  ngOnInit() {
    if(this.idUpdate!=0){
      this.titulo='Editar Materia'
      this.tituloB='Editar'
      this.getEscuela(this.idUpdate)

    }
  }

  guardarActualizar(){
    if(this.idUpdate!=0){
      this.updateEscuela()
    }else{
      this.guardar()
    }
   }

  guardar() {
    if (this.nombre == '' || this.Inscripcion == 0 || this.matriculaOrdinaria == 0 || this.matriculaExtraordinaria == null|| this.matriculaEspecial== null) {
      this.toastr.error('Los primeros 5 capos son necesarios !', 'Upps Error!');
    }else{
      if(this.modalidadDistancia == false && this.modalidadNocturno == false && this.modalidadPresencial == false && this.modalidadSemipresencial == false){
        this.toastr.error('Seleccione al menos una modalidad!', 'Upps Error!');
      }
      const escuela:Escuela={
        nombre:this.nombre,
        Inscripcion:this.Inscripcion,
        matriculaOrdinaria:this.matriculaOrdinaria,
        matriculaExtraordinaria:this.matriculaExtraordinaria,
        matriculaEspecial:this.matriculaEspecial,
        modalidadPresencial:this.modalidadPresencial,
        modalidadSemipresencial:this.modalidadSemipresencial,
        modalidadDistancia:this.modalidadDistancia,
        modalidadNocturno:this.modalidadNocturno
      }

      this.Eservices.NuevaEscuela(escuela).subscribe({ 
        next: (v) => {
          this.toastr.success(`La escuela ${this.nombre} fue creada con exito`, 'Usuario registrado');
          this.router.navigate(['/listaUsers']);
        }, error: (e: HttpErrorResponse) => {
          if (e.error.msg) {
            this.toastr.error(e.error.msg, 'Error');
          } else {
            this.toastr.error('Upps ocurrio un error, comuniquese con el administrador', 'Error');
          }
        
        }
      })

    }
  }

  getEscuela(id:number){
    this.Eservices.getEscuela(id).subscribe((data:Escuela)=>{
     console.log(data)
     this.nombre=data.nombre
     this.Inscripcion=data.Inscripcion
     this.matriculaOrdinaria=data.matriculaOrdinaria
     this.matriculaExtraordinaria=data.matriculaExtraordinaria
     this.matriculaEspecial=data.matriculaEspecial
     this.modalidadPresencial=data.modalidadPresencial
     this.modalidadSemipresencial=data.modalidadSemipresencial
     this.modalidadDistancia=data.modalidadDistancia
     this.modalidadNocturno=data.modalidadNocturno
    })
 }

 updateEscuela() {
  const escuela: Escuela = {
    nombre:this.nombre,
    Inscripcion:this.Inscripcion,
    matriculaOrdinaria:this.matriculaOrdinaria,
    matriculaExtraordinaria:this.matriculaExtraordinaria,
    matriculaEspecial:this.matriculaEspecial,
    modalidadPresencial:this.modalidadPresencial,
    modalidadSemipresencial:this.modalidadSemipresencial,
    modalidadDistancia:this.modalidadDistancia,
    modalidadNocturno:this.modalidadNocturno
  };



  this.Eservices.actualizarEscuela(this.idUpdate, escuela).subscribe(
    () => {
      this.toastr.info('La Escuela fue actualizada con éxito', 'Escuela actualizada');
      this.router.navigate(['/listaEscuelas']);
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


}
