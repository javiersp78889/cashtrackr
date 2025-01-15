import type { Request, Response, NextFunction } from "express"

export const checkPassword = async (req: Request, res: Response, next: NextFunction) => {
console.log(req.usuarios.id)
        
}