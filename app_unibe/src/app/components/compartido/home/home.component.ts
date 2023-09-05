import { Component, OnInit } from '@angular/core';
import { Factura } from 'src/app/interfaces/factura';
import { FacturasService } from 'src/app/services/facturas.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  director: boolean = false;
  superU: boolean = false;
  estudiante:boolean=false
  financiero:boolean=false
  ci: string | null = localStorage.getItem('CI'); 
  estado: boolean = false;


  constructor(private fservices: FacturasService) {
    if (localStorage.getItem('ROL') === 'Director') {
      this.director = true;
    }

    if (localStorage.getItem('ROL') === 'Super Usuario') {
      this.superU = true;
    }
    if (localStorage.getItem('ROL') === 'Estudiante') {
      this.estudiante = true;
    }
    if(localStorage.getItem('ROL')=='Financiero'){
      this.financiero=true
    }
  }
  
  ngOnInit() {
  
  }
  
}