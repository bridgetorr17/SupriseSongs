import express from 'express';
import path from 'path';
import mongodb from 'mongodb';  
import mongoose from 'mongoose';  
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const MongoClient = mongodb.MongoClient;

const app = express();
const PORT = 8000;

MongoClient.connect('mongodb+srv://bridgetorr1902:aGyiBmU0BQSZs1g6@cluster0.5payw8y.mongodb.net/Concerts?retryWrites=true&w=majority&appName=Cluster0')
    .then(client => {
        console.log("connected to database");
    
        const db = client.db('SupriseSongs');
        const concertCollection = db.collection('Concerts');
        const albumCollection = db.collection('Albums');
        console.log('connected collections');

        //MIDDLEWARE
        app.set('view engine', 'ejs');
        app.use(express.json());
        app.use(express.static('public'));
        app.use(express.urlencoded({ extended: true}));

        //ROUTES
        app.get('/', (request, response) => {
            //response.sendFile(__dirname + '/views/index.html');

            concertCollection
                .find()
                .toArray()
                .then(results => {
                    response.render('index.ejs', {concerts : results});
                })
                .catch(error => console.error(error));
        });
        
        app.post('/addConcert', (request, response) => {
            console.log('positng a new concert!');

            const concert = request.body;
            concert['votes'] = 0;
            console.log(concert);

            concertCollection
                .insertOne(concert)
                .then(result => {
                    response.redirect('/');
                    console.log('reloaded');
                })
                .catch(error => console.error(error))
        });
        
        app.put('/vote', (request, response) => {
        
        });

        app.listen(PORT, function(){
            console.log(`listening on port ${PORT}`)
        });
    })
    .catch(() => {
        console.log('connection failed');
    });

