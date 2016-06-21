'use strict';
//import {Note} from "./Note"; // needs System.js
//require("./Note");

const NOTE_LIST = "noteList";
const NOTE_STYLE = "noteStyle";
const DATE_FORMAT = "DD/MM/YYYY";

/**
 * The ServerNoteStorageService class provides all needed services to
 * read, save and update a Note from resp. into local storage.
 */
interface INoteStorageService {
    getNote(id:number):INote,
    saveOrUpdateNote(note:INote):boolean,
    saveNote(note:INote):boolean,
    updateNote(aNote:INote, finishedDate:string):boolean,
    getNextId():number,
    noteList:INote[]
}

class ServerNoteStorageService implements INoteStorageService {
    private _baseUrl: string;
    private _noteList:INote[];

    constructor() {
        this._baseUrl ="http://127.0.0.1:3000/notes/" ;
    }

    getNotesfromServer(callback: () => void):any {
        var deferred = jQuery.ajax({
            // dataType: "json",
            method: "GET",
            url: this._baseUrl,
        });
        
        deferred.done((notes: any) =>{
            this._noteList = notes;
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

    getNote(id:number):INote {
        return this._noteList.filter((note:INote) => note.id === id)[0];
    }

    saveOrUpdateNote(note:INote):boolean {
        // updateNote or saveNote
        if (note.id && note.id > 0) {
            this.updateNote(note, null);
        } else {
            this.saveNote(note);
        }
        return true;
    }

    saveNote(note:INote):boolean {
        note.id = this.getNextId();
        note.createdDate = new Date().toJSON();
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

    getNextId():number {
        let max:number = 0;
        $.map(this._noteList, function (note:INote) {
            if (note.id > max) {
                max = note.id;
            }
        });
        return Number(++max);
    }

    get noteList():INote[] {
        return this._noteList;
    }

    set noteList(notes:INote[]) {
        this._noteList = notes;
    }
}

class DomToNoteMapper {

    static map():INote {
        let dueDate:string = $("#note-dueDate").val();
        let isoDueDate:string = moment(dueDate, DATE_FORMAT).tz("Europe/Berlin").format(); // ISO8601

        /* instantiate a new Note */
        let note:INote = new Note();
        note.id = Number($("#note-id").val());
        note.title = $("#note-title").val();
        note.description = $("#note-description").val();
        note.importance = $("#note-form input[type='radio']:checked").val();
        note.createdDate = $("#note-createdDate").val();
        note.dueDate = isoDueDate;
        note.finishedDate = $("#note-finishedDate").val();

        return note;
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
 ServerNoteStorageService: ServerNoteStorageService,
 Utility: Utility,
 NOTE_LIST: NOTE_LIST,
 DATE_FORMAT: DATE_FORMAT,
 };
 */
