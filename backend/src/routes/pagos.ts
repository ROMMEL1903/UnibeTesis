import{Router} from "express"

import validateToken from "./validate_token";
import { getPago, getPagos, newPago } from "../controllers/pagos";


const router= Router();

router.post('/crearPago', validateToken,newPago)
router.get('/obtenerPago',validateToken,getPago)
router.get('/listaPagos',validateToken,getPagos)
export default router;