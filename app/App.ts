/**
 * Class App central init
 *
 */

class App {
      constructor(private _storage:StorageTyp){}
    
      get storagetyp():StorageTyp {
          return this._storage
      }
}