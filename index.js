import express from "express";
import userRouter from "./Routes/userRoutes.js";
import taskRouter from "./Routes/taskRoutes.js";
import bodyParser from "body-parser";
import connectDB from "./db.js";
import cors from "cors";
import { loggedAuth } from "./middlewares/loggedAuth.middleware.js";
import cookieParser from "cookie-parser";
const server = express();
const corsOption = {
    origin: 'http://localhost:3000', // Change this to your frontend URL
    credentials: true,
}
connectDB();
server.use(cors(corsOption));
server.use(cookieParser());

server.use(bodyParser.urlencoded({ extended: false }));
//enabling bodyparser to accept json also
server.use(bodyParser.json());
server.use('/user', userRouter);
server.use("/task", loggedAuth, taskRouter);
server.get('/', loggedAuth, (req, res) => {
    res.json({ "msg": 'hello end is near' });
});
server.listen(3200, () => {
    console.log('server is up on 3200 port');
}); 