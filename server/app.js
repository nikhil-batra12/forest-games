var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');

/* Internal controller dependencies*/
var coinsController = require('./controllers/coinsController');
var paymentController = require('./controllers/paymentController');

/* Set port for local/heroku environment*/
var port = process.env.PORT || 8080;


activateApp();

// Activate the app and routes
function activateApp() {
    app.use(bodyParser.urlencoded({
        extended: false
    }));

    /* * CORS Support in my Node.js web app written with Express */
    // http://stackoverflow.com/questions/7067966/how-to-allow-cors-in-express-nodejs
    app.all('/*', function (req, res, next) {
        res.header("Access-Control-Allow-Credentials", "true");
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", 'Content-Type, X-Requested-With');
        res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
        next();
    });

    // parse application/json
    app.use(bodyParser.json());
    app.use(express.static(path.join(__dirname,'../dist')));
    //To search a planet
    app.get('/api/coins', coinsController.getCoins);
    //To get next search results
    app.get('/api/payment-methods', paymentController.getPaymentMethods);

    app.post('/api/make-payment', paymentController.handlePayment);
    //Set paths

    app.get('/*', function (req, res) {

        res.sendFile(path.join(__dirname,'../dist/index.html'));
    });
    console.log(__dirname);
    //Start server to listen on port
    app.listen(port, function () {
        console.log('App server started', port);
    })
}