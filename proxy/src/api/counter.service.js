const rp = require("request-promise");

const counterURL = "http://" + (process.env.counterService || "localhost") + ":8081/api/";
const counterAPIVersion = "v1";
const counterGetEndPoint = "/counter";

const getCounter = async (request, response) => {

    try {
        await rp(counterURL + counterAPIVersion + counterGetEndPoint, function (error, res, body) {
            if (error) {
                console.log(`Error retriving counter info: ${error}`);
            } else {
                response.send(body);
            }
        });
    } catch (err) {
        console.log(err)
        response.status(500).send({
            message: err.message
        });
    }
}

const incCounter = async (request, response) => {
    try {
        console.log(counterURL + counterAPIVersion + counterGetEndPoint + "/inc")
        var options = {
            method: 'POST',
            uri: counterURL + counterAPIVersion + counterGetEndPoint + "/inc",
        };

        await rp(options, (error, res, body) => {
            if (error) {
                console.log(`Error incremeting counter: ${error}`);
            } else {
                response.send(body);
            }
        })
    } catch (err) {
        console.log(err)
        response.status(500).send({
            message: err.message
        });
    }
}


exports.getCounter = getCounter;
exports.incCounter = incCounter;