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
    let outDate = moment(date).format(DATEFORMAT);
/*    ToDo: Fehlerbehandlung bei ungültigem Datum */
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

/* App.Ctrl */
$(document).ready(function () {
    var noteslistview = new Notelistview(notesarray);
    noteslistview.show();
});

