import { Router } from 'express'
import { authController } from '../controllers/authController'
import { body, param } from 'express-validator'
import { handleInputErrors } from '../middleware/validation'
import { userVerify } from '../middleware/authValidation'
import { verificarLogueo } from '../middleware/UserVerify'
import { Confirmado } from '../middleware/Confirmado'
import { limit } from '../config/limiter'
import { autenticate } from '../middleware/autenticate'
import { checkPassword } from '../utils/checkpassword'




const router = Router()

//router.use(limit)
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


router.post('/forgot-password', body('email').notEmpty().withMessage('El Email no puede ir vacío').isEmail().withMessage('Email Incorrecto'), handleInputErrors,
    authController.passwordRecovery)


router.post('/confirm-token', body('token').notEmpty().withMessage('Token Inválido').isLength({ min: 6, max: 6 }).withMessage('Token Inválido'), handleInputErrors, authController.confirmToken)

router.post('/reset-password/:token', param('token').notEmpty().withMessage('Token Inválido').isLength({ min: 6, max: 6 }).withMessage('Token Inválido'), body('password').notEmpty().withMessage('El password no puede ir vacío'), handleInputErrors, authController.resetPasswordWithToken)

router.get('/user', autenticate, authController.getUser)

router.post('/update-password', body('current_password').notEmpty().withMessage('El password no puede ir vacío'), body('password').notEmpty().withMessage('El password no puede ir vacío').isLength({ min: 8 }).withMessage('El password debe tener mínimo 8 caracteres'), handleInputErrors, autenticate, authController.updateCurrentUserPassword)

router.post('/check-password', body('password').notEmpty().withMessage('El password no puede ir vacío'), handleInputErrors, autenticate, checkPassword)



export default router