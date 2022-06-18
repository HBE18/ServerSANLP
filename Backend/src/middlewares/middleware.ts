import express from 'express';
import { HttpCode } from '../config';
import { getId, getPasswordByEmail, getUserByEmail, insertUser } from '../db/functions';
import { } from '../models/userModels';




export async function checkUserExists(
    req : express.Request,
    res : express.Response,
    next : express.NextFunction
)
{
    const emailQuery  = req.body.email;

    if( typeof emailQuery === 'string' ){
        const user = await getUserByEmail(emailQuery);
        (user) ? next() : res.status(HttpCode.NotFound).json({
            'error' : 'User not found!'
        })
    }
    else{
        res.status(HttpCode.BadRequest).json();
    } 
}

export async function validateUserNotExist(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
) {
    const emailQuery = req.body.email;
    
    if(typeof emailQuery === 'string'){
        const user = await getUserByEmail(emailQuery);
        
        (user) ? res.status(HttpCode.BadRequest).json({'error' : 'Email already exists'}) : next();
    }
    else{
        res.sendStatus(HttpCode.BadRequest);
    }
}

export async function login(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
) {
    const emailQuery = req.body.email;
    const passwordQuery = req.body.password;

    if (typeof emailQuery === 'string' && typeof passwordQuery === 'string') {
        const user = {
            email : emailQuery,
            password : passwordQuery
        }
        const realPassword = await getPasswordByEmail(user.email);
        if(user.password === realPassword.password){
            res.locals.id = await getId(emailQuery);
            next();
        }
        else{
            res.sendStatus(HttpCode.Unauthorized);
        }
    } else {
        res.sendStatus(HttpCode.BadRequest);
    }
}

export async function register(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
){
    const emailQuery = req.body.email;
    const passwordQuery = req.body.password;

    if (typeof emailQuery === 'string' && typeof passwordQuery === 'string') {
        const user = {
            email : emailQuery,
            password : passwordQuery
        }
        const status = await insertUser(user);

        if(status === 'OK'){
            next();
        }
        else{
            res.status(HttpCode.InternalError).json({
                'error' : status
            });
        }
    } else {
        res.sendStatus(HttpCode.BadRequest);
    }
}

export async function generateResults(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
){
    
}