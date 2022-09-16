import { Router } from "express";
import * as examController from "../controllers/examsController";
import { schemaValidator } from "../middlewares/schemaValidator";
import { tokenValidationMiddleware } from "../middlewares/tokenMiddleware";
import { schemas } from "../schemas/schemas";

const examRouter = Router();

examRouter.post("/exams", schemaValidator(schemas.examSchema), tokenValidationMiddleware,examController.createExam);
examRouter.get("/exams/disciplines", tokenValidationMiddleware, examController.getExamsByDisciplines)
examRouter.get("/exams/teachers", tokenValidationMiddleware, examController.getExamsByTeacher)

export default examRouter;