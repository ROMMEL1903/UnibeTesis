import{Router} from "express"
import validateToken from "./validate_token";
import { getEscuela, getEscuelas, getNombresEscuela, getValores, newEscuela, updateEscuela } from "../controllers/escuela";



const router= Router();

router.get('/lista', validateToken,getEscuelas)
router.post('/crearEscuela', validateToken,newEscuela)
router.get('/:id', validateToken,getEscuela)
router.put('/:id', validateToken, updateEscuela)
router.get('/nombres/escuelas',validateToken ,getNombresEscuela)
router.get('/valores/escuela', validateToken,getValores)
export default router;