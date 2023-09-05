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
exports.getUsuariosbyRolandEscuela = exports.updateUser = exports.deletUser = exports.getUsuario = exports.getUsuarios = exports.loginUser = exports.newUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const usuario_1 = require("../models/usuario");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const newUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { cedula, nombres, rol, escuela, correo, clave, primer_Inicio } = req.body;
    const encriptada = yield bcrypt_1.default.hash(clave, 10);
    const usuario = yield usuario_1.Usuario.findOne({ where: { cedula: cedula } });
    if (usuario) {
        return res.status(400).json({
            msg: 'El usuario ' + cedula + ' ya existe'
        });
    }
    try {
        yield usuario_1.Usuario.create({
            cedula: cedula,
            nombres: nombres,
            rol: rol,
            escuela: escuela,
            correo: correo,
            clave: encriptada,
            primer_Inicio: primer_Inicio
        });
        res.json({
            msg: 'usuario ' + correo + ' creado'
        });
    }
    catch (error) {
        res.status(400).json({
            msg: 'Upss ocurrio un error',
            error
        });
    }
});
exports.newUser = newUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { correo, clave } = req.body;
    const user = yield usuario_1.Usuario.findOne({ where: { correo: correo } });
    if (!user) {
        return res.status(400).json({
            msg: 'El usuario ' + correo + ' no existe'
        });
    }
    const claveCorrecta = yield bcrypt_1.default.compare(clave, user.clave);
    console.log(claveCorrecta);
    if (!claveCorrecta) {
        return res.status(400).json({
            msg: 'Clave incorrecta'
        });
    }
    const token = jsonwebtoken_1.default.sign({
        correo: correo,
        rol: user.rol,
        escuela: user.escuela,
        cedula: user.cedula
    }, process.env.CLAVE_SECRETA || 'GmRawg14');
    res.json(token);
});
exports.loginUser = loginUser;
const getUsuarios = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const usuarios = yield usuario_1.Usuario.findAll();
    res.json(usuarios);
});
exports.getUsuarios = getUsuarios;
const getUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { cedula } = req.params;
    const usuario = yield usuario_1.Usuario.findByPk(cedula);
    if (usuario) {
        res.json(usuario);
    }
    else {
        res.status(404).json({
            msg: 'No existe un usuario con el numero de cedula:' + cedula
        });
    }
});
exports.getUsuario = getUsuario;
const deletUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { cedula } = req.params;
    const usuario = yield usuario_1.Usuario.findByPk(cedula);
    if (usuario) {
        yield usuario.destroy();
        res.status(404).json({
            msg: 'El usuario fue eliminado con exito'
        });
    }
    else {
        res.status(404).json({
            msg: 'No existe un usuario con el numero de cedula' + cedula
        });
    }
});
exports.deletUser = deletUser;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const { cedula } = req.params;
    try {
        const usuario = yield usuario_1.Usuario.findByPk(cedula);
        if (usuario) {
            yield usuario.update(body);
            res.json({
                msg: 'El usuario a sido actualizado'
            });
        }
        else {
            res.json({
                msg: 'El usuario ' + cedula + ' no existe'
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
exports.updateUser = updateUser;
const getUsuariosbyRolandEscuela = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { rol, escuela } = req.query;
    const user = yield usuario_1.Usuario.findAll({ where: {
            rol: rol,
            escuela: escuela
        } });
    res.json(user);
});
exports.getUsuariosbyRolandEscuela = getUsuariosbyRolandEscuela;
