import type { Request, Response, NextFunction } from "express";
import { body, param, validationResult } from 'express-validator'



export const paramValidations = async (req: Request, res: Response, next: NextFunction) => {    
   await param('budgetId').isInt().withMessage('El id debe ser un entero').custom(value => value > 0).run(req)
    let errors = validationResult(req)
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() })
    }else{
        next()
    }
    
}