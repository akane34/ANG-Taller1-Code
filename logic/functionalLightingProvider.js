const uuidv4 = require('uuid/v4');
var persistence = require('../dataAccess/persistence');
var COLLECTION = 'providers';

function findAll(res, sendResponse) {
    persistence.findAll(COLLECTION, res, sendResponse);
}

function findById(id, res, sendResponse) {
    persistence.findById(id, COLLECTION, res, sendResponse);
}

function create(provider, res, sendResponse) {
    if (isValidprovider(provider)){
        provider.id = provider.id || uuidv4();

        var providerClean = createCleanprovider(provider);
        providerClean.id = provider.id || uuidv4();

        persistence.create(providerClean, COLLECTION, res, sendResponse);
    } else{
        sendResponse({error: 'faltan parametros de entrada'}, res);
    }
}

function update(id, provider, res, sendResponse) {
    if (isValidprovider(provider)){
        var providerClean = createCleanprovider(provider);
        providerClean.id = id;

        persistence.update(providerClean, COLLECTION, res, sendResponse);
    } else{
        sendResponse({error: 'faltan parametros de entrada'}, res);
    }
}

function deleteElement(id, res, sendResponse) {
    persistence.delete(id, COLLECTION, res, sendResponse);
}

function isValidprovider(provider){
    return (provider &&
        provider.name &&
        provider.nit &&
        provider.address &&
        provider.phone &&
        provider.webPage &&
        provider.city &&
        provider.state &&
        provider.country &&
        provider.merchantRegistration
    );
}

function createCleanprovider(provider){
    var cleanprovider = {};
    cleanprovider.name = provider.name;
    cleanprovider.nit = provider.nit;
    cleanprovider.address = provider.address;
    cleanprovider.phone = provider.phone;
    cleanprovider.webPage = provider.webPage;
    cleanprovider.city = provider.city;
    cleanprovider.state = provider.state;
    cleanprovider.country = provider.country;
    cleanprovider.merchantRegistration = provider.merchantRegistration;
    cleanprovider.creationDate = (new Date()).getTime();

    return cleanprovider;
}

exports.findAll = findAll;
exports.findById = findById;
exports.create = create;
exports.update = update;
exports.delete = deleteElement;
