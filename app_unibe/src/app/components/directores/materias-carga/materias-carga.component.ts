import { Component, OnInit,ChangeDetectorRef } from '@angular/core';
import { Materia } from 'src/app/interfaces/materia';
import { MateriasService } from 'src/app/services/materias.service';

@Component({
  selector: 'app-materias-carga',
  templateUrl: './materias-carga.component.html',
  styleUrls: ['./materias-carga.component.scss']
})
export class MateriasCargaComponent implements OnInit{

  sourceMateria!:Materia[]
  targetMateria!:Materia[]
constructor(private mServies:MateriasService, private cdr:ChangeDetectorRef){}
ngOnInit(){
  this.mServies.getMaterias().subscribe((data:Materia[]) => {
    this.sourceMateria=data
    this.cdr.markForCheck()
    console.log(this.targetMateria)
  })
  this.targetMateria=[]



}

}
