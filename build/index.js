(function(a,b){'object'==typeof exports&&'object'==typeof module?module.exports=b():'function'==typeof define&&define.amd?define('freactal3',[],b):'object'==typeof exports?exports.freactal3=b():a.freactal3=b()})('undefined'==typeof self?this:self,function(){return function(a){function b(d){if(c[d])return c[d].exports;var e=c[d]={i:d,l:!1,exports:{}};return a[d].call(e.exports,e,e.exports,b),e.l=!0,e.exports}var c={};return b.m=a,b.c=c,b.d=function(a,c,d){b.o(a,c)||Object.defineProperty(a,c,{configurable:!1,enumerable:!0,get:d})},b.n=function(a){var c=a&&a.__esModule?function(){return a['default']}:function(){return a};return b.d(c,'a',c),c},b.o=function(a,b){return Object.prototype.hasOwnProperty.call(a,b)},b.p='',b(b.s=3)}([function(a){a.exports=require('rxjs')},function(a){a.exports=require('rxjs/operators')},function(a){a.exports=require('lodash.get')},function(a,b,c){a.exports=c(4)},function(a,b,c){'use strict';Object.defineProperty(b,'__esModule',{value:!0});var d=c(5),e=c.n(d),f=c(0),g=c.n(f),h=c(1),i=c.n(h),j=c(2),k=c.n(j),l=function(){function a(a,b){var c=[],d=!0,e=!1,f=void 0;try{for(var g,h=a[Symbol.iterator]();!(d=(g=h.next()).done)&&(c.push(g.value),!(b&&c.length===b));d=!0);}catch(a){e=!0,f=a}finally{try{!d&&h['return']&&h['return']()}finally{if(e)throw f}}return c}return function(b,c){if(Array.isArray(b))return b;if(Symbol.iterator in Object(b))return a(b,c);throw new TypeError('Invalid attempt to destructure non-iterable instance')}}(),m=(a)=>{a.factory('Store',({BASE_STATE_UNINITIALIZED_VALUE:a,BASE_STATE_STATUS_UNINITIALIZED:b,BASE_STATE_STATUS_INITIALIZING:c,BASE_STATE_STATUS_INITIALIZATION_ERROR:d,BASE_STATE_STATUS_INITIALIZED:e,p:g})=>{class i{constructor(c=null){let d=a,e=null;if(c&&('function'==typeof c?e=c:'object'==typeof c?'state'in c||'initializer'in c?(e=k()(c,'initializer'),d=k()(c,'state',a)):d=c:d=c),this._stateStream=new f.BehaviorSubject,this._stateStream.subscribe((a)=>{this._state=a}),this._statusStream=new f.BehaviorSubject,this._statusStream.subscribe((a)=>{this._status=a}),this._stream=Object(f.combineLatest)(this._stateStream,this._statusStream).pipe(Object(h.map)(([a,b])=>({state:a,status:b}))),this._statusStream.next(b),this.state=d,e){if('function'!=typeof e)throw new Error('bad initializer',e);this._initializer=e}}get state(){return this._state}set state(a){this._stateStream.next(a)}get status(){return this._status}subscribe(...a){this._stream.subscribe(...a)}initialize(){return this._initPromise||(this._initPromise=new Promise((a,b)=>new Promise(function(f,h){var i,j;let k,m;return this._initializer?this.state===e?(a(),f()):(this._statusStream.next(c),Promise.resolve(g(this._initializer,this)).then(function(c){try{return i=c,j=l(i,2),k=j[0],m=j[1],m?(this.initializionError=m,this._statusStream.next(d),b(m)):(this.state=k,this._statusStream.next(e),a()),f()}catch(a){return h(a)}}.bind(this),h)):(this.state!==e&&this._statusStream.next(e),a(),f())}.bind(this)))),this._initPromise}}return i})},n=function(){function a(a,b){var c=[],d=!0,e=!1,f=void 0;try{for(var g,h=a[Symbol.iterator]();!(d=(g=h.next()).done)&&(c.push(g.value),!(b&&c.length===b));d=!0);}catch(a){e=!0,f=a}finally{try{!d&&h['return']&&h['return']()}finally{if(e)throw f}}return c}return function(b,c){if(Array.isArray(b))return b;if(Symbol.iterator in Object(b))return a(b,c);throw new TypeError('Invalid attempt to destructure non-iterable instance')}}(),o=Object.assign||function(a){for(var b,c=1;c<arguments.length;c++)for(var d in b=arguments[c],b)Object.prototype.hasOwnProperty.call(b,d)&&(a[d]=b[d]);return a},p=(a)=>{a.factory('StoreEngine',({Store:a,ACTION_START:b,ACTION_ERROR:c,ACTION_COMPLETE:d,ACTION_NOOP:e,p:g})=>{class i extends a{constructor(a,b){super(a),this._actionsStream=new f.Subject,this._actionStream=Object(f.combineLatest)(this._stream,this._actionsStream).pipe(Object(h.map)(([a,b])=>o({},a,b))),this._actions={};const c=b||k()(a,'actions',{});Object.keys(c).forEach((a)=>{this._actions[a]=(...b)=>new Promise(function(d){return d(this.do(a,c[a],...b))}.bind(this))})}get actions(){return this._actions}subscribeToActions(...a){return this._actionStream.subscribe(...a)}do(a,e,...f){return new Promise(function(h,i){var j,k;let l,m,o;return Promise.resolve(this.initialize()).then(function(){try{return this.actions[a]?(this._actionsStream.next({name:a,params:f,type:b}),Promise.resolve(g(e,this,...f)).then(function(b){try{return(j=b,k=n(j,2),l=k[0],m=k[1],m)?(this._actionsStream.next({name:a,params:f,type:c,error:m}),h(this.state)):(o=this.state,this.state=l,this._actionsStream.next({type:d,name:a,params:f,state:l,prevState:o}),h(l))}catch(a){return i(a)}}.bind(this),i)):h(this._actionsStream.next({type:c,name:a,error:{message:'cannot find action'}}))}catch(a){return i(a)}}.bind(this),i)}.bind(this))}}return i})},q=function(){function a(a,b){var c=[],d=!0,e=!1,f=void 0;try{for(var g,h=a[Symbol.iterator]();!(d=(g=h.next()).done)&&(c.push(g.value),!(b&&c.length===b));d=!0);}catch(a){e=!0,f=a}finally{try{!d&&h['return']&&h['return']()}finally{if(e)throw f}}return c}return function(b,c){if(Array.isArray(b))return b;if(Symbol.iterator in Object(b))return a(b,c);throw new TypeError('Invalid attempt to destructure non-iterable instance')}}(),r=Object.assign||function(a){for(var b,c=1;c<arguments.length;c++)for(var d in b=arguments[c],b)Object.prototype.hasOwnProperty.call(b,d)&&(a[d]=b[d]);return a},s=(a)=>{a.factory('StoreEngineReducer',({p:a,Store:b,BASE_STATE_UNINITIALIZED_VALUE:c,BASE_STATE_STATUS_INITIALIZATION_ERROR:d,BASE_STATE_STATUS_INITIALIZED:e})=>{const g=(a,b)=>r({},a,b.actions),i=(a,b)=>{if(a===c)return b;return b===c?a:'object'==typeof a?'object'==typeof b?r({},a,b):(console.log('non-object state:',b),b):b};return class extends b{constructor(a,b={}){super({initialState:c}),this.engines=a,this._stateReducer=k()(b,'storeReducer',i),this._actionReducer=k()(b,'actionReducer',g);const d=a.map((a)=>a._stateStream),e=this;this._combinedStateStreams=Object(f.combineLatest)(...d).pipe(Object(h.map)((a)=>a.reduce(e._stateReducer,{}))),this._combinedStateStreams.subscribe((a)=>{this.state=a}),this.actions=a.reduce(this._actionReducer,{}),Object.keys(this.actions).forEach((a)=>{const b=this.actions[a];this.actions[a]=(...a)=>new Promise(function(c,d){return Promise.resolve(this.initialize()).then(function(){try{return c(b(...a))}catch(a){return d(a)}},d)}.bind(this))})}initialize(){return this._initializePromise||(this._initializePromise=new Promise((b,c)=>new Promise(function(f,g){var h,i;let j,k;return Promise.resolve(a(Promise.all(this.engines.map((a)=>a.initialize())))).then(function(a){try{return h=a,i=q(h,2),j=i[0],k=i[1],k?(this._statusStream.next(d),c()):(this._statusStream.next(e),b()),f()}catch(a){return g(a)}}.bind(this),g)}.bind(this)))),this._initializePromise}}})},t=(a)=>{m(a),p(a),s(a)},u=(a)=>{a.constant('BASE_STATE_UNINITIALIZED_VALUE',Symbol('BASE_STATE_UNINITIALIZED_VALUE')),a.constant('BASE_STATE_STATUS_UNINITIALIZED',Symbol('BASE_STATE_STATUS_UNINITIALIZED')),a.constant('BASE_STATE_STATUS_INITIALIZED',Symbol('BASE_STATE_STATUS_INITIALIZED')),a.constant('BASE_STATE_STATUS_INITIALIZING',Symbol('BASE_STATE_STATUS_INITIALIZING')),a.constant('BASE_STATE_STATUS_INITIALIZATION_ERROR',Symbol('BASE_STATE_STATUS_INITIALIZATION_ERROR')),a.constant('ACTION_ERROR',Symbol('ACTION_ERROR')),a.constant('ACTION_START',Symbol('ACTION_START')),a.constant('ACTION_NOOP',Symbol('ACTION_NOOP')),a.constant('ACTION_COMPLETE',Symbol('ACTION_COMPLETE'))},v=(a)=>{a.factory('p',()=>(a,...b)=>new Promise(function(c,d){let e,f,g;e=null;var h=function(){try{return g=[f,e],g.result=f,g.error=e,c(g)}catch(a){return d(a)}},i=function(a){try{return e=a,h()}catch(a){return d(a)}};try{function c(){return h()}return'function'==typeof a?Promise.resolve(a(...b)).then(function(a){try{return f=a,c.call(this)}catch(a){return i(a)}}.bind(this),i):Promise.resolve(a).then(function(a){try{return f=a,c.call(this)}catch(a){return i(a)}}.bind(this),i)}catch(a){i(a)}})),a.factory('update',()=>function(a){return(b)=>Object.assign({},b.state,a(b))})};c.d(b,'Store',function(){return x}),c.d(b,'StoreEngine',function(){return y}),c.d(b,'StoreEngineReducer',function(){return z}),c.d(b,'update',function(){return A});var w=(()=>{const a=new e.a;return t(a),u(a),v(a),a})().container;const x=w.Store,y=w.StoreEngine,z=w.StoreEngineReducer,A=w.update},function(a){a.exports=require('bottlejs')}])});
//# sourceMappingURL=index.js.map