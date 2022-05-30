export const ExpressConfig = {
    port : 3000
}

export enum HttpCode 
{
    Success = 200,
    Created = 201,
    NoContent = 204,
    BadRequest = 400,
    Unauthorized = 401,
    NotFound = 404,
    Forbidden = 403,
    InternalError = 500,
    Timeout = 504
}

export const dbConfig = {
    host : 'localhost',
    port : 5432,
    database : 'sanlp',
    user : 'postgres',
    password : '123456',
    max : 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000
}
