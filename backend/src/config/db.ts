import {Sequelize}from 'sequelize-typescript' 
import dotenv from 'dotenv'
import budgets from '../models/Budget';
import Expense from '../models/Expense';

dotenv.config()
if (!process.env.DATABASE_URL) {
    console.log(process.env.DATABASE_URL)
    throw new Error('La variable DATABASE_URL no está definida en el archivo .env');
}
export const db = new Sequelize( process.env.DATABASE_URL, {
    models: [budgets,Expense]

})