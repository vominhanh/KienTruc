const express = require('express')
const cors = require("cors")
const dotenv = require("dotenv")
const mongoose = require("mongoose")
const cookieParser = require("cookie-parser")
const authRouter = require("./routes/auth")
const userRouter = require("./routes/user");

dotenv.config();
const app = express();

mongoose.connect(process.env.MONGODB_URL).then(o => {
    console.log("SUCCESS CONNECTED")
}).catch(error => {
    console.log("FAIL CONNECTED")
})

app.use(cors());
app.use(cookieParser());
app.use(express.json());

//ROUTES
//create user
app.use("/v1/auth", authRouter);

//Get All User
app.use("/v1/user", userRouter);

app.listen(8001, () => {
    console.log("server is running");
})