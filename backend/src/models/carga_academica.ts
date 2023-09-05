import { DataTypes } from "sequelize"
import sequelize from "../db/connection"


export const Carga_Academica = sequelize.define('carga_academica', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    ciEstudiante: {
        type: DataTypes.STRING,
        references: {
            model: 'Usuarios',
            key: 'cedula'
        }
    },
    fecha:{
        type:DataTypes.STRING
    },
    escuela:{
        type:DataTypes.STRING
    },
    periodo:{
        type:DataTypes.STRING  
    },
   
    modalidad:{
        type:DataTypes.STRING

    },

},{
    tableName:'CargasAcademicas',
    timestamps:false
})