'use strict';

var noteClient;

$(function () {
    noteClient = JSON.parse(localStorage.getItem("noteClient")); //Converts string to object
    if (noteClient == null) //If there is no data, initialize an empty array
        noteClient = [];
});

function edit(id) {
    $.get("noteDetail\\noteDetail.html", function () {
        var url = "noteDetail\\noteDetail.html?id=" + id;
        location.replace(url);
    });
}

function readNote(id) {
    return noteClient.filter(function (element) {
        var note = JSON.parse(element);
        return note.id == id;
    });
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
    var client = getJSONStringify(getNextId(), createdDate);
    // alert(client);
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
        var note = JSON.parse(readNote(id));
        note.finishedDate = finishedDate;
        updatedNote = JSON.stringify(note);
    } else {
        // updateNote called by note detail page
        // readNote note from Form and updateNote whole content except createdDate and finishedDate
        updatedNote = getJSONStringify(id, null);
    }
    // alert(noteClient[index]);
    var index = id - 1;
    noteClient[index] = updatedNote;//Alter the selected item on the table
    localStorage.setItem("noteClient", JSON.stringify(noteClient));
    alert("Die bestehende Notiz wurde geändert.");
    return true;
}

function getJSONStringify(id, creationDate) {
    var dueDate = $("#note-dueDate").val();
    var isoDueDate = moment(dueDate, "MM/DD/YYYY").tz("Europe/Berlin").format(); // ISO8601
    // alert("isoDueDate: "+isoDueDate);

    return JSON.stringify({
        id: id,
        title: $("#note-title").val(),
        description: $("#note-description").val(),
        importance: $("#note-form input[type='radio']:checked").val(),
        createdDate: creationDate ? creationDate : $("#note-createdDate").val(),
        dueDate: isoDueDate,
        finishedDate: $("#note-finishedDate").val()
    });
}

function getNextId() {
    var max = 0;
    jQuery.map(noteClient, function (obj) {
        var cli = JSON.parse(obj);
        if (cli.id > max) {
            max = cli.id;
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
            var client = readNote(noteId);
            // alert("client: " + client);

            if (client != null && client.length > 0) {
                var note = JSON.parse(client);
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















