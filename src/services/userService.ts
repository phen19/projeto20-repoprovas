import * as userRepository from "../repositories/userRepository.js";
import { UserData } from "../types/userType.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"

async function createUser(userData: UserData){
    const existingEmail = await userRepository.findByEmail(userData.email);
    if(existingEmail){
        throw {code: "Conflict", message: "Email already registered"}
    }

    const passwordEncrypted = bcrypt.hashSync(userData.password, 10);
    const user:UserData = {
        email: userData.email,
        password: passwordEncrypted
    }
    await userRepository.createUser(user);
}

async function signIn(userData: UserData){
    const existingEmail = await userRepository.findByEmail(userData.email);
    if(!existingEmail){
        throw { code: "Unauthorized", message: "Incorrect e-mail and/or password"}
    }
    const checkPassword = bcrypt.compareSync(userData.password, existingEmail.password);
    if(!checkPassword){
        throw { code: "Unauthorized", message: "Incorrect e-mail and/or password"}
    }

    const secretKey:string | undefined = process.env.JWT_SECRET
    const token:string = jwt.sign({id: existingEmail.id}, secretKey!)
    const obj: {token: string}= {token}
    return obj
}

export{
    createUser,
    signIn
}