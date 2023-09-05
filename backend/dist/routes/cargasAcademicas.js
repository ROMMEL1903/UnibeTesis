"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validate_token_1 = __importDefault(require("./validate_token"));
const carga_academica_1 = require("../controllers/carga_academica");
const router = (0, express_1.Router)();
router.get('/lista', validate_token_1.default, carga_academica_1.getCargas);
router.post('/crearCarga', validate_token_1.default, carga_academica_1.newCarga);
router.get('/:id', validate_token_1.default, carga_academica_1.getCarga);
router.put('/:id', validate_token_1.default, carga_academica_1.updateCarga);
router.delete('/:id', validate_token_1.default, carga_academica_1.deletCarga);
router.get('/', validate_token_1.default, carga_academica_1.getCargabyEscuela);
exports.default = router;
