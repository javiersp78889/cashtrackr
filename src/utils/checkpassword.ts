import type { Request, Response, NextFunction } from "express"
import { passwordVerify } from "./bcrypt"
import Users from "../models/User"

export const checkPassword = async (req: Request, res: Response, next: NextFunction) => {

    const usuario = await Users.findByPk(req.usuarios.id)
    const user = await passwordVerify(req.body.password, usuario.password)
    if(user){
        res.status(201).json("Autorizado")
    }else{
        res.status(501).json("Ups, parece que ese no era tu password")
    }
    

}