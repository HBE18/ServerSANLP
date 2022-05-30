import express from 'express';
const cors = require('cors');
import { ExpressConfig, HttpCode } from './config';
import userRoutes from './routes/userRoutes';


const app = express();
app.use(express.json());
app.use(cors({
    "origin": "*",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": true,
    "optionsSuccessStatus": 204
  }));
app.use(userRoutes);

const port = ExpressConfig.port|| 3000;
const message = `Server is up on http://localhost:${port}`;

app.get('/',(req,res) => {
    res.status(HttpCode.Success).send("Hello Guys!");
});

app.listen(port,() => {
    console.log(message);
});
