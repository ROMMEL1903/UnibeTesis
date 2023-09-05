"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validate_token_1 = __importDefault(require("./validate_token"));
const escuela_1 = require("../controllers/escuela");
const router = (0, express_1.Router)();
router.get('/lista', validate_token_1.default, escuela_1.getEscuelas);
router.post('/crearEscuela', validate_token_1.default, escuela_1.newEscuela);
router.get('/:id', validate_token_1.default, escuela_1.getEscuela);
router.put('/:id', validate_token_1.default, escuela_1.updateEscuela);
router.get('/nombres/escuelas', validate_token_1.default, escuela_1.getNombresEscuela);
router.get('/valores/escuela', validate_token_1.default, escuela_1.getValores);
exports.default = router;
