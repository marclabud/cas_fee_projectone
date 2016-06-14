'use strict';
//import {Note} from "./Note"; // needs System.js
//import {NOTE_LIST, DATE_FORMAT, NoteStorageService, Utility} from "./NoteDetail";
//require("./Note");
//require("./NoteDetail");

class NoteDetailView {

    private _note:INote;

    constructor(note:INote) {
        this._note = note;
        this.render();
    }

    render() {
        if (this._note !== undefined && this._note !== null) {
            var dueDate = moment(this._note.dueDate).format(DATE_FORMAT);
            $("#note-id").val(this._note.id);
            $("#note-title").val(this._note.title);
            $("#note-description").val(this._note.description);
            $("#star" + this._note.importance).prop("checked", true);
            $("#note-createdDate").val(this._note.createdDate);
            $("#note-dueDate").val(dueDate);
            $("#note-finishedDate").val(this._note.finishedDate);
        }
    };
}

class NoteDetailControl {

    private _noteStorageService:NoteStorageService;
    private noteDetailView:NoteDetailView;
    private note:INote;

    constructor() {
        this._noteStorageService = new NoteStorageService();
        this.init();
        this.noteDetailView = new NoteDetailView(this.note);
        this.registerBtnNoteSave();
        this.registerBtnNoteReset();
        this.registerBtnBack();
    }

    init():void {
        let noteId:String = Utility.getURLParameter("id");
        if (noteId !== null) {
            this.note = this._noteStorageService.readNote(Number(noteId));
        }
    }

    registerBtnNoteSave():void {
        $("#btnNoteSave").on('click', this._noteStorageService.saveOrUpdateNote);
    }

    registerBtnNoteReset():void {
        $("#btnNoteReset").on('click', () => location.replace("noteDetail.html"));
    }

    registerBtnBack():void {
        $("#btnBack").on('click', () => location.replace("..\\index.html"));
    }

    get noteStorageService():NoteStorageService {
        return this._noteStorageService;
    }
}
$(document).ready(function () {
    new NoteDetailControl();
});
