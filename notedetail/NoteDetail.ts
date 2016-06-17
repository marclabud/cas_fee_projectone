'use strict';
//import {Note} from "./Note"; // needs System.js
//import {NOTE_LIST, DATE_FORMAT, NoteStorageService, Utility} from "./NoteDetail";
//require("./Note");
//require("./NoteDetail");


const HREF_PREFIX:string = "../";

class NoteDetailView {

    private note:INote;
    private app:App;

    constructor(aApp:App, aNote:INote) {
        this.app = aApp;
        this.note = aNote;
        this.render();
    }

    render() {
        this.app.initStylesheet("../");

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
    private app:App;

    constructor() {
        this.app = new App();
        this.noteStorageService = new NoteStorageService();
        this.init();
        this.noteDetailView = new NoteDetailView(this.app, this.note);
        this.registerEvenListener();
    }

    init():void {
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
        this.registerListboxStyleChanger();
    }

    registerListboxStyleChanger():void {
        let el:HTMLElement = document.getElementById("stylesheetSelect");
        el.addEventListener('change', this.styleSheetEvent.bind(this));
    }

    styleSheetEvent(event:Event):void {
        let target:any = event.target;
        let SelectedStyle:string = target.value;
        if (SelectedStyle === "StyleOne") {
            this.app.changeStyleSheet(StyleSheetTheme.DarkTheme, HREF_PREFIX)
        }
        else {
            this.app.changeStyleSheet(StyleSheetTheme.StandardTheme, HREF_PREFIX)
        }
        console.log("Selected Style", SelectedStyle);
    }
}

/* Main */
$(document).ready(function () {

    new NoteDetailControl();
});
