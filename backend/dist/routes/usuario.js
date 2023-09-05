"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usuarios_1 = require("../controllers/usuarios");
const validate_token_1 = __importDefault(require("./validate_token"));
const router = (0, express_1.Router)();
router.post('/', usuarios_1.newUser);
router.post('/login', usuarios_1.loginUser);
router.get('/lista', validate_token_1.default, usuarios_1.getUsuarios);
router.get('/:cedula', validate_token_1.default, usuarios_1.getUsuario);
router.delete('/:cedula', validate_token_1.default, usuarios_1.deletUser);
router.put('/:cedula', validate_token_1.default, usuarios_1.updateUser);
router.get('/get/Estudiantes', validate_token_1.default, usuarios_1.getUsuariosbyRolandEscuela);
exports.default = router;
