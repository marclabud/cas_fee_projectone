System.register(["../notelist/Notelist.ts"], function(exports_1, context_1) {
    'use strict';
    var __moduleName = context_1 && context_1.id;
    var Notelist_ts_1;
    var NoteService;
    return {
        setters:[
            function (Notelist_ts_1_1) {
                Notelist_ts_1 = Notelist_ts_1_1;
            }],
        execute: function() {
            /**
             * NoteService
             * Basic Services to Init the listview
             * Services to find and Sort Notes in NoteList
             */
            NoteService = (function () {
                function NoteService() {
                }
                NoteService.prototype.sortBy = function (noteList, SelectedSortCriteria) {
                    switch (SelectedSortCriteria) {
                        case Notelist_ts_1.SortCriteria.id:
                            noteList.sort(function (a, b) {
                                if (a.id < b.id) {
                                    return 1;
                                }
                                else if (a.id > b.id) {
                                    return -1;
                                }
                                else
                                    return 0;
                            });
                            break;
                        case Notelist_ts_1.SortCriteria.dueDate:
                            noteList.sort(function (a, b) {
                                if (a.dueDate > b.dueDate) {
                                    return 1;
                                }
                                else if (a.dueDate < b.dueDate) {
                                    return -1;
                                }
                                else
                                    return 0;
                            });
                            break;
                        case Notelist_ts_1.SortCriteria.creationDate:
                            noteList.sort(function (a, b) {
                                if (a.dueDate < b.dueDate) {
                                    return 1;
                                }
                                else if (a.dueDate > b.dueDate) {
                                    return -1;
                                }
                                else
                                    return 0;
                            });
                            break;
                        case Notelist_ts_1.SortCriteria.importance:
                            noteList.sort(function (a, b) {
                                if (a.importance < b.importance) {
                                    return 1;
                                }
                                else if (a.importance > b.importance) {
                                    return -1;
                                }
                                else
                                    return 0;
                            });
                            break;
                        default:
                            break;
                    }
                    return;
                };
                NoteService.prototype.filterBy = function (noteList, SelectedFilterCriteria) {
                    var filterednotelist;
                    switch (SelectedFilterCriteria) {
                        case Notelist_ts_1.FilterCriteria.id:
                            /* KeineFilter, */
                            /* ToDo: Noch effizienter wäre beim Aufruf von Filterby die nicht gefilterte Liste anzuzeigen*/
                            break;
                        case Notelist_ts_1.FilterCriteria.noteActive: {
                            /*Nur notes anzeigen, die ein leeres FinishedDate enthalten */
                            function filterByFinishedDate(el) {
                                if (el.finishedDate == "" || el.finishedDate == " ") {
                                    return true;
                                }
                            }
                            filterednotelist = noteList.filter(filterByFinishedDate);
                            break;
                        }
                        case Notelist_ts_1.FilterCriteria.noteHighImportance: {
                            /* Nur Rating 4 oder 5 */
                            function filterByHighImportance(el) {
                                if (el.importance >= 4) {
                                    return true;
                                }
                            }
                            filterednotelist = noteList.filter(filterByHighImportance);
                            break;
                        }
                        case Notelist_ts_1.FilterCriteria.noteMediumImportance: {
                            /* Nur Rating 2 oder 3 */
                            function filterByMediumImportance(el) {
                                if (el.importance == 2 || el.importance == 3) {
                                    return true;
                                }
                            }
                            filterednotelist = noteList.filter(filterByMediumImportance);
                            break;
                        }
                        case Notelist_ts_1.FilterCriteria.noteLowImportance: {
                            /* Nur Rating 0 oder 1 */
                            function filterByLowImportance(el) {
                                if (el.importance <= 1) {
                                    return true;
                                }
                            }
                            filterednotelist = noteList.filter(filterByLowImportance);
                            break;
                        }
                        default:
                            break;
                    }
                    return filterednotelist;
                };
                return NoteService;
            }());
            exports_1("NoteService", NoteService);
        }
    }
});
//# sourceMappingURL=NoteService.js.map