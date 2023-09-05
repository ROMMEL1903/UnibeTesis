import { Component, ElementRef, OnInit } from '@angular/core';

import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { FacturasService } from 'src/app/services/facturas.service';
import { Factura } from 'src/app/interfaces/factura';
import { ActivatedRoute, Router } from '@angular/router';
import { PagosService } from 'src/app/services/pagos.service';
import { Pago } from 'src/app/interfaces/pago';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-pagos',
  templateUrl: './pagos.component.html',
  styleUrls: ['./pagos.component.scss']
})


export class PagosComponent implements OnInit {
  pagoExiste=false
  idFactura!:string
  total!:string
  misFacturas!: Factura[]
  constructor(private http: HttpClient, 
    private Fservices: FacturasService, 
    private router:Router,
    private pServices:PagosService,
    private toastr: ToastrService,
    private routes: ActivatedRoute
    ) { }
  ngOnInit() {
    this.facturasPendientes()
    if (this.misFacturas && this.misFacturas.length < 1) {
      this.toastr.success(`No tienes facturas pendientes`);
    }
    this.routes.queryParams.subscribe(params => {
      const id = params['id'];
      const clientTransactionId = params['clientTransactionId'];

      console.log('ID:', id);
      console.log('clientTransactionId:', clientTransactionId);

      if (id !== undefined && clientTransactionId !== undefined && id !== '' && clientTransactionId !== '') {
        this.toastr.success(`Por favor espere unos minutos mientras se confirma el pago y recargue la página`, 'Pago Completado');

        this.Fservices.confirmaPago(id,clientTransactionId).subscribe(
          (response) => {
            console.log('Transacción confirmada:', response);
          },
          (error) => {
            console.error('Error al confirmar transacción:', error);
          }
        );
      }
    });
  }




  facturasPendientes() {
    const ciEstudiante = localStorage.getItem('CI');

    if (ciEstudiante !== null) {
      this.Fservices. miFacturasPendientes(ciEstudiante)
        .subscribe(
          (misFacturas: Factura[]) => {
            if(misFacturas.length<1){
              this.toastr.success(`No tienes facturas pendientes`,);
      
            }else{
              this.misFacturas = misFacturas;
            }
         
            
          },
          (error: any) => {
            console.error(error);
          }
        );
    }
  }
  preparePayment() {
    const url = 'https://pay.payphonetodoesposible.com/api/button/Prepare';
    const token = 'kO83khezj9D2KYO5iN3bncNttryCWFcgaiG0gkR__jH95BjA1ffi2Kf2SDl_4y64MZC-FiCopPoj9ZzNgVWh9ZaR72s8EsaM4-KpmLGEBwse6zdohMUWcguejSiRqW6EydSHjRiH-SF6pWJVXKbAIc4mD6LKpl2QuEJxEZT0_teaSunLhZg3KPJGMg-3pqDglyGlxHTGL9L3M0AJXdwtblAgS1e1x83ihhHC6DQhAQwHamcUMe5pg3kczLwaXgJ39I62_JstgsJ1A6lIYNpX3XUSt6ALrUSbh0MVs7NDD3LiYtTuhHYLSUNdhVgVlqcaQrbAE5Mdje2ehhMxmjEIO0eiqyE'
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    const body = {
      responseUrl: "http://localhost:4200/pagos",
      amount: 112,
      amountWithTax: 100,
      tax: 12,
      clientTransactionId: "identificadorUnico002"
    };

    this.http
      .post(url, body, {
        headers: new HttpHeaders({
          'Authorization': `Bearer ${token}`,
        })
      }).subscribe((data) => {
        console.log(data)
      })
  }

  pagar(idFactura: number) {
    const stringID: string = idFactura.toString();
    localStorage.setItem('idFact',stringID)
    this.toastr.success(`Por favor realice el pago de su factura:${idFactura}`, 'Realice el pago');
    this.router.navigate(['/realizarPago'])
       
  }


}
