import express from 'express';
import path from 'path';
import mongodb from 'mongodb';  
import mongoose from 'mongoose';  
import { fileURLToPath } from 'url';
import {ObjectId} from 'mongodb';

import * as dotenv from 'dotenv';
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const MongoClient = mongodb.MongoClient;

const app = express();
const PORT = 8000;

MongoClient.connect(process.env.MONGODB_URI)
    .then(client => {
        console.log("connected to database");
    
        const db = client.db('SupriseSongs');
        const concertCollection = db.collection('Concerts');
        const albumCollection = db.collection('Albums');

        //MIDDLEWARE
        app.set('view engine', 'ejs');
        app.use(express.json());
        app.use(express.static('public'));
        app.use(express.urlencoded({ extended: true}));

        //ROUTES
        app.get('/', (request, response) => {
            concertCollection
                .find()
                .toArray()
                .then(results => {
                    results.sort((a,b) => b.votes - a.votes);
                    response.render('index.ejs', {concerts : results});
                })
                .catch(error => console.error(error));
        });
        
        app.post('/addConcert', (request, response) => {
            const concert = request.body;
            concert['votes'] = 0;

            concertCollection
                .insertOne(concert)
                .then(result => {
                    response.redirect('/');
                })
                .catch(error => console.error(error))
        });
        
        app.put('/like', (request, response) => {
            const concert = request.body.concert.trim();

            concertCollection.findOneAndUpdate(
                { concertName: concert},
                { $inc: {votes: 1}},
                { returnDocument: 'after'}
            )
            .then(result => {
                if(result.votes){
                    response.status(200).json(result.votes);
                }else{
                    response.status(404).json({ message: 'Concert not found' });
                }
            })
            .catch(error => {
                console.error(error);
                response.status(500).json({error: 'Internal server error'});
            })
        });

        app.listen(PORT, function(){
            console.log(`listening on port ${PORT}`)
        });
    })
    .catch(() => {
        console.log('connection failed');
    });

module.exports = app;