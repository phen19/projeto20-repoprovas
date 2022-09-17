import {prisma} from "../database/database"
import { UserData } from "../types/userType"

async function findByEmail( email: string){
    return prisma.users.findUnique({
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