"use strict";

var notes = [
    {"id":"11", "title":"Erste Notiz", "description": "Erste Beschreibung"},
    {"id":"12", "title":"Zweite Notiz", "description": "Zweite Beschreibung"}
];
var createNotesHTML = Handlebars.compile(document.getElementById("notes-template").innerText);
/*function renderNotes () {
    $.("#notes").html(createNotesHTML(notes));
}*/