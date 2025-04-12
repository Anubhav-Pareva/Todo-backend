import { changeStatusModel, createTaskModel, deleteTaskModel, getAllTaskModel, getTaskModel, updateTaskModel } from "../models/task.model.js";

export const createTaskController = async (req, res) =>{
    const { task } = req.body;
    const userId = req.userId;
    const result = await createTaskModel(task, userId);
    if(result){
        return res.status(200).json({success:true, task:result});
    }
    res.status(200).json({success:false, taskCreated:false});
}
export const getAllTaskController = async (req, res) => {
    const page = req.query.page || 1;
    const limit = req.query.limit || 5;
    const userId = req.userId;
    const result = await getAllTaskModel(userId, page, limit);
    if(!result.result){
        res.status(200).json({success:false, result:"no task found"});
    }
    res.status(200).json({success:true, result:result.result, total:result.total});
}
export const getTaskController = async (req, res) => {
    
    const taskId = req.query.id;
    const result = await getTaskModel(taskId);
    if(result){
       return res.status(200).json({ success: true, result:result });
    }
    res.status(200).json({success:false, result:"task not found"});
}
export const updateTaskController = async (req, res) => {
    const taskId = req.query.id;
    const {updateTask} = req.body;
    const result = await updateTaskModel(taskId, updateTask);
    if(result){
        return res.status(200).json({success:true, result:result});
    }
    res.status(200).json({success:false, result:"task not updated"});
}
export const changeStatusController = async (req, res) =>{
    const taskId = req.query.id;
    const {completeStatus} = req.body;
    const result = await changeStatusModel(taskId, completeStatus);
    if(result !== false){
        return res.status(200).json({success:true, completeStatus:"change"});
    }
    res.status(404).json({success:true, completeStatus:"not change"});
}
export const deleteTaskController = async (req, res) => {
    const taskId = req.query.id;
    const result = await deleteTaskModel(taskId);
    console.log(result);    
    if(result){
        return res.status(200).json({success:true, result:result});
    }
    res.status(200).json({success:false, result:"task not delete"});

}