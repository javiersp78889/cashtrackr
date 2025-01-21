import { createRequest, createResponse } from "node-mocks-http"
import { findbyId } from "../../../middleware/findById"

jest.mock('../../../models/Budget', () => ({
    findByPk: jest.fn()
}))

describe('Buget - validateBudgetExists', () => {
    it('should handle non-existent budget', async () => {
        const res = createResponse()

        const req = createRequest({
            params: {
                budgetId: 1
            }
        })

        const next = jest.fn()

        await findbyId(req, res, next)
        const data = res._getJSONData()
        expect(res.statusCode).toBe(404)
        expect(data).toEqual({ mensaje: 'Presupuesto no encontrado' })
        expect(next).not.toHaveBeenCalled()

    })
})

describe('Should proceed to nex middleware if budget exist', () => {
    it('should handle non-existent budget', async () => {
        const res = createResponse()

        const req = createRequest({
            params: {
                budgetId: 1
            }
        })

        const next = jest.fn()

        await findbyId(req, res, next)
        const data = res._getJSONData()
        expect(res.statusCode).toBe(404)
        expect(data).toEqual({ mensaje: 'Presupuesto no encontrado' })
        expect(next).not.toHaveBeenCalled()

    })
})