'use strict';
//import {Note} from "./Note"; // needs System.js
//import {NOTE_LIST, DATE_FORMAT, NoteStorageService, Utility} from "./NoteDetail";
//require("./Note");
//require("./NoteDetail");

let noteList:Note[];
let noteStorageService:NoteStorageService;

$(function () {
    noteList = JSON.parse(localStorage.getItem(NOTE_LIST)); //Converts string to object
    if (noteList === null) { //If there is no data, initialize an empty array
        noteList = [];
    }
});

$(document).ready(function () {
        let noteId:String = Utility.getURLParameter("id");
        noteStorageService = new NoteStorageService(noteList);

        if (noteId !== null) {
            let note:Note = noteStorageService.readNote(Number(noteId));
            if (note !== null) {
                let dueDate:string = moment(note.dueDate).format(DATE_FORMAT);
                $("#note-id").val(note.id);
                $("#note-title").val(note.title);
                $("#note-description").val(note.description);
                $("#star" + note.importance).prop("checked", true);
                $("#note-createdDate").val(note.createdDate);
                $("#note-dueDate").val(dueDate);
                $("#note-finishedDate").val(note.finishedDate);
            }
        }
    }
);
