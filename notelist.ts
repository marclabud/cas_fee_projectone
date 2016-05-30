"use strict";

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
    notelist:note[];

    constructor(notelist:note[]) {
        this.notelist = notelist
    }

    show():void {
        let context = {
            notes: this.notelist
        };
        let createNotesHTML:HandlebarsTemplateDelegate = Handlebars.compile(document.getElementById("notes-template").innerText);
        let notesHtml:string = createNotesHTML(context);
        document.getElementById("notelist").innerHTML = notesHtml;
    }
}

class NotelistController {
    notelist:note[];
    /* HTMLSelectElement greift auf das Interface von HTMLElement zurück */
    /* Aktives Filter- und Sortierkriterium über Listboxen
     Default ist das Item, das ausgewählt wurde */

    constructor(notelist:note[]) {
        this.notelist = notelist;
        this.registerListboxSorter();
        this.registerListboxFilter();
    };

    registerListboxSorter():void {
        let el:HTMLElement = document.getElementById("ddlb_sorterselect");
        el.addEventListener('change', this.sort);
    }

    registerListboxFilter():void {
        let el:HTMLElement = document.getElementById("ddlb_filterselect");
        el.addEventListener('change', this.filter);

    }

    sort():void {
        console.log("change LBSort");
    }

    filter():void {
        console.log("change LBFilter");
    }
    /*    ToDo: Auf den ChangeEvent der beiden Listboxen, das Sortierkriterium und das Filterkriterium neu setzen
     und dann das notelistarray neu sortieren. Arrow-Funktion verwenden*/
}


/* App.Ctrl */
$(document).ready(function () {
    var noteslistview = new Notelistview(notesarray);
    noteslistview.show();
    var notelistctrl = new NotelistController(notesarray);

});

