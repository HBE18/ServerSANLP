import express from 'express';
import { HttpCode } from '../config';
import runScript from '../controller/bridge';

const serverRouter = express.Router();

serverRouter
.route('/submit')
.post((req,res) => {
    var keyword='';
    if(req.query.keyword == 'string'){
        keyword = req.query.keyword;
        runScript(keyword);

    } 
})

export default serverRouter;