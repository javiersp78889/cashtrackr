import { Router } from 'express'
import { BudgetController } from '../controllers/BudgetController'
import { body } from 'express-validator'
import { handleInputErrors } from '../middleware/validation'


const router = Router()




router.get('/', BudgetController.getAll)
router.post('/', body('name').notEmpty().withMessage('El nombre no puede ir vacio'),
body('amount').isNumeric().notEmpty().withMessage('La cantidad no puede ir vacia'), handleInputErrors, BudgetController.create)
router.get('/:id', BudgetController.getById)
router.put('/:id', BudgetController.editById)
router.delete('/:id', BudgetController.deleteById)







export default router