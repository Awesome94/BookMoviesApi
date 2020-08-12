import express from 'express';
import * as bodyParser from 'body-parser';
import {Movie} from './db/models/Movie.model';
import {User} from './db/models/User.model';
import { Request, Response } from "express";
import {hash, genSalt, compare} from 'bcrypt';
import * as jwt from "jsonwebtoken";
import {requireJwtMiddleware} from "./middleware/requireJwtMiddleware";
import dotenv from 'dotenv';
import {connect} from "./db/db";

connect();

dotenv.config()

const app = express();
app.use(bodyParser.json({
    limit: '50mb',
    verify(req: any, res, buf, encoding){
        req.rawBody = buf;
    }
}));


app.get('/', async (req:Request, res:Response)=>{
    return res.status(200).send({"Welcome": "POST to /api/v1/register to get started"})
})

app.post('/api/v1/register', async (req:Request, res:Response)=>{
    const userExists = await User.findOne({username: req.body.username})

    if(userExists) return res.status(400).send('User already exists');

    const salt = await genSalt(10);
    const hashPassword = await hash(req.body.password, salt);

    const user = new User()
    user.username = req.body.username,
    user.password = hashPassword

    try{
        const savedUser = await user.save()
        res.send({user:user.username})
    }catch(err){
        res.status(400).send(err);
    }
});

app.post('api/v1/login/:username/:password', async (req:Request, res:Response)=>{
    const user = await User.findOne({username: req.params.username})
    if(!user) return res.status(400).send('Username or Password is wrong');
    const validpass = await compare(req.params.password, user.password);
    if(!validpass) return res.status(400).send('Password is wrong');

    const token = jwt.sign({_id: user.username}, process.env.TOKEN_SECRET);
    res.send({"Access Token":token});

});


app.post('api/v1/book', requireJwtMiddleware, async (req:Request, res:Response)=> {
    const movie  = new Movie();
    movie.name = req.body.name;
    movie.plot_summary = req.body.summary;
    movie.assignee = req.body.assignee;
    movie.tickets = req.body.tickets;
    await movie.save();
    res.send(movie);
});


app.get('api/v1/booked/:username', async(req, res)=>{
    const movies = await Movie.find();
    res.send(movies);
});

export{app}