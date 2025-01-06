import {Router} from 'express'
import { BudgetController } from '../controllers/BudgetController'


const router = Router()




router.get('/',BudgetController.getAll)
router.post('/',BudgetController.create)
router.get('/:id',BudgetController.getById)
router.put('/:id',BudgetController.editById)
router.delete('/:id',BudgetController.deleteById)







export default router