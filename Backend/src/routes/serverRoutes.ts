import express from 'express';
import { HttpCode } from '../config';
//import runScript from '../controller/bridge';
import { insertKeyword } from '../db/functions';

const serverRouter = express.Router();

serverRouter
.route('/submit')
.post(async (req,res) => {
    var keyword='';
    if(req.query.keyword == 'string'){
        keyword = req.query.keyword;
        //runScript(keyword);
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

export default serverRouter;