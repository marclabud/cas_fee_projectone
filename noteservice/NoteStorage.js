'use strict';
//import {Note} from "./Note"; // needs System.js
//require("./Note");
var NOTE_LIST = "noteList";
var DATE_FORMAT = "MM/DD/YYYY";
/**
 * The NoteStorageService class provides all needed services to
 * read, save and update a Note from resp. into local storage.
 */
var NoteStorageService = (function () {
    function NoteStorageService() {
        var self = this;
        this.initNoteList();
    }
    NoteStorageService.prototype.initNoteList = function () {
        this.noteList = JSON.parse(localStorage.getItem(NOTE_LIST)); //Converts string to object
        if (this.noteList === null) {
            this.noteList = [];
        }
        return this.noteList;
    };
    NoteStorageService.prototype.createNote = function (id, creationDate) {
        var dueDate = $("#note-dueDate").val();
        var isoDueDate = moment(dueDate, DATE_FORMAT).tz("Europe/Berlin").format(); // ISO8601
        /* instantiate a new Note */
        var note = new Note(id);
        note.title = $("#note-title").val();
        note.description = $("#note-description").val();
        note.importance = $("#note-form input[type='radio']:checked").val();
        note.createdDate = creationDate ? creationDate : $("#note-createdDate").val();
        note.dueDate = isoDueDate;
        note.finishedDate = $("#note-finishedDate").val();
        return note;
    };
    NoteStorageService.prototype.readNote = function (id) {
        return this.noteList.filter(function (note) { return note.id === id; })[0];
    };
    NoteStorageService.editNote = function (id) {
        $.get("notedetail\\notedetail.html", function () {
            location.replace("notedetail\\notedetail.html?id=" + id);
        });
    };
    NoteStorageService.prototype.saveOrUpdateNote = function () {
        // get current Id
        var currentId = Number($("#note-id").val());
        // updateNote or saveNote
        if (currentId && currentId > 0) {
            // TODO: this.updateNote works NOT for BtnNoteSave event  handler because this is bind to the event
            // TODO: so this has here to become self?! 
            return new NoteStorageService().updateNote(currentId, null);
        }
        else {
            return new NoteStorageService().saveNote();
        }
    };
    NoteStorageService.prototype.saveNote = function () {
        var createdDate = new Date().toJSON();
        var note = this.createNote(this.getNextId(), createdDate);
        this.noteList.push(note);
        localStorage.setItem(NOTE_LIST, JSON.stringify(this.noteList));
        alert("Die neue Notiz wurde gespeichert.");
        return true;
    };
    NoteStorageService.prototype.updateNote = function (id, finishedDate) {
        var updatedNote = null;
        if (finishedDate) {
            // updateNote called by main page
            // readNote Note from local storage and updateNote only finishedDate
            var note = this.readNote(id);
            note.finishedDate = finishedDate;
            updatedNote = note;
        }
        else {
            // updateNote called by INote detail page
            // readNote INote from Form and updateNote whole content except createdDate and finishedDate
            updatedNote = this.createNote(id, null);
        }
        var index = id - 1;
        this.noteList[index] = updatedNote; //Alter the selected item on the table
        localStorage.setItem(NOTE_LIST, JSON.stringify(this.noteList));
        alert("Die bestehende Notiz wurde geändert.");
        return true;
    };
    NoteStorageService.prototype.getNextId = function () {
        var max = 0;
        $.map(this.noteList, function (note) {
            if (note.id > max) {
                max = note.id;
            }
        });
        return Number(++max);
    };
    return NoteStorageService;
}());
var Utility = (function () {
    function Utility() {
    }
    Utility.getURLParameter = function (name) {
        var match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
        return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
    };
    return Utility;
}());
/* for server side usage
 module.exports = {
 NoteStorageService: NoteStorageService,
 Utility: Utility,
 NOTE_LIST: NOTE_LIST,
 DATE_FORMAT: DATE_FORMAT,
 };
 */
//# sourceMappingURL=NoteStorage.js.map