const uuidv4 = require('uuid/v4');
const persistence = require('../dataAccess/persistence');
const COLLECTION = 'user';

function login(credentials, res, sendResponse) {
    if (isValidCredentials(credentials)){
        sendResponse({name: 'ssss', lastName: 'sss', email:'email@domain.com', username:'user', password:'pass'}, true, res);
        //persistence.findByIdElement({username: credentials.username, password: credentials.password}, COLLECTION, res, sendResponse);
    } else{
        sendResponse({error: 'faltan parametros de entrada'}, true, res);
    }
}

function isValidCredentials(credentials){
    return true;
    /*
    return (credentials &&
        typeof credentials.username == 'string' &&
        typeof credentials.password == 'string'
    );*/
}

exports.login = login;