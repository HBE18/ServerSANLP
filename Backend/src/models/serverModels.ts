import { Date } from "mongoose";

export interface dataSch{
    keyword : string,
    timestamp : Date,
    twitter : string,
    yt_comment : string,
    yt_content : string
}