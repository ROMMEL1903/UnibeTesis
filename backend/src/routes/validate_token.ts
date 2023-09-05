import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken'

const validateToken = (req: Request, res: Response, next: NextFunction) => {
    console.log('validate toke')
    const headerToken = req.headers['authorization']
    console.log(headerToken);
    if (headerToken != undefined && headerToken.startsWith('Bearer')) {

        try {
            const bearerToken = headerToken.slice(7)
            console.log(bearerToken)

            jwt.verify(bearerToken, process.env.CLAVE_SECRETA || 'GmRawg14')
            next()

        } catch (error) {
            res.status(401).json({
                msg: 'token no valido '
            })
        }

    } else {
        res.status(401).json({
            msg: 'Acesso denegado'
        })
    }

}

export default validateToken