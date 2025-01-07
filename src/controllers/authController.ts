import type { Request, Response } from "express";
import Users from "../models/User";
import { Bcrypt } from "../utils/bcrypt";


export class authController {
    static create = async (req: Request, res: Response) => {
        try {

            const user = new Users(req.body)
            user.password = await Bcrypt(req.body.password)
            await user.save()
            res.status(201).json(user)

        } catch (error) {
            res.status(500).json({ error: 'Hubo un error' })
        }

    }
}