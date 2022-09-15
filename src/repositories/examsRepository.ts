import {prisma} from "../database/database.js"
import { ExamData } from "../types/examsType.js"

async function findByName( name: string){
    return prisma.tests.findFirst({
        where: {name}
    })
}

async function findCategory(id?: number , name?: string){
    if(id){
        return prisma.categories.findFirst({
            where: {id}
        })
    }
   if(name){
        return prisma.categories.findFirst({
            where: {name}
    })
   }

}

async function findTeacher(name: string){
    return prisma.teachers.findFirst({
        where: {name}
    })
}


async function createExam( examData: ExamData){
    await prisma.tests.create({
        data:examData
    })
}

export {
    findByName,
    findCategory,
    findTeacher,
    createExam
}