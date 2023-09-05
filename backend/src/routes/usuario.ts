import { Router } from "express";
import { deletUser, getUsuario, getUsuarios, getUsuariosbyRolandEscuela, loginUser, newUser, updateUser } from "../controllers/usuarios";
import validateToken from "./validate_token";

const router = Router();

router.post('/', newUser)
router.post('/login', loginUser)
router.get('/lista', validateToken,getUsuarios)
router.get('/:cedula', validateToken,getUsuario)
router.delete('/:cedula', validateToken, deletUser)
router.put('/:cedula', validateToken, updateUser)
router.get('/get/Estudiantes', validateToken, getUsuariosbyRolandEscuela)


export default router