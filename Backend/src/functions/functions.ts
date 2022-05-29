import express from 'express';
import { IUserInsert, IUserPartial } from '../models/userModels';
import { QueryResult } from "pg";
import pool from '../db/pool';

export async function addUser(user: IUserInsert) : Promise<string>{
    try {
        pool.connect((error, client, release) => {
            client.query<{
                email: string;
                password: string;
            }>(`INSERT INTO users(email,password) 
            VALUES ($1, $2)`,
             [user.email, user.password]);
            release();
        })
    } catch (error) {
        console.error(error);
        return `${error}`;
    }
    return 'OK';
}

export async function getAllUsers() : Promise<QueryResult<any>> {
    try {
        return await pool.query(`SELECT * FROM users;`);
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export async function getUser(user : IUserPartial) : Promise<QueryResult<any> | string>{
    let env = '';
    let criteria ;
    if (user.email) {
        env = 'email';
        criteria = user.email;
    } 
    else if(user.id){
        env = 'id';
        criteria = user.id
    }
    else{
        return 'Error occured. Parameters not supplied!'
    }

    return await pool.query(`SELECT * FROM WHERE $1 = $2;`,[env,criteria]);
}
