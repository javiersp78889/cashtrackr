import type { Response, Request } from 'express'
import budgets from '../models/Budget'

export class BudgetController {
    static getAll = async (req: Request, res: Response) => {
        try {
            const budget = await budgets.findAll({
                order: [['createdAt', 'DESC']]
            })
            res.status(200).json(budget)
        } catch (error) {
            res.status(500).json({ error: error })
        }

    }
    static create = async (req: Request, res: Response) => {
        try {
            const budget = new budgets(req.body)
            await budget.save()
            res.status(201).json({ mensaje: 'creado', budget })
        } catch (error) {
            res.status(500).json({ error: 'Hubo un error' })
        }

    }

    static getById = async (req: Request, res: Response) => {

        res.status(202).json(req.budget)

    }

    static editById = async (req: Request, res: Response) => {
        try {
            await req.budget.update(req.body)
            res.status(200).json({ mensaje: 'Presupuesto Actualizado' })
        } catch (error) {
            res.status(500).json({ error: error })
        }

    }
    static deleteById = async (req: Request, res: Response) => {
        try {

            await req.budget.destroy()
            res.status(200).json({ mensaje: 'Presupuesto Eliminado' })
        } catch (error) {
            const errors = new Error('Error al eliminar el presupuesto')
            res.status(500).json({ error: errors.message })
        }


    }
}