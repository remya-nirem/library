const express = require('express');
const cors = require('cors');
const logger = require('morgan');

const config = require('./config')

const PORT = process.env.PORT || config.server.port;
require('./middleware/mongoDB');

const app = new express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(logger('dev'));

//api
const apiuser = require('./routes/apiuser');
app.use('/apiuser',apiuser);
const apibook = require('./routes/apibook');
app.use('/apibook',apibook);


app.listen(PORT,()=>{
    console.log(`Server listerning to ${PORT}`);
})