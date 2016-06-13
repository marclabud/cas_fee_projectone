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

    private _noteList:note[];

    constructor(noteList:note[]) {
        this._noteList = noteList;
    }

    createNote(id:number, creationDate:string):Note {
        let dueDate:string = $("#note-dueDate").val();
        let isoDueDate:string = moment(dueDate, DATE_FORMAT).tz("Europe/Berlin").format(); // ISO8601

        /* instantiate a new Note */
        let note:Note = new Note(id);
        note.title = $("#note-title").val();
        note.description = $("#note-description").val();
        note.importance = $("#note-form input[type='radio']:checked").val();
        note.createdDate = creationDate ? creationDate : $("#note-createdDate").val();
        note.dueDate = isoDueDate;
        note.finishedDate = $("#note-finishedDate").val();

        return note;
    }

    readNote(id:number):note {
         return this._noteList.filter(function (aNote:note) {
            return aNote.id === id;
        })[0];
     }
    
    editNote(id:number) {
        $.get("notedetail\\noteDetail.html", function () {
            let url:string = "notedetail\\noteDetail.html?id=" + id;
            location.replace(url);
        });
    }

    saveOrUpdateNote():boolean {
        // get current Id
        let currentId:number = Number($("#note-id").val());

        // updateNote or saveNote
        if (currentId && currentId > 0) {
            return this.updateNote(currentId, null);
        } else {
            return this.saveNote();
        }
    }

    saveNote():boolean {
        let createdDate:string = new Date().toJSON();
        let note:Note = this.createNote(this.getNextId(), createdDate);
        this._noteList.push(note);
        localStorage.setItem(NOTE_LIST, JSON.stringify(this._noteList));
        alert("Die neue Notiz wurde gespeichert.");
        return true;
    }

    updateNote(id:number, finishedDate:string):boolean {
        let updatedNote:note = null;
        if (finishedDate) {
            // updateNote called by main page
            // readNote Note from local storage and updateNote only finishedDate
            let note:note = this.readNote(id);
            if (note === undefined) {
                alert("Note " + id + " does not yet exist! Please create it first");
                return false;
            }
            note.finishedDate = finishedDate;
            updatedNote = note;
        } else {
            // updateNote called by note detail page
            // readNote note from Form and updateNote whole content except createdDate and finishedDate
            updatedNote = this.createNote(id, null);
        }
        let index:number = id - 1;
        this._noteList[index] = updatedNote;//Alter the selected item on the table
        localStorage.setItem(NOTE_LIST, JSON.stringify(this._noteList));
        alert("Die bestehende Notiz wurde geändert.");
        return true;
    }

    getNextId():number {
        let max:number = 0;
        $.map(this._noteList, function (note:Note) {
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
