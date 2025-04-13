import jwt from 'jsonwebtoken';
export const loggedAuth = (req, res, next)=>{
    const token = req?.cookies?.token;
    const authorizationHeader = req.headers['authorization']?.split(' ')[1];
    if(!token && !authorizationHeader){
        return res.status(500).json({ success: false, userAuth: null });   
     }
    try{
        
        if(token){
           const payload = jwt.verify(token, process.env.JWT_SECRET);
            req.userEmail = payload.email;
            req.userId = payload._id;
        }else{
           const payload = jwt.verify(authorizationHeader, process.env.JWT_SECRET);
            req.userEmail = payload.email;
            req.userId = payload._id;
        }
       
    }catch(err){
        return res.status(401).json({ success: false, userAuth: null });
    }
    next();
}