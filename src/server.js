const express = require('express');
import {config} from 'dotenv'

//import routes
const movieRoutes = require("./routes/movieRoutes")

config();
const app = express();

//API routes
app.use("/movies", movieRoutes)



const PORT =5001;
app.listen(PORT, ()=>{
    console.log(`server running on PORT ${PORT}`)
})


//GET, POST, PUT, DELETE