
import express from 'express';
import cors from 'cors'

import routesPagos from '../routes/pagos'
import routesMateria from '../routes/materias'
import routesUser from '../routes/usuario'
import routerCarga from '../routes/cargasAcademicas'
import routesMateriaCarga from '../routes/materiaCarga'
import routesMatriculas from '../routes/matriculas'
import routesEscuela from '../routes/escuela'
import routesFactura from '../routes/factura'
import {  Materia } from './materias';
import { Usuario } from './usuario';
import { Carga_Academica } from './carga_academica';
import { Materia_Carga } from './materaintoCarga';
import { Matricula } from './matricula';
import { Factura } from './factura';
import { Pago } from './pago';
import { Escuela } from './escuela';




class Server {

    private app: express.Application;
    private port: string;
    constructor() {
        this.app = express();
        this.port = process.env.PORT || '3001';
        this.listen();
        this.midlewares();
        this.routes();
        this.dbConect();

    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Aplicacion corriendo' + this.port)
        })
    }

    
    routes() {
        this.app.use('/materias', routesMateria)
        this.app.use('/usuarios', routesUser)
        this.app.use('/materiasCarga', routesMateriaCarga)
        this.app.use('/cargasAcademicas', routerCarga)
        this.app.use('/matriculas',routesMatriculas)
        this.app.use('/facturas',routesFactura)
        this.app.use('/pagos',routesPagos)
        this.app.use('/escuelas',routesEscuela)

        
    }

    midlewares(){


        this.app.use(express.json()); 


        this.app.use(cors())
    }

    async dbConect(){
        try{
            await Materia.sync()
            await Usuario.sync()
            await Carga_Academica.sync()
            await Materia_Carga.sync()
            await Matricula.sync()
            await Factura.sync()
            await Pago.sync()
            await Escuela.sync()
           
        }catch(error){
            console.log('Errooo >:( ', error)
        }
    }
    

}

export default Server