import type { Request, Response } from "express";
import Users from "../models/User";
import { Bcrypt } from "../utils/bcrypt";
import { generateToken } from "../utils/Token";
import { SendMessage } from "../emails/AuthEmails";


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
        res.json('Logueado')
    }
}