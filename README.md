# Surprise Songs CRUD API
This CRUD API handles requests made to the Surprise Songs database setup for this project. Users of the frontend can add their own (POST) surprise songs and like (PUT) surprise songs from other Eras Tour concerts.

## Technologies Used
- Node.js + Express: Framework used for building CRUD API. Handles GET, POST, and PUT requests made by client side device. The API communicates with database to ensure all inputs are valid and not duplicates. 
- vercel:  Hosted on Vercel. This repo does not have client code in it, but you can see the JSON response sent with the GET request at the vercel URL: <a href="https://surprise-songs.vercel.app">https://surprise-songs.vercel.app</a> 
- MongoDB: The database is hosted on MongoDB using MongoAtlas. There are two collections:
  - The user added surprise song collection. A new document is made each time a valid and unique surprise song combination is submitted by the client.
  - There is also an "Albums" collection which stores all of Taylor Swift's songs by album. This includes a miscellaneous document that includes non album songs that were played in the Surprise Song Set.
    - This collection is used to verify if the inputed Surprise Songs are actually Taylor Swift Songs. The MongoDB Aggregation Pipeline visulaization tool on MongoAtlas was used to create the aggregation functions.  

## Lessons Learned in making this project
- Disconnect and reconnect to database for every API route. Otherwise vercel breaks
- Structure vercel.json to route all API calls to the server file
- Need to add environment variables directly in vercel (connection string for mongoDB)
- need to use CORS middleware when frontend and backend are not in the same repo
