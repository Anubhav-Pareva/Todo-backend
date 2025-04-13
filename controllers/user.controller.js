import { compareHashPassword, hashPassword } from "../bcrypt/bcryptConfig.js";
import { loginModel, signupModel } from "../models/user.model.js";
import jwt from 'jsonwebtoken';
import { sendLoginMail, sendSignupMail } from "../nodemailer/nodemailerConfig.js";

export const signupController = async (req, res) => {
    const { userName, 
            userEmail, 
            userPNumber,
            userPassword, 
            gender} = req.body;
    const result = await loginModel(userEmail);
    if(result){
        return res.status(200).json({success:false, message:"user already exist"});
    }
    const hashedPassword = await hashPassword(userPassword);
    const newUser = await signupModel(userName, userEmail, userPNumber, hashedPassword, gender);    
    if(newUser){
        await sendSignupMail(newUser.email);
        const createdUser = newUser.toObject();
        delete createdUser.password;
        return res.status(200).json({ "status": 'success', createdUser:createdUser, message:"new user create successfully"});
    }         
    res.status(500).json({success:false, message:"user not created"})                    
}
export const loginController = async (req, res) => {
    const { userEmail, userPassword } = req.body
        const result = await loginModel(userEmail);
        if (result) {
            const isMatch = await compareHashPassword(userPassword, result.password);
            if(isMatch){
                                    const token = jwt.sign({ email: result.email, 
                                                            _id: result._id }, 
                                                            process.env.JWT_SECRET, 
                                                            { expiresIn: '1h' });
                                res.cookie('token', token, {
                                                                    maxAge: 60 * 60 * 1000, // 1 hour
                                                                    httpOnly: true, // Prevents client-side JavaScript access
                                                                    sameSite: 'None',
                                                                    secure: true // Helps with CSRF protection
                                                                }); 
                                const userData = result.toObject();
                                delete userData.password;
                                await sendLoginMail(userData.email);
                                return res.status(200).json({ success: true, userFound: true, user: userData, token:token, message:"user logined successfully" });
                    }
                    else{
                        return res.status(200).json({success:true, userFound:false, message:"password is not correct"});
                    }

        }
        else if(result === null){
            return res.status(404).json({ success: false, userFound: false, message:"user not exist" });
        }
        res.status(500).json({ success: false, error: err.message })
}
export const logoutController = (req, res) => {
                if(req?.cookies?.token){
                    res.clearCookie('token');
                    res.status(200).json({success:true, userStatus:'logout', message:"user logout successfully"});
                }
                else{
                    res.status(404).json({success:false, userStatus:'not logged in'});
                }
}
export const userAuthController = (req, res) => {

}