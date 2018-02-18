const oAuth2Server = require('node-oauth2-server');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 4001;
const fs = require('fs');
const fsmk = require('node-fs');
const properties = require('properties-parser');
const path = require("path");
const oauthModel = require('./auth/authModel');

app.oauth = oAuth2Server({
    model: oauthModel,
    grants: ['password'],
    debug: true
})

const functionalLightingProviderController = require('./controllers/functionalLightingProviderController')(app);
const authController = require('./controllers/authController')(app);

var logDirectory = path.join(__dirname, 'logs/');
if (!fs.existsSync(logDirectory)) {
    fsmk.mkdirSync(logDirectory, 0666, true);
}
var fileLog = path.join(logDirectory, 'server.log');

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api/v1/provider', functionalLightingProviderController);
app.use('/api/v1/auth', authController);

app.listen(port, function() {
    console.log('Backend listening on '+port)
});

process.on('uncaughtException', function (err) {
    var fs = require('fs');
    var fsmk = require('node-fs');
    var LOG = require('./util/logger');

    var dirLog = path.join(__dirname, 'logs');
    var fileLog = path.join(dirLog,'exceptions.log');
    if (!fs.existsSync(dirLog)) {
        fsmk.mkdirSync(dirLog, 0666, true);
    }

    var code = err.code;
    if (code == 'EACCES'){
        fs.appendFileSync(fileLog, LOG('ACCESS_DENIED', [code + ' ' + err]));
    }
    else{
        fs.appendFileSync(fileLog, LOG('ERROR', [' ' + err]));
    }
});