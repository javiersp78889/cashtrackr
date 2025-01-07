import Budget from "../models/Budget"
import type { Response, Request, NextFunction } from 'express'
import Expense from "../models/Expense"
declare global {
    namespace Express {
        interface Request {
            budget?: Budget
        }
    }
}
declare global {
    namespace Express {
        interface Request {
            expense?: Expense
        }
    }
}



export const findbyId = async (req: Request, res: Response, next: NextFunction) => {
    const { budgetId } = req.params
    req.budget = await Budget.findByPk(budgetId)
    if (req.budget) {
       console.log('pasando')
        next()
    } else {
        const error = new Error('Presupuesto no encontrado')
        res.status(404).json({ mensaje: error.message })
    }
}


export const findExpensebyId = async (req: Request, res: Response, next: NextFunction) => {
    const { expenseId } = req.params
    req.expense = await Expense.findByPk(expenseId)
    if (req.expense) {
   
        next()
    } else {
        const error = new Error('Gasto no encontrado')
        res.status(404).json({ mensaje: error.message })
    }
}