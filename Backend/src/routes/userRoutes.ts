import express from 'express';
import { HttpCode } from '../config';
import { getKeywords } from '../db/functions';
import { checkUserExists, login, register, validateUserNotExist } from '../middlewares/middleware';
const userRouter = express.Router();

var user = {
    'id' : 0,
    'email' : '',
    'password' : '',
    'auth' : false
}

userRouter
.route('/user')
.get((req,res) => {
    res.sendStatus(HttpCode.Success);
})

userRouter
.route('/auth')
.get((req,res) => {
    res.status(200).json({'auth' :user.auth});
})

userRouter
.route("/getuser")
.get((req,res) => {
    res.status(200).json({'id' : user.id});
})

userRouter
.route("/getresults:id")
.get(async (req,res) => {
    const uid :number = Number(req.params.id);
    const response = await getKeywords(uid);
    // Define a middleware to get data from mongo with keywords from postgres
})

userRouter
.route('/login')
.post(checkUserExists,login,(req,res) => {
    // Check user credentials with middlewares (Authenticate) +
    // Generate Session or Send Token to User or save user to server (Authorize) -
    user.auth = true;
    console.log(res.locals.id.id);
    user.id = res.locals.id.id;
    user.email = req.body.email;
    user.password = req.body.password;
    console.log(`ID = ${user.id} Email = ${user.email} , Password = ${user.password} logged in.`);
    res.json({
        'auth' : true,
    });
})


userRouter
.route('/checkuser')
.post(validateUserNotExist, (req,res) => {
    res.sendStatus(HttpCode.Success);
})

userRouter
.route('/register')
.post(validateUserNotExist,register,(req,res) => {
    // Check if user exists by middleware +
    // Create user and insert into db +
    res.send('false');
})

userRouter
.route('/logout')
.post((req,res) => {
    // Check if user exists, if no redirect to login if yes delete user from server or close session or expire token (LAter)
    user.auth = false;
    user.email = '';
    user.password = '';
    
    res.json({
        'auth' : false,
    }
    );
    console.log('Log Out.');
})

export default userRouter;
