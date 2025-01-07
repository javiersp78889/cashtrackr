import { Router } from 'express'
import { authController } from '../controllers/authController'
import { body } from 'express-validator'
import { handleInputErrors } from '../middleware/validation'
import { userVerify } from '../middleware/authValidation'
import { Bcrypt } from '../utils/bcrypt'




const router = Router()


router.post('/create-account',
    body('name').notEmpty().withMessage('El nombre no puede ir vacío'),
    body('password').notEmpty().withMessage('El password no puede ir vacío').isLength({ min: 8 }).withMessage('El password debe tener mínimo 8 caracteres'),
    body('email').notEmpty().withMessage('El nombre no puede ir vacío').isEmail().withMessage('Email Incorrecto'), handleInputErrors, userVerify,
    authController.create)







export default router