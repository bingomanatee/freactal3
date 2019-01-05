/* eslint-disable no-unreachable */

import clone from 'lodash.clonedeep';

import { BehaviorSubject } from 'rxjs';

export default (bottle) => {
  /**
   * Returns an object with states sub-indexed by the store name keys in the map.
   * For convenience each store (that can be) is also key-value-dumped into the root
   * but as this has the potential for shadowed values, the name-indexed states are the
   * best source of truth.
   *
   * @param storeMap {Map} a dictionary of string/Store listings
   */ bottle.factory('defaultStateReducer', ({ NOT_SET }) => () =>
    (storeMap) => {
      const byName = {};
      let out = {};
      console.log('defaultStateReducer reducing ', storeMap);
      Array.from(storeMap.keys()).forEach((storeName) => {
        console.log('defaultStateReducer: storeName = ', storeName);
        const state = storeMap.get(storeName).state;
        byName[storeName] = state;

        if (state && typeof state === 'object') {
          out = { ...out, ...state };
        }
      });

      console.log('defaultStateReducer returning MERGED:', out, 'SEGREGATED:', byName);
      return { ...out, ...byName };
    });


  bottle.factory('defaultActionReducer', () => (storeMap) => {
    let out = {};

    if (!(storeMap instanceof Map)) {
      console.log('dar: non map passed:', storeMap);
      return {};
    }

    // dump all the actions into the root object.
    // warning: potential for shadowing.

    Array.from(storeMap.keys()).forEach((key) => {
      const store = storeMap.get(key);
      out = { ...out, ...store.actions };
    });

    // segregate all the actions into a subset based on name

    Array.from(storeMap.keys()).forEach((key) => {
      const store = storeMap.get(key);
      out[key] = store.actions;
    });

    return out;
  });


  /**
   * NOTE - this is a function that RETURNS a function; difficult to read in bottle notation,
   * but the output of defaultStarterFactory's bottle is a function that takes in a storeMap
   * and returns a starter function that calls each storeMap's starters.
   */
  bottle.factory('defaultStarterFactory', ({ asMap }) => storeMap => () => {
    Array.from(asMap(storeMap).values()).forEach((store) => {
      store.start();
    });
  });

  /**
   * StoreMap is a "MetaStore", like the reduced stores in Redux.
   * It takes in a Map
   */

  bottle.factory('StoreMap', ({
    STORE_STATE_UNSET_VALUE,
    S_NEW,
    S_STARTING,
    S_ERROR,
    S_STOPPED,
    S_STARTED,
    NOT_SET,
    ChangePromise,
    isPromise,
    asMap,
    defaultStateReducer,
    defaultStarterFactory,
    defaultActionReducer,
    Store,
  }) => class StoreMap extends Store {
    constructor(storeMap = new Map(), config = {}) {
      const stateReducer = config._stateReducer || defaultStateReducer;
      const actionReducer = config._actionReducer || defaultActionReducer;
      const starterFactory = config.starter || defaultStarterFactory;
      const trueMapStoreMap = asMap(storeMap);

      const starter = starterFactory(trueMapStoreMap);

      super({ ...config, state: stateReducer(trueMapStoreMap), starter });
      this.stores = trueMapStoreMap;

      this._stateReducer = stateReducer;
      this._actionReducer = actionReducer;

      /**
       * unlike Stores, the StoreMap internally starts itself - and by extension its members.
       */
      this.start();
    }

    get do() {
      return this.actions;
    }

    get actions() {
      return this._actionReducer(this.stores);
    }
  });
};
