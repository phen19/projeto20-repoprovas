import { Router } from "express";
import * as authController from "../controllers/authController";
import { schemaValidator } from "../middlewares/schemaValidator";
import { schemas } from "../schemas/schemas";

const authRouter = Router();

authRouter.post("/signup", schemaValidator(schemas.signUpSchema), authController.signUp);
authRouter.post("/signin", schemaValidator(schemas.signInSchema), authController.signIn);

export default authRouter;