'use strict';
//import {Note} from "./Note"; // needs System.js
//require("./Note");

const NOTE_LIST = "noteList";
const DATE_FORMAT = "MM/DD/YYYY";

/**
 * The NoteStorageService class provides all needed services to
 * read, save and update a Note from resp. into local storage.
 */
class NoteStorageService {

    private noteList:INote[];

    constructor() {
        var self = this;
        this.initNoteList();
    }

    initNoteList():INote[] {
        this.noteList = JSON.parse(localStorage.getItem(NOTE_LIST)); //Converts string to object
        if (this.noteList === null) { //If there is no data, initialize an empty array
            this.noteList = [];
        }
        return this.noteList;
    }

    createNote(id:number, creationDate:string):INote {
        let dueDate:string = $("#note-dueDate").val();
        let isoDueDate:string = moment(dueDate, DATE_FORMAT).tz("Europe/Berlin").format(); // ISO8601

        /* instantiate a new Note */
        let note:INote = new Note(id);
        note.title = $("#note-title").val();
        note.description = $("#note-description").val();
        note.importance = $("#note-form input[type='radio']:checked").val();
        note.createdDate = creationDate ? creationDate : $("#note-createdDate").val();
        note.dueDate = isoDueDate;
        note.finishedDate = $("#note-finishedDate").val();

        return note;
    }

    readNote(id:number):INote {
        return this.noteList.filter((note:INote) => note.id === id)[0];
    }

    editNote(id:number):void {
        $.get("notedetail\\notedetail.html", () => {
            location.replace("notedetail\\notedetail.html?id=" + id);
        });
    }

    saveOrUpdateNote():boolean {
        // get current Id
        let currentId:number = Number($("#note-id").val());

        // updateNote or saveNote
        if (currentId && currentId > 0) {
            this.updateNote(currentId, null);
        } else {
            this.saveNote();
        }
        return true;
    }

    saveNote():boolean {
        let createdDate:string = new Date().toJSON();
        let note:INote = this.createNote(this.getNextId(), createdDate);
        this.noteList.push(note);
        localStorage.setItem(NOTE_LIST, JSON.stringify(this.noteList));
        alert("Die neue Notiz wurde gespeichert.");
        return true;
    }

    updateNote(id:number, finishedDate:string):boolean {
        let updatedNote:INote = null;
        if (finishedDate) {
            // updateNote called by main page
            // readNote Note from local storage and updateNote only finishedDate
            let note:INote = this.readNote(id);
            note.finishedDate = finishedDate;
            updatedNote = note;
        } else {
            // updateNote called by INote detail page
            // readNote INote from Form and updateNote whole content except createdDate and finishedDate
            updatedNote = this.createNote(id, null);
        }
        let index:number = id - 1;
        this.noteList[index] = updatedNote;//Alter the selected item on the table
        localStorage.setItem(NOTE_LIST, JSON.stringify(this.noteList));
        alert("Die bestehende Notiz wurde geändert.");
        return true;
    }

    getNextId():number {
        let max:number = 0;
        $.map(this.noteList, function (note:INote) {
            if (note.id > max) {
                max = note.id;
            }
        });
        return Number(++max);
    }
}

class Utility {
    static getURLParameter(name:String):String {
        let match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
        return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
    }
}

/* for server side usage
 module.exports = {
 NoteStorageService: NoteStorageService,
 Utility: Utility,
 NOTE_LIST: NOTE_LIST,
 DATE_FORMAT: DATE_FORMAT,
 };
 */
