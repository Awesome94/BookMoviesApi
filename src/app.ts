import express from 'express';
import * as bodyParser from 'body-parser';
import {Movie} from './db/models/Movie.model';
import {User} from './db/models/User.model';

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

app.post('/user/login', async(req, res)=>{
    const user = new User();
    user.username = req.body.username;
    user.password = req.body.password;
    const token = "this is awesome"
    res.send({token: token})

})

app.post('/user/register', async(req, res)=>{
    const user = new User();
    user.username = req.body.username;
    user.password = req.body.password;
    await user.save();
    res.send(user)

})


app.post('/book', async (req, res)=> {
    const movie  = new Movie();
    movie.name = req.body.name;
    movie.plot_summary = req.body.summary;
    movie.assignee = req.body.assignee;
    movie.tickets = req.body.tickets;
    await movie.save();
    res.send(movie);
});


app.get('/booked/:username', async(req, res)=>{
    const movies = await Movie.find();
    res.send(movies);
});

export{app}