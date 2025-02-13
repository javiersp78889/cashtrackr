import type { Request, Response, NextFunction } from "express"
import Users from "../models/User"
import { Bcrypt } from "../utils/bcrypt"
declare global {
    namespace Express {
        interface Request {
            user?: Users
        }
    }
}
export const userVerify = async (req: Request, res: Response, next: NextFunction) => {
    const { email, } = req.body

    const user = await Users.findOne({ where: { email } })
    if (user) {
        req.user = user
        res.status(409).json({ error: 'Este usuario ya existe' })
    } else {

        next()
    }


}
export const userProfileVerify = async (req: Request, res: Response, next: NextFunction) => {
    const { email, name } = req.body

    const user = await Users.findByPk(req.usuarios.id)
    if (user) {
        if (user.email === email) {
            user.name = name
            user.save()

            res.status(200).json('Nombre Actualizado')

        } else {

            next()


        }
    } else {
        next()
    }
}
export const userProfileEmailVerify = async (req: Request, res: Response, next: NextFunction) => {
    const { email } = req.body

    const user = await Users.findOne({ where: {email} })
    if (user) {

        res.status(409).json('Correo en uso')
    } else {
        next()
    }
}