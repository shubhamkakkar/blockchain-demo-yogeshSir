import {sign, verify} from "jsonwebtoken"

const secretKey: string = "blockhain-user-auth";

export const jwtToken = (email: { email: any }): string => sign({email}, secretKey);

export const JWTVerify = (token: string): string | object => verify(token, secretKey);
