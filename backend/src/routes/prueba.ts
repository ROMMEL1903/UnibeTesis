import{Router} from "express"
import { postPagos } from "../controllers/prueba";
const router = Router();


router.post('/prueba', postPagos)

export default router;