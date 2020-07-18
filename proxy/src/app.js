'use strict';

const express = require('express');
const morgan = require('morgan');

const {limiter} = require("./middlewares/limiter");
const counterService = require("./api/counter.service");

const serverPort = 8080;
const version = "/api/v1";

const app = express();
app.use(morgan(':method :url :status [:date[clf]] - :response-time ms'));


console.log("Setting up Proxy Server");

app.get("/", (request, response) => response.send("This is the Proxy Server main page!"));

app.get(version + "/counter", limiter, async (request, response) => {
    counterService.getCounter(request, response)
});

app.post(version + "/counter/inc", limiter, async (request, response) => {
    counterService.incCounter(request, response)
});

app.listen(serverPort, () => console.log(`Proxy Server ready listening at http://localhost:${serverPort}`));


