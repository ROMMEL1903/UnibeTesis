"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pago = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
exports.Pago = connection_1.default.define('pago', {
    transactionId: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
    },
    idFactura: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: 'facturas',
            key: 'id'
        }
    },
    storeName: {
        type: sequelize_1.DataTypes.STRING
    },
    document: {
        type: sequelize_1.DataTypes.STRING
    },
    transactionStatus: {
        type: sequelize_1.DataTypes.STRING
    }
}, {
    tableName: 'pagos',
    timestamps: false
});
