import express from 'express';
import { HttpCode } from '../config';
import { IUserInsert } from '../models/userModels';
const path = require('path');
const userRouter = express.Router();
var userStatus = {
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
    res.status(200).json(userStatus);
})

userRouter
.route('/login')
.post((req,res) => {
    userStatus.auth = true;
    const email = req.query.email;
    const password = req.query.password;
    console.log(`Email = ${email} , Password = ${password}`);
    res.json({
        'auth' : true,
    });
    console.log('Logged in!');
    // Check user credentials with middlewares (Authenticate)
    // Generate Session or Send Token to User or save user to server (Authorize)

})

userRouter
.route('/register')
.post((req,res) => {
    // Check if user exists by middleware
    // Create user and insert into db 
    res.send('false');
})

userRouter
.route('/logout')
.post((req,res) => {
    console.log('Log Out.');
    userStatus.auth = false;
    // Check if user exists, if no redirect to login if yes delete user from server or close session or expire token
    res.json({
        'auth' : false,
    });
})

export default userRouter;