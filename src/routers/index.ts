import { Router } from "express";
import authRouter from "./authRouter"
import examRouter from "./examRouter";

const router = Router();
router.use(authRouter);
router.use(examRouter);

export default router;