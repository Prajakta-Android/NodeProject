
/*
// create node server

let http = require("http"); //1.  import  library we use require 2.for creating server we use http lib
http.createServer (function (request, response) {
response.end("Prajakta learn node js now...!")
}).listen(3000);// we use => instead of function keyword [ES 6 feature]

// Console will print the message
console.log('Server running at http://127.0.0.1:3000');

*/

// using express

const express = require("express"); //  require express
const bodyParser = require("body-parser");const controllerFile = require("./controller");
let app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.post("/userInfo", (req, res) => {
    let reqBody = req.body;
    reqBody.mobile = "9527";// add parameter dynamically
    res.send(reqBody);
});

app.post("/sumInfo", (req, res) => {
    let actionArray = req.body.action;
    let resultArray = [];
    actionArray.forEach(action => {
        if (action && action == "sum") {
            let total = controllerFile.sum(parseInt(req.body.num1), parseInt(req.body.num2));
            resultArray.push({ sum: total });
        }
        else if (action && action == "sub") {
            let total = controllerFile.sub(parseInt(req.body.num1), parseInt(req.body.num2));
            resultArray.push({ sub: total });
        }
        else if (action && action == "mul") {
            let total = controllerFile.mul(parseInt(req.body.num1), parseInt(req.body.num2));
            resultArray.push({ mul: total });
        }
        else if (action && action == "div") {
            let total = controllerFile.div(parseInt(req.body.num1), parseInt(req.body.num2));
            resultArray.push({ div: total });
        } else {
            resultArray.push({ "No such action": action });
        }
    });
    res.status(200).send({"actions Result":resultArray});
});

app.put("/userInfo", (req, res) => {
    let myJson = {
        "id": "1",
        "name": "prajakta"
    }
    if (req.query.id == myJson.id) {
        myJson.name = "baja";
        res.status(200).send(myJson);
    }
    else
        res.status(404).send('{user not found}');
})

app.delete("/userInfo", (req, res) => {
    let myJson = {
        "id": "1",
        "name": "prajakta"
    }
    if (req.query.id == myJson.id) {
        delete myJson.name;
        res.status(200).send(myJson);
    }
    else
        res.status(404).send('{user not found}');
});

app.get("/userInfo", (req, res) => {
    res.status(200).send({
        "name": "prajakta start learning expres..... Yahooo...!!",
        "Author": "Prajakta"
    });
});
let server = app.listen(3000, function () {
    let host = server.address().address;
    let port = server.address().port;
});
