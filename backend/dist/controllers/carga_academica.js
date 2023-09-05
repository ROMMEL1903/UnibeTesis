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
exports.updateCarga = exports.getCargabyEscuela = exports.deletCarga = exports.getCarga = exports.newCarga = exports.getCargas = void 0;
const carga_academica_1 = require("../models/carga_academica");
const getCargas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const listaCargas = yield carga_academica_1.Carga_Academica.findAll();
    res.json(listaCargas);
});
exports.getCargas = getCargas;
const newCarga = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, ciEstudiante, fecha, periodo, escuela, modalidad } = req.body;
    try {
        if (!ciEstudiante || !fecha || !periodo || !modalidad) {
            return res.status(400).json({ msg: 'Por favor, proporcione todos los datos requeridos' });
        }
        const carga = yield carga_academica_1.Carga_Academica.create({
            ciEstudiante: ciEstudiante,
            fecha: fecha,
            periodo: periodo,
            escuela: escuela,
            modalidad: modalidad
        });
        res.json({
            msg: 'Carga creada exitosamente',
            cargaid: carga.get('id')
        });
    }
    catch (error) {
        res.status(400).json({
            msg: 'Upss ocurrio un error',
            error
        });
    }
});
exports.newCarga = newCarga;
const getCarga = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const carga = yield carga_academica_1.Carga_Academica.findByPk(id);
    if (carga) {
        res.json(carga);
    }
    else {
        res.status(404).json({
            msg: 'No existe una carga academica con el id:' + id
        });
    }
});
exports.getCarga = getCarga;
const deletCarga = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const carga = yield carga_academica_1.Carga_Academica.findByPk(id);
    if (carga) {
        yield carga.destroy();
        res.status(404).json({
            msg: 'Carga eliminada con exito'
        });
    }
    else {
        res.status(404).json({
            msg: 'No exte una carga con el id:' + id
        });
    }
});
exports.deletCarga = deletCarga;
const getCargabyEscuela = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { escuela } = req.query;
    const carga = yield carga_academica_1.Carga_Academica.findAll({ where: {
            escuela: escuela
        } });
    res.json(carga);
});
exports.getCargabyEscuela = getCargabyEscuela;
const updateCarga = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const { id } = req.params;
    try {
        const carga = yield carga_academica_1.Carga_Academica.findByPk(id);
        if (carga) {
            yield carga.update(body);
            res.json({
                msg: 'Exito'
            });
        }
        else {
            res.json({
                msg: 'Carga no encontrada'
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
exports.updateCarga = updateCarga;
