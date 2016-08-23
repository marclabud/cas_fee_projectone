System.register(["../noteservice/NoteStorageService.ts"], function(exports_1, context_1) {
    'use strict';
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var NoteStorageService_ts_1;
    var LocalNoteStorageService;
    return {
        setters:[
            function (NoteStorageService_ts_1_1) {
                NoteStorageService_ts_1 = NoteStorageService_ts_1_1;
            }],
        execute: function() {
            /**
             * The ServerNoteStorageService class provides all needed services to
             * read, save and update a Note from resp. into local storage.
             */
            LocalNoteStorageService = (function (_super) {
                __extends(LocalNoteStorageService, _super);
                function LocalNoteStorageService() {
                    _super.call(this);
                    this.initNoteList();
                }
                LocalNoteStorageService.prototype.initNoteList = function () {
                    try {
                        this._noteList = JSON.parse(localStorage.getItem(NoteStorageService_ts_1.NOTE_LIST)); //Converts string to object
                    }
                    catch (err) {
                        alert("initNoteListError" + (typeof err));
                    }
                    if (this._noteList === null) {
                        this._noteList = [];
                    }
                    return this._noteList;
                };
                LocalNoteStorageService.prototype.saveNote = function (note) {
                    this.setNoteIdAndCreatedDate(note);
                    this._noteList.push(note);
                    localStorage.setItem(NoteStorageService_ts_1.NOTE_LIST, JSON.stringify(this._noteList));
                    alert("Die neue Notiz wurde gespeichert.");
                    return true;
                };
                LocalNoteStorageService.prototype.updateNote = function (aNote, finishedDate) {
                    var updatedNote = aNote;
                    if (finishedDate) {
                        // updateNote called by main page
                        // getNote Note from local storage and update only finishedDate
                        var note = this.getNote(aNote.id);
                        note.finishedDate = finishedDate;
                        updatedNote = note;
                    }
                    var index = updatedNote.id - 1;
                    this._noteList[index] = updatedNote; //Alter the selected item on the table
                    localStorage.setItem(NoteStorageService_ts_1.NOTE_LIST, JSON.stringify(this._noteList));
                    alert("Die bestehende Notiz wurde geändert.");
                    return true;
                };
                return LocalNoteStorageService;
            }(NoteStorageService_ts_1.NoteStorageService));
            exports_1("LocalNoteStorageService", LocalNoteStorageService);
        }
    }
});
//# sourceMappingURL=LocalNoteStorageService.js.map