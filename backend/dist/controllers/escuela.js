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
exports.getValores = exports.getNombresEscuela = exports.updateEscuela = exports.getEscuela = exports.newEscuela = exports.getEscuelas = void 0;
const escuela_1 = require("../models/escuela");
const getEscuelas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const listaEscuelas = yield escuela_1.Escuela.findAll();
    res.json(listaEscuelas);
});
exports.getEscuelas = getEscuelas;
const newEscuela = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nombre, matriculaOrdinaria, matriculaExtraordinaria, matriculaEspecial, Inscripcion, modalidadPresencial, modalidadSemipresencial, modalidadNocturno, modalidadDistancia } = req.body;
    const escuela = yield escuela_1.Escuela.findOne({ where: { nombre: nombre } });
    if (escuela) {
        return res.status(400).json({
            msg: 'La escuela ' + nombre + ' ya existe'
        });
    }
    try {
        yield escuela_1.Escuela.create({
            nombre: nombre,
            matriculaOrdinaria: matriculaOrdinaria,
            matriculaExtraordinaria: matriculaExtraordinaria,
            matriculaEspecial: matriculaEspecial,
            Inscripcion: Inscripcion,
            modalidadPresencial: modalidadPresencial,
            modalidadSemipresencial: modalidadSemipresencial,
            modalidadNocturno: modalidadNocturno,
            modalidadDistancia: modalidadDistancia
        });
        res.json({
            msg: 'Escuela ' + nombre + ' creada'
        });
    }
    catch (error) {
        res.status(400).json({
            msg: 'Upss ocurrio un error',
            error
        });
    }
});
exports.newEscuela = newEscuela;
const getEscuela = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const escuela = yield escuela_1.Escuela.findByPk(id);
    if (escuela) {
        res.json(escuela);
    }
    else {
        res.status(404).json({
            msg: 'No existe una escuelaa c on el id:' + escuela
        });
    }
});
exports.getEscuela = getEscuela;
const updateEscuela = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const { id } = req.params;
    try {
        const escuela = yield escuela_1.Escuela.findByPk(id);
        if (escuela) {
            yield escuela.update(body);
            res.json({
                msg: 'La materia ha sido actualizado'
            });
        }
        else {
            res.json({
                msg: 'La escuela ' + id + ' no existe'
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
exports.updateEscuela = updateEscuela;
const getNombresEscuela = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const escuelas = yield escuela_1.Escuela.findAll({
            attributes: ['nombre']
        });
        res.json(escuelas);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener los nombres de las escuelas' });
    }
});
exports.getNombresEscuela = getNombresEscuela;
const getValores = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nombre } = req.query;
    try {
        const valores = yield escuela_1.Escuela.findOne({
            where: { nombre: nombre },
        });
        if (valores) {
            res.json(valores);
        }
        else {
            res.status(404).json({ error: 'No se encontraron valores para el nombre proporcionado' });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener los valores' });
    }
});
exports.getValores = getValores;
