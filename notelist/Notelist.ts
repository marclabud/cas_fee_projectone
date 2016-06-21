/* ENUM SortCriteria noteList */
import compile = Handlebars.compile;
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
/* Showdate zeigt ein Datum der Note mit einem Präfix an
 *  Mit dem Präfix (optional) kann eine Beschreibung des Datums mitgegeben werden*/

Handlebars.registerHelper('showdate', function (date:string,prefixText:string) {
    const DATEFORMAT:string = "LL";
    let outDate:string = "";
    if (!(typeof(prefixText) === "string")) {
        prefixText = "";
    }
    if (moment(date).isValid()) {
        outDate = prefixText + " " + moment(date).format(DATEFORMAT);
    }
    else {
        outDate = "";
        console.log("Invalid Date: " + moment(date));
    }

    return new Handlebars.SafeString(outDate);
});

Handlebars.registerHelper('SetFinishedCheckBox', function (finishedDate:string) {
    let CheckboxHTML:string = "";
    let CheckboxLabelHTML:string = '<label for="cb_note-finished"></label>';

    if (moment(finishedDate).isValid()) {     // set Checkbox checked if valid finishedDate
        CheckboxHTML=CheckboxLabelHTML;
        CheckboxHTML+= '<input type="checkbox" id="cb_note-finished" checked class="note-finished">';
    }
    else { // set Checkbox unchecked
        CheckboxHTML = CheckboxLabelHTML;
        CheckboxHTML+= '<input type="checkbox" id="cb_note-finished" class="note-unfinished">'
    }                                  // set Checkbox unchecked
    return new Handlebars.SafeString(CheckboxHTML);
});

/* Notelistview Classes */
class Notelistview {
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
    }

    private compile():void {
        this.noteListTemplateHTML = Handlebars.compile(document.getElementById("notes-template").innerText);
    }

}
class NotelistController extends NoteController{
    notelist:INote[];
    notelistview:Notelistview;

    /* HTMLSelectElement greift auf das Interface von HTMLElement zurück */
    /* Aktives Filter- und Sortierkriterium über Listboxen
     Default ist das Item, das ausgewählt wurde */
    constructor(private noteservice:NoteService, private noteStorageService:INoteStorageService) {
        super(HREF_PREFIX_STYLE);
        this.notelist = this.noteStorageService.noteList;
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
            let  id = target.parent().attr("id");
            let finishedDate = target.is(':checked') ? new Date().toJSON() : " ";
            let note:INote = new Note();
            note.id = Number(id);
            this.noteStorageService.updateNote(note, finishedDate);
        })
    }

    private registerBtnEdit():void {
        $(":button").on('click', function () {
            let id = $(this).parent().attr("id");
            NotelistController.changLocation(Number(id));
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
            NotelistController.changLocation(nextID);
        }
        else {
            console.log("Error:CreateNewNote: Wrong ID", nextID);
        }
    }

    private static changLocation(id:number):void {
        window.location.replace("notedetail\\notedetail.html?id=" + id);
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
        console.log("change LBFilter");
    }

    /*    ToDo: Auf den ChangeEvent der beiden Listboxen, das Sortierkriterium und das Filterkriterium neu setzen
     und dann das notelistarray neu sortieren. Arrow-Funktion verwenden*/
}

/* App.Ctrl */
$(document).ready(function () {
    var noteservice = new NoteService();
    var noteStorageService = new NoteStorageService();
    var notelistctrl = new NotelistController(noteservice,noteStorageService);
    //  notelistctrl.noteStorageService.initNoteList();
});

