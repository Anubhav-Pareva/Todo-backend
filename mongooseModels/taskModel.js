import { Schema, model } from "mongoose";
const TaskSchema = new Schema({
    task:{
        type:String,
        required:true,
    },
    completeStatus:{
        type: Boolean,
        required:true
    },
    userId:{
        type:String,
        required:true,
    }
},
{timestamps:true,
collection:"task_data"});
export const TaskModel = model("task", TaskSchema);
