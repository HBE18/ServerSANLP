import mongoose, { Document, Model, Schema } from "mongoose";
import { QueryResult } from "pg";
import { dataSch } from "../models/serverModels";
import Date = module

mongoose.connect('mongodb://localhost:27017/sanlp');

const dataSchema = new Schema({
    keyword : {type : String},
    timestamp : Date,
    twitter : Buffer,
    yt_comment : Buffer,
    yt_content : Buffer
})

const dataRetrieve =mongoose.model('results',dataSchema);

export async function getDoc(key : string):Promise<dataSch>{

    let data : dataSch={
        keyword : "",
        timestamp : Date,
        twitter : "",
        yt_comment : "",
        yt_content :""
    };
    const doc = await dataRetrieve.find({
        keyword: key,
    }).sort({
        timestamp : 1});
    if(!doc){
        console.error('Document couldn\'t got');
    }
    else{
        const last = doc.pop();
         data = {
            keyword : last.keyword,
            timestamp : last.timestamp,
            twitter : last.twitter.toString('base64'),
            yt_comment : last.yt_comment.toString('base64'),
            yt_content : last.yt_content.toString('base64')
        };
    }

    return data;
}
export async function get_keywords(results:QueryResult<any>){
    var result = {"results":[]};
    results.rows.forEach(async (key)=>{
        const res = await getDoc(key);
        if (!res) {
            return;
        }
        else{
            result.results.push(res);
        }
        return result;
    })
}