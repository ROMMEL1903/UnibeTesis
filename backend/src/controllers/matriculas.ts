import { Request, Response } from 'express'
import { Matricula } from '../models/matricula';



export const newMatricula = async (req: Request, res: Response) => {
   const { ciEstudiante,   Fecha,  nivel, escuela,valorMatricula,tipoMatricula} = req.body;

   try {
    const matricula =await Matricula.create({
      ciEstudiante:ciEstudiante,
      Fecha:Fecha,
      nivel:nivel,
      escuela:escuela,
      valorMatricula:valorMatricula,
      tipoMatricula:tipoMatricula
    })
    res.json({
        msg: 'Matricula creada exitosamente',
        matriculID:matricula.get('id')
      });
} catch (error) {
    res.status(400).json({

        msg: 'Upss ocurrio un error',
        error

    })
}

}

export const getMatriculas = async (req: Request, res: Response) => {
    const listaMatriculas = await Matricula.findAll();
    res.json(listaMatriculas)

}
export const getMatricula = async (req: Request, res: Response)=>{
    const {id}=req.params
    const matricula= await Matricula.findByPk(id)

    if(matricula){
        res.json(matricula)
    }else{
        res.status(404).json({
            msg:'No existe una materia con el id:'+matricula
        })
    }
}
export const updateMatricula = async (req: Request, res: Response) => {
    const { body } = req
    const { id } = req.params

    try {
        const matricula = await Matricula.findByPk(id)

        if (matricula) {
            await matricula.update(body)
            res.json({
                msg: 'La matricula ha sido actualizado'
            })
        } else {
            res.json({
                msg: 'La matricula ' + id + ' no existe'
            })
        }
    } catch (error) {
        console.log(error)
        res.json({
            msg: 'Upps Ocurrio un error comunique con soporte'
        })
    }
 }

 export const getMatriculasbyEscuela = async (req: Request, res: Response) => {
    const{escuela}=req.query
    const matriculas:any= await Matricula.findAll({where:{
     escuela:escuela
    }})
    res.json(matriculas)
 
 }


 export const deletMatricula= async (req:Request, res:Response)=>{
    const {id}=req.params
    const matricula= await Matricula.findByPk(id)

    if(matricula){
        await matricula.destroy()
        res.status(404).json({
            msg:'Matricula eliminada con exito'
        })
       
    }else{
        res.status(404).json({
            msg:'No exte una carga con el id:'+id
        })
        
    }
}
