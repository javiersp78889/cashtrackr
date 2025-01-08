import { Router } from 'express'
import { authController } from '../controllers/authController'
import { body } from 'express-validator'
import { handleInputErrors } from '../middleware/validation'
import { userVerify } from '../middleware/authValidation'
import { verificarLogueo } from '../middleware/UserVerify'
import { Confirmado } from '../middleware/Confirmado'




const router = Router()


router.post('/create-account',
    body('name').notEmpty().withMessage('El nombre no puede ir vacío'),
    body('password').notEmpty().withMessage('El password no puede ir vacío').isLength({ min: 8 }).withMessage('El password debe tener mínimo 8 caracteres'),
    body('email').notEmpty().withMessage('El Email no puede ir vacío').isEmail().withMessage('Email Incorrecto'), handleInputErrors, userVerify,
    authController.create)

router.post('/confirm-account', body('token').notEmpty().withMessage('Token Inválido').isLength({ min: 6, max: 6 }).withMessage('Token Inválido'), handleInputErrors, authController.confirmAccount)

router.post('/login',
    body('email').notEmpty().withMessage('El Email no puede ir vacío').isEmail().withMessage('Email Incorrecto'),
    body('password').notEmpty().withMessage('El password no puede ir vacío'),
    handleInputErrors, verificarLogueo, Confirmado, authController.login)





export default router