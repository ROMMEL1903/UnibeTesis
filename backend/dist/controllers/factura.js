"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFacturaDescuento = exports.updateFactrura = exports.getFacturasPagadasByIdRazon = exports.getConfirmacion = exports.confirmarTransaccion = exports.deleteFactura = exports.FacturaApagar = exports.FacturasEstudianePendientes = exports.FacturasEstudiane = exports.newFactura = exports.getFacturas = void 0;
const factura_1 = require("../models/factura");
const axios_1 = __importDefault(require("axios"));
const getFacturas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const listaFacturas = yield factura_1.Factura.findAll();
    res.json(listaFacturas);
});
exports.getFacturas = getFacturas;
const newFactura = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nombre, ci, Fecha, Razon, idRazon, Beca, financiamiento, pagado, descuentoBeca, subtotal, total } = req.body;
    try {
        factura_1.Factura.create({
            nombre: nombre,
            ci: ci,
            Fecha: Fecha,
            Razon: Razon,
            idRazon: idRazon,
            Beca: Beca,
            financiamiento: financiamiento,
            pagado: pagado,
            descuentoBeca: descuentoBeca,
            subtotal: subtotal,
            total: total
        });
        res.json({
            msg: 'Factura creada exitosamente',
        });
    }
    catch (error) {
        res.status(400).json({
            msg: 'Upss ocurrio un error',
            error
        });
    }
});
exports.newFactura = newFactura;
const FacturasEstudiane = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { ciEstudiante } = req.query;
    const factura = yield factura_1.Factura.findAll({
        where: {
            ci: ciEstudiante,
        }
    });
    res.json(factura);
});
exports.FacturasEstudiane = FacturasEstudiane;
const FacturasEstudianePendientes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { ciEstudiante } = req.query;
    const factura = yield factura_1.Factura.findAll({
        where: {
            ci: ciEstudiante,
            pagado: false
        }
    });
    res.json(factura);
});
exports.FacturasEstudianePendientes = FacturasEstudianePendientes;
const FacturaApagar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.query;
    const numeroId = parseInt(id, 10); // Convertir 'id' a un número
    if (isNaN(numeroId)) {
        res.status(400).json({
            msg: 'El parámetro "id" no es un número válido.',
        });
        return;
    }
    const factura = yield factura_1.Factura.findByPk(numeroId);
    if (factura) {
        res.json(factura);
    }
    else {
        res.status(404).json({
            msg: 'No existe una factura con el ID: ' + numeroId,
        });
    }
});
exports.FacturaApagar = FacturaApagar;
const deleteFactura = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const idRazon = req.query.idRazon;
    if (!idRazon) {
        return res.status(400).json({ msg: 'Debe proporcionar el parámetro id de la razon en el query string' });
    }
    try {
        const facturasPendientes = yield factura_1.Factura.findAll({
            where: {
                idRazon: idRazon,
                pagado: false
            }
        });
        const facturasPagadas = yield factura_1.Factura.findAll({
            where: {
                idRazon: idRazon,
                pagado: true
            }
        });
        if (facturasPagadas.length > 0) {
            return res.status(400).json({ msg: 'No se puede eliminar porque ya se han realizado pagos en algunas facturas.' });
        }
        if (facturasPendientes.length === 0) {
            return res.status(404).json({ msg: 'No existe ninguna Factura con el idRazon: ' + idRazon });
        }
        yield Promise.all(facturasPendientes.map((factura) => __awaiter(void 0, void 0, void 0, function* () {
            yield factura.destroy();
        })));
        res.status(200).json({ msg: 'Las facturas pendientes fueron eliminadas exitosamente' });
    }
    catch (error) {
        console.error('Error al eliminar las facturas:', error);
        res.status(500).json({ msg: 'Ocurrió un error al eliminar las facturas.' });
    }
});
exports.deleteFactura = deleteFactura;
const confirmarTransaccion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, clientTransactionId } = req.query;
    console.log(req);
    console.log(req.body);
    console.log(req.query);
    const token = "kO83khezj9D2KYO5iN3bncNttryCWFcgaiG0gkR__jH95BjA1ffi2Kf2SDl_4y64MZC-FiCopPoj9ZzNgVWh9ZaR72s8EsaM4-KpmLGEBwse6zdohMUWcguejSiRqW6EydSHjRiH-SF6pWJVXKbAIc4mD6LKpl2QuEJxEZT0_teaSunLhZg3KPJGMg-3pqDglyGlxHTGL9L3M0AJXdwtblAgS1e1x83ihhHC6DQhAQwHamcUMe5pg3kczLwaXgJ39I62_JstgsJ1A6lIYNpX3XUSt6ALrUSbh0MVs7NDD3LiYtTuhHYLSUNdhVgVlqcaQrbAE5Mdje2ehhMxmjEIO0eiqyE";
    const data = JSON.stringify({
        id: id,
        clientTxId: clientTransactionId,
    });
    try {
        const response = yield axios_1.default.post('https://pay.payphonetodoesposible.com/api/button/V2/Confirm', data, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
        res.json(response.data);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Ocurrió un error al confirmar la transacción.',
        });
    }
});
exports.confirmarTransaccion = confirmarTransaccion;
const getConfirmacion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.query);
    const { id, clientTxId } = req.query;
    const token = "kO83khezj9D2KYO5iN3bncNttryCWFcgaiG0gkR__jH95BjA1ffi2Kf2SDl_4y64MZC-FiCopPoj9ZzNgVWh9ZaR72s8EsaM4-KpmLGEBwse6zdohMUWcguejSiRqW6EydSHjRiH-SF6pWJVXKbAIc4mD6LKpl2QuEJxEZT0_teaSunLhZg3KPJGMg-3pqDglyGlxHTGL9L3M0AJXdwtblAgS1e1x83ihhHC6DQhAQwHamcUMe5pg3kczLwaXgJ39I62_JstgsJ1A6lIYNpX3XUSt6ALrUSbh0MVs7NDD3LiYtTuhHYLSUNdhVgVlqcaQrbAE5Mdje2ehhMxmjEIO0eiqyE";
    const data = JSON.stringify({
        id: Number(id),
        clientTxId: clientTxId,
    });
    try {
        const response = yield axios_1.default.post('https://pay.payphonetodoesposible.com/api/button/V2/Confirm', data, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
        res.json(response.data);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Ocurrió un error al confirmar la transacción.',
        });
    }
});
exports.getConfirmacion = getConfirmacion;
const getFacturasPagadasByIdRazon = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const idRazon = req.query.idRazon;
    if (!idRazon) {
        return res.status(400).json({ msg: 'Debe proporcionar el parámetro id de la razon en el query string' });
    }
    try {
        const facturasPagadas = yield factura_1.Factura.findOne({
            where: {
                idRazon: idRazon,
                pagado: true
            }
        });
        res.json(facturasPagadas);
    }
    catch (error) {
        console.error('Error al consultar las facturas:', error);
        res.status(500).json({ msg: 'Ocurrió un error al consultar las facturas.' });
    }
});
exports.getFacturasPagadasByIdRazon = getFacturasPagadasByIdRazon;
const updateFactrura = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const { id } = req.params;
    try {
        const factura = yield factura_1.Factura.findByPk(id);
        if (factura) {
            yield factura.update(body);
            res.json({
                msg: 'Descuento agragado'
            });
        }
        else {
            res.json({
                msg: 'La factura ' + id + ' no existe'
            });
        }
    }
    catch (error) {
        console.log(error);
        res.json({
            msg: 'Upps Ocurrio un error comunique con soporte'
        });
    }
});
exports.updateFactrura = updateFactrura;
const getFacturaDescuento = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.query.id;
    if (!id) {
        return res.status(400).json({ msg: 'Debe proporcionar el parámetro id de la razon en el query string' });
    }
    try {
        const getFactura = yield factura_1.Factura.findOne({
            where: {
                id: id,
                pagado: false
            }
        });
        res.json(getFactura);
    }
    catch (error) {
        console.error('Error al consultar las facturas:', error);
        res.status(500).json({ msg: 'Ocurrió un error al consultar las facturas.' });
    }
});
exports.getFacturaDescuento = getFacturaDescuento;
