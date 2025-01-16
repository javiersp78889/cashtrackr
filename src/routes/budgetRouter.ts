import { Router } from 'express'
import { BudgetController } from '../controllers/BudgetController'
import { handleInputErrors } from '../middleware/validation'
import { findbyId, findExpensebyId, hasAccess, hasExpenseAcess } from '../middleware/findById'
import { bodyValidations, paramValidations } from '../middleware/ExpressValidator'
import Expense from '../models/Expense'
import { ExpensesController } from '../controllers/ExpenseController'
import { ExpenseValidations } from '../middleware/Expense'
import { autenticate } from '../middleware/autenticate'


const router = Router()
router.use(autenticate) // req.usuarios

router.param('budgetId', paramValidations)
router.param('budgetId', findbyId)  // req.budget
router.param('budgetId', hasAccess)

/**Gastos params */
router.param('expenseId', findbyId)
router.param('expenseId', findExpensebyId)
router.param('expenseId', hasExpenseAcess)

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