'use strict';
import { INote, Note } from "./Note.ts";
import {INoteStorageService, NoteStorageService, Utility} from "./NoteStorageService.ts";

/**
 * The ServerNoteStorageService class provides all needed services to
 * read, save and update a Note from resp. into local storage.
 */
export class ServerNoteStorageService extends NoteStorageService implements INoteStorageService {
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
        this.setNoteIdAndCreatedDate(note);
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
            console.log("jquery.post Error" + typeof(err))
        }
        /* optimistic approach as in localstorage*/
        Utility.log("Die neue Notiz wurde gespeichert");
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
                method: "PUT",
                url: this._baseUrl + updatedNote._id,
                data: updatedNote
            }).done(function (msg) {               // dataType: "json",

                console.log(msg);
            }).fail(function (msg) {
                console.log(msg);
            });
        } catch (err) {
            console.log("jquery.ajax Error" + typeof(err))
        }
        Utility.log("Die bestehende Notiz wurde geändert");
        return true;
    }
    
}

