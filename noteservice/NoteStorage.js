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
    function NoteStorageService(noteList) {
        this._noteList = noteList;
    }
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
        return this._noteList.filter(function (aNote) {
            return aNote.id === id;
        })[0];
    };
    NoteStorageService.prototype.editNote = function (id) {
        $.get("notedetail\\noteDetail.html", function () {
            var url = "notedetail\\noteDetail.html?id=" + id;
            location.replace(url);
        });
    };
    NoteStorageService.prototype.saveOrUpdateNote = function () {
        // get current Id
        var currentId = Number($("#note-id").val());
        // updateNote or saveNote
        if (currentId && currentId > 0) {
            return this.updateNote(currentId, null);
        }
        else {
            return this.saveNote();
        }
    };
    NoteStorageService.prototype.saveNote = function () {
        var createdDate = new Date().toJSON();
        var note = this.createNote(this.getNextId(), createdDate);
        this._noteList.push(note);
        localStorage.setItem(NOTE_LIST, JSON.stringify(this._noteList));
        alert("Die neue Notiz wurde gespeichert.");
        return true;
    };
    NoteStorageService.prototype.updateNote = function (id, finishedDate) {
        var updatedNote = null;
        if (finishedDate) {
            // updateNote called by main page
            // readNote Note from local storage and updateNote only finishedDate
            var note = this.readNote(id);
            if (note === undefined) {
                alert("Note " + id + " does not yet exist! Please create it first");
                return false;
            }
            note.finishedDate = finishedDate;
            updatedNote = note;
        }
        else {
            // updateNote called by note detail page
            // readNote note from Form and updateNote whole content except createdDate and finishedDate
            updatedNote = this.createNote(id, null);
        }
        var index = id - 1;
        this._noteList[index] = updatedNote; //Alter the selected item on the table
        localStorage.setItem(NOTE_LIST, JSON.stringify(this._noteList));
        alert("Die bestehende Notiz wurde geändert.");
        return true;
    };
    NoteStorageService.prototype.getNextId = function () {
        var max = 0;
        $.map(this._noteList, function (note) {
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