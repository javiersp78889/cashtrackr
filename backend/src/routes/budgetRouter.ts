import { Router } from 'express'
import { BudgetController } from '../controllers/BudgetController'
import { handleInputErrors } from '../middleware/validation'
import { findbyId } from '../middleware/findById'
import { paramValidations } from '../middleware/ExpressValidator'
import { body } from 'express-validator'


const router = Router()

router.param('budgetId', paramValidations)
router.param('budgetId', findbyId)



router.get('/', BudgetController.getAll)
router.post('/', body('name').notEmpty().withMessage('El nombre no puede ir vacio'),
    body('amount').notEmpty().withMessage('La presupuesto no puede ir vacio').isInt().withMessage('El presupuesto debe ser numérico')
        .custom(value => value > 0)
        .withMessage('El presupuesto debe ser mayor a 0'), handleInputErrors, BudgetController.create)
router.get('/:budgetId', BudgetController.getById)
router.put('/:budgetId', body('name').notEmpty().withMessage('El nombre no puede ir vacio'),
    body('amount').notEmpty().withMessage('La presupuesto no puede ir vacio').isInt().withMessage('El presupuesto debe ser numérico')
        .custom(value => value > 0)
        .withMessage('El presupuesto debe ser mayor a 0'), handleInputErrors, BudgetController.editById)
router.delete('/:budgetId', BudgetController.deleteById)







export default router