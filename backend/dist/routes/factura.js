"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validate_token_1 = __importDefault(require("./validate_token"));
const factura_1 = require("../controllers/factura");
const router = (0, express_1.Router)();
router.get('/listaFacturas', validate_token_1.default, factura_1.getFacturas);
router.get('/modificarFactura', validate_token_1.default, factura_1.getFacturaDescuento);
router.post('/crearfactura', validate_token_1.default, factura_1.newFactura);
router.get('/misFacturas', validate_token_1.default, factura_1.FacturasEstudiane);
router.get('/misFacturasPendientes', validate_token_1.default, factura_1.FacturasEstudianePendientes);
router.get('/pagarFactura', validate_token_1.default, factura_1.FacturaApagar);
router.post('/confirmarPago', validate_token_1.default, factura_1.confirmarTransaccion);
router.delete('/eliminar', validate_token_1.default, factura_1.deleteFactura);
router.get('/verificarfactura', validate_token_1.default, factura_1.getFacturasPagadasByIdRazon);
router.put('/:id', validate_token_1.default, factura_1.updateFactrura);
router.get('/getConfirmacion', validate_token_1.default, factura_1.getConfirmacion);
exports.default = router;