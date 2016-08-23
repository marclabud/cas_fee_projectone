System.register(["../noteservice/Note.ts"], function(exports_1, context_1) {
    'use strict';
    var __moduleName = context_1 && context_1.id;
    var Note_ts_1;
    var NOTE_LIST, NOTE_STYLE, DATE_FORMAT, StorageTyp, NoteStorageService, DomToNoteMapper, Utility;
    return {
        setters:[
            function (Note_ts_1_1) {
                Note_ts_1 = Note_ts_1_1;
            }],
        execute: function() {
            exports_1("NOTE_LIST", NOTE_LIST = "noteList");
            exports_1("NOTE_STYLE", NOTE_STYLE = "noteStyle");
            exports_1("DATE_FORMAT", DATE_FORMAT = "DD/MM/YYYY");
            (function (StorageTyp) {
                StorageTyp[StorageTyp["LocalNoteStorageService"] = 0] = "LocalNoteStorageService";
                StorageTyp[StorageTyp["ServerNoteStorageService"] = 1] = "ServerNoteStorageService";
            })(StorageTyp || (StorageTyp = {}));
            exports_1("StorageTyp", StorageTyp);
            NoteStorageService = (function () {
                function NoteStorageService() {
                    this._noteList = [];
                }
                NoteStorageService.prototype.getNote = function (id) {
                    return this._noteList.filter(function (note) { return note.id === id; })[0];
                };
                NoteStorageService.prototype.setNoteIdAndCreatedDate = function (note) {
                    note.id = this.getNextId();
                    note._id = note.id.toString();
                    note.createdDate = new Date().toJSON();
                };
                NoteStorageService.prototype.saveOrUpdateNote = function (note) {
                    // updateNote or saveNote
                    var noteId = Utility.getURLParameter("id");
                    note._id = note.id.toString();
                    if (note.id && note.id > 0) {
                        this.updateNote(note, null);
                    }
                    else {
                        this.saveNote(note);
                    }
                    return true;
                };
                NoteStorageService.prototype.getNextId = function () {
                    var max = 0;
                    $.map(this._noteList, function (note) {
                        if (note.id > max) {
                            max = note.id;
                        }
                    });
                    return Number(++max);
                };
                Object.defineProperty(NoteStorageService.prototype, "noteList", {
                    get: function () {
                        return this._noteList;
                    },
                    set: function (notes) {
                        this._noteList = notes;
                    },
                    enumerable: true,
                    configurable: true
                });
                return NoteStorageService;
            }());
            exports_1("NoteStorageService", NoteStorageService);
            DomToNoteMapper = (function () {
                function DomToNoteMapper() {
                }
                DomToNoteMapper.map = function () {
                    var dueDate = $("#note-dueDate").val();
                    var isoDueDate = moment(dueDate, DATE_FORMAT).tz("Europe/Berlin").format(); // ISO8601
                    /* instantiate a new Note */
                    var note = new Note_ts_1.Note();
                    note.id = Number($("#note-id").val());
                    note.title = $("#note-title").val();
                    note.description = $("#note-description").val();
                    note.importance = $("#note-form input[type='radio']:checked").val();
                    note.createdDate = $("#note-createdDate").val();
                    note.dueDate = isoDueDate;
                    note.finishedDate = $("#note-finishedDate").val();
                    return note;
                };
                return DomToNoteMapper;
            }());
            exports_1("DomToNoteMapper", DomToNoteMapper);
            Utility = (function () {
                function Utility() {
                }
                Utility.getURLParameter = function (name) {
                    var match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
                    return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
                };
                Utility.log = function (message) {
                    $("#log").append("<h5>" + message + "</h5>").delay(7200);
                };
                return Utility;
            }());
            exports_1("Utility", Utility);
        }
    }
});
//# sourceMappingURL=NoteStorageService.js.map