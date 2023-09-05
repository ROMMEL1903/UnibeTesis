import { DataTypes } from "sequelize"
import sequelize from "../db/connection"


export const Materia_Carga = sequelize.define('materia_carga', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    idCarga: {
        type: DataTypes.INTEGER,
        references: {
            model: 'CargasAcademicas',
            key: 'id'
        }
    },
    idMateria: { 
        type: DataTypes.INTEGER,
        references: {
            model: 'Materias',
            key: 'id'
        }
    },
    materia:{
        type:DataTypes.STRING
    }
    ,

    totalMateria: {
        type: DataTypes.FLOAT
    },

},{
    tableName:'materiaCarga',
    timestamps:false
})