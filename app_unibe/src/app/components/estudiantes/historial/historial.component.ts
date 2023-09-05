import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Factura } from 'src/app/interfaces/factura';
import { FacturasService } from 'src/app/services/facturas.service';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.scss']
})
export class HistorialComponent  implements OnInit{
  titulo='Pagos pendientes'
misFacturas!:Factura[]
  constructor(private http: HttpClient, private fservices:FacturasService){}
  ngOnInit() {
    this.getMisFacturas()
  }

  getMisFacturas(){
   
    const ciEstudiante = localStorage.getItem('CI');

    if (ciEstudiante !== null ) {
      this.fservices.misFacturas(ciEstudiante)
        .subscribe(
          (misFacturas: Factura[]) => {
            this.misFacturas = misFacturas;

            if (misFacturas.length > 0) {
             this.titulo='No tienes facturas'
            } 
          },
          (error: any) => {
            console.error(error);
          }
        );
    }

  }

}
