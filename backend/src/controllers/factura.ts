import { Request, Response } from 'express'
import { Factura } from '../models/factura';
import axios from 'axios';



export const getFacturas = async (req: Request, res: Response) => {
    const listaFacturas = await Factura.findAll();
    res.json(listaFacturas)

}
export const newFactura = async (req: Request, res: Response) => {
    const { nombre, ci, Fecha, Razon, idRazon,Beca,financiamiento, pagado,descuentoBeca, subtotal, total } = req.body;

    try {

        Factura.create({
            nombre: nombre,
            ci: ci,
            Fecha: Fecha,
            Razon: Razon,
            idRazon: idRazon,
            Beca:Beca,
            financiamiento:financiamiento,
            pagado: pagado,
            descuentoBeca:descuentoBeca,
            subtotal: subtotal,
            total: total

        });
        res.json({
            msg: 'Factura creada exitosamente',
        });




    } catch (error) {
        res.status(400).json({

            msg: 'Upss ocurrio un error',
            error

        })
    }
}
export const FacturasEstudiane = async (req: Request, res: Response) => {
    const { ciEstudiante } = req.query
    const factura: any = await Factura.findAll({
        where: {
            ci: ciEstudiante,        
        }
    })
    res.json(factura)
}
export const FacturasEstudianePendientes = async (req: Request, res: Response) => {
    const { ciEstudiante } = req.query
    const factura: any = await Factura.findAll({
        where: {
            ci: ciEstudiante,
            pagado:false        
        }
    })
    res.json(factura)
}
export const FacturaApagar = async (req: Request, res: Response) => {
    const { id } = req.query;
    const numeroId: number = parseInt(id as string, 10); // Convertir 'id' a un número

    if (isNaN(numeroId)) {
        res.status(400).json({
            msg: 'El parámetro "id" no es un número válido.',
        });
        return;
    }

    const factura = await Factura.findByPk(numeroId);

    if (factura) {
        res.json(factura);
    } else {
        res.status(404).json({
            msg: 'No existe una factura con el ID: ' + numeroId,
        });
    }




}
export const deleteFactura = async (req: Request, res: Response) => {
    const idRazon = req.query.idRazon;
  
    if (!idRazon) {
      return res.status(400).json({ msg: 'Debe proporcionar el parámetro id de la razon en el query string' });
    }
  
    try {
      const facturasPendientes = await Factura.findAll({
        where: {
          idRazon: idRazon,
          pagado: false
        }
      });
  
      const facturasPagadas = await Factura.findAll({
        where: {
          idRazon: idRazon,
          pagado: true
        }
      });
  
      if (facturasPagadas.length > 0) {
        return res.status(400).json({ msg: 'No se puede eliminar porque ya se han realizado pagos en algunas facturas.' });
      }
  
      if (facturasPendientes.length === 0) {
        return res.status(404).json({ msg: 'No existe ninguna Factura con el idRazon: ' + idRazon });
      }
  
      await Promise.all(facturasPendientes.map(async (factura) => {
        await factura.destroy();
      }));
  
      res.status(200).json({ msg: 'Las facturas pendientes fueron eliminadas exitosamente' });
    } catch (error) {
      console.error('Error al eliminar las facturas:', error);
      res.status(500).json({ msg: 'Ocurrió un error al eliminar las facturas.' });
    }
}; 
export const confirmarTransaccion = async (req: Request, res: Response) => {
    const { id, clientTransactionId } = req.query;
    console.log(req)
    console.log(req.body)
    console.log(req.query)
  const token="kO83khezj9D2KYO5iN3bncNttryCWFcgaiG0gkR__jH95BjA1ffi2Kf2SDl_4y64MZC-FiCopPoj9ZzNgVWh9ZaR72s8EsaM4-KpmLGEBwse6zdohMUWcguejSiRqW6EydSHjRiH-SF6pWJVXKbAIc4mD6LKpl2QuEJxEZT0_teaSunLhZg3KPJGMg-3pqDglyGlxHTGL9L3M0AJXdwtblAgS1e1x83ihhHC6DQhAQwHamcUMe5pg3kczLwaXgJ39I62_JstgsJ1A6lIYNpX3XUSt6ALrUSbh0MVs7NDD3LiYtTuhHYLSUNdhVgVlqcaQrbAE5Mdje2ehhMxmjEIO0eiqyE"
    const data = JSON.stringify({
      id:id,
      clientTxId: clientTransactionId,
    });
  
    try {

      const response = await axios.post(
        'https://pay.payphonetodoesposible.com/api/button/V2/Confirm',
        data,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      res.json(response.data);
    } catch (error) {
        console.log(error)
      res.status(500).json({
        msg: 'Ocurrió un error al confirmar la transacción.',
        
      });
    }
}
export const getConfirmacion = async (req: Request, res: Response) => {
 console.log(req.query)
 const { id, clientTxId } = req.query;

 const token="kO83khezj9D2KYO5iN3bncNttryCWFcgaiG0gkR__jH95BjA1ffi2Kf2SDl_4y64MZC-FiCopPoj9ZzNgVWh9ZaR72s8EsaM4-KpmLGEBwse6zdohMUWcguejSiRqW6EydSHjRiH-SF6pWJVXKbAIc4mD6LKpl2QuEJxEZT0_teaSunLhZg3KPJGMg-3pqDglyGlxHTGL9L3M0AJXdwtblAgS1e1x83ihhHC6DQhAQwHamcUMe5pg3kczLwaXgJ39I62_JstgsJ1A6lIYNpX3XUSt6ALrUSbh0MVs7NDD3LiYtTuhHYLSUNdhVgVlqcaQrbAE5Mdje2ehhMxmjEIO0eiqyE"
 const data = JSON.stringify({
   id:Number(id),
   clientTxId: clientTxId ,
 });

 try {

   const response = await axios.post(
     'https://pay.payphonetodoesposible.com/api/button/V2/Confirm',
     data,
     {
       headers: {
         'Authorization': `Bearer ${token}`,
         'Content-Type': 'application/json',
       },
     }
   );
   res.json(response.data);
 } catch (error) {
     console.log(error)
   res.status(500).json({
     msg: 'Ocurrió un error al confirmar la transacción.',
     
   });
 }

}
  export const getFacturasPagadasByIdRazon = async (req: Request, res: Response) => {
    const idRazon = req.query.idRazon;
  
    if (!idRazon) {
      return res.status(400).json({ msg: 'Debe proporcionar el parámetro id de la razon en el query string' });
    }
  
    try {
      const facturasPagadas = await Factura.findOne({
        where: {
          idRazon: idRazon,
          pagado: true
        }
      });
  
      res.json(facturasPagadas);
    } catch (error) {
      console.error('Error al consultar las facturas:', error);
      res.status(500).json({ msg: 'Ocurrió un error al consultar las facturas.' });
    }
}
export const updateFactrura = async (req: Request, res: Response) => {
  const { body } = req
  const { id } = req.params

  try {
      const factura = await Factura.findByPk(id)

      if (factura) {
          await factura.update(body)
          res.json({
              msg: 'Descuento agragado'
          })
      } else {
          res.json({
              msg: 'La factura ' + id + ' no existe'
          })
      }
  } catch (error) {
      console.log(error)
      res.json({
          msg: 'Upps Ocurrio un error comunique con soporte'
      })
  }
}
export const getFacturaDescuento = async (req: Request, res: Response) => {
  const id = req.query.id;

  if (!id) {
    return res.status(400).json({ msg: 'Debe proporcionar el parámetro id de la razon en el query string' });
  }

  try {
    const getFactura = await Factura.findOne({
      where: {
        id: id,
        pagado:false
      }
    });

    res.json(getFactura);
  } catch (error) {
    console.error('Error al consultar las facturas:', error);
    res.status(500).json({ msg: 'Ocurrió un error al consultar las facturas.' });
  }
}


