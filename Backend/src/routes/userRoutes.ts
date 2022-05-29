import express from 'express';
import { HttpCode } from '../config';

const userRouter = express.Router();

userRouter
.route('/user')
.get((req,res) => {
    res.sendStatus(HttpCode.Success);
})

userRouter
.route('/login')
.post((req,res) => {
    // Check user credentials with middlewares (Authenticate)
    // Generate Session or Send Token to User or save user to server (Authorize)
    res.redirect("/");
})

userRouter
.route('/register')
.post((req,res) => {
    // Check if user exists by middleware
    // Create user and insert into db 
    res.redirect("/login");
})

userRouter
.route('/logout')
.post((req,res) => {
    // Check if user exists, if no redirect to login if yes delete user from server or close session or expire token
    res.redirect('/');
})

export default userRouter;