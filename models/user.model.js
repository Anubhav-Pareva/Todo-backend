import { UserModel } from "../mongooseModels/userModel.js";
export const signupModel = async (userName, userEmail, userPNumber, userPassword, gender) => {
    try{
        const newUser = await UserModel.create({
                                                name:userName,
                                                email:userEmail,
                                                phoneNumber:userPNumber,
                                                password:userPassword,
                                                gender:gender
                                              });
        return newUser
        }
        catch(err){
                    console.log(err);
                    return null
                }
}
export const loginModel = async (userEmail, userPassword) => {
    try{
        const result = await UserModel.findOne({ email: userEmail, password: userPassword });
        if(result){
            return result
        }
        return null

    }catch(err){
        console.log(err);
        return null
    }

}