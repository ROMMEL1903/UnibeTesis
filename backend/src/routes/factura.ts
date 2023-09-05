import{Router} from "express"
import validateToken from "./validate_token";
import {FacturaApagar, FacturasEstudiane, FacturasEstudianePendientes, confirmarTransaccion, deleteFactura, getConfirmacion, getFacturaDescuento, getFacturas, getFacturasPagadasByIdRazon, newFactura, updateFactrura } from "../controllers/factura";



const router= Router();

router.get('/listaFacturas', validateToken,getFacturas)
router.get('/modificarFactura', validateToken, getFacturaDescuento)
router.post('/crearfactura', validateToken,newFactura)
router.get('/misFacturas',validateToken, FacturasEstudiane)
router.get('/misFacturasPendientes',validateToken, FacturasEstudianePendientes)
router.get('/pagarFactura',validateToken, FacturaApagar)  
router.post('/confirmarPago',validateToken,confirmarTransaccion)
router.delete('/eliminar',validateToken,deleteFactura)
router.get('/verificarfactura',validateToken,getFacturasPagadasByIdRazon)
router.put('/:id', validateToken, updateFactrura)
router.get('/getConfirmacion',validateToken,getConfirmacion)



export default router;