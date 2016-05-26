"use strict";

$(document).ready(function () {
    var context = {
        notes : notesarray
    };
    var createNotesHTML: HandlebarsTemplateDelegate = Handlebars.compile(document.getElementById("notes-template").innerText);
    var notesHtml : string  = createNotesHTML(context);
    document.getElementById("notelist").innerHTML = notesHtml;
});

