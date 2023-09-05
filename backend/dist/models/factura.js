"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Factura = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const matricula_1 = require("./matricula");
const carga_academica_1 = require("./carga_academica");
exports.Factura = connection_1.default.define('factura', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: sequelize_1.DataTypes.STRING
    },
    ci: {
        type: sequelize_1.DataTypes.STRING,
        references: {
            model: 'Usuarios',
            key: 'cedula'
        }
    },
    Fecha: {
        type: sequelize_1.DataTypes.STRING,
    },
    Razon: {
        type: sequelize_1.DataTypes.STRING
    },
    idRazon: {
        type: sequelize_1.DataTypes.INTEGER
    },
    Beca: {
        type: sequelize_1.DataTypes.BOOLEAN
    },
    financiamiento: {
        type: sequelize_1.DataTypes.BOOLEAN
    },
    pagado: {
        type: sequelize_1.DataTypes.BOOLEAN
    },
    descuentoBeca: {
        type: sequelize_1.DataTypes.FLOAT
    },
    subtotal: {
        type: sequelize_1.DataTypes.FLOAT
    },
    total: {
        type: sequelize_1.DataTypes.FLOAT
    }
}, {
    tableName: 'Facturas',
    timestamps: false
});
exports.Factura.belongsTo(matricula_1.Matricula, {
    foreignKey: 'idRazon',
    constraints: false
});
exports.Factura.belongsTo(carga_academica_1.Carga_Academica, {
    foreignKey: 'idRazon',
    constraints: false
});
