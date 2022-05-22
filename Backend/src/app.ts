const cors = require('cors');
import express from 'express';
const HTTP = require('./config');

const app = express();
app.use(express.json());
app.use(cors());
const path = process.env.PATH;

app.get("/", (req,res) => {
    res.redirect("http://localhost:3000/index");
});

app.get("/index", (req,res) => {
    //TODO: Send back the index.html
    res.status(200).send("Hello from CANADA!");
    console.log("Index requested!.");
});

app.get("/index/:username", (req,res)=>{
    const username = req.params.username;
    if(username === "" || username === " "){
        res.redirect("http://localhost:3000/index");
    }
    else{
        //TODO: Send back the index.html
        res.status(200).send(`Hello from CANADA ${username}!`);
    }
    console.log("Index requested with user given!");
});
console.log("Server is up!");
app.listen(3000);