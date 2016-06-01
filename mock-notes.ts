/**
 * Notes Mock Data
 */

interface note {
    id:number;
    title:string;
    description:string;
    importance:number;
    finishedDate:String;
    createdDate:String;
    dueDate:String;
}

var notesarray:note[] = [
    {
        "id": 11,
        title: "Erste Notiz",
        description: "Erste Beschreibung",
        importance: 1,
        finishedDate: "2016-05-18T17:15:00+00:00",
        createdDate: "2016-05-04T17:15:00+00:00",
        dueDate: "2016-05-20T17:15:00+00:00"
    },
    {
        "id": 12,
        title: "Zweite Notiz",
        description: "Zweite Beschreibung",
        importance: 2,
        finishedDate: "2016-05-30T17:15:00+00:00",
        createdDate: "2016-05-02T17:15:00+00:00",
        dueDate: "2016-05-18T17:15:00+00:00"
    },
    {
        "id": 13,
        title: "Dritte Notiz",
        description: "Dritte Beschreibung",
        importance: 4,
        finishedDate: "2016-05-29T17:15:00+00:00",
        createdDate: "2016-05-04T17:15:00+00:00",
        dueDate: "2016-05-30T17:15:00+00:00"
    },
    {
        "id": 14,
        title: "Vierte Notiz",
        description: "",
        importance: 3,
        finishedDate: "2016-05-06T17:15:00+00:00",
        createdDate: "2016-05-02T17:15:00+00:00",
        dueDate: "2016-05-05T17:15:00+00:00"
    },

    {
        "id": 15,
        title: "Fünfte Notiz",
        description: "Fünfte lange Beschreibung",
        importance: 5,
        finishedDate: "",
        createdDate: "2016-05-29T17:15:00+00:00",
        dueDate: "2016-06-15T17:15:00+00:00"
    },
];  