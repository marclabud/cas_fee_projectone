var newNote = require("../noteservice/Note.js");

var store = require("./../server2/noteStore.js");
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var app = express();
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

module.exports.createNote = function (req, res) {

    console.log("req.body: " + JSON.stringify(req.body));
    console.log("id: " + req.body.id);
    console.log("title: " + req.body.title);

    newNote.id = req.body.id;
    newNote.title = req.body.title;
    newNote.description = req.body.description;
    newNote.importance = req.body.importance;
    newNote.finishedDate = req.body.finishedDate;
    newNote.createdDate = req.body.createdDate;
    newNote.dueDate = req.body.dueDate;


    // var newNote = JSON.stringify(req.body.data);
    store.add(newNote, function (err, note) {
        if (note === undefined) {
            res.statusCode = 404;
            return res.send('Note not found!');
        }
    });
    //res.end("");
    res.end(JSON.stringify(newNote));
};


module.exports.showNote = function (req, res) {

    store.get(req.params.id, function (err, note) {
        if (note === undefined) {
            res.statusCode = 404;
            return res.send('Note not found!');
        }
        //res.end(JSON.stringify(note));
        res.json(note);
    });

};

module.exports.showAllNotes = function (req, res) {
    store.all(function (err, notes) {
        if (notes === undefined) {
            res.statusCode = 404;
            return res.send('Notes not found!');
        }
        res.json(notes);
    });
};


module.exports.updateNote = function (req, res) {

    newNote.id = req.body.id;
    newNote.title = req.body.title;
    newNote.description = req.body.description;
    newNote.importance = req.body.importance;
    newNote.finishedDate = req.body.finishedDate;
    newNote.createdDate = req.body.createdDate;
    newNote.dueDate = req.body.dueDate;

    console.log("req.params.id: "+ req.params.id);
    store.update(req.params.id, newNote, function (err, note) {
        if (note === undefined) {
            res.statusCode = 404;
            return res.send('Note not found!');
        }
        //res.end(JSON.stringify(note));
        res.json(note);
    });
};
