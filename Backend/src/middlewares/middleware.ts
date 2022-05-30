import express from 'express';
import { HttpCode } from '../config';
import { getPasswordByEmail, getUserByEmail } from '../db/functions';
import { } from '../models/userModels';


export async function checkUserExists(
    req : express.Request,
    res : express.Response,
    next : express.NextFunction,
)
{
    const emailQuery  = req.query.email;
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
    const emailQuery = req.query.email;
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
    const emailQuery = req.query.email;
    const passwordQuery = req.query.password;

    if (typeof emailQuery === 'string' && typeof passwordQuery === 'string') {
        const user = {
            email : emailQuery,
            password : passwordQuery
        }
        const realPassword = await getPasswordByEmail(user.email);
        if(user.password === realPassword.password){
            next();
        }
        else{
            res.sendStatus(HttpCode.Unauthorized);
        }
    } else {
        res.sendStatus(HttpCode.BadRequest);
    }
}

