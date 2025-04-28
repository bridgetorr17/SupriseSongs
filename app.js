const express = require('express');
const cors = require('cors');
const {MongoClient, ServerApiVersion} = require('mongodb');
require('dotenv').config()

const app = express();
const PORT = 8000;
const mongoURI = process.env.MONGO_URI;
const client = new MongoClient(mongoURI);

app.use(express.json());
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

app.get('/about', (req, res) => {
    res.send('about route');
})

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})