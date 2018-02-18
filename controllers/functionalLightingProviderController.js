var express = require('express');
var router = express.Router();
var tools = require('../util/tools');
var provider = require('../logic/functionalLightingProvider');

module.exports =  (expressApp) => {

    router.get('/', function (req, res) {
        res.setHeader('Content-Type', 'application/json');
        provider.findAll(res, tools.sendResponse);
    });

    router.get('/:id', function (req, res) {
        res.setHeader('Content-Type', 'application/json');
        provider.findById(req.params.id, res, tools.sendResponse);
    });

    router.get('/provider/:id', expressApp.oauth.authorise(), function (req, res) {
        res.setHeader('Content-Type', 'application/json');
        providerAnswer.findAllClientproviderAnswers(req.params.id, res, tools.sendResponse);
    });

    router.post('/', expressApp.oauth.authorise(), function (req, res) {
        res.setHeader('Content-Type', 'application/json');
        provider.create(req.body, res, tools.sendResponse);
    });

    router.post('/provider', expressApp.oauth.authorise(), function (req, res) {
        res.setHeader('Content-Type', 'application/json');
        providerAnswer.create(req.body, res, tools.sendResponse);
    });

    router.put('/:id', expressApp.oauth.authorise(), function (req, res) {
        res.setHeader('Content-Type', 'application/json');
        provider.update(req.params.id, req.body, res, tools.sendResponse);
    });

    router.delete('/:id', expressApp.oauth.authorise(), function (req, res) {
        res.setHeader('Content-Type', 'application/json');
        provider.delete(req.params.id, res, tools.sendResponse);
    });

    return router;
}