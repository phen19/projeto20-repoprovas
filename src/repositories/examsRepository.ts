import {prisma} from "../database/database"
import { ExamData } from "../types/examsType"

async function findByName( name: string){
    return prisma.tests.findFirst({
        where: {name}
    })
}

async function findCategory(category : number|string){
    if(typeof(category) === 'number'){
        return prisma.categories.findFirst({
            where: {id: category}
        })
    }
   if(typeof(category)=== 'string'){
        return prisma.categories.findFirst({
            where: {name : category}
    })
   }

}

async function findTeacher(teacher: number|string){

    if(typeof(teacher) === 'number'){
        return prisma.teachers.findFirst({
            where: {id: teacher}
        })
    }
   if(typeof(teacher)=== 'string'){
        return prisma.teachers.findFirst({
            where: {name : teacher}
    })
   }
}

async function findDiscipline(discipline: number|string){

    if(typeof(discipline) === 'number'){
        return prisma.disciplines.findFirst({
            where: {id: discipline}
        })
    }
   if(typeof(discipline)=== 'string'){
        return prisma.disciplines.findFirst({
            where: {name : discipline}
    })
   }
}

async function findTeachersDisciplineId(teacherId: number, disciplineId: number){
    return prisma.teachersDisciplines.findFirst({
        where: { disciplineId: disciplineId, teacherId: teacherId}
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
    findDiscipline,
    findTeachersDisciplineId,
    createExam
}