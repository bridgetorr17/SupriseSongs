import express from 'express';
import path from 'path';
import mongodb from 'mongodb';

const app = express();
const PORT = 8000;

const MongoClient = mongodb.MongoClient;
const connectionString = '';

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.static('public'));


app.get('/', (request, response) => {

    response.sendFile(__dirname + 'views/index.html');
});

app.post('/addConcert', (request, response) => {

});

app.put('/vote', (request, response) => {

});

app.listen(PORT, function(){
    console.log(`listening on port ${PORT}`)
});

module.exports = app;