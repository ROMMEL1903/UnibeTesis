import{Router} from "express"
import validateToken from "./validate_token";
import { deletCarga, getCarga, getCargabyEscuela, getCargas, newCarga, updateCarga } from "../controllers/carga_academica";

const router= Router();

router.get('/lista', validateToken,getCargas)
router.post('/crearCarga',validateToken,newCarga)
router.get('/:id', validateToken,getCarga)
router.put('/:id', validateToken, updateCarga)
router.delete('/:id',validateToken,deletCarga)
router.get('/', validateToken,getCargabyEscuela)



export default router;