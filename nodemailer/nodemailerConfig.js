import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();
const transporter = nodemailer.createTransport({
    service:"gmail",
    auth: {
            user: process.env.EMAIL_USER, // Your email
            pass: process.env.EMAIL_PASS  // App password (not your real password)
        }
})

export const sendLoginMail = async (to) =>{
    try{
            const mailOptions = {
                from: process.env.EMAIL_USER, // Sender address
                to: to,                       // Receiver address
                subject: "Login Alert",             // Subject line
                text: "Heloo, User you just Login into Todo App"    
            }
            const info = await transporter.sendMail(mailOptions);
            return info;
}catch(error){
    console.log("Failed to send mail: ",error);
}
}
export const sendSignupMail = async (to) =>{
    try{
            const mailOptions = {
                from: process.env.EMAIL_USER, // Sender address
                to: to,                       // Receiver address
                subject: "Sign-Up Alert",             // Subject line
                text: "Heloo, User you just Sign-up into Todo App Thanks for trusting us"    
            }
            const info = await transporter.sendMail(mailOptions);
            return info;
}catch(error){
    console.log("Failed to send mail: ",error);
}
}