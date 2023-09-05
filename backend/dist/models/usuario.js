"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Usuario = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
exports.Usuario = connection_1.default.define('usuario', {
    cedula: {
        type: sequelize_1.DataTypes.STRING,
        primaryKey: true
    },
    nombres: {
        type: sequelize_1.DataTypes.STRING
    },
    rol: {
        type: sequelize_1.DataTypes.STRING
    },
    escuela: {
        type: sequelize_1.DataTypes.STRING
    },
    correo: {
        type: sequelize_1.DataTypes.STRING
    },
    clave: {
        type: sequelize_1.DataTypes.STRING
    },
    primer_Inicio: {
        type: sequelize_1.DataTypes.BOOLEAN
    }
}, {
    tableName: 'Usuarios',
    timestamps: false
});
