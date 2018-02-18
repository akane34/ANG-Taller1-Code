const uuidv4 = require('uuid/v4');
const crypto = require('crypto');
const secret = 'c0fa1bc00531bd78ef38c628449c5102aeabd49b5dc3a2a516ea6ea959d6658e';
var persistence = require('../dataAccess/persistence');
var COLLECTION = 'user';

function findAll(res, sendResponse) {
    sendResponse([{name: 'ssss', lastName: 'sss', email:'email@domain.com', username:'user', password:'pass'}], true, res);

    //persistence.findAll(COLLECTION, res, sendResponse);
}

function findById(id, res, sendResponse) {
    sendResponse({name: 'ssss', lastName: 'sss', email:'email@domain.com', username:'user', password:'pass'}, true, res);
    //persistence.findById(id, COLLECTION, res, sendResponse);
}

function findByUsername(username, res, sendResponse) {
    sendResponse({name: 'ssss', lastName: 'sss', email:'email@domain.com', username:'user', password:'pass'}, true, res);
    //persistence.findByIdElement({username: username}, COLLECTION, res, sendResponse);
}

function findByUsernameAndPassword(username, password, res, sendResponse) {
    sendResponse({name: 'ssss', lastName: 'sss', email:'email@domain.com', username:'user', password:'pass'}, true, res);
    //persistence.findByIdElement({username: username, password: password}, COLLECTION, res, sendResponse);
}

function create(user, res, sendResponse) {
    sendResponse({name: 'ssss', lastName: 'sss', email:'email@domain.com', username:'user', password:'pass'}, true, res);

    /*
    if (isValidUser(user)){
        user.id = uuidv4();
        user.version = '1';

        var userClean = createCleanUser(user);
        userClean.id = uuidv4();

        persistence.create(userClean, COLLECTION, res, sendResponse);
    } else{
        sendResponse({error: 'faltan parametros de entrada'}, res);
    }
    */
}

function update(id, user, res, sendResponse) {

    sendResponse({name: 'ssss', lastName: 'sss', email:'email@domain.com', username:'user', password:'pass'}, true, res);
    /*
    if (isValidUser(user)){
        var userClean = createCleanUser(user);
        userClean.id = id;

        persistence.update(userClean, COLLECTION, res, sendResponse);
    } else{
        sendResponse({error: 'faltan parametros de entrada'}, res);
    }
    */
}

function deleteElement(id, res, sendResponse) {
    sendResponse({name: 'ssss', lastName: 'sss', email:'email@domain.com', username:'user', password:'pass'}, true, res);
    //persistence.delete(id, COLLECTION, res, sendResponse);
}

function isValidUser(user){
    return (user &&
        typeof user.name == 'string' &&
        typeof user.lastName == 'string' &&
        typeof user.email == 'string' &&
        typeof user.username == 'string' &&
        typeof user.password == 'string'
    );
}

function createCleanUser(user){
    var cleanUser = {};
    cleanUser.id = user.id;
    cleanUser.version = '1';
    cleanUser.name = user.name;
    cleanUser.lastName = user.lastName;
    cleanUser.email = user.email;
    cleanUser.username = user.username;
    cleanUser.password = crypto.createHmac('sha256', secret).update(user.password).digest('hex');
    cleanUser.creationDate = (new Date()).getTime();

    return cleanUser;
}

exports.findAll = findAll;
exports.findById = findById;
exports.create = create;
exports.update = update;
exports.delete = deleteElement;
exports.findByUsername = findByUsername;
exports.findByUsernameAndPassword = findByUsernameAndPassword;