import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Factura } from 'src/app/interfaces/factura';
import { FacturasService } from 'src/app/services/facturas.service';

@Component({
  selector: 'app-list-facturas',
  templateUrl: './list-facturas.component.html',
  styleUrls: ['./list-facturas.component.scss']
})
export class ListFacturasComponent implements OnInit{
  facturas!:Factura[]
  constructor(private fservices:FacturasService,private router:Router,private toastr: ToastrService){}

  ngOnInit(){
    this.listaFacturas()
  }


  listaFacturas(){
    this.fservices.lisatFacturas().subscribe((data:Factura[]) => {
      this.facturas = data
      console.log(this.facturas)
     
      
    })
  }
  modificar(id: number, total: number, razon: string) {
    if (total < 250 && razon === 'Carga Academica') {
      this.toastr.error('No se puede modificar la carga academica por que ya tiene financiamiento unibe', 'error');
    } else {
      this.router.navigate(['/modificar/' + id]);
    }
  }


}
