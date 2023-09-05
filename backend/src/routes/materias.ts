import{Router} from "express"
import{deletMateria, getMateria, getMaterias, newMateria, updateMateria} from '../controllers/materias'
import validateToken from "./validate_token";


const router= Router();

router.get('/lista', validateToken,getMaterias)
router.post('/crearMateria', validateToken,newMateria)
router.delete('/:id', validateToken,deletMateria)
router.get('/:id', validateToken,getMateria)
router.put('/:id', validateToken, updateMateria)

 
export default router;