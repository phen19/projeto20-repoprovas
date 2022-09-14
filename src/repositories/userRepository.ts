import {prisma} from "../database/database.js"
import { UserData } from "../types/userType.js"

async function findByEmail( email: string){
    return prisma.users.findFirst({
        where: {email},
    });
}

async function findById(userId: number){
    return prisma.users.findFirst({
        where:{id:userId}
    })
}

async function createUser(userData: UserData){
    await prisma.users.create({
        data: userData
    });
}

export{
    findById,
    findByEmail,
    createUser
}