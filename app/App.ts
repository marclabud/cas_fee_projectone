/**
 * Class App central init
 *
 */

class App {
      constructor(private _storage:StorageTyp){}
    
      get storagetyp():StorageTyp {
          return this._storage
      }
      isLocalStorageAvailable():boolean {
          let SimpleNote :string = "CAS_FEE_SimpleNote";
          try {
          localStorage.setItem(SimpleNote,SimpleNote);
          localStorage.removeItem(SimpleNote);
              return true;
          } catch (err) {
              return false;
          }
      }

}