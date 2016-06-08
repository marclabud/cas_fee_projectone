'use strict';

const NOTE_LIST = "noteList";
const DATE_FORMAT = "MM/DD/YYYY";

var noteList;

function editNote(id) {
    $.get("noteDetail\\noteDetail.html", function () {
        var url = "noteDetail\\noteDetail.html?id=" + id;
        location.replace(url);
    });
}

function readNote(id) {
    var notelist = noteList.filter(function (note) {
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
    var note = createNote(getNextId(), createdDate);
    noteList.push(note);
    localStorage.setItem(NOTE_LIST, JSON.stringify(noteList));
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
            alert("Note " + id + " does not yet exist! Please create it first");
            return false;
        }
        note.finishedDate = finishedDate;
        updatedNote = note;
    } else {
        // updateNote called by note detail page
        // readNote note from Form and updateNote whole content except createdDate and finishedDate
        updatedNote = createNote(id, null);
    }
    var index = id - 1;
    noteList[index] = updatedNote;//Alter the selected item on the table
    localStorage.setItem(NOTE_LIST, JSON.stringify(noteList));
    alert("Die bestehende Notiz wurde geändert.");
    return true;
}

function createNote(id, creationDate) {
    var dueDate = $("#note-dueDate").val();
    var isoDueDate = moment(dueDate, DATE_FORMAT).tz("Europe/Berlin").format(); // ISO8601

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
    $.map(noteList, function (note) {
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


$(function () {
    noteList = JSON.parse(localStorage.getItem(NOTE_LIST)); //Converts string to object
    if (noteList == null) { //If there is no data, initialize an empty array
        noteList = [];
    }
});

$(document).ready(function () {
        var noteId = getURLParameter("id");

        if (noteId != null) {
            var note = readNote(Number(noteId));
            if (note != null) {

                var dueDate = moment(note.dueDate).format(DATE_FORMAT);
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















