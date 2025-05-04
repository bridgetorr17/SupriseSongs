const express = require('express');
const cors = require('cors');
const {MongoClient, ServerApiVersion} = require('mongodb');
require('dotenv').config()

const app = express();
const PORT = 8000;
const mongoURI = process.env.MONGO_URI;
const client = new MongoClient(mongoURI);

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());

app.get('/', async (req, res) => {
    try{
        await client.connect()

        let concertCollection = client.db('SupriseSongs').collection('Concerts');
        let results = await concertCollection.find().toArray();
        results.sort((a,b) => b.votes - a.votes);
        res.send(JSON.stringify(results));
    }
    catch(error){
        console.error(error);
    }
    finally{
        await client.close();
    }
});

app.post('/addConcert', async (req, res) => {
    const concert = req.body;
    concert['votes'] = 0;

    try{
        await client.connect();

        let concertCollection = client.db('SupriseSongs').collection('Concerts');
        const albumCollection = client.db('SupriseSongs').collection('Albums');

        const alreadyExists = await concertCollection.findOne({concertName : concert['concertName']})
        console.log(concert['concertName']);
        console.log(`does this exist yet? ${alreadyExists}`);

        if(alreadyExists === null){
            //Check if they are actually Taylor Swift Songs
            const aggGuitar = [ 
                { '$match': 
                    { 'tracklist': 
                        {        
                        '$regex' : concert['guitarSong'],
                        '$options' : 'i'
                        }
                    } 
                } 
            ];
            const aggPiano = [ 
                { '$match': 
                    { 'tracklist': 
                        {        
                        '$regex' : concert['pianoSong'],
                        '$options' : 'i'
                        }
                    } 
                } 
            ];
            
            const cursorGuitar = await albumCollection.aggregate(aggGuitar).toArray();
            const cursorPiano = await albumCollection.aggregate(aggPiano).toArray();

            if(cursorPiano.length > 0 && cursorGuitar.length > 0){
                await concertCollection.insertOne(concert);
                console.log('concert added');
                res.status(201).send('Concert added');
            }
            else{
                console.log('not actual TS songs')
                res.status(406).send('One of the songs entered were not TS songs');
            }
            
        }
        else{
            console.log('concert already exists in db');
            res.status(200).send('Concert already exists in database');
        }
    }
    catch(error){
        console.error(error);
    }
    finally{
        await client.close();
    }
});

app.put('/like', async (req, res) => {
    const concert = req.body.concert.trim();
    
    try{
        await client.connect();

        let concertCollection = client.db('SupriseSongs').collection('Concerts');
        let result = await concertCollection.findOneAndUpdate(
            { concertName: concert},
            { $inc: {votes: 1}},
            {returnDocument: 'after'} 
        );

        res.status(200).json(result.votes);
    }
    catch(error){
        console.error(error);
    }
    finally{
        await client.close();
    }
})

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})