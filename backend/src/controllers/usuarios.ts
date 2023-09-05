import { Request, Response, json } from 'express'
import bcrypt from 'bcrypt';
import { Usuario } from '../models/usuario';
import jwt from 'jsonwebtoken'

export const newUser = async (req: Request, res: Response) => {
    const { cedula, nombres, rol, escuela, correo, clave, primer_Inicio } = req.body;
    const encriptada = await bcrypt.hash(clave, 10)
    const usuario = await Usuario.findOne({ where: { cedula: cedula } })
    if (usuario) {
        return res.status(400).json({
            msg: 'El usuario ' + cedula + ' ya existe'
        })
    }
    try {
        await Usuario.create({
            cedula: cedula,
            nombres: nombres,
            rol: rol,
            escuela: escuela,
            correo: correo,
            clave: encriptada,
            primer_Inicio: primer_Inicio
        })
        res.json({
            msg: 'usuario ' + correo + ' creado'
        })
    } catch (error) {
        res.status(400).json({

            msg: 'Upss ocurrio un error',
            error

        })
    }
}

export const loginUser = async (req: Request, res: Response) => {

    const { correo, clave } = req.body;
    const user: any = await Usuario.findOne({ where: { correo: correo } })
    if (!user) {
        return res.status(400).json({
            msg: 'El usuario ' + correo + ' no existe'
        })
    }
    const claveCorrecta = await bcrypt.compare(clave, user.clave)
    console.log(claveCorrecta)
    if (!claveCorrecta) {
        return res.status(400).json({
            msg: 'Clave incorrecta'
        })
    }

    const token = jwt.sign({
        correo: correo,
        rol: user.rol,
        escuela:user.escuela,
        cedula:user.cedula

    }, process.env.CLAVE_SECRETA || 'GmRawg14');

    res.json(token)
}


export const getUsuarios = async (req: Request, res: Response) => {
    const usuarios = await Usuario.findAll();
    res.json(usuarios)

}

export const getUsuario = async (req: Request, res: Response) => {
    const { cedula } = req.params
    const usuario = await Usuario.findByPk(cedula)

    if (usuario) {
        res.json(usuario)
    } else {
        res.status(404).json({
            msg: 'No existe un usuario con el numero de cedula:' + cedula
        })
    }
}


export const deletUser = async (req: Request, res: Response) => {
    const { cedula } = req.params
    const usuario = await Usuario.findByPk(cedula)

    if (usuario) {
        await usuario.destroy()
        res.status(404).json({
            msg: 'El usuario fue eliminado con exito'
        })

    } else {
        res.status(404).json({
            msg: 'No existe un usuario con el numero de cedula' + cedula
        })

    }
}


export const updateUser = async (req: Request, res: Response) => {
    const { body } = req
    const { cedula } = req.params

    try {
        const usuario = await Usuario.findByPk(cedula)

        if (usuario) {
            await usuario.update(body)
            res.json({
                msg: 'El usuario a sido actualizado'
            })
        } else {
            res.json({
                msg: 'El usuario ' + cedula + ' no existe'
            })
        }
    } catch (error) {
        console.log(error)
        res.json({
            msg: 'Upps Ocurrio un error comunique con soporte'
        })
    }
}

export const getUsuariosbyRolandEscuela = async (req: Request, res: Response) => {
   const{rol,escuela}=req.query
   const user:any= await Usuario.findAll({where:{
    rol:rol,
    escuela:escuela
   }})
   res.json(user)

}
