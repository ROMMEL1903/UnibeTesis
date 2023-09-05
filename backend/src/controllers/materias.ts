import { Request, Response } from 'express'
import { Materia } from '../models/materias'

export const getMaterias = async (req: Request, res: Response) => {
    const listaMaterias = await Materia.findAll();
    res.json(listaMaterias)

}


export const newMateria= async( req: Request, res:Response)=>{
    const { nombre, abreviatura, creditos, ModaPresencial,ModaDistancia,ModaNocturno,ModaSemipresencial} = req.body;
    const materia = await Materia.findOne({ where: {nombre: nombre } })
    if (materia) {
        return res.status(400).json({
            msg: 'La materia ' + nombre + ' ya existe'
        })
    }

    try {
        await Materia.create({
            nombre:nombre,
            abreviatura:abreviatura,
            creditos:creditos,
            ModaPresencial:ModaPresencial,
            ModaSemipresencial:ModaSemipresencial,
            ModaDistancia:ModaDistancia,
            ModaNocturno:ModaNocturno
        })
        res.json({
            msg: 'Materia ' + nombre + ' creada'
        })
    } catch (error) {
        res.status(400).json({

            msg: 'Upss ocurrio un error',
            error

        })
    }

}

export const deletMateria= async (req:Request, res:Response)=>{
    const {id}=req.params
    const materia= await Materia.findByPk(id)

    if(materia){
        await materia.destroy()
        res.status(404).json({
            msg:'El usuario fue eliminado con exito'
        })
       
    }else{
        res.status(404).json({
            msg:'No exte una materia con el id:'+id
        })
        
    }
}



export const getMateria = async (req: Request, res: Response)=>{
    const {id}=req.params
    const materia= await Materia.findByPk(id)

    if(materia){
        res.json(materia)
    }else{
        res.status(404).json({
            msg:'No existe una materia con el id:'+materia
        })
    }
}



export const updateMateria = async (req: Request, res: Response) => {
    const { body } = req
    const { id } = req.params

    try {
        const materia = await Materia.findByPk(id)

        if (materia) {
            await materia.update(body)
            res.json({
                msg: 'La materia ha sido actualizado'
            })
        } else {
            res.json({
                msg: 'La materia ' + id + ' no existe'
            })
        }
    } catch (error) {
        console.log(error)
        res.json({
            msg: 'Upps Ocurrio un error comunique con soporte'
        })
    }
 }

