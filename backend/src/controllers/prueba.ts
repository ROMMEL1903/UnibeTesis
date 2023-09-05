import { Request, Response } from 'express'
import { json } from 'sequelize'
import { Matricula } from '../models/matricula'


export const postPagos = async (req: Request, res: Response) => {
    console.log(req)
    const matricula= await Matricula.findOne()
    res.send({msg:JSON.stringify(req)})
}