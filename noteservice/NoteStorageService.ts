'use strict';
import { INote, Note } from "../noteservice/Note.ts";

export const NOTE_LIST = "noteList";
export const NOTE_STYLE = "noteStyle";
export const DATE_FORMAT = "DD/MM/YYYY";

export enum StorageTyp {
    LocalNoteStorageService,
    ServerNoteStorageService
}

export interface INoteStorageService {
    noteList:INote[];
    getNote(id:number):INote;
    saveOrUpdateNote(note:INote):boolean;
    saveNote(note:INote):boolean;
    updateNote(aNote:INote, finishedDate:string):boolean;
    getNextId():number;
    setNoteIdAndCreatedDate(note:INote):void;
}


export abstract class NoteStorageService {
    protected _noteList:INote[];

    constructor() {
        this._noteList = [];
    }

    abstract saveNote(note:INote):boolean;

    abstract updateNote(aNote:INote, finishedDate:string):boolean;

    getNote(id:number):INote {
        return this._noteList.filter((note:INote) => note.id === id)[0];
    }

    setNoteIdAndCreatedDate(note:INote):void {
        note.id = this.getNextId();
        note._id = note.id.toString();
        note.createdDate = new Date().toJSON();
    }

    saveOrUpdateNote(note:INote):boolean {
        // updateNote or saveNote
        let noteId:String = Utility.getURLParameter("id");
        note._id = note.id.toString();
        if (note.id && note.id > 0) {
            this.updateNote(note, null);
        } else {
            this.saveNote(note);
        }
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

export class DomToNoteMapper {

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

export class Utility {
    static getURLParameter(name:String):String {
        let match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
        return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
    }

    static log(message:string):void {
        $("#log").append("<h5>" + message + "</h5>").delay(7200);
    }
}