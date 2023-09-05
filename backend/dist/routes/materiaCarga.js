"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validate_token_1 = __importDefault(require("./validate_token"));
const MateriaCarga_1 = require("../controllers/MateriaCarga");
const router = (0, express_1.Router)();
router.get('/lista', validate_token_1.default, MateriaCarga_1.getMateriasCarga);
router.post('/crear', validate_token_1.default, MateriaCarga_1.newMateriasCargas);
router.delete('/eliminar', validate_token_1.default, MateriaCarga_1.deletMateriaCargaPorIdCarga);
exports.default = router;
