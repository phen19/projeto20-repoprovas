import { Request, Response } from "express";
import { ExamBody } from "../types/examsType";
import * as examService from "../services/examServices"

export async function createExam(req: Request, res: Response){
    const examBody :ExamBody = req.body
    await examService.createExam(examBody)
    res.status(201).send("exam created")
}