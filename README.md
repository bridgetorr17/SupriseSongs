# Surprise Songs CRUD API
This CRUD API handles requests made to the Surprise Songs database setup for this project. Users of the frontend can add their own (POST) surprise songs and like (PUT) surprise songs from other Eras Tour concerts.

## Technologies Used
- Node.js + Express: Framework used for building CRUD API. Handles GET, POST, and PUT requests made by client side device. 
- vercel:  Hosted on Vercel. This repo does not have client code in it, but you can see the JSON response sent with the GET request at the vercel URL: <a href="https://surprise-songs.vercel.app">https://surprise-songs.vercel.app</a> 
- MongoDB: The database is hosted on MongoDB using MongoAtlas. There is currently one collection that has user added documents for concerts and surprises songs during the tour.

## Lessons Learned in making this project
- Disconnect and reconnect to database for every API route. Otherwise vercel breaks
- Structure vercel.json to route all API calls to the server file
- Need to add environment variables directly in vercel (connection string for mongoDB)
- need to use CORS middleware when frontend and backend are not in the same repo
- for improvements, see the Github issues 
