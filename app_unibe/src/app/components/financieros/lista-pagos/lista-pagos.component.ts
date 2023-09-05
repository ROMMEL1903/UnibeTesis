import { Component, OnInit } from '@angular/core';
import { Pago } from 'src/app/interfaces/pago';
import { PagosService } from 'src/app/services/pagos.service';

@Component({
  selector: 'app-lista-pagos',
  templateUrl: './lista-pagos.component.html',
  styleUrls: ['./lista-pagos.component.scss']
})
export class ListaPagosComponent implements OnInit {


  listaPagos!:Pago[]

  obtenerPagos(){
    this.pservices.ontenerPagos().subscribe((data:Pago[]) => {
      this.listaPagos = data
      console.log(this.listaPagos)
     
      
    })
  }
  constructor(private pservices:PagosService){}
  ngOnInit(){
    this.obtenerPagos()
  }

}
