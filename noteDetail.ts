'use strict';

var noteClient:String[];

$(function () {
    var operation = "A"; //"A"=Adding; "E"=Editing
    var selected_index = -1; //Index of the selected list item
    noteClient = JSON.parse(localStorage.getItem("noteClient")); //Converts string to object
    if (noteClient == null) //If there is no data, initialize an empty array
        noteClient = [];
});


function add() {
    alert("add");
    var client:String = JSON.stringify({
        id: 11,
        title: $("#title").val(),
        description: $("#description").val(),
        importance: $("#note-form input[type='radio']:checked").val(),
        finishedDate: $("#finishedDate").val(),
        createdDate: '05/01/2016',
        dueDate: '05/21/2016'
    });
    alert(client);
    noteClient.push(client);
    localStorage.setItem("noteClient", JSON.stringify(noteClient));
    alert("Die Notiz wurde gespeichert.");
    return true;
}


function filterById(jsonObject, id) {
    return jsonObject.filter(function (jsonObject) {
        return (jsonObject['id'] === id);
    })[0];
}

function edit(id:number) {
    alert(noteClient);
    alert(filterById(noteClient, 1));

    /*
     var cli : any = JSON.parse(noteClient['1']);
     alert(cli);


     $("#id").val(cli.id);
     $("#title").val(cli.title);
     $("#description").val(cli.description);
     $("#importance").val(cli.importance);
     $("#finishedDate").val(cli.finishedDate);
     */
}













