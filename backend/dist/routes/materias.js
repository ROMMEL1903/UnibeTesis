"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const materias_1 = require("../controllers/materias");
const validate_token_1 = __importDefault(require("./validate_token"));
const router = (0, express_1.Router)();
router.get('/lista', validate_token_1.default, materias_1.getMaterias);
router.post('/crearMateria', validate_token_1.default, materias_1.newMateria);
router.delete('/:id', validate_token_1.default, materias_1.deletMateria);
router.get('/:id', validate_token_1.default, materias_1.getMateria);
router.put('/:id', validate_token_1.default, materias_1.updateMateria);
exports.default = router;
