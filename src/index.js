import bottle from './bottle';


const {
  Store, Engine, EngineMerger, update, mergeIntoState,
  STORE_STATE_UNSET_VALUE
  , STORE_STATUS_NEW
  , STORE_STATUS_STARTED
  , STORE_STATUS_STARTING
  , STORE_STATUS_ERROR
  , ACTION_ERROR
  , ACTION_START
  , ACTION_NOOP
  , ACTION_COMPLETE
  , NOT_SET,
} = bottle().container;

console.log('Engine:', Engine);
export {
  STORE_STATE_UNSET_VALUE
  , STORE_STATUS_NEW
  , STORE_STATUS_STARTED
  , STORE_STATUS_STARTING
  , STORE_STATUS_ERROR
  , ACTION_ERROR
  , ACTION_START
  , ACTION_NOOP
  , ACTION_COMPLETE
  , NOT_SET,
  Store,
  Engine,
  EngineMerger,
  update,
  mergeIntoState,
};
