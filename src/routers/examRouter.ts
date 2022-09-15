import { Router } from "express";
import * as examController from "../controllers/examsController";
import { schemaValidator } from "../middlewares/schemaValidator";
import { tokenValidationMiddleware } from "../middlewares/tokenMiddleware";
import { schemas } from "../schemas/schemas";

const examRouter = Router();

examRouter.post("/exams", schemaValidator(schemas.examSchema), tokenValidationMiddleware,examController.createExam);


export default examRouter;