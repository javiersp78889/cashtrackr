import bcrypt from 'bcrypt'


export const Bcrypt = async (password: string) => {

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)
    return hash
}

export const passwordVerify = async (password: string, encrypted: string) => {
    const verify = await bcrypt.compare(password, encrypted)
    return verify
}