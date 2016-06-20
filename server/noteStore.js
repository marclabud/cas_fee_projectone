var Datastore = require('nedb');
var db = new Datastore({filename: './server/note.db', autoload: true});

function addNote(note, callback) {

    //console.log("addNote: "+ JSON.stringify(note));
    db.insert(note, function (err, note) {
        if (callback) {
            callback(err, note);
        }
    });
}

function updateNote(id, notes, callback) {
    db.update({id: id}, notes, {}, function (err, note) {
 //       deleteNote(id,  callback);
        getNote(id, callback);
    });
}

function deleteNote(id, callback) {
    db.remove({id: id}, function (err, note) {
        if (callback) {
            callback(err, note);
        }
    });
}

function getNote(id, callback) {
    db.findOne({id: id}, function (err, note) {
        callback(err, note);
    });
}

function findAllNotes(callback) {
    db.find({}, function (err, notes) {
        callback(err, notes);
    });
}

module.exports = {add: addNote, update: updateNote, delete: deleteNote, get: getNote, all: findAllNotes};