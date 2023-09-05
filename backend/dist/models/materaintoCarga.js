"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Materia_Carga = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
exports.Materia_Carga = connection_1.default.define('materia_carga', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    idCarga: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: 'CargasAcademicas',
            key: 'id'
        }
    },
    idMateria: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: 'Materias',
            key: 'id'
        }
    },
    materia: {
        type: sequelize_1.DataTypes.STRING
    },
    totalMateria: {
        type: sequelize_1.DataTypes.FLOAT
    },
}, {
    tableName: 'materiaCarga',
    timestamps: false
});
