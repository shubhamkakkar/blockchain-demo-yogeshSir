import {genSaltSync, hashSync, compareSync} from "bcryptjs"

type TEncrycptedPasswordBcrypt = {
    password: string
}

interface IPasswordCompareBcrycpt extends TEncrycptedPasswordBcrypt {
    encryptedPassword: string
}

const salt = genSaltSync(10);
export const encryptBcrycpt = ({password}: TEncrycptedPasswordBcrypt): string => hashSync(password, salt)
export const compareBcrycpt = ({password, encryptedPassword}: IPasswordCompareBcrycpt) => compareSync(password, encryptedPassword)
