import type { Request, Response, NextFunction } from 'express'
import Users from '../models/User'
import { passwordVerify } from '../utils/bcrypt'
declare global {
    namespace Express {
        interface Request {
            user?: Users
        }
    }
}

export const verificarLogueo = async (req: Request, res: Response, next: NextFunction) => {

    const { email, password } = req.body
    console.log(req.body)

    const usuario = await Users.findOne({ where: { email } })

    if (usuario) {
        const verify = await passwordVerify(password, usuario.password)
        if (verify) {

            req.user = usuario
            next()
        } else {
            const error = new Error('Datos Incorrectos')
            res.status(409).json({ error: error.message })
        }
        
    } else {
        const error = new Error('Esta cuenta no existe')
        res.status(404).json({ error: error.message })
    }

}