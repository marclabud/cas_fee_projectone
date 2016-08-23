System.register(["../App/App.ts", "../shared/StyleController.ts", "../noteservice/ServerNoteStorageService.ts", "../noteservice/LocalNoteStorageService.ts", "../noteservice/Note.ts", "../noteservice/NoteService.ts", "../noteservice/NoteStorageService.ts"], function(exports_1, context_1) {
    'use strict';
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var App_ts_1, StyleController_ts_1, ServerNoteStorageService_ts_1, LocalNoteStorageService_ts_1, Note_ts_1, NoteService_ts_1, NoteStorageService_ts_1;
    var compile, SortCriteria, FilterCriteria, Notelistview, NotelistController;
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
            function (Note_ts_1_1) {
                Note_ts_1 = Note_ts_1_1;
            },
            function (NoteService_ts_1_1) {
                NoteService_ts_1 = NoteService_ts_1_1;
            },
            function (NoteStorageService_ts_1_1) {
                NoteStorageService_ts_1 = NoteStorageService_ts_1_1;
            }],
        execute: function() {
            /* ENUM SortCriteria noteList */
            (function (SortCriteria) {
                SortCriteria[SortCriteria["id"] = 0] = "id";
                SortCriteria[SortCriteria["dueDate"] = 1] = "dueDate";
                SortCriteria[SortCriteria["creationDate"] = 2] = "creationDate";
                SortCriteria[SortCriteria["importance"] = 3] = "importance";
            })(SortCriteria || (SortCriteria = {}));
            exports_1("SortCriteria", SortCriteria);
            /* ENUM FilterCriteria notelist */
            (function (FilterCriteria) {
                FilterCriteria[FilterCriteria["id"] = 0] = "id";
                FilterCriteria[FilterCriteria["noteActive"] = 1] = "noteActive";
                FilterCriteria[FilterCriteria["noteHighImportance"] = 2] = "noteHighImportance";
                FilterCriteria[FilterCriteria["noteMediumImportance"] = 3] = "noteMediumImportance";
                FilterCriteria[FilterCriteria["noteLowImportance"] = 4] = "noteLowImportance";
            })(FilterCriteria || (FilterCriteria = {}));
            exports_1("FilterCriteria", FilterCriteria);
            /* Notelistview Classes */
            Notelistview = (function () {
                function Notelistview() {
                    this.compile();
                }
                Notelistview.prototype.render = function (notelist) {
                    var context = {
                        notes: notelist
                    };
                    var notesHtml = this.noteListTemplateHTML(context);
                    document.getElementById("notelist").innerHTML = notesHtml;
                    this.initaccordion();
                };
                Notelistview.prototype.compile = function () {
                    this.noteListTemplateHTML = Handlebars.compile(document.getElementById("notes-template").innerText);
                };
                Notelistview.prototype.initaccordion = function () {
                    var $firstRow = $(".accFirstRow");
                    var $content = $(".accContent");
                    /* Show only first row */
                    $content.hide();
                    $firstRow.click(function () {
                        $content.not(":hidden").slideUp('slow');
                        $(this).next()
                            .not(":visible")
                            .slideDown('slow')
                            .prev();
                    });
                };
                return Notelistview;
            }());
            exports_1("Notelistview", Notelistview);
            NotelistController = (function (_super) {
                __extends(NotelistController, _super);
                /* HTMLSelectElement greift auf das Interface von HTMLElement zurück */
                /* Aktives Filter- und Sortierkriterium über Listboxen
                 Default ist das Item, das ausgewählt wurde */
                function NotelistController(noteservice, noteStorageService) {
                    _super.call(this, StyleController_ts_1.HREF_PREFIX_STYLE);
                    this.noteservice = noteservice;
                    this.noteStorageService = noteStorageService;
                    this.notelist = this.noteStorageService.noteList;
                    /* Erstellt Datum ist Default-Sortierung */
                    this.noteservice.sortBy(this.notelist, SortCriteria.creationDate);
                    this.notelistview = new Notelistview();
                    this.notelistview.render(this.notelist);
                    this.registerBtnEdit();
                    this.registerCBFinished();
                    this.registerBtnNoteNew();
                    this.registerListboxSorter();
                    this.registerListboxFilter();
                }
                ;
                NotelistController.prototype.registerCBFinished = function () {
                    var _this = this;
                    $(":checkbox").change(function (ev) {
                        var target = $(ev.target);
                        var id = target.parent().attr("id");
                        var finishedDate = target.is(':checked') ? new Date().toJSON() : " ";
                        var note = new Note_ts_1.Note();
                        note.id = Number(id);
                        _this.noteStorageService.updateNote(note, finishedDate);
                    });
                };
                NotelistController.prototype.registerBtnEdit = function () {
                    $(":button").on('click', function () {
                        var id = $(this).parent().attr("id");
                        NotelistController.changeLocation(Number(id));
                    });
                };
                NotelistController.prototype.registerBtnNoteNew = function () {
                    var el = document.getElementById("btnNoteNew");
                    el.addEventListener('click', this.createNewNote.bind(this));
                };
                NotelistController.prototype.registerListboxSorter = function () {
                    var el = document.getElementById("ddlb_sorterselect");
                    el.addEventListener('change', this.sort.bind(this));
                };
                NotelistController.prototype.registerListboxFilter = function () {
                    var el = document.getElementById("ddlb_filterselect");
                    el.addEventListener('change', this.filter.bind(this));
                };
                NotelistController.prototype.createNewNote = function (event) {
                    var nextID = 1;
                    console.log("NewNote", Event);
                    nextID = this.noteStorageService.getNextId();
                    if (typeof nextID === "number") {
                        /* notedetail Editor mit neuer ID aufrufen */
                        NotelistController.changeLocation(nextID);
                    }
                    else {
                        console.log("Error:CreateNewNote: Wrong ID", nextID);
                    }
                };
                NotelistController.changeLocation = function (id) {
                    window.location.replace("notedetail\\notedetail.html?id=" + id);
                };
                NotelistController.prototype.sort = function (event) {
                    /* found no type for event.target therefore any as type */
                    var target = event.target;
                    var SelectedSortOption = target.value;
                    switch (SelectedSortOption) {
                        case "id":
                            this.noteservice.sortBy(this.notelist, SortCriteria.id);
                            break;
                        case "due-date":
                            this.noteservice.sortBy(this.notelist, SortCriteria.dueDate);
                            break;
                        case "creation-date":
                            this.noteservice.sortBy(this.notelist, SortCriteria.creationDate);
                            break;
                        case "importance":
                            this.noteservice.sortBy(this.notelist, SortCriteria.importance);
                            break;
                        default:
                            console.log("Switch SelectedSortOption: default");
                            break;
                    }
                    this.notelistview.render(this.notelist);
                    this.registerBtnEdit();
                    console.log("change LBSort");
                };
                NotelistController.prototype.filter = function (event) {
                    var target = event.target;
                    var SelectedSortOption = target.value;
                    /* notelist mit allen Elementen initialisieren   */
                    this.notelist = this.noteStorageService.noteList;
                    switch (SelectedSortOption) {
                        case "id":
                            /* Kein Filter */
                            break;
                        case "note-active":
                            this.notelist = this.noteservice.filterBy(this.notelist, FilterCriteria.noteActive);
                            break;
                        case "note-highimportance":
                            this.notelist = this.noteservice.filterBy(this.notelist, FilterCriteria.noteHighImportance);
                            break;
                        case "note-mediumimportance":
                            this.notelist = this.noteservice.filterBy(this.notelist, FilterCriteria.noteMediumImportance);
                            break;
                        case "note-lowimportance":
                            this.notelist = this.noteservice.filterBy(this.notelist, FilterCriteria.noteLowImportance);
                            break;
                        default:
                            console.log("Switch SelectedSortOption: default");
                            break;
                    }
                    this.notelistview.render(this.notelist);
                    this.registerBtnEdit();
                    console.log("change LBFilter");
                };
                return NotelistController;
            }(StyleController_ts_1.StyleController));
            exports_1("NotelistController", NotelistController);
            /* App.Ctrl */
            $(document).ready(function () {
                var app = new App_ts_1.App(NoteStorageService_ts_1.StorageTyp.ServerNoteStorageService);
                // Storage Selection
                if (app.storagetyp === NoteStorageService_ts_1.StorageTyp.ServerNoteStorageService) {
                    var noteStorageService_1 = new ServerNoteStorageService_ts_1.ServerNoteStorageService();
                    noteStorageService_1.getNotesfromServer(function () {
                        new NotelistController(new NoteService_ts_1.NoteService(), noteStorageService_1);
                    });
                }
                else {
                    if (app.isLocalStorageAvailable()) {
                        var noteStorageService = new LocalNoteStorageService_ts_1.LocalNoteStorageService();
                        new NotelistController(new NoteService_ts_1.NoteService(), noteStorageService);
                    }
                    else {
                        console.log("No Local Storage");
                    }
                }
            });
        }
    }
});
//# sourceMappingURL=Notelist.js.map