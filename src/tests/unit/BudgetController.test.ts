import { response } from "express"
import { BudgetController } from "../../controllers/BudgetController"
import budgets from '../../models/Budget'
import { createRequest, createResponse } from 'node-mocks-http'
import { budget } from "../mocks/budgets"

jest.mock('../../models/Budget', () => ({
    findAll: jest.fn()
}))

describe('BudgetController.getAll', () => {
    it('should retrieve 3 budgets', async () => {
        const req = createRequest({
            method: 'GET',
            url: '/api/budgets',
            usuarios: { id: 2 }
        })
        const res = createResponse();
        const filter = budget.filter(n => n.userId === req.usuarios.id);
        (budgets.findAll as jest.Mock).mockResolvedValue(filter)
        await BudgetController.getAll(req, res)

        const data = res._getJSONData()

        console.log(data)

    })
})