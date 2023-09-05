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
exports.newMateriasCargas = exports.deletMateriaCargaPorIdCarga = exports.getMateriasCarga = void 0;
const materaintoCarga_1 = require("../models/materaintoCarga");
//* ENDPOIN PARA VER LAS MATERIAS QUE TIENE UN CARGA ACADEMICA
const getMateriasCarga = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idCarga } = req.query;
    const listaMateriasCarga = yield materaintoCarga_1.Materia_Carga.findAll({ where: {
            idCarga: idCarga,
        } });
    res.json(listaMateriasCarga);
});
exports.getMateriasCarga = getMateriasCarga;
const deletMateriaCargaPorIdCarga = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const idCarga = req.query.idCarga;
    if (!idCarga) {
        return res.status(400).json({ msg: 'Debe proporcionar el parámetro idCarga en el query string' });
    }
    try {
        const materiasCarga = yield materaintoCarga_1.Materia_Carga.findAll({
            where: {
                idCarga: idCarga
            }
        });
        if (materiasCarga.length === 0) {
            return res.status(404).json({ msg: 'No existe ninguna materia con el idCarga: ' + idCarga });
        }
        yield Promise.all(materiasCarga.map((materiaCarga) => __awaiter(void 0, void 0, void 0, function* () {
            yield materiaCarga.destroy();
        })));
        res.status(200).json({ msg: 'Todas las materias fueron eliminadas exitosamente' });
    }
    catch (error) {
        console.error('Error al eliminar materias:', error);
        res.status(500).json({ msg: 'Ocurrió un error al eliminar las materias.' });
    }
});
exports.deletMateriaCargaPorIdCarga = deletMateriaCargaPorIdCarga;
const newMateriasCargas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idCarga, idMateria, materia, totalMateria } = req.body;
    try {
        yield materaintoCarga_1.Materia_Carga.create({
            idCarga: idCarga,
            idMateria: idMateria,
            materia: materia,
            totalMateria: totalMateria
        });
        res.json({
            msg: 'Exito'
        });
    }
    catch (error) {
        res.status(400).json({
            msg: 'Upss ocurrio un error',
            error
        });
    }
});
exports.newMateriasCargas = newMateriasCargas;
