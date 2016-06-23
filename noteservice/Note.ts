/**
 * This is the Note DTO to hold all note specific data.
 *  Note:
 *      - _id is the neDB internal id and must be of type string
 *      - id is the application real id and is kept to ensure backwards compatibility with LocalNoteStorageServer
 */
'use strict';

interface INote {
    _id:string;
    id:number;   
    title:string;
    description:string;
    importance:number;
    finishedDate:string;
    createdDate:string;
    dueDate:string;
}

class Note implements INote{
    _id:string;
    id:number;
    title:string;
    description:string;
    importance:number;
    createdDate:string;
    dueDate:string;
    finishedDate:string;
}

/* for server side usage
 module.exports.Note = Note;
 */