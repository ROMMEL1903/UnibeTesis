import { Request, Response } from 'express'

import { Materia_Carga } from '../models/materaintoCarga';
import { Carga_Academica } from '../models/carga_academica';

//* ENDPOIN PARA VER LAS MATERIAS QUE TIENE UN CARGA ACADEMICA
export const getMateriasCarga = async (req: Request, res: Response) => {
    const{idCarga}=req.query
    const listaMateriasCarga = await Materia_Carga.findAll({where:{
        idCarga:idCarga,

       }})
       res.json(listaMateriasCarga)
}
export const deletMateriaCargaPorIdCarga = async (req: Request, res: Response) => {
    const idCarga = req.query.idCarga;
  
    if (!idCarga) {
      return res.status(400).json({ msg: 'Debe proporcionar el parámetro idCarga en el query string' });
    }
  
    try {
      const materiasCarga = await Materia_Carga.findAll({
        where: {
          idCarga: idCarga
        }
      });
  
      if (materiasCarga.length === 0) {
        return res.status(404).json({ msg: 'No existe ninguna materia con el idCarga: ' + idCarga });
      }
  
      await Promise.all(materiasCarga.map(async (materiaCarga) => {
        await materiaCarga.destroy();
      }));
  
      res.status(200).json({ msg: 'Todas las materias fueron eliminadas exitosamente' });
    } catch (error) {
      console.error('Error al eliminar materias:', error);
      res.status(500).json({ msg: 'Ocurrió un error al eliminar las materias.' });
    }
  };
  
 

export const newMateriasCargas= async( req: Request, res:Response)=>{
    const { idCarga, idMateria, materia,totalMateria} = req.body;
  
    

    try {
        await Materia_Carga.create({
            idCarga:idCarga,
            idMateria:idMateria,
            materia:materia,
            totalMateria:totalMateria

        })
        res.json({
            msg: 'Exito'
        })
    } catch (error) {
        res.status(400).json({

            msg: 'Upss ocurrio un error',
            error

        })
    }

}


