const uuidv4 = require('uuid/v4');
var persistence = require('../dataAccess/persistence');
var COLLECTION = 'token';

function findByAccessToken(accessToken, res, sendResponse) {
    sendResponse({accessToken: 'jhasfjsfjsajsjas', userID: 'ASASIUHSAbkjasbK'}, true, res);
    //persistence.findByIdElement({accessToken: accessToken}, COLLECTION, res, sendResponse);
}

function create(token, res, sendResponse) {
    sendResponse({accessToken: 'jhasfjsfjsajsjas', userID: 'ASASIUHSAbkjasbK'}, true, res);
    /*
    if (isValidToken(token)){
        var cleanToken = createCleanToken(token);
        cleanToken.id = uuidv4();

        persistence.create(cleanToken, COLLECTION, res, sendResponse);
    } else{
        sendResponse({error: 'faltan parametros de entrada'}, res);
    }
    */
}

function isValidToken(token){
    return (token &&
        typeof token.accessToken == 'string' &&
        typeof token.userID == 'string'
    );
}

function createCleanToken(token){
    var cleanToken = {};
    cleanToken.id = token.id;
    cleanToken.version = '1';
    cleanToken.accessToken = token.accessToken;
    cleanToken.userID = token.userID;
    cleanToken.creationDate = (new Date()).getTime();

    return cleanToken;
}

exports.findByAccessToken = findByAccessToken;
exports.create = create;