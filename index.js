const express = require('express');
const cors = require('cors');
const mongo = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv/config');
const getcode = require('./getcode.js')
const postcode = require('./postcode.js')

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use('/get', getcode);
app.use('/post', postcode);

mongo.connect(process.env.MongoString, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }, (error) => {
    if (error) {
        console.log(error);
    } else
        console.log('Connected!');
})
var Port = process.env.PORT || 3000;

app.listen(Port);