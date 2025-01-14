import { NextFunction, type Request, type Response } from "express";
import Users from "../models/User";
import { Bcrypt } from "../utils/bcrypt";
import { generateToken } from "../utils/Token";
import { SendMessage } from "../emails/AuthEmails";
import { jwtgenerate } from "../utils/jwt";
import jwt from 'jsonwebtoken'


export class authController {
    static create = async (req: Request, res: Response) => {
        try {

            const user = new Users(req.body)
            user.password = await Bcrypt(req.body.password)
            user.token = generateToken()
            await user.save()
            await SendMessage.SendToken(user)
            res.status(201).json(user)

        } catch (error) {
            res.status(500).json({ error: 'Hubo un error' })
        }

    }

    static confirmAccount = async (req: Request, res: Response) => {
        const { token } = req.body

        const usuario = await Users.findOne({ where: { token } })
        if (!usuario) {
            const error = new Error('Token no válido')
            res.status(401).json({ error: error.message })
        } else {
            usuario.confirmed = true
            usuario.token = null
            await usuario.save()
            res.status(200).json('Cuenta Confirmada')
        }


    }
    static login = async (req: Request, res: Response) => {
        const token = jwtgenerate(req.user.id)

        res.json(token)
    }

    static passwordRecovery = async (req: Request, res: Response) => {
        const { email } = req.body
        const find = await Users.findOne({ where: { email } })
        if (find) {
            find.token = generateToken()
            await find.save()
            await SendMessage.SendToken(find)
            res.json({ message: 'Revisa tu email' })
        }

    }

    static confirmToken = async (req: Request, res: Response) => {
        const { token } = req.body

        const usuario = await Users.findOne({ where: { token } })
        if (!usuario) {
            const error = new Error('Token no válido')
            res.status(401).json({ error: error.message })
        } else {

            res.status(200).json('Cuenta Confirmada')
        }
    }

    static resetPasswordWithToken = async (req: Request, res: Response) => {
        const { token } = req.params
        const { password } = req.body

        const usuario = await Users.findOne({ where: { token } })

        if (usuario) {
            usuario.password = await Bcrypt(password)
            usuario.token = null
            await usuario.save()
            res.status(200).json('Actualizado')
        } else {
            const error = new Error('Error al cambiar el password, por favor intentelo mas tarde')
            res.status(500).json({ error: error.message })
        }
    }
    static getUser = async (req: Request, res: Response, next: NextFunction) => {
        const bearer = req.headers.authorization

        if (!bearer) {
            const error = new Error('No autorizado')
            res.status(401).json({ error: error.message })
        }
        else {

            const [, token] = bearer.split(' ')

            if (!token) {
                const error = new Error('No autorizado')
                res.status(401).json({ error: error.message })
            }

            try {
                const decoded = jwt.verify(token, process.env.SECRETO)
                res.json(decoded)
            } catch (error) {
                res.status(500).json({ error: 'Token no valido' })

            }
        }

    }
}