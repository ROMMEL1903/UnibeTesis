import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Materia } from 'src/app/interfaces/materia';
import { MateriasService } from 'src/app/services/materias.service';
import { ToastrService } from 'ngx-toastr';
import { CargaAcademica, MateriasCarga } from 'src/app/interfaces/carga-academica';
import { CargasService } from 'src/app/services/cargas.service';
import { UserService } from 'src/app/services/user.service';
import { FacturasService } from 'src/app/services/facturas.service';
import { Factura } from 'src/app/interfaces/factura';
import { EscuelasService } from 'src/app/services/escuelas.service';
import { Escuela } from 'src/app/interfaces/escuela';



interface OpcionePeriodo {
  name: string;
}
@Component({
  selector: 'app-creat-carga',
  templateUrl: './creat-carga.component.html',
  styleUrls: ['./creat-carga.component.scss']
})
export class CreatCargaComponent implements OnInit {
  titulo = 'Crear Carga'
  escuela = ''
  actualizarCarga = false
  periodos!: OpcionePeriodo[]
  idCarga: number | null
  nombreEst = ''
  cargaCreada = false
  ciEstudiante = ''
  fecha = ''
  periodo!: OpcionePeriodo
  modalidad = ''
  cargando = false
  sourceMateria!: Materia[]
  targetMateria!: Materia[]
  subtotal = 0
  prueba: any[] = []
  presencial: boolean = false
  semipresencial: boolean = false
  nocturno: boolean = false
  distancia: boolean = false
  opcionpresencial: boolean = false
  opcionsemipresencial: boolean = false
  opcionnocturno: boolean = false
  opciondistancia: boolean = false
  guardarcargaFactura() {
    if (this.targetMateria.length > 10 && this.actualizarCarga == false) {

      this.toastr.error('Numero de materias invalido', 'Error');
      this.targetMateria = [];
      this.getMaterias()


      this.targetMateria = [];
      this.getMaterias()

      return;
    }
    if (this.actualizarCarga == false) {
      this.obtenerObjetosMateria()
      this.factura()
      localStorage.removeItem('idC')
      this.router.navigate(['/listaEstudiante']);
    }
    if (this.actualizarCarga == true) {
      this.actualizarMaterias()
      this.router.navigate(['/listaEstudiante']);
    }



  }

  actualizarMaterias() {
    this.cServices.getMateriascarga(this.idCarga ?? 0).subscribe((data: any[]) => {
      this.prueba = data
      console.log('eSTAS SON LAS MATERIAS' + this.prueba)
    })

  }
  getMaterias() {
    this.mServies.getMaterias().subscribe((data: Materia[]) => {
      this.sourceMateria = data
      this.targetMateria = []
      this.cdr.markForCheck()
      console.log(this.targetMateria)
    })

  }
  siguiente() {
    if ( this.periodo.name == '') {
      this.toastr.error('Todos los campos son obligatorios !', 'Upps Error!');
    } else {
      if (this.opcionpresencial == true) {
        this.modalidad='Presencial'
      } else if (this.opcionsemipresencial ==true) {
      this.modalidad='Semipresencial'
      } else if (this.opcionnocturno == true) {
        this.modalidad='Nocturno'
      } else if (this.opciondistancia == true) {
        this.modalidad='Distancia'
      }
      const carga: CargaAcademica = {
        ciEstudiante: this.ciEstudiante,
        fecha: this.fecha,
        periodo: this.periodo.name,
        escuela: localStorage.getItem('ESCUELA') ?? '',
        modalidad: this.modalidad
      }
      this.cargando = true
      this.cServices.NuevaCarga(carga).subscribe({
        next: (v) => {
          
          const Idcarga = v.cargaid
          localStorage.setItem('idC', Idcarga)
          this.cargando = false;
          this.toastr.success(`Porfavor selecciones las materias`, 'Carga Academica');
          this.cargaCreada = true
          this.getMaterias()
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
  obtenerObjetosMateria() {
    if (this.targetMateria.length > 10) {
      this.toastr.error('No se puede seleccionar más de 6 materias', 'Error');
      this.targetMateria = [];
      this.getMaterias()

      return;
    }
    if (this.targetMateria.length >= 1) {
      if(this.modalidad==='Presencial'){
        const materia1: Materia = this.targetMateria[0];
        const idCargaStr = (localStorage.getItem('idC'));
        const idCarga = idCargaStr !== null ? +idCargaStr : 0;
        const creditos = +materia1.creditos
        const valorCreditos = +materia1.ModaPresencial
        const mateia = materia1.nombre
        const totalMateria = creditos * valorCreditos
        this.subtotal = this.subtotal + totalMateria
  
        const detalleCarga1: MateriasCarga = {
          idCarga: idCarga,
          idMateria: materia1.id,
          materia: mateia,
          totalMateria: totalMateria
        }
  
  
        console.log(totalMateria)
  
        this.cServices.MateriasIntoCargas(detalleCarga1).subscribe({
          next: (v) => {
            this.toastr.success('Exito');
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
      if(this.modalidad==='Semipresencial'){
        const materia1: Materia = this.targetMateria[0];
        const idCargaStr = (localStorage.getItem('idC'));
        const idCarga = idCargaStr !== null ? +idCargaStr : 0;
        const creditos = +materia1.creditos
        const valorCreditos = +materia1.ModaSemipresencial
        const mateia = materia1.nombre
        const totalMateria = creditos * valorCreditos
        this.subtotal = this.subtotal + totalMateria
  
        const detalleCarga1: MateriasCarga = {
          idCarga: idCarga,
          idMateria: materia1.id,
          materia: mateia,
          totalMateria: totalMateria
        }
  
  
        console.log(totalMateria)
  
        this.cServices.MateriasIntoCargas(detalleCarga1).subscribe({
          next: (v) => {
            this.toastr.success('Exito');
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
      if(this.modalidad==='Nocturno'){
        const materia1: Materia = this.targetMateria[0];
        const idCargaStr = (localStorage.getItem('idC'));
        const idCarga = idCargaStr !== null ? +idCargaStr : 0;
        const creditos = +materia1.creditos
        const valorCreditos = +materia1.ModaNocturno
        const mateia = materia1.nombre
        const totalMateria = creditos * valorCreditos
        this.subtotal = this.subtotal + totalMateria
  
        const detalleCarga1: MateriasCarga = {
          idCarga: idCarga,
          idMateria: materia1.id,
          materia: mateia,
          totalMateria: totalMateria
        }
  
  
        console.log(totalMateria)
  
        this.cServices.MateriasIntoCargas(detalleCarga1).subscribe({
          next: (v) => {
            this.toastr.success('Exito');
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
      if(this.modalidad==='Distancia'){
        const materia1: Materia = this.targetMateria[0];
        const idCargaStr = (localStorage.getItem('idC'));
        const idCarga = idCargaStr !== null ? +idCargaStr : 0;
        const creditos = +materia1.creditos
        const valorCreditos = +materia1.ModaDistancia
        const mateia = materia1.nombre
        const totalMateria = creditos * valorCreditos
        this.subtotal = this.subtotal + totalMateria
  
        const detalleCarga1: MateriasCarga = {
          idCarga: idCarga,
          idMateria: materia1.id,
          materia: mateia,
          totalMateria: totalMateria
        }
  
  
        console.log(totalMateria)
  
        this.cServices.MateriasIntoCargas(detalleCarga1).subscribe({
          next: (v) => {
            this.toastr.success('Exito');
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

    if (this.targetMateria.length >= 2) {
      if(this.modalidad==='Presencial'){
        const materia1: Materia = this.targetMateria[1];
        const idCargaStr = (localStorage.getItem('idC'));
        const idCarga = idCargaStr !== null ? +idCargaStr : 0;
        const creditos = +materia1.creditos
        const valorCreditos = +materia1.ModaPresencial
        const mateia = materia1.nombre
        const totalMateria = creditos * valorCreditos
        this.subtotal = this.subtotal + totalMateria
  
        const detalleCarga1: MateriasCarga = {
          idCarga: idCarga,
          idMateria: materia1.id,
          materia: mateia,
          totalMateria: totalMateria
        }
  
  
        console.log(totalMateria)
  
        this.cServices.MateriasIntoCargas(detalleCarga1).subscribe({
          next: (v) => {
            this.toastr.success('Exito');
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
      if(this.modalidad==='Semipresencial'){
        const materia1: Materia = this.targetMateria[1];
        const idCargaStr = (localStorage.getItem('idC'));
        const idCarga = idCargaStr !== null ? +idCargaStr : 0;
        const creditos = +materia1.creditos
        const valorCreditos = +materia1.ModaSemipresencial
        const mateia = materia1.nombre
        const totalMateria = creditos * valorCreditos
        this.subtotal = this.subtotal + totalMateria
  
        const detalleCarga1: MateriasCarga = {
          idCarga: idCarga,
          idMateria: materia1.id,
          materia: mateia,
          totalMateria: totalMateria
        }
  
  
        console.log(totalMateria)
  
        this.cServices.MateriasIntoCargas(detalleCarga1).subscribe({
          next: (v) => {
            this.toastr.success('Exito');
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
      if(this.modalidad==='Nocturno'){
        const materia1: Materia = this.targetMateria[1];
        const idCargaStr = (localStorage.getItem('idC'));
        const idCarga = idCargaStr !== null ? +idCargaStr : 0;
        const creditos = +materia1.creditos
        const valorCreditos = +materia1.ModaNocturno
        const mateia = materia1.nombre
        const totalMateria = creditos * valorCreditos
        this.subtotal = this.subtotal + totalMateria
  
        const detalleCarga1: MateriasCarga = {
          idCarga: idCarga,
          idMateria: materia1.id,
          materia: mateia,
          totalMateria: totalMateria
        }
  
  
        console.log(totalMateria)
  
        this.cServices.MateriasIntoCargas(detalleCarga1).subscribe({
          next: (v) => {
            this.toastr.success('Exito');
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
      if(this.modalidad==='Distancia'){
        const materia1: Materia = this.targetMateria[1];
        const idCargaStr = (localStorage.getItem('idC'));
        const idCarga = idCargaStr !== null ? +idCargaStr : 0;
        const creditos = +materia1.creditos
        const valorCreditos = +materia1.ModaDistancia
        const mateia = materia1.nombre
        const totalMateria = creditos * valorCreditos
        this.subtotal = this.subtotal + totalMateria
  
        const detalleCarga1: MateriasCarga = {
          idCarga: idCarga,
          idMateria: materia1.id,
          materia: mateia,
          totalMateria: totalMateria
        }
  
  
        console.log(totalMateria)
  
        this.cServices.MateriasIntoCargas(detalleCarga1).subscribe({
          next: (v) => {
            this.toastr.success('Exito');
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

    if (this.targetMateria.length >= 3) {
      if(this.modalidad==='Presencial'){
        const materia1: Materia = this.targetMateria[2];
        const idCargaStr = (localStorage.getItem('idC'));
        const idCarga = idCargaStr !== null ? +idCargaStr : 0;
        const creditos = +materia1.creditos
        const valorCreditos = +materia1.ModaPresencial
        const mateia = materia1.nombre
        const totalMateria = creditos * valorCreditos
        this.subtotal = this.subtotal + totalMateria
  
        const detalleCarga1: MateriasCarga = {
          idCarga: idCarga,
          idMateria: materia1.id,
          materia: mateia,
          totalMateria: totalMateria
        }
  
  
        console.log(totalMateria)
  
        this.cServices.MateriasIntoCargas(detalleCarga1).subscribe({
          next: (v) => {
            this.toastr.success('Exito');
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
      if(this.modalidad==='Semipresencial'){
        const materia1: Materia = this.targetMateria[2];
        const idCargaStr = (localStorage.getItem('idC'));
        const idCarga = idCargaStr !== null ? +idCargaStr : 0;
        const creditos = +materia1.creditos
        const valorCreditos = +materia1.ModaSemipresencial
        const mateia = materia1.nombre
        const totalMateria = creditos * valorCreditos
        this.subtotal = this.subtotal + totalMateria
  
        const detalleCarga1: MateriasCarga = {
          idCarga: idCarga,
          idMateria: materia1.id,
          materia: mateia,
          totalMateria: totalMateria
        }
  
  
        console.log(totalMateria)
  
        this.cServices.MateriasIntoCargas(detalleCarga1).subscribe({
          next: (v) => {
            this.toastr.success('Exito');
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
      if(this.modalidad==='Nocturno'){
        const materia1: Materia = this.targetMateria[2];
        const idCargaStr = (localStorage.getItem('idC'));
        const idCarga = idCargaStr !== null ? +idCargaStr : 0;
        const creditos = +materia1.creditos
        const valorCreditos = +materia1.ModaNocturno
        const mateia = materia1.nombre
        const totalMateria = creditos * valorCreditos
        this.subtotal = this.subtotal + totalMateria
  
        const detalleCarga1: MateriasCarga = {
          idCarga: idCarga,
          idMateria: materia1.id,
          materia: mateia,
          totalMateria: totalMateria
        }
  
  
        console.log(totalMateria)
  
        this.cServices.MateriasIntoCargas(detalleCarga1).subscribe({
          next: (v) => {
            this.toastr.success('Exito');
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
      if(this.modalidad==='Distancia'){
        const materia1: Materia = this.targetMateria[2];
        const idCargaStr = (localStorage.getItem('idC'));
        const idCarga = idCargaStr !== null ? +idCargaStr : 0;
        const creditos = +materia1.creditos
        const valorCreditos = +materia1.ModaDistancia
        const mateia = materia1.nombre
        const totalMateria = creditos * valorCreditos
        this.subtotal = this.subtotal + totalMateria
  
        const detalleCarga1: MateriasCarga = {
          idCarga: idCarga,
          idMateria: materia1.id,
          materia: mateia,
          totalMateria: totalMateria
        }
  
  
        console.log(totalMateria)
  
        this.cServices.MateriasIntoCargas(detalleCarga1).subscribe({
          next: (v) => {
            this.toastr.success('Exito');
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

    if (this.targetMateria.length >= 4) {
      if(this.modalidad==='Presencial'){
        const materia1: Materia = this.targetMateria[3];
        const idCargaStr = (localStorage.getItem('idC'));
        const idCarga = idCargaStr !== null ? +idCargaStr : 0;
        const creditos = +materia1.creditos
        const valorCreditos = +materia1.ModaPresencial
        const mateia = materia1.nombre
        const totalMateria = creditos * valorCreditos
        this.subtotal = this.subtotal + totalMateria
  
        const detalleCarga1: MateriasCarga = {
          idCarga: idCarga,
          idMateria: materia1.id,
          materia: mateia,
          totalMateria: totalMateria
        }
  
  
        console.log(totalMateria)
  
        this.cServices.MateriasIntoCargas(detalleCarga1).subscribe({
          next: (v) => {
            this.toastr.success('Exito');
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
      if(this.modalidad==='Semipresencial'){
        const materia1: Materia = this.targetMateria[3];
        const idCargaStr = (localStorage.getItem('idC'));
        const idCarga = idCargaStr !== null ? +idCargaStr : 0;
        const creditos = +materia1.creditos
        const valorCreditos = +materia1.ModaSemipresencial
        const mateia = materia1.nombre
        const totalMateria = creditos * valorCreditos
        this.subtotal = this.subtotal + totalMateria
  
        const detalleCarga1: MateriasCarga = {
          idCarga: idCarga,
          idMateria: materia1.id,
          materia: mateia,
          totalMateria: totalMateria
        }
  
  
        console.log(totalMateria)
  
        this.cServices.MateriasIntoCargas(detalleCarga1).subscribe({
          next: (v) => {
            this.toastr.success('Exito');
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
      if(this.modalidad==='Nocturno'){
        const materia1: Materia = this.targetMateria[3];
        const idCargaStr = (localStorage.getItem('idC'));
        const idCarga = idCargaStr !== null ? +idCargaStr : 0;
        const creditos = +materia1.creditos
        const valorCreditos = +materia1.ModaNocturno
        const mateia = materia1.nombre
        const totalMateria = creditos * valorCreditos
        this.subtotal = this.subtotal + totalMateria
  
        const detalleCarga1: MateriasCarga = {
          idCarga: idCarga,
          idMateria: materia1.id,
          materia: mateia,
          totalMateria: totalMateria
        }
  
  
        console.log(totalMateria)
  
        this.cServices.MateriasIntoCargas(detalleCarga1).subscribe({
          next: (v) => {
            this.toastr.success('Exito');
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
      if(this.modalidad==='Distancia'){
        const materia1: Materia = this.targetMateria[3];
        const idCargaStr = (localStorage.getItem('idC'));
        const idCarga = idCargaStr !== null ? +idCargaStr : 0;
        const creditos = +materia1.creditos
        const valorCreditos = +materia1.ModaDistancia
        const mateia = materia1.nombre
        const totalMateria = creditos * valorCreditos
        this.subtotal = this.subtotal + totalMateria
  
        const detalleCarga1: MateriasCarga = {
          idCarga: idCarga,
          idMateria: materia1.id,
          materia: mateia,
          totalMateria: totalMateria
        }
  
  
        console.log(totalMateria)
  
        this.cServices.MateriasIntoCargas(detalleCarga1).subscribe({
          next: (v) => {
            this.toastr.success('Exito');
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

    if (this.targetMateria.length >= 5) {
      if(this.modalidad==='Presencial'){
        const materia1: Materia = this.targetMateria[4];
        const idCargaStr = (localStorage.getItem('idC'));
        const idCarga = idCargaStr !== null ? +idCargaStr : 0;
        const creditos = +materia1.creditos
        const valorCreditos = +materia1.ModaPresencial
        const mateia = materia1.nombre
        const totalMateria = creditos * valorCreditos
        this.subtotal = this.subtotal + totalMateria
  
        const detalleCarga1: MateriasCarga = {
          idCarga: idCarga,
          idMateria: materia1.id,
          materia: mateia,
          totalMateria: totalMateria
        }
  
  
        console.log(totalMateria)
  
        this.cServices.MateriasIntoCargas(detalleCarga1).subscribe({
          next: (v) => {
            this.toastr.success('Exito');
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
      if(this.modalidad==='Semipresencial'){
        const materia1: Materia = this.targetMateria[4];
        const idCargaStr = (localStorage.getItem('idC'));
        const idCarga = idCargaStr !== null ? +idCargaStr : 0;
        const creditos = +materia1.creditos
        const valorCreditos = +materia1.ModaSemipresencial
        const mateia = materia1.nombre
        const totalMateria = creditos * valorCreditos
        this.subtotal = this.subtotal + totalMateria
  
        const detalleCarga1: MateriasCarga = {
          idCarga: idCarga,
          idMateria: materia1.id,
          materia: mateia,
          totalMateria: totalMateria
        }
  
  
        console.log(totalMateria)
  
        this.cServices.MateriasIntoCargas(detalleCarga1).subscribe({
          next: (v) => {
            this.toastr.success('Exito');
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
      if(this.modalidad==='Nocturno'){
        const materia1: Materia = this.targetMateria[4];
        const idCargaStr = (localStorage.getItem('idC'));
        const idCarga = idCargaStr !== null ? +idCargaStr : 0;
        const creditos = +materia1.creditos
        const valorCreditos = +materia1.ModaNocturno
        const mateia = materia1.nombre
        const totalMateria = creditos * valorCreditos
        this.subtotal = this.subtotal + totalMateria
  
        const detalleCarga1: MateriasCarga = {
          idCarga: idCarga,
          idMateria: materia1.id,
          materia: mateia,
          totalMateria: totalMateria
        }
  
  
        console.log(totalMateria)
  
        this.cServices.MateriasIntoCargas(detalleCarga1).subscribe({
          next: (v) => {
            this.toastr.success('Exito');
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
      if(this.modalidad==='Distancia'){
        const materia1: Materia = this.targetMateria[4];
        const idCargaStr = (localStorage.getItem('idC'));
        const idCarga = idCargaStr !== null ? +idCargaStr : 0;
        const creditos = +materia1.creditos
        const valorCreditos = +materia1.ModaDistancia
        const mateia = materia1.nombre
        const totalMateria = creditos * valorCreditos
        this.subtotal = this.subtotal + totalMateria
  
        const detalleCarga1: MateriasCarga = {
          idCarga: idCarga,
          idMateria: materia1.id,
          materia: mateia,
          totalMateria: totalMateria
        }
  
  
        console.log(totalMateria)
  
        this.cServices.MateriasIntoCargas(detalleCarga1).subscribe({
          next: (v) => {
            this.toastr.success('Exito');
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

    if (this.targetMateria.length >= 6) {
      if(this.modalidad==='Presencial'){
        const materia1: Materia = this.targetMateria[5];
        const idCargaStr = (localStorage.getItem('idC'));
        const idCarga = idCargaStr !== null ? +idCargaStr : 0;
        const creditos = +materia1.creditos
        const valorCreditos = +materia1.ModaPresencial
        const mateia = materia1.nombre
        const totalMateria = creditos * valorCreditos
        this.subtotal = this.subtotal + totalMateria
  
        const detalleCarga1: MateriasCarga = {
          idCarga: idCarga,
          idMateria: materia1.id,
          materia: mateia,
          totalMateria: totalMateria
        }
  
  
        console.log(totalMateria)
  
        this.cServices.MateriasIntoCargas(detalleCarga1).subscribe({
          next: (v) => {
            this.toastr.success('Exito');
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
      if(this.modalidad==='Semipresencial'){
        const materia1: Materia = this.targetMateria[5];
        const idCargaStr = (localStorage.getItem('idC'));
        const idCarga = idCargaStr !== null ? +idCargaStr : 0;
        const creditos = +materia1.creditos
        const valorCreditos = +materia1.ModaSemipresencial
        const mateia = materia1.nombre
        const totalMateria = creditos * valorCreditos
        this.subtotal = this.subtotal + totalMateria
  
        const detalleCarga1: MateriasCarga = {
          idCarga: idCarga,
          idMateria: materia1.id,
          materia: mateia,
          totalMateria: totalMateria
        }
  
  
        console.log(totalMateria)
  
        this.cServices.MateriasIntoCargas(detalleCarga1).subscribe({
          next: (v) => {
            this.toastr.success('Exito');
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
      if(this.modalidad==='Nocturno'){
        const materia1: Materia = this.targetMateria[5];
        const idCargaStr = (localStorage.getItem('idC'));
        const idCarga = idCargaStr !== null ? +idCargaStr : 0;
        const creditos = +materia1.creditos
        const valorCreditos = +materia1.ModaNocturno
        const mateia = materia1.nombre
        const totalMateria = creditos * valorCreditos
        this.subtotal = this.subtotal + totalMateria
  
        const detalleCarga1: MateriasCarga = {
          idCarga: idCarga,
          idMateria: materia1.id,
          materia: mateia,
          totalMateria: totalMateria
        }
  
  
        console.log(totalMateria)
  
        this.cServices.MateriasIntoCargas(detalleCarga1).subscribe({
          next: (v) => {
            this.toastr.success('Exito');
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
      if(this.modalidad==='Distancia'){
        const materia1: Materia = this.targetMateria[5];
        const idCargaStr = (localStorage.getItem('idC'));
        const idCarga = idCargaStr !== null ? +idCargaStr : 0;
        const creditos = +materia1.creditos
        const valorCreditos = +materia1.ModaDistancia
        const mateia = materia1.nombre
        const totalMateria = creditos * valorCreditos
        this.subtotal = this.subtotal + totalMateria
  
        const detalleCarga1: MateriasCarga = {
          idCarga: idCarga,
          idMateria: materia1.id,
          materia: mateia,
          totalMateria: totalMateria
        }
  
  
        console.log(totalMateria)
  
        this.cServices.MateriasIntoCargas(detalleCarga1).subscribe({
          next: (v) => {
            this.toastr.success('Exito');
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
    if (this.targetMateria.length >= 7) {
      if(this.modalidad==='Presencial'){
        const materia1: Materia = this.targetMateria[6];
        const idCargaStr = (localStorage.getItem('idC'));
        const idCarga = idCargaStr !== null ? +idCargaStr : 0;
        const creditos = +materia1.creditos
        const valorCreditos = +materia1.ModaPresencial
        const mateia = materia1.nombre
        const totalMateria = creditos * valorCreditos
        this.subtotal = this.subtotal + totalMateria
  
        const detalleCarga1: MateriasCarga = {
          idCarga: idCarga,
          idMateria: materia1.id,
          materia: mateia,
          totalMateria: totalMateria
        }
  
  
        console.log(totalMateria)
  
        this.cServices.MateriasIntoCargas(detalleCarga1).subscribe({
          next: (v) => {
            this.toastr.success('Exito');
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
      if(this.modalidad==='Semipresencial'){
        const materia1: Materia = this.targetMateria[6];
        const idCargaStr = (localStorage.getItem('idC'));
        const idCarga = idCargaStr !== null ? +idCargaStr : 0;
        const creditos = +materia1.creditos
        const valorCreditos = +materia1.ModaSemipresencial
        const mateia = materia1.nombre
        const totalMateria = creditos * valorCreditos
        this.subtotal = this.subtotal + totalMateria
  
        const detalleCarga1: MateriasCarga = {
          idCarga: idCarga,
          idMateria: materia1.id,
          materia: mateia,
          totalMateria: totalMateria
        }
  
  
        console.log(totalMateria)
  
        this.cServices.MateriasIntoCargas(detalleCarga1).subscribe({
          next: (v) => {
            this.toastr.success('Exito');
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
      if(this.modalidad==='Nocturno'){
        const materia1: Materia = this.targetMateria[6];
        const idCargaStr = (localStorage.getItem('idC'));
        const idCarga = idCargaStr !== null ? +idCargaStr : 0;
        const creditos = +materia1.creditos
        const valorCreditos = +materia1.ModaNocturno
        const mateia = materia1.nombre
        const totalMateria = creditos * valorCreditos
        this.subtotal = this.subtotal + totalMateria
  
        const detalleCarga1: MateriasCarga = {
          idCarga: idCarga,
          idMateria: materia1.id,
          materia: mateia,
          totalMateria: totalMateria
        }
  
  
        console.log(totalMateria)
  
        this.cServices.MateriasIntoCargas(detalleCarga1).subscribe({
          next: (v) => {
            this.toastr.success('Exito');
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
      if(this.modalidad==='Distancia'){
        const materia1: Materia = this.targetMateria[6];
        const idCargaStr = (localStorage.getItem('idC'));
        const idCarga = idCargaStr !== null ? +idCargaStr : 0;
        const creditos = +materia1.creditos
        const valorCreditos = +materia1.ModaDistancia
        const mateia = materia1.nombre
        const totalMateria = creditos * valorCreditos
        this.subtotal = this.subtotal + totalMateria
  
        const detalleCarga1: MateriasCarga = {
          idCarga: idCarga,
          idMateria: materia1.id,
          materia: mateia,
          totalMateria: totalMateria
        }
  
  
        console.log(totalMateria)
  
        this.cServices.MateriasIntoCargas(detalleCarga1).subscribe({
          next: (v) => {
            this.toastr.success('Exito');
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
    if (this.targetMateria.length >= 8) {
      if(this.modalidad==='Presencial'){
        const materia1: Materia = this.targetMateria[7];
        const idCargaStr = (localStorage.getItem('idC'));
        const idCarga = idCargaStr !== null ? +idCargaStr : 0;
        const creditos = +materia1.creditos
        const valorCreditos = +materia1.ModaPresencial
        const mateia = materia1.nombre
        const totalMateria = creditos * valorCreditos
        this.subtotal = this.subtotal + totalMateria
  
        const detalleCarga1: MateriasCarga = {
          idCarga: idCarga,
          idMateria: materia1.id,
          materia: mateia,
          totalMateria: totalMateria
        }
  
  
        console.log(totalMateria)
  
        this.cServices.MateriasIntoCargas(detalleCarga1).subscribe({
          next: (v) => {
            this.toastr.success('Exito');
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
      if(this.modalidad==='Semipresencial'){
        const materia1: Materia = this.targetMateria[7];
        const idCargaStr = (localStorage.getItem('idC'));
        const idCarga = idCargaStr !== null ? +idCargaStr : 0;
        const creditos = +materia1.creditos
        const valorCreditos = +materia1.ModaSemipresencial
        const mateia = materia1.nombre
        const totalMateria = creditos * valorCreditos
        this.subtotal = this.subtotal + totalMateria
  
        const detalleCarga1: MateriasCarga = {
          idCarga: idCarga,
          idMateria: materia1.id,
          materia: mateia,
          totalMateria: totalMateria
        }
  
  
        console.log(totalMateria)
  
        this.cServices.MateriasIntoCargas(detalleCarga1).subscribe({
          next: (v) => {
            this.toastr.success('Exito');
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
      if(this.modalidad==='Nocturno'){
        const materia1: Materia = this.targetMateria[7];
        const idCargaStr = (localStorage.getItem('idC'));
        const idCarga = idCargaStr !== null ? +idCargaStr : 0;
        const creditos = +materia1.creditos
        const valorCreditos = +materia1.ModaNocturno
        const mateia = materia1.nombre
        const totalMateria = creditos * valorCreditos
        this.subtotal = this.subtotal + totalMateria
  
        const detalleCarga1: MateriasCarga = {
          idCarga: idCarga,
          idMateria: materia1.id,
          materia: mateia,
          totalMateria: totalMateria
        }
  
  
        console.log(totalMateria)
  
        this.cServices.MateriasIntoCargas(detalleCarga1).subscribe({
          next: (v) => {
            this.toastr.success('Exito');
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
      if(this.modalidad==='Distancia'){
        const materia1: Materia = this.targetMateria[7];
        const idCargaStr = (localStorage.getItem('idC'));
        const idCarga = idCargaStr !== null ? +idCargaStr : 0;
        const creditos = +materia1.creditos
        const valorCreditos = +materia1.ModaDistancia
        const mateia = materia1.nombre
        const totalMateria = creditos * valorCreditos
        this.subtotal = this.subtotal + totalMateria
  
        const detalleCarga1: MateriasCarga = {
          idCarga: idCarga,
          idMateria: materia1.id,
          materia: mateia,
          totalMateria: totalMateria
        }
  
  
        console.log(totalMateria)
  
        this.cServices.MateriasIntoCargas(detalleCarga1).subscribe({
          next: (v) => {
            this.toastr.success('Exito');
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
    if (this.targetMateria.length >= 9) {
      if(this.modalidad==='Presencial'){
        const materia1: Materia = this.targetMateria[8];
        const idCargaStr = (localStorage.getItem('idC'));
        const idCarga = idCargaStr !== null ? +idCargaStr : 0;
        const creditos = +materia1.creditos
        const valorCreditos = +materia1.ModaPresencial
        const mateia = materia1.nombre
        const totalMateria = creditos * valorCreditos
        this.subtotal = this.subtotal + totalMateria
  
        const detalleCarga1: MateriasCarga = {
          idCarga: idCarga,
          idMateria: materia1.id,
          materia: mateia,
          totalMateria: totalMateria
        }
  
  
        console.log(totalMateria)
  
        this.cServices.MateriasIntoCargas(detalleCarga1).subscribe({
          next: (v) => {
            this.toastr.success('Exito');
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
      if(this.modalidad==='Semipresencial'){
        const materia1: Materia = this.targetMateria[8];
        const idCargaStr = (localStorage.getItem('idC'));
        const idCarga = idCargaStr !== null ? +idCargaStr : 0;
        const creditos = +materia1.creditos
        const valorCreditos = +materia1.ModaSemipresencial
        const mateia = materia1.nombre
        const totalMateria = creditos * valorCreditos
        this.subtotal = this.subtotal + totalMateria
  
        const detalleCarga1: MateriasCarga = {
          idCarga: idCarga,
          idMateria: materia1.id,
          materia: mateia,
          totalMateria: totalMateria
        }
  
  
        console.log(totalMateria)
  
        this.cServices.MateriasIntoCargas(detalleCarga1).subscribe({
          next: (v) => {
            this.toastr.success('Exito');
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
      if(this.modalidad==='Nocturno'){
        const materia1: Materia = this.targetMateria[8];
        const idCargaStr = (localStorage.getItem('idC'));
        const idCarga = idCargaStr !== null ? +idCargaStr : 0;
        const creditos = +materia1.creditos
        const valorCreditos = +materia1.ModaNocturno
        const mateia = materia1.nombre
        const totalMateria = creditos * valorCreditos
        this.subtotal = this.subtotal + totalMateria
  
        const detalleCarga1: MateriasCarga = {
          idCarga: idCarga,
          idMateria: materia1.id,
          materia: mateia,
          totalMateria: totalMateria
        }
  
  
        console.log(totalMateria)
  
        this.cServices.MateriasIntoCargas(detalleCarga1).subscribe({
          next: (v) => {
            this.toastr.success('Exito');
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
      if(this.modalidad==='Distancia'){
        const materia1: Materia = this.targetMateria[8];
        const idCargaStr = (localStorage.getItem('idC'));
        const idCarga = idCargaStr !== null ? +idCargaStr : 0;
        const creditos = +materia1.creditos
        const valorCreditos = +materia1.ModaDistancia
        const mateia = materia1.nombre
        const totalMateria = creditos * valorCreditos
        this.subtotal = this.subtotal + totalMateria
  
        const detalleCarga1: MateriasCarga = {
          idCarga: idCarga,
          idMateria: materia1.id,
          materia: mateia,
          totalMateria: totalMateria
        }
  
  
        console.log(totalMateria)
  
        this.cServices.MateriasIntoCargas(detalleCarga1).subscribe({
          next: (v) => {
            this.toastr.success('Exito');
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
    if (this.targetMateria.length >= 10) {
      if(this.modalidad==='Presencial'){
        const materia1: Materia = this.targetMateria[9];
        const idCargaStr = (localStorage.getItem('idC'));
        const idCarga = idCargaStr !== null ? +idCargaStr : 0;
        const creditos = +materia1.creditos
        const valorCreditos = +materia1.ModaPresencial
        const mateia = materia1.nombre
        const totalMateria = creditos * valorCreditos
        this.subtotal = this.subtotal + totalMateria
  
        const detalleCarga1: MateriasCarga = {
          idCarga: idCarga,
          idMateria: materia1.id,
          materia: mateia,
          totalMateria: totalMateria
        }
  
  
        console.log(totalMateria)
  
        this.cServices.MateriasIntoCargas(detalleCarga1).subscribe({
          next: (v) => {
            this.toastr.success('Exito');
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
      if(this.modalidad==='Semipresencial'){
        const materia1: Materia = this.targetMateria[9];
        const idCargaStr = (localStorage.getItem('idC'));
        const idCarga = idCargaStr !== null ? +idCargaStr : 0;
        const creditos = +materia1.creditos
        const valorCreditos = +materia1.ModaSemipresencial
        const mateia = materia1.nombre
        const totalMateria = creditos * valorCreditos
        this.subtotal = this.subtotal + totalMateria
  
        const detalleCarga1: MateriasCarga = {
          idCarga: idCarga,
          idMateria: materia1.id,
          materia: mateia,
          totalMateria: totalMateria
        }
  
  
        console.log(totalMateria)
  
        this.cServices.MateriasIntoCargas(detalleCarga1).subscribe({
          next: (v) => {
            this.toastr.success('Exito');
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
      if(this.modalidad==='Nocturno'){
        const materia1: Materia = this.targetMateria[9];
        const idCargaStr = (localStorage.getItem('idC'));
        const idCarga = idCargaStr !== null ? +idCargaStr : 0;
        const creditos = +materia1.creditos
        const valorCreditos = +materia1.ModaNocturno
        const mateia = materia1.nombre
        const totalMateria = creditos * valorCreditos
        this.subtotal = this.subtotal + totalMateria
  
        const detalleCarga1: MateriasCarga = {
          idCarga: idCarga,
          idMateria: materia1.id,
          materia: mateia,
          totalMateria: totalMateria
        }
  
  
        console.log(totalMateria)
  
        this.cServices.MateriasIntoCargas(detalleCarga1).subscribe({
          next: (v) => {
            this.toastr.success('Exito');
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
      if(this.modalidad==='Distancia'){
        const materia1: Materia = this.targetMateria[9];
        const idCargaStr = (localStorage.getItem('idC'));
        const idCarga = idCargaStr !== null ? +idCargaStr : 0;
        const creditos = +materia1.creditos
        const valorCreditos = +materia1.ModaDistancia
        const mateia = materia1.nombre
        const totalMateria = creditos * valorCreditos
        this.subtotal = this.subtotal + totalMateria
  
        const detalleCarga1: MateriasCarga = {
          idCarga: idCarga,
          idMateria: materia1.id,
          materia: mateia,
          totalMateria: totalMateria
        }
  
  
        console.log(totalMateria)
  
        this.cServices.MateriasIntoCargas(detalleCarga1).subscribe({
          next: (v) => {
            this.toastr.success('Exito');
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
  }
  factura() {
    const idCargaStr = localStorage.getItem('idC');
    const idCarga = idCargaStr !== null ? +idCargaStr : 0;

    this.uServices.getUser(this.ciEstudiante).subscribe(data => {
      this.nombreEst = data.nombres;

      const factura: Factura = {
        ci: this.ciEstudiante,
        nombre: this.nombreEst,
        Fecha: new Date().toLocaleDateString(),
        Razon: 'Carga Academica',
        idRazon: idCarga,
        Beca: false,
        financiamiento: false,
        pagado: false,
        descuentoBeca: 0,
        subtotal: this.subtotal,
        total: this.subtotal
      };

      this.fservices.NuevaFactura(factura).subscribe({
        next: (v) => {
          this.cargando = false;
          this.toastr.success(`Factura Creada`, 'Factura creada');
        }, error: (e: HttpErrorResponse) => {
          this.cargando = false;
          if (e.error.msg) {
            this.toastr.error(e.error.msg, 'Error');
          } else {
            this.toastr.error('Upps ocurrió un error, comuníquese con el administrador', 'Error');
          }
        }
      });
    });
  }
  getCargaForUpdate(id: number) {
    this.cargando = true
    this.cServices.getCarga(id).subscribe((data: CargaAcademica) => {
      console.log(data)
      this.idCarga = data.id ?? 0
      this.ciEstudiante = data.ciEstudiante
      this.fecha = data.fecha
      this.periodo.name = data.periodo
      this.modalidad = data.modalidad
    })


  }
  controlarSwitch() {
    if (this.opcionpresencial == true) {
      this.opcionsemipresencial = false;
      this.opcionnocturno = false;
      this.opciondistancia = false;
    } else if (this.opcionsemipresencial ==true) {
      this.opcionpresencial = false;
      this.opcionnocturno = false;
      this.opciondistancia = false;
    } else if (this.opcionnocturno == true) {
      this.opcionpresencial = false;
      this.opcionsemipresencial = false;
      this.opciondistancia = false;
    } else if (this.opciondistancia == true) {
      this.opcionpresencial = false;
      this.opcionsemipresencial = false;
      this.opcionnocturno = false;
    }
  }
  asignarCosto(){
  }
  constructor(private Eservices: EscuelasService, private uServices: UserService, private fservices: FacturasService, private mServies: MateriasService, private cdr: ChangeDetectorRef, private toastr: ToastrService, private cServices: CargasService, private router: Router, private aRoute: ActivatedRoute) {
    this.ciEstudiante = String(aRoute.snapshot.paramMap.get('cedula'))
    const idParam = aRoute.snapshot.paramMap.get('id');
    this.idCarga = idParam !== null ? +idParam : null;
    console.log(this.idCarga)
    const escuelaValue = localStorage.getItem('ESCUELA');
    this.escuela = escuelaValue !== null ? escuelaValue : '';
  }
  ngOnInit() {
    this.fecha = new Date().toLocaleDateString()


    if (this.idCarga !== null && this.idCarga !== 0) {
      this.actualizarCarga == true
      this.titulo = 'Editar carga'
      this.getCargaForUpdate(this.idCarga);

    }
    this.periodos = [

      { name: 'ABRIL/AGOSTO' },
      { name: 'OCTUBRE/FEBRERO', },
    ];

    this.Eservices.getValoresByEscuela(this.escuela).subscribe((data: Escuela) => {
      this.presencial = data.modalidadPresencial
      this.semipresencial = data.modalidadSemipresencial
      this.nocturno = data.modalidadNocturno
      this.distancia = data.modalidadDistancia
    })
  }
}
