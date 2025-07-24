import { Router } from "express";
import authRouter from "./v1/auth";
import taskRouter from "./v1/tasks";

const apiRouter = Router();

apiRouter.use("/v1/auth", authRouter);
apiRouter.use("/v1/tasks", taskRouter);
export default apiRouter;
