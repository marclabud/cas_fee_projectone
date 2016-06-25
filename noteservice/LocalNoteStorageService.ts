'use strict';
//import {Note} from "./Note"; // needs System.js
//require("./Note");


/**
 * The ServerNoteStorageService class provides all needed services to
 * read, save and update a Note from resp. into local storage.
 */

class LocalNoteStorageService extends  NoteStorageService implements INoteStorageService {

    constructor() {
        super();
        this.initNoteList();
    }

    private initNoteList():INote[] {
        try {
            this._noteList = JSON.parse(localStorage.getItem(NOTE_LIST)); //Converts string to object
        } catch (err) {
            alert("initNoteListError" + (typeof err));
        }
        if (this._noteList === null) { //If there is no data, initialize an empty array
            this._noteList = [];
        }
        return this._noteList;
    }

    saveNote(note:INote):boolean {
        this.setNoteIdAndCreatedDate(note);
        this._noteList.push(note);
        localStorage.setItem(NOTE_LIST, JSON.stringify(this._noteList));
        alert("Die neue Notiz wurde gespeichert.");
        return true;
    }
    updateNote(aNote:INote, finishedDate:string):boolean {
        let updatedNote:INote = aNote;
        if (finishedDate) {
            // updateNote called by main page
            // getNote Note from local storage and update only finishedDate
            let note:INote = this.getNote(aNote.id);
            note.finishedDate = finishedDate;
            updatedNote = note;
        }
        let index:number = updatedNote.id - 1;
        this._noteList[index] = updatedNote;//Alter the selected item on the table
        localStorage.setItem(NOTE_LIST, JSON.stringify(this._noteList));
        alert("Die bestehende Notiz wurde geändert.");
        return true;
    }
}


/* for server side usage
 module.exports = {
 ServerNoteStorageService: ServerNoteStorageService,
 Utility: Utility,
 NOTE_LIST: NOTE_LIST,
 DATE_FORMAT: DATE_FORMAT,
 };
 */
