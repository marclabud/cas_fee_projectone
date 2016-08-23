'use strict';
import {INote} from "./Note.ts";

/**
 * Notes Mock Data
 * depends on Notes.ts (interface)
 */

let notesarray:INote[] = [
    {
        _id: "1",
        id: Number(this._id),
        title: "Erste Notiz",
        description: "Erste Beschreibung",
        importance: 1,
        finishedDate: "2016-05-18T17:15:00+00:00",
        createdDate: "2016-05-04T17:15:00+00:00",
        dueDate: "2016-05-20T17:15:00+00:00"
    },
    {
        _id: "2",
        id: Number(this._id),
        title: "Zweite Notiz",
        description: "Zweite Beschreibung",
        importance: 2,
        finishedDate: "2016-05-30T17:15:00+00:00",
        createdDate: "2016-05-02T17:15:00+00:00",
        dueDate: "2016-05-18T17:15:00+00:00"
    },
    {
        _id: "3",
        id: Number(this._id),
        title: "Dritte Notiz",
        description: "Dritte Beschreibung",
        importance: 4,
        finishedDate: "2016-05-29T17:15:00+00:00",
        createdDate: "2016-05-04T17:15:00+00:00",
        dueDate: "2016-05-30T17:15:00+00:00"
    },
    {
        _id: "4",
        id: Number(this._id),
        title: "Vierte Notiz",
        description: "",
        importance: 3,
        finishedDate: "2016-05-06T17:15:00+00:00",
        createdDate: "2016-05-02T17:15:00+00:00",
        dueDate: "2016-05-05T17:15:00+00:00"
    },

    {
        _id: "5",
        id: Number(this._id),
        title: "Fünfte Notiz",
        description: "Fünfte lange Beschreibung",
        importance: 5,
        finishedDate: "",
        createdDate: "2016-05-29T17:15:00+00:00",
        dueDate: "2016-06-15T17:15:00+00:00"
    },
];  