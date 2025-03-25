import { loginModel, signupModel } from "../models/user.model.js";
import jwt from 'jsonwebtoken';

export const signupController = async (req, res) => {
    const { userName, 
            userEmail, 
            userPNumber,
            userPassword, 
            gender} = req.body;
    const newUser = await signupModel(userName, userEmail, userPNumber, userPassword, gender);    
    if(newUser){
        return res.status(200).json({ "status": 'success', createdUser:newUser});
    }         
    res.status(500).json({success:false})                    
}
export const loginController = async (req, res) => {
    const { userEmail, userPassword } = req.body;
        const result = await loginModel(userEmail, userPassword);
        if (result) {
            const token = jwt.sign({ email: result.email, 
                                    _id: result._id }, 
                                    process.env.JWT_SECRET, 
                                    { expiresIn: '1h' });
           res.cookie('token', token, {
                                            maxAge: 60 * 60 * 1000, // 1 hour
                                            httpOnly: true, // Prevents client-side JavaScript access
                                            sameSite: 'Strict' // Helps with CSRF protection
                                        }); 
          return res.status(200).json({ success: true, userFound: true, user: result, });

        }
        else if(result === null){
            return res.status(404).json({ success: false, userFound: false });
        }
        res.status(500).json({ success: false, error: err.message })
}
export const logoutController = (req, res) => {
                if(req?.cookies?.token){
                    res.clearCookie('token');
                    res.status(200).json({success:true, userStatus:'logout'});
                }
                else{
                    res.status(404).json({success:false, userStatus:'not logged in'});
                }
}
export const userAuthController = (req, res) => {

}