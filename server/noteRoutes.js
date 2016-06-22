var express = require('express');
var router = express.Router();
var notes = require('./../server/noteController.js');

// Returns a list of Notes
router.get("/notes", notes.showAllNotes);

// Adds a new Note
router.post("/notes", notes.createNote);

// Gets a Note by Id
router.get("/notes/:id/", notes.showNote);

// Updates a Note by Id
router.put("/notes/:id/", notes.updateNote);

// Deletes a Note by Id
//router.delete("/notes/:id/", notes.deleteNote;

module.exports = router;
