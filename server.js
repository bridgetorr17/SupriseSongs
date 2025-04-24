import express from 'express';
import path from 'path';
import mongodb from 'mongodb';    
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = 8000;

const MongoClient = mongodb.MongoClient;
const connectionString = 'mongodb+srv://bridgetorr1902:aGyiBmU0BQSZs1g6@cluster0.5payw8y.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

// app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.static('public'));


app.get('/', (request, response) => {
    console.log(__dirname);
    response.sendFile(__dirname + '/views/index.html');
});

app.post('/addConcert', (request, response) => {

});

app.put('/vote', (request, response) => {

});

app.listen(PORT, function(){
    console.log(`listening on port ${PORT}`)
});

