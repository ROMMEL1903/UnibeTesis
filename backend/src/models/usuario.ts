import { DataTypes } from "sequelize"
import sequelize from "../db/connection"

export const Usuario = sequelize.define('usuario', {
    cedula: {
        type: DataTypes.STRING,
        primaryKey:true
    },
    nombres: {
        type: DataTypes.STRING
    },
    rol:{
        type: DataTypes.STRING
    },
    escuela:{
        type: DataTypes.STRING
    },
    correo:{
        type: DataTypes.STRING
    },
    clave:{
        type: DataTypes.STRING
    },
    primer_Inicio:{
        type: DataTypes.BOOLEAN
    }
},{
    tableName:'Usuarios',
    timestamps:false
})