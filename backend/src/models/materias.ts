import { DataTypes } from "sequelize"
import sequelize from "../db/connection"

export const Materia = sequelize.define('materia', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    abreviatura: {
        type: DataTypes.STRING,
    },
    nombre: {
        type: DataTypes.STRING
    },
    creditos: {
        type: DataTypes.INTEGER
    },
    ModaPresencial: {
        type: DataTypes.FLOAT
    },
    ModaSemipresencial: {
        type: DataTypes.FLOAT
    },
    ModaDistancia: {
        type: DataTypes.FLOAT
    },
    ModaNocturno: {
        type: DataTypes.FLOAT
    }
    
}, {
    tableName: 'Materias',
    timestamps: false
})