import { DataTypes } from "sequelize"
import sequelize from "../db/connection"
import { Matricula } from "./matricula";
import { Carga_Academica } from "./carga_academica";

export const Factura = sequelize.define('factura', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING
    },
    ci: {
        type: DataTypes.STRING,
        references: {
            model: 'Usuarios',
            key: 'cedula'
        }


    },
    Fecha: {
        type: DataTypes.STRING,
    },
    Razon: {
        type: DataTypes.STRING
    },
    idRazon: {
        type: DataTypes.INTEGER
    },
    Beca: {
        type: DataTypes.BOOLEAN
    },
    financiamiento: {
        type: DataTypes.BOOLEAN
    },
    pagado: {
        type: DataTypes.BOOLEAN
    }, 
    descuentoBeca: {
        type: DataTypes.FLOAT
    },
    subtotal: {
        type: DataTypes.FLOAT
    },
    total: {
        type: DataTypes.FLOAT
    }
}
    , {
        tableName: 'Facturas',
        timestamps: false
    })
Factura.belongsTo(Matricula, {
    foreignKey: 'idRazon',
    constraints: false
});

Factura.belongsTo(Carga_Academica, {
    foreignKey: 'idRazon',
    constraints: false
});