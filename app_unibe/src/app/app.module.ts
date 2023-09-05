import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http'
import { ToolbarModule } from 'primeng/toolbar';
import { InputSwitchModule } from 'primeng/inputswitch';
import { TagModule } from 'primeng/tag';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { CrearAdComponent } from './components/superU/crear-ad/crear-ad.component';
import { ListaAdComponent } from './components/superU/lista-ad/lista-ad.component';
import { FormsModule , ReactiveFormsModule} from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastModule } from 'primeng/toast';
import { CalendarModule } from 'primeng/calendar';

import { PickListModule } from 'primeng/picklist';
import { InputNumberModule } from 'primeng/inputnumber'
import { TableModule } from 'primeng/table';
import { ToastrModule } from 'ngx-toastr';
import { MegaMenuModule } from 'primeng/megamenu';
import { SpinerComponent } from './components/compartido/spiner/spiner.component';
import { MenuComponent } from './components/compartido/menu/menu.component';
import { TabMenuModule } from 'primeng/tabmenu';
import { MenubarModule } from 'primeng/menubar';
import { HomeComponent } from './components/compartido/home/home.component';
import { AddTokenInterceptor } from './utils/add-token.interceptor';
import { ListMateriasComponent } from './components/materias/list-materias/list-materias.component';
import { NewMateriaComponent } from './components/materias/new-materia/new-materia.component';
import { CrearEstComponent } from './components/directores/crear-est/crear-est.component';
import { ListEstuComponent } from './components/directores/list-estu/list-estu.component';
import { DialogModule } from 'primeng/dialog';
import { CreatCargaComponent } from './components/directores/creat-carga/creat-carga.component';
import { MateriasCargaComponent } from './components/directores/materias-carga/materias-carga.component';
import { CrearMatriculaComponent } from './components/directores/crear-matricula/crear-matricula.component';
import { ListCargasComponent } from './components/directores/list-cargas/list-cargas.component';
import { ListMatriculasComponent } from './components/directores/list-matriculas/list-matriculas.component';
import { DataViewModule } from 'primeng/dataview';
import { SplitterModule } from 'primeng/splitter';
import { AvatarModule } from 'primeng/avatar';
import { CardModule } from 'primeng/card';
import { MessageModule } from 'primeng/message';
import { HomeDComponent } from './components/directores/home-d/home-d.component';
import { PagosComponent } from './components/estudiantes/pagos/pagos.component';
import { HomeSComponent } from './components/superU/home-s/home-s.component';
import { HomeEComponent } from './components/estudiantes/home-e/home-e.component';
import { HistorialComponent } from './components/estudiantes/historial/historial.component';
import { RealizarPagoComponent } from './components/estudiantes/realizar-pago/realizar-pago.component';
import { HomeFComponent } from './components/financieros/home-f/home-f.component';
import { ListFacturasComponent } from './components/financieros/list-facturas/list-facturas.component';
import { ModificarFacturaComponent } from './components/financieros/modificar-factura/modificar-factura.component';
import { ConfirmacionComponent } from './confirmacion/confirmacion.component';
import { ListaPagosComponent } from './components/financieros/lista-pagos/lista-pagos.component';
import { ListaEscuelasComponent } from './components/superU/lista-escuelas/lista-escuelas.component';
import { CrearEscuelaComponent } from './components/superU/crear-escuela/crear-escuela.component';






@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CrearAdComponent,
    ListaAdComponent,
    SpinerComponent,
    MenuComponent,
    HomeComponent,
    ListMateriasComponent,
    NewMateriaComponent,
    CrearEstComponent,
    ListEstuComponent,
    CreatCargaComponent,
    MateriasCargaComponent,
    CrearMatriculaComponent,
    ListCargasComponent,
    ListMatriculasComponent,
    HomeDComponent,
    PagosComponent,
    HomeSComponent,
    HomeEComponent,
    HistorialComponent,
    RealizarPagoComponent,
    HomeFComponent,
    ListFacturasComponent,
    ModificarFacturaComponent,
    ConfirmacionComponent,
    ListaPagosComponent,
    ListaEscuelasComponent,
    CrearEscuelaComponent,
 


  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    InputTextModule,
    FormsModule,
    PasswordModule,
    ButtonModule,
    MessageModule,
    DropdownModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    ToastModule,
    DialogModule,
    MegaMenuModule,
    TabMenuModule,
    MenubarModule,
    TableModule,
    PickListModule,
    InputNumberModule,
    DataViewModule,
    SplitterModule,
    ToolbarModule ,
    CardModule,
    AvatarModule,
    TagModule,
    CalendarModule,
    InputSwitchModule,
    ToastrModule.forRoot(),
  ],
  providers: [
  {provide:HTTP_INTERCEPTORS,useClass:AddTokenInterceptor,multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
