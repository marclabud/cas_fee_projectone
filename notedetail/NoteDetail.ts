'use strict';
//import {Note} from "./Note"; // needs System.js
//import {NOTE_LIST, DATE_FORMAT, NoteStorageService, Utility} from "./NoteDetail";
//require("./Note");
//require("./NoteDetail");

class NoteDetailView {

    private note:INote;

    constructor(aNote:INote) {
        this.note = aNote;
        this.render();
    }

    render() {
        if (this.note !== undefined && this.note !== null) {
            var dueDate = moment(this.note.dueDate).format(DATE_FORMAT);
            $("#note-id").val(this.note.id);
            $("#note-title").val(this.note.title);
            $("#note-description").val(this.note.description);
            $("#star" + this.note.importance).prop("checked", true);
            $("#note-createdDate").val(this.note.createdDate);
            $("#note-dueDate").val(dueDate);
            $("#note-finishedDate").val(this.note.finishedDate);
        }
    };
}

class NoteDetailControl {

    private noteStorageService:NoteStorageService;
    private noteDetailView:NoteDetailView;
    private note:INote;

    constructor() {
        this.init();
        this.noteDetailView = new NoteDetailView(this.note);
        this.registerEvenListener();
    }

    init():void {
        this.noteStorageService = new NoteStorageService();
        let noteId:String = Utility.getURLParameter("id");
        if (noteId !== null) {
            this.note = this.noteStorageService.readNote(Number(noteId));
        }
    }


    registerEvenListener():void {
        $("#btnNoteSave").on('click', function (e) {
            if ($('form').is(':valid')) {
                new NoteStorageService().saveOrUpdateNote();
            }
        });
        $("#btnNoteReset").on('click', () => location.replace("noteDetail.html"));
        $("#btnBack").on('click', () => location.replace("..\\index.html"));
    }
}


$(document).ready(function () {

    new NoteDetailControl();
});
