import { Request, Response } from 'express'
import { Escuela } from '../models/escuela';


export const getEscuelas = async (req: Request, res: Response) => {
    const listaEscuelas = await Escuela.findAll();
    res.json(listaEscuelas)
}

export const newEscuela = async (req: Request, res: Response) => {
    const { nombre, matriculaOrdinaria, matriculaExtraordinaria, matriculaEspecial, Inscripcion, modalidadPresencial, modalidadSemipresencial, modalidadNocturno, modalidadDistancia } = req.body;
    const escuela = await Escuela.findOne({ where: { nombre: nombre } })
    if (escuela) {
        return res.status(400).json({
            msg: 'La escuela ' + nombre + ' ya existe'
        })
    }

    try {
        await Escuela.create({
            nombre: nombre,
            matriculaOrdinaria: matriculaOrdinaria,
            matriculaExtraordinaria: matriculaExtraordinaria,
            matriculaEspecial: matriculaEspecial,
            Inscripcion: Inscripcion,
            modalidadPresencial: modalidadPresencial,
            modalidadSemipresencial: modalidadSemipresencial,
            modalidadNocturno: modalidadNocturno,
            modalidadDistancia: modalidadDistancia
        })
        res.json({
            msg: 'Escuela ' + nombre + ' creada'
        })
    } catch (error) {
        res.status(400).json({

            msg: 'Upss ocurrio un error',
            error

        })
    }

}
export const getEscuela = async (req: Request, res: Response) => {
    const { id } = req.params
    const escuela = await Escuela.findByPk(id)

    if (escuela) {
        res.json(escuela)
    } else {
        res.status(404).json({
            msg: 'No existe una escuelaa c on el id:' + escuela
        })
    }
}
export const updateEscuela = async (req: Request, res: Response) => {
    const { body } = req
    const { id } = req.params

    try {
        const escuela = await Escuela.findByPk(id)

        if (escuela) {
            await escuela.update(body)
            res.json({
                msg: 'La materia ha sido actualizado'
            })
        } else {
            res.json({
                msg: 'La escuela ' + id + ' no existe'
            })
        }
    } catch (error) {
        console.log(error)
        res.json({
            msg: 'Upps Ocurrio un error comunique con soporte'
        })
    }
}



export const getNombresEscuela = async (req: Request, res: Response) => {
    try {
        const escuelas: any = await Escuela.findAll({
            attributes: ['nombre']
        });

        res.json(escuelas);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener los nombres de las escuelas' });
    }
};


export const getValores = async (req: Request, res: Response) => {
    const { nombre } = req.query;
    try {
        const valores: any = await Escuela.findOne({
            where: { nombre: nombre },
           
        });

        if (valores) {
            res.json(valores);
        } else {
            res.status(404).json({ error: 'No se encontraron valores para el nombre proporcionado' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener los valores' });
    }
}
