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
exports.updateMateria = exports.getMateria = exports.deletMateria = exports.newMateria = exports.getMaterias = void 0;
const materias_1 = require("../models/materias");
const getMaterias = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const listaMaterias = yield materias_1.Materia.findAll();
    res.json(listaMaterias);
});
exports.getMaterias = getMaterias;
const newMateria = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nombre, abreviatura, creditos, ModaPresencial, ModaDistancia, ModaNocturno, ModaSemipresencial } = req.body;
    const materia = yield materias_1.Materia.findOne({ where: { nombre: nombre } });
    if (materia) {
        return res.status(400).json({
            msg: 'La materia ' + nombre + ' ya existe'
        });
    }
    try {
        yield materias_1.Materia.create({
            nombre: nombre,
            abreviatura: abreviatura,
            creditos: creditos,
            ModaPresencial: ModaPresencial,
            ModaSemipresencial: ModaSemipresencial,
            ModaDistancia: ModaDistancia,
            ModaNocturno: ModaNocturno
        });
        res.json({
            msg: 'Materia ' + nombre + ' creada'
        });
    }
    catch (error) {
        res.status(400).json({
            msg: 'Upss ocurrio un error',
            error
        });
    }
});
exports.newMateria = newMateria;
const deletMateria = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const materia = yield materias_1.Materia.findByPk(id);
    if (materia) {
        yield materia.destroy();
        res.status(404).json({
            msg: 'El usuario fue eliminado con exito'
        });
    }
    else {
        res.status(404).json({
            msg: 'No exte una materia con el id:' + id
        });
    }
});
exports.deletMateria = deletMateria;
const getMateria = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const materia = yield materias_1.Materia.findByPk(id);
    if (materia) {
        res.json(materia);
    }
    else {
        res.status(404).json({
            msg: 'No existe una materia con el id:' + materia
        });
    }
});
exports.getMateria = getMateria;
const updateMateria = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const { id } = req.params;
    try {
        const materia = yield materias_1.Materia.findByPk(id);
        if (materia) {
            yield materia.update(body);
            res.json({
                msg: 'La materia ha sido actualizado'
            });
        }
        else {
            res.json({
                msg: 'La materia ' + id + ' no existe'
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
exports.updateMateria = updateMateria;
