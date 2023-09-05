import { DataTypes } from "sequelize"
import sequelize from "../db/connection"

export const Matricula = sequelize.define('matricula', {
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
    Fecha: {
        type: DataTypes.STRING
    },
    nivel: {
        type: DataTypes.INTEGER
    },
    escuela: {
        type: DataTypes.STRING
    },
    
    valorMatricula: {
        type: DataTypes.FLOAT
    },
    tipoMatricula: {
        type: DataTypes.STRING
    }
    
}, {
    tableName: 'Matriculas',
    timestamps: false
})