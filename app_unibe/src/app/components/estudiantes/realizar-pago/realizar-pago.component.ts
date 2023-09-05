import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Factura } from 'src/app/interfaces/factura';
import { FacturasService } from 'src/app/services/facturas.service';

@Component({
  selector: 'app-realizar-pago',
  templateUrl: './realizar-pago.component.html',
  styleUrls: ['./realizar-pago.component.scss']
})
export class RealizarPagoComponent implements OnInit {
  razon=''
  idrazon=0
  cedula=''
  fecha=''
  id=''
  nombres=''
  total=0
  descuento=0
  subtotal=0
  idFactura:number | null=null
 obternid!:string | null

generarNumeroAleatorio(): number {
  return Math.floor(Math.random() * 90000) + 10000;
}


 llamarPayphone(total:number){
  const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const stringAleatorio = Array.from({ length: 5 }, () => caracteres.charAt(Math.floor(Math.random() * caracteres.length))).join('');
  console.log('total es igula:'+total)
  window.payphone.Button({
   
    //token obtenido desde la consola de developer
    token: "kO83khezj9D2KYO5iN3bncNttryCWFcgaiG0gkR__jH95BjA1ffi2Kf2SDl_4y64MZC-FiCopPoj9ZzNgVWh9ZaR72s8EsaM4-KpmLGEBwse6zdohMUWcguejSiRqW6EydSHjRiH-SF6pWJVXKbAIc4mD6LKpl2QuEJxEZT0_teaSunLhZg3KPJGMg-3pqDglyGlxHTGL9L3M0AJXdwtblAgS1e1x83ihhHC6DQhAQwHamcUMe5pg3kczLwaXgJ39I62_JstgsJ1A6lIYNpX3XUSt6ALrUSbh0MVs7NDD3LiYtTuhHYLSUNdhVgVlqcaQrbAE5Mdje2ehhMxmjEIO0eiqyE",

    //PARÁMETROS DE CONFIGURACIÓN
    btnHorizontal: true,
    btnCard: true,

    createOrder: function (actions:any) {
      //Se ingresan los datos de la transaccion ej. monto, impuestos, etc
console.log(total,'esto es el total')
      return actions.prepare({

        amount:total*100,
        amountWithoutTax: total*100,
        currency: "USD",
        clientTransactionId: stringAleatorio,
        lang: "es"

      }).then(function (paramlog:any) {
        console.log(paramlog);
        return paramlog;
      }).catch(function (paramlog2:any) {
        console.log(paramlog2);
        return paramlog2;
      });
    },

    onComplete: function (model:any, actions:any) {
      console.log("Modelo:");
      console.log(model,'esto es el modelo');
      
      this.toastr.success(`Por favor realice el pago de su factura`, 'Realice el pago');
    }
  }).render("#pp-button");
 }

 getFactura(){
  if(this.idFactura!=null){
    this.fservices.facuraApagar(this.idFactura).subscribe((data:Factura)=>{
      console.log(data)
      this.razon=data.Razon?? ''
      this.idrazon=data.idRazon??0
      this.nombres=data.nombre??''
      this.cedula=data.ci??''
      this.fecha=data.Fecha??''
      this.descuento=data.descuentoBeca??0
      this.subtotal=data.subtotal?? 0
      this.total= data.total? Number(data.total.toFixed(2)):0

     })

  }
}
constructor(private fservices:FacturasService,
  private toastr: ToastrService,){
 
 }

ngOnInit(){

  this.obternid = localStorage.getItem('idFact');
  if (this.obternid !== null) {
    this.idFactura = +this.obternid;
    console.log(this.idFactura)
  }
  this.getFactura()
  

}



  ngAfterViewInit() {

    


  }

}
