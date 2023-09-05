import { DataTypes } from "sequelize"
import sequelize from "../db/connection"


export const Escuela = sequelize.define('escuela', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING,
    },
    matriculaOrdinaria: {
        type: DataTypes.FLOAT 
    },
    matriculaExtraordinaria: {
        type: DataTypes.FLOAT
    },
    matriculaEspecial: {
        type: DataTypes.FLOAT
    },
    Inscripcion: {
        type: DataTypes.FLOAT
    },
    modalidadPresencial:{
      type:DataTypes.BOOLEAN
    },
    modalidadSemipresencial:{
        type:DataTypes.BOOLEAN
    },
    modalidadNocturno:{
        type:DataTypes.BOOLEAN
    },
    modalidadDistancia:{
        type:DataTypes.BOOLEAN
    }
    

    
}, {
    tableName: 'Escuelas',
    timestamps: false
})