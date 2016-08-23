System.register(["../noteservice/NoteStorageService.ts"], function(exports_1, context_1) {
    'use strict';
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var NoteStorageService_ts_1;
    var ServerNoteStorageService;
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
            ServerNoteStorageService = (function (_super) {
                __extends(ServerNoteStorageService, _super);
                function ServerNoteStorageService() {
                    _super.call(this);
                    this._baseUrl = "http://127.0.0.1:3000/notes/";
                }
                ServerNoteStorageService.prototype.getNotesfromServer = function (callback) {
                    var _this = this;
                    var deferred = jQuery.ajax({
                        // dataType: "json",
                        method: "GET",
                        url: this._baseUrl,
                    });
                    deferred.done(function (notes) {
                        _this.noteList = notes;
                        callback();
                    });
                    deferred.fail(function (msg) {
                        console.log(msg);
                    });
                    return deferred;
                };
                ServerNoteStorageService.prototype.initNoteList = function () {
                    try {
                    }
                    catch (err) {
                        alert("initNoteListError" + (typeof err));
                        if (this._noteList === null) {
                            this._noteList = [];
                        }
                    }
                    return this._noteList;
                };
                ServerNoteStorageService.prototype.saveNote = function (note) {
                    this.setNoteIdAndCreatedDate(note);
                    this._noteList.push(note);
                    /* save new Note on Server */
                    try {
                        $.post({
                            // dataType: "json",
                            url: this._baseUrl,
                            data: note
                        }).done(function (msg) {
                            console.log(msg);
                        }).fail(function (msg) {
                            console.log(msg);
                        });
                    }
                    catch (err) {
                        console.log("jquery.post Error" + typeof (err));
                    }
                    /* optimistic approach as in localstorage*/
                    NoteStorageService_ts_1.Utility.log("Die neue Notiz wurde gespeichert");
                    return true;
                };
                ServerNoteStorageService.prototype.updateNote = function (aNote, finishedDate) {
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
                    try {
                        $.ajax({
                            method: "PUT",
                            url: this._baseUrl + updatedNote._id,
                            data: updatedNote
                        }).done(function (msg) {
                            console.log(msg);
                        }).fail(function (msg) {
                            console.log(msg);
                        });
                    }
                    catch (err) {
                        console.log("jquery.ajax Error" + typeof (err));
                    }
                    NoteStorageService_ts_1.Utility.log("Die bestehende Notiz wurde geändert");
                    return true;
                };
                return ServerNoteStorageService;
            }(NoteStorageService_ts_1.NoteStorageService));
            exports_1("ServerNoteStorageService", ServerNoteStorageService);
        }
    }
});
//# sourceMappingURL=ServerNoteStorageService.js.map