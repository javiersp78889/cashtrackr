import Budget from "../models/Budget"
import type { Response, Request, NextFunction } from 'express'
declare global {
    namespace Express {
        interface Request {
            budget?: Budget
        }
    }
}
export const findbyId = async (req: Request, res: Response, next: NextFunction) => {
    const { budgetId } = req.params
    console.log(budgetId)
    req.budget = await Budget.findByPk(budgetId)
    if (req.budget) {
       
        next()
    } else {
        const error = new Error('Presupuesto no encontrado')
        res.status(404).json({ mensaje: error.message })
    }
}