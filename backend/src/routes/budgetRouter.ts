import { Router } from 'express'
import { BudgetController } from '../controllers/BudgetController'
import { handleInputErrors } from '../middleware/validation'
import { findbyId } from '../middleware/findById'
import { bodyValidations, paramValidations } from '../middleware/ExpressValidator'
import Expense from '../models/Expense'
import { ExpensesController } from '../controllers/ExpenseController'


const router = Router()

router.param('budgetId', paramValidations)
router.param('budgetId', findbyId)



router.get('/', BudgetController.getAll)
router.post('/', bodyValidations, handleInputErrors, BudgetController.create)
router.get('/:budgetId', BudgetController.getById)
router.put('/:budgetId', bodyValidations, handleInputErrors, BudgetController.editById)
router.delete('/:budgetId', BudgetController.deleteById)


/**Gastos **/

router.post('/:budgetId/expenses', ExpensesController.getAll)
router.post('/:budgetId/expenses/:id', ExpensesController.create)
router.get('/:budgetId/expenses/:id', ExpensesController.getById)
router.put('/:budgetId/expenses/:id', ExpensesController.updateById)
router.delete('/:budgetId/expenses/:id', ExpensesController.deleteById)



export default router