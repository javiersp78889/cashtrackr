import { NextFunction, request, type Request, type Response } from "express";
import jwt from 'jsonwebtoken'
import Users from "../models/User";
import Expense from "../models/Expense";

declare global {
    namespace Express {
        interface Request {
            usuarios?: Users
        }
    }
}

export const autenticate = async (req: Request, res: Response, next: NextFunction) => {
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

            if (typeof decoded === "object" && decoded.id) {

                const user = await Users.findByPk(decoded.id, {
                    attributes: ['id', 'name', 'email']
                })
                req.usuarios = user
                next()
            }
        } catch (error) {
            res.status(500).json({ error: 'Token no valido' })

        }
    }
}