import express from 'express';
import { Mongoose } from 'mongoose';
import { HttpCode } from '../config';
//import runScript from '../controller/bridge';
import { getKeywords, insertKeyword } from '../db/functions';
import { get_keywords } from '../db/mongo';

const serverRouter = express.Router();

serverRouter
.route('/submit')
.post(async (req,res) => {
    var keyword='';
    if(typeof req.query.keyword === 'string'){
        keyword = req.query.keyword;
        //runScript(keyword);
        console.log(keyword);
        
        const response = await insertKeyword(keyword);
        if (response === 'OK') {
            res.status(HttpCode.Success).json({
                'Response' : 'Success'
            });
        } else {
            res.status(HttpCode.InternalError).json({
                Response : response
            });
        }
    }
    else {
        res.sendStatus(HttpCode.BadRequest);
    }
})


/* serverRouter
.route("/getdoc")
.get(async (req,res) => {
    const find = req.body.keyword;
    const result = await getDoc(find);
    
    res.status(HttpCode.Success).json({"Base64": result});
}) */

serverRouter
.route("/getresults:id")
.get(async (req,res) => {
    const uid : number = Number(req.params.id);
    const keywords = await getKeywords(uid);
    if (keywords) {
        const results = await get_keywords(keywords);
        if(results) {
            res.status(HttpCode.Success).json(results);
        }
    }
    else {
        res.sendStatus(HttpCode.BadRequest);
    }
    
})

export default serverRouter;