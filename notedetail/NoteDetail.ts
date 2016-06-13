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
            let aNote:note = noteStorageService.readNote(Number(noteId));
            if (aNote !== null) {
                let dueDate:string = moment(aNote.dueDate).format(DATE_FORMAT);
                   $("#note-id").val(aNote.id);
                $("#note-title").val(aNote.title);
                $("#note-description").val(aNote.description);
                $("#star" + aNote.importance).prop("checked", true);
                $("#note-createdDate").val(aNote.createdDate);
                $("#note-dueDate").val(dueDate);
                $("#note-finishedDate").val(aNote.finishedDate);
            }
        }
    }
);
