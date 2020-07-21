const moment = require('moment');

const limit = process.env.rateLimit || 500;
let rate = 0;

const limiter = (req, res, next) => {
    res.set('x-rate-limit-limit',limit);
    if (rate < limit) {
        rate += 1;
        res.set('x-rate-limit-remaining', limit - rate);
        next();
    } else {
        res.set('x-rate-limit-remaining', limit - rate);
        res.sendStatus(429);
    }
}


function intervalFunc() {
    console.log('Renewed rate '+ moment().format());
    rate = 0;
}

setInterval(intervalFunc, 1000);


exports.limiter = limiter;