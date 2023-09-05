import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  superU=false
  director=false
  financiero=false
  estudiante=false
itmeFinanciero:MenuItem[]|undefined
  itemsSuperU: MenuItem[] | undefined;
  itemsDirector:MenuItem[]| undefined
  itemsEstudiante:MenuItem[]|undefined


  constructor(private reuter: Router){
    if(localStorage.getItem('ROL')==='Super Usuario'){
      this.superU=true
    }

    if(localStorage.getItem('ROL')==='Director'){
      this.director=true
    }

    if(localStorage.getItem('ROL')==='Estudiante'){
      this.estudiante=true
    }
    if(localStorage.getItem('ROL')==='Financiero'){
      this.financiero=true
    }

  }
  
  ngOnInit() {
    this.itemsSuperU = [
      {
        label: 'Home',
        icon: 'pi pi-fw pi-home',
        routerLink:'/home'

      },
      {
        label: 'Materias',
        icon: 'pi pi-fw pi-folder',
        items: [
          {
            label: 'Crear',
            icon: 'pi pi-fw pi-plus',
            routerLink:'/nuevaMateria'
          },
          {
            label: 'Ver',
            icon: 'pi pi-fw pi-folder-open',
            routerLink:'/ListaMaterias'
        
          }
        ]
      },
      {
        label: 'Usuarios',
        icon: 'pi pi-fw pi-user',
        items: [
          {
            label: 'Crear',
            icon: 'pi pi-fw pi-user-plus',
            routerLink:'/crear'
          },
          {
            label: 'Listado',
            icon: 'pi pi-fw pi-users',
            routerLink:'/listaUsers'
          }
        ]
      },
      {
        label: 'Escuelas',
        icon: 'pi pi-book',
        items: [
          {
            label: 'Crear',
            icon: 'pi pi-plus',
            routerLink:'/CrearEscuela'
          },
          {
            label: 'Listado',
            icon: 'pi pi-align-justify',
            routerLink:'/listaEscuelas'
          }
        ]
      },
    
    ];


    this.itemsDirector=[
      {
        label: 'Home',
        icon: 'pi pi-fw pi-home',
        routerLink:'/home'

      },
      {
        label: 'Estudiantes',
        icon: 'pi pi-fw pi-id-card',
        items: [
          {
            label: 'Crear',
            icon: 'pi pi-fw pi-user-plus',
            routerLink:'/CrearEstudiante'
          },
          {
            label: 'Ver',
            icon: 'pi pi-fw pi-users',
            routerLink:'/listaEstudiante'
        
          }
        ]
      },
      {
        label: 'Matriculas',
        icon: 'pi pi-fw pi-folder',
        routerLink:'/listaMatriculas'
      },
      {
        label: 'Cargas Academicas',
        icon: 'pi pi-fw pi-table',
        routerLink:'/listaCargas'
       }
    ]

    this.itemsEstudiante=[
      {
        label: 'Home',
        icon: 'pi pi-fw pi-home',
        routerLink:'/home'

      },
      {
        label: 'Pagos pendientes',
        icon: 'pi pi-fw pi-dollar',
        routerLink:'/pagos'
      },
      {
        label: 'Historial de facturas',
        icon: 'pi pi-fw pi-history',
        routerLink:'/misFacturas'
      },
    ]

    this.itmeFinanciero=[
      {
        label: 'Home',
        icon: 'pi pi-fw pi-home',
        routerLink:'/home'

      },
      {
        label: 'Facturas',
        icon: 'pi pi-fw pi-calculator',
        routerLink:'/listaFacturas'
      },
      {
        label: 'Pagos',
        icon: 'pi pi-fw pi-money-bill',
        routerLink:'/listaPagos'
      },
    ]

  
  }

  salir(){
    localStorage.removeItem('TOKEN')
    localStorage.removeItem('ROL')
    localStorage.removeItem('ESCUELA')
    this.reuter.navigate(['/login'])
  }

}
