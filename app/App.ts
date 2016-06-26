'use strict';
import { StorageTyp } from "../noteservice/NoteStorageService.ts";

/**
 * Class App central init
 *
 */
export class App {
    constructor(private _storage:StorageTyp) {
    }

    get storagetyp():StorageTyp {
        return this._storage
    }

    isLocalStorageAvailable():boolean {
        let SimpleNote:string = "CAS_FEE_SimpleNote";
        try {
            localStorage.setItem(SimpleNote, SimpleNote);
            localStorage.removeItem(SimpleNote);
            return true;
        } catch (err) {
            return false;
        }
    }

}