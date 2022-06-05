import { IUserInsert, IUserPartial, IUserPass } from '../models/userModels';
import { QueryResult } from "pg";
import pool from './pool';

export async function insertUser(user: IUserInsert) : Promise<string>{
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

export async function getUserById(id: string): Promise<IUserPartial | void> {
    try {
        const {rows, rowCount} = await pool.query<IUserInsert>(`SELECT email, password FROM users WHERE id = $1`, [id]);
            if(rowCount === 0){
                return undefined;
            }
            else{
                return rows[0];
            }
    } catch (error) {
        console.error(error);
        throw(error);
    }
}

export async function getUserByEmail(email: string): Promise<IUserInsert | void> {
    try {
        const {rows, rowCount} = await pool.query<{
            email : string;
            password : string;
        }>(`SELECT email, password FROM users WHERE email = $1`, [email]);
            if(rowCount === 0){
                return undefined;
            }
            else{
                return rows[0];
            }
    } catch (error) {
        console.error(error);
        throw(error);
    }
}

export async function getPasswordByEmail(email:string) : Promise<IUserPass>{
    try {
        const {rows, rowCount} = await pool.query<{
            password : string;
        }>(`SELECT password FROM users WHERE email = $1`, [email]);
        return rows[0];
    } catch (error) {
        console.error(error);
        throw(error);
    }
}

export async function removeUserByEmail(email: number): Promise<void> {
    return await new Promise((resolve, reject) => {
        try {
            pool.query(`DELETE FROM users WHERE email = $1`, [email]);
            resolve();
        } catch (error) {
            console.error(error);
            reject();
        }
    })
}

export async function updatePassword(user : IUserInsert) : Promise<void> {
    return await new Promise((resolve,reject) => {
        try {
            pool.query(`UPDATE users SET password = $1 WHERE email = $2;`,[user.password,user.email]);
            resolve();
        } catch (error) {
            console.error(error);
            reject();
        }
    })
}

export async function insertKeyword(keyword: string) : Promise<string>{
    const result = await pool.query(`INSERT INTO keywords (keyword)
    VALUES ($1)`,[keyword]);
    if (result) {
        return 'OK';
    } else {
        return 'Problem';
    }
}