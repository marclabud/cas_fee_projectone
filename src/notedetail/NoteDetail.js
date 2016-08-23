System.register(["../App/App.ts", "../shared/StyleController.ts", "../noteservice/ServerNoteStorageService.ts", "../noteservice/LocalNoteStorageService.ts", "../noteservice/NoteStorageService.ts"], function(exports_1, context_1) {
    'use strict';
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var App_ts_1, StyleController_ts_1, ServerNoteStorageService_ts_1, LocalNoteStorageService_ts_1, NoteStorageService_ts_1;
    var NoteDetailView, NoteDetailController;
    return {
        setters:[
            function (App_ts_1_1) {
                App_ts_1 = App_ts_1_1;
            },
            function (StyleController_ts_1_1) {
                StyleController_ts_1 = StyleController_ts_1_1;
            },
            function (ServerNoteStorageService_ts_1_1) {
                ServerNoteStorageService_ts_1 = ServerNoteStorageService_ts_1_1;
            },
            function (LocalNoteStorageService_ts_1_1) {
                LocalNoteStorageService_ts_1 = LocalNoteStorageService_ts_1_1;
            },
            function (NoteStorageService_ts_1_1) {
                NoteStorageService_ts_1 = NoteStorageService_ts_1_1;
            }],
        execute: function() {
            NoteDetailView = (function () {
                function NoteDetailView(aNote) {
                    this.note = aNote;
                    this.render();
                }
                NoteDetailView.prototype.render = function () {
                    if (this.note !== undefined && this.note !== null) {
                        var dueDate = moment(this.note.dueDate).format(NoteStorageService_ts_1.DATE_FORMAT);
                        $("#note-id").val(this.note.id);
                        $("#note-title").val(this.note.title);
                        $("#note-description").val(this.note.description);
                        $("#star" + this.note.importance).prop("checked", true);
                        $("#note-createdDate").val(this.note.createdDate);
                        $("#note-dueDate").val(dueDate);
                        $("#note-finishedDate").val(this.note.finishedDate);
                    }
                };
                ;
                return NoteDetailView;
            }());
            exports_1("NoteDetailView", NoteDetailView);
            NoteDetailController = (function (_super) {
                __extends(NoteDetailController, _super);
                function NoteDetailController(aNoteStorageService) {
                    _super.call(this, StyleController_ts_1.HREF_PREFIX_DARKSYTLE);
                    this.noteStorageService = aNoteStorageService;
                    this.init();
                    this.noteDetailView = new NoteDetailView(this.note);
                    this.registerEvenListener();
                }
                NoteDetailController.prototype.init = function () {
                    var noteId = NoteStorageService_ts_1.Utility.getURLParameter("id");
                    if (noteId !== null) {
                        this.note = this.noteStorageService.getNote(Number(noteId));
                    }
                };
                NoteDetailController.prototype.registerEvenListener = function () {
                    var _this = this;
                    $("#btnNoteReset").on('click', function () { return location.replace("noteDetail.html"); });
                    $("#btnBack").on('click', function () { return location.replace("..\\index.html"); });
                    $("#btnNoteSave").on('click', function () {
                        if ($('form').is(':valid')) {
                            //  event.preventDefault(); // prevent reloading the page
                            var note = NoteStorageService_ts_1.DomToNoteMapper.map();
                            _this.noteStorageService.saveOrUpdateNote(note);
                        }
                    });
                };
                return NoteDetailController;
            }(StyleController_ts_1.StyleController));
            exports_1("NoteDetailController", NoteDetailController);
            /* Main */
            $(document).ready(function () {
                var app = new App_ts_1.App(NoteStorageService_ts_1.StorageTyp.ServerNoteStorageService);
                if (app.storagetyp === NoteStorageService_ts_1.StorageTyp.ServerNoteStorageService) {
                    var noteStorageService_1 = new ServerNoteStorageService_ts_1.ServerNoteStorageService();
                    noteStorageService_1.getNotesfromServer(function () {
                        new NoteDetailController(noteStorageService_1);
                    });
                }
                else {
                    if (app.isLocalStorageAvailable()) {
                        var noteStorageService = new LocalNoteStorageService_ts_1.LocalNoteStorageService();
                        new NoteDetailController(noteStorageService);
                    }
                    else {
                        console.log("No Local Storage");
                    }
                }
            });
        }
    }
});
//# sourceMappingURL=NoteDetail.js.map