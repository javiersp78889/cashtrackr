import { Router } from 'express'
import { BudgetController } from '../controllers/BudgetController'
import { handleInputErrors } from '../middleware/validation'
import { findbyId } from '../middleware/findById'
import { bodyValidations, paramValidations } from '../middleware/ExpressValidator'
import { body } from 'express-validator'


const router = Router()

router.param('budgetId', paramValidations)
router.param('budgetId', findbyId)



router.get('/', BudgetController.getAll)
router.post('/',bodyValidations, handleInputErrors, BudgetController.create)
router.get('/:budgetId', BudgetController.getById)
router.put('/:budgetId',bodyValidations,  handleInputErrors, BudgetController.editById)
router.delete('/:budgetId', BudgetController.deleteById)







export default router