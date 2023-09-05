"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validate_token_1 = __importDefault(require("./validate_token"));
const pagos_1 = require("../controllers/pagos");
const router = (0, express_1.Router)();
router.post('/crearPago', validate_token_1.default, pagos_1.newPago);
router.get('/obtenerPago', validate_token_1.default, pagos_1.getPago);
router.get('/listaPagos', validate_token_1.default, pagos_1.getPagos);
exports.default = router;
