import bcrypt from 'bcrypt'
import type { Request, Response, NextFunction } from 'express'

export const Bcrypt = async (password: string) => {

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)
    return hash
}