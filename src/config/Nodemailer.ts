import nodemailer from 'nodemailer'
import dotenv from 'dotenv'

dotenv.config()

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL, // Tu correo de Gmail
        pass: process.env.PASS, // Contraseña de aplicación de Google
    },
});

export default transporter