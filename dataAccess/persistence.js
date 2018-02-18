const MongoClient = require('mongodb').MongoClient;
const server = process.env.CCV_MONGODB_SERVER || 'localhost';
const port = process.env.CCV_MONGODB_PORT || '27017';
const database = process.env.CCV_MONGODB_DATABASE || 'FunctionalLightingProvider';
const url = 'mongodb://' + server + ':' + port + '/' + database;

const SUCCESS = true;
const  FAIL = false;

function findAll(collectionName, res, sendResponse) {

    MongoClient.connect(url, function(err, db) {
        if (err) {
            console.log(err);
            sendResponse(err, FAIL, res);
        }
        else {
            createIfCollectionNotExist(collectionName, function (isSuccess, re){
                if (isSuccess && isSuccess === true) {
                    db.collection(collectionName).find({}).toArray(function (err, result) {
                        var data = {};
                        if (err) {
                            data = err;
                        }
                        else
                            data = result;

                        db.close();

                        sendResponse(data, SUCCESS, res);
                    });
                }
                else{
                    sendResponse(re, FAIL, res);
                }
            });
        }
    });
}

function findById(id, collectionName, res, sendResponse) {
    findByIdElement({id: id}, collectionName, res, sendResponse);
}

function findByIdElement(query, collectionName, res, sendResponse) {

    MongoClient.connect(url, function (err, db) {
        if (err) {
            console.log(err);
            sendResponse(err, FAIL, res);
        }
        else {
            createIfCollectionNotExist(collectionName, function (isSuccess, re){
                if (isSuccess && isSuccess === true) {
                    var mysort = {creationDate: -1};
                    db.collection(collectionName).find(query).sort(mysort).toArray(function (err, result) {
                        var data = {};
                        if (err)
                            data = err;
                        else
                            data = result;

                        db.close();
                        if (data.length > 0)
                            data = data[0];

                        sendResponse(data, SUCCESS, res);
                    });
                }
                else{
                    sendResponse(re, FAIL, res);
                }
            });
        }
    });
}

function create(element, collectionName, res, sendResponse) {

    MongoClient.connect(url, function(err, db) {
        if (err) {
            console.log(err);
            sendResponse(err, FAIL, res);
        }
        else {
            createIfCollectionNotExist(collectionName, function (isSuccess, re){
                if (isSuccess && isSuccess === true) {
                    return db.collection(collectionName).save(element, function (err, result) {
                        var data = {};
                        if (err)
                            data = err;
                        else
                            data = result.ops[0];

                        db.close();

                        sendResponse(data, SUCCESS, res);
                    })
                }
                else{
                    sendResponse(re, FAIL, res);
                }
            });
        }
    });
}

function update(element, collectionName, res, sendResponse) {
    create(element, collectionName, res, function (data, isSuccess, resp){
        if (isSuccess && isSuccess === true) {

            MongoClient.connect(url, function (err, db) {
                if (err) {
                    console.log(err);
                    sendResponse(err, FAIL, res);
                }
                else {
                    var query = {id: element.id};
                    var mysort = {creationDate: 1};
                    db.collection(collectionName).find(query).sort(mysort).toArray(function (err, result) {
                        var data = {};
                        if (err)
                            data = err;
                        else
                            data = result;

                        if (data.length > 5) {
                            var myquery = {id: data[0].id};
                            db.collection(collectionName).deleteOne(myquery, function (err, obj) {
                            });
                        }

                        db.close();

                        sendResponse(data, SUCCESS, res);
                    });
                }
            });
        }
        else{
            sendResponse(data, FAIL, res);
        }
    });
}

function deleteElement(id, collectionName, res, sendResponse) {

    MongoClient.connect(url, function(err, db) {
        if (err) {
            console.log(err);
            sendResponse(err, FAIL, res);
        }
        else {
            createIfCollectionNotExist(collectionName, function (isSuccess, re){
                if (isSuccess && isSuccess === true) {
                    var myquery = {id: id};
                    db.collection(collectionName).remove(myquery, function (err, result) {
                        var data = {};
                        if (err)
                            data = err;
                        else
                            data = result;

                        db.close();

                        sendResponse(data, SUCCESS, res);
                    });
                }
                else{
                    sendResponse(re, FAIL, res);
                }
            });
        }
    });
}

function createIfCollectionNotExist (name, cb) {
    MongoClient.connect(url, function(err, db) {
        if (err) {
            console.log(err);
            sendResponse(err, FAIL, res);
        }
        else {
            db.listCollections({name: name})
                .next(function(err, collinfo) {
                    if (collinfo) {
                        db.close();
                        cb (SUCCESS, name);
                    }
                    else{
                        db.createCollection(name, function(err, res) {
                            if (err){
                                cb (FAIL, err);
                            }
                            else{
                                db.close();
                                cb (SUCCESS, name);
                            }
                        });
                    }
                });
        }
    });
}

exports.findAll = findAll;
exports.findById = findById;
exports.create = create;
exports.update = update;
exports.delete = deleteElement;
exports.findByIdElement = findByIdElement;