import { TaskModel } from "../mongooseModels/taskModel.js";
export const createTaskModel = async (task, userId) => {
    try{
        const newTask={
            task:task,
            userId:userId,
            createdAt: new Date(),
            completeStatus:false
        }
        const taskCreated = await TaskModel.create(newTask);
        return taskCreated;
    }catch(err){
        console.error(err);
        return null;
    }

}
export const getAllTaskModel = async (userId, page, limit) => {
    try{
        const skip = ((page - 1) * limit);
        const result = await TaskModel.find({userId:userId}).sort({"createdAt":-1}).skip(skip).limit(limit).exec();
        const total = await TaskModel.countDocuments({userId:userId});
        return {result, total};
    }catch(err){
        console.log(err);        
        return false;
    }
}
export const getTaskModel = async (taskId) => {
    try{
        const result = await TaskModel.findById(taskId).exec();
        return result;
    }catch(err){
        console.log(err);
        return false;        
    }
}
export const updateTaskModel = async (taskId, updatedTask) => {
    try{
        const result = await TaskModel.findByIdAndUpdate(taskId, { task: updatedTask }, {returnDocument : 'after'}).exec();
        return result;
    }catch(err){
        console.log(err);
        return false;        
    }
}
export const changeStatusModel = async (taskId, changeStatus) =>{
    try{
        const result = await TaskModel.findByIdAndUpdate(taskId, {completeStatus:changeStatus}, {returnDocument:"after"}).exec();
        return result;
    }catch(err){
        console.log(err);
        return false;        
    }
}
export const deleteTaskModel = async (taskId) => {
    try{
        const result = await TaskModel.findByIdAndDelete(taskId).exec();
        return result;
    }catch(err){
        console.log(err);
        return false;        
    }
}