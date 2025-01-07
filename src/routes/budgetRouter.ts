import { Router } from 'express'
import { BudgetController } from '../controllers/BudgetController'
import { handleInputErrors } from '../middleware/validation'
import { findbyId, findExpensebyId } from '../middleware/findById'
import { bodyValidations, paramValidations } from '../middleware/ExpressValidator'
import Expense from '../models/Expense'
import { ExpensesController } from '../controllers/ExpenseController'
import { ExpenseValidations } from '../middleware/Expense'


const router = Router()

router.param('budgetId', paramValidations)
router.param('budgetId', findbyId)

/**Gastos params */
router.param('expenseId', findbyId)
router.param('expenseId', findExpensebyId)

router.get('/', BudgetController.getAll)
router.post('/', bodyValidations, handleInputErrors, BudgetController.create)
router.get('/:budgetId', BudgetController.getById)
router.put('/:budgetId', bodyValidations, handleInputErrors, BudgetController.editById)
router.delete('/:budgetId', BudgetController.deleteById)


/**Gastos **/

router.post('/:budgetId/expenses', ExpenseValidations, handleInputErrors, ExpensesController.create)
router.get('/:budgetId/expenses/:expenseId',ExpensesController.getById)
router.put('/:budgetId/expenses/:expenseId',ExpenseValidations, handleInputErrors, ExpensesController.updateById)
router.delete('/:budgetId/expenses/:expenseId', ExpensesController.deleteById)



export default router