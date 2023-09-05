import{Router} from "express"
import validateToken from "./validate_token";

import {  deletMateriaCargaPorIdCarga, getMateriasCarga, newMateriasCargas } from "../controllers/MateriaCarga";

const router= Router();

router.get('/lista', validateToken,getMateriasCarga)
router.post('/crear', validateToken,newMateriasCargas)
router.delete('/eliminar',validateToken,deletMateriaCargaPorIdCarga )



export default router;