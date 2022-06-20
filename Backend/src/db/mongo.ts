import mongoose, { Document, Model, Schema } from "mongoose";
import { QueryResult } from "pg";
import { dataSch } from "../models/serverModels";

mongoose.connect('mongodb://localhost:27017/sanlp');

const dataSchema = new Schema({
    keyword : {type : String},
    timestamp : Date,
    twitter : String,
    yt_comment : String,
    yt_content : String
})

const dataRetrieve =mongoose.model('results',dataSchema);

export async function getDoc(key :object):Promise<dataSch>{

    let data : dataSch={
        keyword : "",
        timestamp : new Schema.Types.Date(""),
        twitter : "",
        yt_comment : "",
        yt_content :""
    };
    const doc = await dataRetrieve.find(key).sort({
        timestamp : 1});
    if(!doc){
        console.error('Document couldn\'t got');
    }
    else{
        const last = doc.pop();
        
         data = {
            keyword : last.keyword,
            timestamp : last.timestamp,
            twitter : last.twitter,
            yt_comment : last.yt_comment,
            yt_content : last.yt_content
        };
    }

    return data;
}

export async function get_keywords(results:QueryResult<any>){
    var dat : dataSch[] = [];
    var result;
/*     const resultes = await results.rows.forEach(async (key)=>{
        const res = await getDoc(key);
        if (!res) {
            return;
        }
        else{
            dat.push(res);
        }
    }); */

    for (const key of results.rows) {
        const res = await getDoc(key);
        if (!res) {
            return;
        }
        else{
            dat.push(res);
        }
    }


    result = {results: dat};
    console.log(result);
    return result;
}