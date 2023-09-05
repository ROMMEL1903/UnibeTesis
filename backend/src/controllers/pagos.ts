import { Request, Response } from 'express'
import { Pago } from '../models/pago';

export const newPago= async( req: Request, res:Response)=>{
    const {transactionId, idFactura, storeName, document, transactionStatus} = req.body;
    const pago = await Pago.findOne({ where: {idFactura: idFactura } })
    try {
        await Pago.create({
            transactionId:transactionId,
            idFactura:idFactura,
            storeName:storeName,
            document:document,
            transactionStatus:transactionStatus
            
        })
        res.json({
            msg: 'Porfavor realice el pago de su facturahfgh'+idFactura
        })
    } catch (error) {
    
    }

}



export const getPago = async (req: Request, res: Response)=>{
    const {idFactura}=req.query
    const pago= await Pago.findOne({where:{
        idFactura:idFactura,
       }})

    if(pago){
        res.json(pago)
    }else{
        res.status(404).json({
            msg:'No existe el pago'
        })
    }
}


export const getPagos = async (req: Request, res: Response) => {
    const listapagos = await Pago.findAll();
    res.json(listapagos)

}