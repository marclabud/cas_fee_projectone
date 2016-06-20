function testUpdateNote() {

    var newNote = Note;
    newNote.id = 1;
    newNote.title = "Updated Titel";
    newNote.description = "Updated Text";
    newNote.importance = 2;
    newNote.createdDate = "2016-06-19T17:03:19.338Z";
    newNote.dueDate = "2016-06-21T00:00:00+02:00";
    newNote.finishedDate = "";

    jQuery.ajax({
        // dataType: "json",
        method: "PUT",
        url: "http://127.0.0.1:3000/notes/" + newNote.id,
        data: newNote
    }).done(function (msg) {
        alert("Die  Notiz ID=1 wurde geändert.\n");
    }).fail(function (msg) {
        console.log(msg);
    });
}

function testAddNote() {

    var newNote = Note;
    newNote.id = 1;
    newNote.title = "Titel 1";
    newNote.description = "Text 1";
    newNote.importance = 2;
    newNote.createdDate = "2016-06-19T17:03:19.338Z";
    newNote.dueDate = "2016-06-21T00:00:00+02:00";
    newNote.finishedDate = "";

    jQuery.ajax({
        // dataType: "json",
        method: "POST",
        url: "http://127.0.0.1:3000/notes",
        data: newNote
    }).done(function (msg) {
        alert("Die neue Notiz wurde gespeichert.\n");
    }).fail(function (msg) {
        console.log(msg);
    });

}

function testShowAllNotes() {
    var note = Note;

    jQuery.ajax({
        // dataType: "json",
        method: "GET",
        url: "http://127.0.0.1:3000/notes"
    }).done(function (obj) {
        alert("Notiz gefunden\n" + JSON.stringify(obj));
    }).fail(function (msg) {
        console.log(msg);
    });
}

function testShowNote() {
    var note = Note;

    var id = 1;

    jQuery.ajax({
        // dataType: "json",
        method: "GET",
        url: "http://127.0.0.1:3000/notes/" + id
    }).done(function (obj) {
        alert("Notiz gefunden\n" + JSON.stringify(obj));
    }).fail(function (msg) {
        console.log(msg);
    });
}
