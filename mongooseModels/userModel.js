import { model, Schema } from "mongoose";
const UserSchema = new Schema({
    name:{
        type:String,
        require:true,
        maxLength:50
    },
    email:{
        type:String,
        require:true,
    },
    phoneNumber:{
        type:Number,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    gender:{
        type:String,
        require:true
    }
},
{collection:"user_data"});
export const UserModel = model("user", UserSchema)
