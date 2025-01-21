import { BudgetController } from "../../../controllers/BudgetController"
import budgets from '../../../models/Budget'
import { createRequest, createResponse } from 'node-mocks-http'
import { budget } from "../../mocks/budgets"
import Expense from "../../../models/Expense"

jest.mock('../../../models/Budget', () => ({
    findAll: jest.fn(),
    create: jest.fn(),
    findByPk: jest.fn()
}))

describe('BudgetController.getAll', () => {
    beforeEach(() => {
        (budgets.findAll as jest.Mock).mockReset();
        (budgets.findAll as jest.Mock).mockImplementation((options) => {
            const filter = budget.filter(n => n.userId === options.where.userId);
            return Promise.resolve(filter)
        })
    })
    it('should retrieve 3 budgets', async () => {
        const req = createRequest({
            method: 'GET',
            url: '/api/budgets',
            usuarios: { id: 2 }
        })
        const res = createResponse();

        await BudgetController.getAll(req, res)

        const data = res._getJSONData()

        console.log(data)

    })
})

describe('BudgetController.create', () => {
    it('should create a new budget ', async () => {
        const mockBudget = {
            save: jest.fn().mockResolvedValue(true)
        };
        (budgets.create as jest.Mock).mockResolvedValue(mockBudget)
        const req = createRequest({
            method: 'POST',
            url: '/api/budgets',
            usuarios: { id: 2 },
            body: { name: 'Presupuesto prueba', amount: 1000 }
        })
        const res = createResponse();

        await BudgetController.create(req, res)

        const data = res._getJSONData()

        expect(res.statusCode).toBe(201)
        expect(data.mensaje).toBe('creado')
        expect(mockBudget.save).toHaveBeenCalledTimes(1)

    })
})

describe('BudgetController.getAll', () => {
    beforeEach(() => {
        (budgets.findAll as jest.Mock).mockReset();
        (budgets.findAll as jest.Mock).mockImplementation((options) => {
            const filter = budget.filter(n => n.userId === options.where.userId);
            return Promise.resolve(filter)
        })
    })
    it('should retrieve 3 budgets', async () => {
        const req = createRequest({
            method: 'GET',
            url: '/api/budgets',
            usuarios: { id: 2 }
        })
        const res = createResponse();

        await BudgetController.getAll(req, res)

        const data = res._getJSONData()

        console.log(data)

    })
})

describe('BudgetController.create', () => {
    it('should handle budget creation error ', async () => {
        const mockBudget = {
            save: jest.fn().mockResolvedValue(true)
        };
        (budgets.create as jest.Mock).mockRejectedValue(new Error)
        const req = createRequest({
            method: 'GET',
            url: '/api/budgets',
            usuarios: { id: 2 }
        })
        const res = createResponse();

        await BudgetController.create(req, res)

        const data = res._getJSONData()

        expect(res.statusCode).toBe(500)
        expect(data).toEqual({ error: 'Hubo un error' })
        expect(mockBudget.save).not.toHaveBeenCalled()
        expect(budgets.create).toHaveBeenCalledWith(req.body)


    })
})

describe('BudgetController getById', () => {
    beforeEach(() => {
        (budgets.findByPk as jest.Mock).mockImplementation(id => {
            const filter = budget.filter(n => n.id === id)[0];
            return Promise.resolve(filter)
        })
    })
    it('Should return a budget with ID 1 and 3 expenses', async () => {
        const req = createRequest({
            method: 'POST',
            url: '/api/budgets',
            budget: { id: 1 }
        })

        const res = createResponse();
        await BudgetController.getById(req, res)
        const data = res._getJSONData()
        expect(res.statusCode).toBe(202)
        expect(data.expenses).toHaveLength(3)
        expect(budgets.findByPk).toHaveBeenCalled()
        expect(budgets.findByPk).toHaveBeenCalledTimes(1)
        expect(budgets.findByPk).toHaveBeenCalledWith(req.budget.id, {
            include: [Expense]
        })


    })
})

describe('BudgetController.UpdateById', () => {
    it('should update the budget and return a success message', async () => {
        const budgetMock = {
            update: jest.fn().mockResolvedValue(true)
        }

        const req = createRequest({
            method: 'PUT',
            url: '/api/budgets/:budgetId',
            budget: budgetMock,
            body:{name:'Presupuesto Actualizado', amount: 3000}
        })
        const res = createResponse();
        await BudgetController.editById(req, res)

        const data = res._getJSONData()
        expect(res.statusCode).toBe(200);
        expect(data).toBe('Presupuesto Actualizado')
        expect(budgetMock.update).toHaveBeenCalled()
        expect(budgetMock.update).toHaveBeenCalledTimes(1)
        expect(budgetMock.update).toHaveBeenCalledWith(req.body)
    })
})

describe('BudgetController.UpdateById', () => {
    it('should delete the budget and return a success message', async () => {
        const budgetMock = {
            destroy: jest.fn().mockResolvedValue(true)
        }

        const req = createRequest({
            method: 'DELETE',
            url: '/api/budgets/:budgetId',
            budget: budgetMock
        })
        const res = createResponse();
        await BudgetController.deleteById(req, res)

        const data = res._getJSONData()
        expect(res.statusCode).toBe(200);
        expect(data).toBe('Presupuesto Eliminado') 
        expect(budgetMock.destroy).toHaveBeenCalled()
        expect(budgetMock.destroy).toHaveBeenCalledTimes(1)
       
    })
})