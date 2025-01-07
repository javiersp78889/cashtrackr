import { Request, Response, NextFunction } from "express"
import { body, param, validationResult } from "express-validator"
import Expense from "../models/Expense"


export const ExpenseValidations = async (req: Request, res: Response, next: NextFunction) => {
    await body('name').notEmpty().withMessage('El nombre del gasto no puede ir vacio').run(req)
    await body('amount').notEmpty().withMessage('El gasto no puede ir vacio').isInt().withMessage('El presupuesto debe ser numérico')
        .custom(value => value > 0)
        .withMessage('El gasto debe ser mayor a 0').run(req)

    next()
}


export const validateExpenseId = async (req: Request, res: Response, next: NextFunction) => {
      await param('expenseId').isInt().withMessage('El id debe ser un entero').custom(value => value > 0).withMessage('Id no valido').run(req)
        let errors = validationResult(req)
        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array() })
        } else {
            next()
        }
    next()
}

