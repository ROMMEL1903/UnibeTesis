"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Matricula = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
exports.Matricula = connection_1.default.define('matricula', {
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
    Fecha: {
        type: sequelize_1.DataTypes.STRING
    },
    nivel: {
        type: sequelize_1.DataTypes.INTEGER
    },
    escuela: {
        type: sequelize_1.DataTypes.STRING
    },
    valorMatricula: {
        type: sequelize_1.DataTypes.FLOAT
    },
    tipoMatricula: {
        type: sequelize_1.DataTypes.STRING
    }
}, {
    tableName: 'Matriculas',
    timestamps: false
});
