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
        outDate = "";
        console.log("Invalid Date: " + moment(date));
    }

    return new Handlebars.SafeString(outDate);
});

/* Notelistview Classes */
class Notelistview {

    render(notelist:INote[]):void {
        let context = {
            notes: notelist
        };
        let createNotesHTML:HandlebarsTemplateDelegate = Handlebars.compile(document.getElementById("notes-template").innerText);
        let notesHtml:string = createNotesHTML(context);
        document.getElementById("notelist").innerHTML = notesHtml;
    }
}
class NotelistController extends NoteController{
    notelist:INote[];
    notelistview:Notelistview;
    noteservice:NoteService;
    noteStorageService:NoteStorageService;

    /* HTMLSelectElement greift auf das Interface von HTMLElement zurück */
    /* Aktives Filter- und Sortierkriterium über Listboxen
     Default ist das Item, das ausgewählt wurde */
    /* ToDo: Services im constructor übergeben Hinweis Michael */
    constructor() {
        super(HREF_PREFIX_STYLE);
        this.noteservice = new NoteService();
        this.noteStorageService = new NoteStorageService();
        this.notelist = this.noteStorageService.initNoteList();
        this.notelistview = new Notelistview();
        this.notelistview.render(this.notelist);
        this.registerBtnEdit();
        this.registerBtnNoteNew();
        this.registerCBFinished();
        this.registerListboxSorter();
        this.registerListboxFilter();
    };

    registerCBFinished():void {
        $(":checkbox").change(function () {
            var id = $(this).parent().attr("id");
            var finishedDate = $(this).is(':checked') ? new Date().toJSON() : " ";
            /* ToDo: NoteStorage Integration */
            new NoteStorageService().updateNote(Number(id), finishedDate);
            console.log("Checkbox changed:", id);
        })
    }

    registerBtnEdit():void {
        $(":button").on('click', function () {
            let id = $(this).parent().attr("id");
            new NoteStorageService().editNote(Number(id));
        });
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

    createNewNote(event:Event):void {
        let NextID:number = 1;
        console.log("NewNote", Event);

        NextID = this.noteStorageService.getNextId();
        if (typeof NextID === "number") {
            /* notedetail Editor mit neuer ID aufrufen */
            this.noteStorageService.editNote(NextID);
        }
        else {
            console.log("Error:CreateNewNote: Wrong ID", NextID);
        }
    }

    sort(event:Event):void {
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
        console.log("change LBSort");
    }

    filter(event:Event):void {
        let target:any = event.target;
        let SelectedSortOption:string = target.value;
        /* Noteliste mit allen Elementen initialisieren   */
        this.notelist = this.noteservice.getNotesfromStorage();
        switch (SelectedSortOption) {
            case "id":
                /* Kein Filter */
                break;
            case "INote-active":
                this.notelist = this.noteservice.filterBy(this.notelist, FilterCriteria.noteActive);
                break;
            case "INote-highimportance":
                this.notelist = this.noteservice.filterBy(this.notelist, FilterCriteria.noteHighImportance);
                break;
            case "INote-mediumimportance":
                this.notelist = this.noteservice.filterBy(this.notelist, FilterCriteria.noteMediumImportance);
                break;
            case "INote-lowimportance":
                this.notelist = this.noteservice.filterBy(this.notelist, FilterCriteria.noteLowImportance);
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
    //  notelistctrl.noteStorageService.initNoteList();
});

