import { Request, Response } from 'express'
import { Carga_Academica } from '../models/carga_academica';
import { where } from 'sequelize';


export const getCargas = async (req: Request, res: Response) => {
    const listaCargas = await Carga_Academica.findAll();
    res.json(listaCargas)

}

export const newCarga = async (req: Request, res: Response) => {
    const { id, ciEstudiante, fecha, periodo,escuela, modalidad } = req.body;

    try {
        if (!ciEstudiante || !fecha || !periodo || !modalidad) {
            return res.status(400).json({ msg: 'Por favor, proporcione todos los datos requeridos' });
        }
        const carga = await Carga_Academica.create({
            ciEstudiante: ciEstudiante,
            fecha: fecha,
            periodo: periodo,
            escuela:escuela,
            modalidad: modalidad

        });
        res.json({
            msg: 'Carga creada exitosamente',
            cargaid:carga.get('id')
          });

       


    } catch (error) {
        res.status(400).json({

            msg: 'Upss ocurrio un error',
            error

        })
    }

}


export const getCarga = async (req: Request, res: Response) => {
    const { id } = req.params
    const carga = await Carga_Academica.findByPk(id)

    if (carga) {
        res.json(carga)
    } else {
        res.status(404).json({
            msg: 'No existe una carga academica con el id:' + id
        })
    }
}



export const deletCarga= async (req:Request, res:Response)=>{
    const {id}=req.params
    const carga= await Carga_Academica.findByPk(id)

    if(carga){
        await carga.destroy()
        res.status(404).json({
            msg:'Carga eliminada con exito'
        })
       
    }else{
        res.status(404).json({
            msg:'No exte una carga con el id:'+id
        })
        
    }
}


export const getCargabyEscuela = async (req: Request, res: Response) => {
    const{escuela}=req.query
    const carga:any= await Carga_Academica.findAll({where:{
     escuela:escuela
    }})
    res.json(carga)
 
 }

export const updateCarga = async (req: Request, res: Response) => {
    const { body } = req
    const { id } = req.params

    try {
        const carga = await Carga_Academica.findByPk(id)
        if (carga) {
            await carga.update(body)
            res.json({
                msg: 'Exito'
            })
        } else {
            res.json({
                msg: 'Carga no encontrada'
            })
        }

    } catch (error) {
        console.log(error)
        res.json({
            msg: 'Upps Ocurrio un error comunique con soporte'
        })
    }
}

