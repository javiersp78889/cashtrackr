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
            html: `<h5>Hola señor ${user.name}, ${user.confirmed ? ('Aquí tienes tu Token para restablecer tu cuenta') : ('gracias por crear su cuenta en Cashtrackr')}</h5><br/><p>TOKEN: <b>${user.token}</b></p>`, // Cuerpo en HTML (opcional)
        };
        try {
            const info = await transporter.sendMail(mailOptions)
            console.log(`Correo enviado a:${user.email} ` + info.response);
        } catch (error) {
            console.log('Error al enviar el correo:', error);

        }


    }

}
