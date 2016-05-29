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
        finishedDate: "05/11/2016",
        createdDate: "05/01/2016",
        dueDate: "05/21/2016"
    },
    {
        "id": 12,
        title: "Zweite Notiz",
        description: "Zweite Beschreibung",
        importance: 2,
        finishedDate: "05/12/2016",
        createdDate: "05/02/2016",
        dueDate: "05/22/2016"
    },
    {
        "id": 13,
        title: "Dritte Notiz",
        description: "Dritte Beschreibung",
        importance: 4,
        finishedDate: "05/13/2016",
        createdDate: "05/03/2016",
        dueDate: "05/23/2016"
    },
    {
        "id": 14,
        title: "Vierte Notiz",
        description: "",
        importance: 3,
        finishedDate: "05/13/2016",
        createdDate: "05/03/2016",
        dueDate: "05/23/2016"
    },

    {
        "id": 15,
        title: "Fünfte Notiz",
        description: "Fünfte lange Beschreibung",
        importance: 5,
        finishedDate: "",
        createdDate: "05/04/2016",
        dueDate: "05/24/2016"
    },
];  