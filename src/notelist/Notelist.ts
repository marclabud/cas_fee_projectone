'use strict';
import compile = Handlebars.compile;
import {App} from "../app/App.ts";
import {StyleController, HREF_PREFIX_CALLER_NOTELIST} from "../shared/StyleController.ts";
import {ServerNoteStorageService} from "../noteservice/ServerNoteStorageService.ts";
import {LocalNoteStorageService} from "../noteservice/LocalNoteStorageService.ts";
import {INote, Note} from "../noteservice/Note.ts";
import {NoteService} from "../noteservice/NoteService.ts";
import {INoteStorageService, StorageTyp} from "../noteservice/NoteStorageService.ts";

/* ENUM SortCriteria noteList */
export enum SortCriteria {
    id,
    dueDate,
    creationDate,
    importance,
}
/* ENUM FilterCriteria notelist */
export enum FilterCriteria {
    id,
    noteActive,
    noteHighImportance,
    noteMediumImportance,
    noteLowImportance
}

/* Notelistview Classes */
export class Notelistview {
    noteListTemplateHTML:HandlebarsTemplateDelegate;

    constructor() {
        this.compile();
    }

    render(notelist:INote[]):void {
        let context = {
            notes: notelist
        };
        let notesHtml:string = this.noteListTemplateHTML(context);
        document.getElementById("notelist").innerHTML = notesHtml;
        this.initaccordion();
    }

    private compile():void {
        this.noteListTemplateHTML = Handlebars.compile(document.getElementById("notes-template").innerText);

    }
    private initaccordion():void {
        let $firstRow = $(".accFirstRow");
        let $content= $(".accContent");
        /* Show only first row */
        $content.hide();
        $firstRow.click( function() {
            $content.not(":hidden").slideUp('slow');
            $(this).next()
                .not(":visible")
                .slideDown('slow')
                .prev();
        });
    }

}
export class NotelistController extends StyleController {
    notelist:INote[];
    notelistview:Notelistview;

    /* HTMLSelectElement greift auf das Interface von HTMLElement zurück */
    /* Aktives Filter- und Sortierkriterium über Listboxen
     Default ist das Item, das ausgewählt wurde */
    constructor(private noteservice:NoteService, private noteStorageService:INoteStorageService) {
        super(HREF_PREFIX_CALLER_NOTELIST);
        this.notelist = this.noteStorageService.noteList;
        /* Erstellt Datum ist Default-Sortierung */
        this.noteservice.sortBy(this.notelist, SortCriteria.creationDate);
        this.notelistview = new Notelistview();
        this.notelistview.render(this.notelist);
        this.registerBtnEdit();
        this.registerCBFinished();
        this.registerBtnNoteNew();
        this.registerListboxSorter();
        this.registerListboxFilter();
    };

    private registerCBFinished():void {
        $(":checkbox").change((ev) => {
            let target = $(ev.target);
            let id = target.parent().attr("id");
            let finishedDate = target.is(':checked') ? new Date().toJSON() : " ";
            let note:INote = new Note();
            note.id = Number(id);
            this.noteStorageService.updateNote(note, finishedDate);
        })
    }

    private registerBtnEdit():void {
        $(":button").on('click', function () {
            let id = $(this).parent().attr("id");
            NotelistController.changeLocation(Number(id));
        });
    }

    private registerBtnNoteNew():void {
        let el:HTMLElement = document.getElementById("btnNoteNew");
        el.addEventListener('click', this.createNewNote.bind(this));
    }

    private registerListboxSorter():void {
        let el:HTMLElement = document.getElementById("ddlb_sorterselect");
        el.addEventListener('change', this.sort.bind(this));
    }

    private registerListboxFilter():void {
        let el:HTMLElement = document.getElementById("ddlb_filterselect");
        el.addEventListener('change', this.filter.bind(this));

    }

    private createNewNote(event:Event):void {
        let nextID:number = 1;
        console.log("NewNote", Event);

        nextID = this.noteStorageService.getNextId();
        if (typeof nextID === "number") {
            /* notedetail Editor mit neuer ID aufrufen */
            NotelistController.changeLocation(nextID);
        }
        else {
            console.log("Error:CreateNewNote: Wrong ID", nextID);
        }
    }

    private static changeLocation(id:number):void {
        window.location.replace("html\\notedetail.html?id=" + id);
    }

    private sort(event:Event):void {
        /* found no type for event.target therefore any as type */
        let target:any = event.target;
        let SelectedSortOption:string = target.value;
        switch (SelectedSortOption) {
            case "id":
                this.noteservice.sortBy(this.notelist, SortCriteria.id);
                break;
            case "due-date":
                this.noteservice.sortBy(this.notelist, SortCriteria.dueDate);
                break;
            case "creation-date":
                this.noteservice.sortBy(this.notelist, SortCriteria.creationDate);
                break;
            case "importance":
                this.noteservice.sortBy(this.notelist, SortCriteria.importance);
                break;
            default:
                console.log("Switch SelectedSortOption: default");
                break;
        }
        this.notelistview.render(this.notelist);
        this.registerBtnEdit();
        console.log("change LBSort");
    }

    private filter(event:Event):void {
        let target:any = event.target;
        let SelectedSortOption:string = target.value;
        /* notelist mit allen Elementen initialisieren   */
        this.notelist = this.noteStorageService.noteList;
        switch (SelectedSortOption) {
            case "id":
                /* Kein Filter */
                break;
            case "note-active":
                this.notelist = this.noteservice.filterBy(this.notelist, FilterCriteria.noteActive);
                break;
            case "note-highimportance":
                this.notelist = this.noteservice.filterBy(this.notelist, FilterCriteria.noteHighImportance);
                break;
            case "note-mediumimportance":
                this.notelist = this.noteservice.filterBy(this.notelist, FilterCriteria.noteMediumImportance);
                break;
            case "note-lowimportance":
                this.notelist = this.noteservice.filterBy(this.notelist, FilterCriteria.noteLowImportance);
                break;
            default:
                console.log("Switch SelectedSortOption: default");
                break;
        }
        this.notelistview.render(this.notelist);
        this.registerBtnEdit();
        console.log("change LBFilter");
    }

    /*    ToDo: Auf den ChangeEvent der beiden Listboxen, das Sortierkriterium und das Filterkriterium neu setzen
     und dann das notelistarray neu sortieren. Arrow-Funktion verwenden*/
}

/* App.Ctrl */
$(document).ready(function () {
    let app = new App(StorageTyp.ServerNoteStorageService);
    // Storage Selection
    if (app.storagetyp === StorageTyp.ServerNoteStorageService) {
        let noteStorageService = new ServerNoteStorageService();
        noteStorageService.getNotesfromServer(function () {
            new NotelistController(new NoteService(), noteStorageService);
        });
    }
    else { //localStorage synchron
        if (app.isLocalStorageAvailable()) {
            let noteStorageService = new LocalNoteStorageService();
            new NotelistController(new NoteService(), noteStorageService);
        }
        else {
            console.log ("No Local Storage")
        }

    }

});
