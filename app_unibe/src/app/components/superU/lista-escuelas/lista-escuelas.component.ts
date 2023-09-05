import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Escuela } from 'src/app/interfaces/escuela';
import { EscuelasService } from 'src/app/services/escuelas.service';

@Component({
  selector: 'app-lista-escuelas',
  templateUrl: './lista-escuelas.component.html',
  styleUrls: ['./lista-escuelas.component.scss']
})
export class ListaEscuelasComponent implements OnInit{
  cargando = false
  escuelas!: Escuela[]
  constructor(private Eservices:EscuelasService,private toastr: ToastrService) {
  
  }
  ngOnInit(): void {
    this.getlistaEscuelas()
  }

  getlistaEscuelas() {
    this.cargando=true
    this.Eservices.listaEscuelas().subscribe((data:Escuela[]) => {
      this.escuelas = data
      this.cargando=false
    })
 }
}
