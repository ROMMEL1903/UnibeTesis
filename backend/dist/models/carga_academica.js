"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Carga_Academica = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
exports.Carga_Academica = connection_1.default.define('carga_academica', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    ciEstudiante: {
        type: sequelize_1.DataTypes.STRING,
        references: {
            model: 'Usuarios',
            key: 'cedula'
        }
    },
    fecha: {
        type: sequelize_1.DataTypes.STRING
    },
    escuela: {
        type: sequelize_1.DataTypes.STRING
    },
    periodo: {
        type: sequelize_1.DataTypes.STRING
    },
    modalidad: {
        type: sequelize_1.DataTypes.STRING
    },
}, {
    tableName: 'CargasAcademicas',
    timestamps: false
});
