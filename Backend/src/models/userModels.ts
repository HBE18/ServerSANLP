export interface IUser{
    id : number,
    email : string,
    password : string
}

export interface IUserInsert{
    email : string,
    password : string
}

export interface IUserPass{
    id : number,
    password : string
}

export interface IUserPartial extends Partial<IUser>{}