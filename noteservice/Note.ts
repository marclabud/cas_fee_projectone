/**
 * This is the Note DTO to hold all note specific data.
 */
'use strict';

interface INote {
    id:number;
    title:string;
    description:string;
    importance:number;
    finishedDate:string;
    createdDate:string;
    dueDate:string;
}

class Note implements INote{
    private _id:number;
    private _title:string;
    private _description:string;
    private _importance:number;
    private _createdDate:string;
    private _dueDate:string;
    private _finishedDate:string;
    
    toJSON() {
        return {
            id: this._id,
            title: this._title,
            description: this._description,
            importance: this._importance,
            createdDate: this._createdDate,
            dueDate: this._dueDate,
            finishedDate: this._finishedDate
        };
    }

    get id():number {
        return this._id;
    }

    set id(value:number) {
        this._id = value;
    }

    get title():string {
        return this._title;
    }

    set title(value:string) {
        this._title = value;
    }

    get description():string {
        return this._description;
    }

    set description(value:string) {
        this._description = value;
    }

    get importance():number {
        return this._importance;
    }

    set importance(value:number) {
        this._importance = value;
    }

    get finishedDate():string {
        return this._finishedDate;
    }

    set finishedDate(value:string) {
        this._finishedDate = value;
    }

    get createdDate():string {
        return this._createdDate;
    }

    set createdDate(value:string) {
        this._createdDate = value;
    }

    get dueDate():string {
        return this._dueDate;
    }

    set dueDate(value:string) {
        this._dueDate = value;
    }
}

/* for server side usage
 module.exports.Note = Note;
 */