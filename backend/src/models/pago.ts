import { DataTypes } from "sequelize"
import sequelize from "../db/connection"

export const Pago = sequelize.define('pago', {
    transactionId: {
        type: DataTypes.INTEGER,
        primaryKey: true,

    },
    idFactura: {
        type: DataTypes.INTEGER,
        references: {
            model: 'facturas',
            key: 'id'
        } 
    },
    storeName: {
        type: DataTypes.STRING
    },
    document: {
        type: DataTypes.STRING
    },
    transactionStatus:{
        type: DataTypes.STRING
    }
}, {
    tableName: 'pagos',
    timestamps: false
})