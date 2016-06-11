/**
 * This is the Note DTO to hold all note specifc data.
 */
'use strict';
var Note = (function () {
    function Note(id) {
        this._id = id;
    }
    Note.prototype.toJSON = function () {
        return {
            id: this._id,
            title: this._title,
            description: this._description,
            importance: this._importance,
            createdDate: this._createdDate,
            dueDate: this._dueDate,
            finishedDate: this._finishedDate
        };
    };
    Object.defineProperty(Note.prototype, "id", {
        get: function () {
            return this._id;
        },
        set: function (value) {
            this._id = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Note.prototype, "title", {
        get: function () {
            return this._title;
        },
        set: function (value) {
            this._title = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Note.prototype, "description", {
        get: function () {
            return this._description;
        },
        set: function (value) {
            this._description = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Note.prototype, "importance", {
        get: function () {
            return this._importance;
        },
        set: function (value) {
            this._importance = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Note.prototype, "finishedDate", {
        get: function () {
            return this._finishedDate;
        },
        set: function (value) {
            this._finishedDate = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Note.prototype, "createdDate", {
        get: function () {
            return this._createdDate;
        },
        set: function (value) {
            this._createdDate = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Note.prototype, "dueDate", {
        get: function () {
            return this._dueDate;
        },
        set: function (value) {
            this._dueDate = value;
        },
        enumerable: true,
        configurable: true
    });
    return Note;
}());
/* for server side usage
 module.exports.Note = Note;
 */ 
//# sourceMappingURL=Note.js.map