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
exports.deletMatricula = exports.getMatriculasbyEscuela = exports.updateMatricula = exports.getMatricula = exports.getMatriculas = exports.newMatricula = void 0;
const matricula_1 = require("../models/matricula");
const newMatricula = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { ciEstudiante, Fecha, nivel, escuela, valorMatricula, tipoMatricula } = req.body;
    try {
        const matricula = yield matricula_1.Matricula.create({
            ciEstudiante: ciEstudiante,
            Fecha: Fecha,
            nivel: nivel,
            escuela: escuela,
            valorMatricula: valorMatricula,
            tipoMatricula: tipoMatricula
        });
        res.json({
            msg: 'Matricula creada exitosamente',
            matriculID: matricula.get('id')
        });
    }
    catch (error) {
        res.status(400).json({
            msg: 'Upss ocurrio un error',
            error
        });
    }
});
exports.newMatricula = newMatricula;
const getMatriculas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const listaMatriculas = yield matricula_1.Matricula.findAll();
    res.json(listaMatriculas);
});
exports.getMatriculas = getMatriculas;
const getMatricula = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const matricula = yield matricula_1.Matricula.findByPk(id);
    if (matricula) {
        res.json(matricula);
    }
    else {
        res.status(404).json({
            msg: 'No existe una materia con el id:' + matricula
        });
    }
});
exports.getMatricula = getMatricula;
const updateMatricula = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const { id } = req.params;
    try {
        const matricula = yield matricula_1.Matricula.findByPk(id);
        if (matricula) {
            yield matricula.update(body);
            res.json({
                msg: 'La matricula ha sido actualizado'
            });
        }
        else {
            res.json({
                msg: 'La matricula ' + id + ' no existe'
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
exports.updateMatricula = updateMatricula;
const getMatriculasbyEscuela = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { escuela } = req.query;
    const matriculas = yield matricula_1.Matricula.findAll({ where: {
            escuela: escuela
        } });
    res.json(matriculas);
});
exports.getMatriculasbyEscuela = getMatriculasbyEscuela;
const deletMatricula = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const matricula = yield matricula_1.Matricula.findByPk(id);
    if (matricula) {
        yield matricula.destroy();
        res.status(404).json({
            msg: 'Matricula eliminada con exito'
        });
    }
    else {
        res.status(404).json({
            msg: 'No exte una carga con el id:' + id
        });
    }
});
exports.deletMatricula = deletMatricula;
