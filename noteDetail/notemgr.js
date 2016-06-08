'use strict';

var noteClient;

$(function () {
    noteClient = JSON.parse(localStorage.getItem("noteClient")); //Converts string to object
    if (noteClient == null) { //If there is no data, initialize an empty array
        noteClient = [];
    }
});

function edit(id) {
    $.get("noteDetail\\noteDetail.html", function () {
        var url = "noteDetail\\noteDetail.html?id=" + id;
        location.replace(url);
    });
}

function readNote(id) {
    var notelist = noteClient.filter(function (note) {
         return note.id == id;
    });
    return notelist[0];
}

function saveOrUpdateNote() {
    // get current Id
    var currentId = Number($("#note-id").val());

    // updateNote or saveNote
    if (currentId && currentId > 0) {
        updateNote(currentId, null);
    } else {
        saveNote();
    }
}

function saveNote() {
    var createdDate = new Date().toJSON();
    var client = createNote(getNextId(), createdDate);
     noteClient.push(client);
    localStorage.setItem("noteClient", JSON.stringify(noteClient));
    alert("Die neue Notiz wurde gespeichert.");
    return true;
}

function updateNote(id, finishedDate) {
    var updatedNote = null;
    if (finishedDate) {
        // updateNote called by main page
        // readNote Note from local storage and updateNote only finishedDate
        var note = readNote(id);
        if (note == undefined) {
            alert("Note "+id+" does not yet exist! Please create it first");
            return;
        }
        note.finishedDate = finishedDate;
        updatedNote = note;
    } else {
        // updateNote called by note detail page
        // readNote note from Form and updateNote whole content except createdDate and finishedDate
        updatedNote = createNote(id, null);
    }
     var index = id - 1;
    noteClient[index] = updatedNote;//Alter the selected item on the table
    localStorage.setItem("noteClient", JSON.stringify(noteClient));
    alert("Die bestehende Notiz wurde geändert.");
    return true;
}

function createNote(id, creationDate) {
    var dueDate = $("#note-dueDate").val();
    var isoDueDate = moment(dueDate, "MM/DD/YYYY").tz("Europe/Berlin").format(); // ISO8601

    return {
        id: id,
        title: $("#note-title").val(),
        description: $("#note-description").val(),
        importance: $("#note-form input[type='radio']:checked").val(),
        createdDate: creationDate ? creationDate : $("#note-createdDate").val(),
        dueDate: isoDueDate,
        finishedDate: $("#note-finishedDate").val()
    };
}

function getNextId() {
    var max = 0;
    $.map(noteClient, function (note) {
        if (note.id > max) {
            max = note.id;
        }
    });
    return Number(++max);
}

function getURLParameter(name) {
    var match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
    return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
}

$(document).ready(function () {
        var noteId = getURLParameter("id");

        if (noteId != null) {
            var note = readNote(Number(noteId));
            if (note != null) {
                 var dueDate = moment(note.dueDate).format("MM/DD/YYYY");
                $("#note-id").val(note.id);
                $("#note-title").val(note.title);
                $("#note-description").val(note.description);
                $("#star" + note.importance).prop("checked", true);
                $("#note-createdDate").val(note.createdDate);
                $("#note-dueDate").val(dueDate);
                $("#note-finishedDate").val(note.finishedDate);
            }
        }
    }
);















