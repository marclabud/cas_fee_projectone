"use strict";

class Notelistview {
    notelist:note[];

    constructor(notelist:note[]) {
        this.notelist = notelist
    }

    show():void {
        var context = {
            notes: this.notelist
        };
        var createNotesHTML:HandlebarsTemplateDelegate = Handlebars.compile(document.getElementById("notes-template").innerText);
        var notesHtml:string = createNotesHTML(context);
        document.getElementById("notelist").innerHTML = notesHtml;
    }
}

$(document).ready(function () {
    var noteslistview = new Notelistview(notesarray);
    noteslistview.show();
});

