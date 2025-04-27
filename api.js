import express, {Router} from "express";
import serverless from "serverless-http";
import path from "path";
import mongodb from "mongodb";
import dotenv from "dotenv";
dotenv.config();

const MongoClient = mongodb.MongoClient;

const api = express();
const router = Router();
//const PORT = 8000;

MongoClient.connect(process.env.MONGODB_URI)
    .then(client => {
    
        const db = client.db('SupriseSongs');
        const concertCollection = db.collection('Concerts');

        //MIDDLEWARE
        api.use(express.json());
        api.use(express.urlencoded({ extended: true}));

        //ROUTES
        console.log("connected to database and ready for route calls");
        router.get('/', (request, response) => {
            concertCollection
                .find()
                .toArray()
                .then(results => {
                    results.sort((a,b) => b.votes - a.votes);
                    response.json(results);
                    //response.render('index.ejs', {concerts : results});
                })
                .catch(error => console.error(error));
        });
        
        router.post('/addConcert', (request, response) => {
            const concert = request.body;
            concert['votes'] = 0;

            concertCollection
                .insertOne(concert)
                .then(result => {
                    response.redirect('/');
                })
                .catch(error => console.error(error))
        });
        
        router.put('/like', (request, response) => {
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

        api.use('/api/', router);

        // api.listen(PORT, function(){
        //     console.log(`listening on port ${PORT}`)
        // });
    })
    .catch(() => {
        console.log('connection failed');
    });


export const handler = serverless(api);