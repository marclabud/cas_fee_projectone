"use strict";

window.onload = function() {
    console.log ("Start Window onload");

    var notesarray = [
        {id:"11", title:"Erste Notiz", description: "Erste Beschreibung"},
        {id:"12", title:"Zweite Notiz", description: "Zweite Beschreibung"},
        {id:"13", title:"Dritte Notiz", description: "Dritte Beschreibung"},
        {id:"14", title:"Vierte Notiz", description: "Vierte Beschreibung"}
    ];
    var context = {
        notes : notesarray
    };
    var createNotesHTML: HandlebarsTemplateDelegate = Handlebars.compile(document.getElementById("notes-template").innerText);
    
    var notesHtml : string  = createNotesHTML(context);
    document.getElementById("notes-ulist").innerHTML = notesHtml;

    console.log ("End Window onload");
};

