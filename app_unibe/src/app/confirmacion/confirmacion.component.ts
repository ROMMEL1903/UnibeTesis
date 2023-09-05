import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FacturasService } from '../services/facturas.service';
import { Pago } from '../interfaces/pago';
import { PagosService } from '../services/pagos.service';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { Factura } from '../interfaces/factura';

@Component({
  selector: 'app-confirmacion',
  templateUrl: './confirmacion.component.html',
  styleUrls: ['./confirmacion.component.scss']
})
export class ConfirmacionComponent implements OnInit {

  transactionId!: number
  idFactura!: number
  storeName!: string
  document!: string
  transactionStatus!: string
  razon = ''
  idrazon = 0
  cedula = ''
  fecha = ''
  id = ''
  nombres = ''
  total = 0
  descuento = 0
  subtotal = 0

  constructor(private router: Router,private toastr: ToastrService, private routes: ActivatedRoute, private fservices: FacturasService, private pservices: PagosService) {
  }
  ngOnInit() {
    this.idFactura = Number(localStorage.getItem('idFact'));
    this.routes.queryParams.subscribe(params => {
      const id = params['id'];
      const clientTransactionId = params['clientTransactionId'];
      this.fservices.getConfirmacion(id, clientTransactionId).subscribe((data: Pago) => {
        this.transactionId = data.transactionId ?? 0
        this.idFactura = this.idFactura
        this.storeName = data.storeName ?? ''
        this.document = data.document ?? ''
        this.transactionStatus = data.transactionStatus ?? ''
        this.crearPago()
      })
      console.log('ID:', id);
      console.log('clientTransactionId:', clientTransactionId);
    });



  }


  crearPago() {
    const pago: Pago = {
      transactionId: this.transactionId,
      idFactura: this.idFactura,
      storeName: this.storeName,
      document: this.document,
      transactionStatus: this.transactionStatus,
    };

    this.pservices.NuevoPago(pago).subscribe({
      next: (v) => {
        if (pago.transactionStatus == 'Approved') {
          this.toastr.success(`El pago fue verificado`, 'Pago verificado');
          this.actualozarFactura()

        } else {
          this.toastr.success(`Error al verificar el pago`, 'Error ');
        }

      }, error: (e: HttpErrorResponse) => {
        if (e.error.msg) {
          this.toastr.error(e.error.msg, 'Error');
        } else {
          this.toastr.error('Upps ocurrio un error, comuniquese con el administrador', 'Error');
        }

      }
    })
  }

  actualozarFactura() {
    const factura: Factura = {
      pagado: true,
    };

    this.fservices.actualizarfactura(this.idFactura ?? 0, factura).subscribe(
      () => {
        this.toastr.success('Factura actualizada con exito', 'Exito');
        this.router.navigate(['/home'])


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
  




