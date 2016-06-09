/* ENUM SortCriteria noteList */
var SortCriteria;
(function (SortCriteria) {
    SortCriteria[SortCriteria["id"] = 0] = "id";
    SortCriteria[SortCriteria["dueDate"] = 1] = "dueDate";
    SortCriteria[SortCriteria["creationDate"] = 2] = "creationDate";
    SortCriteria[SortCriteria["importance"] = 3] = "importance";
})(SortCriteria || (SortCriteria = {}));
/* ENUM FilterCriteria noteList */
var FilterCriteria;
(function (FilterCriteria) {
    FilterCriteria[FilterCriteria["id"] = 0] = "id";
    FilterCriteria[FilterCriteria["noteActive"] = 1] = "noteActive";
    FilterCriteria[FilterCriteria["noteHighImportance"] = 2] = "noteHighImportance";
    FilterCriteria[FilterCriteria["noteMediumImportance"] = 3] = "noteMediumImportance";
    FilterCriteria[FilterCriteria["noteLowImportance"] = 4] = "noteLowImportance";
})(FilterCriteria || (FilterCriteria = {}));
/* Handlebars Helper */
/* Rate transformiert den Score (Ausprägung des Ratings) in HTML
 Der gültige Wertebereich beträgt 0 bis BESTRATING.
 Wird ein ungüliger Wert übergeben, wird die class error-sign generiert*/
Handlebars.registerHelper('rate', function (rating) {
    var RatingHTML = "";
    var BESTRATING = 5;
    if (rating >= 0 && rating <= BESTRATING) {
        for (var i = 1; i <= BESTRATING; i++) {
            if (rating >= i) {
                RatingHTML = RatingHTML + '<span class="scored-sign">&nbsp;</span>';
            }
            else {
                RatingHTML = RatingHTML + '<span class="unscored-sign">&nbsp;</span>';
            }
        }
    }
    else {
        var ERRORSIGNSPAN = '<span class="error-sign">&nbsp;</span>';
        for (var i = 1; i <= BESTRATING; i++) {
            RatingHTML = RatingHTML + ERRORSIGNSPAN;
        }
    }
    return new Handlebars.SafeString(RatingHTML);
});
Handlebars.registerHelper('showdate', function (date) {
    var DATEFORMAT = "LL";
    var outDate = "";
    if (moment(date).isValid()) {
        outDate = moment(date).format(DATEFORMAT);
    }
    else {
        outDate = "";
        console.log("Invalid Date: " + moment(date));
    }
    return new Handlebars.SafeString(outDate);
});
/* Notelistview Classes */
var NoteService = (function () {
    function NoteService() {
    }
    /* Mock-Daten aus dem Array */
    NoteService.prototype.getNotesfromStorage = function () {
        var notelist;
        notelist = notesarray;
        return notelist;
    };
    /* Daten aus dem LocalStorage
     getNotesfromStorage():note[] {
     let noteList:note[];
     noteList = JSON.parse(localStorage.getItem("noteClient"));
     return noteList
     } */
    /* For Testing: Setup local store data with Mock Array */
    NoteService.prototype.WriteMockNotestoLocalStorage = function () {
        var notelist;
        localStorage.removeItem("noteClient");
        notelist = notesarray;
        /* Store noteList */
        localStorage.setItem("noteClient", JSON.stringify(notelist));
    };
    NoteService.prototype.sortBy = function (noteList, SelectedSortCriteria) {
        switch (SelectedSortCriteria) {
            case SortCriteria.id:
                noteList.sort(function (a, b) {
                    if (a.id > b.id) {
                        return 1;
                    }
                    else if (a.id < b.id) {
                        return -1;
                    }
                    else
                        return 0;
                });
                break;
            case SortCriteria.dueDate:
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
            case SortCriteria.creationDate:
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
            case SortCriteria.importance:
                noteList.sort(function (a, b) {
                    if (a.importance > b.importance) {
                        return 1;
                    }
                    else if (a.importance < b.importance) {
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
            case FilterCriteria.id:
                /* KeineFilter, */
                /* ToDo: Noch effizienter wäre beim Aufruf von Filterby die nicht gefilterte Liste anzuzeigen*/
                break;
            case FilterCriteria.noteActive: {
                /*Nur notes anzeigen, die ein leeres FinishedDate enthalten */
                function filterByFinishedDate(el) {
                    if (el.finishedDate == "") {
                        return true;
                    }
                }
                filterednotelist = noteList.filter(filterByFinishedDate);
                break;
            }
            case FilterCriteria.noteHighImportance: {
                /* Nur Rating 4 oder 5 */
                function filterByHighImportance(el) {
                    if (el.importance >= 4) {
                        return true;
                    }
                }
                filterednotelist = noteList.filter(filterByHighImportance);
                break;
            }
            case FilterCriteria.noteMediumImportance: {
                /* Nur Rating 2 oder 3 */
                function filterByMediumImportance(el) {
                    if (el.importance == 2 || el.importance == 3) {
                        return true;
                    }
                }
                filterednotelist = noteList.filter(filterByMediumImportance);
                break;
            }
            case FilterCriteria.noteLowImportance: {
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
var Notelistview = (function () {
    function Notelistview() {
    }
    Notelistview.prototype.render = function (notelist) {
        var context = {
            notes: notelist
        };
        var createNotesHTML = Handlebars.compile(document.getElementById("notes-template").innerText);
        var notesHtml = createNotesHTML(context);
        document.getElementById("noteList").innerHTML = notesHtml;
    };
    return Notelistview;
}());
var NotelistController = (function () {
    /* HTMLSelectElement greift auf das Interface von HTMLElement zurück */
    /* Aktives Filter- und Sortierkriterium über Listboxen
     Default ist das Item, das ausgewählt wurde */
    function NotelistController() {
        this.noteservice = new NoteService;
        /* Test ToDo Nach Test entfernen
        this.noteservice.WriteMockNotestoLocalStorage(); */
        this.notelist = this.noteservice.getNotesfromStorage();
        this.notelistview = new Notelistview;
        this.notelistview.render(this.notelist);
        this.registerCBFinished();
        this.registerListboxSorter();
        this.registerListboxFilter();
        this.registerListboxStyleChanger();
    }
    ;
    NotelistController.prototype.registerCBFinished = function () {
        $(":checkbox").change(function () {
            var id = $(this).parent().attr("id");
            var finishedDate = $(this).is(':checked') ? new Date().toJSON() : " ";
            updateNote(Number(id), finishedDate);
            console.log("Checkbox changed:", id);
        });
    };
    NotelistController.prototype.registerListboxSorter = function () {
        var el = document.getElementById("ddlb_sorterselect");
        el.addEventListener('change', this.sort.bind(this));
    };
    NotelistController.prototype.registerListboxFilter = function () {
        var el = document.getElementById("ddlb_filterselect");
        el.addEventListener('change', this.filter.bind(this));
    };
    NotelistController.prototype.registerListboxStyleChanger = function () {
        var el = document.getElementById("ddlb_stylesheetSelect");
        el.addEventListener('change', this.styleSheetSelect.bind(this));
    };
    NotelistController.prototype.styleSheetSelect = function (event) {
        var PATHSTYLE = "app/scss/style.css";
        var PATHDARKSTYLE = "app/scss/darkstyle.css";
        var target = event.target;
        var SelectedStyle = target.value;
        if (SelectedStyle === "StyleOne") {
            console.log("Selected Style", SelectedStyle);
            $("link").attr("href", PATHDARKSTYLE);
        }
        else {
            console.log("Selected Style", SelectedStyle);
            $("link").attr("href", PATHSTYLE);
        }
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
        console.log("change LBSort");
    };
    NotelistController.prototype.filter = function (event) {
        var target = event.target;
        var SelectedSortOption = target.value;
        /* Noteliste mit allen Elementen initialisieren   */
        this.notelist = this.noteservice.getNotesfromStorage();
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
        console.log("change LBFilter");
    };
    return NotelistController;
}());
/* App.Ctrl */
$(document).ready(function () {
    var notelistctrl = new NotelistController();
});
//# sourceMappingURL=notelist.js.map