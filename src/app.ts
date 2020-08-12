import express from 'express';
import * as bodyParser from 'body-parser';
import {connect} from "./db/db";

connect();


const app = express();
app.use(bodyParser.json({
    limit: '50mb',
    verify(req: any, res, buf, encoding){
        req.rawBody = buf;
    }
}));

app.get('/', (req, res) => res.send('hello world'));

export{app}