import type { Request, Response, NextFunction } from 'express'
import Users from '../models/User'


export const Confirmado = async (req: Request, res: Response, next: NextFunction) => {

    if (req.user.confirmed) {
        next()
    } else {
        const error = new Error('Esta cuenta no esta verificada')
        res.status(403).json({ error: error.message })
    }



}