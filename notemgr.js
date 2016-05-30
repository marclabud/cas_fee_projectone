var noteClient;

$(function () {
    noteClient = JSON.parse(localStorage.getItem("noteClient")); //Converts string to object
    if (noteClient == null) //If there is no data, initialize an empty array
        noteClient = [];
});

function saveOrUpdate() {
    // get current Id
    var currentId = Number($("#note-id").val());

    // update or save
    if (currentId && currentId > 0) {
        update(currentId);
    } else {
        save();
    }
}

function save() {
    var client = getJSONStringify(getNextId());
    alert(client);
    noteClient.push(client);
    localStorage.setItem("noteClient", JSON.stringify(noteClient));
    alert("Die neue Notiz wurde gespeichert.");
    return true;
}

function update(id) {
    var index = id - 1;
    noteClient[index] = getJSONStringify(id);//Alter the selected item on the table
   // alert(noteClient[index]);
    localStorage.setItem("noteClient", JSON.stringify(noteClient));
    alert("Die bestehende Notiz wurde geändert.");
    return true;
}

function getJSONStringify(id) {
    return JSON.stringify({
        id: id,
        title: $("#note-title").val(),
        description: $("#note-description").val(),
        importance: $("#note-form input[type='radio']:checked").val(),
        finishedDate: $("#note-finishedDate").val(),
        createdDate: new Date().toLocaleDateString(),
        dueDate: '05/21/2016'
    });
}

function edit(id) {
    $.get("noteDetail.html", function () {
        var url = "noteDetail.html?id=" + id;
        location.replace(url);
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
            //alert("noteId: " + noteId);
            var client = noteClient.filter(function (element) {
                var cli = JSON.parse(element);
                return cli.id == noteId;
            });

            if (client != null && client.length > 0) {
                var note = JSON.parse(client);
                $("#note-id").val(note.id);
                $("#note-title").val(note.title);
                $("#note-description").val(note.description);
                $("#star" + note.importance).prop("checked", true);
                $("#note-finishedDate").val(note.finishedDate);
            }
        }
    }
);















