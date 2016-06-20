/**
 * NoteService
 * Basic Services to Init the listview
 * Services to find and Sort Notes in NoteList
 */

class NoteService {

    sortBy(noteList:INote[], SelectedSortCriteria:SortCriteria):void {

        switch (SelectedSortCriteria) {
            case SortCriteria.id:
                noteList.sort(function (a:INote, b:INote):number {
                    if (a.id > b.id) {
                        return 1;
                    }
                    else if (a.id < b.id) {
                        return -1;
                    }
                    else return 0;
                });
                break;
            case SortCriteria.dueDate:
                noteList.sort(function (a:INote, b:INote):number {
                    if (a.dueDate > b.dueDate) {
                        return 1;
                    }
                    else if (a.dueDate < b.dueDate) {
                        return -1;
                    }
                    else return 0;
                });
                break;
            case SortCriteria.creationDate:
                noteList.sort(function (a:INote, b:INote):number {
                    if (a.dueDate > b.dueDate) {
                        return 1;
                    }
                    else if (a.dueDate < b.dueDate) {
                        return -1;
                    }
                    else return 0;
                });
                break;
            case SortCriteria.importance:
                noteList.sort(function (a:INote, b:INote):number {
                    if (a.importance > b.importance) {
                        return 1;
                    }
                    else if (a.importance < b.importance) {
                        return -1;
                    }
                    else return 0;
                });
                break;
            default:
                break;
        }
        return
    }

    filterBy(noteList:INote[], SelectedFilterCriteria:FilterCriteria):INote[] {
        let filterednotelist:INote[];

        switch (SelectedFilterCriteria) {
            case FilterCriteria.id:
                /* KeineFilter, */
                /* ToDo: Noch effizienter wäre beim Aufruf von Filterby die nicht gefilterte Liste anzuzeigen*/
                break;
            case FilterCriteria.noteActive: {
                /*Nur notes anzeigen, die ein leeres FinishedDate enthalten */
                function filterByFinishedDate(el:any) {
                    if (el.finishedDate == "" ||el.finishedDate == " ") {
                        return true;
                    }
                }

                filterednotelist = noteList.filter(filterByFinishedDate);
                break;
            }
            case FilterCriteria.noteHighImportance: {
                /* Nur Rating 4 oder 5 */
                function filterByHighImportance(el:any) {
                    if (el.importance >= 4) {
                        return true;
                    }
                }

                filterednotelist = noteList.filter(filterByHighImportance);
                break;
            }
            case FilterCriteria.noteMediumImportance: {
                /* Nur Rating 2 oder 3 */
                function filterByMediumImportance(el:any) {
                    if (el.importance == 2 || el.importance == 3) {
                        return true;
                    }
                }

                filterednotelist = noteList.filter(filterByMediumImportance);
                break;
            }
            case FilterCriteria.noteLowImportance: {
                /* Nur Rating 0 oder 1 */
                function filterByLowImportance(el:any) {
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
        return filterednotelist
    }
}