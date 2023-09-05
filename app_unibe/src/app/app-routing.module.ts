import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { CrearAdComponent } from './components/superU/crear-ad/crear-ad.component';
import { HomeComponent } from './components/compartido/home/home.component';
import { ListaAdComponent } from './components/superU/lista-ad/lista-ad.component';
import { authGuard } from './utils/auth.guard';
import { ListMateriasComponent } from './components/materias/list-materias/list-materias.component';
import { NewMateriaComponent } from './components/materias/new-materia/new-materia.component';
import { CrearEstComponent } from './components/directores/crear-est/crear-est.component';
import { ListEstuComponent } from './components/directores/list-estu/list-estu.component';
import { CreatCargaComponent } from './components/directores/creat-carga/creat-carga.component';
import { MateriasCargaComponent } from './components/directores/materias-carga/materias-carga.component';

import { CrearMatriculaComponent } from './components/directores/crear-matricula/crear-matricula.component';
import { ListCargasComponent } from './components/directores/list-cargas/list-cargas.component';
import { ListMatriculasComponent } from './components/directores/list-matriculas/list-matriculas.component';
import { PagosComponent } from './components/estudiantes/pagos/pagos.component';
import { HistorialComponent } from './components/estudiantes/historial/historial.component';
import { RealizarPagoComponent } from './components/estudiantes/realizar-pago/realizar-pago.component';
import { ListFacturasComponent } from './components/financieros/list-facturas/list-facturas.component';
import { ModificarFacturaComponent } from './components/financieros/modificar-factura/modificar-factura.component';
import { ConfirmacionComponent } from './confirmacion/confirmacion.component';
import { ListaPagosComponent } from './components/financieros/lista-pagos/lista-pagos.component';
import { ListaEscuelasComponent } from './components/superU/lista-escuelas/lista-escuelas.component';
import { CrearEscuelaComponent } from './components/superU/crear-escuela/crear-escuela.component';



const routes: Routes = [
  {
    path: '', redirectTo: 'login', pathMatch: 'full'
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'crear', component: CrearAdComponent, canActivate: [authGuard]
  },
  {
    path: 'home', component: HomeComponent, canActivate: [authGuard]
  },
  {
    path: 'listaUsers', component: ListaAdComponent, canActivate: [authGuard]
  },
  {
    path: 'editar/:cedula', component: CrearAdComponent, canActivate: [authGuard]
  },
  {
    path: 'editarMatricula/:id', component: CrearMatriculaComponent, canActivate: [authGuard]
  },
  {
    path: 'editarMateria/:id', component: NewMateriaComponent, canActivate: [authGuard]
  },
  {
    path: 'ListaMaterias', component: ListMateriasComponent, canActivate: [authGuard]
  },
  {
    path: 'nuevaMateria', component: NewMateriaComponent, canActivate: [authGuard]
  },
  {
    path: 'CrearEstudiante', component: CrearEstComponent, canActivate: [authGuard]
  },
  {
    path: 'listaEstudiante', component: ListEstuComponent, canActivate: [authGuard]
  },
  {
    path: 'editarEstudiante/:cedula', component: CrearEstComponent, canActivate: [authGuard]
  },
  {
    path: 'crearCarga/:cedula', component: CreatCargaComponent, canActivate: [authGuard]
  },
  {
    path: 'crearMatricula/:cedula', component: CrearMatriculaComponent, canActivate: [authGuard]
  },
  {
    path: 'listaCargas', component: ListCargasComponent, canActivate: [authGuard]
  },
  {
    path: 'listaMatriculas', component: ListMatriculasComponent, canActivate: [authGuard]
  },
  {
    path: 'pagos', component: PagosComponent, canActivate: [authGuard]
  },
  {
    path: 'misFacturas', component: HistorialComponent, canActivate: [authGuard]
  },
  {
    path: 'realizarPago', component: RealizarPagoComponent, canActivate: [authGuard]
  },
  {
    path: 'editarCarga/:id', component: CreatCargaComponent, canActivate: [authGuard]
  },
  {
    path: 'listaFacturas', component: ListFacturasComponent, canActivate: [authGuard]
  },
  {
    path:'modificar/:id', component:ModificarFacturaComponent,canActivate:[authGuard]
  },
  {
    path:'getConfirmacio', component:ConfirmacionComponent
  },
  {
    path:'listaPagos', component:ListaPagosComponent,canActivate:[authGuard]
  },
  {
    path:'listaEscuelas', component: ListaEscuelasComponent, canActivate:[authGuard]
  },
  {
    path:'CrearEscuela', component: CrearEscuelaComponent, canActivate:[authGuard]
  },
  {
    path:'EditarEscuela/:id', component: CrearEscuelaComponent, canActivate:[authGuard]
  },
  {
    path: '**', redirectTo: 'login', pathMatch: 'full'
  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
