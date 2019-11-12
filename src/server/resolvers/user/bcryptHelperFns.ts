import {genSaltSync, hashSync, compareSync} from "bcryptjs"

type TEncrycptedPasswordBcrypt = {
    password: string
}

interface IPasswordCompareBcrycpt extends TEncrycptedPasswordBcrypt {
    encryptedPassword: string
}

const salt = genSaltSync(10);
const encryptedPasswordBcrycpt = ({password}: TEncrycptedPasswordBcrypt): string => hashSync(password, salt)
const passwordCompareBcrycpt = ({password, encryptedPassword}: IPasswordCompareBcrycpt) => compareSync(password, encryptedPassword)
