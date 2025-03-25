import { Router } from "express";
import { changeStatusController, createTaskController, 
         deleteTaskController, 
         getAllTaskController, 
         getTaskController, 
         updateTaskController } from "../controllers/task.controller.js";
const taskRouter = Router();
taskRouter.post("/createtask", createTaskController);
taskRouter.get("/getalltask", getAllTaskController);
taskRouter.get("/gettask", getTaskController);
taskRouter.post("/updatetask", updateTaskController);
taskRouter.post("/changestatus", changeStatusController);
taskRouter.delete("/deletetask", deleteTaskController);

export default taskRouter;