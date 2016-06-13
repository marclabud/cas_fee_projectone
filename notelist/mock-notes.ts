/**
 * Notes Mock Data
 */

interface note {
    id:number;
    title:string;
    description:string;
    importance:number;
    finishedDate:string;
    createdDate:string;
    dueDate:string;
}

var notesarray:note[] = [
    {
        "id": 1,
        title: "Erste Notiz",
        description: "Erste Beschreibung",
        importance: 1,
        finishedDate: "2016-05-18T17:15:00+00:00",
        createdDate: "2016-05-04T17:15:00+00:00",
        dueDate: "2016-05-20T17:15:00+00:00"
    },
    {
        "id": 2,
        title: "Zweite Notiz",
        description: "Zweite Beschreibung",
        importance: 2,
        finishedDate: "2016-05-30T17:15:00+00:00",
        createdDate: "2016-05-02T17:15:00+00:00",
        dueDate: "2016-05-18T17:15:00+00:00"
    },
    {
        "id": 3,
        title: "Dritte Notiz",
        description: "Dritte Beschreibung",
        importance: 4,
        finishedDate: "2016-05-29T17:15:00+00:00",
        createdDate: "2016-05-04T17:15:00+00:00",
        dueDate: "2016-05-30T17:15:00+00:00"
    },
    {
        "id": 4,
        title: "Vierte Notiz",
        description: "",
        importance: 3,
        finishedDate: "2016-05-06T17:15:00+00:00",
        createdDate: "2016-05-02T17:15:00+00:00",
        dueDate: "2016-05-05T17:15:00+00:00"
    },

    {
        "id": 5,
        title: "Fünfte Notiz",
        description: "Fünfte lange Beschreibung",
        importance: 5,
        finishedDate: "",
        createdDate: "2016-05-29T17:15:00+00:00",
        dueDate: "2016-06-15T17:15:00+00:00"
    },
];  