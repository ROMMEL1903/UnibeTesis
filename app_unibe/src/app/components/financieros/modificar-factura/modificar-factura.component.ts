import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Factura } from 'src/app/interfaces/factura';
import { FacturasService } from 'src/app/services/facturas.service';

@Component({
  selector: 'app-modificar-factura',
  templateUrl: './modificar-factura.component.html',
  styleUrls: ['./modificar-factura.component.scss']
})
export class ModificarFacturaComponent implements OnInit {
  finanUnibe=false
  beca=false
  fina=false
  razon = ''
  idrazon = 0
  cedula = ''
  fecha = ''
  id = ''
  nombres = ''
  total = 0
  descuento = 0
  subtotal = 0
  value2!: number
  idFactura: number | null = null
  obternid!: string | null



  obtenerFactura() {
    if (this.idFactura != null) {
      this.fservices.obtenerFacturoaDescuento(this.idFactura).subscribe((data: Factura) => {
        if (data && data.Razon == 'Carga Academica') {
          this.razon = data.Razon ?? ''
          this.idrazon = data.idRazon ?? 0
          this.nombres = data.nombre ?? ''
          this.cedula = data.ci ?? ''
          this.fina=data.financiamiento??false
          this.beca=data.Beca??false
          this.fecha = data.Fecha ?? ''
          this.descuento = data.descuentoBeca ?? 0
          this.subtotal = data.subtotal ?? 0
          this.total = data.total ?? 0
        } else {

          this.toastr.error('No se pude modificar esta factura por que ya fue pagada o es una matricula !', 'Upps Error!')
          this.router.navigate(['/listaFacturas'])

        }

      })

    }
  }

  updateFactura() {
    if (this.value2 > 0 && this.beca===false && this.fina===false) {
      const porcentaje = this.value2 / 100;
      const calcularDescuento = this.subtotal * porcentaje;
      const totalFactura = this.total - calcularDescuento;


      const calcularDescuentoAprox = calcularDescuento.toFixed(2);
      const totalFacturaAprox = totalFactura.toFixed(2);

      const factura: Factura = {
        id: this.idFactura ?? 0,
        nombre: this.nombres,
        ci: this.cedula,
        Fecha: this.fecha,
        Razon: this.razon,
        Beca:true,
        financiamiento:false,
        idRazon: this.idrazon,
        pagado: false,
        descuentoBeca: Number(calcularDescuentoAprox),
        subtotal: this.subtotal,
        total: Number(totalFacturaAprox)
      };

      this.fservices.actualizarfactura(this.idFactura ?? 0, factura).subscribe(
        () => {
          this.toastr.info('Se ha aplicado el descuento', 'Exito');

          this.router.navigate(['/listaFacturas']);
        },
        (error: HttpErrorResponse) => {

          if (error.error.msg) {
            this.toastr.error(error.error.msg, 'Error');
          } else {
            this.toastr.error('Upps ocurrió un error, comuníquese con el administrador', 'Error');
          }
        }
      );
    } else {
      if(this.value2<0){
        this.toastr.error('Para aplicar el descuento ingrese un porcentaje !', 'Upps Error!')
      }
      if(this.beca===true){
        this.toastr.error('esta factura ya tiene el descuento de beca !', 'Upps Error!')
      }
      if(this.fina===true){
        this.toastr.error('No se puede asignar una abeca a esta factura por que tiene financiamiento UNIBE!', 'Upps Error!')
      }
      
    }




  }

  finaciamiento() {
    if (this.descuento == 0&& this.fina===false && this.beca===false) {
      
      if(this.total>200){
        const total1 =+(this.total / 3).toFixed(2)
        const factura1: Factura = {
          id: this.idFactura ?? 0,
          nombre: this.nombres,
          ci: this.cedula,
          Fecha: this.fecha,
          Razon: this.razon,
          Beca:this.beca,
          financiamiento:true,
          idRazon: this.idrazon,
          pagado: false,
          descuentoBeca: this.descuento,
          subtotal:total1,
          total: total1
        };
  
        const factura2: Factura = {
          nombre: this.nombres,
          ci: this.cedula,
          Fecha: this.fecha,
          Razon: this.razon,
          idRazon: this.idrazon,
          Beca:this.beca,
          financiamiento:true,
          pagado: false,
          descuentoBeca: this.descuento,
          subtotal: total1,
          total: total1
        };
        const factura3: Factura = {
          nombre: this.nombres,
          ci: this.cedula,
          Fecha: this.fecha,
          Razon: this.razon,
          idRazon: this.idrazon,
          Beca:this.beca,
          financiamiento:true,
          pagado: false,
          descuentoBeca: this.descuento,
          subtotal: total1,
          total: total1
        };
        this.fservices.actualizarfactura(this.idFactura ?? 0, factura1).subscribe(
          () => {
          },
          (error: HttpErrorResponse) => {
  
            if (error.error.msg) {
              this.toastr.error(error.error.msg, 'Error');
            } else {
              this.toastr.error('Upps ocurrió un error, comuníquese con el administrador', 'Error');
            }
          }
        );
  
        this.fservices.NuevaFactura(factura2).subscribe({
          next: (v) => {
          }, error: (e: HttpErrorResponse) => {
            if (e.error.msg) {
              this.toastr.error(e.error.msg, 'Error');
            } else {
              this.toastr.error('Upps ocurrió un error, comuníquese con el administrador', 'Error');
            }
          }
  
        });
        this.fservices.NuevaFactura(factura3).subscribe({
          next: (v) => {
            this.toastr.success('Se aplicado el Financiamiento unibe', 'Exito')
            this.router.navigate(['/listaFacturas'])
          }, error: (e: HttpErrorResponse) => {
            if (e.error.msg) {
              this.toastr.error(e.error.msg, 'Error');
            } else {
              this.toastr.error('Upps ocurrió un error, comuníquese con el administrador', 'Error');
            }
          }
  
        });
      }else{
        this.toastr.error('El estudiante ya tiene el financiamiento UNIBE', 'Error');
   
      }
      
    } else {
      this.toastr.error('El estudiante no puede aplicar al financiamiento UNIBE por que tiene beca', 'Error');
    }
  }


  constructor(private fservices: FacturasService, private toastr: ToastrService, private aRouter: ActivatedRoute, private router: Router) {
    this.idFactura = Number(aRouter.snapshot.paramMap.get('id'))
    console.log('esto es el id:' + this.idFactura)


  }

  ngOnInit() {
    this.obtenerFactura()

  }

}
