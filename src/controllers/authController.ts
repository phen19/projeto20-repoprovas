import {Request, Response} from "express";
import { UserData } from "../types/userType";
import * as userService from "../services/userService";

export async function signUp(req: Request, res: Response){
    const { email, password } = req.body;
    const userData: UserData = {
        email: email,
        password: password
    }
    await userService.createUser(userData)
    res.status(201).send("Usuário criado")
}

export async function signIn(req: Request, res: Response){
    const { email, password } = req.body;
    const userData: UserData = {
        email: email,
        password: password
    }
    const result = await userService.signIn(userData)
    res.status(200).send(result)
}