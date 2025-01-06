import type { Response, Request } from 'express'
import budgets from '../models/Budget'

export class BudgetController {
    static getAll = async (req: Request, res: Response) => {
        const budget = await budgets.findAll()
        res.status(200).json(budget)
    }
    static create = async (req: Request, res: Response) => {
        try {
            const budget = new budgets(req.body)
            await budget.save()
            res.status(201).json({mensaje:'creado',budget})
        } catch (error) {
            res.status(500).json({error:'Hubo un error'})
        }

    }

    static getById = async (req: Request, res: Response) => {

    }

    static editById = async (req: Request, res: Response) => {

    }
    static deleteById = async (req: Request, res: Response) => {

    }
}