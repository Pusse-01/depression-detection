const express = require("express");
const app = express();
const connectDB = require('./db/connection')
const cors = require('cors')
const sessionAnswerRouter = require('./api/routes/session_answers_routes')
const sessionRouter = require('./api/routes/session_routes')
const userRouter = require('./api/routes/user_routes')
// ROUTES
app.get('/',(req,res)=>{
    res.send("This is depression App's API")
})


connectDB();
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use('/uploads',express.static('uploads'));
app.use('/api/session',sessionRouter )
app.use('/api/users',userRouter )
app.use('/api/sessionAnswers',sessionAnswerRouter )
app.listen(3003);