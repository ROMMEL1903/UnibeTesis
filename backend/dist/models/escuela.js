"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Escuela = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
exports.Escuela = connection_1.default.define('escuela', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: sequelize_1.DataTypes.STRING,
    },
    matriculaOrdinaria: {
        type: sequelize_1.DataTypes.FLOAT
    },
    matriculaExtraordinaria: {
        type: sequelize_1.DataTypes.FLOAT
    },
    matriculaEspecial: {
        type: sequelize_1.DataTypes.FLOAT
    },
    Inscripcion: {
        type: sequelize_1.DataTypes.FLOAT
    },
    modalidadPresencial: {
        type: sequelize_1.DataTypes.BOOLEAN
    },
    modalidadSemipresencial: {
        type: sequelize_1.DataTypes.BOOLEAN
    },
    modalidadNocturno: {
        type: sequelize_1.DataTypes.BOOLEAN
    },
    modalidadDistancia: {
        type: sequelize_1.DataTypes.BOOLEAN
    }
}, {
    tableName: 'Escuelas',
    timestamps: false
});
