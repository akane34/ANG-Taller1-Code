const express = require('express');
const router = express.Router();
const tools = require('../util/tools');
const auth = require('../auth/auth');
const user = require('../auth/user');

module.exports =  (expressApp) => {

    router.post('/user', function (req, res) {
        res.setHeader('Content-Type', 'application/json');
        user.create(req.body, res, tools.sendResponse);
    })

    router.get('/user', function (req, res) {
        res.setHeader('Content-Type', 'application/json');
        user.findAll(res, tools.sendResponse);
    })

    router.post('/login', expressApp.oauth.grant());

    return router
}