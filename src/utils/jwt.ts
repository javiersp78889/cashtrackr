import jsonwebtoken from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

export const jwtgenerate = (id: string) => {
   return jsonwebtoken.sign({id}, process.env.SECRETO,{
    expiresIn: '30d'
   })
}