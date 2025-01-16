import type { Response, Request } from 'express'
import budgets from '../models/Budget'
import Expense from '../models/Expense'

export class BudgetController {
    static getAll = async (req: Request, res: Response) => {
        const { id } = req.usuarios
        try {
            const budget = await budgets.findAll({
                where: { userId: id },
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
            budget.userId = req.usuarios.id
            console.log(budget)
            await budget.save()
            res.status(201).json({ mensaje: 'creado', budget })
        } catch (error) {
            res.status(500).json({ error: error })
        }

    }

    static getById = async (req: Request, res: Response) => {
        
            const budget = await budgets.findByPk(req.budget.id, {
                include: [Expense]
            })
        res.status(202).json(budget)

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