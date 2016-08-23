var Datastore = require('nedb');
var db = new Datastore({filename: './src/server/note.db', autoload: true});

function addNote(note, callback) {
    db.insert(note, function (err, note) {
        if (callback) {
            callback(err, note);
        }
    });
}

function updateNote(id, note, callback) {
    db.update({_id: id}, note, {}, function (err, note) {
        if (callback) {
            callback(err, note);
        }
    });
}

function deleteNote(id, callback) {
    db.remove({_id: id}, function (err, note) {
        if (callback) {
            callback(err, note);
        }
    });
}

function getNote(id, callback) {
    db.findOne({_id: id}, function (err, note) {
        callback(err, note);
    });
}

function findAllNotes(callback) {
    db.find({}, function (err, notes) {
        callback(err, notes);
    });
}

module.exports = {add: addNote, update: updateNote, delete: deleteNote, get: getNote, all: findAllNotes};