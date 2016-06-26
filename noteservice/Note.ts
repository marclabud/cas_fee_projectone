'use strict';

/**
 * This is the Note DTO to hold all note specific data.
 *  Note:
 *      - _id is the neDB internal id and must be of type string
 *      - id is the application real id and is kept to ensure backwards compatibility with LocalNoteStorageServer
 */
export interface INote {
    _id:string;
    id:number;   
    title:string;
    description:string;
    importance:number;
    finishedDate:string;
    createdDate:string;
    dueDate:string;
}

export class Note implements INote{
    _id:string;
    id:number;
    title:string;
    description:string;
    importance:number;
    createdDate:string;
    dueDate:string;
    finishedDate:string;
}
