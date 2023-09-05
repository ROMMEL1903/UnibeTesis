"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validate_token_1 = __importDefault(require("./validate_token"));
const matriculas_1 = require("../controllers/matriculas");
const router = (0, express_1.Router)();
router.post('/crearMatricula', validate_token_1.default, matriculas_1.newMatricula);
router.get('/listaMatriculas', validate_token_1.default, matriculas_1.getMatriculas);
router.put('/editarMatricula/:id', validate_token_1.default, matriculas_1.updateMatricula);
router.get('/:id', validate_token_1.default, matriculas_1.getMatricula);
router.get('/', validate_token_1.default, matriculas_1.getMatriculasbyEscuela);
router.delete('/:id', validate_token_1.default, matriculas_1.deletMatricula);
exports.default = router;
