'use strict';

const express = require('express');
const morgan = require('morgan');
const serverPort = 8081;
const version = '/api/v1';


const app = express();
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));

let counter = 0;

console.log("Setting up Server");


app.get('/', (request, response) => response.send("This is the Counter's API main page!"));

app.get(version + '/counter', (request, response) => {
    response.send({ "count": counter })});
app.post(version + '/counter/inc', (request, response) => {

    try {
        counter += 1;
        response.sendStatus(200)
    } catch (error) {
        console.log(error);
        response.sendStatus(500)
    }
});

app.listen(serverPort, () => console.log(`Counter API listening at http://localhost:${serverPort}`));



