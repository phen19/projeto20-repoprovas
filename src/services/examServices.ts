import * as examRepository from "../repositories/examsRepository"
import { ExamData } from "../types/examsType"

async function createExam(examData: ExamData){
    const existingCategory = await examRepository.findCategory(examData.categoryId)
    
}