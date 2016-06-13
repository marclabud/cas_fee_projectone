/* ENUM SortCriteria noteList */
enum SortCriteria {
    id,
    dueDate,
    creationDate,
    importance,
}
/* ENUM FilterCriteria notelist */
enum FilterCriteria {
    id,
    noteActive,
    noteHighImportance,
    noteMediumImportance,
    noteLowImportance
}

/* Handlebars Helper */

/* Rate transformiert den Score (Ausprägung des Ratings) in HTML
 Der gültige Wertebereich beträgt 0 bis BESTRATING.
 Wird ein ungüliger Wert übergeben, wird die class error-sign generiert*/

Handlebars.registerHelper('rate', function (rating:number) {
    var RatingHTML:string = "";
    const BESTRATING:number = 5;
    if (rating >= 0 && rating <= BESTRATING) {
        for (let i = 1; i <= BESTRATING; i++) {
            if (rating >= i) {
                RatingHTML = RatingHTML + '<span class="scored-sign">&nbsp;</span>';
            } else {
                RatingHTML = RatingHTML + '<span class="unscored-sign">&nbsp;</span>';
            }
        }
    }
    else {
        const ERRORSIGNSPAN:string = '<span class="error-sign">&nbsp;</span>';
        for (let i = 1; i <= BESTRATING; i++) {
            RatingHTML = RatingHTML + ERRORSIGNSPAN;
        }
    }

    return new Handlebars.SafeString(RatingHTML);
});

Handlebars.registerHelper('showdate', function (date:string) {
    const DATEFORMAT:string = "LL";
    let outDate:string = "";
    if (moment(date).isValid()) {
        outDate = moment(date).format(DATEFORMAT);
    }
    else {
        outDate ="";
        console.log ("Invalid Date: "+moment(date));
    }

    return new Handlebars.SafeString(outDate);
});

/* Notelistview Classes */


class Notelistview {
    render(notelist:note[]):void {
        let context = {
            notes: notelist
        };
        let createNotesHTML:HandlebarsTemplateDelegate = Handlebars.compile(document.getElementById("notes-template").innerText);
        let notesHtml:string = createNotesHTML(context);
        document.getElementById("notelist").innerHTML = notesHtml;
    }
}
class NotelistController {
    notelist:note[];
    notelistview:Notelistview;
    noteservice:NoteService;
    noteStorageService:NoteStorageService;

    /* HTMLSelectElement greift auf das Interface von HTMLElement zurück */
    /* Aktives Filter- und Sortierkriterium über Listboxen
     Default ist das Item, das ausgewählt wurde */

    constructor() {
        this.noteservice = new NoteService();
        this.noteStorageService= new NoteStorageService(this.notelist);
        /* Test ToDo nach Test entfernen
        this.noteservice.WriteMockNotestoLocalStorage(); */
        this.notelist = this.noteservice.getNotesfromStorage();
        this.notelistview = new Notelistview;
        this.notelistview.render(this.notelist);
        this.registerBtnNoteNew();
        this.registerCBFinished();
        this.registerListboxSorter();
        this.registerListboxFilter();
        this.registerListboxStyleChanger();
        };

    registerCBFinished():void {
        $(":checkbox").change(function () {
            var id = $(this).parent().attr("id");
            var finishedDate = $(this).is(':checked') ? new Date().toJSON() : " ";
            /* ToDo: NoteStorage Integration */
             noteStorageService.updateNote(Number(id), finishedDate);
            console.log("Checkbox changed:", id);
        })
    }
    registerBtnNoteNew():void {
        let el:HTMLElement = document.getElementById("btnNoteNew");
        el.addEventListener('click', this.createNewNote.bind(this));
    }

    registerListboxSorter():void {
        let el:HTMLElement = document.getElementById("ddlb_sorterselect");
        el.addEventListener('change', this.sort.bind(this));
    }

    registerListboxFilter():void {
        let el:HTMLElement = document.getElementById("ddlb_filterselect");
        el.addEventListener('change', this.filter.bind(this));

    }
    registerListboxStyleChanger():void {
        let el:HTMLElement = document.getElementById("ddlb_stylesheetSelect");
        el.addEventListener('change', this.styleSheetSelect.bind(this));
    }

    createNewNote (event:Event): void {
        let NextID:number = 1;
        console.log("NewNote", Event);

        NextID = noteStorageService.getNextId();
        if (typeof NextID === "number") {
            /* noteDetail Editor mit neuer ID aufrufen */
            noteStorageService.editNote(NextID);
        }
        else {console.log ("Error:CreateNewNote: Wrong ID",NextID );
        }
    }

    styleSheetSelect (event:Event):void {
        const PATHSTYLE:string = "app/scss/style.css";
        const PATHDARKSTYLE:string = "app/scss/darkstyle.css";
        let target:any = event.target;
        let SelectedStyle:string = target.value;
        if (SelectedStyle === "StyleOne") {
            console.log("Selected Style", SelectedStyle);
            $("link").attr("href", PATHDARKSTYLE);
        }
        else {
            console.log("Selected Style", SelectedStyle);
            $("link").attr("href", PATHSTYLE);
        }
    }
    sort(event:Event):void {
        /* found no type for event.target therefore any as type */
        let target:any = event.target;
        let SelectedSortOption:string = target.value;
        switch (SelectedSortOption){
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
        console.log("change LBSort");
    }

    filter(event: Event):void {
        let target:any = event.target;
        let SelectedSortOption:string = target.value;
        /* Noteliste mit allen Elementen initialisieren   */
        this.notelist = this.noteservice.getNotesfromStorage();
        switch (SelectedSortOption){
            case "id":
                /* Kein Filter */
                break;
            case "note-active":
                this.notelist=this.noteservice.filterBy(this.notelist, FilterCriteria.noteActive);
                break;
            case "note-highimportance":
                this.notelist=this.noteservice.filterBy(this.notelist, FilterCriteria.noteHighImportance);
                break;
            case "note-mediumimportance":
                this.notelist=this.noteservice.filterBy(this.notelist, FilterCriteria.noteMediumImportance);
                break;
            case "note-lowimportance":
                this.notelist=this.noteservice.filterBy(this.notelist, FilterCriteria.noteLowImportance);
                break;
            default:
                console.log("Switch SelectedSortOption: default");
                break;
        }
        this.notelistview.render(this.notelist);
        console.log("change LBFilter");
    }
    /*    ToDo: Auf den ChangeEvent der beiden Listboxen, das Sortierkriterium und das Filterkriterium neu setzen
     und dann das notelistarray neu sortieren. Arrow-Funktion verwenden*/
}

/* App.Ctrl */
$(document).ready(function () {
    var notelistctrl = new NotelistController();
});

