import * as examRepository from "../repositories/examsRepository"
import { ExamData, ExamBody } from "../types/examsType"

async function createExam(examBody: ExamBody){
/*     const existingExam = await examRepository.findByName(examBody.name)
    if(existingExam){
        throw {code: "Conflict", message: "Exam name already exist"}
    } */
    if(!isNaN(Number(examBody.discipline))){
        examBody.discipline = Number(examBody.discipline)
    }
    if(!isNaN(Number(examBody.teacher))){
        examBody.teacher = Number(examBody.teacher)
    }
    if(!isNaN(Number(examBody.category))){
        examBody.category = Number(examBody.category)
    }

    const existingCategory = await examRepository.findCategory(examBody.category)

    if(!existingCategory){
        throw {code: "NotFound", message: "Category not found"}
    }

    const existingTeacher = await examRepository.findTeacher(examBody.teacher)
    if(!existingTeacher) {
        throw {code: "NotFound", message: "Teacher not found"}
    }

    const existingDiscipline = await examRepository.findDiscipline(examBody.discipline)
    if (!existingDiscipline){
        throw {code: "NotFound", message: "Discipline not found"}
    }
    const teachersDiscipline = await examRepository.findTeachersDisciplineId(existingDiscipline.id, existingTeacher.id)
    const examData :ExamData = {
        name: examBody.name,
        pdfUrl: examBody.pdfUrl,
        categoryId: existingCategory.id,
        teachersDisciplineId: teachersDiscipline!.id,
    }

    await examRepository.createExam(examData)
    
}

export {
    createExam
}