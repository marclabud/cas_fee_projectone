"use strict";

window.onload = function() {
    var context = {
        notes : notesarray
    };
    var createNotesHTML: HandlebarsTemplateDelegate = Handlebars.compile(document.getElementById("notes-template").innerText);
    
    var notesHtml : string  = createNotesHTML(context);
    document.getElementById("notes-ulist").innerHTML = notesHtml;
};

