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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPagos = exports.getPago = exports.newPago = void 0;
const pago_1 = require("../models/pago");
const newPago = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { transactionId, idFactura, storeName, document, transactionStatus } = req.body;
    const pago = yield pago_1.Pago.findOne({ where: { idFactura: idFactura } });
    try {
        yield pago_1.Pago.create({
            transactionId: transactionId,
            idFactura: idFactura,
            storeName: storeName,
            document: document,
            transactionStatus: transactionStatus
        });
        res.json({
            msg: 'Porfavor realice el pago de su facturahfgh' + idFactura
        });
    }
    catch (error) {
    }
});
exports.newPago = newPago;
const getPago = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idFactura } = req.query;
    const pago = yield pago_1.Pago.findOne({ where: {
            idFactura: idFactura,
        } });
    if (pago) {
        res.json(pago);
    }
    else {
        res.status(404).json({
            msg: 'No existe el pago'
        });
    }
});
exports.getPago = getPago;
const getPagos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const listapagos = yield pago_1.Pago.findAll();
    res.json(listapagos);
});
exports.getPagos = getPagos;
