'use strict';
//import {Note} from "./Note"; // needs System.js
//import {NOTE_LIST, DATE_FORMAT, NoteStorageService, Utility} from "./NoteDetail";
//require("./Note");
//require("./NoteDetail");
var noteList;
var noteStorageService;
$(function () {
    noteList = JSON.parse(localStorage.getItem(NOTE_LIST)); //Converts string to object
    if (noteList === null) {
        noteList = [];
    }
});
$(document).ready(function () {
    var noteId = Utility.getURLParameter("id");
    noteStorageService = new NoteStorageService(noteList);
    if (noteId !== null) {
        var note = noteStorageService.readNote(Number(noteId));
        if (note !== null) {
            var dueDate = moment(note.dueDate).format(DATE_FORMAT);
            $("#note-id").val(note.id);
            $("#note-title").val(note.title);
            $("#note-description").val(note.description);
            $("#star" + note.importance).prop("checked", true);
            $("#note-createdDate").val(note.createdDate);
            $("#note-dueDate").val(dueDate);
            $("#note-finishedDate").val(note.finishedDate);
        }
    }
});
//# sourceMappingURL=NoteDetailMain.js.map