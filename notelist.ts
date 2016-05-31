"use strict";

/* ENUM SortCriteria notelist */
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

class NoteService {

    getNodesfromStorage():note[] {
        let notelist:note[];
        notelist = notesarray;
        return notelist
    }
    sortBy(noteList:note[], SelectedSortCriteria: SortCriteria):void {

        switch (SelectedSortCriteria) {
            case SortCriteria.id:
                noteList.sort(function (a:note, b:note):number {
                    if (a.id > b.id) {
                        return 1;
                    }
                    else if (a.id < b.id) {
                        return -1;
                    }
                    else return 0;
                });
                break;
            case SortCriteria.dueDate:
                noteList.sort(function (a:note, b:note):number {
                    if (a.dueDate > b.dueDate) {
                        return 1;
                    }
                    else if (a.dueDate < b.dueDate) {
                        return -1;
                    }
                    else return 0;
                });
                break;
            case SortCriteria.creationDate:
                noteList.sort(function (a:note, b:note):number {
                    if (a.dueDate > b.dueDate) {
                        return 1;
                    }
                    else if (a.dueDate < b.dueDate) {
                        return -1;
                    }
                    else return 0;
                });
                break;
            case SortCriteria.importance:
                noteList.sort(function (a:note, b:note):number {
                    if (a.importance > b.importance) {
                        return 1;
                    }
                    else if (a.importance < b.importance) {
                        return -1;
                    }
                    else return 0;
                });
                break;
            default:
                break;
        }
        return
    }
}

class Notelistview {
    show(notelist:note[]):void {
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

    /* HTMLSelectElement greift auf das Interface von HTMLElement zurück */
    /* Aktives Filter- und Sortierkriterium über Listboxen
     Default ist das Item, das ausgewählt wurde */

    constructor(notelist:note[]) {
        this.notelist = notelist;
        this.notelistview = new Notelistview;
        this.notelistview.show(this.notelist);
        this.noteservice = new NoteService;
        this.registerListboxSorter();
        this.registerListboxFilter();
    };

    registerListboxSorter():void {
        let el:HTMLElement = document.getElementById("ddlb_sorterselect");
        el.addEventListener('change', this.sort.bind(this));
    }

    registerListboxFilter():void {
        let el:HTMLElement = document.getElementById("ddlb_filterselect");
        el.addEventListener('change', this.filter.bind(this));

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
        this.notelistview.show(this.notelist);
        console.log("change LBSort");
    }

    filter(event: Event):void {
        console.log("change LBFilter");
    }
    /*    ToDo: Auf den ChangeEvent der beiden Listboxen, das Sortierkriterium und das Filterkriterium neu setzen
     und dann das notelistarray neu sortieren. Arrow-Funktion verwenden*/
}

/* App.Ctrl */
$(document).ready(function () {
    var notelistctrl = new NotelistController(notesarray);

});

