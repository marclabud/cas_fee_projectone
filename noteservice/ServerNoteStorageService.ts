'use strict';
//import {Note} from "./Note"; // needs System.js
//require("./Note");

/**
 * The ServerNoteStorageService class provides all needed services to
 * read, save and update a Note from resp. into local storage.
 */

class ServerNoteStorageService extends NoteStorageService {
    private _baseUrl:string;
 
    constructor() {
        super();
        this._baseUrl ="http://127.0.0.1:3000/notes/" ;
    }

    getNotesfromServer(callback: () => void):any {
        var deferred = jQuery.ajax({
            // dataType: "json",
            method: "GET",
            url: this._baseUrl,
        });
        
        deferred.done((notes: any) =>{
            this.noteList = notes;
            callback();
        });

        deferred.fail(function (msg) {
            console.log(msg);
        });
        return deferred;
    }

    private initNoteList():INote[] {
        try {
            // this._noteList = JSON.parse(localStorage.getItem(NOTE_LIST)); //Converts string to object
        } catch (err) {
            alert("initNoteListError" + (typeof err));
            if (this._noteList === null) { //If there is no data, initialize an empty array
                this._noteList = [];
            }
        }
        return this._noteList;
    }

    saveNote(note:INote):boolean {
        note.id = this.getNextId();
        note.createdDate = new Date().toJSON();
        this._noteList.push(note);
        /* save new Note on Server */
        try {
            $.post({
                // dataType: "json",
                url: this._baseUrl,
                data: note
            }).done(function (msg) {
                console.log(msg);
            }).fail(function (msg) {
                console.log(msg);
            });
        } catch (err) {
            alert("jquery.post Error" + typeof(err))
        }
        /* optimistic approach as in localstorage*/
        alert("Die neue Notiz wurde gespeichert.\n");
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
        try {
            $.ajax({
                // dataType: "json",
                method: "PUT",
                url: this._baseUrl + updatedNote._id,
                data: updatedNote
            }).done(function (msg) {
                alert("Die bestehende Notiz wurde geändert.\n");
            }).fail(function (msg) {
                console.log(msg);
            });
        } catch (err) {
            alert("jquery.ajax Error" + typeof(err))
        }
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
