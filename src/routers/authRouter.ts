import { Router } from "express";
import * as authController from "../controllers/authController.js";
import { schemaValidator } from "../middlewares/schemaValidator.js";
import { schemas } from "../schemas/schemas.js";

const authRouter = Router();

authRouter.post("/signup", schemaValidator(schemas.signUpSchema), authController.signUp);
authRouter.post("/signin", schemaValidator(schemas.signInSchema), authController.signIn);

export default authRouter;