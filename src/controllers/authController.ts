import { NextFunction, type Request, type Response } from "express";
import Users from "../models/User";
import { Bcrypt, passwordVerify } from "../utils/bcrypt";
import { generateToken } from "../utils/Token";
import { SendMessage } from "../emails/AuthEmails";
import { jwtgenerate } from "../utils/jwt";



export class authController {
    static create = async (req: Request, res: Response) => {
        try {

            const user = new Users(req.body)
            user.password = await Bcrypt(req.body.password)
            user.token = generateToken()
            await user.save()
            await SendMessage.SendToken(user)
            res.status(201).json('Cuenta Creada')

        } catch (error) {
            res.status(409).json({ error: 'Hubo un error' })
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
            usuario.token= null
            usuario.confirmed = true
            await usuario.save()
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
        res.json(req.usuarios)

    }
    static updateCurrentUserPassword = async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.usuarios
        const { password, current_password } = req.body
        const user = await Users.findByPk(id)
        const pwd = await passwordVerify(current_password, user.password)
        console.log(pwd)
        if (pwd) {
            const pass = await passwordVerify(password, user.password)
            if (pass) {
                res.status(401).json({ mensaje: 'El password nuevo no puede ser igual al anterior' })
            } else {
                user.password = await Bcrypt(password)
                user.save()
                res.status(201).json({ msg: 'Password Actualizado' })
            }

        } else {


            res.status(401).json({ mensaje: 'Para cambiar su password debe introducir su actual primero' })

        }
    }

  

}