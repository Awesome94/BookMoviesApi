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
import cors from 'cors';
connect();

dotenv.config()


const app = express();

app.use(cors())

app.use(bodyParser.json({
    limit: '50mb',
    verify(req: any, res, buf, encoding){
        req.rawBody = buf;
    }
}));


app.use((req, res, next)=>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });


app.post('/', async (req:Request, res:Response)=>{
    return res.status(200).send({"Welcomed": "POST to /api/v1/register to get started"})
})

app.post('/api/v1/register/:username/:password', async (req:Request, res:Response)=>{
    const userExists = await User.findOne({username: req.params.username})

    if(userExists) return res.status(400).send({'error':'User already registered, Login to continue'});

    const salt = await genSalt(10);
    const hashPassword = await hash(req.params.password, salt);

    const user = new User()
    user.username = req.params.username,
    user.password = hashPassword

    try{
        const savedUser = await user.save()
        res.status(201).send({"Success": "Account created successfully"})
    }catch(err){
        res.status(400).send(err);
    }
});

app.post('/api/v1/login/:username/:password', async (req:Request, res:Response)=>{
    const user = await User.findOne({username: req.params.username})
    if(!user) return res.status(400).send({'error': 'account does not exists, register to continue'});
    const validpass = await compare(req.params.password, user.password);
    if(!validpass) return res.status(400).send('Password is wrong');

    const token = jwt.sign({username: user.username}, process.env.TOKEN_SECRET);
    res.send({"Access Token":token, "username":user.username});

});


app.post('/api/v1/book', async (req:Request, res:Response)=> {
    const movieBooked = await Movie.findOne({name: req.body.name})

    if(movieBooked) return res.status(400).send('Movie already booked');

    const movie  = new Movie();
    movie.name = req.body.name;
    movie.plot_summary = req.body.plot_summary;
    movie.assignee = req.body.assignee;
    movie.tickets = req.body.numberOftickets;
    movie.account_owner = req.body.username || 'guest'
    movie.identifier = req.body.imdbID
    movie.year = req.body.year
    movie.image = req.body.image
    await movie.save();
    movie.identifier = movie.identifier.toString() + movie.id.toString()
    await movie.save();
    res.status(201).send({"success": `Movie booked successfully with Identifier: ${movie.identifier}`});
});


app.get('/api/v1/booked/:identifier', async(req, res)=>{
    const movies = await Movie.find({identifier: req.params.identifier});
    res.status(200).send(movies);
});

app.get('/api/v1/book/all', requireJwtMiddleware, async(req:any, res)=>{
    console.log("we made it here", req.user)
    const username = req.user.username || req.user._id
    const movies = await Movie.find({account_owner: username});
    res.status(200).send(movies);
});


export{app}