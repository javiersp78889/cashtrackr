import express, { urlencoded } from 'express'
import colors from 'colors'
import morgan from 'morgan'
import { db } from './config/db'
import bugetrouter from './routes/budgetRouter'
const app = express()

async function connectDB() {
    try {

        await db.authenticate()
        db.sync()
        console.log(colors.blue.bold('Conexion exitosa'))
    } catch (error) {
        console.log(colors.red.bold('Error de conexion'))
    }
}
connectDB()
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/api/budgets', bugetrouter)


export default app