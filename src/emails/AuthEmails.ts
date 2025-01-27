import transporter from "../config/Nodemailer";

type Email = {
    name: String
    email: string,
    confirmed: boolean
    token: string
}

export class SendMessage {

    static SendToken = async (user: Email) => {


        const mailOptions = {
            from: process.env.EMAIL, // Remitente
            to: `${user.email}`, // Destinatario (cambia esta dirección)
            subject: `${user.confirmed ? ('Restablece tu password') : ('Token de autenticación')}`, // Asunto
            text: `No comparta con nadie`, // Cuerpo en texto plano
            html: `<h5>Hola señor ${user.name}, ${user.confirmed ? ('Aquí tienes tu Token para restablecer tu cuenta  <br/><p>TOKEN: <b>${user.token}</b></p>   <br/> <a href=${process.env.FRONTEND_URL}/auth/new-password>Enlace de verificación</a>') : ('gracias por crear su cuenta en Cashtrackr <br/><p>TOKEN: <b>${user.token}</b></p>   <br/> <a href=${process.env.FRONTEND_URL}/auth/confirm-account>Enlace de verificación</a>')}</h5> `, // Cuerpo en HTML (opcional)
        };
        try {
            const info = await transporter.sendMail(mailOptions)
            console.log(`Correo enviado a:${user.email} ` + info.response);
        } catch (error) {
            console.log('Error al enviar el correo:', error);

        }


    }

}
