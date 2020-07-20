const moment = require('moment');

const limit = process.env.rateLimit || 500;
let rate = 0;

const limiter = (req, res, next) => {
    if (rate < limit) {
        rate += 1;
        next();
    } else {
        res.sendStatus(429);
    }
}


function intervalFunc() {
    console.log('Renewed rate '+ moment().format());
    rate = 0;
}

setInterval(intervalFunc, 1000);


exports.limiter = limiter;