(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('events'), require('browser-process-hrtime'), require('timers-browserify'), require('lodash'), require('path'), require('util'), require('stream'), require('os'), require('fs'), require('cpus'), require('raf-perf'), require('crypto')) :
	typeof define === 'function' && define.amd ? define(['events', 'browser-process-hrtime', 'timers-browserify', 'lodash', 'path', 'util', 'stream', 'os', 'fs', 'cpus', 'raf-perf', 'crypto'], factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Moleculer = factory(global.events, global.hrtime, global.timersBrowserify, global._, global.path, global.util, global.require$$0$1, global.os, global.fs, global.require$$0, global.RafPerf, global.crypto));
}(this, (function (events, hrtime, timersBrowserify, _, path, util, require$$0$1, os, fs, require$$0, RafPerf, crypto) { 'use strict';

	function _interopDefault (e) { return e && e.__esModule ? e['default'] : e; }

	var hrtime__default = /*#__PURE__*/_interopDefault(hrtime);
	var ___default = /*#__PURE__*/_interopDefault(_);
	var path__default = /*#__PURE__*/_interopDefault(path);
	var util__default = /*#__PURE__*/_interopDefault(util);
	var require$$0__default$1 = /*#__PURE__*/_interopDefault(require$$0$1);
	var os__default = /*#__PURE__*/_interopDefault(os);
	var fs__default = /*#__PURE__*/_interopDefault(fs);
	var require$$0__default = /*#__PURE__*/_interopDefault(require$$0);
	var RafPerf__default = /*#__PURE__*/_interopDefault(RafPerf);
	var crypto__default = /*#__PURE__*/_interopDefault(crypto);

	/*
	 * moleculer
	 * Copyright (c) 2023 MoleculerJS (https://github.com/moleculerjs/moleculer)
	 * MIT Licensed
	 */

	var constants = {
		// Circuit-breaker states
		CIRCUIT_CLOSE: "close",
		CIRCUIT_HALF_OPEN: "half_open",
		CIRCUIT_HALF_OPEN_WAIT: "half_open_wait",
		CIRCUIT_OPEN: "open",

		// Error list in core modules
		/** @type {String} Emitted when transit fails to process the packet*/
		FAILED_PROCESSING_PACKET: "failedProcessingPacket",
		/** @type {String} Emitted when transit fails to send request packet*/
		FAILED_SEND_REQUEST_PACKET: "failedSendRequestPacket",
		/** @type {String} Emitted when transit fails to send event packet*/
		FAILED_SEND_EVENT_PACKET: "failedSendEventPacket",
		/** @type {String} Emitted when transit fails to send response packet*/
		FAILED_SEND_RESPONSE_PACKET: "failedSendResponsePacket",
		/** @type {String} Emitted when transit fails to discover multiple nodes*/
		FAILED_NODES_DISCOVERY: "failedNodesDiscovery",
		/** @type {String} Emitted when transit fails to discover a single nodes*/
		FAILED_NODE_DISCOVERY: "failedNodeDiscovery",
		/** @type {String} Emitted when transit fails to send an INFO packet*/
		FAILED_SEND_INFO_PACKET: "failedSendInfoPacket",
		/** @type {String} Emitted when transit fails to send a PING packet*/
		FAILED_SEND_PING_PACKET: "failedSendPingPacket",
		/** @type {String} Emitted when transit fails to send a PONG packet*/
		FAILED_SEND_PONG_PACKET: "failedSendPongPacket",
		/** @type {String} Emitted when transit fails to send a HEARTBEAT packet*/
		FAILED_SEND_HEARTBEAT_PACKET: "failedSendHeartbeatPacket",
		/** @type {String} Emitted when broker fails to stop all services*/
		FAILED_STOPPING_SERVICES: "failedServicesStop",
		/** @type {String} Emitted when broker fails to stop all services*/
		FAILED_LOAD_SERVICE: "failedServiceLoad",
		/** @type {String} Emitted when broker fails to stop all services*/
		FAILED_RESTART_SERVICE: "failedServiceRestart",
		/** @type {String} Emitted when broker fails to stop all services*/
		FAILED_DESTRUCTION_SERVICE: "failedServiceDestruction",
		/** @type {String} Emitted when CACHER/DISCOVERER/TRANSPORTER client receives an error*/
		CLIENT_ERROR: "clientError",
		/** @type {String} Emitted when Redis client fails during while pinging the server*/
		FAILED_SEND_PING: "failedSendPing",
		/** @type {String} Emitted when etcd3 discoverer fails to collect the keys*/
		FAILED_COLLECT_KEYS: "failedCollectKeys",
		/** @type {String} Emitted when etcd3 discoverer fails to send INFO packet*/
		FAILED_SEND_INFO: "failedSendInfo",
		/** @type {String} Emitted when Redis discoverer fails to scan the keys*/
		FAILED_KEY_SCAN: "failedKeyScan",
		/** @type {String} Emitted when Redis publisher fails for some reason*/
		FAILED_PUBLISHER_ERROR: "publisherError",
		/** @type {String} Emitted when Redis consumer fails for some reason*/
		FAILED_CONSUMER_ERROR: "consumerError",
		/** @type {String} Emitted when Kafka fails to create topics*/
		FAILED_TOPIC_CREATION: "failedTopicCreation",
		/** @type {String} Emitted when AMQP fails to connect*/
		FAILED_CONNECTION_ERROR: "failedConnection",
		/** @type {String} Emitted when AMQP fails to connect*/
		FAILED_CHANNEL_ERROR: "failedChannel",
		/** @type {String} Emitted when AMQP fails ACK packet*/
		FAILED_REQUEST_ACK: "requestAck",
		/** @type {String} Emitted when AMQP fails for some reason and disconnects*/
		FAILED_DISCONNECTION: "failedDisconnection",
		/** @type {String} Emitted when AMQP fails to publish balanced event*/
		FAILED_PUBLISH_BALANCED_EVENT: "failedPublishBalancedEvent",
		/** @type {String} Emitted when AMQP fails to publish balanced request*/
		FAILED_PUBLISH_BALANCED_REQUEST: "publishBalancedRequest"
	};

	const _process = process || require('process');

	// events
	const ev = new events.EventEmitter();
	Object.setPrototypeOf(_process, ev);
	const props = ['on', 'addListener', 'once', 'off', 'removeListener', 'removeAllListeners', 'emit', 'prependListener', 'prependOnceListener', 'listeners'];
	props.forEach(prop => {
	  _process[prop] = ev[prop].bind(ev);
	});
	if (typeof window === 'undefined') { window.process = _process; } else if (typeof self === 'undefined') { self.process = _process; }

	// hrtime
	_process.hrtime = hrtime__default;

	// versions
	if (!_process.versions) {
	  _process.versions = {};
	}

	if (!_process.versions.node) {
	  _process.versions.node = '12.18.4';
	}

	// memoryUsage
	_process.memoryUsage = () => {
	  if (!performance && !performance.memory) {
	    return {
	      rss: 0,
	      heapTotal: Number.MAX_SAFE_INTEGER,
	      heapUsed: 0,
	      external: 0
	    }
	  }

	  const { memory } = performance;

	  return {
	    rss: 0,
	    heapTotal: memory.totalJSHeapSize,
	    heapUsed: memory.usedJSHeapSize,
	    external: 0
	  }
	};

	// uptime
	_process._startTime = Date.now();
	_process.uptime = () => {
	  return Math.floor((Date.now() - _process._startTime) / 1000)
	};

	_process.pid = 0;

	_process.cwd = () => '/';

	_process._getActiveHandles = function () {
	  return []
	};
	_process._getActiveRequests = function () {
	  return []
	};

	var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	function createCommonjsModule(fn, basedir, module) {
		return module = {
			path: basedir,
			exports: {},
			require: function (path, base) {
				return commonjsRequire(path, (base === undefined || base === null) ? module.path : base);
			}
		}, fn(module, module.exports), module.exports;
	}

	function commonjsRequire () {
		throw new Error('Dynamic requires are not currently supported by @rollup/plugin-commonjs');
	}

	var eventemitter2 = createCommonjsModule(function (module, exports) {
	!function(undefined$1) {
	  var hasOwnProperty= Object.hasOwnProperty;
	  var isArray = Array.isArray ? Array.isArray : function _isArray(obj) {
	    return Object.prototype.toString.call(obj) === "[object Array]";
	  };
	  var defaultMaxListeners = 10;
	  var nextTickSupported= typeof process=='object' && typeof process.nextTick=='function';
	  var symbolsSupported= typeof Symbol==='function';
	  var reflectSupported= typeof Reflect === 'object';
	  var setImmediateSupported= typeof setImmediate === 'function';
	  var _setImmediate= setImmediateSupported ? setImmediate : setTimeout;
	  var ownKeys= symbolsSupported? (reflectSupported && typeof Reflect.ownKeys==='function'? Reflect.ownKeys : function(obj){
	    var arr= Object.getOwnPropertyNames(obj);
	    arr.push.apply(arr, Object.getOwnPropertySymbols(obj));
	    return arr;
	  }) : Object.keys;

	  function init() {
	    this._events = {};
	    if (this._conf) {
	      configure.call(this, this._conf);
	    }
	  }

	  function configure(conf) {
	    if (conf) {
	      this._conf = conf;

	      conf.delimiter && (this.delimiter = conf.delimiter);

	      if(conf.maxListeners!==undefined$1){
	          this._maxListeners= conf.maxListeners;
	      }

	      conf.wildcard && (this.wildcard = conf.wildcard);
	      conf.newListener && (this._newListener = conf.newListener);
	      conf.removeListener && (this._removeListener = conf.removeListener);
	      conf.verboseMemoryLeak && (this.verboseMemoryLeak = conf.verboseMemoryLeak);
	      conf.ignoreErrors && (this.ignoreErrors = conf.ignoreErrors);

	      if (this.wildcard) {
	        this.listenerTree = {};
	      }
	    }
	  }

	  function logPossibleMemoryLeak(count, eventName) {
	    var errorMsg = '(node) warning: possible EventEmitter memory ' +
	        'leak detected. ' + count + ' listeners added. ' +
	        'Use emitter.setMaxListeners() to increase limit.';

	    if(this.verboseMemoryLeak){
	      errorMsg += ' Event name: ' + eventName + '.';
	    }

	    if(typeof process !== 'undefined' && process.emitWarning){
	      var e = new Error(errorMsg);
	      e.name = 'MaxListenersExceededWarning';
	      e.emitter = this;
	      e.count = count;
	      process.emitWarning(e);
	    } else {
	      console.error(errorMsg);

	      if (console.trace){
	        console.trace();
	      }
	    }
	  }

	  var toArray = function (a, b, c) {
	    var n = arguments.length;
	    switch (n) {
	      case 0:
	        return [];
	      case 1:
	        return [a];
	      case 2:
	        return [a, b];
	      case 3:
	        return [a, b, c];
	      default:
	        var arr = new Array(n);
	        while (n--) {
	          arr[n] = arguments[n];
	        }
	        return arr;
	    }
	  };

	  function toObject(keys, values) {
	    var obj = {};
	    var key;
	    var len = keys.length;
	    var valuesCount = values ? values.length : 0;
	    for (var i = 0; i < len; i++) {
	      key = keys[i];
	      obj[key] = i < valuesCount ? values[i] : undefined$1;
	    }
	    return obj;
	  }

	  function TargetObserver(emitter, target, options) {
	    this._emitter = emitter;
	    this._target = target;
	    this._listeners = {};
	    this._listenersCount = 0;

	    var on, off;

	    if (options.on || options.off) {
	      on = options.on;
	      off = options.off;
	    }

	    if (target.addEventListener) {
	      on = target.addEventListener;
	      off = target.removeEventListener;
	    } else if (target.addListener) {
	      on = target.addListener;
	      off = target.removeListener;
	    } else if (target.on) {
	      on = target.on;
	      off = target.off;
	    }

	    if (!on && !off) {
	      throw Error('target does not implement any known event API');
	    }

	    if (typeof on !== 'function') {
	      throw TypeError('on method must be a function');
	    }

	    if (typeof off !== 'function') {
	      throw TypeError('off method must be a function');
	    }

	    this._on = on;
	    this._off = off;

	    var _observers= emitter._observers;
	    if(_observers){
	      _observers.push(this);
	    }else {
	      emitter._observers= [this];
	    }
	  }

	  Object.assign(TargetObserver.prototype, {
	    subscribe: function(event, localEvent, reducer){
	      var observer= this;
	      var target= this._target;
	      var emitter= this._emitter;
	      var listeners= this._listeners;
	      var handler= function(){
	        var args= toArray.apply(null, arguments);
	        var eventObj= {
	          data: args,
	          name: localEvent,
	          original: event
	        };
	        if(reducer){
	          var result= reducer.call(target, eventObj);
	          if(result!==false){
	            emitter.emit.apply(emitter, [eventObj.name].concat(args));
	          }
	          return;
	        }
	        emitter.emit.apply(emitter, [localEvent].concat(args));
	      };


	      if(listeners[event]){
	        throw Error('Event \'' + event + '\' is already listening');
	      }

	      this._listenersCount++;

	      if(emitter._newListener && emitter._removeListener && !observer._onNewListener){

	        this._onNewListener = function (_event) {
	          if (_event === localEvent && listeners[event] === null) {
	            listeners[event] = handler;
	            observer._on.call(target, event, handler);
	          }
	        };

	        emitter.on('newListener', this._onNewListener);

	        this._onRemoveListener= function(_event){
	          if(_event === localEvent && !emitter.hasListeners(_event) && listeners[event]){
	            listeners[event]= null;
	            observer._off.call(target, event, handler);
	          }
	        };

	        listeners[event]= null;

	        emitter.on('removeListener', this._onRemoveListener);
	      }else {
	        listeners[event]= handler;
	        observer._on.call(target, event, handler);
	      }
	    },

	    unsubscribe: function(event){
	      var observer= this;
	      var listeners= this._listeners;
	      var emitter= this._emitter;
	      var handler;
	      var events;
	      var off= this._off;
	      var target= this._target;
	      var i;

	      if(event && typeof event!=='string'){
	        throw TypeError('event must be a string');
	      }

	      function clearRefs(){
	        if(observer._onNewListener){
	          emitter.off('newListener', observer._onNewListener);
	          emitter.off('removeListener', observer._onRemoveListener);
	          observer._onNewListener= null;
	          observer._onRemoveListener= null;
	        }
	        var index= findTargetIndex.call(emitter, observer);
	        emitter._observers.splice(index, 1);
	      }

	      if(event){
	        handler= listeners[event];
	        if(!handler) return;
	        off.call(target, event, handler);
	        delete listeners[event];
	        if(!--this._listenersCount){
	          clearRefs();
	        }
	      }else {
	        events= ownKeys(listeners);
	        i= events.length;
	        while(i-->0){
	          event= events[i];
	          off.call(target, event, listeners[event]);
	        }
	        this._listeners= {};
	        this._listenersCount= 0;
	        clearRefs();
	      }
	    }
	  });

	  function resolveOptions(options, schema, reducers, allowUnknown) {
	    var computedOptions = Object.assign({}, schema);

	    if (!options) return computedOptions;

	    if (typeof options !== 'object') {
	      throw TypeError('options must be an object')
	    }

	    var keys = Object.keys(options);
	    var length = keys.length;
	    var option, value;
	    var reducer;

	    function reject(reason) {
	      throw Error('Invalid "' + option + '" option value' + (reason ? '. Reason: ' + reason : ''))
	    }

	    for (var i = 0; i < length; i++) {
	      option = keys[i];
	      if (!allowUnknown && !hasOwnProperty.call(schema, option)) {
	        throw Error('Unknown "' + option + '" option');
	      }
	      value = options[option];
	      if (value !== undefined$1) {
	        reducer = reducers[option];
	        computedOptions[option] = reducer ? reducer(value, reject) : value;
	      }
	    }
	    return computedOptions;
	  }

	  function constructorReducer(value, reject) {
	    if (typeof value !== 'function' || !value.hasOwnProperty('prototype')) {
	      reject('value must be a constructor');
	    }
	    return value;
	  }

	  function makeTypeReducer(types) {
	    var message= 'value must be type of ' + types.join('|');
	    var len= types.length;
	    var firstType= types[0];
	    var secondType= types[1];

	    if (len === 1) {
	      return function (v, reject) {
	        if (typeof v === firstType) {
	          return v;
	        }
	        reject(message);
	      }
	    }

	    if (len === 2) {
	      return function (v, reject) {
	        var kind= typeof v;
	        if (kind === firstType || kind === secondType) return v;
	        reject(message);
	      }
	    }

	    return function (v, reject) {
	      var kind = typeof v;
	      var i = len;
	      while (i-- > 0) {
	        if (kind === types[i]) return v;
	      }
	      reject(message);
	    }
	  }

	  var functionReducer= makeTypeReducer(['function']);

	  var objectFunctionReducer= makeTypeReducer(['object', 'function']);

	  function makeCancelablePromise(Promise, executor, options) {
	    var isCancelable;
	    var callbacks;
	    var timer= 0;
	    var subscriptionClosed;

	    var promise = new Promise(function (resolve, reject, onCancel) {
	      options= resolveOptions(options, {
	        timeout: 0,
	        overload: false
	      }, {
	        timeout: function(value, reject){
	          value*= 1;
	          if (typeof value !== 'number' || value < 0 || !Number.isFinite(value)) {
	            reject('timeout must be a positive number');
	          }
	          return value;
	        }
	      });

	      isCancelable = !options.overload && typeof Promise.prototype.cancel === 'function' && typeof onCancel === 'function';

	      function cleanup() {
	        if (callbacks) {
	          callbacks = null;
	        }
	        if (timer) {
	          clearTimeout(timer);
	          timer = 0;
	        }
	      }

	      var _resolve= function(value){
	        cleanup();
	        resolve(value);
	      };

	      var _reject= function(err){
	        cleanup();
	        reject(err);
	      };

	      if (isCancelable) {
	        executor(_resolve, _reject, onCancel);
	      } else {
	        callbacks = [function(reason){
	          _reject(reason || Error('canceled'));
	        }];
	        executor(_resolve, _reject, function (cb) {
	          if (subscriptionClosed) {
	            throw Error('Unable to subscribe on cancel event asynchronously')
	          }
	          if (typeof cb !== 'function') {
	            throw TypeError('onCancel callback must be a function');
	          }
	          callbacks.push(cb);
	        });
	        subscriptionClosed= true;
	      }

	      if (options.timeout > 0) {
	        timer= setTimeout(function(){
	          var reason= Error('timeout');
	          reason.code = 'ETIMEDOUT';
	          timer= 0;
	          promise.cancel(reason);
	          reject(reason);
	        }, options.timeout);
	      }
	    });

	    if (!isCancelable) {
	      promise.cancel = function (reason) {
	        if (!callbacks) {
	          return;
	        }
	        var length = callbacks.length;
	        for (var i = 1; i < length; i++) {
	          callbacks[i](reason);
	        }
	        // internal callback to reject the promise
	        callbacks[0](reason);
	        callbacks = null;
	      };
	    }

	    return promise;
	  }

	  function findTargetIndex(observer) {
	    var observers = this._observers;
	    if(!observers){
	      return -1;
	    }
	    var len = observers.length;
	    for (var i = 0; i < len; i++) {
	      if (observers[i]._target === observer) return i;
	    }
	    return -1;
	  }

	  // Attention, function return type now is array, always !
	  // It has zero elements if no any matches found and one or more
	  // elements (leafs) if there are matches
	  //
	  function searchListenerTree(handlers, type, tree, i, typeLength) {
	    if (!tree) {
	      return null;
	    }

	    if (i === 0) {
	      var kind = typeof type;
	      if (kind === 'string') {
	        var ns, n, l = 0, j = 0, delimiter = this.delimiter, dl = delimiter.length;
	        if ((n = type.indexOf(delimiter)) !== -1) {
	          ns = new Array(5);
	          do {
	            ns[l++] = type.slice(j, n);
	            j = n + dl;
	          } while ((n = type.indexOf(delimiter, j)) !== -1);

	          ns[l++] = type.slice(j);
	          type = ns;
	          typeLength = l;
	        } else {
	          type = [type];
	          typeLength = 1;
	        }
	      } else if (kind === 'object') {
	        typeLength = type.length;
	      } else {
	        type = [type];
	        typeLength = 1;
	      }
	    }

	    var listeners= null, branch, xTree, xxTree, isolatedBranch, endReached, currentType = type[i],
	        nextType = type[i + 1], branches, _listeners;

	    if (i === typeLength) {
	      //
	      // If at the end of the event(s) list and the tree has listeners
	      // invoke those listeners.
	      //

	      if(tree._listeners) {
	        if (typeof tree._listeners === 'function') {
	          handlers && handlers.push(tree._listeners);
	          listeners = [tree];
	        } else {
	          handlers && handlers.push.apply(handlers, tree._listeners);
	          listeners = [tree];
	        }
	      }
	    } else {

	      if (currentType === '*') {
	        //
	        // If the event emitted is '*' at this part
	        // or there is a concrete match at this patch
	        //
	        branches = ownKeys(tree);
	        n = branches.length;
	        while (n-- > 0) {
	          branch = branches[n];
	          if (branch !== '_listeners') {
	            _listeners = searchListenerTree(handlers, type, tree[branch], i + 1, typeLength);
	            if (_listeners) {
	              if (listeners) {
	                listeners.push.apply(listeners, _listeners);
	              } else {
	                listeners = _listeners;
	              }
	            }
	          }
	        }
	        return listeners;
	      } else if (currentType === '**') {
	        endReached = (i + 1 === typeLength || (i + 2 === typeLength && nextType === '*'));
	        if (endReached && tree._listeners) {
	          // The next element has a _listeners, add it to the handlers.
	          listeners = searchListenerTree(handlers, type, tree, typeLength, typeLength);
	        }

	        branches = ownKeys(tree);
	        n = branches.length;
	        while (n-- > 0) {
	          branch = branches[n];
	          if (branch !== '_listeners') {
	            if (branch === '*' || branch === '**') {
	              if (tree[branch]._listeners && !endReached) {
	                _listeners = searchListenerTree(handlers, type, tree[branch], typeLength, typeLength);
	                if (_listeners) {
	                  if (listeners) {
	                    listeners.push.apply(listeners, _listeners);
	                  } else {
	                    listeners = _listeners;
	                  }
	                }
	              }
	              _listeners = searchListenerTree(handlers, type, tree[branch], i, typeLength);
	            } else if (branch === nextType) {
	              _listeners = searchListenerTree(handlers, type, tree[branch], i + 2, typeLength);
	            } else {
	              // No match on this one, shift into the tree but not in the type array.
	              _listeners = searchListenerTree(handlers, type, tree[branch], i, typeLength);
	            }
	            if (_listeners) {
	              if (listeners) {
	                listeners.push.apply(listeners, _listeners);
	              } else {
	                listeners = _listeners;
	              }
	            }
	          }
	        }
	        return listeners;
	      } else if (tree[currentType]) {
	        listeners = searchListenerTree(handlers, type, tree[currentType], i + 1, typeLength);
	      }
	    }

	      xTree = tree['*'];
	    if (xTree) {
	      //
	      // If the listener tree will allow any match for this part,
	      // then recursively explore all branches of the tree
	      //
	      searchListenerTree(handlers, type, xTree, i + 1, typeLength);
	    }

	    xxTree = tree['**'];
	    if (xxTree) {
	      if (i < typeLength) {
	        if (xxTree._listeners) {
	          // If we have a listener on a '**', it will catch all, so add its handler.
	          searchListenerTree(handlers, type, xxTree, typeLength, typeLength);
	        }

	        // Build arrays of matching next branches and others.
	        branches= ownKeys(xxTree);
	        n= branches.length;
	        while(n-->0){
	          branch= branches[n];
	          if (branch !== '_listeners') {
	            if (branch === nextType) {
	              // We know the next element will match, so jump twice.
	              searchListenerTree(handlers, type, xxTree[branch], i + 2, typeLength);
	            } else if (branch === currentType) {
	              // Current node matches, move into the tree.
	              searchListenerTree(handlers, type, xxTree[branch], i + 1, typeLength);
	            } else {
	              isolatedBranch = {};
	              isolatedBranch[branch] = xxTree[branch];
	              searchListenerTree(handlers, type, {'**': isolatedBranch}, i + 1, typeLength);
	            }
	          }
	        }
	      } else if (xxTree._listeners) {
	        // We have reached the end and still on a '**'
	        searchListenerTree(handlers, type, xxTree, typeLength, typeLength);
	      } else if (xxTree['*'] && xxTree['*']._listeners) {
	        searchListenerTree(handlers, type, xxTree['*'], typeLength, typeLength);
	      }
	    }

	    return listeners;
	  }

	  function growListenerTree(type, listener, prepend) {
	    var len = 0, j = 0, i, delimiter = this.delimiter, dl= delimiter.length, ns;

	    if(typeof type==='string') {
	      if ((i = type.indexOf(delimiter)) !== -1) {
	        ns = new Array(5);
	        do {
	          ns[len++] = type.slice(j, i);
	          j = i + dl;
	        } while ((i = type.indexOf(delimiter, j)) !== -1);

	        ns[len++] = type.slice(j);
	      }else {
	        ns= [type];
	        len= 1;
	      }
	    }else {
	      ns= type;
	      len= type.length;
	    }

	    //
	    // Looks for two consecutive '**', if so, don't add the event at all.
	    //
	    if (len > 1) {
	      for (i = 0; i + 1 < len; i++) {
	        if (ns[i] === '**' && ns[i + 1] === '**') {
	          return;
	        }
	      }
	    }



	    var tree = this.listenerTree, name;

	    for (i = 0; i < len; i++) {
	      name = ns[i];

	      tree = tree[name] || (tree[name] = {});

	      if (i === len - 1) {
	        if (!tree._listeners) {
	          tree._listeners = listener;
	        } else {
	          if (typeof tree._listeners === 'function') {
	            tree._listeners = [tree._listeners];
	          }

	          if (prepend) {
	            tree._listeners.unshift(listener);
	          } else {
	            tree._listeners.push(listener);
	          }

	          if (
	              !tree._listeners.warned &&
	              this._maxListeners > 0 &&
	              tree._listeners.length > this._maxListeners
	          ) {
	            tree._listeners.warned = true;
	            logPossibleMemoryLeak.call(this, tree._listeners.length, name);
	          }
	        }
	        return true;
	      }
	    }

	    return true;
	  }

	  function collectTreeEvents(tree, events, root, asArray){
	     var branches= ownKeys(tree);
	     var i= branches.length;
	     var branch, branchName, path;
	     var hasListeners= tree['_listeners'];
	     var isArrayPath;

	     while(i-->0){
	         branchName= branches[i];

	         branch= tree[branchName];

	         if(branchName==='_listeners'){
	             path= root;
	         }else {
	             path = root ? root.concat(branchName) : [branchName];
	         }

	         isArrayPath= asArray || typeof branchName==='symbol';

	         hasListeners && events.push(isArrayPath? path : path.join(this.delimiter));

	         if(typeof branch==='object'){
	             collectTreeEvents.call(this, branch, events, path, isArrayPath);
	         }
	     }

	     return events;
	  }

	  function recursivelyGarbageCollect(root) {
	    var keys = ownKeys(root);
	    var i= keys.length;
	    var obj, key, flag;
	    while(i-->0){
	      key = keys[i];
	      obj = root[key];

	      if(obj){
	          flag= true;
	          if(key !== '_listeners' && !recursivelyGarbageCollect(obj)){
	             delete root[key];
	          }
	      }
	    }

	    return flag;
	  }

	  function Listener(emitter, event, listener){
	    this.emitter= emitter;
	    this.event= event;
	    this.listener= listener;
	  }

	  Listener.prototype.off= function(){
	    this.emitter.off(this.event, this.listener);
	    return this;
	  };

	  function setupListener(event, listener, options){
	      if (options === true) {
	        promisify = true;
	      } else if (options === false) {
	        async = true;
	      } else {
	        if (!options || typeof options !== 'object') {
	          throw TypeError('options should be an object or true');
	        }
	        var async = options.async;
	        var promisify = options.promisify;
	        var nextTick = options.nextTick;
	        var objectify = options.objectify;
	      }

	      if (async || nextTick || promisify) {
	        var _listener = listener;
	        var _origin = listener._origin || listener;

	        if (nextTick && !nextTickSupported) {
	          throw Error('process.nextTick is not supported');
	        }

	        if (promisify === undefined$1) {
	          promisify = listener.constructor.name === 'AsyncFunction';
	        }

	        listener = function () {
	          var args = arguments;
	          var context = this;
	          var event = this.event;

	          return promisify ? (nextTick ? Promise.resolve() : new Promise(function (resolve) {
	            _setImmediate(resolve);
	          }).then(function () {
	            context.event = event;
	            return _listener.apply(context, args)
	          })) : (nextTick ? process.nextTick : _setImmediate)(function () {
	            context.event = event;
	            _listener.apply(context, args);
	          });
	        };

	        listener._async = true;
	        listener._origin = _origin;
	      }

	    return [listener, objectify? new Listener(this, event, listener): this];
	  }

	  function EventEmitter(conf) {
	    this._events = {};
	    this._newListener = false;
	    this._removeListener = false;
	    this.verboseMemoryLeak = false;
	    configure.call(this, conf);
	  }

	  EventEmitter.EventEmitter2 = EventEmitter; // backwards compatibility for exporting EventEmitter property

	  EventEmitter.prototype.listenTo= function(target, events, options){
	    if(typeof target!=='object'){
	      throw TypeError('target musts be an object');
	    }

	    var emitter= this;

	    options = resolveOptions(options, {
	      on: undefined$1,
	      off: undefined$1,
	      reducers: undefined$1
	    }, {
	      on: functionReducer,
	      off: functionReducer,
	      reducers: objectFunctionReducer
	    });

	    function listen(events){
	      if(typeof events!=='object'){
	        throw TypeError('events must be an object');
	      }

	      var reducers= options.reducers;
	      var index= findTargetIndex.call(emitter, target);
	      var observer;

	      if(index===-1){
	        observer= new TargetObserver(emitter, target, options);
	      }else {
	        observer= emitter._observers[index];
	      }

	      var keys= ownKeys(events);
	      var len= keys.length;
	      var event;
	      var isSingleReducer= typeof reducers==='function';

	      for(var i=0; i<len; i++){
	        event= keys[i];
	        observer.subscribe(
	            event,
	            events[event] || event,
	            isSingleReducer ? reducers : reducers && reducers[event]
	        );
	      }
	    }

	    isArray(events)?
	        listen(toObject(events)) :
	        (typeof events==='string'? listen(toObject(events.split(/\s+/))): listen(events));

	    return this;
	  };

	  EventEmitter.prototype.stopListeningTo = function (target, event) {
	    var observers = this._observers;

	    if(!observers){
	      return false;
	    }

	    var i = observers.length;
	    var observer;
	    var matched= false;

	    if(target && typeof target!=='object'){
	      throw TypeError('target should be an object');
	    }

	    while (i-- > 0) {
	      observer = observers[i];
	      if (!target || observer._target === target) {
	        observer.unsubscribe(event);
	        matched= true;
	      }
	    }

	    return matched;
	  };

	  // By default EventEmitters will print a warning if more than
	  // 10 listeners are added to it. This is a useful default which
	  // helps finding memory leaks.
	  //
	  // Obviously not all Emitters should be limited to 10. This function allows
	  // that to be increased. Set to zero for unlimited.

	  EventEmitter.prototype.delimiter = '.';

	  EventEmitter.prototype.setMaxListeners = function(n) {
	    if (n !== undefined$1) {
	      this._maxListeners = n;
	      if (!this._conf) this._conf = {};
	      this._conf.maxListeners = n;
	    }
	  };

	  EventEmitter.prototype.getMaxListeners = function() {
	    return this._maxListeners;
	  };

	  EventEmitter.prototype.event = '';

	  EventEmitter.prototype.once = function(event, fn, options) {
	    return this._once(event, fn, false, options);
	  };

	  EventEmitter.prototype.prependOnceListener = function(event, fn, options) {
	    return this._once(event, fn, true, options);
	  };

	  EventEmitter.prototype._once = function(event, fn, prepend, options) {
	    return this._many(event, 1, fn, prepend, options);
	  };

	  EventEmitter.prototype.many = function(event, ttl, fn, options) {
	    return this._many(event, ttl, fn, false, options);
	  };

	  EventEmitter.prototype.prependMany = function(event, ttl, fn, options) {
	    return this._many(event, ttl, fn, true, options);
	  };

	  EventEmitter.prototype._many = function(event, ttl, fn, prepend, options) {
	    var self = this;

	    if (typeof fn !== 'function') {
	      throw new Error('many only accepts instances of Function');
	    }

	    function listener() {
	      if (--ttl === 0) {
	        self.off(event, listener);
	      }
	      return fn.apply(this, arguments);
	    }

	    listener._origin = fn;

	    return this._on(event, listener, prepend, options);
	  };

	  EventEmitter.prototype.emit = function() {
	    if (!this._events && !this._all) {
	      return false;
	    }

	    this._events || init.call(this);

	    var type = arguments[0], ns, wildcard= this.wildcard;
	    var args,l,i,j, containsSymbol;

	    if (type === 'newListener' && !this._newListener) {
	      if (!this._events.newListener) {
	        return false;
	      }
	    }

	    if (wildcard) {
	      ns= type;
	      if(type!=='newListener' && type!=='removeListener'){
	        if (typeof type === 'object') {
	          l = type.length;
	          if (symbolsSupported) {
	            for (i = 0; i < l; i++) {
	              if (typeof type[i] === 'symbol') {
	                containsSymbol = true;
	                break;
	              }
	            }
	          }
	          if (!containsSymbol) {
	            type = type.join(this.delimiter);
	          }
	        }
	      }
	    }

	    var al = arguments.length;
	    var handler;

	    if (this._all && this._all.length) {
	      handler = this._all.slice();

	      for (i = 0, l = handler.length; i < l; i++) {
	        this.event = type;
	        switch (al) {
	        case 1:
	          handler[i].call(this, type);
	          break;
	        case 2:
	          handler[i].call(this, type, arguments[1]);
	          break;
	        case 3:
	          handler[i].call(this, type, arguments[1], arguments[2]);
	          break;
	        default:
	          handler[i].apply(this, arguments);
	        }
	      }
	    }

	    if (wildcard) {
	      handler = [];
	      searchListenerTree.call(this, handler, ns, this.listenerTree, 0, l);
	    } else {
	      handler = this._events[type];
	      if (typeof handler === 'function') {
	        this.event = type;
	        switch (al) {
	        case 1:
	          handler.call(this);
	          break;
	        case 2:
	          handler.call(this, arguments[1]);
	          break;
	        case 3:
	          handler.call(this, arguments[1], arguments[2]);
	          break;
	        default:
	          args = new Array(al - 1);
	          for (j = 1; j < al; j++) args[j - 1] = arguments[j];
	          handler.apply(this, args);
	        }
	        return true;
	      } else if (handler) {
	        // need to make copy of handlers because list can change in the middle
	        // of emit call
	        handler = handler.slice();
	      }
	    }

	    if (handler && handler.length) {
	      if (al > 3) {
	        args = new Array(al - 1);
	        for (j = 1; j < al; j++) args[j - 1] = arguments[j];
	      }
	      for (i = 0, l = handler.length; i < l; i++) {
	        this.event = type;
	        switch (al) {
	        case 1:
	          handler[i].call(this);
	          break;
	        case 2:
	          handler[i].call(this, arguments[1]);
	          break;
	        case 3:
	          handler[i].call(this, arguments[1], arguments[2]);
	          break;
	        default:
	          handler[i].apply(this, args);
	        }
	      }
	      return true;
	    } else if (!this.ignoreErrors && !this._all && type === 'error') {
	      if (arguments[1] instanceof Error) {
	        throw arguments[1]; // Unhandled 'error' event
	      } else {
	        throw new Error("Uncaught, unspecified 'error' event.");
	      }
	    }

	    return !!this._all;
	  };

	  EventEmitter.prototype.emitAsync = function() {
	    if (!this._events && !this._all) {
	      return false;
	    }

	    this._events || init.call(this);

	    var type = arguments[0], wildcard= this.wildcard, ns, containsSymbol;
	    var args,l,i,j;

	    if (type === 'newListener' && !this._newListener) {
	        if (!this._events.newListener) { return Promise.resolve([false]); }
	    }

	    if (wildcard) {
	      ns= type;
	      if(type!=='newListener' && type!=='removeListener'){
	        if (typeof type === 'object') {
	          l = type.length;
	          if (symbolsSupported) {
	            for (i = 0; i < l; i++) {
	              if (typeof type[i] === 'symbol') {
	                containsSymbol = true;
	                break;
	              }
	            }
	          }
	          if (!containsSymbol) {
	            type = type.join(this.delimiter);
	          }
	        }
	      }
	    }

	    var promises= [];

	    var al = arguments.length;
	    var handler;

	    if (this._all) {
	      for (i = 0, l = this._all.length; i < l; i++) {
	        this.event = type;
	        switch (al) {
	        case 1:
	          promises.push(this._all[i].call(this, type));
	          break;
	        case 2:
	          promises.push(this._all[i].call(this, type, arguments[1]));
	          break;
	        case 3:
	          promises.push(this._all[i].call(this, type, arguments[1], arguments[2]));
	          break;
	        default:
	          promises.push(this._all[i].apply(this, arguments));
	        }
	      }
	    }

	    if (wildcard) {
	      handler = [];
	      searchListenerTree.call(this, handler, ns, this.listenerTree, 0);
	    } else {
	      handler = this._events[type];
	    }

	    if (typeof handler === 'function') {
	      this.event = type;
	      switch (al) {
	      case 1:
	        promises.push(handler.call(this));
	        break;
	      case 2:
	        promises.push(handler.call(this, arguments[1]));
	        break;
	      case 3:
	        promises.push(handler.call(this, arguments[1], arguments[2]));
	        break;
	      default:
	        args = new Array(al - 1);
	        for (j = 1; j < al; j++) args[j - 1] = arguments[j];
	        promises.push(handler.apply(this, args));
	      }
	    } else if (handler && handler.length) {
	      handler = handler.slice();
	      if (al > 3) {
	        args = new Array(al - 1);
	        for (j = 1; j < al; j++) args[j - 1] = arguments[j];
	      }
	      for (i = 0, l = handler.length; i < l; i++) {
	        this.event = type;
	        switch (al) {
	        case 1:
	          promises.push(handler[i].call(this));
	          break;
	        case 2:
	          promises.push(handler[i].call(this, arguments[1]));
	          break;
	        case 3:
	          promises.push(handler[i].call(this, arguments[1], arguments[2]));
	          break;
	        default:
	          promises.push(handler[i].apply(this, args));
	        }
	      }
	    } else if (!this.ignoreErrors && !this._all && type === 'error') {
	      if (arguments[1] instanceof Error) {
	        return Promise.reject(arguments[1]); // Unhandled 'error' event
	      } else {
	        return Promise.reject("Uncaught, unspecified 'error' event.");
	      }
	    }

	    return Promise.all(promises);
	  };

	  EventEmitter.prototype.on = function(type, listener, options) {
	    return this._on(type, listener, false, options);
	  };

	  EventEmitter.prototype.prependListener = function(type, listener, options) {
	    return this._on(type, listener, true, options);
	  };

	  EventEmitter.prototype.onAny = function(fn) {
	    return this._onAny(fn, false);
	  };

	  EventEmitter.prototype.prependAny = function(fn) {
	    return this._onAny(fn, true);
	  };

	  EventEmitter.prototype.addListener = EventEmitter.prototype.on;

	  EventEmitter.prototype._onAny = function(fn, prepend){
	    if (typeof fn !== 'function') {
	      throw new Error('onAny only accepts instances of Function');
	    }

	    if (!this._all) {
	      this._all = [];
	    }

	    // Add the function to the event listener collection.
	    if(prepend){
	      this._all.unshift(fn);
	    }else {
	      this._all.push(fn);
	    }

	    return this;
	  };

	  EventEmitter.prototype._on = function(type, listener, prepend, options) {
	    if (typeof type === 'function') {
	      this._onAny(type, listener);
	      return this;
	    }

	    if (typeof listener !== 'function') {
	      throw new Error('on only accepts instances of Function');
	    }
	    this._events || init.call(this);

	    var returnValue= this, temp;

	    if (options !== undefined$1) {
	      temp = setupListener.call(this, type, listener, options);
	      listener = temp[0];
	      returnValue = temp[1];
	    }

	    // To avoid recursion in the case that type == "newListeners"! Before
	    // adding it to the listeners, first emit "newListeners".
	    if (this._newListener) {
	      this.emit('newListener', type, listener);
	    }

	    if (this.wildcard) {
	      growListenerTree.call(this, type, listener, prepend);
	      return returnValue;
	    }

	    if (!this._events[type]) {
	      // Optimize the case of one listener. Don't need the extra array object.
	      this._events[type] = listener;
	    } else {
	      if (typeof this._events[type] === 'function') {
	        // Change to array.
	        this._events[type] = [this._events[type]];
	      }

	      // If we've already got an array, just add
	      if(prepend){
	        this._events[type].unshift(listener);
	      }else {
	        this._events[type].push(listener);
	      }

	      // Check for listener leak
	      if (
	        !this._events[type].warned &&
	        this._maxListeners > 0 &&
	        this._events[type].length > this._maxListeners
	      ) {
	        this._events[type].warned = true;
	        logPossibleMemoryLeak.call(this, this._events[type].length, type);
	      }
	    }

	    return returnValue;
	  };

	  EventEmitter.prototype.off = function(type, listener) {
	    if (typeof listener !== 'function') {
	      throw new Error('removeListener only takes instances of Function');
	    }

	    var handlers,leafs=[];

	    if(this.wildcard) {
	      var ns = typeof type === 'string' ? type.split(this.delimiter) : type.slice();
	      leafs = searchListenerTree.call(this, null, ns, this.listenerTree, 0);
	      if(!leafs) return this;
	    } else {
	      // does not use listeners(), so no side effect of creating _events[type]
	      if (!this._events[type]) return this;
	      handlers = this._events[type];
	      leafs.push({_listeners:handlers});
	    }

	    for (var iLeaf=0; iLeaf<leafs.length; iLeaf++) {
	      var leaf = leafs[iLeaf];
	      handlers = leaf._listeners;
	      if (isArray(handlers)) {

	        var position = -1;

	        for (var i = 0, length = handlers.length; i < length; i++) {
	          if (handlers[i] === listener ||
	            (handlers[i].listener && handlers[i].listener === listener) ||
	            (handlers[i]._origin && handlers[i]._origin === listener)) {
	            position = i;
	            break;
	          }
	        }

	        if (position < 0) {
	          continue;
	        }

	        if(this.wildcard) {
	          leaf._listeners.splice(position, 1);
	        }
	        else {
	          this._events[type].splice(position, 1);
	        }

	        if (handlers.length === 0) {
	          if(this.wildcard) {
	            delete leaf._listeners;
	          }
	          else {
	            delete this._events[type];
	          }
	        }
	        if (this._removeListener)
	          this.emit("removeListener", type, listener);

	        return this;
	      }
	      else if (handlers === listener ||
	        (handlers.listener && handlers.listener === listener) ||
	        (handlers._origin && handlers._origin === listener)) {
	        if(this.wildcard) {
	          delete leaf._listeners;
	        }
	        else {
	          delete this._events[type];
	        }
	        if (this._removeListener)
	          this.emit("removeListener", type, listener);
	      }
	    }

	    this.listenerTree && recursivelyGarbageCollect(this.listenerTree);

	    return this;
	  };

	  EventEmitter.prototype.offAny = function(fn) {
	    var i = 0, l = 0, fns;
	    if (fn && this._all && this._all.length > 0) {
	      fns = this._all;
	      for(i = 0, l = fns.length; i < l; i++) {
	        if(fn === fns[i]) {
	          fns.splice(i, 1);
	          if (this._removeListener)
	            this.emit("removeListenerAny", fn);
	          return this;
	        }
	      }
	    } else {
	      fns = this._all;
	      if (this._removeListener) {
	        for(i = 0, l = fns.length; i < l; i++)
	          this.emit("removeListenerAny", fns[i]);
	      }
	      this._all = [];
	    }
	    return this;
	  };

	  EventEmitter.prototype.removeListener = EventEmitter.prototype.off;

	  EventEmitter.prototype.removeAllListeners = function (type) {
	    if (type === undefined$1) {
	      !this._events || init.call(this);
	      return this;
	    }

	    if (this.wildcard) {
	      var leafs = searchListenerTree.call(this, null, type, this.listenerTree, 0), leaf, i;
	      if (!leafs) return this;
	      for (i = 0; i < leafs.length; i++) {
	        leaf = leafs[i];
	        leaf._listeners = null;
	      }
	      this.listenerTree && recursivelyGarbageCollect(this.listenerTree);
	    } else if (this._events) {
	      this._events[type] = null;
	    }
	    return this;
	  };

	  EventEmitter.prototype.listeners = function (type) {
	    var _events = this._events;
	    var keys, listeners, allListeners;
	    var i;
	    var listenerTree;

	    if (type === undefined$1) {
	      if (this.wildcard) {
	        throw Error('event name required for wildcard emitter');
	      }

	      if (!_events) {
	        return [];
	      }

	      keys = ownKeys(_events);
	      i = keys.length;
	      allListeners = [];
	      while (i-- > 0) {
	        listeners = _events[keys[i]];
	        if (typeof listeners === 'function') {
	          allListeners.push(listeners);
	        } else {
	          allListeners.push.apply(allListeners, listeners);
	        }
	      }
	      return allListeners;
	    } else {
	      if (this.wildcard) {
	        listenerTree= this.listenerTree;
	        if(!listenerTree) return [];
	        var handlers = [];
	        var ns = typeof type === 'string' ? type.split(this.delimiter) : type.slice();
	        searchListenerTree.call(this, handlers, ns, listenerTree, 0);
	        return handlers;
	      }

	      if (!_events) {
	        return [];
	      }

	      listeners = _events[type];

	      if (!listeners) {
	        return [];
	      }
	      return typeof listeners === 'function' ? [listeners] : listeners;
	    }
	  };

	  EventEmitter.prototype.eventNames = function(nsAsArray){
	    var _events= this._events;
	    return this.wildcard? collectTreeEvents.call(this, this.listenerTree, [], null, nsAsArray) : (_events? ownKeys(_events) : []);
	  };

	  EventEmitter.prototype.listenerCount = function(type) {
	    return this.listeners(type).length;
	  };

	  EventEmitter.prototype.hasListeners = function (type) {
	    if (this.wildcard) {
	      var handlers = [];
	      var ns = typeof type === 'string' ? type.split(this.delimiter) : type.slice();
	      searchListenerTree.call(this, handlers, ns, this.listenerTree, 0);
	      return handlers.length > 0;
	    }

	    var _events = this._events;
	    var _all = this._all;

	    return !!(_all && _all.length || _events && (type === undefined$1 ? ownKeys(_events).length : _events[type]));
	  };

	  EventEmitter.prototype.listenersAny = function() {

	    if(this._all) {
	      return this._all;
	    }
	    else {
	      return [];
	    }

	  };

	  EventEmitter.prototype.waitFor = function (event, options) {
	    var self = this;
	    var type = typeof options;
	    if (type === 'number') {
	      options = {timeout: options};
	    } else if (type === 'function') {
	      options = {filter: options};
	    }

	    options= resolveOptions(options, {
	      timeout: 0,
	      filter: undefined$1,
	      handleError: false,
	      Promise: Promise,
	      overload: false
	    }, {
	      filter: functionReducer,
	      Promise: constructorReducer
	    });

	    return makeCancelablePromise(options.Promise, function (resolve, reject, onCancel) {
	      function listener() {
	        var filter= options.filter;
	        if (filter && !filter.apply(self, arguments)) {
	          return;
	        }
	        self.off(event, listener);
	        if (options.handleError) {
	          var err = arguments[0];
	          err ? reject(err) : resolve(toArray.apply(null, arguments).slice(1));
	        } else {
	          resolve(toArray.apply(null, arguments));
	        }
	      }

	      onCancel(function(){
	        self.off(event, listener);
	      });

	      self._on(event, listener, false);
	    }, {
	      timeout: options.timeout,
	      overload: options.overload
	    })
	  };

	  function once(emitter, name, options) {
	    options= resolveOptions(options, {
	      Promise: Promise,
	      timeout: 0,
	      overload: false
	    }, {
	      Promise: constructorReducer
	    });

	    var _Promise= options.Promise;

	    return makeCancelablePromise(_Promise, function(resolve, reject, onCancel){
	      var handler;
	      if (typeof emitter.addEventListener === 'function') {
	        handler=  function () {
	          resolve(toArray.apply(null, arguments));
	        };

	        onCancel(function(){
	          emitter.removeEventListener(name, handler);
	        });

	        emitter.addEventListener(
	            name,
	            handler,
	            {once: true}
	        );
	        return;
	      }

	      var eventListener = function(){
	        errorListener && emitter.removeListener('error', errorListener);
	        resolve(toArray.apply(null, arguments));
	      };

	      var errorListener;

	      if (name !== 'error') {
	        errorListener = function (err){
	          emitter.removeListener(name, eventListener);
	          reject(err);
	        };

	        emitter.once('error', errorListener);
	      }

	      onCancel(function(){
	        errorListener && emitter.removeListener('error', errorListener);
	        emitter.removeListener(name, eventListener);
	      });

	      emitter.once(name, eventListener);
	    }, {
	      timeout: options.timeout,
	      overload: options.overload
	    });
	  }

	  var prototype= EventEmitter.prototype;

	  Object.defineProperties(EventEmitter, {
	    defaultMaxListeners: {
	      get: function () {
	        return prototype._maxListeners;
	      },
	      set: function (n) {
	        if (typeof n !== 'number' || n < 0 || Number.isNaN(n)) {
	          throw TypeError('n must be a non-negative number')
	        }
	        prototype._maxListeners = n;
	      },
	      enumerable: true
	    },
	    once: {
	      value: once,
	      writable: true,
	      configurable: true
	    }
	  });

	  Object.defineProperties(prototype, {
	      _maxListeners: {
	          value: defaultMaxListeners,
	          writable: true,
	          configurable: true
	      },
	      _observers: {value: null, writable: true, configurable: true}
	  });

	  if (typeof undefined$1 === 'function' && undefined$1.amd) {
	     // AMD. Register as an anonymous module.
	    undefined$1(function() {
	      return EventEmitter;
	    });
	  } else {
	    // CommonJS
	    module.exports = EventEmitter;
	  }
	}();
	});

	/*
	 * moleculer
	 * Copyright (c) 2023 MoleculerJS (https://github.com/moleculerjs/moleculer)
	 * MIT Licensed
	 */

	/**
	 * Import types
	 *
	 * @typedef {import("./packets").Packet} PacketClass
	 * @typedef {import("./packets").PacketType} PacketType
	 */

	// Packet types
	const PACKET_UNKNOWN = "???";
	const PACKET_EVENT = "EVENT";
	const PACKET_REQUEST = "REQ";
	const PACKET_RESPONSE = "RES";
	const PACKET_DISCOVER = "DISCOVER";
	const PACKET_INFO = "INFO";
	const PACKET_DISCONNECT = "DISCONNECT";
	const PACKET_HEARTBEAT = "HEARTBEAT";
	const PACKET_PING = "PING";
	const PACKET_PONG = "PONG";

	const PACKET_GOSSIP_REQ = "GOSSIP_REQ";
	const PACKET_GOSSIP_RES = "GOSSIP_RES";
	const PACKET_GOSSIP_HELLO = "GOSSIP_HELLO";

	const DATATYPE_UNDEFINED = 0;
	const DATATYPE_NULL = 1;
	const DATATYPE_JSON = 2;
	const DATATYPE_BUFFER = 3;

	/**
	 * Packet for transporters
	 *
	 * @template T
	 * @class Packet
	 * @implements {PacketClass}
	 */
	class Packet {
		/**
		 * Creates an instance of Packet.
		 *
		 * @param {PacketType} type
		 * @param {String} target
		 * @param {T} payload
		 *
		 * @memberof Packet
		 */
		constructor(type, target, payload) {
			this.type = type || PACKET_UNKNOWN;
			this.target = target;
			this.payload = payload || {};
		}
	}

	var packets = {
		PACKET_UNKNOWN,
		PACKET_EVENT,
		PACKET_REQUEST,
		PACKET_RESPONSE,
		PACKET_DISCOVER,
		PACKET_INFO,
		PACKET_DISCONNECT,
		PACKET_HEARTBEAT,
		PACKET_PING,
		PACKET_PONG,
		PACKET_GOSSIP_REQ,
		PACKET_GOSSIP_RES,
		PACKET_GOSSIP_HELLO,

		DATATYPE_UNDEFINED,
		DATATYPE_NULL,
		DATATYPE_JSON,
		DATATYPE_BUFFER,

		Packet
	};

	var errors = createCommonjsModule(function (module) {

	/**
	 * Import types
	 *
	 * @typedef {import("./service-broker")} ServiceBroker
	 * @typedef {import("./errors").Regenerator} RegeneratorClass
	 * @typedef {import("./errors").PlainMoleculerError} PlainMoleculerError
	 */

	/**
	 * Extendable errors class.
	 *
	 * Credits: https://github.com/bjyoungblood/es6-error/blob/master/src/index.js
	 */
	class ExtendableError extends Error {
		constructor(message = "") {
			super(message);

			// extending Error is weird and does not propagate `message`
			Object.defineProperty(this, "message", {
				configurable: true,
				enumerable: false,
				value: message,
				writable: true
			});

			Object.defineProperty(this, "name", {
				configurable: true,
				enumerable: false,
				value: this.constructor.name,
				writable: true
			});

			if (Object.prototype.hasOwnProperty.call(Error, "captureStackTrace")) {
				Error.captureStackTrace(this, this.constructor);
				return;
			}

			Object.defineProperty(this, "stack", {
				configurable: true,
				enumerable: false,
				value: new Error(message).stack,
				writable: true
			});
		}
	}

	class TimeoutError extends ExtendableError {}

	/**
	 * Custom Moleculer Error class
	 *
	 * @class MoleculerError
	 * @extends {ExtendableError}
	 */
	class MoleculerError extends ExtendableError {
		/**
		 * Creates an instance of MoleculerError.
		 *
		 * @param {String=} message
		 * @param {Number=} code
		 * @param {String=} type
		 * @param {any=} data
		 *
		 * @memberof MoleculerError
		 */
		constructor(message, code, type, data) {
			super(message);
			this.code = code || 500;
			this.type = type;
			this.data = data;
			this.retryable = false;
		}
	}

	/**
	 * Custom Moleculer Error class for retryable errors.
	 *
	 * @class MoleculerRetryableError
	 * @extends {MoleculerError}
	 */
	class MoleculerRetryableError extends MoleculerError {
		/**
		 * Creates an instance of MoleculerRetryableError.
		 *
		 * @param {String?} message
		 * @param {Number?} code
		 * @param {String?} type
		 * @param {any?} data
		 *
		 * @memberof MoleculerRetryableError
		 */
		constructor(message, code, type, data) {
			super(message);
			this.code = code || 500;
			this.type = type;
			this.data = data;
			this.retryable = true;
		}
	}

	/**
	 * Moleculer Error class for Broker disconnections which are retryable.
	 *
	 * @class MoleculerServerError
	 * @extends {MoleculerRetryableError}
	 */
	class BrokerDisconnectedError extends MoleculerRetryableError {
		constructor() {
			super(
				"The broker's transporter has disconnected. Please try again when a connection is reestablished.",
				502,
				"BAD_GATEWAY"
			);
			// Stack trace is hidden because it creates a lot of logs and, in this case, won't help users find the issue
			this.stack = "";
		}
	}

	/**
	 * Moleculer Error class for server errors which are retryable.
	 *
	 * @class MoleculerServerError
	 * @extends {MoleculerRetryableError}
	 */
	class MoleculerServerError extends MoleculerRetryableError {}

	/**
	 * Moleculer Error class for client errors which are not retryable.
	 *
	 * @class MoleculerClientError
	 * @extends {MoleculerError}
	 */
	class MoleculerClientError extends MoleculerError {
		/**
		 * Creates an instance of MoleculerClientError.
		 *
		 * @param {String?} message
		 * @param {Number?} code
		 * @param {String?} type
		 * @param {any} data
		 *
		 * @memberof MoleculerClientError
		 */
		constructor(message, code, type, data) {
			super(message, code || 400, type, data);
		}
	}

	/**
	 * 'Service not found' Error message
	 *
	 * @class ServiceNotFoundError
	 * @extends {MoleculerRetryableError}
	 */
	class ServiceNotFoundError extends MoleculerRetryableError {
		/**
		 * Creates an instance of ServiceNotFoundError.
		 *
		 * @param {Object} data
		 *
		 * @memberof ServiceNotFoundError
		 */
		constructor(data = {}) {
			let msg;
			if (data.nodeID && data.action)
				msg = `Service '${data.action}' is not found on '${data.nodeID}' node.`;
			else if (data.action) msg = `Service '${data.action}' is not found.`;

			if (data.service && data.version)
				msg = `Service '${data.version}.${data.service}' not found.`;
			else if (data.service) msg = `Service '${data.service}' not found.`;

			super(msg, 404, "SERVICE_NOT_FOUND", data);
		}
	}

	/**
	 * 'Service not available' Error message
	 *
	 * @class ServiceNotAvailableError
	 * @extends {MoleculerRetryableError}
	 */
	class ServiceNotAvailableError extends MoleculerRetryableError {
		/**
		 * Creates an instance of ServiceNotAvailableError.
		 *
		 * @param {Object} data
		 *
		 * @memberof ServiceNotAvailableError
		 */
		constructor(data) {
			let msg;
			if (data.nodeID)
				msg = `Service '${data.action}' is not available on '${data.nodeID}' node.`;
			else msg = `Service '${data.action}' is not available.`;

			super(msg, 404, "SERVICE_NOT_AVAILABLE", data);
		}
	}

	/**
	 * 'Request timed out' Error message. Retryable.
	 *
	 * @class RequestTimeoutError
	 * @extends {MoleculerRetryableError}
	 */
	class RequestTimeoutError extends MoleculerRetryableError {
		/**
		 * Creates an instance of RequestTimeoutError.
		 *
		 * @param {Object} data
		 *
		 * @memberof RequestTimeoutError
		 */
		constructor(data) {
			super(
				`Request is timed out when call '${data.action}' action on '${data.nodeID}' node.`,
				504,
				"REQUEST_TIMEOUT",
				data
			);
		}
	}

	/**
	 * 'Request skipped for timeout' Error message
	 *
	 * @class RequestSkippedError
	 * @extends {MoleculerError}
	 */
	class RequestSkippedError extends MoleculerError {
		/**
		 * Creates an instance of RequestSkippedError.
		 *
		 * @param {Object} data
		 *
		 * @memberof RequestSkippedError
		 */
		constructor(data) {
			super(
				`Calling '${data.action}' is skipped because timeout reached on '${data.nodeID}' node.`,
				514,
				"REQUEST_SKIPPED",
				data
			);
			this.retryable = false;
		}
	}

	/**
	 * 'Request rejected' Error message. Retryable.
	 *
	 * @class RequestRejectedError
	 * @extends {MoleculerRetryableError}
	 */
	class RequestRejectedError extends MoleculerRetryableError {
		/**
		 * Creates an instance of RequestRejectedError.
		 *
		 * @param {Object} data
		 *
		 * @memberof RequestRejectedError
		 */
		constructor(data) {
			super(
				`Request is rejected when call '${data.action}' action on '${data.nodeID}' node.`,
				503,
				"REQUEST_REJECTED",
				data
			);
		}
	}

	/**
	 * 'Queue is full' error message. Retryable.
	 *
	 * @class QueueIsFullError
	 * @extends {MoleculerRetryableError}
	 */
	class QueueIsFullError extends MoleculerRetryableError {
		/**
		 * Creates an instance of QueueIsFullError.
		 *
		 * @param {Object} data
		 *
		 * @memberof QueueIsFullError
		 */
		constructor(data) {
			super(
				`Queue is full. Request '${data.action}' action on '${data.nodeID}' node is rejected.`,
				429,
				"QUEUE_FULL",
				data
			);
		}
	}

	/**
	 * 'Parameters of action call validation error
	 *
	 * @class ValidationError
	 * @extends {MoleculerClientError}
	 */
	class ValidationError extends MoleculerClientError {
		/**
		 * Creates an instance of ValidationError.
		 *
		 * @param {String} message
		 * @param {String} type
		 * @param {any} data
		 *
		 * @memberof ValidationError
		 */
		constructor(message, type, data) {
			super(message, 422, type || "VALIDATION_ERROR", data);
		}
	}

	/**
	 * 'Max request call level!' Error message
	 *
	 * @class MaxCallLevelError
	 * @extends {MoleculerError}
	 */
	class MaxCallLevelError extends MoleculerError {
		/**
		 * Creates an instance of MaxCallLevelError.
		 *
		 * @param {Object} data
		 *
		 * @memberof MaxCallLevelError
		 */
		constructor(data) {
			super(
				`Request level is reached the limit (${data.level}) on '${data.nodeID}' node.`,
				500,
				"MAX_CALL_LEVEL",
				data
			);
			this.retryable = false;
		}
	}

	/**
	 * Custom Moleculer Error class for Service schema errors
	 *
	 * @class ServiceSchemaError
	 * @extends {MoleculerError}
	 */
	class ServiceSchemaError extends MoleculerError {
		/**
		 * Creates an instance of ServiceSchemaError.
		 *
		 * @param {String} msg
		 * @param {Object} data
		 * @memberof ServiceSchemaError
		 */
		constructor(msg, data) {
			super(msg, 500, "SERVICE_SCHEMA_ERROR", data);
		}
	}

	/**
	 * Custom Moleculer Error class for broker option errors
	 *
	 * @class BrokerOptionsError
	 * @extends {MoleculerError}
	 */
	class BrokerOptionsError extends MoleculerError {
		/**
		 * Creates an instance of BrokerOptionsError.
		 *
		 * @param {String} msg
		 * @param {Object} data
		 * @memberof BrokerOptionsError
		 */
		constructor(msg, data) {
			super(msg, 500, "BROKER_OPTIONS_ERROR", data);
		}
	}

	/**
	 * Custom Moleculer Error class for Graceful stopping
	 *
	 * @class GracefulStopTimeoutError
	 * @extends {MoleculerError}
	 */
	class GracefulStopTimeoutError extends MoleculerError {
		/**
		 * Creates an instance of GracefulStopTimeoutError.
		 *
		 * @param {Object?} data
		 * @memberof GracefulStopTimeoutError
		 */
		constructor(data) {
			if (data && data.service) {
				super(
					`Unable to stop '${data.service.name}' service gracefully.`,
					500,
					"GRACEFUL_STOP_TIMEOUT",
					data && data.service
						? {
								name: data.service.name,
								version: data.service.version
							}
						: null
				);
			} else {
				super("Unable to stop ServiceBroker gracefully.", 500, "GRACEFUL_STOP_TIMEOUT");
			}
		}
	}

	/**
	 * Protocol version is mismatch
	 *
	 * @class ProtocolVersionMismatchError
	 * @extends {MoleculerError}
	 */
	class ProtocolVersionMismatchError extends MoleculerError {
		/**
		 * Creates an instance of ProtocolVersionMismatchError.
		 *
		 * @param {Object} data
		 *
		 * @memberof ProtocolVersionMismatchError
		 */
		constructor(data) {
			super("Protocol version mismatch.", 500, "PROTOCOL_VERSION_MISMATCH", data);
		}
	}

	/**
	 * Invalid packet format error
	 *
	 * @class InvalidPacketDataError
	 * @extends {MoleculerError}
	 */
	class InvalidPacketDataError extends MoleculerError {
		/**
		 * Creates an instance of InvalidPacketDataError.
		 *
		 * @param {Object} data
		 *
		 * @memberof InvalidPacketDataError
		 */
		constructor(data) {
			super("Invalid packet data.", 500, "INVALID_PACKET_DATA", data);
		}
	}

	/**
	 * Recreate an error from a transferred payload `err`
	 *
	 * @param {MoleculerError} err
	 * @returns {MoleculerError}
	 */
	function recreateError(err) {
		const Class = module.exports[err.name];
		if (Class) {
			switch (err.name) {
				case "MoleculerError":
					return new Class(err.message, err.code, err.type, err.data);
				case "MoleculerRetryableError":
					return new Class(err.message, err.code, err.type, err.data);
				case "MoleculerServerError":
					return new Class(err.message, err.code, err.type, err.data);
				case "MoleculerClientError":
					return new Class(err.message, err.code, err.type, err.data);

				case "ValidationError":
					return new Class(err.message, err.type, err.data);

				case "ServiceNotFoundError":
					return new Class(err.data);
				case "ServiceNotAvailableError":
					return new Class(err.data);
				case "RequestTimeoutError":
					return new Class(err.data);
				case "RequestSkippedError":
					return new Class(err.data);
				case "RequestRejectedError":
					return new Class(err.data);
				case "QueueIsFullError":
					return new Class(err.data);
				case "MaxCallLevelError":
					return new Class(err.data);
				case "GracefulStopTimeoutError":
					return new Class(err.data);
				case "ProtocolVersionMismatchError":
					return new Class(err.data);
				case "InvalidPacketDataError":
					return new Class(err.data);

				case "ServiceSchemaError":
				case "BrokerOptionsError":
					return new Class(err.message, err.data);
			}
		}
	}

	/**
	 * Error Regenerator
	 * @class Regenerator
	 * @implements {RegeneratorClass}
	 */
	class Regenerator {
		/**
		 * Initializes Regenerator
		 *
		 * @param {ServiceBroker} broker
		 *
		 * @memberof Regenerator
		 */
		init(broker) {
			this.broker = broker;
		}

		/**
		 * Restores an Error object
		 *
		 * @param {PlainMoleculerError} plainError
		 * @param {Record<string, any>} payload
		 * @return {Error}
		 *
		 * @memberof Regenerator
		 */
		restore(plainError, payload) {
			let err = this.restoreCustomError(plainError, payload);
			if (!err) {
				err = recreateError(plainError);
			}
			if (!err) {
				err = this._createDefaultError(plainError);
			}
			this._restoreExternalFields(plainError, err, payload);
			this._restoreStack(plainError, err);

			return err;
		}

		/**
		 * Extracts a plain error object from Error object
		 *
		 * @param {Record<string, any>} plainErr
		 * @param {Record<string, any>} payload
		 * @return {PlainMoleculerError} plain error
		 *
		 * @memberof Regenerator
		 */
		extractPlainError(plainErr /*, payload*/) {
			return {
				name: plainErr.name,
				message: plainErr.message,
				nodeID: plainErr.nodeID || this.broker.nodeID,
				code: plainErr.code,
				type: plainErr.type,
				retryable: plainErr.retryable,
				stack: plainErr.stack,
				data: plainErr.data
			};
		}

		/**
		 * Hook to restore a custom error in a child class
		 *
		 * @param {PlainMoleculerError} plainError
		 * @param {Object} payload
		 * @return {MoleculerError}
		 *
		 * @memberof Regenerator
		 */
		restoreCustomError(/*plainError, payload*/) {
			return undefined;
		}

		/**
		 * Creates a default error if not found
		 *
		 * @param {PlainMoleculerError} plainError
		 * @return {any}
		 * @private
		 *
		 * @memberof Regenerator
		 */
		_createDefaultError(plainError) {
			/** @type {any} */
			const err = new Error(plainError.message);
			err.name = plainError.name;
			err.code = plainError.code;
			err.type = plainError.type;
			err.data = plainError.data;
			if (plainError.stack) err.stack = plainError.stack;

			return err;
		}

		/**
		 * Restores external error fields
		 *
		 * @param {PlainMoleculerError} plainError
		 * @param {PlainMoleculerError} err
		 * @param {Object} payload
		 * @private
		 *
		 * @memberof Regenerator
		 */
		_restoreExternalFields(plainError, err, payload) {
			err.retryable = plainError.retryable;
			err.nodeID = plainError.nodeID || payload.sender;
		}

		/**
		 * Restores an error stack
		 *
		 * @param {PlainMoleculerError} plainError
		 * @param {Error} err
		 * @private
		 *
		 * @memberof Regenerator
		 */
		_restoreStack(plainError, err) {
			if (plainError.stack) err.stack = plainError.stack;
		}
	}

	/**
	 * Resolves a regenerator option
	 *
	 * @param {Regenerator=} opt
	 * @return {Regenerator}
	 */
	function resolveRegenerator(opt) {
		if (opt instanceof Regenerator) {
			return opt;
		}

		return new Regenerator();
	}

	module.exports = {
		ExtendableError,
		TimeoutError,

		MoleculerError,
		MoleculerRetryableError,
		MoleculerServerError,
		MoleculerClientError,

		ServiceNotFoundError,
		ServiceNotAvailableError,

		ValidationError,
		RequestTimeoutError,
		RequestSkippedError,
		RequestRejectedError,
		QueueIsFullError,
		MaxCallLevelError,

		ServiceSchemaError,
		BrokerOptionsError,
		GracefulStopTimeoutError,

		ProtocolVersionMismatchError,
		InvalidPacketDataError,

		BrokerDisconnectedError,

		recreateError,
		resolveRegenerator,
		Regenerator
	};
	});

	/*
	 * moleculer
	 * Copyright (c) 2019 MoleculerJS (https://github.com/moleculerjs/moleculer)
	 * MIT Licensed
	 */

	var constants$1 = {
		// --- METRIC TYPES ---

		TYPE_COUNTER: "counter",
		TYPE_GAUGE: "gauge",
		TYPE_HISTOGRAM: "histogram",
		TYPE_INFO: "info",

		// --- METRICREGISTRY METRICS ---

		// MOLECULER_METRICS_COMMON_COLLECT_TOTAL: "moleculer.metrics.common.collect.total",
		// MOLECULER_METRICS_COMMON_COLLECT_TIME: "moleculer.metrics.common.collect.time",

		// --- PROCESS METRICS ---

		PROCESS_ARGUMENTS: "process.arguments",

		PROCESS_PID: "process.pid",
		PROCESS_PPID: "process.ppid",

		PROCESS_MEMORY_HEAP_SIZE_TOTAL: "process.memory.heap.size.total", // bytes
		PROCESS_MEMORY_HEAP_SIZE_USED: "process.memory.heap.size.used", // bytes
		PROCESS_MEMORY_RSS: "process.memory.rss", // bytes
		PROCESS_MEMORY_EXTERNAL: "process.memory.external", // bytes

		PROCESS_MEMORY_HEAP_SPACE_SIZE_TOTAL: "process.memory.heap.space.size.total", // bytes
		PROCESS_MEMORY_HEAP_SPACE_SIZE_USED: "process.memory.heap.space.size.used", // bytes
		PROCESS_MEMORY_HEAP_SPACE_SIZE_AVAILABLE: "process.memory.heap.space.size.available", // bytes
		PROCESS_MEMORY_HEAP_SPACE_SIZE_PHYSICAL: "process.memory.heap.space.size.physical", // bytes

		PROCESS_MEMORY_HEAP_STAT_HEAP_SIZE_TOTAL: "process.memory.heap.stat.heap.size.total", // bytes
		PROCESS_MEMORY_HEAP_STAT_EXECUTABLE_SIZE_TOTAL:
			"process.memory.heap.stat.executable.size.total", // bytes
		PROCESS_MEMORY_HEAP_STAT_PHYSICAL_SIZE_TOTAL: "process.memory.heap.stat.physical.size.total", // bytes
		PROCESS_MEMORY_HEAP_STAT_AVAILABLE_SIZE_TOTAL: "process.memory.heap.stat.available.size.total", // bytes
		PROCESS_MEMORY_HEAP_STAT_USED_HEAP_SIZE: "process.memory.heap.stat.used.heap.size", // bytes
		PROCESS_MEMORY_HEAP_STAT_HEAP_SIZE_LIMIT: "process.memory.heap.stat.heap.size.limit", // bytes
		PROCESS_MEMORY_HEAP_STAT_MALLOCATED_MEMORY: "process.memory.heap.stat.mallocated.memory", // bytes
		PROCESS_MEMORY_HEAP_STAT_PEAK_MALLOCATED_MEMORY:
			"process.memory.heap.stat.peak.mallocated.memory", // bytes
		PROCESS_MEMORY_HEAP_STAT_ZAP_GARBAGE: "process.memory.heap.stat.zap.garbage",

		PROCESS_UPTIME: "process.uptime", // seconds
		PROCESS_INTERNAL_ACTIVE_HANDLES: "process.internal.active.handles",

		PROCESS_VERSIONS_NODE: "process.versions.node",

		// --- OS METRICS ---

		OS_MEMORY_FREE: "os.memory.free", // bytes
		OS_MEMORY_USED: "os.memory.used", // bytes
		OS_MEMORY_TOTAL: "os.memory.total", // bytes
		OS_UPTIME: "os.uptime", // seconds
		OS_TYPE: "os.type",
		OS_RELEASE: "os.release",
		OS_HOSTNAME: "os.hostname",
		OS_ARCH: "os.arch",
		OS_PLATFORM: "os.platform",
		OS_USER_UID: "os.user.uid",
		OS_USER_GID: "os.user.gid",
		OS_USER_USERNAME: "os.user.username",
		OS_USER_HOMEDIR: "os.user.homedir",

		OS_DATETIME_UNIX: "os.datetime.unix",
		OS_DATETIME_ISO: "os.datetime.iso",
		OS_DATETIME_UTC: "os.datetime.utc",
		OS_DATETIME_TZ_OFFSET: "os.datetime.tz.offset",

		OS_NETWORK_ADDRESS: "os.network.address",
		OS_NETWORK_MAC: "os.network.mac",

		OS_CPU_LOAD_1: "os.cpu.load.1",
		OS_CPU_LOAD_5: "os.cpu.load.5",
		OS_CPU_LOAD_15: "os.cpu.load.15",
		OS_CPU_UTILIZATION: "os.cpu.utilization",

		OS_CPU_USER: "os.cpu.user", // seconds
		OS_CPU_SYSTEM: "os.cpu.system", // seconds

		OS_CPU_TOTAL: "os.cpu.total",
		OS_CPU_INFO_MODEL: "os.cpu.info.model",
		OS_CPU_INFO_SPEED: "os.cpu.info.speed",
		OS_CPU_INFO_TIMES_USER: "os.cpu.info.times.user",
		OS_CPU_INFO_TIMES_SYS: "os.cpu.info.times.sys",

		// --- MOLECULER NODE METRICS ---

		MOLECULER_NODE_TYPE: "moleculer.node.type",
		MOLECULER_NODE_VERSIONS_MOLECULER: "moleculer.node.versions.moleculer",
		MOLECULER_NODE_VERSIONS_LANG: "moleculer.node.versions.lang",
		MOLECULER_NODE_VERSIONS_PROTOCOL: "moleculer.node.versions.protocol",

		// --- MOLECULER BROKER METRICS ---

		MOLECULER_BROKER_NAMESPACE: "moleculer.broker.namespace",
		MOLECULER_BROKER_STARTED: "moleculer.broker.started",
		MOLECULER_BROKER_LOCAL_SERVICES_TOTAL: "moleculer.broker.local.services.total",
		MOLECULER_BROKER_MIDDLEWARES_TOTAL: "moleculer.broker.middlewares.total",

		// --- MOLECULER REGISTRY METRICS ---

		MOLECULER_REGISTRY_NODES_TOTAL: "moleculer.registry.nodes.total",
		MOLECULER_REGISTRY_NODES_ONLINE_TOTAL: "moleculer.registry.nodes.online.total",
		MOLECULER_REGISTRY_SERVICES_TOTAL: "moleculer.registry.services.total",
		MOLECULER_REGISTRY_SERVICE_ENDPOINTS_TOTAL: "moleculer.registry.service.endpoints.total",
		MOLECULER_REGISTRY_ACTIONS_TOTAL: "moleculer.registry.actions.total",
		MOLECULER_REGISTRY_ACTION_ENDPOINTS_TOTAL: "moleculer.registry.action.endpoints.total",
		MOLECULER_REGISTRY_EVENTS_TOTAL: "moleculer.registry.events.total",
		MOLECULER_REGISTRY_EVENT_ENDPOINTS_TOTAL: "moleculer.registry.event.endpoints.total",

		// --- MOLECULER REQUEST METRICS ---

		MOLECULER_REQUEST_TOTAL: "moleculer.request.total",
		MOLECULER_REQUEST_ACTIVE: "moleculer.request.active",
		MOLECULER_REQUEST_ERROR_TOTAL: "moleculer.request.error.total",
		MOLECULER_REQUEST_TIME: "moleculer.request.time", //msec
		MOLECULER_REQUEST_LEVELS: "moleculer.request.levels",
		//MOLECULER_REQUEST_DIRECTCALL_TOTAL: "moleculer.request.directcall.total",
		//MOLECULER_REQUEST_MULTICALL_TOTAL: "moleculer.request.multicall.total",

		// --- MOLECULER EVENTS METRICS ---

		MOLECULER_EVENT_EMIT_TOTAL: "moleculer.event.emit.total",
		MOLECULER_EVENT_BROADCAST_TOTAL: "moleculer.event.broadcast.total",
		MOLECULER_EVENT_BROADCASTLOCAL_TOTAL: "moleculer.event.broadcast-local.total",
		MOLECULER_EVENT_RECEIVED_TOTAL: "moleculer.event.received.total",
		MOLECULER_EVENT_RECEIVED_ACTIVE: "moleculer.event.received.active",
		MOLECULER_EVENT_RECEIVED_ERROR_TOTAL: "moleculer.event.received.error.total",
		MOLECULER_EVENT_RECEIVED_TIME: "moleculer.event.received.time", //msec

		// --- MOLECULER TRANSIT METRICS ---

		MOLECULER_TRANSIT_PUBLISH_TOTAL: "moleculer.transit.publish.total",
		MOLECULER_TRANSIT_RECEIVE_TOTAL: "moleculer.transit.receive.total",

		MOLECULER_TRANSIT_REQUESTS_ACTIVE: "moleculer.transit.requests.active",
		MOLECULER_TRANSIT_STREAMS_SEND_ACTIVE: "moleculer.transit.streams.send.active",
		//MOLECULER_TRANSIT_STREAMS_RECEIVE_ACTIVE: "moleculer.transit.streams.receive.active",
		MOLECULER_TRANSIT_READY: "moleculer.transit.ready", // true/false
		MOLECULER_TRANSIT_CONNECTED: "moleculer.transit.connected", // true/false

		MOLECULER_TRANSIT_PONG_TIME: "moleculer.transit.pong.time", // true/false
		MOLECULER_TRANSIT_PONG_SYSTIME_DIFF: "moleculer.transit.pong.systime-diff", // true/false

		MOLECULER_TRANSIT_ORPHAN_RESPONSE_TOTAL: "moleculer.transit.orphan.response.total",

		// --- MOLECULER TRANSPORTER METRICS ---

		MOLECULER_TRANSPORTER_PACKETS_SENT_TOTAL: "moleculer.transporter.packets.sent.total",
		MOLECULER_TRANSPORTER_PACKETS_SENT_BYTES: "moleculer.transporter.packets.sent.bytes", // bytes
		MOLECULER_TRANSPORTER_PACKETS_RECEIVED_TOTAL: "moleculer.transporter.packets.received.total",
		MOLECULER_TRANSPORTER_PACKETS_RECEIVED_BYTES: "moleculer.transporter.packets.received.bytes", // bytes

		// --- MOLECULER CIRCUIT BREAKER METRICS ---

		MOLECULER_CIRCUIT_BREAKER_OPENED_ACTIVE: "moleculer.circuit-breaker.opened.active",
		MOLECULER_CIRCUIT_BREAKER_OPENED_TOTAL: "moleculer.circuit-breaker.opened.total",
		MOLECULER_CIRCUIT_BREAKER_HALF_OPENED_ACTIVE: "moleculer.circuit-breaker.half-opened.active",

		// --- MOLECULER FALLBACK METRICS ---

		MOLECULER_REQUEST_FALLBACK_TOTAL: "moleculer.request.fallback.total",

		// --- MOLECULER BULKHEAD METRICS ---

		MOLECULER_REQUEST_BULKHEAD_INFLIGHT: "moleculer.request.bulkhead.inflight",
		MOLECULER_REQUEST_BULKHEAD_QUEUE_SIZE: "moleculer.request.bulkhead.queue.size",

		MOLECULER_EVENT_BULKHEAD_INFLIGHT: "moleculer.event.bulkhead.inflight",
		MOLECULER_EVENT_BULKHEAD_QUEUE_SIZE: "moleculer.event.bulkhead.queue.size",

		// --- MOLECULER RETRY METRICS ---

		MOLECULER_REQUEST_RETRY_ATTEMPTS_TOTAL: "moleculer.request.retry.attempts.total",

		// --- MOLECULER TIMEOUT METRICS ---

		MOLECULER_REQUEST_TIMEOUT_TOTAL: "moleculer.request.timeout.total",

		// --- MOLECULER CACHER METRICS ---

		MOLECULER_CACHER_GET_TOTAL: "moleculer.cacher.get.total",
		MOLECULER_CACHER_GET_TIME: "moleculer.cacher.get.time",
		MOLECULER_CACHER_FOUND_TOTAL: "moleculer.cacher.found.total",
		MOLECULER_CACHER_SET_TOTAL: "moleculer.cacher.set.total",
		MOLECULER_CACHER_SET_TIME: "moleculer.cacher.set.time",
		MOLECULER_CACHER_DEL_TOTAL: "moleculer.cacher.del.total",
		MOLECULER_CACHER_DEL_TIME: "moleculer.cacher.del.time",
		MOLECULER_CACHER_CLEAN_TOTAL: "moleculer.cacher.clean.total",
		MOLECULER_CACHER_CLEAN_TIME: "moleculer.cacher.clean.time",
		MOLECULER_CACHER_EXPIRED_TOTAL: "moleculer.cacher.expired.total",

		MOLECULER_DISCOVERER_REDIS_COLLECT_TOTAL: "moleculer.discoverer.redis.collect.total",
		MOLECULER_DISCOVERER_REDIS_COLLECT_TIME: "moleculer.discoverer.redis.collect.time",

		MOLECULER_DISCOVERER_ETCD_COLLECT_TOTAL: "moleculer.discoverer.etcd.collect.total",
		MOLECULER_DISCOVERER_ETCD_COLLECT_TIME: "moleculer.discoverer.etcd.collect.time",

		// --- COMMON UNITS ---
		// Inspired by https://docs.datadoghq.com/developers/metrics/#units

		// Bytes
		UNIT_BIT: "bit",
		UNIT_BYTE: "byte",
		UNIT_KILOBYTES: "kilobyte",
		UNIT_MEGABYTE: "megabyte",
		UNIT_GIGABYTE: "gigabyte",
		UNIT_TERRABYTE: "terrabyte",
		UNIT_PETABYTE: "petabyte",
		UNIT_EXOBYTE: "exabyte",

		// Time
		UNIT_NANOSECONDS: "nanosecond",
		UNIT_MICROSECONDS: "microsecond",
		UNIT_MILLISECONDS: "millisecond",
		UNIT_SECONDS: "second",
		UNIT_MINUTE: "minute",
		UNIT_HOUR: "hour",
		UNIT_DAY: "day",
		UNIT_WEEK: "week",
		UNIT_MONTH: "month",
		UNIT_YEAR: "year",

		// Process
		UNIT_HANDLE: "handle",
		UNIT_CPU: "cpu",
		UNIT_GHZ: "GHz",

		// Network
		UNIT_REQUEST: "request",
		UNIT_CONNECTION: "connection",
		UNIT_PACKET: "packet",
		UNIT_MESSAGE: "message",
		UNIT_STREAM: "stream",
		UNIT_EVENT: "event"
	};

	// TODO: https://github.com/xpl/ansicolor#chrome-devtools-compatibility

	let kleur;

	function noop (txt) { return arguments.length > 0 ? arguments[0] : kleur }
	kleur = {
	  enabled: false,

	  reset: noop,
	  bold: noop,
	  dim: noop,
	  italic: noop,
	  underline: noop,
	  inverse: noop,
	  hidden: noop,
	  strikethrough: noop,

	  // colors
	  black: noop,
	  red: noop,
	  green: noop,
	  yellow: noop,
	  blue: noop,
	  magenta: noop,
	  cyan: noop,
	  white: noop,
	  gray: noop,
	  grey: noop,

	  // background colors
	  bgBlack: noop,
	  bgRed: noop,
	  bgGreen: noop,
	  bgYellow: noop,
	  bgBlue: noop,
	  bgMagenta: noop,
	  bgCyan: noop,
	  bgWhite: noop

	};

	var kleur_1 = kleur;

	var utils_1 = createCommonjsModule(function (module) {





	const { TimeoutError } = errors;

	const lut = [];
	for (let i = 0; i < 256; i++) {
		lut[i] = (i < 16 ? "0" : "") + i.toString(16);
	}

	const RegexCache = new Map();

	const deprecateList = [];

	const byteMultipliers = {
		b: 1,
		kb: 1 << 10,
		mb: 1 << 20,
		gb: 1 << 30,
		tb: Math.pow(1024, 4),
		pb: Math.pow(1024, 5)
	};
	// eslint-disable-next-line security/detect-unsafe-regex
	const parseByteStringRe = /^((-|\+)?(\d+(?:\.\d+)?)) *(kb|mb|gb|tb|pb)$/i;

	/**
	 * Circular replacing of unsafe properties in object
	 *
	 * @param {object} options List of options to change circularReplacer behaviour
	 * @param {number?} [options.maxSafeObjectSize = Infinity] Maximum size of objects for safe object converting
	 * @return {(key: string, value: any) => any}
	 */
	function circularReplacer(options = { maxSafeObjectSize: Infinity }) {
		const seen = new WeakSet();
		return function (key, value) {
			if (typeof value === "object" && value !== null) {
				const objectType = (value.constructor && value.constructor.name) || typeof value;

				if (
					options.maxSafeObjectSize &&
					"length" in value &&
					value.length > options.maxSafeObjectSize
				) {
					return `[${objectType} ${value.length}]`;
				}

				if (
					options.maxSafeObjectSize &&
					"size" in value &&
					value.size > options.maxSafeObjectSize
				) {
					return `[${objectType} ${value.size}]`;
				}

				if (seen.has(value)) {
					//delete this[key];
					return;
				}
				seen.add(value);
			}
			return value;
		};
	}

	const units = ["h", "m", "s", "ms", "μs", "ns"];
	const divisors = [60 * 60 * 1000, 60 * 1000, 1000, 1, 1e-3, 1e-6];

	const utils = {
		isFunction(fn) {
			return typeof fn === "function";
		},

		isString(s) {
			return typeof s === "string" || s instanceof String;
		},

		isObject(o) {
			return o !== null && typeof o === "object" && !(o instanceof String);
		},

		isPlainObject(o) {
			return o != null
				? Object.getPrototypeOf(o) === Object.prototype || Object.getPrototypeOf(o) === null
				: false;
		},

		isDate(d) {
			return d instanceof Date && !Number.isNaN(d.getTime());
		},

		flatten(arr) {
			return Array.prototype.reduce.call(arr, (a, b) => a.concat(b), []);
		},

		humanize(milli) {
			if (milli == null) return "?";

			for (let i = 0; i < divisors.length; i++) {
				const val = milli / divisors[i];
				if (val >= 1.0) return "" + Math.floor(val) + units[i];
			}

			return "now";
		},

		// Fast UUID generator: e7 https://jsperf.com/uuid-generator-opt/18
		generateToken() {
			const d0 = (Math.random() * 0xffffffff) | 0;
			const d1 = (Math.random() * 0xffffffff) | 0;
			const d2 = (Math.random() * 0xffffffff) | 0;
			const d3 = (Math.random() * 0xffffffff) | 0;
			return (
				lut[d0 & 0xff] +
				lut[(d0 >> 8) & 0xff] +
				lut[(d0 >> 16) & 0xff] +
				lut[(d0 >> 24) & 0xff] +
				"-" +
				lut[d1 & 0xff] +
				lut[(d1 >> 8) & 0xff] +
				"-" +
				lut[((d1 >> 16) & 0x0f) | 0x40] +
				lut[(d1 >> 24) & 0xff] +
				"-" +
				lut[(d2 & 0x3f) | 0x80] +
				lut[(d2 >> 8) & 0xff] +
				"-" +
				lut[(d2 >> 16) & 0xff] +
				lut[(d2 >> 24) & 0xff] +
				lut[d3 & 0xff] +
				lut[(d3 >> 8) & 0xff] +
				lut[(d3 >> 16) & 0xff] +
				lut[(d3 >> 24) & 0xff]
			);
		},

		removeFromArray(arr, item) {
			if (!arr || arr.length === 0) return arr;
			const idx = arr.indexOf(item);
			if (idx !== -1) arr.splice(idx, 1);

			return arr;
		},

		/**
		 * Get default NodeID (computerName)
		 *
		 * @returns
		 */
		getNodeID() {
			return os__default.hostname().toLowerCase() + "-" + _process.pid;
		},

		/**
		 * Get list of local IPs
		 *
		 * @returns
		 */
		getIpList() {
			const list = [];
			const ilist = [];
			const interfaces = os__default.networkInterfaces();
			for (let iface in interfaces) {
				for (let i in interfaces[iface]) {
					const f = interfaces[iface]?.[i];
					if (f.family === "IPv4") {
						if (f.internal) {
							ilist.push(f.address);
							break;
						} else {
							list.push(f.address);
							break;
						}
					}
				}
			}
			return list.length > 0 ? list : ilist;
		},

		/**
		 * Check the param is a Promise instance
		 *
		 * @param {any} p
		 * @returns
		 */
		isPromise(p) {
			return p != null && typeof p.then === "function";
		},

		/**
		 * Polyfill a Promise library with missing Bluebird features.
		 *
		 * @param {typeof Promise} P
		 */
		polyfillPromise(P) {
			if (!utils.isFunction(P.method)) {
				// Based on https://github.com/petkaantonov/bluebird/blob/master/src/method.js#L8
				P.method = function (fn) {
					return function () {
						try {
							const val = fn.apply(this, arguments);
							return P.resolve(val);
						} catch (err) {
							return P.reject(err);
						}
					};
				};
			}

			if (!utils.isFunction(P.delay)) {
				// Based on https://github.com/petkaantonov/bluebird/blob/master/src/timers.js#L15
				P.delay = function (ms) {
					return new P(resolve => timersBrowserify.setTimeout(() => resolve(null), +ms));
				};
				P.prototype.delay = function (ms) {
					return this.then(res => P.delay(ms).then(() => res));
					//return this.then(res => new P(resolve => setTimeout(() => resolve(res), +ms)));
				};
			}

			if (!utils.isFunction(P.prototype.timeout)) {
				P.prototype.timeout = function (ms, message) {
					let timer;
					const timeout = new P((resolve, reject) => {
						timer = timersBrowserify.setTimeout(() => reject(new TimeoutError(message)), +ms);
					});

					return P.race([timeout, this])
						.then(value => {
							clearTimeout(timer);
							return value;
						})
						.catch(err => {
							clearTimeout(timer);
							throw err;
						});
				};
			}

			if (!utils.isFunction(P.mapSeries)) {
				P.mapSeries = function (arr, fn) {
					const promFn = Promise.method(fn);
					const res = [];

					return arr
						.reduce((p, item, i) => {
							return p.then(r => {
								res[i] = r;
								return promFn(item, i);
							});
						}, P.resolve())
						.then(r => {
							res[arr.length] = r;
							return res.slice(1);
						});
				};
			}
		},

		/**
		 * Promise control
		 * if you'd always like to know the result of each promise
		 *
		 * @param {Array} promises
		 * @param {Boolean} settled set true for result of each promise with reject
		 * @param {Object} promise
		 * @return {Promise<{[p: string]: PromiseSettledResult<*>}>|Promise<unknown[]>}
		 */
		promiseAllControl(promises, settled = false, promise = Promise) {
			return settled ? promise.allSettled(promises) : promise.all(promises);
		},

		/**
		 * Clear `require` cache. Used for service hot reloading
		 *
		 * @param {String} filename
		 */
		clearRequireCache(filename) {
			/* istanbul ignore next */
			Object.keys(require.cache).forEach(function (key) {
				if (key == filename) {
					delete require.cache[key];
				}
			});
		},

		/**
		 * String matcher to handle dot-separated event/action names.
		 *
		 * @param {String} text
		 * @param {String} pattern
		 * @returns {Boolean}
		 */
		match(text, pattern) {
			// Simple patterns
			if (pattern.indexOf("?") == -1) {
				// Exact match (eg. "prefix.event")
				const firstStarPosition = pattern.indexOf("*");
				if (firstStarPosition == -1) {
					return pattern === text;
				}

				// Eg. "prefix**"
				const len = pattern.length;
				if (len > 2 && pattern.endsWith("**") && firstStarPosition > len - 3) {
					pattern = pattern.substring(0, len - 2);
					return text.startsWith(pattern);
				}

				// Eg. "prefix*"
				if (len > 1 && pattern.endsWith("*") && firstStarPosition > len - 2) {
					pattern = pattern.substring(0, len - 1);
					if (text.startsWith(pattern)) {
						return text.indexOf(".", len) == -1;
					}
					return false;
				}

				// Accept simple text, without point character (*)
				if (len == 1 && firstStarPosition === 0) {
					return text.indexOf(".") == -1;
				}

				// Accept all inputs (**)
				if (len == 2 && firstStarPosition == 0 && pattern.lastIndexOf("*") == 1) {
					return true;
				}
			}

			// Regex (eg. "prefix.ab?cd.*.foo")
			const origPattern = pattern;
			let regex = RegexCache.get(origPattern);
			if (regex == null) {
				if (pattern.startsWith("$")) {
					pattern = "\\" + pattern;
				}
				pattern = pattern.replace(/\?/g, ".");
				pattern = pattern.replace(/\*\*/g, "§§§");
				pattern = pattern.replace(/\*/g, "[^\\.]*");
				pattern = pattern.replace(/§§§/g, ".*");

				pattern = "^" + pattern + "$";

				// eslint-disable-next-line security/detect-non-literal-regexp
				regex = new RegExp(pattern, "");
				RegexCache.set(origPattern, regex);
			}
			return regex.test(text);
		},

		/**
		 * Deprecate a method or property
		 *
		 * @param {Object|Function|String} prop
		 * @param {String} msg
		 */
		deprecate(prop, msg) {
			if (arguments.length == 1) msg = prop;

			if (deprecateList.indexOf(prop) === -1) {
				// eslint-disable-next-line no-console
				console.warn(kleur_1.yellow().bold(`DeprecationWarning: ${msg}`));
				deprecateList.push(prop);
			}
		},

		/**
		 * Remove circular references & Functions from the JS object
		 *
		 * @param {Object|Array} obj
		 * @param {object} options List of options to change circularReplacer behaviour
		 * @param {number?} [options.maxSafeObjectSize = Infinity] Maximum size of objects for safe object converting
		 * @returns {Object|Array}
		 */
		safetyObject(obj, options) {
			return JSON.parse(JSON.stringify(obj, circularReplacer(options)));
		},

		/**
		 * Sets a variable on an object based on its dot path.
		 *
		 * @param {Record<string,any>} obj
		 * @param {String} path
		 * @param {*} value
		 * @returns {Object}
		 */
		dotSet(obj, path, value) {
			const parts = path.split(".");
			const part = parts.shift();
			if (part && parts.length > 0) {
				if (!Object.prototype.hasOwnProperty.call(obj, part)) {
					obj[part] = {};
				} else if (obj[part] == null) {
					obj[part] = {};
				} else {
					if (typeof obj[part] !== "object") {
						throw new Error("Value already set and it's not an object");
					}
				}
				obj[part] = utils.dotSet(obj[part], parts.join("."), value);
				return obj;
			}
			obj[path] = value;
			return obj;
		},

		/**
		 * Make directories recursively
		 * @param {String} p - directory path
		 */
		makeDirs(p) {
			p.split(path__default.sep).reduce((prevPath, folder) => {
				const currentPath = path__default.join(prevPath, folder, path__default.sep);
				if (!fs__default.existsSync(currentPath)) {
					fs__default.mkdirSync(currentPath);
				}
				return currentPath;
			}, "");
		},

		/**
		 * Parse a byte string to number of bytes. E.g "1kb" -> 1024
		 * Credits: https://github.com/visionmedia/bytes.js
		 *
		 * @param {String|number} v
		 * @returns {Number|null}
		 */
		parseByteString(v) {
			if (typeof v === "number" && !isNaN(v)) {
				return v;
			}

			if (typeof v !== "string") {
				return null;
			}

			// Test if the string passed is valid
			let results = parseByteStringRe.exec(v);
			let floatValue;
			let unit;

			if (!results) {
				// Nothing could be extracted from the given string
				floatValue = parseInt(v, 10);
				if (Number.isNaN(floatValue)) return null;

				unit = "b";
			} else {
				// Retrieve the value and the unit
				floatValue = parseFloat(results[1]);
				unit = results[4].toLowerCase();
			}

			return Math.floor(byteMultipliers[unit] * floatValue);
		},

		/**
		 * Get the name of constructor of an object.
		 *
		 * @param {Object} obj
		 * @returns {String|undefined}
		 */
		getConstructorName(obj) {
			if (obj == null) return undefined;

			let target = obj.prototype;
			if (target && target.constructor && target.constructor.name) {
				return target.constructor.name;
			}
			if (obj.constructor && obj.constructor.name) {
				return obj.constructor.name;
			}
			return undefined;
		},

		/**
		 * Check whether the instance is an instance of the given class.
		 *
		 * @param {Object} instance
		 * @param {Object} baseClass
		 * @returns {Boolean}
		 */
		isInheritedClass(instance, baseClass) {
			const baseClassName = module.exports.getConstructorName(baseClass);
			let proto = instance;
			while ((proto = Object.getPrototypeOf(proto))) {
				const protoName = module.exports.getConstructorName(proto);
				if (baseClassName == protoName) return true;
			}

			return false;
		},

		/**
		 * Creates a duplicate-free version of an array
		 *
		 * @param {Array<String|Number>} arr
		 * @returns {Array<String|Number>}
		 */
		uniq(arr) {
			return [...new Set(arr)];
		},

		/**
		 * Produces a random floating number between the inclusive lower and upper bounds.
		 *
		 * @param {Number} a
		 * @param {Number} b
		 * @returns {Number}
		 */
		random(a = 1, b = 0) {
			const lower = Math.min(a, b);
			const upper = Math.max(a, b);

			return lower + Math.random() * (upper - lower);
		},

		/**
		 * Produces a random integer number between the inclusive lower and upper bounds.
		 *
		 * @param {Number} a
		 * @param {Number} b
		 * @returns {Number}
		 */
		randomInt(a = 1, b = 0) {
			const lower = Math.ceil(Math.min(a, b));
			const upper = Math.floor(Math.max(a, b));

			return Math.floor(lower + Math.random() * (upper - lower + 1));
		}
	};

	module.exports = utils;
	});

	/*
	 * moleculer
	 * Copyright (c) 2023 MoleculerJS (https://github.com/moleculerjs/moleculer)
	 * MIT Licensed
	 */

	/**
	 * Import types
	 *
	 * @typedef {import("../registry")} MetricRegistry
	 * @typedef {import("./base")} BaseMetricClass
	 * @typedef {import("./base").BaseMetricOptions} BaseMetricOptions
	 */

	/**
	 * Abstract Base Metric class.
	 *
	 * @class BaseMetric
	 * @implements {BaseMetricClass}
	 */
	class BaseMetric {
		/**
		 * Creates an instance of BaseMetric.
		 *
		 * @param {BaseMetricOptions} opts
		 * @param {MetricRegistry} registry
		 * @memberof BaseMetric
		 */
		constructor(opts, registry) {
			this.registry = registry;
			this.type = opts.type;
			this.name = opts.name;
			this.description = opts.description;
			this.labelNames = opts.labelNames || [];
			this.unit = opts.unit;
			this.aggregator = opts.aggregator || registry.opts.defaultAggregator;

			this.lastSnapshot = null;
			this.dirty = true;

			this.values = new Map();
		}

		/**
		 * Set dirty flag
		 *
		 * @memberof BaseMetric
		 */
		setDirty() {
			this.dirty = true;
		}

		/**
		 * Clear dirty flag
		 *
		 * @memberof BaseMetric
		 */
		clearDirty() {
			this.dirty = false;
		}

		/**
		 * Get metric item by labels
		 *
		 * @param {Object?} labels
		 * @returns {Object}
		 * @memberof BaseMetric
		 */
		get(labels) {
			const hash = this.hashingLabels(labels);
			return this.values.get(hash);
		}

		/**
		 * Reset item by labels
		 *
		 * @param {Object?} labels
		 * @param {Number?} timestamp
		 *
		 * @memberof BaseMetric
		 */
		reset(labels, timestamp) {
			/* istanbul ignore next */
			throw new Error("Not implemented");
		}

		/**
		 * Reset all items
		 *
		 * @param {Number?} timestamp
		 * @memberof BaseMetric
		 */
		resetAll(timestamp) {
			/* istanbul ignore next */
			throw new Error("Not implemented");
		}

		/**
		 * Clear metric values.
		 *
		 * @memberof BaseMetric
		 */
		clear() {
			this.values = new Map();
			this.changed();
		}

		/**
		 * Create a hash from label values. It will
		 * be used as a key in Map.
		 *
		 * @param {Object} labels
		 * @returns {String}
		 * @memberof BaseMetric
		 */
		hashingLabels(labels) {
			if (this.labelNames.length == 0 || labels == null || typeof labels !== "object") return "";

			const parts = [];
			for (let i = 0; i < this.labelNames.length; i++) {
				const v = labels[this.labelNames[i]];
				if (typeof v == "number") parts.push(v);
				else if (typeof v === "string") parts.push('"' + v + '"');
				else if (typeof v === "boolean") parts.push("" + v);
				else parts.push("");
			}
			return parts.join("|");
		}

		/**
		 * Get a snapshot.
		 *
		 * @returns {Object|null}
		 * @memberof BaseMetric
		 */
		snapshot() {
			if (!this.dirty && this.lastSnapshot) return this.lastSnapshot;

			this.lastSnapshot = this.generateSnapshot();
			this.clearDirty();

			return this.lastSnapshot;
		}

		/**
		 * Generate a snapshot.
		 *
		 * @returns {Array}
		 * @memberof BaseMetric
		 */
		generateSnapshot() {
			/* istanbul ignore next */
			throw new Error("Not implemented");
		}

		/**
		 * Metric has been changed.
		 * @param {any=} value
		 * @param {Object=} labels
		 * @param {Number=} timestamp
		 */
		changed(value, labels, timestamp) {
			this.setDirty();
			this.registry.changed(this, value, labels, timestamp);
		}

		/**
		 * Export to a POJO.
		 */
		toObject() {
			return {
				type: this.type,
				name: this.name,
				description: this.description,
				labelNames: this.labelNames,
				unit: this.unit,

				values: this.snapshot()
			};
		}
	}

	var base = BaseMetric;

	const INTERVAL = 5;
	const SECONDS_PER_MINUTE = 60.0;

	// https://github.com/dropwizard/metrics/blob/4.0-maintenance/metrics-core/src/main/java/com/codahale/metrics/EWMA.java
	/* istanbul ignore next
	function getAlpha(min) {
		return 1 - Math.exp(-INTERVAL / SECONDS_PER_MINUTE / min);
	}
	*/

	/**
	 * @typedef {import("./rates")} MetricRateClass
	 */

	/**
	 * @implements {MetricRateClass}
	 */
	class MetricRate {
		constructor(metric, item, min) {
			this.metric = metric;
			this.item = item;
			this.min = min;
			//this.alpha = getAlpha(min);

			this.rate = 0;

			this.lastValue = 0;
			this.lastTickTime = Date.now();
			this.value = null;

			this.timer = timersBrowserify.setInterval(() => this.tick(), INTERVAL * 1000).unref();
		}

		update(value) {
			this.value = value;
		}

		tick() {
			// Get elapsed seconds
			const now = Date.now();
			const elapsedSec = (now - this.lastTickTime) / 1000;
			this.lastTickTime = now;

			// Get difference between new and old value
			const diff = this.value - this.lastValue;
			this.lastValue = this.value;

			// Calculate the current requests/minute
			const oneMinRate = (diff / elapsedSec) * SECONDS_PER_MINUTE;

			// Weighted calculation
			let rate = this.rate + (oneMinRate - this.rate) * 0.5;
			// EWMA: const rate = this.rate + (this.alpha * (oneMinRate - this.rate));

			// Rounding
			if (Math.abs(rate) < 0.05) rate = 0;
			const changed = Math.abs(rate - this.rate) > 0.01;

			this.rate = rate;

			if (changed) this.metric.changed(this.item.value, this.item.labels, now);
		}

		reset() {
			this.lastValue = 0;
			this.value = null;

			this.rate = 0;
		}
	}
	var rates = MetricRate;

	const { pick } = ___default;




	/**
	 * Import types
	 *
	 * @typedef {import("../registry")} MetricRegistry
	 * @typedef {import("./gauge")} GaugeMetricClass
	 * @typedef {import("./gauge").GaugeMetricSnapshot} GaugeMetricSnapshot
	 * @typedef {import("./gauge").GaugeMetricOptions} GaugeMetricOptions
	 */

	/**
	 * Gauge metric class.
	 *
	 * @class GaugeMetric
	 * @extends {BaseMetric}
	 * @implements {GaugeMetricClass}
	 */
	class GaugeMetric extends base {
		/**
		 * Creates an instance of GaugeMetric.
		 * @param {GaugeMetricOptions} opts
		 * @param {MetricRegistry} registry
		 * @memberof GaugeMetric
		 */
		constructor(opts, registry) {
			super(opts, registry);
			this.type = constants$1.TYPE_GAUGE;
			this.rate = opts.rate;
		}

		/**
		 * Increment value
		 *
		 * @param {Object} labels
		 * @param {Number?} value
		 * @param {Number?} timestamp
		 * @returns
		 * @memberof GaugeMetric
		 */
		increment(labels, value, timestamp) {
			if (value == null) value = 1;

			const item = this.get(labels);
			return this.set((item ? item.value : 0) + value, labels, timestamp);
		}

		/**
		 * Decrement value.
		 *
		 * @param {Object} labels
		 * @param {Number?} value
		 * @param {Number?} timestamp
		 * @returns
		 * @memberof GaugeMetric
		 */
		decrement(labels, value, timestamp) {
			if (value == null) value = 1;

			const item = this.get(labels);
			return this.set((item ? item.value : 0) - value, labels, timestamp);
		}

		/**
		 * Set value.
		 *
		 * @param {Number?} value
		 * @param {Object} labels
		 * @param {Number?} timestamp
		 * @returns
		 * @memberof GaugeMetric
		 */
		set(value, labels, timestamp) {
			const hash = this.hashingLabels(labels);
			let item = this.values.get(hash);
			if (item) {
				if (item.value != value) {
					item.value = value;
					item.timestamp = timestamp == null ? Date.now() : timestamp;

					if (item.rate) item.rate.update(value);

					this.changed(value, labels, timestamp);
				}
			} else {
				item = {
					value,
					labels: pick(labels, this.labelNames),
					timestamp: timestamp == null ? Date.now() : timestamp
				};
				this.values.set(hash, item);

				if (this.rate) {
					item.rate = new rates(this, item, 1);
					item.rate.update(value);
				}

				this.changed(value, labels, timestamp);
			}

			return item;
		}

		/**
		 * Reset item by labels.
		 *
		 * @param {Object?} labels
		 * @param {Number?} timestamp
		 * @returns
		 * @memberof GaugeMetric
		 */
		reset(labels, timestamp) {
			return this.set(0, labels, timestamp);
		}

		/**
		 * Reset all items.
		 *
		 * @param {Number?} timestamp
		 * @memberof GaugeMetric
		 */
		resetAll(timestamp) {
			this.values.forEach(item => {
				item.value = 0;
				item.timestamp = timestamp == null ? Date.now() : timestamp;
			});
			this.changed(null, null, timestamp);
		}

		/**
		 * Generate a snapshot.
		 *
		 * @returns {Array<GaugeMetricSnapshot>}
		 * @memberof GaugeMetric
		 */
		generateSnapshot() {
			const snapshot = Array.from(this.values.keys()).map(key => {
				const item = this.values.get(key);
				const res = {
					key,
					value: item.value,
					labels: item.labels,
					timestamp: item.timestamp
				};

				if (item.rate) res.rate = item.rate.rate;

				return res;
			});

			return snapshot;
		}
	}

	var gauge = GaugeMetric;

	/**
	 * Import types
	 *
	 * @typedef {import("../registry")} MetricRegistry
	 * @typedef {import("./counter")} CounterMetricClass
	 * @typedef {import("./gauge").GaugeMetricOptions} GaugeMetricOptions
	 */

	/**
	 * Counter metric class.
	 *
	 * @class CounterMetric
	 * @extends {GaugeMetric}
	 * @implements {CounterMetricClass}
	 */
	class CounterMetric extends gauge {
		/**
		 * Creates an instance of CounterMetric.
		 * @param {GaugeMetricOptions} opts
		 * @param {MetricRegistry} registry
		 * @memberof CounterMetric
		 */
		constructor(opts, registry) {
			super(opts, registry);
			this.type = constants$1.TYPE_COUNTER;
		}

		/**
		 * Disabled decrement method.
		 *
		 * @memberof CounterMetric
		 */
		decrement() {
			throw new Error("Counter can't be decreased.");
		}
	}

	var counter = CounterMetric;

	const { isPlainObject } = utils_1;
	const sortAscending = (a, b) => a - b;
	const setProp = (o, k, v) => {
		o[k] = v;
		return o;
	};

	/**
	 * Import types
	 *
	 * @typedef {import("../registry")} MetricRegistry
	 * @typedef {import("./histogram")} HistogramMetricClass
	 * @typedef {import("./histogram").HistogramMetricSnapshot} HistogramMetricSnapshot
	 * @typedef {import("./histogram").HistogramMetricOptions} HistogramMetricOptions
	 */

	/**
	 * Histogram metric class.
	 *
	 * @class HistogramMetric
	 * @extends {BaseMetric}
	 * @implements {HistogramMetricClass}
	 */
	class HistogramMetric extends base {
		/**
		 * Creates an instance of HistogramMetric.
		 * @param {HistogramMetricOptions} opts
		 * @param {MetricRegistry} registry
		 * @memberof HistogramMetric
		 */
		constructor(opts, registry) {
			super(opts, registry);
			this.type = constants$1.TYPE_HISTOGRAM;

			// Create buckets
			if (isPlainObject(opts.linearBuckets)) {
				this.buckets = HistogramMetric.generateLinearBuckets(
					opts.linearBuckets.start,
					opts.linearBuckets.width,
					opts.linearBuckets.count
				);
			} else if (isPlainObject(opts.exponentialBuckets)) {
				this.buckets = HistogramMetric.generateExponentialBuckets(
					opts.exponentialBuckets.start,
					opts.exponentialBuckets.factor,
					opts.exponentialBuckets.count
				);
			} else if (Array.isArray(opts.buckets)) {
				this.buckets = Array.from(opts.buckets);
			} else if (opts.buckets === true) {
				this.buckets = this.registry.opts.defaultBuckets;
			}
			if (this.buckets) {
				this.buckets.sort(sortAscending);
			}

			// Create quantiles
			if (Array.isArray(opts.quantiles)) {
				this.quantiles = Array.from(opts.quantiles);
			} else if (opts.quantiles === true) {
				this.quantiles = this.registry.opts.defaultQuantiles;
			}
			if (this.quantiles) {
				this.quantiles.sort(sortAscending);
				this.maxAgeSeconds = opts.maxAgeSeconds || this.registry.opts.defaultMaxAgeSeconds; // 1 minute
				this.ageBuckets = opts.ageBuckets || this.registry.opts.defaultAgeBuckets; // 10 secs per bucket
			}

			this.rate = opts.rate;
		}

		/**
		 * Observe a value.
		 *
		 * @param {Number} value
		 * @param {Object?} labels
		 * @param {Number?} timestamp
		 * @returns
		 * @memberof HistogramMetric
		 */
		observe(value, labels, timestamp) {
			const hash = this.hashingLabels(labels);
			let item = this.values.get(hash);
			if (!item) {
				item = this.resetItem(
					{
						labels: ___default.pick(labels, this.labelNames)
					},
					null
				);

				if (this.rate) item.rate = new rates(this, item, 1);

				this.values.set(hash, item);
			}

			item.timestamp = timestamp == null ? Date.now() : timestamp;
			item.sum += value;
			item.count++;
			item.lastValue = value;

			if (item.bucketValues) {
				const len = this.buckets.length;
				for (let i = 0; i < len; i++) {
					if (value <= this.buckets[i]) {
						item.bucketValues[this.buckets[i]] += 1;
					}
				}
			}

			if (item.quantileValues) {
				item.quantileValues.add(value);
			}

			if (item.rate) item.rate.update(item.count);

			this.changed(value, labels, timestamp);

			return item;
		}

		/**
		 * Create new bucket values based on options.
		 *
		 * @returns {Object}
		 * @memberof HistogramMetric
		 */
		createBucketValues() {
			return this.buckets.reduce((a, bound) => setProp(a, bound, 0), {});
		}

		/**
		 * Generate a snapshot
		 *
		 * @returns {Array<Object>}
		 * @memberof HistogramMetric
		 */
		generateSnapshot() {
			return Array.from(this.values.keys()).map(key =>
				this.generateItemSnapshot(this.values.get(key), key)
			);
		}

		/**
		 * Generate a snapshot for an item
		 *
		 * @param {Object} item
		 * @param {String} key
		 * @returns {Object}
		 * @memberof HistogramMetric
		 */
		generateItemSnapshot(item, key) {
			const snapshot = {
				key,
				labels: item.labels,
				count: item.count,
				sum: item.sum,
				lastValue: item.lastValue,
				timestamp: item.timestamp
			};

			if (this.buckets)
				snapshot.buckets = this.buckets.reduce(
					(a, b) => setProp(a, b, item.bucketValues[b]),
					{}
				);

			if (this.quantiles) Object.assign(snapshot, item.quantileValues.snapshot());

			if (item.rate) snapshot.rate = item.rate.rate;

			return snapshot;
		}

		/**
		 * Reset value of item.
		 *
		 * @param {Object} item
		 * @param {Number?} timestamp
		 */
		resetItem(item, timestamp) {
			item.timestamp = timestamp == null ? Date.now() : timestamp;
			item.sum = 0;
			item.count = 0;
			item.lastValue = null;

			if (this.buckets) {
				item.bucketValues = this.createBucketValues();
			}

			if (this.quantiles) {
				item.quantileValues = new TimeWindowQuantiles(
					this,
					this.quantiles,
					this.maxAgeSeconds,
					this.ageBuckets
				);
			}

			return item;
		}

		/**
		 * Reset item by labels.
		 *
		 * @param {Object} labels
		 * @param {Number?} timestamp
		 * @returns
		 * @memberof HistogramMetric
		 */
		reset(labels, timestamp) {
			const hash = this.hashingLabels(labels);
			const item = this.values.get(hash);
			if (item) {
				this.resetItem(item, timestamp);
				this.changed(null, labels, timestamp);
			}
		}

		/**
		 * Reset all items.
		 *
		 * @param {Number?} timestamp
		 * @memberof HistogramMetric
		 */
		resetAll(timestamp) {
			this.values.forEach(item => this.resetItem(item, timestamp));
			this.changed();
		}

		/**
		 * Generate linear buckets
		 *
		 * @static
		 * @param {Number} start
		 * @param {Number} width
		 * @param {Number} count
		 * @returns {Array<Number>}
		 * @memberof HistogramMetric
		 */
		static generateLinearBuckets(start, width, count) {
			const buckets = [];
			for (let i = 0; i < count; i++) buckets.push(start + i * width);

			return buckets;
		}

		/**
		 * Generate exponential buckets
		 *
		 * @static
		 * @param {Number} start
		 * @param {Number} factor
		 * @param {Number} count
		 * @returns {Array<Number>}
		 * @memberof HistogramMetric
		 */
		static generateExponentialBuckets(start, factor, count) {
			const buckets = [];
			for (let i = 0; i < count; i++) buckets[i] = start * Math.pow(factor, i);

			return buckets;
		}
	}

	/**
	 * Timewindow class for quantiles.
	 *
	 * @class TimeWindowQuantiles
	 */
	class TimeWindowQuantiles {
		/**
		 * Creates an instance of TimeWindowQuantiles.
		 * @param {BaseMetric} metric
		 * @param {Array<Number>} quantiles
		 * @param {Number} maxAgeSeconds
		 * @param {Number} ageBuckets
		 * @memberof TimeWindowQuantiles
		 */
		constructor(metric, quantiles, maxAgeSeconds, ageBuckets) {
			this.metric = metric;
			this.quantiles = Array.from(quantiles);
			this.maxAgeSeconds = maxAgeSeconds;
			this.ageBuckets = ageBuckets;
			this.ringBuckets = [];
			for (let i = 0; i < ageBuckets; i++) {
				this.ringBuckets.push(new Bucket());
			}
			this.dirty = true;

			this.currentBucket = -1;
			this.rotate();

			this.lastSnapshot = null;
			this.setDirty();
		}

		/**
		 * Set dirty flag.
		 *
		 * @memberof TimeWindowQuantiles
		 */
		setDirty() {
			this.dirty = true;
			this.metric.setDirty();
		}

		/**
		 * Clear dirty flag.
		 *
		 * @memberof TimeWindowQuantiles
		 */
		clearDirty() {
			this.dirty = false;
		}

		/**
		 * Rotate the ring buckets.
		 *
		 * @memberof TimeWindowQuantiles
		 */
		rotate() {
			this.currentBucket = (this.currentBucket + 1) % this.ageBuckets;
			this.ringBuckets[this.currentBucket].clear();
			this.setDirty();

			timersBrowserify.setTimeout(() => this.rotate(), (this.maxAgeSeconds / this.ageBuckets) * 1000).unref();
		}

		/**
		 * Add a new value to the current bucket.
		 *
		 * @param {Number} value
		 * @memberof TimeWindowQuantiles
		 */
		add(value) {
			this.setDirty();
			this.ringBuckets[this.currentBucket].add(value);
		}

		/**
		 * Generate a snapshot from buckets and calculate min, max, mean, quantiles, variance & StdDev.
		 *
		 * @returns {Object}
		 * @memberof TimeWindowQuantiles
		 */
		snapshot() {
			if (!this.dirty && this.lastSnapshot) return this.lastSnapshot;

			const samples = this.ringBuckets.reduce((a, b) => a.concat(b.samples), []);
			samples.sort(sortAscending);

			const mean = samples.length ? samples.reduce((a, b) => a + b, 0) / samples.length : null;
			const variance =
				samples.length > 1
					? samples.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / (samples.length - 1)
					: null;
			const stdDev = variance ? Math.sqrt(variance) : null;

			this.lastSnapshot = {
				min: samples.length ? samples[0] : null,
				mean,
				variance,
				stdDev,
				max: samples.length ? samples[samples.length - 1] : null,
				quantiles: this.quantiles.reduce(
					(a, q) => setProp(a, q, samples[Math.ceil(q * samples.length) - 1]),
					{}
				)
			};

			this.clearDirty();

			return this.lastSnapshot;
		}
	}

	/**
	 * Bucket class
	 *
	 * @class Bucket
	 */
	class Bucket {
		/**
		 * Creates an instance of Bucket.
		 * @memberof Bucket
		 */
		constructor() {
			this.count = 0;
			this.samples = [];
		}

		/**
		 * Add value to the bucket.
		 *
		 * @param {Number} value
		 * @memberof Bucket
		 */
		add(value) {
			this.samples.push(value);
			this.count++;
		}

		/**
		 * Clear bucket.
		 *
		 * @memberof Bucket
		 */
		clear() {
			this.count = 0;
			this.samples.length = 0;
		}
	}

	HistogramMetric.Bucket = Bucket;
	HistogramMetric.TimeWindowQuantiles = TimeWindowQuantiles;

	var histogram = HistogramMetric;

	const { pick: pick$1 } = ___default;



	/**
	 * Import types
	 *
	 * @typedef {import("../registry")} MetricRegistry
	 * @typedef {import("./info")} InfoMetricClass
	 * @typedef {import("./info").InfoMetricSnapshot} InfoMetricSnapshot
	 * @typedef {import("./base").BaseMetricOptions} BaseMetricOptions
	 */

	/**
	 * Information metric.
	 *
	 * @class InfoMetric
	 * @extends {BaseMetric}
	 * @implements {InfoMetricClass}
	 */
	class InfoMetric extends base {
		/**
		 * Creates an instance of InfoMetric.
		 * @param {BaseMetricOptions} opts
		 * @param {MetricRegistry} registry
		 * @memberof InfoMetric
		 */
		constructor(opts, registry) {
			super(opts, registry);
			this.type = constants$1.TYPE_INFO;
		}

		/**
		 * Set value.
		 *
		 * @param {any} value
		 * @param {Object?} labels
		 * @param {Number?} timestamp
		 * @returns
		 * @memberof InfoMetric
		 */
		set(value, labels, timestamp) {
			const hash = this.hashingLabels(labels);
			let item = this.values.get(hash);
			if (item) {
				if (value != item.value) {
					item.value = value;
					item.timestamp = timestamp == null ? Date.now() : timestamp;
					this.changed(value, labels, timestamp);
				}
			} else {
				item = {
					value,
					labels: pick$1(labels, this.labelNames),
					timestamp: timestamp == null ? Date.now() : timestamp
				};
				this.values.set(hash, item);
				this.changed(value, labels, timestamp);
			}

			return item;
		}

		/**
		 * Reset item by labels.
		 *
		 * @param {Object} labels
		 * @param {Number?} timestamp
		 * @returns
		 * @memberof InfoMetric
		 */
		reset(labels, timestamp) {
			return this.set(null, labels, timestamp);
		}

		/**
		 * Reset all items.
		 *
		 * @param {Number?} timestamp
		 * @memberof InfoMetric
		 */
		resetAll(timestamp) {
			this.values.forEach(item => {
				item.value = null;
				item.timestamp = timestamp == null ? Date.now() : timestamp;
			});
			this.changed();
		}

		/**
		 * Generate a snapshot.
		 *
		 * @returns {Array<InfoMetricSnapshot>}
		 * @memberof InfoMetric
		 */
		generateSnapshot() {
			const snapshot = Array.from(this.values.keys()).map(key => {
				const item = this.values.get(key);
				return {
					key,
					value: item.value,
					labels: item.labels,
					timestamp: item.timestamp
				};
			});

			return snapshot;
		}
	}

	var info = InfoMetric;

	const { BrokerOptionsError } = errors;

	const Types = {
		Base: base,
		Counter: counter,
		Gauge: gauge,
		Histogram: histogram,
		Info: info
	};

	/**
	 * Import types
	 *
	 * @typedef {import("./base")} BaseMetric
	 */

	/**
	 * Get MetricType class by name.
	 *
	 * @param {String} name
	 * @returns
	 */
	function getByName(name) {
		/* istanbul ignore next */
		if (!name) return null;

		let n = Object.keys(Types).find(n => n.toLowerCase() == name.toLowerCase());
		if (n) return Types[n];
	}

	/**
	 * Resolve metric type by name
	 *
	 * @param {string} type
	 * @returns {BaseMetric}
	 * @memberof ServiceBroker
	 */
	function resolve(type) {
		const TypeClass = getByName(type);
		if (!TypeClass) throw new BrokerOptionsError(`Invalid metric type '${type}'.`, { type });

		return TypeClass;
	}

	/**
	 * Register a custom metric types
	 * @param {string} name
	 * @param {BaseMetric} value
	 */
	function register(name, value) {
		Types[name] = value;
	}

	var types = Object.assign(Types, { resolve, register });

	/* eslint-disable no-unused-vars */


	const { match, isString } = utils_1;

	/**
	 * Import types
	 *
	 * @typedef {import("../registry")} MetricRegistry
	 * @typedef {import("./base").MetricReporterOptions} MetricReporterOptions
	 * @typedef {import("./base")} MetricBaseReporterClass
	 * @typedef {import("../types/base")} BaseMetric
	 */

	/**
	 * Metric reporter base class.
	 *
	 * @class MetricBaseReporter
	 * @implements {MetricBaseReporterClass}
	 */
	class MetricBaseReporter {
		/**
		 * Creates an instance of BaseReporter.
		 *
		 * @param {MetricReporterOptions?} opts
		 * @memberof MetricBaseReporter
		 */
		constructor(opts) {
			this.opts = ___default.defaultsDeep(opts, {
				includes: null,
				excludes: null,

				metricNamePrefix: null,
				metricNameSuffix: null,

				metricNameFormatter: null,
				labelNameFormatter: null
			});

			if (isString(this.opts.includes)) this.opts.includes = [this.opts.includes];
			if (isString(this.opts.excludes)) this.opts.excludes = [this.opts.excludes];
		}

		/**
		 * Initialize reporter
		 *
		 * @param {MetricRegistry} registry
		 * @memberof MetricBaseReporter
		 */
		init(registry) {
			this.registry = registry;
			this.broker = this.registry.broker;
			this.logger = this.registry.logger;
		}

		/**
		 * Stop reporter
		 *
		 * @memberof MetricBaseReporter
		 */
		stop() {
			return Promise.resolve();
		}

		/**
		 * Match the metric name. Check the `includes` & `excludes` patterns.
		 *
		 * @param {String} name
		 * @returns {boolean}
		 * @memberof MetricBaseReporter
		 */
		matchMetricName(name) {
			if (Array.isArray(this.opts.includes)) {
				if (!this.opts.includes.some(pattern => match(name, pattern))) return false;
			}

			if (Array.isArray(this.opts.excludes)) {
				if (!this.opts.excludes.every(pattern => !match(name, pattern))) return false;
			}

			return true;
		}

		/**
		 * Format metric name. Add prefix, suffix and call custom formatter.
		 *
		 * @param {String} name
		 * @returns {String}
		 * @memberof MetricBaseReporter
		 */
		formatMetricName(name) {
			name =
				(this.opts.metricNamePrefix ? this.opts.metricNamePrefix : "") +
				name +
				(this.opts.metricNameSuffix ? this.opts.metricNameSuffix : "");
			if (this.opts.metricNameFormatter) return this.opts.metricNameFormatter(name);
			return name;
		}

		/**
		 * Format label name. Call custom formatter.
		 *
		 * @param {String} name
		 * @returns {String}
		 * @memberof MetricBaseReporter
		 */
		formatLabelName(name) {
			if (this.opts.labelNameFormatter) return this.opts.labelNameFormatter(name);
			return name;
		}

		/**
		 * Some metric has been changed.
		 *
		 * @param {BaseMetric} metric
		 * @param {any} value
		 * @param {Object} labels
		 * @param {Number?} timestamp
		 *
		 * @memberof MetricBaseReporter
		 */
		metricChanged(metric, value, labels, timestamp) {
			// Not implemented. Abstract method
		}
	}

	var base$1 = MetricBaseReporter;

	const { isFunction } = utils_1;

	/**
	 * Import types
	 *
	 * @typedef {import("../registry")} MetricRegistry
	 * @typedef {import("./console").ConsoleReporterOptions} ConsoleReporterOptions
	 * @typedef {import("./console")} ConsoleReporterClass
	 * @typedef {import("../types/base")} BaseMetric
	 */

	/**
	 * Console reporter for Moleculer Metrics
	 *
	 * @class ConsoleReporter
	 * @extends {BaseReporter}
	 * @implements {ConsoleReporterClass}
	 */
	class ConsoleReporter extends base$1 {
		/**
		 * Creates an instance of ConsoleReporter.
		 *
		 * @param {ConsoleReporterOptions?} opts
		 * @memberof ConsoleReporter
		 */
		constructor(opts) {
			super(opts);

			/** @type {ConsoleReporterOptions} */
			this.opts = ___default.defaultsDeep(this.opts, {
				interval: 5,
				logger: null,
				colors: true,
				onlyChanges: true
			});

			if (!this.opts.colors) kleur_1.enabled = false;

			this.lastChanges = new Set();
		}

		/**
		 * Initialize reporter
		 *
		 * @param {MetricRegistry} registry
		 * @memberof ConsoleReporter
		 */
		init(registry) {
			super.init(registry);

			if (this.opts.interval > 0) {
				this.timer = timersBrowserify.setInterval(() => this.print(), this.opts.interval * 1000);
				this.timer.unref();
			}
		}

		/**
		 * Convert labels to label string
		 *
		 * @param {Object} labels
		 * @returns {String}
		 * @memberof ConsoleReporter
		 */
		labelsToStr(labels) {
			const keys = Object.keys(labels);
			if (keys.length === 0) return kleur_1.gray("{}");

			return (
				kleur_1.gray("{") +
				keys
					.map(
						key =>
							`${kleur_1.gray(this.formatLabelName(key))}: ${kleur_1.magenta(
							"" + labels[key]
						)}`
					)
					.join(", ") +
				kleur_1.gray("}")
			);
		}

		/**
		 * Print metrics to the console.
		 *
		 * @memberof ConsoleReporter
		 */
		print() {
			let list = this.registry.list({
				includes: this.opts.includes,
				excludes: this.opts.excludes
			});

			if (this.opts.onlyChanges) list = list.filter(metric => this.lastChanges.has(metric.name));

			if (list.length === 0) return;

			this.log(
				kleur_1.gray(`------------------- [ METRICS START (${list.length}) ] -------------------`)
			);

			list.forEach(metric => {
				this.log(
					kleur_1.cyan().bold(this.formatMetricName(metric.name)) +
						" " +
						kleur_1.gray("(" + metric.type + ")")
				);
				if (metric.values.size === 0) {
					this.log(kleur_1.gray("  <no values>"));
				} else {
					const unit = metric.unit
						? kleur_1.gray(this.registry.pluralizeUnit(metric.unit))
						: "";
					metric.values.forEach(item => {
						let val;
						const labelStr = this.labelsToStr(item.labels);
						switch (metric.type) {
							case constants$1.TYPE_COUNTER:
							case constants$1.TYPE_GAUGE:
							case constants$1.TYPE_INFO:
								val =
									item.value === ""
										? kleur_1.grey("<empty string>")
										: kleur_1.green().bold(item.value);
								if (item.rate != null) {
									/*const s = [];
									Object.keys(item.rates).forEach(b => {
										s.push(`Rate${b}: ${item.rates[b] != null ? item.rates[b].toFixed(2) : "-"}`);
									});

									val = kleur.green().bold(`Value: ${val} | ` + s.join(" | "));
									*/

									val =
										val +
										kleur_1.grey(" | Rate: ") +
										(item.rate != null
											? kleur_1.green().bold(item.rate.toFixed(2))
											: "-");
								}

								break;
							case constants$1.TYPE_HISTOGRAM: {
								const s = [];
								s.push(`Count: ${item.count}`);

								if (item.buckets) {
									Object.keys(item.buckets).forEach(b => {
										s.push(
											`${b}: ${item.buckets[b] != null ? item.buckets[b] : "-"}`
										);
									});
								}

								if (item.quantiles) {
									s.push(`Min: ${item.min != null ? item.min.toFixed(2) : "-"}`);
									s.push(`Mean: ${item.mean != null ? item.mean.toFixed(2) : "-"}`);
									s.push(
										`Var: ${item.variance != null ? item.variance.toFixed(2) : "-"}`
									);
									s.push(
										`StdDev: ${item.stdDev != null ? item.stdDev.toFixed(2) : "-"}`
									);
									s.push(`Max: ${item.max != null ? item.max.toFixed(2) : "-"}`);

									Object.keys(item.quantiles).forEach(key => {
										s.push(
											`${key}: ${
											item.quantiles[key] != null
												? item.quantiles[key].toFixed(2)
												: "-"
										}`
										);
									});
								}

								if (item.rate != null)
									s.push(`Rate: ${item.rate != null ? item.rate.toFixed(2) : "-"}`);

								val = kleur_1.green().bold(s.join(" | "));
								break;
							}
						}
						this.log(`  ${labelStr}: ${val} ${unit}`);
					});
				}
				this.log("");
			});

			this.log(
				kleur_1.gray(`-------------------- [ METRICS END (${list.length}) ] --------------------`)
			);

			this.lastChanges.clear();
		}

		/**
		 * Print messages
		 *
		 * @param  {...any} args
		 */
		log(...args) {
			if (isFunction(this.opts.logger)) {
				return this.opts.logger(...args);
			} else {
				return this.logger.info(...args);
			}
		}

		/**
		 * Some metric has been changed.
		 *
		 * @param {BaseMetric} metric
		 *
		 * @memberof BaseReporter
		 */
		metricChanged(metric) {
			if (!this.matchMetricName(metric.name)) return;

			this.lastChanges.add(metric.name);
		}
	}

	var console$1 = ConsoleReporter;

	var require$$19 = () => {
	  console.warn('moleculer-browser: This module is not compatible with the browser.');
	};

	/**
	 * Import types
	 *
	 * @typedef {import("../registry")} MetricRegistry
	 * @typedef {import("./event").EventReporterOptions} EventReporterOptions
	 * @typedef {import("./event")} EventReporterClass
	 * @typedef {import("../types/base").BaseMetricPOJO} BaseMetricPOJO
	 * @typedef {import("../types/base")} BaseMetric
	 */

	/**
	 * Event reporter for Moleculer Metrics
	 *
	 * @class EventReporter
	 * @extends {BaseReporter}
	 * @implements {EventReporterClass}
	 */
	class EventReporter extends base$1 {
		/**
		 * Creates an instance of EventReporter.
		 * @param {EventReporterOptions} opts
		 * @memberof EventReporter
		 */
		constructor(opts) {
			super(opts);

			/** @type {EventReporterOptions} */
			this.opts = ___default.defaultsDeep(this.opts, {
				eventName: "$metrics.snapshot",

				broadcast: false,
				groups: null,

				onlyChanges: false,

				interval: 5
			});

			this.lastChanges = new Set();
		}

		/**
		 * Initialize reporter.
		 *
		 * @param {MetricRegistry} registry
		 * @memberof EventReporter
		 */
		init(registry) {
			super.init(registry);

			if (this.opts.interval > 0) {
				this.timer = timersBrowserify.setInterval(() => this.sendEvent(), this.opts.interval * 1000);
				this.timer.unref();
			}
		}

		/**
		 * Send metrics snapshot via event.
		 *
		 * @memberof EventReporter
		 */
		sendEvent() {
			let list = this.registry.list({
				includes: this.opts.includes,
				excludes: this.opts.excludes
			});

			if (this.opts.onlyChanges) list = list.filter(metric => this.lastChanges.has(metric.name));

			if (list.length === 0) return;

			if (this.opts.broadcast) {
				this.logger.debug(`Send metrics.snapshot (${list.length} metrics) broadcast events.`);
				this.broker.broadcast(this.opts.eventName, list, { groups: this.opts.groups });
			} else {
				this.logger.debug(`Send metrics.snapshot (${list.length} metrics) events.`);
				this.broker.emit(this.opts.eventName, list, { groups: this.opts.groups });
			}

			this.lastChanges.clear();
		}

		/**
		 * Some metric has been changed.
		 *
		 * @param {BaseMetric} metric
		 * @memberof BaseReporter
		 */
		metricChanged(metric) {
			if (!this.matchMetricName(metric.name)) return;

			this.lastChanges.add(metric.name);
		}
	}

	var event = EventReporter;

	const { isObject, isString: isString$1, isInheritedClass } = utils_1;
	const { BrokerOptionsError: BrokerOptionsError$1 } = errors;

	const Reporters = {
		Base: base$1,
		Console: console$1,
		CSV: require$$19,
		Event: event,
		Datadog: require$$19,
		Prometheus: require$$19,
		StatsD: require$$19
	};

	function getByName$1(name) {
		/* istanbul ignore next */
		if (!name) return null;

		let n = Object.keys(Reporters).find(n => n.toLowerCase() == name.toLowerCase());
		if (n) return Reporters[n];
	}

	/**
	 * Resolve reporter by name
	 *
	 * @param {Record<string,any>|string} opt
	 * @returns {any}
	 * @memberof ServiceBroker
	 */
	function resolve$1(opt) {
		if (isObject(opt) && isInheritedClass(opt, Reporters.Base)) {
			return opt;
		} else if (isString$1(opt)) {
			let ReporterClass = getByName$1(opt);
			if (ReporterClass) return new ReporterClass();
		} else if (isObject(opt)) {
			let ReporterClass = getByName$1(opt.type);
			if (ReporterClass) return new ReporterClass(opt.options);
			else
				throw new BrokerOptionsError$1(`Invalid metric reporter type '${opt.type}'.`, {
					type: opt.type
				});
		}

		throw new BrokerOptionsError$1(`Invalid metric reporter type '${opt}'.`, { type: opt });
	}

	function register$1(name, value) {
		Reporters[name] = value;
	}

	var reporters = Object.assign(Reporters, { resolve: resolve$1, register: register$1 });

	/**
	 * CPU usage measure.
	 *
	 * Based on: https://github.com/icebob/cpu
	 */


	/* istanbul ignore next */
	var cpuUsage = function getCpuUsage(sampleTime = 100) {
		return new Promise((resolve, reject) => {
			try {
				const first = require$$0__default().map(cpu => cpu.times);
				timersBrowserify.setTimeout(() => {
					try {
						const second = require$$0__default().map(cpu => cpu.times);
						timersBrowserify.setTimeout(() => {
							try {
								const third = require$$0__default().map(cpu => cpu.times);

								const usages = [];
								for (let i = 0; i < first.length; i++) {
									const first_idle = first[i].idle;
									const first_total =
										first[i].idle +
										first[i].user +
										first[i].nice +
										first[i].sys +
										first[i].irq;
									const second_idle = second[i].idle;
									const second_total =
										second[i].idle +
										second[i].user +
										second[i].nice +
										second[i].sys +
										second[i].irq;
									const third_idle = third[i].idle;
									const third_total =
										third[i].idle +
										third[i].user +
										third[i].nice +
										third[i].sys +
										third[i].irq;
									const first_usage =
										1 - (second_idle - first_idle) / (second_total - first_total);
									const second_usage =
										1 - (third_idle - second_idle) / (third_total - second_total);
									const per_usage = ((first_usage + second_usage) / 2) * 100;
									usages.push(per_usage);
								}

								resolve({
									avg: usages.reduce((a, b) => a + b, 0) / usages.length,
									usages
								});
							} catch (err) {
								reject(err);
							}
						}, sampleTime);
					} catch (err) {
						reject(err);
					}
				}, sampleTime);
			} catch (err) {
				reject(err);
			}
		});
	};

	// Simulate https://nodejs.org/api/os.html#os_os_loadavg
	const _osLoadAvg = [
	  // 1 minute
	  {
	    time: Math.floor(Date.now() / 1000),
	    init: false,
	    avg: 0
	  },

	  // 5 minutes
	  {
	    time: Math.floor(Date.now() / 1000),
	    avg: 0
	  },

	  // 15 minutes
	  {
	    time: Math.floor(Date.now() / 1000),
	    avg: 0
	  }
	];

	function updateLoadAvg (avg) {
	  const currentTime = Math.floor(Date.now() / 1000);
	  if (!_osLoadAvg[0].init || (currentTime - _osLoadAvg[0].time) > 60) {
	    _osLoadAvg[0].init = true;
	    _osLoadAvg[0].time = currentTime;
	    _osLoadAvg[0].avg = avg;
	  }

	  if ((currentTime - _osLoadAvg[1].time) > 60 * 5) {
	    _osLoadAvg[1].time = currentTime;
	    _osLoadAvg[1].avg = avg;
	  }

	  if ((currentTime - _osLoadAvg[2].time) > 60 * 15) {
	    _osLoadAvg[2].time = currentTime;
	    _osLoadAvg[2].avg = avg;
	  }
	}

	function loadavg () {
	  return _osLoadAvg.map(value => value.avg)
	}

	/**
	 * getCpuUsage
	 *
	 * Simulate cpuUsage of the browser based on the FPS performance.
	 *
	 * rate 1 (60fps) -> 0% usage
	 * rate 0.5 (30fps) -> 50% usage
	 * rate 0 (0fps) -> 100% usage
	 *
	 * @param {Boolean=100} sampleTime
	 * @returns {Promise<Result>}
	 */
	function getCpuUsage (sampleTime = 100) {
	  const engine = new RafPerf__default({
	    performances: {
	      enabled: true,
	      samplesCount: 3,
	      sampleDuration: sampleTime
	    }
	  });

	  return new Promise((resolve, reject) => {
	    engine.once('perf', ratio => {
	      engine.stop();

	      if (!ratio) {
	        return reject(new Error('CpuUsage: ratio perf not found.'))
	      }

	      const avg = 100 - (ratio * 100);
	      const avgByCpu = avg / require$$0__default().length;

	      updateLoadAvg(avg);

	      resolve({
	        avg,
	        usages: require$$0__default().map(cpu => avgByCpu)
	      });
	    });

	    engine.start();
	  })
	}

	getCpuUsage.loadavg = loadavg;

	let v8;

	// Load `v8` module for heap metrics.
	try {
		v8 = null;
	} catch {
		// silent
	}

	/**
	 * Register common OS, process & Moleculer metrics.
	 */
	function registerCommonMetrics() {
		this.logger.debug("Registering common metrics...");

		// --- METRICS SELF METRICS ---

		// this.register({ name: METRIC.MOLECULER_METRICS_COMMON_COLLECT_TOTAL, type: METRIC.TYPE_COUNTER, description: "Number of metric collections" });
		// this.register({ name: METRIC.MOLECULER_METRICS_COMMON_COLLECT_TIME, type: METRIC.TYPE_GAUGE, description: "Time of collecting metrics", unit: METRIC.UNIT_MILLISECONDS });

		// --- PROCESS METRICS ---

		const item = this.register({
			name: constants$1.PROCESS_ARGUMENTS,
			type: constants$1.TYPE_INFO,
			labelNames: ["index"],
			description: "Process arguments"
		});
		_process.argv.map((arg, index) => item.set(arg, { index }));

		this.register({
			name: constants$1.PROCESS_PID,
			type: constants$1.TYPE_INFO,
			description: "Process PID"
		}).set(_process.pid);
		this.register({
			name: constants$1.PROCESS_PPID,
			type: constants$1.TYPE_INFO,
			description: "Process parent PID"
		}).set(_process.ppid);

		this.register({
			name: constants$1.PROCESS_MEMORY_HEAP_SIZE_TOTAL,
			type: constants$1.TYPE_GAUGE,
			unit: constants$1.UNIT_BYTE,
			description: "Process heap size"
		});
		this.register({
			name: constants$1.PROCESS_MEMORY_HEAP_SIZE_USED,
			type: constants$1.TYPE_GAUGE,
			unit: constants$1.UNIT_BYTE,
			description: "Process used heap size"
		});
		this.register({
			name: constants$1.PROCESS_MEMORY_RSS,
			type: constants$1.TYPE_GAUGE,
			unit: constants$1.UNIT_BYTE,
			description: "Process RSS size"
		});
		this.register({
			name: constants$1.PROCESS_MEMORY_EXTERNAL,
			type: constants$1.TYPE_GAUGE,
			unit: constants$1.UNIT_BYTE,
			description: "Process external memory size"
		});

		this.register({
			name: constants$1.PROCESS_MEMORY_HEAP_SPACE_SIZE_TOTAL,
			type: constants$1.TYPE_GAUGE,
			labelNames: ["space"],
			unit: constants$1.UNIT_BYTE,
			description: "Process total heap space size"
		});
		this.register({
			name: constants$1.PROCESS_MEMORY_HEAP_SPACE_SIZE_USED,
			type: constants$1.TYPE_GAUGE,
			labelNames: ["space"],
			unit: constants$1.UNIT_BYTE,
			description: "Process used heap space size"
		});
		this.register({
			name: constants$1.PROCESS_MEMORY_HEAP_SPACE_SIZE_AVAILABLE,
			type: constants$1.TYPE_GAUGE,
			labelNames: ["space"],
			unit: constants$1.UNIT_BYTE,
			description: "Process available heap space size"
		});
		this.register({
			name: constants$1.PROCESS_MEMORY_HEAP_SPACE_SIZE_PHYSICAL,
			type: constants$1.TYPE_GAUGE,
			labelNames: ["space"],
			unit: constants$1.UNIT_BYTE,
			description: "Process physical heap space size"
		});

		this.register({
			name: constants$1.PROCESS_MEMORY_HEAP_STAT_HEAP_SIZE_TOTAL,
			type: constants$1.TYPE_GAUGE,
			unit: constants$1.UNIT_BYTE,
			description: "Process heap stat size"
		});
		this.register({
			name: constants$1.PROCESS_MEMORY_HEAP_STAT_EXECUTABLE_SIZE_TOTAL,
			type: constants$1.TYPE_GAUGE,
			unit: constants$1.UNIT_BYTE,
			description: "Process heap stat executable size"
		});
		this.register({
			name: constants$1.PROCESS_MEMORY_HEAP_STAT_PHYSICAL_SIZE_TOTAL,
			type: constants$1.TYPE_GAUGE,
			unit: constants$1.UNIT_BYTE,
			description: "Process heap stat physical size"
		});
		this.register({
			name: constants$1.PROCESS_MEMORY_HEAP_STAT_AVAILABLE_SIZE_TOTAL,
			type: constants$1.TYPE_GAUGE,
			unit: constants$1.UNIT_BYTE,
			description: "Process heap stat available size"
		});
		this.register({
			name: constants$1.PROCESS_MEMORY_HEAP_STAT_USED_HEAP_SIZE,
			type: constants$1.TYPE_GAUGE,
			unit: constants$1.UNIT_BYTE,
			description: "Process heap stat used size"
		});
		this.register({
			name: constants$1.PROCESS_MEMORY_HEAP_STAT_HEAP_SIZE_LIMIT,
			type: constants$1.TYPE_GAUGE,
			unit: constants$1.UNIT_BYTE,
			description: "Process heap stat size limit"
		});
		this.register({
			name: constants$1.PROCESS_MEMORY_HEAP_STAT_MALLOCATED_MEMORY,
			type: constants$1.TYPE_GAUGE,
			unit: constants$1.UNIT_BYTE,
			description: "Process heap stat mallocated size"
		});
		this.register({
			name: constants$1.PROCESS_MEMORY_HEAP_STAT_PEAK_MALLOCATED_MEMORY,
			type: constants$1.TYPE_GAUGE,
			unit: constants$1.UNIT_BYTE,
			description: "Peak of process heap stat mallocated size"
		});
		this.register({
			name: constants$1.PROCESS_MEMORY_HEAP_STAT_ZAP_GARBAGE,
			type: constants$1.TYPE_GAUGE,
			description: "Process heap stat zap garbage"
		});

		this.register({
			name: constants$1.PROCESS_UPTIME,
			type: constants$1.TYPE_GAUGE,
			unit: constants$1.UNIT_SECONDS,
			description: "Process uptime"
		});
		this.register({
			name: constants$1.PROCESS_INTERNAL_ACTIVE_HANDLES,
			type: constants$1.TYPE_GAUGE,
			unit: constants$1.UNIT_HANDLE,
			description: "Number of active process handlers"
		});

		this.register({
			name: constants$1.PROCESS_VERSIONS_NODE,
			type: constants$1.TYPE_INFO,
			description: "Node version"
		}).set(_process.versions.node);

		// --- OS METRICS ---

		this.register({
			name: constants$1.OS_MEMORY_FREE,
			type: constants$1.TYPE_GAUGE,
			unit: constants$1.UNIT_BYTE,
			description: "OS free memory size"
		});
		this.register({
			name: constants$1.OS_MEMORY_USED,
			type: constants$1.TYPE_GAUGE,
			unit: constants$1.UNIT_BYTE,
			description: "OS used memory size"
		});
		this.register({
			name: constants$1.OS_MEMORY_TOTAL,
			type: constants$1.TYPE_GAUGE,
			unit: constants$1.UNIT_BYTE,
			description: "OS total memory size"
		});
		this.register({
			name: constants$1.OS_UPTIME,
			type: constants$1.TYPE_GAUGE,
			unit: constants$1.UNIT_SECONDS,
			description: "OS uptime"
		});
		this.register({ name: constants$1.OS_TYPE, type: constants$1.TYPE_INFO, description: "OS type" }).set(
			os__default.type()
		);
		this.register({
			name: constants$1.OS_RELEASE,
			type: constants$1.TYPE_INFO,
			description: "OS release"
		}).set(os__default.release());
		this.register({
			name: constants$1.OS_HOSTNAME,
			type: constants$1.TYPE_INFO,
			description: "Hostname"
		}).set(os__default.hostname());
		this.register({
			name: constants$1.OS_ARCH,
			type: constants$1.TYPE_INFO,
			description: "OS architecture"
		}).set(os__default.arch());
		this.register({
			name: constants$1.OS_PLATFORM,
			type: constants$1.TYPE_INFO,
			description: "OS platform"
		}).set(os__default.platform());

		const userInfo = getUserInfo();
		this.register({ name: constants$1.OS_USER_UID, type: constants$1.TYPE_INFO, description: "UID" }).set(
			userInfo.uid
		);
		this.register({ name: constants$1.OS_USER_GID, type: constants$1.TYPE_INFO, description: "GID" }).set(
			userInfo.gid
		);
		this.register({
			name: constants$1.OS_USER_USERNAME,
			type: constants$1.TYPE_INFO,
			description: "Username"
		}).set(userInfo.username);
		this.register({
			name: constants$1.OS_USER_HOMEDIR,
			type: constants$1.TYPE_INFO,
			description: "User's home directory"
		}).set(userInfo.homedir);

		this.register({
			name: constants$1.OS_NETWORK_ADDRESS,
			type: constants$1.TYPE_INFO,
			labelNames: ["interface", "family"],
			description: "Network address"
		});
		this.register({
			name: constants$1.OS_NETWORK_MAC,
			type: constants$1.TYPE_INFO,
			labelNames: ["interface", "family"],
			description: "MAC address"
		});

		this.register({
			name: constants$1.OS_DATETIME_UNIX,
			type: constants$1.TYPE_GAUGE,
			description: "Current datetime in Unix format"
		});
		this.register({
			name: constants$1.OS_DATETIME_ISO,
			type: constants$1.TYPE_INFO,
			description: "Current datetime in ISO string"
		});
		this.register({
			name: constants$1.OS_DATETIME_UTC,
			type: constants$1.TYPE_INFO,
			description: "Current UTC datetime"
		});
		this.register({
			name: constants$1.OS_DATETIME_TZ_OFFSET,
			type: constants$1.TYPE_GAUGE,
			description: "Timezone offset"
		});

		this.register({
			name: constants$1.OS_CPU_LOAD_1,
			type: constants$1.TYPE_GAUGE,
			description: "CPU load1"
		});
		this.register({
			name: constants$1.OS_CPU_LOAD_5,
			type: constants$1.TYPE_GAUGE,
			description: "CPU load5"
		});
		this.register({
			name: constants$1.OS_CPU_LOAD_15,
			type: constants$1.TYPE_GAUGE,
			description: "CPU load15"
		});
		this.register({
			name: constants$1.OS_CPU_UTILIZATION,
			type: constants$1.TYPE_GAUGE,
			description: "CPU utilization"
		});

		this.register({
			name: constants$1.OS_CPU_USER,
			type: constants$1.TYPE_GAUGE,
			description: "CPU user time"
		});
		this.register({
			name: constants$1.OS_CPU_SYSTEM,
			type: constants$1.TYPE_GAUGE,
			description: "CPU system time"
		});

		this.register({
			name: constants$1.OS_CPU_TOTAL,
			type: constants$1.TYPE_GAUGE,
			unit: constants$1.UNIT_CPU,
			description: "Number of CPUs"
		});
		this.register({
			name: constants$1.OS_CPU_INFO_MODEL,
			type: constants$1.TYPE_INFO,
			labelNames: ["index"],
			description: "CPU model"
		});
		this.register({
			name: constants$1.OS_CPU_INFO_SPEED,
			type: constants$1.TYPE_GAUGE,
			labelNames: ["index"],
			unit: constants$1.UNIT_GHZ,
			description: "CPU speed"
		});
		this.register({
			name: constants$1.OS_CPU_INFO_TIMES_USER,
			type: constants$1.TYPE_GAUGE,
			labelNames: ["index"],
			description: "CPU user time"
		});
		this.register({
			name: constants$1.OS_CPU_INFO_TIMES_SYS,
			type: constants$1.TYPE_GAUGE,
			labelNames: ["index"],
			description: "CPU system time"
		});

		this.logger.debug(`Registered ${this.store.size} common metrics.`);
	}

	/**
	 * Update common metric values.
	 *
	 * @returns {Promise}
	 */
	function updateCommonMetrics() {
		this.logger.debug("Update common metric values...");
		const end = this.timer();

		// --- PROCESS METRICS ---

		const procMem = _process.memoryUsage();

		this.set(constants$1.PROCESS_MEMORY_HEAP_SIZE_TOTAL, procMem.heapTotal);
		this.set(constants$1.PROCESS_MEMORY_HEAP_SIZE_USED, procMem.heapUsed);
		this.set(constants$1.PROCESS_MEMORY_RSS, procMem.rss);
		this.set(constants$1.PROCESS_MEMORY_EXTERNAL, procMem.external);

		if (v8 && v8.getHeapSpaceStatistics) {
			const stat = v8.getHeapSpaceStatistics();
			stat.forEach(item => {
				const space = item.space_name;
				this.set(constants$1.PROCESS_MEMORY_HEAP_SPACE_SIZE_TOTAL, item.space_size, { space });
				this.set(constants$1.PROCESS_MEMORY_HEAP_SPACE_SIZE_USED, item.space_used_size, { space });
				this.set(constants$1.PROCESS_MEMORY_HEAP_SPACE_SIZE_AVAILABLE, item.space_available_size, {
					space
				});
				this.set(constants$1.PROCESS_MEMORY_HEAP_SPACE_SIZE_PHYSICAL, item.physical_space_size, {
					space
				});
			});
		}

		if (v8 && v8.getHeapStatistics) {
			const stat = v8.getHeapStatistics();
			this.set(constants$1.PROCESS_MEMORY_HEAP_STAT_HEAP_SIZE_TOTAL, stat.total_heap_size);
			this.set(
				constants$1.PROCESS_MEMORY_HEAP_STAT_EXECUTABLE_SIZE_TOTAL,
				stat.total_heap_size_executable
			);
			this.set(constants$1.PROCESS_MEMORY_HEAP_STAT_PHYSICAL_SIZE_TOTAL, stat.total_physical_size);
			this.set(constants$1.PROCESS_MEMORY_HEAP_STAT_AVAILABLE_SIZE_TOTAL, stat.total_available_size);
			this.set(constants$1.PROCESS_MEMORY_HEAP_STAT_USED_HEAP_SIZE, stat.used_heap_size);
			this.set(constants$1.PROCESS_MEMORY_HEAP_STAT_HEAP_SIZE_LIMIT, stat.heap_size_limit);
			this.set(constants$1.PROCESS_MEMORY_HEAP_STAT_MALLOCATED_MEMORY, stat.malloced_memory);
			this.set(constants$1.PROCESS_MEMORY_HEAP_STAT_PEAK_MALLOCATED_MEMORY, stat.peak_malloced_memory);
			this.set(constants$1.PROCESS_MEMORY_HEAP_STAT_ZAP_GARBAGE, stat.does_zap_garbage);
		}

		this.set(constants$1.PROCESS_UPTIME, _process.uptime());
		this.set(constants$1.PROCESS_INTERNAL_ACTIVE_HANDLES, _process.getActiveResourcesInfo().length);

		// --- OS METRICS ---

		const freeMem = (() => performance ? performance.memory.totalJSHeapSize - performance.memory.usedJSHeapSize : 0)();
		const totalMem = (() => performance ? performance.memory.totalJSHeapSize : 0)();
		const usedMem = totalMem - freeMem;
		this.set(constants$1.OS_MEMORY_FREE, freeMem);
		this.set(constants$1.OS_MEMORY_USED, usedMem);
		this.set(constants$1.OS_MEMORY_TOTAL, totalMem);
		this.set(constants$1.OS_UPTIME, os__default.uptime());
		this.set(constants$1.OS_TYPE, os__default.type());
		this.set(constants$1.OS_RELEASE, os__default.release());
		this.set(constants$1.OS_HOSTNAME, os__default.hostname());
		this.set(constants$1.OS_ARCH, os__default.arch());
		this.set(constants$1.OS_PLATFORM, os__default.platform());

		// --- NETWORK INTERFACES ---

		const getNetworkInterfaces = () => {
			const list = [];
			const ilist = [];
			const interfaces = os__default.networkInterfaces();
			for (let iface in interfaces) {
				for (let i in interfaces[iface]) {
					const f = interfaces[iface][i];
					if (f.internal) {
						ilist.push({ f, iface });
					} else {
						list.push({ f, iface });
					}
				}
			}
			return list.length > 0 ? list : ilist;
		};

		const interfaces = getNetworkInterfaces();
		for (let { f, iface } of interfaces) {
			this.set(constants$1.OS_NETWORK_ADDRESS, f.address, { interface: iface, family: f.family });
			this.set(constants$1.OS_NETWORK_MAC, f.mac, { interface: iface, family: f.family });
		}

		const d = new Date();
		this.set(constants$1.OS_DATETIME_UNIX, d.valueOf());
		this.set(constants$1.OS_DATETIME_ISO, d.toISOString());
		this.set(constants$1.OS_DATETIME_UTC, d.toUTCString());
		this.set(constants$1.OS_DATETIME_TZ_OFFSET, d.getTimezoneOffset());

		const load = getCpuUsage.loadavg();
		this.set(constants$1.OS_CPU_LOAD_1, load[0]);
		this.set(constants$1.OS_CPU_LOAD_5, load[1]);
		this.set(constants$1.OS_CPU_LOAD_15, load[2]);

		// this.increment(METRIC.MOLECULER_METRICS_COMMON_COLLECT_TOTAL);
		const duration = end();

		return this.broker.Promise.resolve()
			.then(() =>
				cpuUsage().then(res => {
					this.set(constants$1.OS_CPU_UTILIZATION, res.avg);

					try {
						const cpus = require$$0__default();
						this.set(constants$1.OS_CPU_TOTAL, cpus.length);
						this.set(
							constants$1.OS_CPU_USER,
							cpus.reduce((a, b) => a + b.times.user, 0)
						);
						this.set(
							constants$1.OS_CPU_SYSTEM,
							cpus.reduce((a, b) => a + b.times.sys, 0)
						);

						cpus.forEach((cpu, index) => {
							this.set(constants$1.OS_CPU_INFO_MODEL, cpu.model, { index });
							this.set(constants$1.OS_CPU_INFO_SPEED, cpu.speed, { index });
							this.set(constants$1.OS_CPU_INFO_TIMES_USER, cpu.times.user, { index });
							this.set(constants$1.OS_CPU_INFO_TIMES_SYS, cpu.times.sys, { index });
						});
					} catch {
						// silent
					}
				})
			)
			.catch(() => {
				// silent this.logger.warn("Unable to collect CPU usage metrics.", err);
			})
			.then(() => {
				this.logger.debug(`Collected common metric values in ${duration.toFixed(3)} msec.`);
			});
	}

	/**
	 * Get OS user info (safe-mode)
	 *
	 * @returns
	 */
	function getUserInfo() {
		try {
			return os__default.userInfo();
		} catch {
			/* istanbul ignore next */
			return {};
		}
	}

	/**
	 * Measure event loop lag.
	 *
	 * @returns {Promise<Number>}
	 *
	function measureEventLoopLag() {
		return new Promise(resolve => {
			const start = process.hrtime();
			setImmediate(() => {
				const delta = process.hrtime(start);
				resolve(delta[0] * 1e9 + delta[1]);
			});
		});
	}*/

	var commons = {
		registerCommonMetrics,
		updateCommonMetrics
	};

	const { match: match$1, isFunction: isFunction$1, isPlainObject: isPlainObject$1, isString: isString$2 } = utils_1;



	const { registerCommonMetrics: registerCommonMetrics$1, updateCommonMetrics: updateCommonMetrics$1 } = commons;

	const METRIC_NAME_REGEXP = /^[a-zA-Z_][a-zA-Z0-9-_:.]*$/;
	const METRIC_LABEL_REGEXP = /^[a-zA-Z_][a-zA-Z0-9-_.]*$/;

	/**
	 * Import types
	 *
	 * @typedef {import("./registry")} MetricRegistryClass
	 * @typedef {import("./registry").MetricListOptions} MetricListOptions
	 * @typedef {import("./registry").GaugeMetricOptions} GaugeMetricOptions
	 * @typedef {import("./registry").CounterMetricOptions} CounterMetricOptions
	 * @typedef {import("./registry").HistogramMetricOptions} HistogramMetricOptions
	 * @typedef {import("./registry").InfoMetricOptions} InfoMetricOptions
	 *
	 * @typedef {import("./types/counter")} CounterMetric
	 * @typedef {import("./types/gauge")} GaugeMetric
	 * @typedef {import("./types/histogram")} HistogramMetric
	 * @typedef {import("./types/info")} InfoMetric
	 * @typedef {import("./types/base")} BaseMetric
	 * @typedef {import("./types/base").BaseMetricOptions} BaseMetricOptions
	 *
	 * @typedef {import("../service-broker")} ServiceBroker
	 */

	/**
	 * Metric Registry class
	 *
	 * @class MetricRegistry
	 * @implements {MetricRegistryClass}
	 */
	class MetricRegistry {
		/**
		 * Creates an instance of MetricRegistry.
		 *
		 * @param {ServiceBroker} broker
		 * @param {Object} opts
		 * @memberof MetricRegistry
		 */
		constructor(broker, opts) {
			this.broker = broker;
			this.logger = broker.getLogger("metrics");

			this.dirty = true;

			if (opts === true || opts === false) opts = { enabled: opts };

			this.opts = ___default.defaultsDeep({}, opts, {
				enabled: true,
				collectProcessMetrics: _process.env.NODE_ENV !== "test",
				collectInterval: 5,

				reporter: false,

				defaultBuckets: [1, 5, 10, 25, 50, 100, 250, 500, 1000, 2500, 5000, 10000], // in milliseconds
				defaultQuantiles: [0.5, 0.9, 0.95, 0.99, 0.999], // percentage
				defaultMaxAgeSeconds: 60,
				defaultAgeBuckets: 10,
				defaultAggregator: "sum"
			});

			this.store = new Map();

			if (this.opts.enabled) this.logger.info("Metrics: Enabled");
		}

		/**
		 * Initialize Registry.
		 */
		init() {
			if (this.opts.enabled) {
				// Create Reporter instances
				if (this.opts.reporter) {
					const reporters$1 = Array.isArray(this.opts.reporter)
						? this.opts.reporter
						: [this.opts.reporter];

					this.reporter = ___default.compact(reporters$1).map(r => {
						const reporter = reporters.resolve(r);
						reporter.init(this);
						return reporter;
					});

					const reporterNames = this.reporter.map(reporter =>
						this.broker.getConstructorName(reporter)
					);
					this.logger.info(
						`Metric reporter${reporterNames.length > 1 ? "s" : ""}: ${reporterNames.join(
						", "
					)}`
					);
				}

				// Start colllect timer
				if (this.opts.collectProcessMetrics) {
					this.collectTimer = timersBrowserify.setInterval(() => {
						updateCommonMetrics$1.call(this);
					}, this.opts.collectInterval * 1000);
					this.collectTimer.unref();

					registerCommonMetrics$1.call(this);
					updateCommonMetrics$1.call(this);
				}
			}
		}

		/**
		 * Stop Metric Registry
		 */
		stop() {
			if (this.collectTimer) {
				clearInterval(this.collectTimer);
			}

			if (this.reporter) {
				return this.broker.Promise.all(this.reporter.map(r => r.stop()));
			}
		}

		/**
		 * Check metric is enabled?
		 *
		 * @returns
		 * @memberof MetricRegistry
		 */
		isEnabled() {
			return this.opts.enabled;
		}

		/**
		 * Register a new metric.
		 *
		 * @overload
		 * @param {GaugeMetricOptions} opts
		 * @returns {GaugeMetric}
		 */
		/**
		 * @overload
		 * @param {CounterMetricOptions} opts
		 * @returns {CounterMetric}
		 */
		/**
		 * @overload
		 * @param {HistogramMetricOptions} opts
		 * @returns {HistogramMetric}
		 */
		/**
		 * @overload
		 * @param {InfoMetricOptions} opts
		 * @returns {InfoMetric}
		 */
		/**
		 * @param {GaugeMetricOptions|CounterMetricOptions|HistogramMetricOptions|InfoMetricOptions} opts
		 * @returns {CounterMetric | GaugeMetric | HistogramMetric | InfoMetric}
		 */
		register(opts) {
			if (!isPlainObject$1(opts)) throw new Error("Wrong argument. Must be an Object.");

			if (!opts.type) throw new Error("The metric 'type' property is mandatory.");

			if (!opts.name) throw new Error("The metric 'name' property is mandatory.");

			if (!METRIC_NAME_REGEXP.test(opts.name))
				throw new Error("The metric 'name' is not valid: " + opts.name);

			if (Array.isArray(opts.labelNames)) {
				opts.labelNames.forEach(name => {
					if (!METRIC_LABEL_REGEXP.test(name))
						throw new Error(`The '${opts.name}' metric label name is not valid: ${name}`);
				});
			}

			const MetricClass = types.resolve(opts.type);

			if (!this.opts.enabled) return null;

			const item = new MetricClass(opts, this);
			this.store.set(opts.name, item);
			return item;
		}

		/**
		 * Check a metric by name.
		 *
		 * @param {String} name
		 * @returns {Boolean}
		 * @memberof MetricRegistry
		 */
		hasMetric(name) {
			return this.store.has(name);
		}

		/**
		 * Get metric by name
		 *
		 * @param {String} name
		 * @returns {CounterMetric | GaugeMetric | HistogramMetric | InfoMetric}
		 * @memberof MetricRegistry
		 */
		getMetric(name) {
			const item = this.store.get(name);
			if (!item) return null;

			return item;
		}

		/**
		 * Increment a metric value.
		 *
		 * @param {String} name
		 * @param {Object=} labels
		 * @param {number=} [value=1]
		 * @param {Number=} timestamp
		 * @returns
		 * @memberof MetricRegistry
		 */
		increment(name, labels, value = 1, timestamp) {
			if (!this.opts.enabled) return null;

			const item = /** @type {GaugeMetric} */ (this.getMetric(name));
			if (!isFunction$1(item.increment))
				throw new Error(
					"Invalid metric type. Incrementing works only with counter & gauge metric types."
				);

			return item.increment(labels, value, timestamp);
		}

		/**
		 * Decrement a metric value.
		 *
		 * @param {String} name
		 * @param {Object=} labels
		 * @param {number=} [value=1]
		 * @param {Number=} timestamp
		 * @returns
		 * @memberof MetricRegistry
		 */
		decrement(name, labels, value = 1, timestamp) {
			if (!this.opts.enabled) return null;

			const item = /** @type {GaugeMetric} */ (this.getMetric(name));
			if (!isFunction$1(item.decrement))
				throw new Error("Invalid metric type. Decrementing works only with gauge metric type.");

			return item.decrement(labels, value, timestamp);
		}

		/**
		 * Set a metric value.
		 *
		 * @param {String} name
		 * @param {any} value
		 * @param {Object=} labels
		 * @param {Number=} timestamp
		 * @returns
		 * @memberof MetricRegistry
		 */
		set(name, value, labels, timestamp) {
			if (!this.opts.enabled) return null;

			const item = /** @type {GaugeMetric} */ (this.getMetric(name));
			if (!isFunction$1(item.set))
				throw new Error(
					"Invalid metric type. Value setting works only with counter, gauge & info metric types."
				);

			return item.set(value, labels, timestamp);
		}

		/**
		 * Observe a metric.
		 *
		 * @param {String} name
		 * @param {Number} value
		 * @param {Object=} labels
		 * @param {Number=} timestamp
		 * @returns
		 * @memberof MetricRegistry
		 */
		observe(name, value, labels, timestamp) {
			if (!this.opts.enabled) return null;

			const item = /** @type {HistogramMetric} */ (this.getMetric(name));
			if (!isFunction$1(item.observe))
				throw new Error(
					"Invalid metric type. Observing works only with histogram metric type."
				);

			return item.observe(value, labels, timestamp);
		}

		/**
		 * Reset metric values.
		 *
		 * @param {String} name
		 * @param {Object?} labels
		 * @param {Number?} timestamp
		 * @returns
		 * @memberof MetricRegistry
		 */
		reset(name, labels, timestamp) {
			if (!this.opts.enabled) return null;

			const item = this.getMetric(name);
			item.reset(labels, timestamp);
		}

		/**
		 * Reset metric all values.
		 *
		 * @param {String} name
		 * @param {Number?} timestamp
		 * @returns
		 * @memberof MetricRegistry
		 */
		resetAll(name, timestamp) {
			if (!this.opts.enabled) return null;

			const item = this.getMetric(name);
			item.resetAll(timestamp);
		}

		/**
		 * Start a timer & observe the elapsed time.
		 *
		 * @param {String} name
		 * @param {Object?} labels
		 * @param {Number?} timestamp
		 * @returns {() => number} `end`˙function.
		 * @memberof MetricRegistry
		 */
		timer(name, labels, timestamp) {
			let item;
			if (name && this.opts.enabled) {
				item = this.getMetric(name);
				if (!("observe" in item) && !("set" in item)) {
					/* istanbul ignore next */
					throw new Error(
						"Invalid metric type. Timing works only with histogram or gauge metric types"
					);
				}
			}

			const start = _process.hrtime();
			return () => {
				const delta = _process.hrtime(start);
				const duration = (delta[0] + delta[1] / 1e9) * 1000;

				if (item) {
					if (item.type == constants$1.TYPE_HISTOGRAM) item.observe(duration, labels, timestamp);
					else if (item.type == constants$1.TYPE_GAUGE) item.set(duration, labels, timestamp);
				}

				return duration;
			};
		}

		/**
		 * Some metric has been changed.
		 *
		 * @param {BaseMetric} metric
		 * @param {any} value
		 * @param {Object} labels
		 * @param {Number?} timestamp
		 *
		 * @memberof MetricRegistry
		 */
		changed(metric, value, labels, timestamp) {
			this.dirty = true;
			if (Array.isArray(this.reporter))
				this.reporter.forEach(reporter =>
					reporter.metricChanged(metric, value, labels, timestamp)
				);
		}

		/**
		 * List all registered metrics with labels & values.
		 *
		 * @param {MetricListOptions?} opts
		 */
		list(opts) {
			const res = [];
			opts = opts ?? {};

			const types =
				opts.types != null ? (isString$2(opts.types) ? [opts.types] : opts.types) : null;
			const includes =
				opts.includes != null
					? isString$2(opts.includes)
						? [opts.includes]
						: opts.includes
					: null;
			const excludes =
				opts.excludes != null
					? isString$2(opts.excludes)
						? [opts.excludes]
						: opts.excludes
					: null;

			this.store.forEach(metric => {
				if (types && !types.some(type => metric.type == type)) return;

				if (includes && !includes.some(pattern => match$1(metric.name, pattern))) return;

				if (excludes && !excludes.every(pattern => !match$1(metric.name, pattern))) return;

				res.push(metric.toObject());
			});

			return res;
		}

		/**
		 * Pluralize metric units.
		 *
		 * @param {String} unit
		 * @returns {String}
		 */
		pluralizeUnit(unit) {
			switch (unit) {
				case constants$1.UNIT_GHZ:
					return unit;
			}
			return unit + "s";
		}
	}

	var registry = MetricRegistry;

	var metrics = {
		METRIC: constants$1,

		MetricRegistry: registry,

		BaseMetric: base,
		CounterMetric: counter,
		GaugeMetric: gauge,
		HistrogramMetric: histogram,
		InfoMetric: info,

		Reporters: reporters
	};

	const { Packet: Packet$1 } = packets;


	const { Transform } = require$$0__default$1;
	const { METRIC } = metrics;


	/**
	 * @typedef {import("./service-broker")} ServiceBroker
	 * @typedef {import("./transporters/base")} Transporter
	 * @typedef {import("stream").Stream} Stream
	 * @typedef {import("stream").Readable} Readable
	 * @typedef {import("./context")} Context
	 * @typedef {import("./registry").NodeRawInfo} NodeRawInfo
	 * @typedef {import("./transit")} TransitClass
	 * @typedef {import("./packets").PacketDiscoverPayload} PacketDiscoverPayload
	 * @typedef {import("./packets").PacketInfoPayload} PacketInfoPayload
	 * @typedef {import("./packets").PacketRequestPayload} PacketRequestPayload
	 * @typedef {import("./packets").PacketResponsePayload} PacketResponsePayload
	 * @typedef {import("./packets").PacketEventPayload} PacketEventPayload
	 * @typedef {import("./packets").PacketPingPayload} PacketPingPayload
	 * @typedef {import("./packets").PacketPongPayload} PacketPongPayload
	 */

	/**
	 * Transit class
	 *
	 * @class Transit
	 * @implements {TransitClass}
	 */
	class Transit {
		/**
		 * Create an instance of Transit.
		 *
		 * @param {ServiceBroker} broker
		 * @param {Transporter} transporter
		 * @param {Object?} opts
		 *
		 * @memberof Transit
		 */
		constructor(broker, transporter, opts) {
			this.broker = broker;
			this.Promise = broker.Promise;
			this.logger = broker.getLogger("transit");
			this.nodeID = broker.nodeID;
			this.metrics = broker.metrics;
			this.instanceID = broker.instanceID;
			this.tx = transporter;
			this.opts = opts;
			this.discoverer = broker.registry.discoverer;
			this.errorRegenerator = broker.errorRegenerator;

			this.pendingRequests = new Map();
			this.pendingReqStreams = new Map();
			this.pendingResStreams = new Map();

			this.connected = false;
			this.disconnecting = false;
			this.isReady = false;

			const wrappedMessageHandler = (cmd, packet) => this.messageHandler(cmd, packet);

			this.publish = this.broker.wrapMethod("transitPublish", this.publish, this);
			this.messageHandler = this.broker.wrapMethod(
				"transitMessageHandler",
				this.messageHandler,
				this
			);

			if (this.tx) {
				this.tx.init(this, wrappedMessageHandler, this.afterConnect.bind(this));

				this.tx.send = this.broker.wrapMethod("transporterSend", this.tx.send, this.tx);
				this.tx.receive = this.broker.wrapMethod(
					"transporterReceive",
					this.tx.receive,
					this.tx,
					{ reverse: true }
				);
			}

			this.__connectResolve = null;

			this.registerMoleculerMetrics();
		}

		/**
		 * Register Moleculer Transit Core metrics.
		 */
		registerMoleculerMetrics() {
			if (!this.broker.isMetricsEnabled()) return;

			this.metrics
				.register({
					name: METRIC.MOLECULER_TRANSIT_READY,
					type: METRIC.TYPE_GAUGE,
					description: "Transit is ready"
				})
				?.set(0);
			this.metrics
				.register({
					name: METRIC.MOLECULER_TRANSIT_CONNECTED,
					type: METRIC.TYPE_GAUGE,
					description: "Transit is connected"
				})
				?.set(0);

			this.metrics.register({
				name: METRIC.MOLECULER_TRANSIT_PONG_TIME,
				type: METRIC.TYPE_GAUGE,
				labelNames: ["targetNodeID"],
				description: "Ping time"
			});
			this.metrics.register({
				name: METRIC.MOLECULER_TRANSIT_PONG_SYSTIME_DIFF,
				type: METRIC.TYPE_GAUGE,
				labelNames: ["targetNodeID"],
				description: "System time difference between nodes"
			});

			this.metrics.register({
				name: METRIC.MOLECULER_TRANSIT_ORPHAN_RESPONSE_TOTAL,
				type: METRIC.TYPE_COUNTER,
				description: "Number of orphan responses"
			});
		}

		/**
		 * It will be called after transporter connected or reconnected.
		 *
		 * @param {any} wasReconnect
		 * @returns {Promise}
		 *
		 * @memberof Transit
		 */
		afterConnect(wasReconnect) {
			return this.Promise.resolve()

				.then(() => {
					if (wasReconnect) {
						// After reconnecting, we should send a broadcast INFO packet because there may new nodes.
						// In case of disabled balancer, it triggers the `makeBalancedSubscriptions` method.
						return this.discoverer.sendLocalNodeInfo();
					} else {
						// After connecting we should subscribe to topics
						return this.makeSubscriptions();
					}
				})

				.then(() => this.discoverer.discoverAllNodes())
				.delay(500) // Waiting for incoming INFO packets

				.then(() => {
					this.connected = true;
					this.metrics.set(METRIC.MOLECULER_TRANSIT_CONNECTED, 1);

					this.broker.broadcastLocal("$transporter.connected", {
						wasReconnect: !!wasReconnect
					});

					if (this.__connectResolve) {
						this.isReady = true;
						this.__connectResolve(null);
						this.__connectResolve = null;
					}

					return null;
				});
		}

		/**
		 * Connect with transporter. If failed, try again after 5 sec.
		 *
		 * @memberof Transit
		 */
		connect() {
			this.logger.info("Connecting to the transporter...");
			return new this.Promise(resolve => {
				this.__connectResolve = resolve;

				const doConnect = () => {
					let reconnectStarted = false;

					/* istanbul ignore next */
					const errorHandler = err => {
						if (this.disconnecting) return;
						if (reconnectStarted) return;

						this.logger.warn(
							"Connection is failed.",
							(err && err.message) || "Unknown error"
						);
						this.logger.debug(err);

						if (this.opts.disableReconnect) {
							return;
						}

						reconnectStarted = true;

						timersBrowserify.setTimeout(() => {
							this.logger.info("Reconnecting...");
							doConnect();
						}, 5 * 1000);
					};
					/* istanbul ignore next */
					this.tx.connect(errorHandler).catch(errorHandler);
				};

				doConnect();
			});
		}

		/**
		 * Disconnect with transporter
		 *
		 * @memberof Transit
		 */
		disconnect() {
			this.connected = false;
			this.isReady = false;
			this.disconnecting = true;
			this.metrics.set(METRIC.MOLECULER_TRANSIT_CONNECTED, 0);

			this.broker.broadcastLocal("$transporter.disconnected", { graceFul: true });

			return this.Promise.resolve()
				.then(() => {
					return this.tx.connected && this.discoverer.localNodeDisconnected();
				})
				.then(() => this.tx.disconnect())
				.then(() => (this.disconnecting = false));
		}

		/**
		 * Local broker is ready (all services loaded).
		 * Send INFO packet to all other nodes
		 */
		ready() {
			if (this.connected) {
				this.metrics.set(METRIC.MOLECULER_TRANSIT_READY, 1);
				// We do nothing here because INFO packets are sent during the starting process.
				return;
			}
		}

		/**
		 * Send DISCONNECT to remote nodes
		 *
		 * @returns {Promise}
		 *
		 * @memberof Transit
		 */
		sendDisconnectPacket() {
			return this.publish(new Packet$1(packets.PACKET_DISCONNECT)).catch(
				/* istanbul ignore next */ err =>
					this.logger.debug("Unable to send DISCONNECT packet.", err)
			);
		}

		/**
		 * Subscribe to topics for transportation
		 *
		 * @memberof Transit
		 */
		makeSubscriptions() {
			this.subscribing = this.tx
				.makeSubscriptions([
					// Subscribe to broadcast events
					{ cmd: packets.PACKET_EVENT, nodeID: this.nodeID },

					// Subscribe to requests
					{ cmd: packets.PACKET_REQUEST, nodeID: this.nodeID },

					// Subscribe to node responses of requests
					{ cmd: packets.PACKET_RESPONSE, nodeID: this.nodeID },

					// Discover handler
					{ cmd: packets.PACKET_DISCOVER },
					{ cmd: packets.PACKET_DISCOVER, nodeID: this.nodeID },

					// NodeInfo handler
					{ cmd: packets.PACKET_INFO }, // Broadcasted INFO. If a new node connected
					{ cmd: packets.PACKET_INFO, nodeID: this.nodeID }, // Response INFO to DISCOVER packet

					// Disconnect handler
					{ cmd: packets.PACKET_DISCONNECT },

					// Heartbeat handler
					{ cmd: packets.PACKET_HEARTBEAT },

					// Ping handler
					{ cmd: packets.PACKET_PING }, // Broadcasted
					{ cmd: packets.PACKET_PING, nodeID: this.nodeID }, // Targeted

					// Pong handler
					{ cmd: packets.PACKET_PONG, nodeID: this.nodeID }
				])
				.then(() => {
					this.subscribing = null;
				});

			return this.subscribing;
		}

		/**
		 * Message handler for incoming packets
		 *
		 * @param {string} cmd
		 * @param {Packet} packet
		 * @returns {Promise} If packet is processed resolve with `true` else `false`
		 *
		 * @memberof Transit
		 */
		messageHandler(cmd, packet) {
			try {
				const payload = packet.payload;

				// Check payload
				if (!payload) {
					/* istanbul ignore next */
					throw new errors.MoleculerServerError(
						"Missing response payload.",
						500,
						"MISSING_PAYLOAD"
					);
				}

				// Check protocol version
				if (payload.ver !== this.broker.PROTOCOL_VERSION && !this.opts.disableVersionCheck) {
					throw new errors.ProtocolVersionMismatchError({
						nodeID: payload.sender,
						actual: this.broker.PROTOCOL_VERSION,
						received: payload.ver
					});
				}

				if (payload.sender === this.nodeID) {
					// Detect nodeID conflict
					if (cmd === packets.PACKET_INFO) {
						if (/** @type {PacketInfoPayload} */ (payload).instanceID !== this.instanceID) {
							this.broker.fatal(
								"ServiceBroker has detected a nodeID conflict, use unique nodeIDs. ServiceBroker stopped."
							);
							return this.Promise.resolve(false);
						}
					}

					// Skip own packets (if only built-in balancer disabled)
					if (cmd !== packets.PACKET_EVENT && cmd !== packets.PACKET_REQUEST && cmd !== packets.PACKET_RESPONSE)
						return this.Promise.resolve(false);
				}

				// Request
				if (cmd === packets.PACKET_REQUEST) {
					return this.requestHandler(/** @type {PacketRequestPayload} */ (payload)).then(
						() => true
					);
				}

				// Response
				else if (cmd === packets.PACKET_RESPONSE) {
					this.responseHandler(/** @type {PacketResponsePayload} */ (payload));
				}

				// Event
				else if (cmd === packets.PACKET_EVENT) {
					return this.eventHandler(/** @type {PacketEventPayload} */ (payload));
				}

				// Discover
				else if (cmd === packets.PACKET_DISCOVER) {
					this.discoverer.sendLocalNodeInfo(payload.sender);
				}

				// Node info
				else if (cmd === packets.PACKET_INFO) {
					this.discoverer.processRemoteNodeInfo(payload.sender, payload);
				}

				// Disconnect
				else if (cmd === packets.PACKET_DISCONNECT) {
					this.discoverer.remoteNodeDisconnected(payload.sender, false);
				}

				// Heartbeat
				else if (cmd === packets.PACKET_HEARTBEAT) {
					this.discoverer.heartbeatReceived(payload.sender, payload);
				}

				// Ping
				else if (cmd === packets.PACKET_PING) {
					this.sendPong(/** @type {PacketPingPayload} */ (payload));
				}

				// Pong
				else if (cmd === packets.PACKET_PONG) {
					this.processPong(/** @type {PacketPongPayload} */ (payload));
				}

				return this.Promise.resolve(true);
			} catch (err) {
				this.logger.error(err, cmd, packet);

				this.broker.broadcastLocal("$transit.error", {
					error: err,
					module: "transit",
					type: constants.FAILED_PROCESSING_PACKET
				});
			}
			return this.Promise.resolve(false);
		}

		/**
		 * Handle incoming event
		 *
		 * @param {PacketEventPayload} payload
		 * @returns {Promise<boolean>}
		 * @memberof Transit
		 */
		eventHandler(payload) {
			this.logger.debug(
				`Event '${payload.event}' received from '${payload.sender}' node` +
					(payload.groups ? ` in '${payload.groups.join(", ")}' group(s)` : "") +
					"."
			);

			if (this.broker.stopping) {
				this.logger.warn(
					`Incoming '${payload.event}' event from '${payload.sender}' node is dropped, because broker is stopped.`
				);
				// return false so the transporter knows this event wasn't handled.
				return this.Promise.resolve(false);
			}

			// Create caller context
			const ctx = new this.broker.ContextFactory(this.broker);
			ctx.id = payload.id;
			ctx.eventName = payload.event;
			ctx.setParams(payload.data, this.broker.options.contextParamsCloning);
			ctx.eventGroups = payload.groups;
			ctx.eventType = payload.broadcast ? "broadcast" : "emit";
			ctx.meta = payload.meta || {};
			ctx.headers = payload.headers || {};
			ctx.level = payload.level;
			ctx.tracing = !!payload.tracing;
			ctx.parentID = payload.parentID;
			ctx.requestID = payload.requestID;
			ctx.caller = payload.caller;
			ctx.nodeID = payload.sender;

			// ensure the eventHandler resolves true when the event was handled successfully
			return this.broker
				.emitLocalServices(ctx)
				.then(() => true)
				.catch(err => {
					this.logger.error(err);

					return false;
				});
		}

		/**
		 * Handle incoming request
		 *
		 * @param {PacketRequestPayload} payload
		 * @returns {Promise<any>}
		 * @memberof Transit
		 */
		requestHandler(payload) {
			const requestID = payload.requestID ? "with requestID '" + payload.requestID + "' " : "";
			this.logger.debug(
				`<= Request '${payload.action}' ${requestID}received from '${payload.sender}' node.`
			);

			try {
				if (this.broker.stopping) {
					this.logger.warn(
						`Incoming '${payload.action}' ${requestID}request from '${payload.sender}' node is dropped because broker is stopped.`
					);
					throw new errors.ServiceNotAvailableError({
						action: payload.action,
						nodeID: this.nodeID
					});
				}

				let stream;
				if (payload.stream !== undefined) {
					stream = this._handleIncomingRequestStream(payload);
					if (stream === null) return this.Promise.resolve();
				}

				const endpoint = this.broker._getLocalActionEndpoint(payload.action);

				// Recreate caller context
				const ctx = new this.broker.ContextFactory(this.broker);
				ctx.setEndpoint(endpoint);
				ctx.id = payload.id;
				ctx.setParams(payload.params, this.broker.options.contextParamsCloning);
				if (stream) {
					ctx.stream = stream;
				}
				ctx.parentID = payload.parentID;
				ctx.requestID = payload.requestID;
				ctx.caller = payload.caller;
				ctx.meta = payload.meta || {};
				ctx.headers = payload.headers || {};
				ctx.level = payload.level;
				ctx.tracing = payload.tracing;
				ctx.nodeID = payload.sender;

				if (payload.timeout != null) ctx.options.timeout = payload.timeout;

				const p = endpoint.action.handler(ctx);
				// Pointer to Context
				p.ctx = ctx;

				return p
					.then(res =>
						this.sendResponse(
							payload.sender,
							payload.id,
							ctx.meta,
							ctx.responseHeaders,
							res,
							null
						)
					)
					.catch(err =>
						this.sendResponse(
							payload.sender,
							payload.id,
							ctx.meta,
							ctx.responseHeaders,
							null,
							err
						)
					);
			} catch (err) {
				return this.sendResponse(payload.sender, payload.id, payload.meta, null, null, err);
			}
		}

		/**
		 * Handle incoming request stream.
		 *
		 * @param {Object} payload
		 * @returns {Stream|false|null}
		 */
		_handleIncomingRequestStream(payload) {
			const reqStream = this.pendingReqStreams.get(payload.id);
			let stream = reqStream ? reqStream.stream : undefined;

			if (!payload.stream && !stream && !payload.seq) {
				// It is not a stream data
				return false;
			}

			if (!stream) {
				this.logger.debug(
					`<= New stream is received from '${payload.sender}'. Seq: ${payload.seq}`
				);

				// Create a new pass stream
				stream = new Transform({
					// TODO: It's incorrect because the chunks may receive in random order, so it processes an empty meta.
					// Meta is filled correctly only in the 0. chunk.
					objectMode: payload.headers?.$streamObjectMode,
					transform: function (chunk, encoding, done) {
						this.push(chunk);
						return done();
					}
				});

				delete payload.headers?.$streamObjectMode;

				stream.$prevSeq = -1;
				stream.$pool = new Map();

				this.pendingReqStreams.set(payload.id, { sender: payload.sender, stream });

				stream.on("moleculer-timeout-middleware", timeout => {
					timersBrowserify.setTimeout(() => {
						this.pendingReqStreams.delete(payload.id);
						this._destroyStreamIfPossible(
							stream,
							`Pending request stream ${payload.id} have been closed by timeout ${timeout} ms`
						);
					}, 1000);
				});
			}

			if (payload.seq > stream.$prevSeq + 1) {
				// Some chunks are late. Store these chunks.
				this.logger.debug(
					`Put the chunk into pool (size: ${stream.$pool.size}). Seq: ${payload.seq}`
				);

				stream.$pool.set(payload.seq, payload);

				// TODO: start timer.
				// TODO: check length of pool.
				// TODO: reset seq

				return null;
			}

			// the next stream chunk received
			stream.$prevSeq = payload.seq;

			if (stream.$prevSeq > 0) {
				if (!payload.stream) {
					// Check stream error
					if (payload.headers?.$streamError) {
						stream.emit(
							"error",
							this._createErrFromPayload(payload.headers.$streamError, payload)
						);
						delete payload.headers.$streamError;
					}

					this.logger.debug(
						`<= Stream closing is received from '${payload.sender}'. Seq: ${payload.seq}`
					);

					// End of stream
					stream.end();

					// Remove pending request stream
					this.pendingReqStreams.delete(payload.id);

					return null;
				} else {
					this.logger.debug(
						`<= Stream chunk is received from '${payload.sender}'. Seq: ${payload.seq}`
					);
					stream.write(
						payload.params?.type === "Buffer"
							? Buffer.from(payload.params.data)
							: payload.params
					);
				}
			}

			// Check newer chunks in the pool
			if (stream.$pool.size > 0) {
				this.logger.debug(`Has stored packets. Size: ${stream.$pool.size}`);
				const nextSeq = stream.$prevSeq + 1;
				const nextPacket = stream.$pool.get(nextSeq);
				if (nextPacket) {
					stream.$pool.delete(nextSeq);
					setImmediate(() => this.requestHandler(nextPacket));
				}
			}

			return stream && payload.seq === 0 ? stream : null;
		}

		/**
		 * Create an Error instance from payload ata
		 * @param {Object} error
		 * @param {Object} payload
		 * @returns {Error}
		 */
		_createErrFromPayload(error, payload) {
			return this.errorRegenerator?.restore(error, payload);
		}

		/**
		 * Process incoming response of request
		 *
		 * @param {PacketResponsePayload} packet
		 *
		 * @memberof Transit
		 */
		responseHandler(packet) {
			const id = packet.id;
			const req = this.pendingRequests.get(id);

			// If not exists (timed out), we skip response processing
			if (req == null) {
				this.logger.debug(
					"Orphan response is received. Maybe the request is timed out earlier. ID:",
					packet.id,
					", Sender:",
					packet.sender
				);
				this.metrics.increment(METRIC.MOLECULER_TRANSIT_ORPHAN_RESPONSE_TOTAL);
				return;
			}

			this.logger.debug(`<= Response '${req.action.name}' is received from '${packet.sender}'.`);

			// Update nodeID in context (if it uses external balancer)
			req.ctx.nodeID = packet.sender;

			// Merge response meta with original meta
			Object.assign(req.ctx.meta || {}, packet.meta || {});

			// Handle stream response
			if (packet.stream != null) {
				if (this._handleIncomingResponseStream(packet, req)) return;
			}

			// Remove pending request
			this.removePendingRequest(id);

			if (!packet.success) {
				req.reject(this._createErrFromPayload(packet.error, packet));
			} else {
				req.resolve(packet.data);
			}
		}

		/**
		 * Handle incoming response stream.
		 *
		 * @param {Object} packet
		 * @param {Object} req
		 */
		_handleIncomingResponseStream(packet, req) {
			let stream = this.pendingResStreams.get(packet.id);
			if (!stream && !packet.stream && !packet.seq) return false;

			if (!stream) {
				this.logger.debug(
					`<= New stream is received from '${packet.sender}'. Seq: ${packet.seq}`
				);

				stream = new Transform({
					// TODO: It's incorrect because the chunks may receive in random order, so it processes an empty meta.
					// Meta is filled correctly only in the 0. chunk.
					objectMode: packet.headers?.$streamObjectMode,
					transform: function (chunk, encoding, done) {
						this.push(chunk);
						return done();
					}
				});

				delete packet.headers?.$streamObjectMode;

				stream.$prevSeq = -1;
				stream.$pool = new Map();

				this.pendingResStreams.set(packet.id, stream);
			}

			if (packet.seq > stream.$prevSeq + 1) {
				// Some chunks are late. Store these chunks.
				this.logger.debug(
					`Put the chunk into pool (size: ${stream.$pool.size}). Seq: ${packet.seq}`
				);

				stream.$pool.set(packet.seq, packet);

				// TODO: start timer.
				// TODO: check length of pool.
				// TODO: resetting seq.

				return true;
			}

			// the next stream chunk received
			stream.$prevSeq = packet.seq;

			if (stream && packet.seq === 0) {
				req.resolve(stream);
			}

			if (stream.$prevSeq > 0) {
				if (!packet.stream) {
					// Received error?
					if (!packet.success)
						stream.emit("error", this._createErrFromPayload(packet.error, packet));

					this.logger.debug(
						`<= Stream closing is received from '${packet.sender}'. Seq: ${packet.seq}`
					);

					// End of stream
					stream.end();

					// Remove pending request
					this.removePendingRequest(packet.id);

					return true;
				} else {
					// stream chunk
					this.logger.debug(
						`<= Stream chunk is received from '${packet.sender}'. Seq: ${packet.seq}`
					);
					stream.write(
						packet.data?.type === "Buffer" ? Buffer.from(packet.data.data) : packet.data
					);
				}
			}

			// Check newer chunks in the pool
			if (stream.$pool.size > 0) {
				this.logger.debug(`Has stored packets. Size: ${stream.$pool.size}`);
				const nextSeq = stream.$prevSeq + 1;
				const nextPacket = stream.$pool.get(nextSeq);
				if (nextPacket) {
					stream.$pool.delete(nextSeq);
					setImmediate(() => this.responseHandler(nextPacket));
				}
			}

			return true;
		}

		/**
		 * Send a request to a remote service. It returns a Promise
		 * what will be resolved when the response received.
		 *
		 * @param {Context} ctx Context of request
		 * @returns {Promise}
		 *
		 * @memberof Transit
		 */
		request(ctx) {
			if (this.opts.maxQueueSize && this.pendingRequests.size >= this.opts.maxQueueSize)
				/* istanbul ignore next */
				return this.Promise.reject(
					new errors.QueueIsFullError({
						action: ctx.action.name,
						nodeID: this.nodeID,
						size: this.pendingRequests.size,
						limit: this.opts.maxQueueSize
					})
				);

			// Expanded the code that v8 can optimize it.  (TryCatchStatement disable optimizing)
			return new this.Promise((resolve, reject) => this._sendRequest(ctx, resolve, reject));
		}

		/**
		 * Send a remote request
		 *
		 * @param {Context} ctx      Context of request
		 * @param {Function} resolve   Resolve of Promise
		 * @param {Function} reject    Reject of Promise
		 *
		 * @memberof Transit
		 */
		_sendRequest(ctx, resolve, reject) {
			const isStream =
				ctx.options?.stream?.readable === true &&
				typeof ctx.options.stream.on === "function" &&
				typeof ctx.options.stream.pipe === "function";

			const request = {
				action: ctx.action,
				nodeID: ctx.nodeID,
				ctx,
				resolve,
				reject,
				stream: isStream
			};

			const payload = {
				id: ctx.id,
				action: ctx.action?.name,
				params: ctx.params,
				meta: ctx.meta,
				headers: ctx.headers,
				timeout: ctx.options.timeout,
				level: ctx.level,
				tracing: ctx.tracing,
				parentID: ctx.parentID,
				requestID: ctx.requestID,
				caller: ctx.caller,
				stream: isStream
			};

			if (isStream) {
				/** @type {Readable} */
				const s = ctx.options.stream;
				if (s.readableObjectMode === true) {
					payload.headers = payload.headers ?? {};
					payload.headers.$streamObjectMode = true;
				}
				payload.seq = 0;
			}

			const packet = new Packet$1(packets.PACKET_REQUEST, ctx.nodeID, payload);

			const nodeName = ctx.nodeID ? `'${ctx.nodeID}'` : "someone";
			const requestID = ctx.requestID ? "with requestID '" + ctx.requestID + "' " : "";
			this.logger.debug(`=> Send '${ctx.action?.name}' request ${requestID}to ${nodeName} node.`);

			const publishCatch = /* istanbul ignore next */ err => {
				this.logger.error(
					`Unable to send '${ctx.action?.name}' request ${requestID}to ${nodeName} node.`,
					err
				);

				this.broker.broadcastLocal("$transit.error", {
					error: err,
					module: "transit",
					type: constants.FAILED_SEND_REQUEST_PACKET
				});
			};

			// Add to pendings
			this.pendingRequests.set(ctx.id, request);

			if (isStream) {
				const pass = ctx.options.stream;

				pass.on("moleculer-timeout-middleware", timeout => {
					this._destroyStreamIfPossible(
						pass,
						`Request stream ${ctx.id} have been closed by timeout ${timeout} ms`
					);
				});
			}

			// Publish request
			return this.publish(packet)
				.then(() => {
					if (isStream) {
						const { stream } = ctx.options;

						// Skip to send ctx.meta after the first packet because it doesn't appear on the remote side.
						payload.meta = {};
						// Still send information about objectMode in case of packets are received in wrong order
						if (stream.readableObjectMode === true) {
							payload.headers = payload.headers ?? {};
							payload.headers.$streamObjectMode = true;
						}

						stream.on("data", chunk => {
							stream.pause();
							const chunks = [];
							if (
								chunk instanceof Buffer &&
								this.opts.maxChunkSize > 0 &&
								chunk.length > this.opts.maxChunkSize
							) {
								let len = chunk.length;
								let i = 0;
								while (i < len) {
									chunks.push(chunk.subarray(i, (i += this.opts.maxChunkSize)));
								}
							} else {
								chunks.push(chunk);
							}

							return this.Promise.all(
								chunks.map(ch => {
									const copy = Object.assign({}, payload);
									copy.seq = ++payload.seq;
									copy.stream = true;
									copy.params = ch;

									this.logger.debug(
										`=> Send stream chunk ${requestID}to ${nodeName} node. Seq: ${copy.seq}`
									);

									return this.publish(new Packet$1(packets.PACKET_REQUEST, ctx.nodeID, copy));
								})
							)
								.then(() => stream.resume())
								.catch(publishCatch);
						});

						stream.on("end", () => {
							const copy = Object.assign({}, payload);
							copy.seq = ++payload.seq;
							copy.params = null;
							copy.stream = false;

							this.logger.debug(
								`=> Send stream closing ${requestID}to ${nodeName} node. Seq: ${copy.seq}`
							);

							return this.publish(new Packet$1(packets.PACKET_REQUEST, ctx.nodeID, copy)).catch(
								publishCatch
							);
						});

						stream.on("error", err => {
							const copy = Object.assign({}, payload);
							copy.seq = ++payload.seq;
							copy.stream = false;
							copy.headers.$streamError = this._createPayloadErrorField(err, payload);
							copy.params = null;

							this.logger.debug(
								`=> Send stream error ${requestID}to ${nodeName} node.`,
								copy.headers.$streamError
							);

							return this.publish(new Packet$1(packets.PACKET_REQUEST, ctx.nodeID, copy)).catch(
								publishCatch
							);
						});
					}
				})
				.catch(err => {
					publishCatch(err);
					reject(err);
				});
		}

		/**
		 * Send an event to a remote node.
		 * The event is balanced by transporter
		 *
		 * @param {Context} ctx
		 *
		 * @memberof Transit
		 */
		sendEvent(ctx) {
			const groups = ctx.eventGroups;
			const requestID = ctx.requestID ? "with requestID '" + ctx.requestID + "' " : "";
			if (ctx.endpoint)
				this.logger.debug(
					`=> Send '${ctx.eventName}' event ${requestID}to '${ctx.nodeID}' node` +
						(groups ? ` in '${groups.join(", ")}' group(s)` : "") +
						"."
				);
			else
				this.logger.debug(
					`=> Send '${ctx.eventName}' event ${requestID}to '${groups?.join(", ")}' group(s).`
				);

			return this.publish(
				new Packet$1(packets.PACKET_EVENT, ctx.endpoint ? ctx.nodeID : null, {
					id: ctx.id,
					event: ctx.eventName,
					data: ctx.params,
					groups,
					broadcast: ctx.eventType == "broadcast",
					meta: ctx.meta,
					headers: ctx.headers,
					level: ctx.level,
					tracing: ctx.tracing,
					parentID: ctx.parentID,
					requestID: ctx.requestID,
					caller: ctx.caller,
					needAck: ctx.needAck
				})
			).catch(
				/* istanbul ignore next */ err => {
					this.logger.error(
						`Unable to send '${ctx.eventName}' event ${requestID}to groups.`,
						err
					);

					this.broker.broadcastLocal("$transit.error", {
						error: err,
						module: "transit",
						type: constants.FAILED_SEND_EVENT_PACKET
					});

					return Promise.reject(err);
				}
			);
		}

		/**
		 * Remove a pending request
		 *
		 * @param {String} id
		 *
		 * @memberof Transit
		 */
		removePendingRequest(id) {
			this.pendingRequests.delete(id);

			this.pendingReqStreams.delete(id);
			this.pendingResStreams.delete(id);
		}

		/**
		 * Remove a pending request & streams
		 *
		 * @param {String} nodeID
		 *
		 * @memberof Transit
		 */
		removePendingRequestByNodeID(nodeID) {
			this.logger.debug(`Remove pending requests of '${nodeID}' node.`);

			// Close pending request streams of the node
			this.pendingReqStreams.forEach(({ sender, stream }, id) => {
				if (sender === nodeID) {
					this.pendingReqStreams.delete(id);
					this._destroyStreamIfPossible(stream, `Stream closed by ${nodeID}`);
				}
			});

			this.pendingRequests.forEach((req, id) => {
				if (req.nodeID === nodeID) {
					this.pendingRequests.delete(id);

					// Reject the request
					req.reject(
						new errors.RequestRejectedError({
							action: req.action.name,
							nodeID: req.nodeID
						})
					);

					this._deletePendingReqStream(id, nodeID);
					this._deletePendingResStream(id, nodeID);
				}
			});
		}

		/**
		 * Internal method to delete a pending response stream from `pendingResStreams`
		 * and destroy it (if not already destroyed) with error.
		 *
		 * @param {String} id ID of the stream in `pendingResStreams`
		 * @param {String} origin NodeID of the origin of the destroy request
		 *
		 * @memberof Transit
		 */
		_deletePendingResStream(id, origin) {
			const stream = this.pendingResStreams.get(id);
			this.pendingResStreams.delete(id);

			if (stream) {
				this._destroyStreamIfPossible(stream, `Stream closed by ${origin}`);
			}
		}

		/**
		 * Internal method to delete a pending request stream from `pendingReqStreams`
		 * and destroy it (if not already ended) with error.
		 *
		 * @param {String} id ID of the stream in `pendingReqStreams`
		 * @param {String} origin NodeID of the origin of the destroy request
		 *
		 * @memberof Transit
		 */
		_deletePendingReqStream(id, origin) {
			const reqStream = this.pendingReqStreams.get(id);
			const pass = reqStream ? reqStream.stream : undefined;
			this.pendingReqStreams.delete(id);

			if (pass) {
				this._destroyStreamIfPossible(pass, `Stream closed by ${origin}`);
			}
		}

		/**
		 * Internal method to destroy a stream if it is not already destroyed.
		 *
		 * @param {DuplexStream} stream - The stream to be destroyed.
		 * @param {String} errorMessage - The error message to be used when destroying.
		 *
		 * @memberof Transit
		 */
		_destroyStreamIfPossible(stream, errorMessage) {
			if (!stream.destroyed && stream.destroy) {
				stream.on("error", err => this.logger.error(err.message));
				stream.destroy(new Error(errorMessage));
			}
		}

		/**
		 * Create error field in outgoing payload
		 *
		 * @param {Error} err
		 * @param {Object} payload
		 * @returns {Object}
		 * @memberof Transit
		 */
		_createPayloadErrorField(err, payload) {
			return this.errorRegenerator?.extractPlainError(err, payload);
		}

		/**
		 * Send back the response of request
		 *
		 * @param {String} nodeID
		 * @param {String} id
		 * @param {Object} meta
		 * @param {Object} headers
		 * @param {any} data
		 * @param {Error?} err
		 *
		 * @memberof Transit
		 */
		sendResponse(nodeID, id, meta, headers, data, err) {
			// Publish the response
			const payload = {
				id: id,
				meta: meta,
				headers,
				success: err == null,
				data: data
			};

			if (err) payload.error = this._createPayloadErrorField(err, payload);

			const publishCatch = /* istanbul ignore next */ err => {
				this.logger.error(`Unable to send '${id}' response to '${nodeID}' node.`, err);

				this.broker.broadcastLocal("$transit.error", {
					error: err,
					module: "transit",
					type: constants.FAILED_SEND_RESPONSE_PACKET
				});
			};

			if (
				data &&
				data.readable === true &&
				typeof data.on === "function" &&
				typeof data.pipe === "function"
			) {
				// Streaming response
				payload.stream = true;
				if (data.readableObjectMode === true || data._readableState?.objectMode === true) {
					payload.headers = payload.headers || {};
					payload.headers.$streamObjectMode = true;
				}
				payload.seq = 0;

				const stream = data;
				stream.pause();

				stream.on("data", chunk => {
					stream.pause();
					const chunks = [];
					if (
						chunk instanceof Buffer &&
						this.opts.maxChunkSize > 0 &&
						chunk.length > this.opts.maxChunkSize
					) {
						let len = chunk.length;
						let i = 0;
						while (i < len) {
							chunks.push(chunk.subarray(i, (i += this.opts.maxChunkSize)));
						}
					} else {
						chunks.push(chunk);
					}

					return this.Promise.all(
						chunks.map(ch => {
							const copy = Object.assign({}, payload);
							copy.seq = ++payload.seq;
							copy.stream = true;
							copy.data = ch;

							this.logger.debug(
								`=> Send stream chunk to ${nodeID} node. Seq: ${copy.seq}`
							);

							return this.publish(new Packet$1(packets.PACKET_RESPONSE, nodeID, copy));
						})
					)
						.then(() => stream.resume())
						.catch(publishCatch);
				});

				stream.on("end", () => {
					const copy = Object.assign({}, payload);
					copy.stream = false;
					copy.seq = ++payload.seq;
					copy.data = null;

					this.logger.debug(`=> Send stream closing to ${nodeID} node. Seq: ${copy.seq}`);

					return this.publish(new Packet$1(packets.PACKET_RESPONSE, nodeID, copy)).catch(
						publishCatch
					);
				});

				stream.on("error", err => {
					const copy = Object.assign({}, payload);
					copy.stream = false;
					copy.seq = ++payload.seq;
					if (err) {
						copy.success = false;
						copy.error = this._createPayloadErrorField(err, payload);
					}

					this.logger.debug(`=> Send stream error to ${nodeID} node.`, copy.error);

					return this.publish(new Packet$1(packets.PACKET_RESPONSE, nodeID, copy)).catch(
						publishCatch
					);
				});

				payload.data = null;
				return this.publish(new Packet$1(packets.PACKET_RESPONSE, nodeID, payload))
					.then(() => {
						if (payload.stream) stream.resume();
					})
					.catch(publishCatch);
			}

			return this.publish(new Packet$1(packets.PACKET_RESPONSE, nodeID, payload)).catch(publishCatch);
		}

		/**
		 * Discover other nodes. It will be called after success connect.
		 *
		 * @memberof Transit
		 */
		discoverNodes() {
			return this.publish(new Packet$1(packets.PACKET_DISCOVER)).catch(
				/* istanbul ignore next */ err => {
					this.logger.error("Unable to send DISCOVER packet.", err);

					this.broker.broadcastLocal("$transit.error", {
						error: err,
						module: "transit",
						type: constants.FAILED_NODES_DISCOVERY
					});
				}
			);
		}

		/**
		 * Discover a node. It will be called if we got message from an unknown node.
		 *
		 * @memberof Transit
		 */
		discoverNode(nodeID) {
			return this.publish(new Packet$1(packets.PACKET_DISCOVER, nodeID)).catch(
				/* istanbul ignore next */ err => {
					this.logger.error(`Unable to send DISCOVER packet to '${nodeID}' node.`, err);

					this.broker.broadcastLocal("$transit.error", {
						error: err,
						module: "transit",
						type: constants.FAILED_NODE_DISCOVERY
					});
				}
			);
		}

		/**
		 * Send node info package to other nodes.
		 *
		 * @param {NodeRawInfo} info
		 * @param {String} nodeID
		 * @memberof Transit
		 */
		sendNodeInfo(info, nodeID) {
			if (!this.connected || !this.isReady) return this.Promise.resolve();

			return this.publish(
				new Packet$1(packets.PACKET_INFO, nodeID, {
					services: info.services,
					ipList: info.ipList,
					hostname: info.hostname,
					client: info.client,
					config: info.config,
					instanceID: this.broker.instanceID,
					metadata: info.metadata,
					seq: info.seq
				})
			).catch(
				/* istanbul ignore next */ err => {
					this.logger.error(`Unable to send INFO packet to '${nodeID}' node.`, err);

					this.broker.broadcastLocal("$transit.error", {
						error: err,
						module: "transit",
						type: constants.FAILED_SEND_INFO_PACKET
					});
				}
			);
		}

		/**
		 * Send ping to a node (or all nodes if nodeID is null)
		 *
		 * @param {String} nodeID
		 * @param {String=} id
		 * @returns
		 * @memberof Transit
		 */
		sendPing(nodeID, id) {
			return this.publish(
				new Packet$1(packets.PACKET_PING, nodeID, {
					time: Date.now(),
					id: id || this.broker.generateUid()
				})
			).catch(
				/* istanbul ignore next */ err => {
					this.logger.error(`Unable to send PING packet to '${nodeID}' node.`, err);

					this.broker.broadcastLocal("$transit.error", {
						error: err,
						module: "transit",
						type: constants.FAILED_SEND_PING_PACKET
					});
				}
			);
		}

		/**
		 * Send back pong response
		 *
		 * @param {PacketPingPayload} payload
		 * @returns
		 * @memberof Transit
		 */
		sendPong(payload) {
			return this.publish(
				new Packet$1(packets.PACKET_PONG, payload.sender, {
					time: payload.time,
					id: payload.id,
					arrived: Date.now()
				})
			).catch(
				/* istanbul ignore next */ err => {
					this.logger.error(`Unable to send PONG packet to '${payload.sender}' node.`, err);

					this.broker.broadcastLocal("$transit.error", {
						error: err,
						module: "transit",
						type: constants.FAILED_SEND_PONG_PACKET
					});
				}
			);
		}

		/**
		 * Process incoming PONG packet.
		 * Measure ping time & current time difference.
		 *
		 * @param {PacketPongPayload} payload
		 * @memberof Transit
		 */
		processPong(payload) {
			const now = Date.now();
			const elapsedTime = now - payload.time;
			const timeDiff = Math.round(now - payload.arrived - elapsedTime / 2);

			// this.logger.debug(`PING-PONG from '${payload.sender}' - Time: ${elapsedTime}ms, Time difference: ${timeDiff}ms`);

			this.broker.broadcastLocal("$node.pong", {
				nodeID: payload.sender,
				elapsedTime,
				timeDiff,
				id: payload.id
			});

			this.metrics.set(METRIC.MOLECULER_TRANSIT_PONG_TIME, elapsedTime, {
				targetNodeID: payload.sender
			});
			this.metrics.set(METRIC.MOLECULER_TRANSIT_PONG_SYSTIME_DIFF, timeDiff, {
				targetNodeID: payload.sender
			});
		}

		/**
		 * Send a node heartbeat. It will be called with timer from local Discoverer.
		 *
		 * @params {Node} localNode
		 * @memberof Transit
		 */
		sendHeartbeat(localNode) {
			return this.publish(
				new Packet$1(packets.PACKET_HEARTBEAT, null, {
					cpu: localNode.cpu
				})
			).catch(
				/* istanbul ignore next */ err => {
					this.logger.error("Unable to send HEARTBEAT packet.", err);

					this.broker.broadcastLocal("$transit.error", {
						error: err,
						module: "transit",
						type: constants.FAILED_SEND_HEARTBEAT_PACKET
					});
				}
			);
		}

		/**
		 * Publish via transporter
		 *
		 * @param {Packet} packet
		 *
		 * @memberof Transit
		 */
		publish(packet) {
			if (this.subscribing) {
				return this.subscribing.then(() => {
					return this.tx.prepublish(packet);
				});
			}
			return this.tx.prepublish(packet);
		}
	}

	var transit = Transit;

	/*
	 * moleculer
	 * Copyright (c) 2023 MoleculerJS (https://github.com/moleculerjs/moleculer)
	 * MIT Licensed
	 */

	/**
	 * Import types
	 *
	 * @typedef {import("../service-broker")} ServiceBroker
	 * @typedef {import("../context")} Context
	 * @typedef {import("../registry")} Registry
	 * @typedef {import("../registry/endpoint")} Endpoint
	 * @typedef {import("./base")} BaseStrategyClass
	 */

	/**
	 * Base strategy class
	 *
	 * @implements {BaseStrategyClass}
	 */
	class BaseStrategy {
		/**
		 * Constructor
		 *
		 * @param {Registry} registry
		 * @param {ServiceBroker} broker
		 * @param {Record<string, any>?} opts
		 */
		constructor(registry, broker, opts) {
			this.registry = registry;
			this.broker = broker;
			this.opts = opts || {};
		}

		/**
		 * Select an endpoint.
		 *
		 * @param {Endpoint[]} list
		 * @param {Context?} ctx
		 * @returns {Endpoint}
		 * @memberof BaseStrategy
		 */
		select(list, ctx) {
			/* istanbul ignore next */
			throw new Error("Not implemented method!");
		}
	}

	var base$2 = BaseStrategy;

	/**
	 * Import types
	 *
	 * @typedef {import("../service-broker")} ServiceBroker
	 * @typedef {import("../registry")} Registry
	 * @typedef {import("../registry/endpoint")} Endpoint
	 * @typedef {import("./round-robin")} RoundRobinStrategyClass
	 */

	/**
	 * Round-robin strategy class
	 *
	 * @implements {RoundRobinStrategyClass}
	 */
	class RoundRobinStrategy extends base$2 {
		constructor(registry, broker, opts) {
			super(registry, broker, opts);

			this.counter = 0;
		}

		/**
		 * Select an endpoint.
		 *
		 * @param {Endpoint[]} list
		 *
		 * @returns {Endpoint}
		 * @memberof BaseStrategy
		 */
		select(list) {
			// Reset counter
			if (this.counter >= list.length) {
				this.counter = 0;
			}
			return list[this.counter++];
		}
	}

	var roundRobin = RoundRobinStrategy;

	const { random } = ___default;


	/**
	 * Import types
	 *
	 * @typedef {import("../service-broker")} ServiceBroker
	 * @typedef {import("../registry")} Registry
	 * @typedef {import("../registry/endpoint")} Endpoint
	 * @typedef {import("./random")} RandomStrategyClass
	 */

	/**
	 * Random strategy class
	 *
	 * @implements {RandomStrategyClass}
	 */
	class RandomStrategy extends base$2 {
		/**
		 * Select an endpoint.
		 *
		 * @param {Endpoint[]} list
		 *
		 * @returns {Endpoint}
		 * @memberof BaseStrategy
		 */
		select(list) {
			return list[random(0, list.length - 1)];
		}
	}

	var random_1 = RandomStrategy;

	const { random: random$1 } = ___default;


	/**
	 * Import types
	 *
	 * @typedef {import("../service-broker")} ServiceBroker
	 * @typedef {import("../registry")} Registry
	 * @typedef {import("../registry/endpoint")} Endpoint
	 * @typedef {import("./latency")} LatencyStrategyClass
	 * @typedef {import("./latency").LatencyStrategyOptions} LatencyStrategyOptions
	 */

	/**
	 * Lowest latency invocation strategy
	 *
	 * Since Strategy can be instantiated multiple times, therefore,
	 * we need to have a "master" instance to send ping, and each
	 * individual "slave" instance will update their list dynamically
	 *
	 * These options can be configured in broker registry options:
	 *
	 * const broker = new ServiceBroker({
	 * 	logger: true,
	 * 	registry: {
	 * 		strategy: "LatencyStrategy",
	 * 		strategyOptions: {
	 * 			sampleCount: 5,
	 * 			lowLatency: 10,
	 * 			collectCount: 5,
	 * 			pingInterval: 10
	 * 		}
	 * 	}
	 * });
	 *
	 * @implements {LatencyStrategyClass}
	 */
	class LatencyStrategy extends base$2 {
		/**
		 * Creates an instance of CborSerializer.
		 *
		 * @param {Registry} registry
		 * @param {ServiceBroker} broker
		 * @param {LatencyStrategyOptions} opts
		 */
		constructor(registry, broker, opts) {
			super(registry, broker, opts);

			/** @type {LatencyStrategyOptions} */
			this.opts = ___default.defaultsDeep(opts, {
				sampleCount: 5,
				lowLatency: 10,
				collectCount: 5,
				pingInterval: 10
			});

			this.brokerStopped = false;

			this.hostAvgLatency = new Map();

			/* hostMap contains:
				hostname => {
					historicLatency: [],
					nodeList: []
				}
			*/
			this.hostMap = new Map();

			// short circuit
			if (!this.broker.transit) return;

			if (this.broker.localBus.listenerCount("$node.latencyMaster") === 0) {
				// claim as master
				this.broker.localBus.on("$node.latencyMaster", function () {});
				// respond to PONG
				this.broker.localBus.on("$node.pong", this.processPong.bind(this));
				// dynamically add new node
				this.broker.localBus.on("$node.connected", this.addNode.bind(this));
				// dynamically remove node
				this.broker.localBus.on("$node.disconnected", this.removeHostMap.bind(this));
				// try to discovery all nodes on start up
				this.broker.localBus.on("$broker.started", this.discovery.bind(this));
				// clean up ourselves
				this.broker.localBus.on("$broker.stopped", () => (this.brokerStopped = true));
			} else {
				// remove node if we are told by master
				this.broker.localBus.on(
					"$node.latencySlave.removeHost",
					this.removeHostLatency.bind(this)
				);
			}

			this.broker.localBus.on("$node.latencySlave", this.updateLatency.bind(this));
		}

		// Master
		discovery() {
			return this.broker.transit.sendPing().then(() => {
				const timer = timersBrowserify.setTimeout(() => this.pingHosts(), 1000 * this.opts.pingInterval);
				timer.unref();
			});
		}

		// Master
		pingHosts() {
			/* istanbul ignore next */
			if (this.brokerStopped) return;
			/*
				Smart Ping: only ping the host, not the nodes (which may be many)

				Although, if that particular node on the host is overloaded,
				the measurement may be skewed.
			*/
			const hosts = Array.from(this.hostMap.values());

			return this.broker.Promise.all(
				hosts.map(host => {
					// TODO: missing concurency: 5, here was bluebird Promise.map
					// Select a nodeID randomly
					const nodeID = host.nodeList[random$1(0, host.nodeList.length - 1)];
					return this.broker.transit.sendPing(nodeID);
				})
			).then(() => {
				const timer = timersBrowserify.setTimeout(() => this.pingHosts(), 1000 * this.opts.pingInterval);
				timer.unref();
			});
		}

		// Master
		processPong(payload) {
			let node = this.registry.nodes.get(payload.nodeID);

			/* istanbul ignore next */
			if (!node) return;

			let info = this.getHostLatency(node);

			if (info.historicLatency.length > this.opts.collectCount - 1) info.historicLatency.shift();

			info.historicLatency.push(payload.elapsedTime);

			const avgLatency =
				info.historicLatency.reduce((sum, latency) => sum + latency, 0) /
				info.historicLatency.length;

			this.broker.localBus.emit("$node.latencySlave", {
				hostname: node.hostname,
				avgLatency: avgLatency
			});
		}

		// Master
		getHostLatency(node) {
			let info = this.hostMap.get(node.hostname);
			if (typeof info === "undefined") {
				info = {
					historicLatency: [],
					nodeList: [node.id]
				};
				this.hostMap.set(node.hostname, info);
			}
			return info;
		}

		// Master
		addNode(payload) {
			let node = payload.node;

			// each host may have multiple nodes
			let info = this.getHostLatency(node);
			if (info.nodeList.indexOf(node.id) === -1) {
				info.nodeList.push(node.id);
			}
		}

		// Master
		removeHostMap(payload) {
			let node = payload.node;

			let info = this.hostMap.get(node.hostname);
			// This exists to make sure that we don't get an "undefined",
			// 	therefore the test coverage here is unnecessary.
			/* istanbul ignore next */
			if (typeof info === "undefined") return;

			info.nodeList = info.nodeList.filter(id => id !== node.id);

			if (info.nodeList.length === 0) {
				// only remove the host if the last node disconnected
				this.broker.localBus.emit("$node.latencySlave.removeHost", node.hostname);
				this.hostMap.delete(node.hostname);
			}
		}

		// Master + Slave
		updateLatency(payload) {
			this.hostAvgLatency.set(payload.hostname, payload.avgLatency);
		}

		// Slave
		removeHostLatency(hostname) {
			this.hostAvgLatency.delete(hostname);
		}

		/**
		 * Select an endpoint.
		 *
		 * @param {Endpoint[]} list
		 *
		 * @returns {Endpoint}
		 * @memberof BaseStrategy
		 */
		select(list) {
			let minEp = null;
			let minLatency = null;

			const sampleCount = this.opts.sampleCount;
			const count = sampleCount <= 0 || sampleCount > list.length ? list.length : sampleCount;
			for (let i = 0; i < count; i++) {
				let ep;
				// Get random endpoint
				if (count == list.length) {
					ep = list[i];
				} else {
					/* istanbul ignore next */
					ep = list[random$1(0, list.length - 1)];
				}
				const epLatency = this.hostAvgLatency.get(ep.node.hostname);

				// Check latency of endpoint
				if (typeof epLatency !== "undefined") {
					if (epLatency < this.opts.lowLatency) return ep;

					if (!minEp || !minLatency || epLatency < minLatency) {
						minLatency = epLatency;
						minEp = ep;
					}
				}
			}

			// Return the lowest latency
			if (minEp) {
				return minEp;
			}

			// Return a random item (no latency data)
			return list[random$1(0, list.length - 1)];
		}
	}

	var latency = LatencyStrategy;

	const perf =
	  typeof performance === 'object' &&
	  performance &&
	  typeof performance.now === 'function'
	    ? performance
	    : Date;

	const hasAbortController = typeof AbortController === 'function';

	// minimal backwards-compatibility polyfill
	// this doesn't have nearly all the checks and whatnot that
	// actual AbortController/Signal has, but it's enough for
	// our purposes, and if used properly, behaves the same.
	const AC = hasAbortController
	  ? AbortController
	  : class AbortController {
	      constructor() {
	        this.signal = new AS();
	      }
	      abort(reason = new Error('This operation was aborted')) {
	        this.signal.reason = this.signal.reason || reason;
	        this.signal.aborted = true;
	        this.signal.dispatchEvent({
	          type: 'abort',
	          target: this.signal,
	        });
	      }
	    };

	const hasAbortSignal = typeof AbortSignal === 'function';
	// Some polyfills put this on the AC class, not global
	const hasACAbortSignal = typeof AC.AbortSignal === 'function';
	const AS = hasAbortSignal
	  ? AbortSignal
	  : hasACAbortSignal
	  ? AC.AbortController
	  : class AbortSignal {
	      constructor() {
	        this.reason = undefined;
	        this.aborted = false;
	        this._listeners = [];
	      }
	      dispatchEvent(e) {
	        if (e.type === 'abort') {
	          this.aborted = true;
	          this.onabort(e);
	          this._listeners.forEach(f => f(e), this);
	        }
	      }
	      onabort() {}
	      addEventListener(ev, fn) {
	        if (ev === 'abort') {
	          this._listeners.push(fn);
	        }
	      }
	      removeEventListener(ev, fn) {
	        if (ev === 'abort') {
	          this._listeners = this._listeners.filter(f => f !== fn);
	        }
	      }
	    };

	const warned = new Set();
	const deprecatedOption = (opt, instead) => {
	  const code = `LRU_CACHE_OPTION_${opt}`;
	  if (shouldWarn(code)) {
	    warn(code, `${opt} option`, `options.${instead}`, LRUCache);
	  }
	};
	const deprecatedMethod = (method, instead) => {
	  const code = `LRU_CACHE_METHOD_${method}`;
	  if (shouldWarn(code)) {
	    const { prototype } = LRUCache;
	    const { get } = Object.getOwnPropertyDescriptor(prototype, method);
	    warn(code, `${method} method`, `cache.${instead}()`, get);
	  }
	};
	const deprecatedProperty = (field, instead) => {
	  const code = `LRU_CACHE_PROPERTY_${field}`;
	  if (shouldWarn(code)) {
	    const { prototype } = LRUCache;
	    const { get } = Object.getOwnPropertyDescriptor(prototype, field);
	    warn(code, `${field} property`, `cache.${instead}`, get);
	  }
	};

	const emitWarning = (...a) => {
	  typeof process === 'object' &&
	  process &&
	  typeof process.emitWarning === 'function'
	    ? process.emitWarning(...a)
	    : console.error(...a);
	};

	const shouldWarn = code => !warned.has(code);

	const warn = (code, what, instead, fn) => {
	  warned.add(code);
	  const msg = `The ${what} is deprecated. Please use ${instead} instead.`;
	  emitWarning(msg, 'DeprecationWarning', code, fn);
	};

	const isPosInt = n => n && n === Math.floor(n) && n > 0 && isFinite(n);

	/* istanbul ignore next - This is a little bit ridiculous, tbh.
	 * The maximum array length is 2^32-1 or thereabouts on most JS impls.
	 * And well before that point, you're caching the entire world, I mean,
	 * that's ~32GB of just integers for the next/prev links, plus whatever
	 * else to hold that many keys and values.  Just filling the memory with
	 * zeroes at init time is brutal when you get that big.
	 * But why not be complete?
	 * Maybe in the future, these limits will have expanded. */
	const getUintArray = max =>
	  !isPosInt(max)
	    ? null
	    : max <= Math.pow(2, 8)
	    ? Uint8Array
	    : max <= Math.pow(2, 16)
	    ? Uint16Array
	    : max <= Math.pow(2, 32)
	    ? Uint32Array
	    : max <= Number.MAX_SAFE_INTEGER
	    ? ZeroArray
	    : null;

	class ZeroArray extends Array {
	  constructor(size) {
	    super(size);
	    this.fill(0);
	  }
	}

	class Stack {
	  constructor(max) {
	    if (max === 0) {
	      return []
	    }
	    const UintArray = getUintArray(max);
	    this.heap = new UintArray(max);
	    this.length = 0;
	  }
	  push(n) {
	    this.heap[this.length++] = n;
	  }
	  pop() {
	    return this.heap[--this.length]
	  }
	}

	class LRUCache {
	  constructor(options = {}) {
	    const {
	      max = 0,
	      ttl,
	      ttlResolution = 1,
	      ttlAutopurge,
	      updateAgeOnGet,
	      updateAgeOnHas,
	      allowStale,
	      dispose,
	      disposeAfter,
	      noDisposeOnSet,
	      noUpdateTTL,
	      maxSize = 0,
	      maxEntrySize = 0,
	      sizeCalculation,
	      fetchMethod,
	      fetchContext,
	      noDeleteOnFetchRejection,
	      noDeleteOnStaleGet,
	      allowStaleOnFetchRejection,
	      allowStaleOnFetchAbort,
	      ignoreFetchAbort,
	    } = options;

	    // deprecated options, don't trigger a warning for getting them if
	    // the thing being passed in is another LRUCache we're copying.
	    const { length, maxAge, stale } =
	      options instanceof LRUCache ? {} : options;

	    if (max !== 0 && !isPosInt(max)) {
	      throw new TypeError('max option must be a nonnegative integer')
	    }

	    const UintArray = max ? getUintArray(max) : Array;
	    if (!UintArray) {
	      throw new Error('invalid max value: ' + max)
	    }

	    this.max = max;
	    this.maxSize = maxSize;
	    this.maxEntrySize = maxEntrySize || this.maxSize;
	    this.sizeCalculation = sizeCalculation || length;
	    if (this.sizeCalculation) {
	      if (!this.maxSize && !this.maxEntrySize) {
	        throw new TypeError(
	          'cannot set sizeCalculation without setting maxSize or maxEntrySize'
	        )
	      }
	      if (typeof this.sizeCalculation !== 'function') {
	        throw new TypeError('sizeCalculation set to non-function')
	      }
	    }

	    this.fetchMethod = fetchMethod || null;
	    if (this.fetchMethod && typeof this.fetchMethod !== 'function') {
	      throw new TypeError(
	        'fetchMethod must be a function if specified'
	      )
	    }

	    this.fetchContext = fetchContext;
	    if (!this.fetchMethod && fetchContext !== undefined) {
	      throw new TypeError(
	        'cannot set fetchContext without fetchMethod'
	      )
	    }

	    this.keyMap = new Map();
	    this.keyList = new Array(max).fill(null);
	    this.valList = new Array(max).fill(null);
	    this.next = new UintArray(max);
	    this.prev = new UintArray(max);
	    this.head = 0;
	    this.tail = 0;
	    this.free = new Stack(max);
	    this.initialFill = 1;
	    this.size = 0;

	    if (typeof dispose === 'function') {
	      this.dispose = dispose;
	    }
	    if (typeof disposeAfter === 'function') {
	      this.disposeAfter = disposeAfter;
	      this.disposed = [];
	    } else {
	      this.disposeAfter = null;
	      this.disposed = null;
	    }
	    this.noDisposeOnSet = !!noDisposeOnSet;
	    this.noUpdateTTL = !!noUpdateTTL;
	    this.noDeleteOnFetchRejection = !!noDeleteOnFetchRejection;
	    this.allowStaleOnFetchRejection = !!allowStaleOnFetchRejection;
	    this.allowStaleOnFetchAbort = !!allowStaleOnFetchAbort;
	    this.ignoreFetchAbort = !!ignoreFetchAbort;

	    // NB: maxEntrySize is set to maxSize if it's set
	    if (this.maxEntrySize !== 0) {
	      if (this.maxSize !== 0) {
	        if (!isPosInt(this.maxSize)) {
	          throw new TypeError(
	            'maxSize must be a positive integer if specified'
	          )
	        }
	      }
	      if (!isPosInt(this.maxEntrySize)) {
	        throw new TypeError(
	          'maxEntrySize must be a positive integer if specified'
	        )
	      }
	      this.initializeSizeTracking();
	    }

	    this.allowStale = !!allowStale || !!stale;
	    this.noDeleteOnStaleGet = !!noDeleteOnStaleGet;
	    this.updateAgeOnGet = !!updateAgeOnGet;
	    this.updateAgeOnHas = !!updateAgeOnHas;
	    this.ttlResolution =
	      isPosInt(ttlResolution) || ttlResolution === 0
	        ? ttlResolution
	        : 1;
	    this.ttlAutopurge = !!ttlAutopurge;
	    this.ttl = ttl || maxAge || 0;
	    if (this.ttl) {
	      if (!isPosInt(this.ttl)) {
	        throw new TypeError(
	          'ttl must be a positive integer if specified'
	        )
	      }
	      this.initializeTTLTracking();
	    }

	    // do not allow completely unbounded caches
	    if (this.max === 0 && this.ttl === 0 && this.maxSize === 0) {
	      throw new TypeError(
	        'At least one of max, maxSize, or ttl is required'
	      )
	    }
	    if (!this.ttlAutopurge && !this.max && !this.maxSize) {
	      const code = 'LRU_CACHE_UNBOUNDED';
	      if (shouldWarn(code)) {
	        warned.add(code);
	        const msg =
	          'TTL caching without ttlAutopurge, max, or maxSize can ' +
	          'result in unbounded memory consumption.';
	        emitWarning(msg, 'UnboundedCacheWarning', code, LRUCache);
	      }
	    }

	    if (stale) {
	      deprecatedOption('stale', 'allowStale');
	    }
	    if (maxAge) {
	      deprecatedOption('maxAge', 'ttl');
	    }
	    if (length) {
	      deprecatedOption('length', 'sizeCalculation');
	    }
	  }

	  getRemainingTTL(key) {
	    return this.has(key, { updateAgeOnHas: false }) ? Infinity : 0
	  }

	  initializeTTLTracking() {
	    this.ttls = new ZeroArray(this.max);
	    this.starts = new ZeroArray(this.max);

	    this.setItemTTL = (index, ttl, start = perf.now()) => {
	      this.starts[index] = ttl !== 0 ? start : 0;
	      this.ttls[index] = ttl;
	      if (ttl !== 0 && this.ttlAutopurge) {
	        const t = setTimeout(() => {
	          if (this.isStale(index)) {
	            this.delete(this.keyList[index]);
	          }
	        }, ttl + 1);
	        /* istanbul ignore else - unref() not supported on all platforms */
	        if (t.unref) {
	          t.unref();
	        }
	      }
	    };

	    this.updateItemAge = index => {
	      this.starts[index] = this.ttls[index] !== 0 ? perf.now() : 0;
	    };

	    this.statusTTL = (status, index) => {
	      if (status) {
	        status.ttl = this.ttls[index];
	        status.start = this.starts[index];
	        status.now = cachedNow || getNow();
	        status.remainingTTL = status.now + status.ttl - status.start;
	      }
	    };

	    // debounce calls to perf.now() to 1s so we're not hitting
	    // that costly call repeatedly.
	    let cachedNow = 0;
	    const getNow = () => {
	      const n = perf.now();
	      if (this.ttlResolution > 0) {
	        cachedNow = n;
	        const t = setTimeout(
	          () => (cachedNow = 0),
	          this.ttlResolution
	        );
	        /* istanbul ignore else - not available on all platforms */
	        if (t.unref) {
	          t.unref();
	        }
	      }
	      return n
	    };

	    this.getRemainingTTL = key => {
	      const index = this.keyMap.get(key);
	      if (index === undefined) {
	        return 0
	      }
	      return this.ttls[index] === 0 || this.starts[index] === 0
	        ? Infinity
	        : this.starts[index] +
	            this.ttls[index] -
	            (cachedNow || getNow())
	    };

	    this.isStale = index => {
	      return (
	        this.ttls[index] !== 0 &&
	        this.starts[index] !== 0 &&
	        (cachedNow || getNow()) - this.starts[index] >
	          this.ttls[index]
	      )
	    };
	  }
	  updateItemAge(_index) {}
	  statusTTL(_status, _index) {}
	  setItemTTL(_index, _ttl, _start) {}
	  isStale(_index) {
	    return false
	  }

	  initializeSizeTracking() {
	    this.calculatedSize = 0;
	    this.sizes = new ZeroArray(this.max);
	    this.removeItemSize = index => {
	      this.calculatedSize -= this.sizes[index];
	      this.sizes[index] = 0;
	    };
	    this.requireSize = (k, v, size, sizeCalculation) => {
	      // provisionally accept background fetches.
	      // actual value size will be checked when they return.
	      if (this.isBackgroundFetch(v)) {
	        return 0
	      }
	      if (!isPosInt(size)) {
	        if (sizeCalculation) {
	          if (typeof sizeCalculation !== 'function') {
	            throw new TypeError('sizeCalculation must be a function')
	          }
	          size = sizeCalculation(v, k);
	          if (!isPosInt(size)) {
	            throw new TypeError(
	              'sizeCalculation return invalid (expect positive integer)'
	            )
	          }
	        } else {
	          throw new TypeError(
	            'invalid size value (must be positive integer). ' +
	              'When maxSize or maxEntrySize is used, sizeCalculation or size ' +
	              'must be set.'
	          )
	        }
	      }
	      return size
	    };
	    this.addItemSize = (index, size, status) => {
	      this.sizes[index] = size;
	      if (this.maxSize) {
	        const maxSize = this.maxSize - this.sizes[index];
	        while (this.calculatedSize > maxSize) {
	          this.evict(true);
	        }
	      }
	      this.calculatedSize += this.sizes[index];
	      if (status) {
	        status.entrySize = size;
	        status.totalCalculatedSize = this.calculatedSize;
	      }
	    };
	  }
	  removeItemSize(_index) {}
	  addItemSize(_index, _size) {}
	  requireSize(_k, _v, size, sizeCalculation) {
	    if (size || sizeCalculation) {
	      throw new TypeError(
	        'cannot set size without setting maxSize or maxEntrySize on cache'
	      )
	    }
	  }

	  *indexes({ allowStale = this.allowStale } = {}) {
	    if (this.size) {
	      for (let i = this.tail; true; ) {
	        if (!this.isValidIndex(i)) {
	          break
	        }
	        if (allowStale || !this.isStale(i)) {
	          yield i;
	        }
	        if (i === this.head) {
	          break
	        } else {
	          i = this.prev[i];
	        }
	      }
	    }
	  }

	  *rindexes({ allowStale = this.allowStale } = {}) {
	    if (this.size) {
	      for (let i = this.head; true; ) {
	        if (!this.isValidIndex(i)) {
	          break
	        }
	        if (allowStale || !this.isStale(i)) {
	          yield i;
	        }
	        if (i === this.tail) {
	          break
	        } else {
	          i = this.next[i];
	        }
	      }
	    }
	  }

	  isValidIndex(index) {
	    return (
	      index !== undefined &&
	      this.keyMap.get(this.keyList[index]) === index
	    )
	  }

	  *entries() {
	    for (const i of this.indexes()) {
	      if (
	        this.valList[i] !== undefined &&
	        this.keyList[i] !== undefined &&
	        !this.isBackgroundFetch(this.valList[i])
	      ) {
	        yield [this.keyList[i], this.valList[i]];
	      }
	    }
	  }
	  *rentries() {
	    for (const i of this.rindexes()) {
	      if (
	        this.valList[i] !== undefined &&
	        this.keyList[i] !== undefined &&
	        !this.isBackgroundFetch(this.valList[i])
	      ) {
	        yield [this.keyList[i], this.valList[i]];
	      }
	    }
	  }

	  *keys() {
	    for (const i of this.indexes()) {
	      if (
	        this.keyList[i] !== undefined &&
	        !this.isBackgroundFetch(this.valList[i])
	      ) {
	        yield this.keyList[i];
	      }
	    }
	  }
	  *rkeys() {
	    for (const i of this.rindexes()) {
	      if (
	        this.keyList[i] !== undefined &&
	        !this.isBackgroundFetch(this.valList[i])
	      ) {
	        yield this.keyList[i];
	      }
	    }
	  }

	  *values() {
	    for (const i of this.indexes()) {
	      if (
	        this.valList[i] !== undefined &&
	        !this.isBackgroundFetch(this.valList[i])
	      ) {
	        yield this.valList[i];
	      }
	    }
	  }
	  *rvalues() {
	    for (const i of this.rindexes()) {
	      if (
	        this.valList[i] !== undefined &&
	        !this.isBackgroundFetch(this.valList[i])
	      ) {
	        yield this.valList[i];
	      }
	    }
	  }

	  [Symbol.iterator]() {
	    return this.entries()
	  }

	  find(fn, getOptions) {
	    for (const i of this.indexes()) {
	      const v = this.valList[i];
	      const value = this.isBackgroundFetch(v)
	        ? v.__staleWhileFetching
	        : v;
	      if (value === undefined) continue
	      if (fn(value, this.keyList[i], this)) {
	        return this.get(this.keyList[i], getOptions)
	      }
	    }
	  }

	  forEach(fn, thisp = this) {
	    for (const i of this.indexes()) {
	      const v = this.valList[i];
	      const value = this.isBackgroundFetch(v)
	        ? v.__staleWhileFetching
	        : v;
	      if (value === undefined) continue
	      fn.call(thisp, value, this.keyList[i], this);
	    }
	  }

	  rforEach(fn, thisp = this) {
	    for (const i of this.rindexes()) {
	      const v = this.valList[i];
	      const value = this.isBackgroundFetch(v)
	        ? v.__staleWhileFetching
	        : v;
	      if (value === undefined) continue
	      fn.call(thisp, value, this.keyList[i], this);
	    }
	  }

	  get prune() {
	    deprecatedMethod('prune', 'purgeStale');
	    return this.purgeStale
	  }

	  purgeStale() {
	    let deleted = false;
	    for (const i of this.rindexes({ allowStale: true })) {
	      if (this.isStale(i)) {
	        this.delete(this.keyList[i]);
	        deleted = true;
	      }
	    }
	    return deleted
	  }

	  dump() {
	    const arr = [];
	    for (const i of this.indexes({ allowStale: true })) {
	      const key = this.keyList[i];
	      const v = this.valList[i];
	      const value = this.isBackgroundFetch(v)
	        ? v.__staleWhileFetching
	        : v;
	      if (value === undefined) continue
	      const entry = { value };
	      if (this.ttls) {
	        entry.ttl = this.ttls[i];
	        // always dump the start relative to a portable timestamp
	        // it's ok for this to be a bit slow, it's a rare operation.
	        const age = perf.now() - this.starts[i];
	        entry.start = Math.floor(Date.now() - age);
	      }
	      if (this.sizes) {
	        entry.size = this.sizes[i];
	      }
	      arr.unshift([key, entry]);
	    }
	    return arr
	  }

	  load(arr) {
	    this.clear();
	    for (const [key, entry] of arr) {
	      if (entry.start) {
	        // entry.start is a portable timestamp, but we may be using
	        // node's performance.now(), so calculate the offset.
	        // it's ok for this to be a bit slow, it's a rare operation.
	        const age = Date.now() - entry.start;
	        entry.start = perf.now() - age;
	      }
	      this.set(key, entry.value, entry);
	    }
	  }

	  dispose(_v, _k, _reason) {}

	  set(
	    k,
	    v,
	    {
	      ttl = this.ttl,
	      start,
	      noDisposeOnSet = this.noDisposeOnSet,
	      size = 0,
	      sizeCalculation = this.sizeCalculation,
	      noUpdateTTL = this.noUpdateTTL,
	      status,
	    } = {}
	  ) {
	    size = this.requireSize(k, v, size, sizeCalculation);
	    // if the item doesn't fit, don't do anything
	    // NB: maxEntrySize set to maxSize by default
	    if (this.maxEntrySize && size > this.maxEntrySize) {
	      if (status) {
	        status.set = 'miss';
	        status.maxEntrySizeExceeded = true;
	      }
	      // have to delete, in case a background fetch is there already.
	      // in non-async cases, this is a no-op
	      this.delete(k);
	      return this
	    }
	    let index = this.size === 0 ? undefined : this.keyMap.get(k);
	    if (index === undefined) {
	      // addition
	      index = this.newIndex();
	      this.keyList[index] = k;
	      this.valList[index] = v;
	      this.keyMap.set(k, index);
	      this.next[this.tail] = index;
	      this.prev[index] = this.tail;
	      this.tail = index;
	      this.size++;
	      this.addItemSize(index, size, status);
	      if (status) {
	        status.set = 'add';
	      }
	      noUpdateTTL = false;
	    } else {
	      // update
	      this.moveToTail(index);
	      const oldVal = this.valList[index];
	      if (v !== oldVal) {
	        if (this.isBackgroundFetch(oldVal)) {
	          oldVal.__abortController.abort(new Error('replaced'));
	        } else {
	          if (!noDisposeOnSet) {
	            this.dispose(oldVal, k, 'set');
	            if (this.disposeAfter) {
	              this.disposed.push([oldVal, k, 'set']);
	            }
	          }
	        }
	        this.removeItemSize(index);
	        this.valList[index] = v;
	        this.addItemSize(index, size, status);
	        if (status) {
	          status.set = 'replace';
	          const oldValue =
	            oldVal && this.isBackgroundFetch(oldVal)
	              ? oldVal.__staleWhileFetching
	              : oldVal;
	          if (oldValue !== undefined) status.oldValue = oldValue;
	        }
	      } else if (status) {
	        status.set = 'update';
	      }
	    }
	    if (ttl !== 0 && this.ttl === 0 && !this.ttls) {
	      this.initializeTTLTracking();
	    }
	    if (!noUpdateTTL) {
	      this.setItemTTL(index, ttl, start);
	    }
	    this.statusTTL(status, index);
	    if (this.disposeAfter) {
	      while (this.disposed.length) {
	        this.disposeAfter(...this.disposed.shift());
	      }
	    }
	    return this
	  }

	  newIndex() {
	    if (this.size === 0) {
	      return this.tail
	    }
	    if (this.size === this.max && this.max !== 0) {
	      return this.evict(false)
	    }
	    if (this.free.length !== 0) {
	      return this.free.pop()
	    }
	    // initial fill, just keep writing down the list
	    return this.initialFill++
	  }

	  pop() {
	    if (this.size) {
	      const val = this.valList[this.head];
	      this.evict(true);
	      return val
	    }
	  }

	  evict(free) {
	    const head = this.head;
	    const k = this.keyList[head];
	    const v = this.valList[head];
	    if (this.isBackgroundFetch(v)) {
	      v.__abortController.abort(new Error('evicted'));
	    } else {
	      this.dispose(v, k, 'evict');
	      if (this.disposeAfter) {
	        this.disposed.push([v, k, 'evict']);
	      }
	    }
	    this.removeItemSize(head);
	    // if we aren't about to use the index, then null these out
	    if (free) {
	      this.keyList[head] = null;
	      this.valList[head] = null;
	      this.free.push(head);
	    }
	    this.head = this.next[head];
	    this.keyMap.delete(k);
	    this.size--;
	    return head
	  }

	  has(k, { updateAgeOnHas = this.updateAgeOnHas, status } = {}) {
	    const index = this.keyMap.get(k);
	    if (index !== undefined) {
	      if (!this.isStale(index)) {
	        if (updateAgeOnHas) {
	          this.updateItemAge(index);
	        }
	        if (status) status.has = 'hit';
	        this.statusTTL(status, index);
	        return true
	      } else if (status) {
	        status.has = 'stale';
	        this.statusTTL(status, index);
	      }
	    } else if (status) {
	      status.has = 'miss';
	    }
	    return false
	  }

	  // like get(), but without any LRU updating or TTL expiration
	  peek(k, { allowStale = this.allowStale } = {}) {
	    const index = this.keyMap.get(k);
	    if (index !== undefined && (allowStale || !this.isStale(index))) {
	      const v = this.valList[index];
	      // either stale and allowed, or forcing a refresh of non-stale value
	      return this.isBackgroundFetch(v) ? v.__staleWhileFetching : v
	    }
	  }

	  backgroundFetch(k, index, options, context) {
	    const v = index === undefined ? undefined : this.valList[index];
	    if (this.isBackgroundFetch(v)) {
	      return v
	    }
	    const ac = new AC();
	    if (options.signal) {
	      options.signal.addEventListener('abort', () =>
	        ac.abort(options.signal.reason)
	      );
	    }
	    const fetchOpts = {
	      signal: ac.signal,
	      options,
	      context,
	    };
	    const cb = (v, updateCache = false) => {
	      const { aborted } = ac.signal;
	      const ignoreAbort = options.ignoreFetchAbort && v !== undefined;
	      if (options.status) {
	        if (aborted && !updateCache) {
	          options.status.fetchAborted = true;
	          options.status.fetchError = ac.signal.reason;
	          if (ignoreAbort) options.status.fetchAbortIgnored = true;
	        } else {
	          options.status.fetchResolved = true;
	        }
	      }
	      if (aborted && !ignoreAbort && !updateCache) {
	        return fetchFail(ac.signal.reason)
	      }
	      // either we didn't abort, and are still here, or we did, and ignored
	      if (this.valList[index] === p) {
	        if (v === undefined) {
	          if (p.__staleWhileFetching) {
	            this.valList[index] = p.__staleWhileFetching;
	          } else {
	            this.delete(k);
	          }
	        } else {
	          if (options.status) options.status.fetchUpdated = true;
	          this.set(k, v, fetchOpts.options);
	        }
	      }
	      return v
	    };
	    const eb = er => {
	      if (options.status) {
	        options.status.fetchRejected = true;
	        options.status.fetchError = er;
	      }
	      return fetchFail(er)
	    };
	    const fetchFail = er => {
	      const { aborted } = ac.signal;
	      const allowStaleAborted =
	        aborted && options.allowStaleOnFetchAbort;
	      const allowStale =
	        allowStaleAborted || options.allowStaleOnFetchRejection;
	      const noDelete = allowStale || options.noDeleteOnFetchRejection;
	      if (this.valList[index] === p) {
	        // if we allow stale on fetch rejections, then we need to ensure that
	        // the stale value is not removed from the cache when the fetch fails.
	        const del = !noDelete || p.__staleWhileFetching === undefined;
	        if (del) {
	          this.delete(k);
	        } else if (!allowStaleAborted) {
	          // still replace the *promise* with the stale value,
	          // since we are done with the promise at this point.
	          // leave it untouched if we're still waiting for an
	          // aborted background fetch that hasn't yet returned.
	          this.valList[index] = p.__staleWhileFetching;
	        }
	      }
	      if (allowStale) {
	        if (options.status && p.__staleWhileFetching !== undefined) {
	          options.status.returnedStale = true;
	        }
	        return p.__staleWhileFetching
	      } else if (p.__returned === p) {
	        throw er
	      }
	    };
	    const pcall = (res, rej) => {
	      this.fetchMethod(k, v, fetchOpts).then(v => res(v), rej);
	      // ignored, we go until we finish, regardless.
	      // defer check until we are actually aborting,
	      // so fetchMethod can override.
	      ac.signal.addEventListener('abort', () => {
	        if (
	          !options.ignoreFetchAbort ||
	          options.allowStaleOnFetchAbort
	        ) {
	          res();
	          // when it eventually resolves, update the cache.
	          if (options.allowStaleOnFetchAbort) {
	            res = v => cb(v, true);
	          }
	        }
	      });
	    };
	    if (options.status) options.status.fetchDispatched = true;
	    const p = new Promise(pcall).then(cb, eb);
	    p.__abortController = ac;
	    p.__staleWhileFetching = v;
	    p.__returned = null;
	    if (index === undefined) {
	      // internal, don't expose status.
	      this.set(k, p, { ...fetchOpts.options, status: undefined });
	      index = this.keyMap.get(k);
	    } else {
	      this.valList[index] = p;
	    }
	    return p
	  }

	  isBackgroundFetch(p) {
	    return (
	      p &&
	      typeof p === 'object' &&
	      typeof p.then === 'function' &&
	      Object.prototype.hasOwnProperty.call(
	        p,
	        '__staleWhileFetching'
	      ) &&
	      Object.prototype.hasOwnProperty.call(p, '__returned') &&
	      (p.__returned === p || p.__returned === null)
	    )
	  }

	  // this takes the union of get() and set() opts, because it does both
	  async fetch(
	    k,
	    {
	      // get options
	      allowStale = this.allowStale,
	      updateAgeOnGet = this.updateAgeOnGet,
	      noDeleteOnStaleGet = this.noDeleteOnStaleGet,
	      // set options
	      ttl = this.ttl,
	      noDisposeOnSet = this.noDisposeOnSet,
	      size = 0,
	      sizeCalculation = this.sizeCalculation,
	      noUpdateTTL = this.noUpdateTTL,
	      // fetch exclusive options
	      noDeleteOnFetchRejection = this.noDeleteOnFetchRejection,
	      allowStaleOnFetchRejection = this.allowStaleOnFetchRejection,
	      ignoreFetchAbort = this.ignoreFetchAbort,
	      allowStaleOnFetchAbort = this.allowStaleOnFetchAbort,
	      fetchContext = this.fetchContext,
	      forceRefresh = false,
	      status,
	      signal,
	    } = {}
	  ) {
	    if (!this.fetchMethod) {
	      if (status) status.fetch = 'get';
	      return this.get(k, {
	        allowStale,
	        updateAgeOnGet,
	        noDeleteOnStaleGet,
	        status,
	      })
	    }

	    const options = {
	      allowStale,
	      updateAgeOnGet,
	      noDeleteOnStaleGet,
	      ttl,
	      noDisposeOnSet,
	      size,
	      sizeCalculation,
	      noUpdateTTL,
	      noDeleteOnFetchRejection,
	      allowStaleOnFetchRejection,
	      allowStaleOnFetchAbort,
	      ignoreFetchAbort,
	      status,
	      signal,
	    };

	    let index = this.keyMap.get(k);
	    if (index === undefined) {
	      if (status) status.fetch = 'miss';
	      const p = this.backgroundFetch(k, index, options, fetchContext);
	      return (p.__returned = p)
	    } else {
	      // in cache, maybe already fetching
	      const v = this.valList[index];
	      if (this.isBackgroundFetch(v)) {
	        const stale =
	          allowStale && v.__staleWhileFetching !== undefined;
	        if (status) {
	          status.fetch = 'inflight';
	          if (stale) status.returnedStale = true;
	        }
	        return stale ? v.__staleWhileFetching : (v.__returned = v)
	      }

	      // if we force a refresh, that means do NOT serve the cached value,
	      // unless we are already in the process of refreshing the cache.
	      const isStale = this.isStale(index);
	      if (!forceRefresh && !isStale) {
	        if (status) status.fetch = 'hit';
	        this.moveToTail(index);
	        if (updateAgeOnGet) {
	          this.updateItemAge(index);
	        }
	        this.statusTTL(status, index);
	        return v
	      }

	      // ok, it is stale or a forced refresh, and not already fetching.
	      // refresh the cache.
	      const p = this.backgroundFetch(k, index, options, fetchContext);
	      const hasStale = p.__staleWhileFetching !== undefined;
	      const staleVal = hasStale && allowStale;
	      if (status) {
	        status.fetch = hasStale && isStale ? 'stale' : 'refresh';
	        if (staleVal && isStale) status.returnedStale = true;
	      }
	      return staleVal ? p.__staleWhileFetching : (p.__returned = p)
	    }
	  }

	  get(
	    k,
	    {
	      allowStale = this.allowStale,
	      updateAgeOnGet = this.updateAgeOnGet,
	      noDeleteOnStaleGet = this.noDeleteOnStaleGet,
	      status,
	    } = {}
	  ) {
	    const index = this.keyMap.get(k);
	    if (index !== undefined) {
	      const value = this.valList[index];
	      const fetching = this.isBackgroundFetch(value);
	      this.statusTTL(status, index);
	      if (this.isStale(index)) {
	        if (status) status.get = 'stale';
	        // delete only if not an in-flight background fetch
	        if (!fetching) {
	          if (!noDeleteOnStaleGet) {
	            this.delete(k);
	          }
	          if (status) status.returnedStale = allowStale;
	          return allowStale ? value : undefined
	        } else {
	          if (status) {
	            status.returnedStale =
	              allowStale && value.__staleWhileFetching !== undefined;
	          }
	          return allowStale ? value.__staleWhileFetching : undefined
	        }
	      } else {
	        if (status) status.get = 'hit';
	        // if we're currently fetching it, we don't actually have it yet
	        // it's not stale, which means this isn't a staleWhileRefetching.
	        // If it's not stale, and fetching, AND has a __staleWhileFetching
	        // value, then that means the user fetched with {forceRefresh:true},
	        // so it's safe to return that value.
	        if (fetching) {
	          return value.__staleWhileFetching
	        }
	        this.moveToTail(index);
	        if (updateAgeOnGet) {
	          this.updateItemAge(index);
	        }
	        return value
	      }
	    } else if (status) {
	      status.get = 'miss';
	    }
	  }

	  connect(p, n) {
	    this.prev[n] = p;
	    this.next[p] = n;
	  }

	  moveToTail(index) {
	    // if tail already, nothing to do
	    // if head, move head to next[index]
	    // else
	    //   move next[prev[index]] to next[index] (head has no prev)
	    //   move prev[next[index]] to prev[index]
	    // prev[index] = tail
	    // next[tail] = index
	    // tail = index
	    if (index !== this.tail) {
	      if (index === this.head) {
	        this.head = this.next[index];
	      } else {
	        this.connect(this.prev[index], this.next[index]);
	      }
	      this.connect(this.tail, index);
	      this.tail = index;
	    }
	  }

	  get del() {
	    deprecatedMethod('del', 'delete');
	    return this.delete
	  }

	  delete(k) {
	    let deleted = false;
	    if (this.size !== 0) {
	      const index = this.keyMap.get(k);
	      if (index !== undefined) {
	        deleted = true;
	        if (this.size === 1) {
	          this.clear();
	        } else {
	          this.removeItemSize(index);
	          const v = this.valList[index];
	          if (this.isBackgroundFetch(v)) {
	            v.__abortController.abort(new Error('deleted'));
	          } else {
	            this.dispose(v, k, 'delete');
	            if (this.disposeAfter) {
	              this.disposed.push([v, k, 'delete']);
	            }
	          }
	          this.keyMap.delete(k);
	          this.keyList[index] = null;
	          this.valList[index] = null;
	          if (index === this.tail) {
	            this.tail = this.prev[index];
	          } else if (index === this.head) {
	            this.head = this.next[index];
	          } else {
	            this.next[this.prev[index]] = this.next[index];
	            this.prev[this.next[index]] = this.prev[index];
	          }
	          this.size--;
	          this.free.push(index);
	        }
	      }
	    }
	    if (this.disposed) {
	      while (this.disposed.length) {
	        this.disposeAfter(...this.disposed.shift());
	      }
	    }
	    return deleted
	  }

	  clear() {
	    for (const index of this.rindexes({ allowStale: true })) {
	      const v = this.valList[index];
	      if (this.isBackgroundFetch(v)) {
	        v.__abortController.abort(new Error('deleted'));
	      } else {
	        const k = this.keyList[index];
	        this.dispose(v, k, 'delete');
	        if (this.disposeAfter) {
	          this.disposed.push([v, k, 'delete']);
	        }
	      }
	    }

	    this.keyMap.clear();
	    this.valList.fill(null);
	    this.keyList.fill(null);
	    if (this.ttls) {
	      this.ttls.fill(0);
	      this.starts.fill(0);
	    }
	    if (this.sizes) {
	      this.sizes.fill(0);
	    }
	    this.head = 0;
	    this.tail = 0;
	    this.initialFill = 1;
	    this.free.length = 0;
	    this.calculatedSize = 0;
	    this.size = 0;
	    if (this.disposed) {
	      while (this.disposed.length) {
	        this.disposeAfter(...this.disposed.shift());
	      }
	    }
	  }

	  get reset() {
	    deprecatedMethod('reset', 'clear');
	    return this.clear
	  }

	  get length() {
	    deprecatedProperty('length', 'size');
	    return this.size
	  }

	  static get AbortController() {
	    return AC
	  }
	  static get AbortSignal() {
	    return AS
	  }
	}

	var lruCache = LRUCache;

	const { LRUCache: LRUCache$1 } = lruCache;
	const { isFunction: isFunction$2, randomInt } = utils_1;

	/**
	 * Import types
	 *
	 * @typedef {import("../service-broker")} ServiceBroker
	 * @typedef {import("../context")} Context
	 * @typedef {import("../registry")} Registry
	 * @typedef {import("../registry/endpoint")} Endpoint
	 * @typedef {import("./shard")} ShardStrategyClass
	 * @typedef {import("./shard").ShardStrategyOptions} ShardStrategyOptions
	 */

	/**
	 * Sharding invocation strategy
	 *
	 * Using consistent-hashing. More info: https://www.toptal.com/big-data/consistent-hashing
	 *
	 * @implements {ShardStrategyClass}
	 */
	class ShardStrategy extends base$2 {
		/**
		 * Creates an instance of CborSerializer.
		 *
		 * @param {Registry} registry
		 * @param {ServiceBroker} broker
		 * @param {ShardStrategyOptions} opts
		 */
		constructor(registry, broker, opts) {
			super(registry, broker, opts);

			/** @type {ShardStrategyOptions} */
			this.opts = ___default.defaultsDeep(opts, {
				shardKey: null,
				vnodes: 10,
				ringSize: null,
				cacheSize: 1000
			});

			/** @type {LRUCache<string>} */
			this.cache = new LRUCache$1({
				max: this.opts.cacheSize
			});

			this.needRebuild = true;
			this.ring = [];

			broker.localBus.on("$node.**", () => (this.needRebuild = true));
		}

		/**
		 * Get key field value from Context.
		 *
		 * @param {Context} ctx
		 * @returns {any}
		 * @memberof ShardStrategy
		 */
		getKeyFromContext(ctx) {
			if (!this.opts.shardKey) return null;

			if (isFunction$2(this.opts.shardKey)) return this.opts.shardKey.call(this, ctx);

			if (this.opts.shardKey.startsWith("#")) return ___default.get(ctx.meta, this.opts.shardKey.slice(1));

			return ___default.get(ctx.params, this.opts.shardKey);
		}

		/**
		 * Select an endpoint by sharding.
		 *
		 * @param {Array<Endpoint>} list
		 * @param {Context} ctx
		 * @returns {Endpoint}
		 * @memberof ShardStrategy
		 */
		select(list, ctx) {
			const key = this.getKeyFromContext(ctx);

			if (key != null) {
				if (this.needRebuild) this.rebuild(list);

				const nodeID = this.getNodeIDByKey(key);
				if (nodeID) return list.find(ep => ep.id == nodeID);
			}

			// Return a random item (no key)
			return list[randomInt(0, list.length - 1)];
		}

		/**
		 * Get nodeID by a hashed numeric key.
		 *
		 * @param {string} key
		 * @returns {String}
		 * @memberof ShardStrategy
		 */
		getNodeIDByKey(key) {
			if (this.cache) {
				const cached = this.cache.get(key);
				if (cached) return cached;
			}

			const hashNum = this.getHash(key.toString());

			let found;
			const ringLen = this.ring.length;
			for (let i = 0; i < ringLen; i++) {
				if (hashNum <= this.ring[i].key) {
					found = this.ring[i];
					break;
				}
			}

			if (found) {
				if (this.cache) this.cache.set(key, found.nodeID);
				return found.nodeID;
			}
			return null;
		}

		/**
		 * Calculate 8 bit integer hash from string key based on MD5 hash.
		 *
		 * @param {String} key
		 * @returns {Number}
		 * @memberof ShardStrategy
		 */
		getHash(key) {
			const hash = crypto__default.createHash("md5").update(key).digest("hex");
			const hashNum = parseInt(hash.substring(0, 8), 16);
			return this.opts.ringSize ? hashNum % this.opts.ringSize : hashNum;
		}

		/**
		 * Rebuild the node hashring.
		 *
		 * @param {Array<Endpoint>} list
		 * @memberof ShardStrategy
		 */
		rebuild(list) {
			this.cache.clear();
			this.ring = [];

			const arr = list.map(ep => ep.id).sort();

			const total = arr.length * this.opts.vnodes;
			const ringSize = this.opts.ringSize ? this.opts.ringSize : Math.pow(2, 32);
			const slice = ringSize / total;

			for (let j = 0; j < this.opts.vnodes; j++) {
				for (let i = 0; i < arr.length; i++) {
					const nodeID = arr[i];
					this.ring.push({
						key: Math.floor(slice * (this.ring.length + 1)),
						nodeID: nodeID
					});
				}
			}

			// Set the latest value to the last slice.
			this.ring[this.ring.length - 1].key = ringSize;

			this.needRebuild = false;
		}
	}

	var shard = ShardStrategy;

	const { isObject: isObject$1, isString: isString$3 } = utils_1;
	const { BrokerOptionsError: BrokerOptionsError$2 } = errors;

	const Strategies = {
		Base: base$2,
		RoundRobin: roundRobin,
		Random: random_1,
		CpuUsage: getCpuUsage,
		Latency: latency,
		Shard: shard
	};

	function getByName$2(name) {
		/* istanbul ignore next */
		if (!name) return null;

		let n = Object.keys(Strategies).find(n => n.toLowerCase() == name.toLowerCase());
		if (n) return Strategies[n];
	}

	/**
	 * Resolve strategy by name
	 *
	 * @param {Record<string, any>|string} opt
	 * @returns {any}
	 */
	function resolve$2(opt) {
		if (Object.prototype.isPrototypeOf.call(Strategies.Base, opt)) {
			return opt;
		} else if (isString$3(opt)) {
			let StrategyClass = getByName$2(opt);
			if (StrategyClass) return StrategyClass;
			else throw new BrokerOptionsError$2(`Invalid strategy type '${opt}'.`, { type: opt });
		} else if (isObject$1(opt)) {
			let StrategyClass = getByName$2(opt.type || "RoundRobin");
			if (StrategyClass) return StrategyClass;
			else
				throw new BrokerOptionsError$2(`Invalid strategy type '${opt.type}'.`, {
					type: opt.type
				});
		}

		return Strategies.RoundRobin;
	}

	function register$2(name, value) {
		Strategies[name] = value;
	}

	var strategies = Object.assign(Strategies, { resolve: resolve$2, register: register$2 });

	/**
	 * Import types
	 *
	 * @typedef {import("./base")} BaseDiscovererClass
	 * @typedef {import("../registry")} ServiceRegistry
	 * @typedef {import("../node")} Node
	 */

	/**
	 * Abstract Discoverer class
	 *
	 * @class BaseDiscoverer
	 * @implements {BaseDiscovererClass}
	 */
	class BaseDiscoverer {
		/**
		 * Creates an instance of Discoverer.
		 *
		 * @memberof BaseDiscoverer
		 */
		constructor(opts) {
			this.Promise = Promise; // while `init` is not called

			this.opts = ___default.defaultsDeep({}, opts, {
				heartbeatInterval: null,
				heartbeatTimeout: null,

				disableHeartbeatChecks: false,
				disableOfflineNodeRemoving: false,
				cleanOfflineNodesTimeout: 10 * 60 // 10 minutes
			});

			// Timer variables
			this.heartbeatTimer = null;
			this.checkNodesTimer = null;
			this.offlineTimer = null;

			// Pointer for the local `Node` instance
			this.localNode = null;
		}

		/**
		 * Initialize Discoverer
		 *
		 * @param {ServiceRegistry} registry
		 */
		init(registry) {
			this.registry = registry;
			this.broker = registry.broker;
			this.Promise = this.broker.Promise;

			if (this.broker) {
				this.logger = this.broker.getLogger("Discovery");
				this.transit = this.broker.transit;

				// Get HB time settings from broker options. Backward compatibility
				if (this.opts.heartbeatInterval == null)
					this.opts.heartbeatInterval = this.broker.options.heartbeatInterval;
				if (this.opts.heartbeatTimeout == null)
					this.opts.heartbeatTimeout = this.broker.options.heartbeatTimeout;
			}

			if (this.transit) {
				this.broker.localBus.on("$transporter.connected", () => this.startHeartbeatTimers());
				this.broker.localBus.on("$transporter.disconnected", () => this.stopHeartbeatTimers());
			}

			this.localNode = this.registry.nodes.localNode;

			this.registerMoleculerMetrics();
		}

		/**
		 * Stop discoverer clients.
		 */
		stop() {
			this.stopHeartbeatTimers();
			return this.Promise.resolve();
		}

		/**
		 * Register Moleculer Transit Core metrics.
		 */
		registerMoleculerMetrics() {
			// Not implemented
		}

		/**
		 * Start heartbeat timers
		 */
		startHeartbeatTimers() {
			this.stopHeartbeatTimers();

			if (this.opts.heartbeatInterval > 0) {
				// HB timer
				const time =
					this.opts.heartbeatInterval * 1000 + (Math.round(Math.random() * 1000) - 500); // random +/- 500ms
				this.heartbeatTimer = timersBrowserify.setInterval(() => this.beat(), time);
				this.heartbeatTimer.unref();

				// Check expired heartbeats of remote nodes timer
				this.checkNodesTimer = timersBrowserify.setInterval(
					() => this.checkRemoteNodes(),
					this.opts.heartbeatTimeout * 1000
				);
				this.checkNodesTimer.unref();

				// Clean offline nodes timer
				this.offlineTimer = timersBrowserify.setInterval(() => this.checkOfflineNodes(), 60 * 1000); // 1 min
				this.offlineTimer.unref();
			}
		}

		/**
		 * Stop heartbeat timers
		 */
		stopHeartbeatTimers() {
			if (this.heartbeatTimer) {
				clearInterval(this.heartbeatTimer);
				this.heartbeatTimer = null;
			}

			if (this.checkNodesTimer) {
				clearInterval(this.checkNodesTimer);
				this.checkNodesTimer = null;
			}

			if (this.offlineTimer) {
				clearInterval(this.offlineTimer);
				this.offlineTimer = null;
			}
		}

		/**
		 * Disable built-in Heartbeat logic. Used by TCP transporter
		 */
		disableHeartbeat() {
			this.opts.heartbeatInterval = 0;
			this.stopHeartbeatTimers();
		}

		/**
		 * Heartbeat method.
		 */
		beat() {
			// Update the local CPU usage before sending heartbeat.
			return this.localNode
				.updateLocalInfo(this.broker.getCpuUsage)
				.then(() => this.sendHeartbeat());
		}

		/**
		 * Check all registered remote nodes are available.
		 */
		checkRemoteNodes() {
			if (this.opts.disableHeartbeatChecks) return;

			const now = Math.round(_process.uptime());
			this.registry.nodes.toArray().forEach(node => {
				if (node.local || !node.available) return;
				if (!node.lastHeartbeatTime) {
					// Not received the first heartbeat yet
					node.lastHeartbeatTime = now;
					return;
				}

				if (now - node.lastHeartbeatTime > this.opts.heartbeatTimeout) {
					this.logger.warn(`Heartbeat is not received from '${node.id}' node.`);
					this.registry.nodes.disconnected(node.id, true);
				}
			});
		}

		/**
		 * Check offline nodes. Remove which is older than 10 minutes.
		 */
		checkOfflineNodes() {
			if (this.opts.disableOfflineNodeRemoving || !this.opts.cleanOfflineNodesTimeout) return;

			const now = Math.round(_process.uptime());
			this.registry.nodes.toArray().forEach(node => {
				if (node.local || node.available) return;
				if (!node.lastHeartbeatTime) {
					// Not received the first
					node.lastHeartbeatTime = now;
					return;
				}

				if (now - node.lastHeartbeatTime > this.opts.cleanOfflineNodesTimeout) {
					this.logger.warn(
						`Removing offline '${node.id}' node from registry because it hasn't submitted heartbeat signal for 10 minutes.`
					);
					this.registry.nodes.delete(node.id);
				}
			});
		}

		/**
		 * Heartbeat received from a remote node.
		 *
		 * @param {String} nodeID
		 * @param {Object} payload
		 */
		heartbeatReceived(nodeID, payload) {
			const node = this.registry.nodes.get(nodeID);
			if (node) {
				if (!node.available) {
					// Reconnected node. Request a fresh INFO
					this.discoverNode(nodeID);
				} else {
					if (payload.seq != null && node.seq !== payload.seq) {
						// Some services changed on the remote node. Request a new INFO
						this.discoverNode(nodeID);
					} else if (
						payload.instanceID != null &&
						!node.instanceID.startsWith(payload.instanceID)
					) {
						// The node has been restarted. Request a new INFO
						this.discoverNode(nodeID);
					} else {
						node.heartbeat(payload);
					}
				}
			} else {
				// Unknow node. Request an INFO
				this.discoverNode(nodeID);
			}
		}

		/**
		 * Received an INFO from a remote node.
		 *
		 * @param {String} nodeID
		 * @param {Object} payload
		 */
		processRemoteNodeInfo(nodeID, payload) {
			return this.broker.registry.processNodeInfo(payload);
		}

		/**
		 * Sending a local heartbeat to remote nodes.
		 */
		sendHeartbeat() {
			if (!this.transit) return this.Promise.resolve();
			return this.transit.sendHeartbeat(this.localNode);
		}

		/**
		 * Discover a new or old node by nodeID
		 *
		 * @param {String} nodeID
		 * @returns {Promise<Node | void>}
		 */
		discoverNode(nodeID) {
			/* istanbul ignore next */
			throw new Error("Not implemented");
		}

		/**
		 * Discover all nodes (after connected)
		 * @returns {Promise<Node[] | void>}
		 */
		discoverAllNodes() {
			/* istanbul ignore next */
			throw new Error("Not implemented");
		}

		/**
		 * Local service registry has been changed. We should notify remote nodes.
		 *
		 * @param {String=} nodeID
		 * @returns {Promise<void>}
		 */
		sendLocalNodeInfo(nodeID) {
			/* istanbul ignore next */
			throw new Error("Not implemented");
		}

		/**
		 * Called when the local node disconnected.
		 * You can clean it from the remote registry.
		 */
		localNodeDisconnected() {
			if (!this.transit) return this.Promise.resolve();
			return this.transit.sendDisconnectPacket();
		}

		/**
		 * Called when a remote node disconnected (received DISCONNECT packet)
		 * You can clean it from local registry.
		 *
		 * @param {String} nodeID
		 * @param {Boolean} isUnexpected
		 */
		remoteNodeDisconnected(nodeID, isUnexpected) {
			return this.registry.nodes.disconnected(nodeID, isUnexpected);
		}
	}

	var base$3 = BaseDiscoverer;

	/**
	 * Import types
	 *
	 * @typedef {import("./local")} LocalDiscovererClass
	 * @typedef {import("./local").LocalDiscovererOptions} LocalDiscovererOptions
	 * @typedef {import("../node")} Node
	 */

	/**
	 * Local (built-in) Discoverer class
	 *
	 * @class Discoverer
	 * @implements {LocalDiscovererClass}
	 */
	class LocalDiscoverer extends base$3 {
		/**
		 * Creates an instance of Discoverer.
		 *
		 * @param {LocalDiscovererOptions?} opts
		 * @memberof LocalDiscoverer
		 */
		constructor(opts) {
			super(opts);
		}

		/**
		 * Initialize Discoverer
		 *
		 * @param {any} registry
		 *
		 * @memberof LocalDiscoverer
		 */
		init(registry) {
			super.init(registry);
		}

		/**
		 * Discover a new or old node.
		 *
		 * @param {String} nodeID
		 * @returns {Promise<Node | void>}
		 */
		discoverNode(nodeID) {
			if (!this.transit) return this.Promise.resolve();
			return this.transit.discoverNode(nodeID);
		}

		/**
		 * Discover all nodes (after connected)
		 * @returns {Promise<Node[] | void>}
		 */
		discoverAllNodes() {
			if (!this.transit) return this.Promise.resolve();
			return this.transit.discoverNodes();
		}

		/**
		 * Local service registry has been changed. We should notify remote nodes.
		 *
		 * @param {String=} nodeID
		 * @returns {Promise<void>}
		 */
		sendLocalNodeInfo(nodeID) {
			if (!this.transit) return this.Promise.resolve();

			const info = this.broker.getLocalNodeInfo();

			const p =
				!nodeID && this.broker.options.disableBalancer
					? this.transit.tx.makeBalancedSubscriptions()
					: this.Promise.resolve();
			return p.then(() => this.transit.sendNodeInfo(info, nodeID));
		}
	}

	var local = LocalDiscoverer;

	const { BrokerOptionsError: BrokerOptionsError$3 } = errors;
	const { isObject: isObject$2, isString: isString$4, isInheritedClass: isInheritedClass$1 } = utils_1;

	const Discoverers = {
		Base: base$3,
		Local: local,
		Etcd3: require$$19,
		Redis: require$$19
	};

	function getByName$3(name) {
		/* istanbul ignore next */
		if (!name) return null;

		let n = Object.keys(Discoverers).find(n => n.toLowerCase() == name.toLowerCase());
		if (n) return Discoverers[n];
	}

	/**
	 * Resolve discoverer by name
	 *
	 * @param {Record<string, any>|string} opt
	 * @returns {any}
	 */
	function resolve$3(opt) {
		if (isObject$2(opt) && isInheritedClass$1(opt, Discoverers.Base)) {
			return opt;
		} else if (isString$4(opt)) {
			let DiscovererClass = getByName$3(opt);
			if (DiscovererClass) return new DiscovererClass();

			if (opt.startsWith("redis://") || opt.startsWith("rediss://"))
				return new Discoverers.Redis(opt);

			if (opt.startsWith("etcd3://")) return new Discoverers.Etcd3(opt);

			throw new BrokerOptionsError$3(`Invalid Discoverer type '${opt}'.`, { type: opt });
		} else if (isObject$2(opt)) {
			let DiscovererClass = getByName$3(opt.type || "Local");
			if (DiscovererClass) return new DiscovererClass(opt.options);
			else
				throw new BrokerOptionsError$3(`Invalid Discoverer type '${opt.type}'.`, {
					type: opt.type
				});
		}

		return new Discoverers.Local();
	}

	function register$3(name, value) {
		Discoverers[name] = value;
	}

	var discoverers = Object.assign(Discoverers, { resolve: resolve$3, register: register$3 });

	/**
	 * Import types
	 *
	 * @typedef {import("./node")} NodeClass
	 * @typedef {import("./registry").NodeRawInfo} NodeRawInfo
	 */

	/**
	 * Node class
	 *
	 * @class Node
	 * @implements {NodeClass}
	 */
	class Node {
		/**
		 * Creates an instance of Node.
		 *
		 * @param {String} id
		 *
		 * @memberof Node
		 */
		constructor(id) {
			this.id = id;
			this.instanceID = null;
			this.available = true;
			this.local = false;
			this.lastHeartbeatTime = Math.round(_process.uptime());
			this.config = {};
			this.client = {};
			this.metadata = null;

			this.ipList = null;
			this.port = null;
			this.hostname = null;
			this.udpAddress = null;

			this.rawInfo = null;
			this.services = [];

			this.cpu = null;
			this.cpuSeq = null;

			this.seq = 0;
			this.offlineSince = null;
		}

		/**
		 * Update properties
		 *
		 * @param {NodeRawInfo} payload
		 * @param {boolean} isReconnected
		 * @memberof Node
		 */
		update(payload, isReconnected) {
			// Update properties
			this.metadata = payload.metadata;
			this.ipList = payload.ipList;
			this.hostname = payload.hostname;
			this.port = payload.port;
			this.client = payload.client || {};
			this.config = payload.config || {};

			this.services = payload.services;
			this.rawInfo = payload;

			const newSeq = payload.seq || 1;
			if (newSeq > this.seq || isReconnected || payload.instanceID !== this.instanceID) {
				this.instanceID = payload.instanceID;
				this.seq = newSeq;
				return true;
			}
		}

		/**
		 * Update local properties.
		 *
		 * @param {Function} cpuUsage
		 * @memberof Node
		 */
		updateLocalInfo(cpuUsage) {
			return cpuUsage()
				.then(res => {
					const newVal = Math.round(res.avg);
					if (this.cpu != newVal) {
						this.cpu = newVal;
						this.cpuSeq++;
					}
				})
				.catch(() => {
					/* silent */
				});
		}

		/**
		 * Update heartbeat properties
		 *
		 * @param {object} payload
		 * @memberof Node
		 */
		heartbeat(payload) {
			if (!this.available) {
				this.available = true;
				this.offlineSince = null;
			}

			if (payload.cpu != null) {
				this.cpu = payload.cpu;
				this.cpuSeq = payload.cpuSeq || 1;
			}

			this.lastHeartbeatTime = Math.round(_process.uptime());
		}

		/**
		 * Node disconnected
		 *
		 * @memberof Node
		 */
		disconnected() {
			if (this.available) {
				this.offlineSince = Math.round(_process.uptime());
				this.seq++;
			}

			this.available = false;
		}
	}

	var node = Node;

	const { getIpList } = utils_1;

	/**
	 * Import types
	 *
	 * @typedef {import("./registry")} Registry
	 * @typedef {import("../service-broker")} ServiceBroker
	 * @typedef {import("./node-catalog")} NodeCatalogClass
	 * @typedef {import("./node-catalog").NodeCatalogListOptions} NodeCatalogListOptions
	 * @typedef {import("./node-catalog").NodeCatalogListResult} NodeCatalogListResult
	 */

	/**
	 * Catalog for nodes
	 *
	 * @class NodeCatalog
	 * @implements {NodeCatalogClass}
	 */
	class NodeCatalog {
		/**
		 * Creates an instance of NodeCatalog.
		 *
		 * @param {Registry} registry
		 * @param {ServiceBroker} broker
		 *
		 * @memberof NodeCatalog
		 */
		constructor(registry, broker) {
			this.registry = registry;
			this.broker = broker;
			this.logger = registry.logger;

			this.localNode = null;
			this.nodes = new Map();

			this.createLocalNode();
		}

		/**
		 * Create local node with local information
		 *
		 * @returns
		 * @memberof NodeCatalog
		 */
		createLocalNode() {
			const node$1 = new node(this.broker.nodeID);
			node$1.local = true;
			node$1.ipList = getIpList();
			node$1.instanceID = this.broker.instanceID;
			node$1.hostname = os__default.hostname();
			node$1.client = {
				type: "browser",
				version: this.broker.MOLECULER_VERSION,
				langVersion: _process.version
			};
			node$1.metadata = this.broker.metadata;
			node$1.seq = 1;

			this.add(node$1.id, node$1);

			this.localNode = node$1;
			return node$1;
		}

		/**
		 * Add a new node
		 *
		 * @param {String} id
		 * @param {Node} node
		 * @memberof NodeCatalog
		 */
		add(id, node) {
			this.nodes.set(id, node);
		}

		/**
		 * Check a node exist by nodeID
		 *
		 * @param {String} id
		 * @returns
		 * @memberof NodeCatalog
		 */
		has(id) {
			return this.nodes.has(id);
		}

		/**
		 * Get a node by nodeID
		 *
		 * @param {String} id
		 * @returns {Node}
		 * @memberof NodeCatalog
		 */
		get(id) {
			return this.nodes.get(id);
		}

		/**
		 * Delete a node by nodeID
		 *
		 * @param {String} id
		 * @returns
		 * @memberof NodeCatalog
		 */
		delete(id) {
			return this.nodes.delete(id);
		}

		/**
		 * Get count of all registered nodes
		 */
		count() {
			return this.nodes.size;
		}

		/**
		 * Get count of online nodes
		 */
		onlineCount() {
			let count = 0;
			this.nodes.forEach(node => {
				if (node.available) count++;
			});

			return count;
		}

		/**
		 * Process incoming INFO packet payload
		 *
		 * @param {any} payload
		 * @returns {Node}
		 * @memberof NodeCatalog
		 */
		processNodeInfo(payload) {
			const nodeID = payload.sender;
			//let oldNode;
			let node$1 = this.get(nodeID);
			let isNew = false;
			let isReconnected = false;

			if (!node$1) {
				isNew = true;
				node$1 = new node(nodeID);

				this.add(nodeID, node$1);
			} else if (!node$1.available) {
				isReconnected = true;
				node$1.lastHeartbeatTime = Math.round(_process.uptime());
				node$1.available = true;
				node$1.offlineSince = null;
			}

			// Update instance
			const needRegister = node$1.update(payload, isReconnected);

			// Refresh services if 'seq' is greater or it is a reconnected node
			if (needRegister && node$1.services) {
				this.registry.registerServices(node$1, node$1.services);
			}

			// Local notifications
			if (isNew) {
				this.broker.broadcastLocal("$node.connected", { node: node$1, reconnected: false });
				this.logger.info(`Node '${nodeID}' connected.`);
				this.registry.updateMetrics();
			} else if (isReconnected) {
				this.broker.broadcastLocal("$node.connected", { node: node$1, reconnected: true });
				this.logger.info(`Node '${nodeID}' reconnected.`);
				this.registry.updateMetrics();
			} else {
				this.broker.broadcastLocal("$node.updated", { node: node$1 });
				this.logger.debug(`Node '${nodeID}' updated.`);
			}

			return node$1;
		}

		/**
		 * Disconnected a node
		 *
		 * @param {String} nodeID
		 * @param {Boolean} isUnexpected
		 * @memberof NodeCatalog
		 */
		disconnected(nodeID, isUnexpected) {
			let node = this.get(nodeID);
			if (node && node.available) {
				node.disconnected(isUnexpected);

				this.registry.unregisterServicesByNode(node.id);

				this.broker.broadcastLocal("$node.disconnected", { node, unexpected: !!isUnexpected });

				this.registry.updateMetrics();

				if (isUnexpected) this.logger.warn(`Node '${node.id}' disconnected unexpectedly.`);
				else this.logger.info(`Node '${node.id}' disconnected.`);

				if (this.broker.transit) this.broker.transit.removePendingRequestByNodeID(nodeID);
			}
		}

		/**
		 * Get a node list
		 *
		 * @param {NodeCatalogListOptions} opts
		 * @returns {NodeCatalogListResult[]}
		 * @memberof NodeCatalog
		 */
		list({ onlyAvailable = false, withServices = false } = {}) {
			let res = [];
			this.nodes.forEach(node => {
				if (onlyAvailable && !node.available) return;

				if (withServices) res.push(___default.omit(node, ["rawInfo"]));
				else res.push(___default.omit(node, ["services", "rawInfo"]));
			});

			return res;
		}

		/**
		 * Get a copy from node list.
		 */
		toArray() {
			return Array.from(this.nodes.values());
		}
	}

	var nodeCatalog = NodeCatalog;

	/*
	 * moleculer
	 * Copyright (c) 2023 MoleculerJS (https://github.com/moleculerjs/moleculer)
	 * MIT Licensed
	 */

	/**
	 * Import types
	 *
	 * @typedef {import("./service-item")} ServiceItemClass
	 * @typedef {import("./node")} Node
	 * @typedef {import("../service").ActionSchema} ActionSchema
	 * @typedef {import("../service").EventSchema} EventSchema
	 */

	/**
	 * Service class
	 *
	 * @class ServiceItem
	 * @implements {ServiceItemClass}
	 */
	class ServiceItem {
		/**
		 * Creates an instance of ServiceItem.
		 *
		 * @param {Node} node
		 * @param {object} service
		 * @param {Boolean} local
		 * @memberof ServiceItem
		 */
		constructor(node, service, local) {
			this.node = node;
			this.name = service.name;
			this.fullName = service.fullName;
			this.version = service.version;
			this.settings = service.settings;
			this.metadata = service.metadata || {};

			this.local = !!local;

			this.actions = {};
			this.events = {};
		}

		/**
		 * Check the service equals params
		 *
		 * @param {String} fullName
		 * @param {String=} nodeID
		 * @returns
		 * @memberof ServiceItem
		 */
		equals(fullName, nodeID) {
			return this.fullName == fullName && (nodeID == null || this.node.id == nodeID);
		}

		/**
		 * Update service properties
		 *
		 * @param {object} svc
		 * @memberof ServiceItem
		 */
		update(svc) {
			this.fullName = svc.fullName;
			this.version = svc.version;
			this.settings = svc.settings;
			this.metadata = svc.metadata || {};
		}

		/**
		 * Add action to service
		 *
		 * @param {ActionSchema} action
		 * @memberof ServiceItem
		 */
		addAction(action) {
			this.actions[action.name] = action;
		}

		/**
		 * Add event to service
		 *
		 * @param {EventSchema} event
		 * @memberof ServiceItem
		 */
		addEvent(event) {
			this.events[event.name] = event;
		}
	}

	var serviceItem = ServiceItem;

	const { removeFromArray } = utils_1;

	/**
	 * Import types
	 *
	 * @typedef {import("./service-catalog")} ServiceCatalogClass
	 * @typedef {import("./service-catalog").ServiceCatalogListOptions} ServiceCatalogListOptions
	 * @typedef {import("./service-catalog").ServiceCatalogListResult} ServiceCatalogListResult
	 * @typedef {import("./service-catalog").ServiceCatalogLocalNodeServicesResult} ServiceCatalogLocalNodeServicesResult
	 * @typedef {import("./registry")} Registry
	 * @typedef {import("./node")} Node
	 * @typedef {import("../service-broker")} ServiceBroker
	 */

	/**
	 * Catalog for services
	 *
	 * @class ServiceCatalog
	 * @implements {ServiceCatalogClass}
	 */
	class ServiceCatalog {
		/**
		 * Creates an instance of ServiceCatalog.
		 *
		 * @param {Registry} registry
		 * @param {ServiceBroker} broker
		 * @memberof ServiceCatalog
		 */
		constructor(registry, broker) {
			this.registry = registry;
			this.broker = broker;
			this.logger = registry.logger;

			this.services = [];
		}

		/**
		 * Add a new service
		 *
		 * @param {Node} node
		 * @param {Object} service
		 * @param {Boolean} local
		 *
		 * @returns {ServiceItem}
		 *
		 * @memberof ServiceCatalog
		 */
		add(node, service, local) {
			const item = new serviceItem(node, service, local);
			this.services.push(item);
			return item;
		}

		/**
		 * Check the service is exist
		 *
		 * @param {String} fullName
		 * @param {String} nodeID
		 * @returns {Boolean}
		 * @memberof ServiceCatalog
		 */
		has(fullName, nodeID) {
			return this.services.find(svc => svc.equals(fullName, nodeID)) != null;
		}

		/**
		 * Get a service by fullName & nodeID
		 *
		 * @param {String} fullName
		 * @param {String} nodeID
		 * @returns {ServiceItem}
		 * @memberof ServiceCatalog
		 */
		get(fullName, nodeID) {
			return this.services.find(svc => svc.equals(fullName, nodeID));
		}

		/**
		 * Get a filtered list of services with actions
		 *
		 * @param {ServiceCatalogListOptions} opts
		 * @returns {ServiceCatalogListResult[]}
		 *
		 * @memberof Registry
		 */
		list({
			onlyLocal = false,
			onlyAvailable = false,
			skipInternal = false,
			withActions = false,
			withEvents = false,
			grouping = false
		} = {}) {
			let res = [];
			this.services.forEach(service => {
				if (skipInternal && /^\$/.test(service.name)) return;

				if (onlyLocal && !service.local) return;

				if (onlyAvailable && !service.node.available) return;

				let item;
				if (grouping) item = res.find(svc => svc.fullName == service.fullName);

				if (!item) {
					let item = {
						name: service.name,
						version: service.version,
						fullName: service.fullName,
						settings: service.settings,
						metadata: service.metadata,

						local: service.local,
						available: service.node.available
					};

					if (grouping) item.nodes = [service.node.id];
					else item.nodeID = service.node.id;

					if (withActions) {
						item.actions = {};

						___default.forIn(service.actions, action => {
							if (action.protected) return;

							item.actions[action.name] = ___default.omit(action, [
								"handler",
								"remoteHandler",
								"service"
							]);
						});
					}

					if (withEvents) {
						item.events = {};

						___default.forIn(service.events, event => {
							// Skip internal event handlers
							if (/^\$/.test(event.name)) return;

							item.events[event.name] = ___default.omit(event, [
								"handler",
								"remoteHandler",
								"service"
							]);
						});
					}

					res.push(item);
				} else {
					if (item.nodes.indexOf(service.node.id) === -1) item.nodes.push(service.node.id);
				}
			});

			return res;
		}

		/**
		 * Get local service list for INFO packet
		 *
		 * @returns {ServiceCatalogLocalNodeServicesResult[]}
		 * @memberof ServiceCatalog
		 */
		getLocalNodeServices() {
			let res = [];
			this.services.forEach(service => {
				if (!service.local) return;

				let item = {
					name: service.name,
					version: service.version,
					fullName: service.fullName,
					settings: service.settings,
					metadata: service.metadata,
					dependencies: service.dependencies
				};

				item.actions = {};

				___default.forIn(service.actions, action => {
					if (action.protected) return;

					item.actions[action.name] = ___default.omit(action, ["handler", "remoteHandler", "service"]);
				});

				item.events = {};

				___default.forIn(service.events, event => {
					// Leave internal event handlers, because it can be used for internal events.
					//if (/^\$/.test(event.name)) return;

					item.events[event.name] = ___default.omit(event, ["handler", "remoteHandler", "service"]);
				});

				res.push(item);
			});

			return res;
		}

		/**
		 * Remove all endpoints by nodeID
		 *
		 * @param {String} nodeID
		 * @memberof ServiceCatalog
		 */
		removeAllByNodeID(nodeID) {
			___default.remove(this.services, service => {
				if (service.node.id == nodeID) {
					this.registry.actions.removeByService(service);
					this.registry.events.removeByService(service);
					return true;
				}
			});
		}

		/**
		 * Remove endpoint by fullName & nodeID
		 *
		 * @param {String} fullName
		 * @param {String} nodeID
		 * @memberof ServiceCatalog
		 */
		remove(fullName, nodeID) {
			let service = this.get(fullName, nodeID);
			if (service) {
				this.registry.actions.removeByService(service);
				this.registry.events.removeByService(service);

				removeFromArray(this.services, service);
			}
		}
	}

	var serviceCatalog = ServiceCatalog;

	const { MoleculerServerError } = errors;

	/**
	 * Import types
	 *
	 * @typedef {import("./registry")} Registry
	 * @typedef {import("../strategies/base")} Strategy
	 * @typedef {import("../service-broker")} ServiceBroker
	 * @typedef {import("./endpoint-list")} EndpointListClass
	 * @typedef {import("../context")} Context
	 * @typedef {import("./node")} Node
	 * @typedef {import("./endpoint")} Endpoint
	 * @typedef {import("./service-item")} ServiceItem
	 */

	/**
	 * Endpoint list class
	 *
	 * @template TEndpoint
	 * @class EndpointList
	 * @implements {EndpointListClass}
	 */
	class EndpointList {
		/**
		 * Creates an instance of EndpointList.
		 * @param {Registry} registry
		 * @param {ServiceBroker} broker
		 * @param {String} name
		 * @param {String} group
		 * @param {typeof import("./endpoint")} EndPointFactory
		 * @param {typeof import("../strategies/base")} StrategyFactory
		 * @param {Object?} strategyOptions
		 * @memberof EndpointList
		 */
		constructor(registry, broker, name, group, EndPointFactory, StrategyFactory, strategyOptions) {
			this.registry = registry;
			this.broker = broker;
			this.logger = registry.logger;
			// @ts-ignore
			this.strategy = new StrategyFactory(registry, broker, strategyOptions);
			this.name = name;
			this.group = group;
			this.internal = name.startsWith("$");

			this.EndPointFactory = EndPointFactory;

			this.endpoints = [];

			this.localEndpoints = [];
		}

		/**
		 * Add a new endpoint
		 *
		 * @param {Node} node
		 * @param {ServiceItem} service
		 * @param {any} data
		 * @returns {Endpoint}
		 * @memberof EndpointList
		 */
		add(node, service, data) {
			const found = this.endpoints.find(ep => ep.node == node && ep.service.name == service.name);
			if (found) {
				found.update(data);
				return found;
			}

			// @ts-ignore
			const ep = new this.EndPointFactory(this.registry, this.broker, node, service, data);
			this.endpoints.push(ep);

			this.setLocalEndpoints();

			return ep;
		}

		/**
		 * Get first endpoint
		 *
		 * @returns {Endpoint | null}
		 * @memberof EndpointList
		 */
		getFirst() {
			if (this.endpoints.length > 0) return this.endpoints[0];

			return null;
		}

		/**
		 * Select next endpoint with balancer strategy
		 *
		 * @param {Array<Endpoint>} list
		 * @param {Context} ctx
		 * @returns {Endpoint}
		 * @memberof EndpointList
		 */
		select(list, ctx) {
			const ret = this.strategy.select(list, ctx);
			if (!ret) {
				/* istanbul ignore next */
				throw new MoleculerServerError(
					"Strategy returned an invalid endpoint.",
					500,
					"INVALID_ENDPOINT",
					{ strategy: typeof this.strategy }
				);
			}
			return ret;
		}

		/**
		 * Get next endpoint
		 *
		 * @param {Context} ctx
		 * @returns {Endpoint | null}
		 * @memberof EndpointList
		 */
		next(ctx) {
			// No items
			if (this.endpoints.length === 0) {
				return null;
			}

			// If internal (service), return the local always
			if (this.internal && this.hasLocal()) {
				return this.nextLocal(ctx);
			}

			// Only 1 item
			if (this.endpoints.length === 1) {
				// No need to select a node, return the only one
				const item = this.endpoints[0];
				if (item.isAvailable) return item;

				return null;
			}

			// Search local item
			if (this.registry.opts.preferLocal === true && this.hasLocal()) {
				const ep = this.nextLocal(ctx);
				if (ep && ep.isAvailable) return ep;
			}

			const epList = this.endpoints.filter(ep => ep.isAvailable);
			if (epList.length === 0) return null;

			return this.select(epList, ctx);
		}

		/**
		 * Get next local endpoint
		 *
		 * @param {Context} ctx
		 * @returns
		 * @memberof EndpointList
		 */
		nextLocal(ctx) {
			// No items
			if (this.localEndpoints.length === 0) {
				return null;
			}

			// Only 1 item
			if (this.localEndpoints.length === 1) {
				// No need to select a node, return the only one
				const item = this.localEndpoints[0];
				if (item.isAvailable) return item;

				return null;
			}

			const epList = this.localEndpoints.filter(ep => ep.isAvailable);
			if (epList.length === 0) return null;

			return this.select(epList, ctx);
		}

		/**
		 * Check there is available endpoint
		 *
		 * @returns {boolean}
		 * @memberof EndpointList
		 */
		hasAvailable() {
			return this.endpoints.find(ep => ep.isAvailable) != null;
		}

		/**
		 * Check there is local endpoint
		 *
		 * @returns {boolean}
		 * @memberof EndpointList
		 */
		hasLocal() {
			return this.localEndpoints.length > 0;
		}

		/**
		 * Set local endpoint
		 *
		 * @memberof EndpointList
		 */
		setLocalEndpoints() {
			this.localEndpoints = this.endpoints.filter(ep => ep.local);
		}

		/**
		 * Get count of endpoints
		 *
		 * @returns {Number}
		 * @memberof EndpointList
		 */
		count() {
			return this.endpoints.length;
		}

		/**
		 * Get endpoint on a specified node
		 *
		 * @param {String} nodeID
		 * @returns {Endpoint | null}
		 * @memberof EndpointList
		 */
		getEndpointByNodeID(nodeID) {
			const ep = this.endpoints.find(ep => ep.id == nodeID);
			if (ep && ep.isAvailable) return ep;

			return null;
		}

		/**
		 * Check nodeID in the endpoint list
		 *
		 * @param {String} nodeID
		 * @returns {boolean}
		 * @memberof EndpointList
		 */
		hasNodeID(nodeID) {
			return this.endpoints.find(ep => ep.id == nodeID) != null;
		}

		/**
		 * Remove all endpoints by service
		 *
		 * @param {ServiceItem} service
		 * @memberof EndpointList
		 */
		removeByService(service) {
			___default.remove(this.endpoints, ep => {
				if (ep.service == service) {
					ep.destroy();
					return true;
				}
			});

			this.setLocalEndpoints();
		}

		/**
		 * Remove endpoints by node ID
		 *
		 * @param {String} nodeID
		 * @memberof EndpointList
		 */
		removeByNodeID(nodeID) {
			___default.remove(this.endpoints, ep => {
				if (ep.id == nodeID) {
					ep.destroy();
					return true;
				}
			});

			this.setLocalEndpoints();
		}
	}

	var endpointList = EndpointList;

	/*
	 * moleculer
	 * Copyright (c) 2023 MoleculerJS (https://github.com/moleculerjs/moleculer)
	 * MIT Licensed
	 */

	/**
	 * Import types
	 *
	 * @typedef {import("./registry")} Registry
	 * @typedef {import("../service-broker")} ServiceBroker
	 * @typedef {import("./endpoint")} EndpointClass
	 * @typedef {import("./node")} Node
	 */

	/**
	 * Endpoint class
	 *
	 * @class Endpoint
	 * @implements {EndpointClass}
	 */
	class Endpoint {
		/**
		 * Creates an instance of Endpoint.
		 * @param {Registry} registry
		 * @param {ServiceBroker} broker
		 * @param {Node} node
		 * @memberof Endpoint
		 */
		constructor(registry, broker, node) {
			this.registry = registry;
			this.broker = broker;

			this.id = node.id;
			this.node = node;

			this.local = node.id === broker.nodeID;
			this.state = true;
		}

		destroy() {}

		/**
		 * Get availability
		 *
		 * @readonly
		 * @memberof Endpoint
		 */
		get isAvailable() {
			return this.state;
		}

		update() {}
	}

	var endpoint = Endpoint;

	/**
	 * Import types
	 *
	 * @typedef {import("./registry")} Registry
	 * @typedef {import("../service-broker")} ServiceBroker
	 * @typedef {import("./endpoint-event")} EventEndpointClass
	 * @typedef {import("./node")} Node
	 * @typedef {import("../service")} Service
	 * @typedef {import("../service").EventSchema} EventSchema
	 */

	/**
	 * Endpoint class for events
	 *
	 * @class EventEndpoint
	 * @extends {Endpoint}
	 * @implements {EventEndpointClass}
	 */
	class EventEndpoint extends endpoint {
		/**
		 * Creates an instance of EventEndpoint.
		 * @param {Registry} registry
		 * @param {ServiceBroker} broker
		 * @param {Node} node
		 * @param {Service} service
		 * @param {EventSchema} event
		 * @memberof EventEndpoint
		 */
		constructor(registry, broker, node, service, event) {
			super(registry, broker, node);

			this.service = service;
			this.event = event;
		}

		/**
		 * Update properties
		 *
		 * @param {EventSchema} event
		 * @memberof EventEndpoint
		 */
		update(event) {
			this.event = event;
		}
	}

	var endpointEvent = EventEndpoint;

	/**
	 * Import types
	 *
	 * @typedef {import("./event-catalog")} EventCatalogClass
	 * @typedef {import("./event-catalog").EventCatalogListOptions} EventCatalogListOptions
	 * @typedef {import("./event-catalog").EventCatalogListResult} EventCatalogListResult
	 * @typedef {import("./registry")} Registry
	 * @typedef {import("./service-item")} ServiceItem
	 * @typedef {import("../service-broker")} ServiceBroker
	 * @typedef {import("../context")} Context
	 * @typedef {import("./node")} Node
	 * @typedef {import("../strategies/base")} BaseStrategy
	 * @typedef {import("../service").EventSchema} EventSchema
	 */

	/**
	 * Catalog for events
	 *
	 * @class EventCatalog
	 * @implements {EventCatalogClass}
	 */
	class EventCatalog {
		/**
		 * Creates an instance of EventCatalog.
		 *
		 * @param {Registry} registry
		 * @param {ServiceBroker} broker
		 * @param {typeof import("../strategies/base")} StrategyFactory
		 * @memberof EventCatalog
		 */
		constructor(registry, broker, StrategyFactory) {
			this.registry = registry;
			this.broker = broker;
			this.logger = registry.logger;
			this.StrategyFactory = StrategyFactory;

			/** @type EndpointList<EventEndpoint>[] */
			this.events = [];

			this.EndpointFactory = endpointEvent;
		}

		/**
		 * Add a new event
		 *
		 * @param {Node} node
		 * @param {ServiceItem} service
		 * @param {EventSchema} event
		 * @returns {EndpointList<EventEndpoint>}
		 * @memberof EventCatalog
		 */
		add(node, service, event) {
			const eventName = event.name;
			const groupName = event.group || service.name;
			let list = this.get(eventName, groupName);
			if (!list) {
				const strategyFactory = event.strategy
					? strategies.resolve(event.strategy) || this.StrategyFactory
					: this.StrategyFactory;
				const strategyOptions = event.strategyOptions
					? event.strategyOptions
					: this.registry.opts.strategyOptions;
				// Create a new EndpointList
				list = new endpointList(
					this.registry,
					this.broker,
					eventName,
					groupName,
					this.EndpointFactory,
					strategyFactory,
					strategyOptions
				);

				this.events.push(list);
			}

			list.add(node, service, event);

			return list;
		}

		/**
		 * Get an event by name (and group name)
		 *
		 * @param {String} eventName
		 * @param {String} groupName
		 * @returns {EndpointList<EventEndpoint>}
		 * @memberof EventCatalog
		 */
		get(eventName, groupName) {
			return this.events.find(list => list.name === eventName && list.group === groupName);
		}

		/**
		 * Get balanced endpoint for event
		 *
		 * @param {String} eventName
		 * @param {String|Array?} groups
		 * @param {Context} ctx
		 * @returns {[EventEndpoint, string][]}
		 * @memberof EventCatalog
		 */
		getBalancedEndpoints(eventName, groups, ctx) {
			const res = [];

			this.events.forEach(list => {
				if (!utils_1.match(eventName, list.name)) return;
				if (groups == null || groups.length === 0 || groups.indexOf(list.group) !== -1) {
					// Use built-in balancer, get the next endpoint
					const ep = list.next(ctx);
					if (ep && ep.isAvailable) res.push([ep, list.group]);
				}
			});

			return res;
		}

		/**
		 * Get all groups for event
		 *
		 * @param {string} eventName
		 * @returns {string[]}
		 * @memberof EventCatalog
		 */
		getGroups(eventName) {
			return utils_1.uniq(
				this.events.filter(list => utils_1.match(eventName, list.name)).map(item => item.group)
			);
		}

		/**
		 * Get all endpoints for event
		 *
		 * @param {String} eventName
		 * @param {Array<String>?} groupNames
		 * @returns {EventEndpoint[]}
		 * @memberof EventCatalog
		 */
		getAllEndpoints(eventName, groupNames) {
			const res = [];
			this.events.forEach(list => {
				if (!utils_1.match(eventName, list.name)) return;
				if (
					groupNames == null ||
					groupNames.length === 0 ||
					groupNames.indexOf(list.group) !== -1
				) {
					list.endpoints.forEach(ep => {
						if (ep.isAvailable) res.push(ep);
					});
				}
			});

			return ___default.uniqBy(res, "id");
		}

		/**
		 * Call local service handlers
		 *
		 * @param {Context} ctx
		 * @returns {Promise<any>}
		 *
		 * @memberof EventCatalog
		 */
		emitLocalServices(ctx) {
			const isBroadcast = ["broadcast", "broadcastLocal"].indexOf(ctx.eventType) !== -1;
			const sender = ctx.nodeID;

			const promises = [];

			this.events.forEach(list => {
				if (!utils_1.match(ctx.eventName, list.name)) return;
				if (
					ctx.eventGroups == null ||
					ctx.eventGroups.length === 0 ||
					ctx.eventGroups.indexOf(list.group) !== -1
				) {
					if (isBroadcast) {
						list.endpoints.forEach(ep => {
							if (ep.local && ep.event.handler) {
								const newCtx = ctx.copy(ep);
								newCtx.nodeID = sender;
								promises.push(this.callEventHandler(newCtx));
							}
						});
					} else {
						const ep = list.nextLocal();
						if (ep && ep.event.handler) {
							const newCtx = ctx.copy(ep);
							newCtx.nodeID = sender;
							promises.push(this.callEventHandler(newCtx));
						}
					}
				}
			});

			return this.broker.Promise.allSettled(promises).then(results => {
				const err = results.find(r => r.status == "rejected");
				// @ts-ignore
				if (err) return this.broker.Promise.reject(err.reason);
				return true;
			});
		}

		/**
		 * Call local event handler and handles unhandled promise rejections.
		 *
		 * @param {Context} ctx
		 *
		 * @memberof EventCatalog
		 */
		callEventHandler(ctx) {
			// @ts-ignore
			return ctx.endpoint.event.handler(ctx);
		}

		/**
		 * Remove endpoints by service
		 *
		 * @param {ServiceItem} service
		 * @memberof EventCatalog
		 */
		removeByService(service) {
			this.events.forEach(list => {
				list.removeByService(service);
			});
		}

		/**
		 * Remove endpoint by name & nodeId
		 *
		 * @param {String} eventName
		 * @param {String} nodeID
		 * @memberof EventCatalog
		 */
		remove(eventName, nodeID) {
			this.events.forEach(list => {
				if (list.name == eventName) list.removeByNodeID(nodeID);
			});
		}

		/**
		 * Get a filtered list of events
		 *
		 * @param {EventCatalogListOptions} opts
		 * @returns {EventCatalogListResult[]}
		 *
		 * @memberof EventCatalog
		 */
		list({
			onlyLocal = false,
			onlyAvailable = false,
			skipInternal = false,
			withEndpoints = false
		} = {}) {
			let res = [];

			this.events.forEach(list => {
				/* istanbul ignore next */
				if (skipInternal && /^\$/.test(list.name)) return;

				if (onlyLocal && !list.hasLocal()) return;

				if (onlyAvailable && !list.hasAvailable()) return;

				let item = {
					name: list.name,
					group: list.group,
					count: list.count(),
					//service: list.service,
					hasLocal: list.hasLocal(),
					available: list.hasAvailable()
				};

				if (item.count > 0) {
					const ep = /** @type {EventEndpoint} */ (list.endpoints[0]);
					if (ep) item.event = ___default.omit(ep.event, ["handler", "remoteHandler", "service"]);
				}

				if (withEndpoints) {
					if (item.count > 0) {
						item.endpoints = list.endpoints.map(ep => {
							return {
								nodeID: ep.node.id,
								state: ep.state,
								available: ep.node.available
							};
						});
					}
				}

				res.push(item);
			});

			return res;
		}
	}

	var eventCatalog = EventCatalog;

	/**
	 * Import types
	 *
	 * @typedef {import("./registry")} Registry
	 * @typedef {import("../service-broker")} ServiceBroker
	 * @typedef {import("./endpoint-action")} ActionEndpointClass
	 * @typedef {import("./node")} Node
	 * @typedef {import("../service")} Service
	 * @typedef {import("../service").ActionSchema} ActionSchema
	 */

	/**
	 * Endpoint class for actions
	 *
	 * @class ActionEndpoint
	 * @extends {Endpoint}
	 * @implements {ActionEndpointClass}
	 */
	class ActionEndpoint extends endpoint {
		/**
		 * Creates an instance of ActionEndpoint.
		 * @param {Registry} registry
		 * @param {ServiceBroker} broker
		 * @param {Node} node
		 * @param {Service} service
		 * @param {ActionSchema} action
		 * @memberof ActionEndpoint
		 */
		constructor(registry, broker, node, service, action) {
			super(registry, broker, node);

			this.service = service;
			this.action = action;

			this.name = `${this.id}:${this.action.name}`;
		}

		/**
		 * Update properties
		 *
		 * @param {ActionSchema} action
		 * @memberof ActionEndpoint
		 */
		update(action) {
			this.action = action;
		}
	}

	var endpointAction = ActionEndpoint;

	/**
	 * Import types
	 *
	 * @typedef {import("./action-catalog")} ActionCatalogClass
	 * @typedef {import("./action-catalog").ActionCatalogListOptions} ActionCatalogListOptions
	 * @typedef {import("./action-catalog").ActionCatalogListResult} ActionCatalogListResult
	 * @typedef {import("./registry")} Registry
	 * @typedef {import("./node")} Node
	 * @typedef {import("./service-item")} ServiceItem
	 * @typedef {import("../service").ActionSchema} ActionSchema
	 * @typedef {import("../service-broker")} ServiceBroker
	 * @typedef {import("../strategies/base")} BaseStrategy
	 */
	/**
	 * Catalog class to store service actions
	 *
	 * @class ActionCatalog
	 * @implements {ActionCatalogClass}
	 */
	class ActionCatalog {
		/**
		 * Creates an instance of ActionCatalog.
		 *
		 * @param {Registry} registry
		 * @param {ServiceBroker} broker
		 * @param {typeof Strategies.Base} StrategyFactory
		 * @memberof ActionCatalog
		 */
		constructor(registry, broker, StrategyFactory) {
			this.registry = registry;
			this.broker = broker;
			this.logger = registry.logger;
			this.StrategyFactory = StrategyFactory;

			this.actions = new Map();

			this.EndpointFactory = endpointAction;
		}

		/**
		 * Add an action
		 *
		 * @param {Node} node
		 * @param {ServiceItem} service
		 * @param {ActionSchema} action
		 * @returns {EndpointList}
		 * @memberof ActionCatalog
		 */
		add(node, service, action) {
			let list = this.actions.get(action.name);
			if (!list) {
				const strategyFactory = action.strategy
					? strategies.resolve(action.strategy) || this.StrategyFactory
					: this.StrategyFactory;
				const strategyOptions = action.strategyOptions
					? action.strategyOptions
					: this.registry.opts.strategyOptions;
				// Create a new EndpointList
				list = new endpointList(
					this.registry,
					this.broker,
					action.name,
					null,
					this.EndpointFactory,
					strategyFactory,
					strategyOptions
				);
				this.actions.set(action.name, list);
			}

			list.add(node, service, action);

			return list;
		}

		/**
		 * Get action by name
		 *
		 * @param {string} actionName
		 * @returns
		 * @memberof ActionCatalog
		 */
		get(actionName) {
			return this.actions.get(actionName);
		}

		/**
		 * Check the action is available (there is live endpoint)
		 *
		 * @param {string} actionName
		 * @returns {boolean}
		 * @memberof ActionCatalog
		 */
		isAvailable(actionName) {
			const list = this.actions.get(actionName);
			if (list) return list.hasAvailable();

			return false;
		}

		/**
		 * Remove all actions by service
		 *
		 * @param {ServiceItem} service
		 * @memberof ActionCatalog
		 */
		removeByService(service) {
			this.actions.forEach(list => {
				list.removeByService(service);
			});
		}

		/**
		 * Remove action by name & nodeID
		 *
		 * @param {string} actionName
		 * @param {string} nodeID
		 * @memberof ActionCatalog
		 */
		remove(actionName, nodeID) {
			const list = this.actions.get(actionName);
			if (list) list.removeByNodeID(nodeID);
		}

		/**
		 * Get a filtered list of actions
		 *
		 * @param {ActionCatalogListOptions} opts
		 * @returns {Array<ActionCatalogListResult>}
		 *
		 * @memberof ActionCatalog
		 */
		list({
			onlyLocal = false,
			onlyAvailable = false,
			skipInternal = false,
			withEndpoints = false
		} = {}) {
			let res = [];

			this.actions.forEach((list, key) => {
				if (skipInternal && /^\$/.test(key)) return;

				if (onlyLocal && !list.hasLocal()) return;

				if (onlyAvailable && !list.hasAvailable()) return;

				let item = {
					name: key,
					count: list.count(),
					hasLocal: list.hasLocal(),
					available: list.hasAvailable()
				};

				if (item.count > 0) {
					const ep = list.endpoints[0];
					if (ep) item.action = ___default.omit(ep.action, ["handler", "remoteHandler", "service"]);
				}
				if (item.action && item.action.protected === true) return;

				if (withEndpoints) {
					if (item.count > 0) {
						item.endpoints = list.endpoints.map(ep => {
							return {
								nodeID: ep.node.id,
								state: ep.state,
								available: ep.node.available
							};
						});
					}
				}

				res.push(item);
			});

			return res;
		}
	}

	var actionCatalog = ActionCatalog;

	const { METRIC: METRIC$1 } = metrics;

	/**
	 * Import types
	 *
	 * @typedef {import("../context")} Context
	 * @typedef {import("../service")} Service
	 * @typedef {import("./service-item")} ServiceItem
	 * @typedef {import("../service").ServiceAction} ServiceAction
	 * @typedef {import("../service").ActionSchema} ActionSchema
	 * @typedef {import("../service").EventSchema} EventSchema
	 * @typedef {import("./registry")} RegistryClass
	 * @typedef {import("./registry").NodeRawInfo} NodeRawInfo
	 * @typedef {import("../service-broker")} ServiceBroker
	 * @typedef {import("./node")} Node
	 * @typedef {import("./endpoint-list")} EndpointList
	 * @typedef {import("./endpoint")} Endpoint
	 * @typedef {import("../strategies/base")} BaseStrategy
	 */

	/**
	 * Service Registry
	 *
	 * @class Registry
	 * @implements {RegistryClass}
	 */
	class Registry {
		/**
		 * Creates an instance of Registry.
		 *
		 * @param {ServiceBroker} broker
		 * @memberof Registry
		 */
		constructor(broker) {
			this.broker = broker;
			this.metrics = broker.metrics;
			this.logger = broker.getLogger("registry");

			this.opts = Object.assign({}, broker.options.registry);

			this.StrategyFactory = strategies.resolve(this.opts.strategy);
			this.logger.info(`Strategy: ${this.StrategyFactory.name}`);

			/** @type {Discoverers.Base} */
			this.discoverer = discoverers.resolve(this.opts.discoverer);
			this.logger.info(`Discoverer: ${this.broker.getConstructorName(this.discoverer)}`);

			/** @type {boolean|string} */
			this.localNodeInfoInvalidated = true;

			this.nodes = new nodeCatalog(this, broker);
			this.services = new serviceCatalog(this, broker);
			this.actions = new actionCatalog(this, broker, this.StrategyFactory);
			this.events = new eventCatalog(this, broker, this.StrategyFactory);

			this.registerMoleculerMetrics();
			this.updateMetrics();
		}

		init() {
			this.discoverer.init(this);
		}

		stop() {
			return this.discoverer.stop();
		}

		/**
		 * Register Moleculer Core metrics.
		 */
		registerMoleculerMetrics() {
			if (!this.broker.isMetricsEnabled()) return;

			this.metrics.register({
				name: METRIC$1.MOLECULER_REGISTRY_NODES_TOTAL,
				type: METRIC$1.TYPE_GAUGE,
				description: "Number of registered nodes"
			});
			this.metrics.register({
				name: METRIC$1.MOLECULER_REGISTRY_NODES_ONLINE_TOTAL,
				type: METRIC$1.TYPE_GAUGE,
				description: "Number of online nodes"
			});
			this.metrics.register({
				name: METRIC$1.MOLECULER_REGISTRY_SERVICES_TOTAL,
				type: METRIC$1.TYPE_GAUGE,
				description: "Number of registered services"
			});
			this.metrics.register({
				name: METRIC$1.MOLECULER_REGISTRY_SERVICE_ENDPOINTS_TOTAL,
				type: METRIC$1.TYPE_GAUGE,
				labelNames: ["service"],
				description: "Number of service endpoints"
			});
			this.metrics.register({
				name: METRIC$1.MOLECULER_REGISTRY_ACTIONS_TOTAL,
				type: METRIC$1.TYPE_GAUGE,
				description: "Number of registered actions"
			});
			this.metrics.register({
				name: METRIC$1.MOLECULER_REGISTRY_ACTION_ENDPOINTS_TOTAL,
				type: METRIC$1.TYPE_GAUGE,
				labelNames: ["action"],
				description: "Number of action endpoints"
			});
			this.metrics.register({
				name: METRIC$1.MOLECULER_REGISTRY_EVENTS_TOTAL,
				type: METRIC$1.TYPE_GAUGE,
				description: "Number of registered events"
			});
			this.metrics.register({
				name: METRIC$1.MOLECULER_REGISTRY_EVENT_ENDPOINTS_TOTAL,
				type: METRIC$1.TYPE_GAUGE,
				labelNames: ["event"],
				description: "Number of event endpoints"
			});
		}

		/**
		 * Update metrics.
		 */
		updateMetrics() {
			if (!this.broker.isMetricsEnabled()) return;

			this.metrics.set(METRIC$1.MOLECULER_REGISTRY_NODES_TOTAL, this.nodes.count());
			this.metrics.set(METRIC$1.MOLECULER_REGISTRY_NODES_ONLINE_TOTAL, this.nodes.onlineCount());

			const services = this.services.list({
				grouping: true,
				onlyLocal: false,
				onlyAvailable: false,
				skipInternal: false,
				withActions: false,
				withEvents: false
			});
			this.metrics.set(METRIC$1.MOLECULER_REGISTRY_SERVICES_TOTAL, services.length);
			services.forEach(svc =>
				this.metrics.set(
					METRIC$1.MOLECULER_REGISTRY_SERVICE_ENDPOINTS_TOTAL,
					svc.nodes ? svc.nodes.length : 0,
					{ service: svc.fullName }
				)
			);

			const actions = this.actions.list({ withEndpoints: true });
			this.metrics.set(METRIC$1.MOLECULER_REGISTRY_ACTIONS_TOTAL, actions.length);
			actions.forEach(item =>
				this.metrics.set(
					METRIC$1.MOLECULER_REGISTRY_ACTION_ENDPOINTS_TOTAL,
					item.endpoints ? item.endpoints.length : 0,
					{ action: item.name }
				)
			);

			const events = this.events.list({ withEndpoints: true });
			this.metrics.set(METRIC$1.MOLECULER_REGISTRY_EVENTS_TOTAL, events.length);
			events.forEach(item =>
				this.metrics.set(
					METRIC$1.MOLECULER_REGISTRY_EVENT_ENDPOINTS_TOTAL,
					item.endpoints ? item.endpoints.length : 0,
					{ event: item.name }
				)
			);
		}

		/**
		 * Register local service
		 *
		 * @param {ServiceItem} svc
		 * @memberof Registry
		 */
		registerLocalService(svc) {
			if (!this.services.has(svc.fullName, this.broker.nodeID)) {
				const service = this.services.add(this.nodes.localNode, svc, true);

				if (svc.actions) this.registerActions(this.nodes.localNode, service, svc.actions);

				if (svc.events) this.registerEvents(this.nodes.localNode, service, svc.events);

				this.nodes.localNode.services.push(service);

				//this.regenerateLocalRawInfo(true);
				this.localNodeInfoInvalidated = "seq";

				this.logger.info(`'${svc.name}' service is registered.`);

				this.broker.servicesChanged(true);
				this.updateMetrics();
			}
		}

		/**
		 * Register remote services
		 *
		 * @param {Node} node
		 * @param {Array} serviceList
		 * @memberof Registry
		 */
		registerServices(node, serviceList) {
			serviceList.forEach(svc => {
				if (!svc.fullName)
					svc.fullName = this.broker.ServiceFactory.getVersionedFullName(
						svc.name,
						svc.version
					);

				let prevActions, prevEvents;
				let service = this.services.get(svc.fullName, node.id);
				if (!service) {
					service = this.services.add(node, svc, false);
				} else {
					prevActions = Object.assign({}, service.actions);
					prevEvents = Object.assign({}, service.events);
					service.update(svc);
				}

				//Register actions
				if (svc.actions) {
					this.registerActions(node, service, svc.actions);
				}

				// remove old actions which is not exist
				if (prevActions) {
					___default.forIn(prevActions, (action, name) => {
						if (!svc.actions || !svc.actions[name]) {
							this.unregisterAction(node, name);
						}
					});
				}

				//Register events
				if (svc.events) {
					this.registerEvents(node, service, svc.events);
				}

				// remove old events which is not exist
				if (prevEvents) {
					___default.forIn(prevEvents, (event, name) => {
						if (!svc.events || !svc.events[name]) {
							this.unregisterEvent(node, name);
						}
					});
				}
			});

			// remove old services which is not exist in new serviceList
			// Please note! At first, copy the array because you can't remove items inside forEach
			const prevServices = Array.from(this.services.services);
			prevServices.forEach(service => {
				if (service.node != node) return;

				let exist = false;
				serviceList.forEach(svc => {
					if (service.equals(svc.fullName)) exist = true;
				});

				// This service is removed on remote node!
				if (!exist) {
					this.unregisterService(service.fullName, node.id);
				}
			});

			this.broker.servicesChanged(false);
			this.updateMetrics();
		}

		/**
		 * Check the action visiblity.
		 *
		 * 	Available values:
		 * 		- "published" or `null`: public action and can be published via API Gateway
		 * 		- "public": public action, can be called remotely but not published via API GW
		 * 		- "protected": can be called from local services
		 * 		- "private": can be called from internally via `this.actions.xy()` inside Service
		 *
		 * @param {ActionSchema} action
		 * @param {Node} node
		 * @returns
		 * @memberof Registry
		 */
		checkActionVisibility(action, node) {
			if (
				action.visibility == null ||
				action.visibility == "published" ||
				action.visibility == "public"
			)
				return true;

			if (action.visibility == "protected" && node.local) return true;

			return false;
		}

		/**
		 * Register service actions
		 *
		 * @param {Node} node
		 * @param {ServiceItem} service
		 * @param {Record<string, ActionSchema>} actions
		 * @memberof Registry
		 */
		registerActions(node, service, actions) {
			___default.forIn(actions, action => {
				if (!this.checkActionVisibility(action, node)) return;

				// Clone fields to have independent action object
				const serviceAction = { ...action };

				if (node.local) {
					serviceAction.handler = this.broker.middlewares.wrapHandler(
						"localAction",
						action.handler,
						action
					);
				} else if (this.broker.transit) {
					serviceAction.handler = this.broker.middlewares.wrapHandler(
						"remoteAction",
						this.broker.transit.request.bind(this.broker.transit),
						{ ...action, service }
					);
				}
				if (this.broker.options.disableBalancer && this.broker.transit)
					serviceAction.remoteHandler = this.broker.middlewares.wrapHandler(
						"remoteAction",
						this.broker.transit.request.bind(this.broker.transit),
						{ ...action, service }
					);

				this.actions.add(node, service, serviceAction);
				service.addAction(serviceAction);
			});
		}

		/**
		 * Create a local Endpoint for private actions
		 *
		 * @param {ActionSchema} action
		 * @returns {ActionEndpoint}
		 * @memberof Registry
		 */
		createPrivateActionEndpoint(action) {
			return new endpointAction(this, this.broker, this.nodes.localNode, action.service, action);
		}

		/**
		 * Check the service is exist
		 *
		 * @param {String} fullName
		 * @param {String} nodeID
		 * @returns {Boolean}
		 * @memberof Registry
		 */
		hasService(fullName, nodeID) {
			return this.services.has(fullName, nodeID);
		}

		/**
		 * Get endpoint list of action by name
		 *
		 * @param {String} actionName
		 * @returns {EndpointList}
		 * @memberof Registry
		 */
		getActionEndpoints(actionName) {
			return this.actions.get(actionName);
		}

		/**
		 * Get an endpoint of action on a specified node
		 *
		 * @param {String} actionName
		 * @param {String} nodeID
		 * @returns {ActionEndpoint}
		 * @memberof Registry
		 */
		getActionEndpointByNodeId(actionName, nodeID) {
			const list = this.actions.get(actionName);
			if (list) return list.getEndpointByNodeID(nodeID);
		}

		/**
		 * Unregister service
		 *
		 * @param {String} fullName
		 * @param {String?} nodeID
		 * @memberof Registry
		 */
		unregisterService(fullName, nodeID) {
			nodeID = nodeID || this.broker.nodeID;
			this.services.remove(fullName, nodeID);

			if (nodeID == this.broker.nodeID) {
				// Clean the local node services
				const idx = this.nodes.localNode.services.findIndex(svc => svc.fullName === fullName);
				if (idx !== -1) this.nodes.localNode.services.splice(idx, 1);
			}

			if (nodeID == this.broker.nodeID) {
				this.localNodeInfoInvalidated = "seq";
				//this.regenerateLocalRawInfo(true);
			}
		}

		/**
		 * Unregister all services by nodeID
		 *
		 * @param {String} nodeID
		 * @memberof Registry
		 */
		unregisterServicesByNode(nodeID) {
			this.services.removeAllByNodeID(nodeID);
		}

		/**
		 * Unregister an action by node & name
		 *
		 * @param {Node} node
		 * @param {String} actionName
		 * @memberof Registry
		 */
		unregisterAction(node, actionName) {
			this.actions.remove(actionName, node.id);
		}

		/**
		 * Register service events
		 *
		 * @param {Node} node
		 * @param {ServiceItem} service
		 * @param {Record<string, EventSchema>} events
		 * @memberof Registry
		 */
		registerEvents(node, service, events) {
			___default.forIn(events, event => {
				const serviceEvent = { ...event };

				if (node.local)
					serviceEvent.handler = this.broker.middlewares.wrapHandler(
						"localEvent",
						serviceEvent.handler,
						serviceEvent
					);

				this.events.add(node, service, serviceEvent);
				service.addEvent(serviceEvent);
			});
		}

		/**
		 * Unregister event by name & node
		 *
		 * @param {Node} node
		 * @param {String} eventName
		 * @memberof Registry
		 */
		unregisterEvent(node, eventName) {
			this.events.remove(eventName, node.id);
		}

		/**
		 * Generate local raw info for INFO packet
		 *
		 * @param {boolean} incSeq
		 * @param {boolean=} isStopping
		 *
		 * @returns {NodeRawInfo}
		 * @memberof Registry
		 */
		regenerateLocalRawInfo(incSeq, isStopping) {
			let node = this.nodes.localNode;
			if (incSeq) node.seq++;

			const rawInfo = ___default.pick(node, [
				"ipList",
				"hostname",
				"instanceID",
				"client",
				"config",
				"port",
				"seq",
				"metadata"
			]);

			if (!isStopping && (this.broker.started || incSeq)) {
				rawInfo.services = this.services.getLocalNodeServices();
			} else {
				rawInfo.services = [];
			}

			// Make to be safety
			node.rawInfo = utils_1.safetyObject(rawInfo, this.broker.options);

			return node.rawInfo;
		}

		/**
		 * Generate local node info for INFO packets
		 *
		 * @param {boolean=} force
		 * @returns {NodeRawInfo}
		 * @memberof Registry
		 */
		getLocalNodeInfo(force) {
			if (force || !this.nodes.localNode.rawInfo || this.localNodeInfoInvalidated) {
				const res = this.regenerateLocalRawInfo(this.localNodeInfoInvalidated == "seq");
				this.logger.debug("Local Node info regenerated.");
				this.localNodeInfoInvalidated = false;
				return res;
			}

			return this.nodes.localNode.rawInfo;
		}

		/**
		 * Generate node info for INFO packets
		 *
		 * @param {String} nodeID
		 * @returns {NodeRawInfo}
		 * @memberof Registry
		 */
		getNodeInfo(nodeID) {
			const node = this.nodes.get(nodeID);
			if (!node) return null;

			if (node.local) return this.getLocalNodeInfo();

			return node.rawInfo;
		}

		/**
		 * Process an incoming node INFO packet
		 *
		 * @param {any} payload
		 * @returns
		 * @memberof Registry
		 */
		processNodeInfo(payload) {
			return this.nodes.processNodeInfo(payload);
		}

		/**
		 * Get list of registered nodes
		 *
		 * @param {object?} opts
		 * @returns
		 * @memberof Registry
		 */
		getNodeList(opts) {
			return this.nodes.list(opts);
		}

		/**
		 * Get list of registered services
		 *
		 * @param {object?} opts
		 * @returns
		 * @memberof Registry
		 */
		getServiceList(opts) {
			return this.services.list(opts);
		}

		/**
		 * Get list of registered actions
		 *
		 * @param {object?} opts
		 * @returns
		 * @memberof Registry
		 */
		getActionList(opts) {
			return this.actions.list(opts);
		}

		/**
		 * Get list of registered events
		 *
		 * @param {object?} opts
		 * @returns
		 * @memberof Registry
		 */
		getEventList(opts) {
			return this.events.list(opts);
		}

		/**
		 * Get a raw info list from nodes
		 *
		 * @returns {Array<NodeRawInfo>}
		 * @memberof Registry
		 */
		getNodeRawList() {
			return this.nodes.toArray().map(node => node.rawInfo);
		}
	}

	var registry$1 = Registry;

	var registry$2 = registry$1;

	const { match: match$2, isObject: isObject$3, isString: isString$5 } = utils_1;

	const LEVELS = ["fatal", "error", "warn", "info", "debug", "trace"];

	/**
	 * Import types
	 *
	 * @typedef {import("../logger-factory")} LoggerFactory
	 * @typedef {import("../logger-factory").LoggerBindings} LoggerBindings
	 * @typedef {import("./base").LoggerOptions} LoggerOptions
	 * @typedef {import("./base")} BaseLoggerClass
	 */

	/**
	 * Logger base class.
	 *
	 * @implements {BaseLoggerClass}
	 */
	class BaseLogger {
		/**
		 * Creates an instance of BaseLogger.
		 *
		 * @param {LoggerOptions} opts
		 * @memberof BaseLogger
		 */
		constructor(opts) {
			/** @type {LoggerOptions} */
			this.opts = ___default.defaultsDeep(opts, {
				level: "info",
				createLogger: null
			});
			this.Promise = Promise; // default promise before logger is initialized
		}

		/**
		 * Initialize logger.
		 *
		 * @param {LoggerFactory} loggerFactory
		 */
		init(loggerFactory) {
			this.loggerFactory = loggerFactory;
			this.broker = this.loggerFactory.broker;
			this.Promise = this.broker.Promise;
		}

		/**
		 * Stopping logger
		 */
		stop() {
			return this.Promise.resolve();
		}

		getLogLevel(mod) {
			mod = mod ? mod.toUpperCase() : "";

			const level = this.opts.level;
			if (isString$5(level)) return level;

			if (isObject$3(level)) {
				if (level[mod]) return level[mod];

				// Find with matching
				const key = Object.keys(level).find(m => match$2(mod, m) && m !== "**");
				if (key) return level[key];
				else if (level["**"]) {
					return level["**"];
				}
			}

			/* istanbul ignore next */
			return null;
		}

		/**
		 *
		 * @param {LoggerBindings?} bindings
		 */
		getLogHandler(bindings) {
			return null;
		}
	}

	BaseLogger.LEVELS = LEVELS;

	var base$4 = BaseLogger;

	/**
	 * Import types
	 *
	 * @typedef {import("../logger-factory")} LoggerFactory
	 * @typedef {import("../logger-factory").LoggerBindings} LoggerBindings
	 * @typedef {import("./console").ConsoleLoggerOptions} ConsoleLoggerOptions
	 * @typedef {import("./console")} ConsoleLoggerClass
	 */

	/**
	 * Console logger for Moleculer
	 *
	 * @class ConsoleLogger
	 * @implements {ConsoleLoggerClass}
	 * @extends {FormattedLogger<ConsoleLoggerOptions>}
	 */
	class ConsoleLogger extends require$$19 {
		/**
		 * Creates an instance of ConsoleLogger.
		 * @param {ConsoleLoggerOptions} opts
		 * @memberof ConsoleLogger
		 */
		constructor(opts) {
			super(opts);

			this.maxPrefixLength = 0;
		}

		/**
		 * Initialize logger.
		 *
		 * @param {LoggerFactory} loggerFactory
		 */
		init(loggerFactory) {
			super.init(loggerFactory);

			if (!this.opts.colors) kleur_1.enabled = false;
		}

		/**
		 *
		 * @param {LoggerBindings} bindings
		 */
		getLogHandler(bindings) {
			const level = bindings ? this.getLogLevel(bindings.mod) : null;
			if (!level) return null;

			const levelIdx = require$$19.LEVELS.indexOf(level);
			const formatter = this.getFormatter(bindings);

			return (type, args) => {
				const typeIdx = require$$19.LEVELS.indexOf(type);
				if (typeIdx > levelIdx) return;

				const pargs = formatter(type, args);
				switch (type) {
					case "fatal":
					case "error":
						return console.error(...pargs);
					case "warn":
						return console.warn(...pargs);
					default:
						return console.log(...pargs);
				}
			};
		}
	}

	var console_1 = ConsoleLogger;

	const { isObject: isObject$4, isString: isString$6, isInheritedClass: isInheritedClass$2 } = utils_1;
	const { BrokerOptionsError: BrokerOptionsError$4 } = errors;


	const Loggers = {
		Base: base$4,
		Formatted: require$$19,

		Bunyan: require$$19,
		Console: console_1,
		Datadog: require$$19,
		Debug: require$$19,
		File: require$$19,
		Log4js: require$$19,
		Pino: require$$19,
		Winston: require$$19,

		LEVELS: base$4.LEVELS
	};

	function getByName$4(name) {
		/* istanbul ignore next */
		if (!name) return null;

		let n = Object.keys(Loggers).find(n => n.toLowerCase() == name.toLowerCase());
		if (n) return Loggers[n];
	}

	/**
	 * Resolve reporter by name
	 *
	 * @param {Record<string, any> | string} opt
	 * @returns {any}
	 */
	function resolve$4(opt) {
		if (isObject$4(opt) && isInheritedClass$2(opt, Loggers.Base)) {
			return opt;
		} else if (isString$6(opt)) {
			let LoggerClass = getByName$4(opt);
			if (LoggerClass) return new LoggerClass();
		} else if (isObject$4(opt)) {
			let LoggerClass = getByName$4(opt.type);
			if (LoggerClass) return new LoggerClass(opt.options);
			else
				throw new BrokerOptionsError$4(`Invalid logger configuration. Type: '${opt.type}'`, {
					type: opt.type
				});
		}

		throw new BrokerOptionsError$4(`Invalid logger configuration: '${opt}'`, { type: opt });
	}

	function register$4(name, value) {
		Loggers[name] = value;
	}

	var loggers = Object.assign(Loggers, { resolve: resolve$4, register: register$4 });

	const { isPlainObject: isPlainObject$2, isString: isString$7 } = utils_1;


	const noop$1 = () => {};
	const cwd = _process.cwd();

	/**
	 * Import types
	 *
	 * @typedef {import("./service-broker")} ServiceBroker
	 * @typedef {import("./logger-factory")} LoggerFactoryClass
	 * @typedef {import("./logger-factory").LoggerBindings} LoggerBindings
	 * @typedef {import("./logger-factory").Logger} Logger
	 * @typedef {import("./loggers/base")} BaseLogger
	 */

	/**
	 * Log factory class.
	 *
	 * @implements {LoggerFactoryClass}
	 */
	class LoggerFactory {
		/**
		 * Constructor of LoggerFactory
		 *
		 * @param {ServiceBroker} broker
		 */
		constructor(broker) {
			this.broker = broker;
			this.appenders = [];
			this.cache = new Map();
		}

		/**
		 * Initialize module.
		 */
		init(opts) {
			this.opts = opts;

			const globalLogLevel = this.broker.options.logLevel || "info";

			if (opts === false || opts == null) {
				// No logger
				this.appenders = [];
			} else if (opts === true || opts === console) {
				// Default console logger
				this.appenders = [
					loggers.resolve({
						type: "Console",
						options: {
							level: globalLogLevel
						}
					})
				];
			} else {
				if (!Array.isArray(opts)) {
					opts = [opts];
				}

				this.appenders = ___default.compact(opts).map(o => {
					// Built-in shorthand
					if (isString$7(o))
						return loggers.resolve({ type: o, options: { level: globalLogLevel } });

					// Build-in with options
					if (isPlainObject$2(o))
						return loggers.resolve(
							___default.defaultsDeep({}, o, { options: { level: globalLogLevel } })
						);

					// Custom logger instance
					return loggers.resolve(o);
				});
			}

			// Initialize appenders
			this.appenders.forEach(app => app.init(this));
		}

		/**
		 * Stopping all appenders
		 */
		stop() {
			return this.broker.Promise.all(this.appenders.map(appender => appender.stop()));
		}

		/**
		 * Get caller information from error stack trace.
		 */
		getCallerFromStack() {
			const _prepareStackTrace = Error.prepareStackTrace;
			Error.prepareStackTrace = (_, stack) => stack;
			const stack = new Error().stack;
			Error.prepareStackTrace = _prepareStackTrace;

			if (stack.length > 2) {
				/** @type {any} */
				const site = stack[2];
				return {
					filename: site.getFileName().substring(cwd.length + 1),
					lineNumber: site.getLineNumber(),
					columnNumber: site.getColumnNumber(),
					methodName: site.getMethodName(),
					functionName: site.getFunctionName()
				};
			}
		}

		/**
		 * Get a logger for a module (service, transporter, cacher, context...etc)
		 *
		 * @param {LoggerBindings} bindings
		 * @returns {Logger}
		 *
		 * @memberof ServiceBroker
		 */
		getLogger(bindings) {
			let logger = this.cache.get(this.getBindingsKey(bindings));
			if (logger) return logger;

			logger = {};
			const broker = this.broker;
			const appenders = this.appenders;

			const logHandlers = ___default.compact(appenders.map(app => app.getLogHandler(bindings)));
			const hasNewLogEntryMiddleware =
				broker.middlewares && broker.middlewares.registeredHooks.newLogEntry;

			loggers.LEVELS.forEach(type => {
				if (logHandlers.length == 0 && !hasNewLogEntryMiddleware) return (logger[type] = noop$1);

				logger[type] = function (...args) {
					if (hasNewLogEntryMiddleware)
						broker.middlewares.callSyncHandlers("newLogEntry", [type, args, bindings], {});

					if (logHandlers.length === 0) return;

					for (let i = 0; i < logHandlers.length; i++) logHandlers[i](type, args);
				};
			});

			/*logger.log = function(type, ...args) {
				if (broker.middlewares)
					broker.middlewares.callSyncHandlers("newLogEntry", [type, args, bindings], {});

				if (logHandlers.length === 0) return;

				logHandlers.forEach(fn => fn(type, args));
			};*/

			logger.appenders = appenders;

			this.cache.set(this.getBindingsKey(bindings), logger);

			return logger;
		}

		/**
		 * Create a key from bindings for logger caching.
		 *
		 * @param {LoggerBindings} bindings
		 * @returns {String}
		 */
		getBindingsKey(bindings) {
			if (!bindings) return "";

			return ["nodeID", "ns", "mod"].map(key => bindings[key]).join("|");
		}
	}

	var loggerFactory = LoggerFactory;

	const { ValidationError } = errors;


	/**
	 * Import types
	 *
	 * @typedef {import("../service-broker")} ServiceBroker
	 * @typedef {import("../context")} Context
	 * @typedef {import("./base")} BaseValidatorClass
	 * @typedef {import("./base").ValidatorOptions} ValidatorOptions
	 * @typedef {import("./base").CheckerFunction} CheckerFunction
	 */

	/**
	 * Abstract validator class
	 *
	 * @implements {BaseValidatorClass}
	 */
	class BaseValidator {
		/**
		 * Creates an instance of Validator.
		 *
		 * @param {ValidatorOptions} opts
		 *
		 * @memberof Cacher
		 */
		constructor(opts) {
			/** @type {ValidatorOptions} */
			this.opts = ___default.defaultsDeep(opts, {
				paramName: "params"
			});
		}

		/**
		 * Initialize cacher
		 *
		 * @param {ServiceBroker} broker
		 *
		 * @memberof Cacher
		 */
		init(broker) {
			this.broker = broker;
		}

		/**
		 * Compile a validation schema to a checker function.
		 *
		 * @param {Record<string, any>} schema
		 * @returns {CheckerFunction}
		 */
		compile(schema) {
			throw new Error("Abstract method");
		}

		/**
		 * Validate params againt the schema
		 *
		 * @param {Record<string, any>} params
		 * @param {Record<string, any>} schema
		 * @returns {boolean}
		 */
		validate(params, schema) {
			throw new Error("Abstract method");
		}

		/**
		 * Convert the specific validation schema to
		 * the Moleculer (fastest-validator) validation schema format.
		 *
		 * @param {Record<string, any>} schema
		 * @returns {Object}
		 */
		convertSchemaToMoleculer(schema) {
			throw new Error("Abstract method");
		}

		/**
		 * Register validator as a middleware
		 *
		 * @param {ServiceBroker} broker
		 *
		 * @memberof BaseValidator
		 */
		middleware(broker) {
			const self = this;
			const paramName = this.opts.paramName;

			const processCheckResponse = function (ctx, handler, res, additionalInfo) {
				if (res === true) return handler(ctx);
				else {
					res = res.map(data => Object.assign(data, additionalInfo));
					return broker.Promise.reject(
						new ValidationError("Parameters validation error!", null, res)
					);
				}
			};

			return {
				name: "Validator",
				localAction: function validatorMiddleware(handler, action) {
					// Wrap a param validator
					if (action[paramName] && typeof action[paramName] === "object") {
						const check = self.compile(action[paramName]);
						return function validateContextParams(ctx) {
							const res = check(ctx.params != null ? ctx.params : {}, { meta: ctx });
							if (check.async)
								return res.then(res =>
									processCheckResponse(ctx, handler, res, {
										nodeID: ctx.nodeID,
										action: ctx.action.name
									})
								);
							else
								return processCheckResponse(ctx, handler, res, {
									nodeID: ctx.nodeID,
									action: ctx.action.name
								});
						};
					}
					return handler;
				},

				localEvent: function validatorMiddleware(handler, event) {
					// Wrap a param validator
					if (event[paramName] && typeof event[paramName] === "object") {
						const check = self.compile(event[paramName]);
						return function validateContextParams(ctx) {
							const res = check(ctx.params != null ? ctx.params : {}, { meta: ctx });

							if (check.async)
								return res.then(res =>
									processCheckResponse(ctx, handler, res, {
										nodeID: ctx.nodeID,
										event: ctx.event.name
									})
								);
							else
								return processCheckResponse(ctx, handler, res, {
									nodeID: ctx.nodeID,
									event: ctx.event.name
								});
						};
					}
					return handler;
				}
			};
		}
	}

	var base$5 = BaseValidator;

	function isObjectHasKeys(v) {
		if (typeof v !== "object" || Array.isArray(v) || v == null) return false;
		return Object.keys(v).length > 0;
	}

	function deepExtend(destination, source, options = {}) {
		for (let property in source) {
			if (isObjectHasKeys(source[property])) {
				destination[property] = destination[property] || {};
				deepExtend(destination[property], source[property], options);
			} else {
				if (options.skipIfExist === true && destination[property] !== undefined) continue;
				destination[property] = source[property];
			}
		}
		return destination;
	}

	var deepExtend_1 = deepExtend;

	function convertible(value) {
		if (value === undefined) return "";
		if (value === null) return "";
		if (typeof value.toString === "function") return value;
		return typeof value;
	}

	var replace = (string, searchValue, newValue) => string.replace(searchValue, convertible(newValue));

	var messages = {
		required: "The '{field}' field is required.",

		string: "The '{field}' field must be a string.",
		stringEmpty: "The '{field}' field must not be empty.",
		stringMin: "The '{field}' field length must be greater than or equal to {expected} characters long.",
		stringMax: "The '{field}' field length must be less than or equal to {expected} characters long.",
		stringLength: "The '{field}' field length must be {expected} characters long.",
		stringPattern: "The '{field}' field fails to match the required pattern.",
		stringContains: "The '{field}' field must contain the '{expected}' text.",
		stringEnum: "The '{field}' field does not match any of the allowed values.",
		stringNumeric: "The '{field}' field must be a numeric string.",
		stringAlpha: "The '{field}' field must be an alphabetic string.",
		stringAlphanum: "The '{field}' field must be an alphanumeric string.",
		stringAlphadash: "The '{field}' field must be an alphadash string.",
		stringHex: "The '{field}' field must be a hex string.",
		stringSingleLine: "The '{field}' field must be a single line string.",
		stringBase64: "The '{field}' field must be a base64 string.",

		number: "The '{field}' field must be a number.",
		numberMin: "The '{field}' field must be greater than or equal to {expected}.",
		numberMax: "The '{field}' field must be less than or equal to {expected}.",
		numberEqual: "The '{field}' field must be equal to {expected}.",
		numberNotEqual: "The '{field}' field can't be equal to {expected}.",
		numberInteger: "The '{field}' field must be an integer.",
		numberPositive: "The '{field}' field must be a positive number.",
		numberNegative: "The '{field}' field must be a negative number.",

		array: "The '{field}' field must be an array.",
		arrayEmpty: "The '{field}' field must not be an empty array.",
		arrayMin: "The '{field}' field must contain at least {expected} items.",
		arrayMax: "The '{field}' field must contain less than or equal to {expected} items.",
		arrayLength: "The '{field}' field must contain {expected} items.",
		arrayContains: "The '{field}' field must contain the '{expected}' item.",
		arrayUnique: "The '{actual}' value in '{field}' field does not unique the '{expected}' values.",
		arrayEnum: "The '{actual}' value in '{field}' field does not match any of the '{expected}' values.",

		tuple: "The '{field}' field must be an array.",
		tupleEmpty: "The '{field}' field must not be an empty array.",
		tupleLength: "The '{field}' field must contain {expected} items.",

		boolean: "The '{field}' field must be a boolean.",

		currency: "The '{field}' must be a valid currency format",

		date: "The '{field}' field must be a Date.",
		dateMin: "The '{field}' field must be greater than or equal to {expected}.",
		dateMax: "The '{field}' field must be less than or equal to {expected}.",

		enumValue: "The '{field}' field value '{expected}' does not match any of the allowed values.",

		equalValue: "The '{field}' field value must be equal to '{expected}'.",
		equalField: "The '{field}' field value must be equal to '{expected}' field value.",

		forbidden: "The '{field}' field is forbidden.",

		function: "The '{field}' field must be a function.",

		email: "The '{field}' field must be a valid e-mail.",
		emailEmpty: "The '{field}' field must not be empty.",
		emailMin: "The '{field}' field length must be greater than or equal to {expected} characters long.",
		emailMax: "The '{field}' field length must be less than or equal to {expected} characters long.",

		luhn: "The '{field}' field must be a valid checksum luhn.",

		mac: "The '{field}' field must be a valid MAC address.",

		object: "The '{field}' must be an Object.",
		objectStrict: "The object '{field}' contains forbidden keys: '{actual}'.",
		objectMinProps: "The object '{field}' must contain at least {expected} properties.",
		objectMaxProps: "The object '{field}' must contain {expected} properties at most.",

		url: "The '{field}' field must be a valid URL.",
		urlEmpty: "The '{field}' field must not be empty.",

		uuid: "The '{field}' field must be a valid UUID.",
		uuidVersion: "The '{field}' field must be a valid UUID version provided.",

		classInstanceOf: "The '{field}' field must be an instance of the '{expected}' class.",

		objectID: "The '{field}' field must be an valid ObjectID",

		record: "The '{field}' must be an Object."
	};

	/**	Signature: function(value, field, parent, errors, context)
	 */
	var any = function(/*{ schema, messages }, path, context*/) {
		const src = [];
		src.push(`
		return value;
	`);

		return {
			source: src.join("\n")
		};
	};

	/**	Signature: function(value, field, parent, errors, context)
	 */
	var array = function ({ schema, messages }, path, context) {
		const src = [];

		let sanitized = false;
		if (schema.convert === true) {
			sanitized = true;
			// Convert to array if not and the value is not null or undefined
			src.push(`
			if (!Array.isArray(value) && value != null) {
				value = [value];
			}
		`);
		}

		src.push(`
		if (!Array.isArray(value)) {
			${this.makeError({ type: "array", actual: "value", messages })}
			return value;
		}

		var len = value.length;
	`);

		if (schema.empty === false) {
			src.push(`
			if (len === 0) {
				${this.makeError({ type: "arrayEmpty", actual: "value", messages })}
			}
		`);
		}

		if (schema.min != null) {
			src.push(`
			if (len < ${schema.min}) {
				${this.makeError({ type: "arrayMin", expected: schema.min, actual: "len", messages })}
			}
		`);
		}

		if (schema.max != null) {
			src.push(`
			if (len > ${schema.max}) {
				${this.makeError({ type: "arrayMax", expected: schema.max, actual: "len", messages })}
			}
		`);
		}

		if (schema.length != null) {
			src.push(`
			if (len !== ${schema.length}) {
				${this.makeError({ type: "arrayLength", expected: schema.length, actual: "len", messages })}
			}
		`);
		}

		if (schema.contains != null) {
			src.push(`
			if (value.indexOf(${JSON.stringify(schema.contains)}) === -1) {
				${this.makeError({ type: "arrayContains", expected: JSON.stringify(schema.contains), actual: "value", messages })}
			}
		`);
		}

		if (schema.unique === true) {
			src.push(`
			if(len > (new Set(value)).size) {
				${this.makeError({ type: "arrayUnique", expected: "Array.from(new Set(value.filter((item, index) => value.indexOf(item) !== index)))", actual: "value", messages })}
			}
		`);
		}

		if (schema.enum != null) {
			const enumStr = JSON.stringify(schema.enum);
			src.push(`
			for (var i = 0; i < value.length; i++) {
				if (${enumStr}.indexOf(value[i]) === -1) {
					${this.makeError({ type: "arrayEnum", expected: "\"" + schema.enum.join(", ") + "\"", actual: "value[i]", messages })}
				}
			}
		`);
		}

		if (schema.items != null) {
			src.push(`
			var arr = value;
			var parentField = field;
			for (var i = 0; i < arr.length; i++) {
				value = arr[i];
		`);

			const itemPath = path + "[]";
			const rule = this.getRuleFromSchema(schema.items);
			// eslint-disable-next-line quotes
			const innerSource = `arr[i] = ${context.async ? "await " : ""}context.fn[%%INDEX%%](arr[i], (parentField ? parentField : "") + "[" + i + "]", parent, errors, context)`;
			src.push(this.compileRule(rule, context, itemPath, innerSource, "arr[i]"));
			src.push(`
			}
		`);
			src.push(`
		return arr;
	`);
		} else {
			src.push(`
		return value;
	`);
		}

		return {
			sanitized,
			source: src.join("\n")
		};
	};

	/**	Signature: function(value, field, parent, errors, context)
	 */
	var boolean_1 = function({ schema, messages }, path, context) {
		const src = [];
		let sanitized = false;

		src.push(`
		var origValue = value;
	`);

		if (schema.convert === true) {
			sanitized = true;
			src.push(`
			if (typeof value !== "boolean") {
				if (
				value === 1
				|| value === "true"
				|| value === "1"
				|| value === "on"
				) {
					value = true;
				} else if (
				value === 0
				|| value === "false"
				|| value === "0"
				|| value === "off"
				) {
					value = false;
				}
			}
		`);
		}

		src.push(`
		if (typeof value !== "boolean") {
			${this.makeError({ type: "boolean",  actual: "origValue", messages })}
		}
		
		return value;
	`);

		return {
			sanitized,
			source: src.join("\n")
		};
	};

	/**	Signature: function(value, field, parent, errors, context)
	 */
	var _class = function({ schema, messages, index }, path, context) {
		const src = [];

		const className = schema.instanceOf.name ? schema.instanceOf.name : "<UnknowClass>";
		if (!context.customs[index]) context.customs[index] = { schema };
		else context.customs[index].schema = schema;

		src.push(`
		if (!(value instanceof context.customs[${index}].schema.instanceOf))
			${this.makeError({ type: "classInstanceOf",  actual: "value", expected: "'" + className + "'", messages })}
	`);

		src.push(`
		return value;
	`);

		return {
			source: src.join("\n")
		};
	};

	var custom = function ({ schema, messages, index }, path, context) {
		const src = [];

		src.push(`
		${this.makeCustomValidator({ fnName: "check", path, schema, messages, context, ruleIndex: index })}
		return value;
	`);

		return {
			source: src.join("\n")
		};
	};

	const CURRENCY_REGEX = "(?=.*\\d)^(-?~1|~1-?)(([0-9]\\d{0,2}(~2\\d{3})*)|0)?(\\~3\\d{1,2})?$";
	/**	Signature: function(value, field, parent, errors, context)
	 */

	var currency = function ({schema, messages}, path, context) {
		const currencySymbol = schema.currencySymbol || null;
		const thousandSeparator = schema.thousandSeparator || ",";
		const decimalSeparator = schema.decimalSeparator || ".";
		const customRegex = schema.customRegex;
		let isCurrencySymbolMandatory = !schema.symbolOptional;
		let finalRegex = CURRENCY_REGEX.replace(/~1/g, currencySymbol ? (`\\${currencySymbol}${(isCurrencySymbolMandatory ? "" : "?")}`) : "")
			.replace("~2", thousandSeparator)
			.replace("~3", decimalSeparator);


		const src = [];

		src.push(`
		if (!value.match(${customRegex || new RegExp(finalRegex)})) {
			${this.makeError({ type: "currency", actual: "value", messages })}
			return value;
		}

		return value;
	`);

		return {
			source: src.join("\n")
		};
	};

	/**	Signature: function(value, field, parent, errors, context)
	 */
	var date = function({ schema, messages }, path, context) {
		const src = [];
		let sanitized = false;

		src.push(`
		var origValue = value;
	`);

		if (schema.convert === true) {
			sanitized = true;
			src.push(`
			if (!(value instanceof Date)) {
				value = new Date(value.length && !isNaN(+value) ? +value : value);
			}
		`);
		}

		src.push(`
		if (!(value instanceof Date) || isNaN(value.getTime()))
			${this.makeError({ type: "date",  actual: "origValue", messages })}

		return value;
	`);

		return {
			sanitized,
			source: src.join("\n")
		};
	};

	const PRECISE_PATTERN = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	const BASIC_PATTERN = /^\S+@\S+\.\S+$/;

	/**	Signature: function(value, field, parent, errors, context)
	 */
	var email = function({ schema, messages }, path, context) {
		const src = [];

		const pattern = schema.mode == "precise" ? PRECISE_PATTERN : BASIC_PATTERN;
		let sanitized = false;

		src.push(`
		if (typeof value !== "string") {
			${this.makeError({ type: "string",  actual: "value", messages })}
			return value;
		}
	`);

		if (!schema.empty) {
			src.push(`
			if (value.length === 0) {
				${this.makeError({ type: "emailEmpty", actual: "value", messages })}
				return value;
			}
		`);
		} else {
			src.push(`
			if (value.length === 0) return value;
		`);
		}

		if (schema.normalize) {
			sanitized = true;
			src.push(`
			value = value.trim().toLowerCase();
		`);
		}

		if (schema.min != null) {
			src.push(`
			if (value.length < ${schema.min}) {
				${this.makeError({ type: "emailMin", expected: schema.min, actual: "value.length", messages })}
			}
		`);
		}

		if (schema.max != null) {
			src.push(`
			if (value.length > ${schema.max}) {
				${this.makeError({ type: "emailMax", expected: schema.max, actual: "value.length", messages })}
			}
		`);
		}

		src.push(`
		if (!${pattern.toString()}.test(value)) {
			${this.makeError({ type: "email",  actual: "value", messages })}
		}

		return value;
	`);

		return {
			sanitized,
			source: src.join("\n")
		};
	};

	/**	Signature: function(value, field, parent, errors, context)
	 */
	var _enum = function({ schema, messages }, path, context) {
		const enumStr = JSON.stringify(schema.values || []);
		return {
			source: `
			if (${enumStr}.indexOf(value) === -1)
				${this.makeError({ type: "enumValue", expected: "\"" + schema.values.join(", ") + "\"", actual: "value", messages })}
			
			return value;
		`
		};
	};

	/**	Signature: function(value, field, parent, errors, context)
	 */
	var equal = function({ schema, messages }, path, context) {
		const src = [];

		if (schema.field) {
			if (schema.strict) {
				src.push(`
				if (value !== parent["${schema.field}"])
			`);
			} else {
				src.push(`
				if (value != parent["${schema.field}"])
			`);
			}
			src.push(`
				${this.makeError({ type: "equalField",  actual: "value", expected: JSON.stringify(schema.field), messages })}
		`);
		} else {
			if (schema.strict) {
				src.push(`
				if (value !== ${JSON.stringify(schema.value)})
			`);
			} else {
				src.push(`
				if (value != ${JSON.stringify(schema.value)})
			`);
			}
			src.push(`
				${this.makeError({ type: "equalValue",  actual: "value", expected: JSON.stringify(schema.value), messages })}
		`);
		}

		src.push(`
		return value;
	`);

		return {
			source: src.join("\n")
		};
	};

	/**	Signature: function(value, field, parent, errors, context)
	 */
	var forbidden = function checkForbidden({ schema, messages }, path, context) {
		const src = [];

		src.push(`
		if (value !== null && value !== undefined) {
	`);

		if (schema.remove) {
			src.push(`
			return undefined;
		`);

		} else {
			src.push(`
			${this.makeError({ type: "forbidden",  actual: "value", messages })}
		`);
		}

		src.push(`
		}

		return value;
	`);

		return {
			source: src.join("\n")
		};
	};

	/**	Signature: function(value, field, parent, errors, context)
	 */
	var _function = function({ schema, messages }, path, context) {
		return {
			source: `
			if (typeof value !== "function")
				${this.makeError({ type: "function",  actual: "value", messages })}

			return value;
		`
		};
	};

	/**	Signature: function(value, field, parent, errors, context)
	 */
	var multi = function({ schema, messages }, path, context) {
		const src = [];

		src.push(`
		var hasValid = false;
		var newVal = value;
		var checkErrors = [];
		var errorsSize = errors.length;
	`);

		for (let i = 0; i < schema.rules.length; i++) {
			src.push(`
			if (!hasValid) {
				var _errors = [];
		`);

			const rule = this.getRuleFromSchema(schema.rules[i]);
			src.push(this.compileRule(rule, context, path, `var tmpVal = ${context.async ? "await " : ""}context.fn[%%INDEX%%](value, field, parent, _errors, context);`, "tmpVal"));
			src.push(`
				if (errors.length == errorsSize && _errors.length == 0) {
					hasValid = true;
					newVal = tmpVal;
				} else {
					Array.prototype.push.apply(checkErrors, [].concat(_errors, errors.splice(errorsSize)));
				}
			}
		`);
		}

		src.push(`
		if (!hasValid) {
			Array.prototype.push.apply(errors, checkErrors);
		}

		return newVal;
	`);

		return {
			source: src.join("\n")
		};
	};

	/**	Signature: function(value, field, parent, errors, context)
	 */
	var number = function({ schema, messages }, path, context) {
		const src = [];

		src.push(`
		var origValue = value;
	`);

		let sanitized = false;
		if (schema.convert === true) {
			sanitized = true;
			src.push(`
			if (typeof value !== "number") {
				value = Number(value);
			}
		`);
		}

		src.push(`
		if (typeof value !== "number" || isNaN(value) || !isFinite(value)) {
			${this.makeError({ type: "number",  actual: "origValue", messages })}
			return value;
		}
	`);

		if (schema.min != null) {
			src.push(`
			if (value < ${schema.min}) {
				${this.makeError({ type: "numberMin", expected: schema.min, actual: "origValue", messages })}
			}
		`);
		}

		if (schema.max != null) {
			src.push(`
			if (value > ${schema.max}) {
				${this.makeError({ type: "numberMax", expected: schema.max, actual: "origValue", messages })}
			}
		`);
		}

		// Check fix value
		if (schema.equal != null) {
			src.push(`
			if (value !== ${schema.equal}) {
				${this.makeError({ type: "numberEqual", expected: schema.equal, actual: "origValue", messages })}
			}
		`);
		}

		// Check not fix value
		if (schema.notEqual != null) {
			src.push(`
			if (value === ${schema.notEqual}) {
				${this.makeError({ type: "numberNotEqual", expected: schema.notEqual, actual: "origValue", messages })}
			}
		`);
		}

		// Check integer
		if (schema.integer === true) {
			src.push(`
			if (value % 1 !== 0) {
				${this.makeError({ type: "numberInteger",  actual: "origValue", messages })}
			}
		`);
		}

		// Check positive
		if (schema.positive === true) {
			src.push(`
			if (value <= 0) {
				${this.makeError({ type: "numberPositive",  actual: "origValue", messages })}
			}
		`);
		}

		// Check negative
		if (schema.negative === true) {
			src.push(`
			if (value >= 0) {
				${this.makeError({ type: "numberNegative",  actual: "origValue", messages })}
			}
		`);
		}

		src.push(`
		return value;
	`);

		return {
			sanitized,
			source: src.join("\n")
		};
	};

	// Quick regex to match most common unquoted JavaScript property names. Note the spec allows Unicode letters.
	// Unmatched property names will be quoted and validate slighly slower. https://www.ecma-international.org/ecma-262/5.1/#sec-7.6
	const identifierRegex = /^[_$a-zA-Z][_$a-zA-Z0-9]*$/;

	// Regex to escape quoted property names for eval/new Function
	const escapeEvalRegex = /["'\\\n\r\u2028\u2029]/g;

	/* istanbul ignore next */
	function escapeEvalString(str) {
		// Based on https://github.com/joliss/js-string-escape
		return str.replace(escapeEvalRegex, function (character) {
			switch (character) {
			case "\"":
			case "'":
			case "\\":
				return "\\" + character;
				// Four possible LineTerminator characters need to be escaped:
			case "\n":
				return "\\n";
			case "\r":
				return "\\r";
			case "\u2028":
				return "\\u2028";
			case "\u2029":
				return "\\u2029";
			}
		});
	}

	/**	Signature: function(value, field, parent, errors, context)
	 */
	var object = function ({ schema, messages }, path, context) {
		const sourceCode = [];

		sourceCode.push(`
		if (typeof value !== "object" || value === null || Array.isArray(value)) {
			${this.makeError({ type: "object", actual: "value", messages })}
			return value;
		}
	`);

		const subSchema = schema.properties || schema.props;
		if (subSchema) {
			sourceCode.push("var parentObj = value;");
			sourceCode.push("var parentField = field;");

			const keys = Object.keys(subSchema).filter(key => !this.isMetaKey(key));

			for (let i = 0; i < keys.length; i++) {
				const property = keys[i];
				const rule = this.getRuleFromSchema(subSchema[property]);
				
				const name = escapeEvalString(property);
				const safeSubName = identifierRegex.test(name) ? `.${name}` : `['${name}']`;
				const safePropName = `parentObj${safeSubName}`;
				const newPath = (path ? path + "." : "") + property;

				const labelName = rule.schema.label;
				const label = labelName ? `'${escapeEvalString(labelName)}'` : undefined;

				sourceCode.push(`\n// Field: ${escapeEvalString(newPath)}`);
				sourceCode.push(`field = parentField ? parentField + "${safeSubName}" : "${name}";`);
				sourceCode.push(`value = ${safePropName};`);
				sourceCode.push(`label = ${label}`);
				const innerSource = `
				${safePropName} = ${context.async ? "await " : ""}context.fn[%%INDEX%%](value, field, parentObj, errors, context, label);
			`;
				sourceCode.push(this.compileRule(rule, context, newPath, innerSource, safePropName));
				if (this.opts.haltOnFirstError === true) {
					sourceCode.push("if (errors.length) return parentObj;");
				}
			}

			// Strict handler
			if (schema.strict) {
				const allowedProps = Object.keys(subSchema);

				sourceCode.push(`
				field = parentField;
				var invalidProps = [];
				var props = Object.keys(parentObj);

				for (let i = 0; i < props.length; i++) {
					if (${JSON.stringify(allowedProps)}.indexOf(props[i]) === -1) {
						invalidProps.push(props[i]);
					}
				}
				if (invalidProps.length) {
			`);
				if (schema.strict === "remove") {
					sourceCode.push(`
					if (errors.length === 0) {
				`);
					sourceCode.push(`
						invalidProps.forEach(function(field) {
							delete parentObj[field];
						});
				`);
					sourceCode.push(`
					}
				`);
				} else {
					sourceCode.push(`
					${this.makeError({ type: "objectStrict", expected: "\"" + allowedProps.join(", ") + "\"", actual: "invalidProps.join(', ')", messages })}
				`);
				}
				sourceCode.push(`
				}
			`);
			}
		}

		if (schema.minProps != null || schema.maxProps != null) {
			// We recalculate props, because:
			//	- if strict equals 'remove', we want to work on
			//	the payload with the extra keys removed,
			//	- if no strict is set, we need them anyway.
			if (schema.strict) {
				sourceCode.push(`
				props = Object.keys(${subSchema ? "parentObj" : "value"});
			`);
			} else {
				sourceCode.push(`
				var props = Object.keys(${subSchema ? "parentObj" : "value"});
				${subSchema ? "field = parentField;" : ""}
			`);
			}
		}

		if (schema.minProps != null) {
			sourceCode.push(`
			if (props.length < ${schema.minProps}) {
				${this.makeError({ type: "objectMinProps", expected: schema.minProps, actual: "props.length", messages })}
			}
		`);
		}

		if (schema.maxProps != null) {
			sourceCode.push(`
			if (props.length > ${schema.maxProps}) {
				${this.makeError({ type: "objectMaxProps", expected: schema.maxProps, actual: "props.length", messages })}
			}
		`);
		}

		if (subSchema) {
			sourceCode.push(`
			return parentObj;
		`);
		} else {
			sourceCode.push(`
			return value;
		`);
		}

		return {
			source: sourceCode.join("\n")
		};
	};

	/**	Signature: function(value, field, parent, errors, context)
	 */
	var objectID = function({ schema, messages, index }, path, context) {
		const src = [];

		if (!context.customs[index]) context.customs[index] = { schema };
		else context.customs[index].schema = schema;

		src.push(`
		const ObjectID = context.customs[${index}].schema.ObjectID;
		if (!ObjectID.isValid(value)) {
			${this.makeError({ type: "objectID", actual: "value", messages })}
			return;
		}
	`);

		if (schema.convert === true) src.push("return new ObjectID(value)");
		else if (schema.convert === "hexString") src.push("return value.toString()");
		else src.push("return value");

		return {
			source: src.join("\n")
		};
	};

	function patchKeyRuleMessages(rule) {
		for (const type in rule.messages) {
			if (type.startsWith("string")) {
				rule.messages[type] = rule.messages[type].replace(" field ", " key ");
			}
		}
	}

	var record = function compileRecordRule({ schema, messages }, path, context) {
		const sourceCode = [];
		sourceCode.push(`
		if (typeof value !== "object" || value === null || Array.isArray(value)) {
			${this.makeError({ type: "record", actual: "value", messages })}
			return value;
		}
	`);

		const keyRuleName = schema.key || "string";
		const valueRuleName = schema.value || "any";

		sourceCode.push(`
		const record = value;
		let sanitizedKey, sanitizedValue;
		const result = {};
		for (let key in value) {
	`);

		sourceCode.push("sanitizedKey = value = key;");

		const keyRule = this.getRuleFromSchema(keyRuleName);
		patchKeyRuleMessages(keyRule);
		const keyInnerSource = `
		sanitizedKey = ${context.async ? "await " : ""}context.fn[%%INDEX%%](key, field ? field + "." + key : key, record, errors, context);
	`;
		sourceCode.push(this.compileRule(keyRule, context, null, keyInnerSource, "sanitizedKey"));
		sourceCode.push("sanitizedValue = value = record[key];");

		const valueRule = this.getRuleFromSchema(valueRuleName);
		const valueInnerSource = `
		sanitizedValue = ${context.async ? "await " : ""}context.fn[%%INDEX%%](value, field ? field + "." + key : key, record, errors, context);
	`;
		sourceCode.push(this.compileRule(valueRule, context, `${path}[key]`, valueInnerSource, "sanitizedValue"));
		sourceCode.push("result[sanitizedKey] = sanitizedValue;");
		sourceCode.push(`
		}
	`);
		sourceCode.push("return result;");

		return {
			source: sourceCode.join("\n")
		};
	};

	const NUMERIC_PATTERN = /^-?[0-9]\d*(\.\d+)?$/;
	const ALPHA_PATTERN = /^[a-zA-Z]+$/;
	const ALPHANUM_PATTERN = /^[a-zA-Z0-9]+$/;
	const ALPHADASH_PATTERN = /^[a-zA-Z0-9_-]+$/;
	const HEX_PATTERN = /^[0-9a-fA-F]+$/;
	const BASE64_PATTERN = /^(?:[A-Za-z0-9+\\/]{4})*(?:[A-Za-z0-9+\\/]{2}==|[A-Za-z0-9+/]{3}=)?$/;

	/**	Signature: function(value, field, parent, errors, context)
	 */
	var string = function checkString({ schema, messages }, path, context) {
		const src = [];
		let sanitized = false;

		if (schema.convert === true) {
			sanitized = true;
			src.push(`
			if (typeof value !== "string") {
				value = String(value);
			}
		`);
		}

		src.push(`
		if (typeof value !== "string") {
			${this.makeError({ type: "string", actual: "value", messages })}
			return value;
		}

		var origValue = value;
	`);

		if (schema.trim) {
			sanitized = true;
			src.push(`
			value = value.trim();
		`);
		}

		if (schema.trimLeft) {
			sanitized = true;
			src.push(`
			value = value.trimLeft();
		`);
		}

		if (schema.trimRight) {
			sanitized = true;
			src.push(`
			value = value.trimRight();
		`);
		}

		if (schema.padStart) {
			sanitized = true;
			const padChar = schema.padChar != null ? schema.padChar : " ";
			src.push(`
			value = value.padStart(${schema.padStart}, ${JSON.stringify(padChar)});
		`);
		}

		if (schema.padEnd) {
			sanitized = true;
			const padChar = schema.padChar != null ? schema.padChar : " ";
			src.push(`
			value = value.padEnd(${schema.padEnd}, ${JSON.stringify(padChar)});
		`);
		}

		if (schema.lowercase) {
			sanitized = true;
			src.push(`
			value = value.toLowerCase();
		`);
		}

		if (schema.uppercase) {
			sanitized = true;
			src.push(`
			value = value.toUpperCase();
		`);
		}

		if (schema.localeLowercase) {
			sanitized = true;
			src.push(`
			value = value.toLocaleLowerCase();
		`);
		}

		if (schema.localeUppercase) {
			sanitized = true;
			src.push(`
			value = value.toLocaleUpperCase();
		`);
		}

		src.push(`
			var len = value.length;
	`);

		if (schema.empty === false) {
			src.push(`
			if (len === 0) {
				${this.makeError({ type: "stringEmpty",  actual: "value", messages })}
			}
		`);
		} else if (schema.empty === true) {
			src.push(`
			if (len === 0) {
				return value;
			}
		`);
		}

		if (schema.min != null) {
			src.push(`
			if (len < ${schema.min}) {
				${this.makeError({ type: "stringMin", expected: schema.min, actual: "len", messages })}
			}
		`);
		}

		if (schema.max != null) {
			src.push(`
			if (len > ${schema.max}) {
				${this.makeError({ type: "stringMax", expected: schema.max, actual: "len", messages })}
			}
		`);
		}

		if (schema.length != null) {
			src.push(`
			if (len !== ${schema.length}) {
				${this.makeError({ type: "stringLength", expected: schema.length, actual: "len", messages })}
			}
		`);
		}

		if (schema.pattern != null) {
			let pattern = schema.pattern;
			if (typeof schema.pattern == "string")
				pattern = new RegExp(schema.pattern, schema.patternFlags);

			src.push(`
			if (!${pattern.toString()}.test(value)) {
				${this.makeError({ type: "stringPattern", expected: `"${pattern.toString().replace(/"/g, "\\$&")}"`, actual: "origValue", messages })}
			}
		`);
		}

		if (schema.contains != null) {
			src.push(`
			if (value.indexOf("${schema.contains}") === -1) {
				${this.makeError({ type: "stringContains", expected: "\"" + schema.contains + "\"", actual: "origValue", messages })}
			}
		`);
		}

		if (schema.enum != null) {
			const enumStr = JSON.stringify(schema.enum);
			src.push(`
			if (${enumStr}.indexOf(value) === -1) {
				${this.makeError({ type: "stringEnum", expected: "\"" + schema.enum.join(", ") + "\"", actual: "origValue", messages })}
			}
		`);
		}

		if (schema.numeric === true) {
			src.push(`
			if (!${NUMERIC_PATTERN.toString()}.test(value) ) {
				${this.makeError({ type: "stringNumeric",  actual: "origValue", messages })}
			}
		`);
		}

		if(schema.alpha === true) {
			src.push(`
			if(!${ALPHA_PATTERN.toString()}.test(value)) {
				${this.makeError({ type: "stringAlpha",  actual: "origValue", messages })}
			}
		`);
		}

		if(schema.alphanum === true) {
			src.push(`
			if(!${ALPHANUM_PATTERN.toString()}.test(value)) {
				${this.makeError({ type: "stringAlphanum",  actual: "origValue", messages })}
			}
		`);
		}

		if(schema.alphadash === true) {
			src.push(`
			if(!${ALPHADASH_PATTERN.toString()}.test(value)) {
				${this.makeError({ type: "stringAlphadash",  actual: "origValue", messages })}
			}
		`);
		}

		if(schema.hex === true) {
			src.push(`
			if(value.length % 2 !== 0 || !${HEX_PATTERN.toString()}.test(value)) {
				${this.makeError({ type: "stringHex",  actual: "origValue", messages })}
			}
		`);
		}

		if(schema.singleLine === true) {
			src.push(`
			if(value.includes("\\n")) {
				${this.makeError({ type: "stringSingleLine", messages })}
			}
		`);
		}


		if(schema.base64 === true) {
			src.push(`
			if(!${BASE64_PATTERN.toString()}.test(value)) {
				${this.makeError({ type: "stringBase64",  actual: "origValue", messages })}
			}
		`);
		}

		src.push(`
		return value;
	`);

		return {
			sanitized,
			source: src.join("\n")
		};
	};

	/**	Signature: function(value, field, parent, errors, context)
	 */
	var tuple = function ({ schema, messages }, path, context) {
		const src = [];

		if (schema.items != null) {
			if (!Array.isArray(schema.items)) {
				throw new Error(`Invalid '${schema.type}' schema. The 'items' field must be an array.`);
			}

			if (schema.items.length === 0) {
				throw new Error(`Invalid '${schema.type}' schema. The 'items' field must not be an empty array.`);
			}
		}

		src.push(`
		if (!Array.isArray(value)) {
			${this.makeError({ type: "tuple", actual: "value", messages })}
			return value;
		}

		var len = value.length;
	`);


		if (schema.empty === false) {
			src.push(`
			if (len === 0) {
				${this.makeError({ type: "tupleEmpty", actual: "value", messages })}
				return value;
			}
		`);
		}

		if (schema.items != null) {
			src.push(`
			if (${schema.empty} !== false && len === 0) {
				return value;
			}

			if (len !== ${schema.items.length}) {
				${this.makeError({type: "tupleLength", expected: schema.items.length, actual: "len", messages})}
				return value;
			}
		`);

			src.push(`
			var arr = value;
			var parentField = field;
		`);

			for (let i = 0; i < schema.items.length; i++) {
				src.push(`
			value = arr[${i}];
		`);

				const itemPath = `${path}[${i}]`;
				const rule = this.getRuleFromSchema(schema.items[i]);
				const innerSource = `
			arr[${i}] = ${context.async ? "await " : ""}context.fn[%%INDEX%%](arr[${i}], (parentField ? parentField : "") + "[" + ${i} + "]", parent, errors, context);
		`;
				src.push(this.compileRule(rule, context, itemPath, innerSource, `arr[${i}]`));
			}
			src.push(`
		return arr;
	`);
		} else {
			src.push(`
		return value;
	`);
		}

		return {
			source: src.join("\n")
		};
	};

	const PATTERN = /^https?:\/\/\S+/;
	//const PATTERN = /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,}))\.?)(?::\d{2,5})?(?:[/?#]\S*)?$/i;
	//const PATTERN = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;

	/**	Signature: function(value, field, parent, errors, context)
	 */
	var url = function ({ schema, messages }, path, context) {
		const src = [];

		src.push(`
		if (typeof value !== "string") {
			${this.makeError({ type: "string", actual: "value", messages })}
			return value;
		}
	`);

		if (!schema.empty) {
			src.push(`
			if (value.length === 0) {
				${this.makeError({ type: "urlEmpty", actual: "value", messages })}
				return value;
			}
		`);
		} else {
			src.push(`
			if (value.length === 0) return value;
		`);
		}

		src.push(`
		if (!${PATTERN.toString()}.test(value)) {
			${this.makeError({ type: "url", actual: "value", messages })}
		}

		return value;
	`);

		return {
			source: src.join("\n"),
		};
	};

	const PATTERN$1 = /^([0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[0-9a-f]{4}-[0-9a-f]{12}|[0]{8}-[0]{4}-[0]{4}-[0]{4}-[0]{12})$/i;

	/**	Signature: function(value, field, parent, errors, context)
	 */
	var uuid = function({ schema, messages }, path) {
		const src = [];
		src.push(`
		if (typeof value !== "string") {
			${this.makeError({ type: "string",  actual: "value", messages })}
			return value;
		}

		var val = value.toLowerCase();
		if (!${PATTERN$1.toString()}.test(val)) {
			${this.makeError({ type: "uuid",  actual: "value", messages })}
			return value;
		}

		const version = val.charAt(14) | 0;
	`);

		if(parseInt(schema.version) < 9) {
			src.push(`
			if (${schema.version} !== version) {
				${this.makeError({ type: "uuidVersion", expected: schema.version, actual: "version", messages })}
				return value;
			}
		`);
		}

		src.push(`
		switch (version) {
		case 0:
		case 1:
		case 2:
		case 6:
			break;
		case 3:
		case 4:
		case 5:
  		case 7:
		case 8:
			if (["8", "9", "a", "b"].indexOf(val.charAt(19)) === -1) {
				${this.makeError({ type: "uuid",  actual: "value", messages })}
			}
		}

		return value;
	`);

		return {
			source: src.join("\n")
		};
	};

	const PATTERN$2 = /^((([a-f0-9][a-f0-9]+[-]){5}|([a-f0-9][a-f0-9]+[:]){5})([a-f0-9][a-f0-9])$)|(^([a-f0-9][a-f0-9][a-f0-9][a-f0-9]+[.]){2}([a-f0-9][a-f0-9][a-f0-9][a-f0-9]))$/i;

	/**	Signature: function(value, field, parent, errors, context)
	 */
	var mac = function({ schema, messages }, path, context) {
		return {
			source: `
			if (typeof value !== "string") {
				${this.makeError({ type: "string",  actual: "value", messages })}
				return value;
			}

			var v = value.toLowerCase();
			if (!${PATTERN$2.toString()}.test(v)) {
				${this.makeError({ type: "mac",  actual: "value", messages })}
			}
			
			return value;
		`
		};
	};

	/**
	 * Luhn algorithm checksum https://en.wikipedia.org/wiki/Luhn_algorithm
	 * Credit Card numbers, IMEI numbers, National Provider Identifier numbers and others
	 * @param value
	 * @param schema
	 * @return {boolean|{actual, expected, type}|ValidationError}
	 *
	 *	Signature: function(value, field, parent, errors, context)
	 */
	var luhn = function({ schema, messages }, path, context) {
		return {
			source: `
			if (typeof value !== "string") {
				${this.makeError({ type: "string",  actual: "value", messages })}
				return value;
			}

			if (typeof value !== "string")
				value = String(value);

			val = value.replace(/\\D+/g, "");

			var array = [0, 2, 4, 6, 8, 1, 3, 5, 7, 9];
			var len = val ? val.length : 0,
				bit = 1,
				sum = 0;
			while (len--) {
				sum += !(bit ^= 1) ? parseInt(val[len], 10) : array[val[len]];
			}

			if (!(sum % 10 === 0 && sum > 0)) {
				${this.makeError({ type: "luhn",  actual: "value", messages })}
			}

			return value;
		`
		};
	};

	// globals window
	let prettier, prettierOpts;
	let hljs, hljsOpts;

	var prettier_1 = function(source) {
		if (!prettier) {
			prettier = commonjsRequire();
			prettierOpts = {
				parser: "babel",
				useTabs: false,
				printWidth: 120,
				trailingComma: "none",
				tabWidth: 4,
				singleQuote: false,
				semi: true,
				bracketSpacing: true
			};

			hljs = commonjsRequire();
			hljsOpts = {
				language: "js",
				theme: hljs.fromJson({
					keyword: ["white", "bold"],
					built_in: "magenta",
					literal: "cyan",
					number: "magenta",
					regexp: "red",
					string: ["yellow", "bold"],
					symbol: "plain",
					class: "blue",
					attr: "plain",
					function: ["white", "bold"],
					title: "plain",
					params: "green",
					comment: "grey"
				})
			};
		}

		const res = prettier.format(source, prettierOpts);
		return hljs.highlight(res, hljsOpts);
	};

	let AsyncFunction;
	try {
		AsyncFunction = (new Function("return Object.getPrototypeOf(async function(){}).constructor"))();
	} catch(err) { /* async is not supported */}




	function loadMessages() {
		return Object.assign({} , messages);
	}

	function loadRules() {
		return {
			any: any,
			array: array,
			boolean: boolean_1,
			class: _class,
			custom: custom,
			currency: currency,
			date: date,
			email: email,
			enum: _enum,
			equal: equal,
			forbidden: forbidden,
			function: _function,
			multi: multi,
			number: number,
			object: object,
			objectID: objectID,
			record: record,
			string: string,
			tuple: tuple,
			url: url,
			uuid: uuid,
			mac: mac,
			luhn: luhn
		};
	}

	/**
	 * Fastest Validator
	 */
	class Validator {

		/**
		 * Validator class constructor
		 *
		 * @param {Object} opts
		 */
		constructor(opts) {
			this.opts = {};
			this.defaults = {};
			this.messages = loadMessages();
			this.rules = loadRules();
			this.aliases = {};
			this.cache = new Map();
			this.customFunctions = {};

			if (opts) {
				deepExtend_1(this.opts, opts);
				if (opts.defaults) deepExtend_1(this.defaults, opts.defaults);

				if (opts.messages) {
					for (const messageName in opts.messages) this.addMessage(messageName, opts.messages[messageName]);
				}

				if (opts.aliases) {
					for (const aliasName in opts.aliases) this.alias(aliasName, opts.aliases[aliasName]);
				}

				if (opts.customRules) {
					for (const ruleName in opts.customRules) this.add(ruleName, opts.customRules[ruleName]);
				}

				if (opts.customFunctions) {
					for (const customName in opts.customFunctions) this.addCustomFunction(customName, opts.customFunctions[customName]);
				}

				if (opts.plugins) {
					const plugins = opts.plugins;
					if (!Array.isArray(plugins)) throw new Error("Plugins type must be array");
					plugins.forEach(this.plugin.bind(this));
				}

				/* istanbul ignore next */
				if (this.opts.debug) {
					let formatter = function (code) { return code; };
					if (typeof window === "undefined") {
						formatter = prettier_1;
					}

					this._formatter = formatter;
				}
			}
		}

		/**
		 * Validate an object by schema
		 *
		 * @param {Object} obj
		 * @param {Object} schema
		 * @returns {Array<Object>|boolean}
		 */
		validate(obj, schema) {
			const check = this.compile(schema);
			return check(obj);
		}

		/**
		 * Wrap a source code with `required` & `optional` checker codes.
		 * @param {Object} rule
		 * @param {String} innerSrc
		 * @param {String?} resVar
		 * @returns {String}
		 */
		wrapRequiredCheckSourceCode(rule, innerSrc, context, resVar) {
			const src = [];
			const {considerNullAsAValue = false} = this.opts;
			let handleNoValue;

			let skipUndefinedValue = rule.schema.optional === true || rule.schema.type === "forbidden";
			let skipNullValue = considerNullAsAValue ?
				rule.schema.nullable !== false || rule.schema.type === "forbidden" :
				rule.schema.optional === true || rule.schema.nullable === true || rule.schema.type === "forbidden";

			const ruleHasDefault = considerNullAsAValue ?
				rule.schema.default != undefined && rule.schema.default != null :
				rule.schema.default != undefined;

			if (ruleHasDefault) {
				// We should set default-value when value is undefined or null, not skip! (Except when null is allowed)
				skipUndefinedValue = false;
				if (considerNullAsAValue) {
					if (rule.schema.nullable === false) skipNullValue = false;
				} else {
					if (rule.schema.nullable !== true) skipNullValue = false;
				}

				let defaultValue;
				if (typeof rule.schema.default === "function") {
					if (!context.customs[rule.index]) context.customs[rule.index] = {};
					context.customs[rule.index].defaultFn = rule.schema.default;
					defaultValue = `context.customs[${rule.index}].defaultFn.call(this, context.rules[${rule.index}].schema, field, parent, context)`;
				} else {
					defaultValue = JSON.stringify(rule.schema.default);
				}

				handleNoValue = `
				value = ${defaultValue};
				${resVar} = value;
			`;

			} else {
				handleNoValue = this.makeError({ type: "required", actual: "value", messages: rule.messages });
			}


			src.push(`
			${`if (value === undefined) { ${skipUndefinedValue ? "\n// allow undefined\n" : handleNoValue} }`}
			${`else if (value === null) { ${skipNullValue ? "\n// allow null\n" : handleNoValue} }`}
			${innerSrc ? `else { ${innerSrc} }` : ""}
		`);
			return src.join("\n");
		}

		/**
		 * check if the key is a meta key
		 *
		 * @param key
		 * @return {boolean}
		 */
		isMetaKey(key) {
			return key.startsWith("$$");
		}
		/**
		 * will remove all "metas" keys (keys starting with $$)
		 *
		 * @param obj
		 */
		removeMetasKeys(obj) {
			Object.keys(obj).forEach(key => {
				if(!this.isMetaKey(key)) {
					return;
				}

				delete obj[key];
			});
		}

		/**
		 * Compile a schema
		 *
		 * @param {Object} schema
		 * @throws {Error} Invalid schema
		 * @returns {Function}
		 */
		compile(schema) {
			if (schema === null || typeof schema !== "object") {
				throw new Error("Invalid schema.");
			}

			const self = this;
			const context = {
				index: 0,
				async: schema.$$async === true,
				rules: [],
				fn: [],
				customs: {},
				customFunctions : this.customFunctions,
				utils: {
					replace,
				},
			};
			this.cache.clear();
			delete schema.$$async;

			/* istanbul ignore next */
			if (context.async && !AsyncFunction) {
				throw new Error("Asynchronous mode is not supported.");
			}

			if (schema.$$root !== true) {
				if (Array.isArray(schema)) {
					const rule = this.getRuleFromSchema(schema);
					schema = rule.schema;
				} else {
					const prevSchema = Object.assign({}, schema);
					schema = {
						type: "object",
						strict: prevSchema.$$strict,
						properties: prevSchema
					};

					this.removeMetasKeys(prevSchema);
				}
			}

			const sourceCode = [
				"var errors = [];",
				"var field;",
				"var parent = null;",
				`var label = ${schema.label ? "\"" + schema.label + "\"" : "null"};`
			];

			const rule = this.getRuleFromSchema(schema);
			sourceCode.push(this.compileRule(rule, context, null, `${context.async ? "await " : ""}context.fn[%%INDEX%%](value, field, null, errors, context, label);`, "value"));

			sourceCode.push("if (errors.length) {");
			sourceCode.push(`
			return errors.map(err => {
				if (err.message) {
					err.message = context.utils.replace(err.message, /\\{field\\}/g, err.label || err.field);
					err.message = context.utils.replace(err.message, /\\{expected\\}/g, err.expected);
					err.message = context.utils.replace(err.message, /\\{actual\\}/g, err.actual);
				}
				if(!err.label) delete err.label
				return err;
			});
		`);

			sourceCode.push("}");
			sourceCode.push("return true;");

			const src = sourceCode.join("\n");

			const FnClass = context.async ? AsyncFunction : Function;
			const checkFn = new FnClass("value", "context", src);

			/* istanbul ignore next */
			if (this.opts.debug) {
				console.log(this._formatter("// Main check function\n" + checkFn.toString())); // eslint-disable-line no-console
			}

			this.cache.clear();

			const resFn = function (data, opts) {
				context.data = data;
				if (opts && opts.meta)
					context.meta = opts.meta;
				return checkFn.call(self, data, context);
			};
			resFn.async = context.async;
			return resFn;
		}

		/**
		 * Compile a rule to source code.
		 * @param {Object} rule
		 * @param {Object} context
		 * @param {String} path
		 * @param {String} innerSrc
		 * @param {String} resVar
		 * @returns {String}
		 */
		compileRule(rule, context, path, innerSrc, resVar) {
			const sourceCode = [];

			const item = this.cache.get(rule.schema);
			if (item) {
				// Handle cyclic schema
				rule = item;
				rule.cycle = true;
				rule.cycleStack = [];
				sourceCode.push(this.wrapRequiredCheckSourceCode(rule, `
				var rule = context.rules[${rule.index}];
				if (rule.cycleStack.indexOf(value) === -1) {
					rule.cycleStack.push(value);
					${innerSrc.replace(/%%INDEX%%/g, rule.index)}
					rule.cycleStack.pop(value);
				}
			`, context, resVar));

			} else {
				this.cache.set(rule.schema, rule);
				rule.index = context.index;
				context.rules[context.index] = rule;

				const customPath = path != null ? path : "$$root";

				context.index++;
				const res = rule.ruleFunction.call(this, rule, path, context);
				res.source = res.source.replace(/%%INDEX%%/g, rule.index);
				const FnClass = context.async ? AsyncFunction : Function;
				const fn = new FnClass("value", "field", "parent", "errors", "context", "label", res.source);
				context.fn[rule.index] = fn.bind(this);
				sourceCode.push(this.wrapRequiredCheckSourceCode(rule, innerSrc.replace(/%%INDEX%%/g, rule.index), context, resVar));
				sourceCode.push(this.makeCustomValidator({vName: resVar, path: customPath, schema: rule.schema, context, messages: rule.messages, ruleIndex: rule.index}));

				/* istanbul ignore next */
				if (this.opts.debug) {
					console.log(this._formatter(`// Context.fn[${rule.index}]\n` + fn.toString())); // eslint-disable-line no-console
				}
			}

			return sourceCode.join("\n");
		}

		/**
		 * Create a rule instance from schema definition.
		 * @param {Object} schema
		 * @returns {Object} rule
		 */
		getRuleFromSchema(schema) {
			schema = this.resolveType(schema);

			const alias = this.aliases[schema.type];
			if (alias) {
				delete schema.type;
				schema = deepExtend_1(schema, alias, { skipIfExist: true });
			}

			const ruleFunction = this.rules[schema.type];
			if (!ruleFunction)
				throw new Error("Invalid '" + schema.type + "' type in validator schema.");

			const rule = {
				messages: Object.assign({}, this.messages, schema.messages),
				schema: deepExtend_1(schema, this.defaults[schema.type], { skipIfExist: true }),
				ruleFunction: ruleFunction,
			};

			return rule;
		}

		/**
		 * Parse rule from shorthand string
		 * @param {String} str shorthand string
		 * @param {Object} schema schema reference
		 */

		parseShortHand(str) {
			const p = str.split("|").map((s) => s.trim());
			let type = p[0];
			let schema;
			if (type.endsWith("[]")) {
				schema = this.getRuleFromSchema({ type: "array", items: type.slice(0, -2) }).schema;
			} else {
				schema = {
					type: p[0],
				};
			}

			p.slice(1).forEach((s) => {
				const idx = s.indexOf(":");
				if (idx !== -1) {
					const key = s.substring(0, idx).trim();
					let value = s.substring(idx + 1).trim();
					if (value === "true" || value === "false")
						value = value === "true";
					else if (!Number.isNaN(Number(value))) {
						value = Number(value);
					}
					schema[key] = value;
				} else {
					// boolean value
					if (s.startsWith("no-")) schema[s.slice(3)] = false;
					else schema[s] = true;
				}
			});

			return schema;
		}

		/**
		 * Generate error source code.
		 * @param {Object} opts
		 * @param {String} opts.type
		 * @param {String} opts.field
		 * @param {any} opts.expected
		 * @param {any} opts.actual
		 * @param {Object} opts.messages
		 */
		makeError({ type, field, expected, actual, messages }) {
			const o = {
				type: `"${type}"`,
				message: `"${messages[type]}"`,
			};
			if (field) o.field = `"${field}"`;
			else o.field = "field";
			if (expected != null) o.expected = expected;
			if (actual != null) o.actual = actual;
			o.label = "label";

			const s = Object.keys(o)
				.map(key => `${key}: ${o[key]}`)
				.join(", ");

			return `errors.push({ ${s} });`;
		}

		/**
		 * Generate custom validator function source code.
		 * @param {Object} opts
		 * @param {String} opts.vName
		 * @param {String} opts.fnName
		 * @param {String} opts.ruleIndex
		 * @param {String} opts.path
		 * @param {Object} opts.schema
		 * @param {Object} opts.context
	 	 * @param {Object} opts.messages
		 */
		makeCustomValidator({ vName = "value", fnName = "custom", ruleIndex, path, schema, context, messages }) {
			const ruleVName = "rule" + ruleIndex;
			const fnCustomErrorsVName = "fnCustomErrors" + ruleIndex;

			if (typeof schema[fnName] == "function" || (Array.isArray(schema[fnName]))) {
				if (context.customs[ruleIndex]) {
					context.customs[ruleIndex].messages = messages;
					context.customs[ruleIndex].schema = schema;
				} else {
					context.customs[ruleIndex] = { messages, schema };
				}
				const ret = [];
				if (this.opts.useNewCustomCheckerFunction) {
					ret.push( `
               		const ${ruleVName} = context.customs[${ruleIndex}];
					const ${fnCustomErrorsVName} = [];
				`);

					if(Array.isArray(schema[fnName])){
						for (let i = 0; i < schema[fnName].length; i++) {

							let custom = schema[fnName][i];

							if (typeof custom === "string") {
								custom = this.parseShortHand(custom);
								schema[fnName][i] = custom;
							}

							const customIndex = ruleIndex*1000+i;
							context.customs[customIndex] = { messages, schema: Object.assign({}, schema, { custom, index: i }) };

							ret.push( `
							const ${ruleVName}_${i} = context.customs[${customIndex}];

					 	`);

							if(custom.type){
								ret.push( `
							 ${vName} = ${context.async ? "await " : ""}context.customFunctions[${ruleVName}.schema.${fnName}[${i}].type].call(this, ${vName}, ${fnCustomErrorsVName} , ${ruleVName}_${i}.schema, "${path}", parent, context);
							`);
							}
							if(typeof custom==="function"){
								ret.push( `
							${vName} = ${context.async ? "await " : ""}${ruleVName}.schema.${fnName}[${i}].call(this, ${vName}, ${fnCustomErrorsVName} , ${ruleVName}.schema, "${path}", parent, context);
							`);
							}
						}
					}else {
						ret.push( `
					${vName} = ${context.async ? "await " : ""}${ruleVName}.schema.${fnName}.call(this, ${vName}, ${fnCustomErrorsVName} , ${ruleVName}.schema, "${path}", parent, context);
					`);
					}

					ret.push( `
					if (Array.isArray(${fnCustomErrorsVName} )) {
                  		${fnCustomErrorsVName} .forEach(err => errors.push(Object.assign({ message: ${ruleVName}.messages[err.type], field }, err)));
					}
				`);
				}else {
					const result = "res_" + ruleVName;
					ret.push( `
					const ${ruleVName} = context.customs[${ruleIndex}];
					const ${result} = ${context.async ? "await " : ""}${ruleVName}.schema.${fnName}.call(this, ${vName}, ${ruleVName}.schema, "${path}", parent, context);
					if (Array.isArray(${result})) {
						${result}.forEach(err => errors.push(Object.assign({ message: ${ruleVName}.messages[err.type], field }, err)));
					}
			`);
				}
				return ret.join("\n");

			}
			return "";
		}

		/**
		 * Add a custom rule
		 *
		 * @param {String} type
		 * @param {Function} fn
		 */
		add(type, fn) {
			this.rules[type] = fn;
		}

		/**
		 * Add a custom function
		 *
		 * @param {String} type
		 * @param {Function} fn
		 */
		addCustomFunction(name, fn) {
			this.customFunctions[name] = fn;
		}

		/**
		 * Add a message
		 *
		 * @param {String} name
		 * @param {String} message
		 */
		addMessage(name, message) {
			this.messages[name] = message;
		}

		/**
		 * create alias name for a rule
		 *
		 * @param {String} name
		 * @param validationRule
		 */
		alias(name, validationRule) {
			if (this.rules[name]) throw new Error("Alias name must not be a rule name");
			this.aliases[name] = validationRule;
		}

		/**
		 * Add a plugin
		 *
		 * @param {Function} fn
		 */
		plugin(fn) {
			if (typeof fn !== "function") throw new Error("Plugin fn type must be function");
			return fn(this);
		}

		/**
		 * Resolve the schema 'type' by:
		 * - parsing short hands into full type definitions
		 * - expanding arrays into 'multi' types with a rules property
		 * - objects which have a root $$type property into a schema which
		 *   explicitly has a 'type' property and a 'props' property.
		 *
		 * @param schema The schema to resolve the type of
		 */
		resolveType(schema) {
			if (typeof schema === "string") {
				schema = this.parseShortHand(schema);
			} else if (Array.isArray(schema)) {
				if (schema.length === 0)
					throw new Error("Invalid schema.");

				schema = {
					type: "multi",
					rules: schema
				};

				// Check 'optional' flag
				const isOptional = schema.rules
					.map(s => this.getRuleFromSchema(s))
					.every(rule => rule.schema.optional === true);
				if (isOptional)
					schema.optional = true;

				// Check 'nullable' flag
				const nullCheck = this.opts.considerNullAsAValue ? false : true;
				const setNullable = schema.rules
					.map(s => this.getRuleFromSchema(s))
					.every(rule => rule.schema.nullable === nullCheck);
				if (setNullable)
					schema.nullable = nullCheck;
			}

			if (schema.$$type) {
				const type = schema.$$type;
				const otherShorthandProps = this.getRuleFromSchema(type).schema;
				delete schema.$$type;
				const props = Object.assign({}, schema);

				for (const key in schema) {  // clear object without changing reference
					delete schema[key];
				}

				deepExtend_1(schema, otherShorthandProps, { skipIfExist: true });
				schema.props = props;
			}

			return schema;
		}

		/**
		 * Normalize a schema, type or short hand definition by expanding it to a full form. The 'normalized'
		 * form is the equivalent schema with any short hands undone. This ensure that each rule; always includes
		 * a 'type' key, arrays always have an 'items' key, 'multi' always have a 'rules' key and objects always
		 * have their properties defined in a 'props' key
		 *
		 * @param {Object|String} value The value to normalize
		 * @returns {Object} The normalized form of the given rule or schema
		 */
		normalize(value) {
			let result = this.resolveType(value);
			if(this.aliases[result.type])
				result = deepExtend_1(result, this.normalize(this.aliases[result.type]), { skipIfExists: true});

			result = deepExtend_1(result, this.defaults[result.type], { skipIfExist: true });

			if(result.type === "multi") {
				result.rules = result.rules.map(r => this.normalize(r));
				result.optional = result.rules.every(r => r.optional === true);
				return result;
			}
			if(result.type === "array") {
				result.items = this.normalize(result.items);
				return result;
			}
			if(result.type === "object") {
				if(result.props) {
					Object.entries(result.props).forEach(([k,v]) => result.props[k] = this.normalize(v));
				}
			}
			if(typeof value === "object") {
				if(value.type) {
					const config = this.normalize(value.type);
					deepExtend_1(result, config, { skipIfExists: true });
				}
				else {
					Object.entries(value).forEach(([k,v]) => result[k] = this.normalize(v));
				}
			}

			return result;
		}
	}

	var validator = Validator;

	var fastestValidator = validator;

	const { ValidationError: ValidationError$1 } = errors;



	/**
	 * Import types
	 *
	 * @typedef {import("../service-broker")} ServiceBroker
	 * @typedef {import("../context")} Context
	 * @typedef {import("./fastest")} FastestValidatorClass
	 * @typedef {import("./fastest").FastestValidatorOptions} FastestValidatorOptions
	 * @typedef {import("./base").CheckerFunction} CheckerFunction
	 * @typedef {import("fastest-validator").default} Validator
	 */

	/**
	 * Fastest validator class
	 *
	 * @implements {FastestValidatorClass}
	 */
	class FastestValidator extends base$5 {
		/**
		 * Creates an instance of FastestValidator.
		 *
		 * @param {FastestValidatorOptions} opts
		 *
		 */
		constructor(opts) {
			super(opts);
			/** @type {FastestValidatorOptions} */
			this.opts = ___default.defaultsDeep(this.opts, {
				useNewCustomCheckerFunction: true
			});

			/** @type {Validator} */
			// @ts-ignore
			this.validator = new fastestValidator(this.opts);
		}

		/**
		 * Compile a validation schema to a checker function.
		 * Need a clone because FV manipulate the schema (removing $$... props)
		 *
		 * @param {Record<string, any>} schema
		 * @returns {CheckerFunction}
		 */
		compile(schema) {
			return this.validator.compile(___default.cloneDeep(schema));
		}

		/**
		 * Validate params against the schema
		 *
		 * @param {Record<string, any>} params
		 * @param {Record<string, any>} schema
		 * @returns {boolean}
		 */
		validate(params, schema) {
			const res = this.validator.validate(params, ___default.cloneDeep(schema));
			if (res !== true) throw new ValidationError$1("Parameters validation error!", null, res);

			return true;
		}

		/**
		 * Convert the specific validation schema to
		 * the Moleculer (fastest-validator) validation schema format.
		 *
		 * @param {Record<string, any>} schema
		 * @returns {Object}
		 */
		convertSchemaToMoleculer(schema) {
			return schema;
		}
	}

	var fastest = FastestValidator;

	const { BrokerOptionsError: BrokerOptionsError$5 } = errors;
	const { isObject: isObject$5, isString: isString$8, isInheritedClass: isInheritedClass$3 } = utils_1;

	const Validators = {
		Base: base$5,
		Fastest: fastest
	};

	function getByName$5(name) {
		/* istanbul ignore next */
		if (!name) return null;

		let n = Object.keys(Validators).find(n => n.toLowerCase() == name.toLowerCase());
		if (n) return Validators[n];
	}

	/**
	 * Resolve validator by name
	 *
	 * @param {Record<string,any>|string} opt
	 * @returns {any}
	 * @memberof ServiceBroker
	 */
	function resolve$5(opt) {
		if (isObject$5(opt) && isInheritedClass$3(opt, Validators.Base)) {
			return opt;
		} else if (isString$8(opt)) {
			let ValidatorClass = getByName$5(opt);
			if (ValidatorClass) return new ValidatorClass();

			throw new BrokerOptionsError$5(`Invalid Validator type '${opt}'.`, { type: opt });
		} else if (isObject$5(opt)) {
			let ValidatorClass = getByName$5(opt.type || "Fastest");
			if (ValidatorClass) return new ValidatorClass(opt.options);
			else
				throw new BrokerOptionsError$5(`Invalid Validator type '${opt.type}'.`, {
					type: opt.type
				});
		}

		return new Validators.Fastest();
	}

	/**
	 * Register a custom validator
	 *
	 * @param {string} name
	 * @param {any} value
	 */
	function register$5(name, value) {
		Validators[name] = value;
	}

	var validators = Object.assign(Validators, { resolve: resolve$5, register: register$5 });

	const { METRIC: METRIC$2 } = metrics;
	const { isObject: isObject$6, isFunction: isFunction$3, isDate } = utils_1;

	/**
	 * Import types
	 *
	 * @typedef {import("../service-broker")} ServiceBroker
	 * @typedef {import("../context")} Context
	 * @typedef {import("./base").CacherOptions} CacherOptions
	 * @typedef {import("./base")} CacherBaseClass
	 */

	/**
	 * Abstract cacher class
	 *
	 * @implements {CacherBaseClass}
	 */
	class Cacher {
		/**
		 * Creates an instance of Cacher.
		 *
		 * @param {CacherOptions} opts
		 *
		 * @memberof Cacher
		 */
		constructor(opts) {
			/** @type {CacherOptions} */
			this.opts = ___default.defaultsDeep(opts, {
				ttl: null,
				keygen: null,
				maxParamsLength: null,
				missingResponse: undefined
			});

			/** @type {boolean} Flag indicating the connection status */
			this.connected = null; // Init as null for backward compatibility
		}

		/**
		 * Initialize cacher
		 *
		 * @param {ServiceBroker} broker
		 *
		 * @memberof Cacher
		 */
		init(broker) {
			this.broker = broker;
			this.metrics = broker.metrics;

			if (this.broker) {
				this.logger = broker.getLogger("cacher");

				if (this.opts.prefix) {
					this.prefix = this.opts.prefix + "-";
				} else {
					this.prefix = "MOL-";
					if (this.broker.namespace) this.prefix += this.broker.namespace + "-";
				}

				this.registerMoleculerMetrics();
			}
		}

		/**
		 * Register Moleculer Transit Core metrics.
		 */
		registerMoleculerMetrics() {
			this.metrics.register({
				name: METRIC$2.MOLECULER_CACHER_GET_TOTAL,
				type: METRIC$2.TYPE_COUNTER,
				rate: true
			});
			this.metrics.register({
				name: METRIC$2.MOLECULER_CACHER_GET_TIME,
				type: METRIC$2.TYPE_HISTOGRAM,
				quantiles: true,
				unit: METRIC$2.UNIT_MILLISECONDS
			});

			this.metrics.register({
				name: METRIC$2.MOLECULER_CACHER_FOUND_TOTAL,
				type: METRIC$2.TYPE_COUNTER,
				rate: true
			});

			this.metrics.register({
				name: METRIC$2.MOLECULER_CACHER_SET_TOTAL,
				type: METRIC$2.TYPE_COUNTER,
				rate: true
			});
			this.metrics.register({
				name: METRIC$2.MOLECULER_CACHER_SET_TIME,
				type: METRIC$2.TYPE_HISTOGRAM,
				quantiles: true,
				unit: METRIC$2.UNIT_MILLISECONDS
			});

			this.metrics.register({
				name: METRIC$2.MOLECULER_CACHER_DEL_TOTAL,
				type: METRIC$2.TYPE_COUNTER,
				rate: true
			});
			this.metrics.register({
				name: METRIC$2.MOLECULER_CACHER_DEL_TIME,
				type: METRIC$2.TYPE_HISTOGRAM,
				quantiles: true,
				unit: METRIC$2.UNIT_MILLISECONDS
			});

			this.metrics.register({
				name: METRIC$2.MOLECULER_CACHER_CLEAN_TOTAL,
				type: METRIC$2.TYPE_COUNTER,
				rate: true
			});
			this.metrics.register({
				name: METRIC$2.MOLECULER_CACHER_CLEAN_TIME,
				type: METRIC$2.TYPE_HISTOGRAM,
				quantiles: true,
				unit: METRIC$2.UNIT_MILLISECONDS
			});

			this.metrics.register({
				name: METRIC$2.MOLECULER_CACHER_EXPIRED_TOTAL,
				type: METRIC$2.TYPE_COUNTER,
				rate: true
			});
		}

		/**
		 * Close cacher
		 *
		 * @memberof Cacher
		 */
		close() {
			/* istanbul ignore next */
			return Promise.resolve();
		}

		/**
		 * Get a cached content by key
		 *
		 * @param {any} key
		 *
		 * @returns {Promise<any>}
		 * @memberof Cacher
		 */
		get(key) {
			/* istanbul ignore next */
			throw new Error("Not implemented method!");
		}

		/**
		 * Get a cached content and ttl by key
		 *
		 * @param {any} key
		 * @returns {Promise<any>}
		 * @memberof Cacher
		 */
		getWithTTL(key) {
			/* istanbul ignore next */
			throw new Error("Not implemented method!");
		}

		/**
		 * Set a content by key to cache
		 *
		 * @param {any} key
		 * @param {any} data
		 * @param {Number?} ttl
		 *
		 * @returns {Promise<any>}
		 * @memberof Cacher
		 */
		set(key, data, ttl) {
			/* istanbul ignore next */
			throw new Error("Not implemented method!");
		}

		/**
		 * Delete a content by key from cache
		 *
		 * @param {string|Array<string>} key
		 *
		 * @returns {Promise<any>}
		 * @memberof Cacher
		 */
		del(key) {
			/* istanbul ignore next */
			throw new Error("Not implemented method!");
		}

		/**
		 * Clean cache. Remove every key by match
		 * /@param {string|Array<string>} match string. Default is "**"
		 * @returns {Promise<any>}
		 * @memberof Cacher
		 */
		clean(/*match = "**"*/) {
			/* istanbul ignore next */
			throw new Error("Not implemented method!");
		}

		/**
		 * Try to acquire a lock
		 *
		 * @param {string|Array<string>} key
		 * @param {number?} ttl
		 *
		 * @returns {Promise<any>}
		 * @memberof Cacher
		 */
		tryLock(key, ttl) {
			/* istanbul ignore next */
			throw new Error("Not implemented method!");
		}

		/**
		 * Acquire a lock
		 *
		 * @param {string|Array<string>} key
		 * @param {number?} ttl
		 *
		 * @returns {Promise<any>}
		 * @memberof Cacher
		 */
		lock(key, ttl) {
			/* istanbul ignore next */
			throw new Error("Not implemented method!");
		}

		/**
		 * Get a value from params or meta by `key`.
		 * If the key starts with `#` it reads from `meta`.
		 * If the key starts with `@` it reads from `headers`.
		 *
		 * @param {String} key
		 * @param {Object} params
		 * @param {Object} meta
		 * @param {Object} headers
		 * @returns {any}
		 * @memberof Cacher
		 */
		_getParamMetaValue(key, params, meta, headers) {
			if (key.startsWith("#") && meta != null) return ___default.get(meta, key.slice(1));
			if (key.startsWith("@") && headers != null) return ___default.get(headers, key.slice(1));
			else if (params != null) return ___default.get(params, key);
		}

		/**
		 * Default cache key generator
		 *
		 * @param {Object} action
		 * @param {Object} opts
		 * @param {Context} ctx
		 * @returns {String}
		 * @memberof Cacher
		 */
		defaultKeygen(action, opts, ctx) {
			if (!action) return undefined;

			const { params, meta, headers } = ctx ?? {};

			if (params || meta || headers) {
				const keyPrefix = action.name + ":";
				if (opts?.keys) {
					if (opts.keys.length == 1) {
						// Fast solution for ['id'] key
						const val = this._getParamMetaValue(opts.keys[0], params, meta, headers);
						return keyPrefix + this._hashedKey(this._generateKeyFromObject(val));
					}

					if (opts.keys.length > 0) {
						return (
							keyPrefix +
							this._hashedKey(
								opts.keys.reduce((a, key, i) => {
									const val = this._getParamMetaValue(key, params, meta, headers);
									const valKey = this._generateKeyFromObject(val);
									return (
										a +
										(i ? "|" : "") +
										(isObject$6(val) || Array.isArray(val)
											? this._hashedKey(valKey)
											: valKey)
									);
								}, "")
							)
						);
					}
				} else {
					return keyPrefix + this._hashedKey(this._generateKeyFromObject(params));
				}
			}
			return action.name;
		}

		/**
		 *  Hash key if it's too long.
		 *
		 * @param {String} key
		 * @returns {String}
		 */
		_hashedKey(key) {
			if (typeof key !== "string") key = String(key);

			const maxParamsLength = this.opts.maxParamsLength;
			if (!maxParamsLength || maxParamsLength < 44 || key.length <= maxParamsLength) return key;

			const prefixLength = maxParamsLength - 44;

			const base64Hash = crypto__default.createHash("sha256").update(key).digest("base64");
			if (prefixLength < 1) return base64Hash;

			return key.substring(0, prefixLength) + base64Hash;
		}

		_generateKeyFromObject(obj) {
			if (Array.isArray(obj)) {
				return "[" + obj.map(o => this._generateKeyFromObject(o)).join("|") + "]";
			} else if (isDate(obj)) {
				return obj.valueOf();
			} else if (isObject$6(obj)) {
				return Object.keys(obj)
					.map(key => [key, this._generateKeyFromObject(obj[key])].join("|"))
					.join("|");
			} else if (typeof obj === "string") {
				return '"' + obj + '"';
			} else if (obj != null) {
				return obj.toString();
			} else if (obj === null) {
				return "null";
			} else {
				return "undefined";
			}
		}

		/**
		 * Get a cache key by name and params.
		 * Concatenate the name and the hashed params object
		 *
		 * @param {Object} action
		 * @param {Object} opts
		 * @param {Context} ctx
		 * @returns {String}
		 */
		getCacheKey(action, opts, ctx) {
			if (opts && isFunction$3(opts.keygen)) return opts.keygen.call(this, action, opts, ctx);
			else if (isFunction$3(this.opts.keygen))
				return this.opts.keygen.call(this, action, opts, ctx);
			else return this.defaultKeygen(action, opts, ctx);
		}

		/**
		 * Register cacher as a middleware
		 *
		 * @memberof Cacher
		 */
		middleware() {
			return {
				name: "Cacher",
				localAction: (handler, action) => {
					const opts = ___default.defaultsDeep(
						{},
						isObject$6(action.cache) ? action.cache : { enabled: !!action.cache }
					);
					opts.lock = ___default.defaultsDeep(
						{},
						isObject$6(opts.lock) ? opts.lock : { enabled: !!opts.lock }
					);

					if (opts.enabled !== false) {
						const isEnabledFunction = isFunction$3(opts.enabled);

						return function cacherMiddleware(ctx) {
							if (isEnabledFunction) {
								if (!opts.enabled.call(ctx.service, ctx)) {
									// Cache is disabled. Call the handler only.
									return handler(ctx);
								}
							}

							// Disable caching with `ctx.meta.$cache = false`
							if (ctx.meta["$cache"] === false) return handler(ctx);

							// Cache is enabled but not in healthy state
							// More info: https://github.com/moleculerjs/moleculer/issues/978
							if (this.connected === false) {
								this.logger.debug(
									"Cacher is enabled but it is not connected at the moment... Calling the handler"
								);
								return handler(ctx);
							}

							const cacheKey = this.getCacheKey(action, opts, ctx);

							// Using lock
							if (opts.lock.enabled !== false) {
								return this.middlewareWithLock(ctx, cacheKey, handler, opts);
							} else {
								// Not using lock
								return this.middlewareWithoutLock(ctx, cacheKey, handler, opts);
							}
						}.bind(this);
					}

					return handler;
				}
			};
		}

		/**
		 * Middleware functionality with lock support.
		 *
		 * @param {Context} ctx
		 * @param {string} cacheKey
		 * @param {Function} handler
		 * @param {Object} opts
		 * @returns {Promise<any>}
		 */
		middlewareWithLock(ctx, cacheKey, handler, opts) {
			let cachePromise;
			if (opts.lock.staleTime && this.getWithTTL) {
				// If enable cache refresh
				cachePromise = this.getWithTTL(cacheKey).then(({ data, ttl }) => {
					if (data != null) {
						if (opts.lock.staleTime && ttl && ttl < opts.lock.staleTime) {
							// Cache is stale, try to refresh it.
							this.tryLock(cacheKey, opts.lock.ttl)
								.then(unlock => {
									return handler(ctx)
										.then(result => {
											// Save the result to the cache and release the lock.
											return this.set(cacheKey, result, opts.ttl).then(() =>
												unlock()
											);
										})
										.catch((/*err*/) => {
											return this.del(cacheKey).then(() => unlock());
										});
								})
								.catch((/*err*/) => {
									// The cache is refreshing on somewhere else.
								});
						}
					}
					return data;
				});
			} else {
				cachePromise = this.get(cacheKey);
			}

			return cachePromise.then(data => {
				if (data !== this.opts.missingResponse) {
					// Found in the cache! Don't call handler, return with the content
					ctx.cachedResult = true;
					return data;
				}
				// Not found in the cache! Acquire a lock
				return this.lock(cacheKey, opts.lock.ttl).then(unlock => {
					return this.get(cacheKey).then(content => {
						if (content != null) {
							// Cache found. Realse the lock and return the value.
							ctx.cachedResult = true;
							return unlock().then(() => {
								return content;
							});
						}
						// Call the handler
						return handler(ctx)
							.then(result => {
								// Save the result to the cache and realse the lock.
								this.set(cacheKey, result, opts.ttl).then(() => unlock());
								return result;
							})
							.catch(e => {
								return unlock().then(() => {
									return Promise.reject(e);
								});
							});
					});
				});
			});
		}

		/**
		 * Middleware functionality without lock support.
		 *
		 * @param {Context} ctx
		 * @param {string} cacheKey
		 * @param {Function} handler
		 * @param {Object} opts
		 * @returns {Promise<any>}
		 */
		middlewareWithoutLock(ctx, cacheKey, handler, opts) {
			return this.get(cacheKey).then(content => {
				if (content !== this.opts.missingResponse) {
					// Found in the cache! Don't call handler, return with the content
					ctx.cachedResult = true;
					return content;
				}

				// Call the handler
				return handler(ctx).then(result => {
					// Save the result to the cache
					this.set(cacheKey, result, opts.ttl);

					return result;
				});
			});
		}

		/**
		 * Return all cache keys with available properties (ttl, lastUsed, ...etc).
		 *
		 * @returns {Promise<Array<Object>>}
		 */
		getCacheKeys() {
			// Not available
			return Promise.resolve(null);
		}
	}

	var base$6 = Cacher;

	/*
	 * moleculer
	 * Copyright (c) 2023 MoleculerJS (https://github.com/moleculerjs/moleculer)
	 * MIT Licensed
	 */

	/**
	 * @typedef {import("./lock")} LockClass
	 */

	/**
	 * @implements {LockClass}
	 */
	class Lock {
		constructor() {
			this.locked = new Map();
		}

		acquire(key /*, ttl*/) {
			let locked = this.locked.get(key);
			if (!locked) {
				// not locked
				locked = [];
				this.locked.set(key, locked);
				return Promise.resolve();
			} else {
				return new Promise(resolve => locked.push(resolve));
			}
		}

		isLocked(key) {
			return !!this.locked.get(key);
		}

		release(key) {
			let locked = this.locked.get(key);
			if (locked) {
				if (locked.length > 0) {
					locked.shift()(); // Release the lock
				} else {
					this.locked.delete(key);
				}
			}
			return Promise.resolve();
		}
	}

	var lock = Lock;

	const { METRIC: METRIC$3 } = metrics;



	/**
	 * Import types
	 *
	 * @typedef {import("../service-broker")} ServiceBroker
	 * @typedef {import("./memory")} MemoryCacherClass
	 * @typedef {import("./memory").MemoryCacherOptions} MemoryCacherOptions
	 */

	/**
	 * Cacher factory for memory cache
	 *
	 * @implements {MemoryCacherClass}
	 * @extends {BaseCacher<MemoryCacherOptions>}
	 */
	class MemoryCacher extends base$6 {
		/**
		 * Creates an instance of MemoryCacher.
		 *
		 * @param {MemoryCacherOptions?} opts
		 *
		 * @memberof MemoryCacher
		 */
		constructor(opts) {
			super(opts);

			// Cache container
			this.cache = new Map();
			// Async lock
			this._lock = new lock();
			// Start TTL timer
			this.timer = timersBrowserify.setInterval(() => {
				/* istanbul ignore next */
				this.checkTTL();
			}, 30 * 1000);
			this.timer.unref();

			// Set cloning
			this.clone = this.opts.clone === true ? ___default.cloneDeep : this.opts.clone;
		}

		/**
		 * Initialize cacher
		 *
		 * @param {ServiceBroker} broker
		 *
		 * @memberof MemoryCacher
		 */
		init(broker) {
			super.init(broker);

			this.connected = true;

			broker.localBus.on("$transporter.connected", () => {
				// Clear all entries after transporter connected. Maybe we missed some "cache.clear" events.
				return this.clean();
			});
		}

		/**
		 * Close cacher
		 *
		 * @memberof MemoryCacher
		 */
		close() {
			clearInterval(this.timer);
			return Promise.resolve();
		}

		/**
		 * Get data from cache by key
		 *
		 * @param {string} key
		 * @returns {Promise}
		 *
		 * @memberof MemoryCacher
		 */
		get(key) {
			this.logger.debug(`GET ${key}`);
			this.metrics.increment(METRIC$3.MOLECULER_CACHER_GET_TOTAL);
			const timeEnd = this.metrics.timer(METRIC$3.MOLECULER_CACHER_GET_TIME);

			if (this.cache.has(key)) {
				this.logger.debug(`FOUND ${key}`);
				this.metrics.increment(METRIC$3.MOLECULER_CACHER_FOUND_TOTAL);

				let item = this.cache.get(key);
				if (item.expire && item.expire < Date.now()) {
					this.logger.debug(`EXPIRED ${key}`);
					this.metrics.increment(METRIC$3.MOLECULER_CACHER_EXPIRED_TOTAL);
					this.cache.delete(key);
					timeEnd();
					return this.broker.Promise.resolve(this.opts.missingResponse);
				}
				const res = this.clone ? this.clone(item.data) : item.data;
				timeEnd();

				return this.broker.Promise.resolve(res);
			} else {
				timeEnd();
			}
			return this.broker.Promise.resolve(this.opts.missingResponse);
		}

		/**
		 * Save data to cache by key
		 *
		 * @param {String} key
		 * @param {any} data JSON object
		 * @param {Number} ttl Optional Time-to-Live
		 * @returns {Promise}
		 *
		 * @memberof MemoryCacher
		 */
		set(key, data, ttl) {
			this.metrics.increment(METRIC$3.MOLECULER_CACHER_SET_TOTAL);
			const timeEnd = this.metrics.timer(METRIC$3.MOLECULER_CACHER_SET_TIME);

			if (ttl == null) ttl = this.opts.ttl;

			data = this.clone ? this.clone(data) : data;

			this.cache.set(key, {
				data,
				expire: ttl ? Date.now() + ttl * 1000 : null
			});

			timeEnd();
			this.logger.debug(`SET ${key}`);

			return this.broker.Promise.resolve(data);
		}

		/**
		 * Delete a key from cache
		 *
		 * @param {string|Array<string>} key
		 * @returns {Promise}
		 *
		 * @memberof MemoryCacher
		 */
		del(key) {
			this.metrics.increment(METRIC$3.MOLECULER_CACHER_DEL_TOTAL);
			const timeEnd = this.metrics.timer(METRIC$3.MOLECULER_CACHER_DEL_TIME);

			const keys = Array.isArray(key) ? key : [key];
			keys.forEach(key => {
				this.cache.delete(key);
				this.logger.debug(`REMOVE ${key}`);
			});
			timeEnd();

			return this.broker.Promise.resolve();
		}

		/**
		 * Clean cache. Remove every key by match
		 *
		 * @param {string|Array<string>} match string. Default is "**"
		 * @returns {Promise}
		 *
		 * @memberof MemoryCacher
		 */
		clean(match = "**") {
			this.metrics.increment(METRIC$3.MOLECULER_CACHER_CLEAN_TOTAL);
			const timeEnd = this.metrics.timer(METRIC$3.MOLECULER_CACHER_CLEAN_TIME);

			const matches = Array.isArray(match) ? match : [match];
			this.logger.debug(`CLEAN ${matches.join(", ")}`);

			this.cache.forEach((value, key) => {
				if (matches.some(match => utils_1.match(key, match))) {
					this.logger.debug(`REMOVE ${key}`);
					this.cache.delete(key);
				}
			});
			timeEnd();

			return this.broker.Promise.resolve();
		}

		/**
		 * Get data and ttl from cache by key.
		 *
		 * @param {string|Array<string>} key
		 * @returns {Promise}
		 *
		 * @memberof MemoryCacher
		 */
		getWithTTL(key) {
			this.logger.debug(`GET ${key}`);
			let data = this.opts.missingResponse;
			let ttl = null;
			if (this.cache.has(key)) {
				this.logger.debug(`FOUND ${key}`);

				let item = this.cache.get(key);
				let now = Date.now();
				ttl = (item.expire - now) / 1000;
				ttl = ttl > 0 ? ttl : null;
				if (this.opts.ttl) {
					// Update expire time (hold in the cache if we are using it)
					item.expire = now + this.opts.ttl * 1000;
				}
				data = this.clone ? this.clone(item.data) : item.data;
			}
			return this.broker.Promise.resolve({ data, ttl });
		}

		/**
		 * Acquire a lock
		 *
		 * @param {string|Array<string>} key
		 * @param {Number} ttl Optional Time-to-Live
		 * @returns {Promise}
		 *
		 * @memberof MemoryCacher
		 */
		lock(key, ttl) {
			return this._lock.acquire(key, ttl).then(() => {
				return () => this._lock.release(key);
			});
		}

		/**
		 * Try to acquire a lock
		 *
		 * @param {string|Array<string>} key
		 * @param {Number} ttl Optional Time-to-Live
		 * @returns {Promise}
		 *
		 * @memberof MemoryCacher
		 */
		tryLock(key, ttl) {
			if (this._lock.isLocked(key)) {
				return this.broker.Promise.reject(new Error("Locked."));
			}
			return this._lock.acquire(key, ttl).then(() => {
				return () => this._lock.release(key);
			});
		}

		/**
		 * Check & remove the expired cache items
		 *
		 * @memberof MemoryCacher
		 */
		checkTTL() {
			let now = Date.now();
			this.cache.forEach((value, key) => {
				let item = this.cache.get(key);

				if (item.expire && item.expire < now) {
					this.logger.debug(`EXPIRED ${key}`);
					this.metrics.increment(METRIC$3.MOLECULER_CACHER_EXPIRED_TOTAL);
					this.cache.delete(key);
				}
			});
		}

		/**
		 * Return all cache keys with available properties (ttl, lastUsed, ...etc).
		 *
		 * @returns Promise<Array<Object>>
		 */
		getCacheKeys() {
			return Promise.resolve(
				Array.from(this.cache.entries()).map(([key, item]) => {
					return {
						key,
						expiresAt: item.expire
					};
				})
			);
		}
	}

	var memory = MemoryCacher;

	const { isObject: isObject$7 } = utils_1;
	const utilsMatch = utils_1.match;

	const { LRUCache: LRUCache$2 } = lruCache;
	const { METRIC: METRIC$4 } = metrics;



	/**
	 * Import types
	 *
	 * @typedef {import("../service-broker")} ServiceBroker
	 * @typedef {import("./memory-lru")} MemoryLRUCacherClass
	 * @typedef {import("./memory-lru").MemoryLRUCacherOptions} MemoryLRUCacherOptions
	 */

	/**
	 * Cacher factory for memory cache
	 *
	 * @implements {MemoryLRUCacherClass}
	 * @extends {BaseCacher<MemoryLRUCacherOptions>}
	 */
	class MemoryLRUCacher extends base$6 {
		/**
		 * Creates an instance of MemoryLRUCacher.
		 *
		 * @param {MemoryLRUCacherOptions?} opts
		 *
		 * @memberof MemoryLRUCacher
		 */
		constructor(opts) {
			super(opts);

			// Cache container
			this.cache = new LRUCache$2({
				max: this.opts.max ? this.opts.max : 1000,
				ttl: this.opts.ttl ? this.opts.ttl * 1000 : undefined,
				updateAgeOnGet: !!this.opts.ttl
			});

			// Async lock
			this._lock = new lock();
			// Start TTL timer
			this.timer = timersBrowserify.setInterval(() => {
				/* istanbul ignore next */
				this.checkTTL();
			}, 30 * 1000);
			this.timer.unref();

			// Set cloning
			this.clone = this.opts.clone === true ? ___default.cloneDeep : this.opts.clone;
		}

		/**
		 * Initialize cacher
		 *
		 * @param {ServiceBroker} broker
		 *
		 * @memberof MemoryLRUCacher
		 */
		init(broker) {
			super.init(broker);

			this.connected = true;

			broker.localBus.on("$transporter.connected", () => {
				// Clear all entries after transporter connected. Maybe we missed some "cache.clear" events.
				return this.clean();
			});

			if (
				isObject$7(this.opts.lock) &&
				this.opts.lock?.enabled !== false &&
				this.opts.lock.staleTime
			) {
				/* istanbul ignore next */
				this.logger.warn("setting lock.staleTime with MemoryLRUCacher is not supported.");
			}
		}

		/**
		 * Close cacher
		 *
		 * @memberof MemoryLRUCacher
		 */
		close() {
			clearInterval(this.timer);
			return Promise.resolve();
		}

		/**
		 * Get data from cache by key
		 *
		 * @param {any} key
		 * @returns {Promise}
		 *
		 * @memberof MemoryLRUCacher
		 */
		get(key) {
			this.logger.debug(`GET ${key}`);
			this.metrics.increment(METRIC$4.MOLECULER_CACHER_GET_TOTAL);
			const timeEnd = this.metrics.timer(METRIC$4.MOLECULER_CACHER_GET_TIME);

			if (this.cache.has(key)) {
				this.logger.debug(`FOUND ${key}`);
				this.metrics.increment(METRIC$4.MOLECULER_CACHER_FOUND_TOTAL);

				let item = this.cache.get(key);
				const res = this.clone ? this.clone(item) : item;
				timeEnd();

				return this.broker.Promise.resolve(res);
			} else {
				timeEnd();
			}
			return this.broker.Promise.resolve(this.opts.missingResponse);
		}

		/**
		 * Save data to cache by key
		 *
		 * @param {String} key
		 * @param {any} data JSON object
		 * @param {Number} ttl Optional Time-to-Live
		 * @returns {Promise}
		 *
		 * @memberof MemoryLRUCacher
		 */
		set(key, data, ttl) {
			this.metrics.increment(METRIC$4.MOLECULER_CACHER_SET_TOTAL);
			const timeEnd = this.metrics.timer(METRIC$4.MOLECULER_CACHER_SET_TIME);

			if (ttl == null) ttl = this.opts.ttl;

			data = this.clone ? this.clone(data) : data;

			this.cache.set(key, data, { ttl: ttl ? ttl * 1000 : 0 });

			timeEnd();
			this.logger.debug(`SET ${key}`);

			return this.broker.Promise.resolve(data);
		}

		/**
		 * Delete a key from cache
		 *
		 * @param {string|Array<string>} key
		 * @returns {Promise}
		 *
		 * @memberof MemoryLRUCacher
		 */
		del(key) {
			this.metrics.increment(METRIC$4.MOLECULER_CACHER_DEL_TOTAL);
			const timeEnd = this.metrics.timer(METRIC$4.MOLECULER_CACHER_DEL_TIME);

			const keys = Array.isArray(key) ? key : [key];
			keys.forEach(key => {
				this.cache.delete(key);
				this.logger.debug(`REMOVE ${key}`);
			});
			timeEnd();

			return this.broker.Promise.resolve();
		}

		/**
		 * Clean cache. Remove every key by match
		 * @param {string|Array<string>} match string. Default is "**"
		 * @returns {Promise}
		 *
		 * @memberof MemoryLRUCacher
		 */
		clean(match = "**") {
			this.metrics.increment(METRIC$4.MOLECULER_CACHER_CLEAN_TOTAL);
			const timeEnd = this.metrics.timer(METRIC$4.MOLECULER_CACHER_CLEAN_TIME);

			const matches = Array.isArray(match) ? match : [match];
			this.logger.debug(`CLEAN ${matches.join(", ")}`);

			const keys = this.cache.keys();
			/** @type {any} */
			let key = keys.next();
			while (!key.done) {
				if (matches.some(m => utilsMatch(key.value, m))) {
					this.logger.debug(`REMOVE ${key.value}`);
					this.cache.delete(key.value);
				}
				key = keys.next();
			}
			timeEnd();

			return this.broker.Promise.resolve();
		}
		/**
		 * Get data and ttl from cache by key.
		 *
		 * @param {string|Array<string>} key
		 * @returns {Promise}
		 *
		 * @memberof MemoryLRUCacher
		 */
		getWithTTL(key) {
			// There are no way to get the ttl of LRU cache :(
			return this.get(key).then(data => {
				return { data, ttl: null };
			});
		}

		/**
		 * Acquire a lock
		 *
		 * @param {string|Array<string>} key
		 * @param {Number} ttl Optional Time-to-Live
		 * @returns {Promise}
		 *
		 * @memberof MemoryLRUCacher
		 */

		lock(key, ttl) {
			return this._lock.acquire(key, ttl).then(() => {
				return () => this._lock.release(key);
			});
		}

		/**
		 * Try to acquire a lock
		 *
		 * @param {string|Array<string>} key
		 * @param {Number} ttl Optional Time-to-Live
		 * @returns {Promise}
		 *
		 * @memberof MemoryLRUCacher
		 */
		tryLock(key, ttl) {
			if (this._lock.isLocked(key)) {
				return this.broker.Promise.reject(new Error("Locked."));
			}
			return this._lock.acquire(key, ttl).then(() => {
				return () => this._lock.release(key);
			});
		}

		/**
		 * Check & remove the expired cache items
		 *
		 * @memberof MemoryLRUCacher
		 */
		checkTTL() {
			this.cache.purgeStale();
		}

		/**
		 * Return all cache keys with available properties (ttl, lastUsed, ...etc).
		 *
		 * @returns Promise<Array<Object>>
		 */
		getCacheKeys() {
			const res = [];

			const keys = this.cache.keys();
			let key = keys.next();
			while (!key.done) {
				res.push({ key: key.value });
				key = keys.next();
			}

			return Promise.resolve(res);
		}
	}

	var memoryLru = MemoryLRUCacher;

	const { isObject: isObject$8, isString: isString$9, isInheritedClass: isInheritedClass$4 } = utils_1;
	const { BrokerOptionsError: BrokerOptionsError$6 } = errors;

	const Cachers = {
		Base: base$6,
		Memory: memory,
		MemoryLRU: memoryLru,
		Redis: require$$19
	};

	function getByName$6(name) {
		/* istanbul ignore next */
		if (!name) return null;

		let n = Object.keys(Cachers).find(n => n.toLowerCase() == name.toLowerCase());
		if (n) return Cachers[n];
	}

	/**
	 * Resolve cacher by name
	 *
	 * @param {Record<string,any>|string|boolean} opt
	 * @returns {any}
	 */
	function resolve$6(opt) {
		if (isObject$8(opt) && isInheritedClass$4(opt, Cachers.Base)) {
			return opt;
		} else if (opt === true) {
			return new Cachers.Memory();
		} else if (isString$9(opt)) {
			let CacherClass = getByName$6(opt);
			if (CacherClass) return new CacherClass();

			if (opt.startsWith("redis://") || opt.startsWith("rediss://")) CacherClass = Cachers.Redis;

			if (CacherClass) return new CacherClass(opt);
			else throw new BrokerOptionsError$6(`Invalid cacher type '${opt}'.`, { type: opt });
		} else if (isObject$8(opt)) {
			let CacherClass = getByName$6(opt.type || "Memory");
			if (CacherClass) return new CacherClass(opt.options);
			else throw new BrokerOptionsError$6(`Invalid cacher type '${opt.type}'.`, { type: opt.type });
		}

		return null;
	}

	function register$6(name, value) {
		Cachers[name] = value;
	}

	var cachers = Object.assign(Cachers, { resolve: resolve$6, register: register$6 });

	const { flatten } = utils_1;
	const { BrokerDisconnectedError } = errors;

	/**
	 * Import types
	 *
	 * @typedef {import("./base")} BaseTransporterClass
	 * @typedef {import("../transit")} Transit
	 * @typedef {import("../packets").Packet} Packet
	 * @typedef {import("../packets").PacketRequestPayload} PacketRequestPayload
	 * @typedef {import("../packets").PacketEventPayload} PacketEventPayload
	 */

	/**
	 * Base Transporter class
	 *
	 * @class BaseTransporter
	 * @implements {BaseTransporterClass}
	 */
	class BaseTransporter {
		/**
		 * Creates an instance of BaseTransporter.
		 *
		 * @param {Record<string,any>?} opts
		 *
		 * @memberof BaseTransporter
		 */
		constructor(opts) {
			this.opts = opts;
			this.connected = false;
			this.hasBuiltInBalancer = false;
		}

		/**
		 * Init transporter
		 *
		 * @param {Transit} transit
		 * @param {Function} messageHandler
		 * @param {Function} afterConnect
		 *
		 * @memberof BaseTransporter
		 */
		init(transit, messageHandler, afterConnect) {
			if (transit) {
				this.transit = transit;
				this.broker = transit.broker;
				this.nodeID = transit.nodeID;
				this.logger = this.broker.getLogger("transporter");

				this.prefix = "MOL";
				if (this.broker.namespace) this.prefix += "-" + this.broker.namespace;
			}
			this.messageHandler = messageHandler;
			this.afterConnect = afterConnect;
		}

		/**
		 * Connect to the transporter server
		 *
		 * @param {Function} errorHandler
		 * @returns {Promise}
		 * @memberof BaseTransporter
		 */
		connect(errorHandler) {
			/* istanbul ignore next */
			throw new Error("Not implemented!");
		}

		/**
		 * Event handler for connected.
		 *
		 * @param {boolean?} wasReconnect
		 * @returns {Promise}
		 *
		 * @memberof BaseTransporter
		 */
		onConnected(wasReconnect) {
			this.connected = true;
			if (this.afterConnect) {
				return this.afterConnect(wasReconnect);
			}

			return this.broker.Promise.resolve();
		}

		/**
		 * Disconnect from the transporter server
		 *
		 * @returns {Promise}
		 * @memberof BaseTransporter
		 */
		disconnect() {
			/* istanbul ignore next */
			throw new Error("Not implemented!");
		}

		/**
		 * Subscribe to all topics
		 *
		 * @param {Array<Object>} topics
		 * @returns {Promise}
		 *
		 * @memberof BaseTransporter
		 */
		makeSubscriptions(topics) {
			return this.broker.Promise.all(
				topics.map(({ cmd, nodeID }) => this.subscribe(cmd, nodeID))
			);
		}

		/**
		 * Process incoming messages
		 *
		 * @param {String} cmd
		 * @param {Buffer=} msg
		 * @returns {Promise}
		 * @memberof BaseTransporter
		 */
		incomingMessage(cmd, msg) {
			if (!msg) return;
			try {
				const packet = this.deserialize(cmd, msg);
				return this.messageHandler(cmd, packet);
			} catch (err) {
				this.logger.warn("Invalid incoming packet. Type:", cmd, err);
				this.logger.debug("Content:", msg.toString ? msg.toString() : msg);
			}
		}

		/**
		 * Received data. It's a wrapper for middlewares.
		 *
		 * @param {String} cmd
		 * @param {Buffer} data
		 * @returns {Promise}
		 */
		receive(cmd, data) {
			return this.incomingMessage(cmd, data);
		}

		/**
		 * Subscribe to a command
		 *
		 * @param {String} cmd
		 * @param {String} nodeID
		 * @returns {Promise}
		 *
		 * @memberof BaseTransporter
		 */
		subscribe(cmd, nodeID) {
			/* istanbul ignore next */
			throw new Error("Not implemented!");
		}

		/**
		 * Subscribe to balanced action commands
		 *
		 * @param {String} action
		 * @returns {Promise}
		 *
		 * @memberof AmqpTransporter
		 */
		subscribeBalancedRequest(action) {
			/* istanbul ignore next */
			throw new Error("Not implemented!");
		}

		/**
		 * Subscribe to balanced event command
		 *
		 * @param {String} event
		 * @param {String} group
		 * @returns {Promise}
		 *
		 * @memberof AmqpTransporter
		 */
		subscribeBalancedEvent(event, group) {
			/* istanbul ignore next */
			throw new Error("Not implemented!");
		}

		/**
		 * Unsubscribe all balanced request and event commands
		 *
		 * @returns {Promise}
		 * @memberof BaseTransporter
		 */
		unsubscribeFromBalancedCommands() {
			/* istanbul ignore next */
			return this.broker.Promise.resolve();
		}

		/**
		 * Publish a normal not balanced packet
		 *
		 * @param {Packet} packet
		 * @returns {Promise}
		 *
		 * @memberof BaseTransporter
		 */
		publish(packet) {
			const topic = this.getTopicName(packet.type, packet.target);
			const data = this.serialize(packet);

			return this.send(topic, data, { packet });
		}

		/**
		 * Publish a balanced EVENT packet to a balanced queue
		 *
		 * @param {Packet} packet
		 * @param {String} group
		 * @returns {Promise}
		 *
		 * @memberof BaseTransporter
		 */
		publishBalancedEvent(packet, group) {
			const topic = `${this.prefix}.${packets.PACKET_EVENT}B.${group}.${packet.payload.event}`;
			const data = this.serialize(packet);

			return this.send(topic, data, { packet, balanced: true });
		}

		/**
		 * Publish a balanced REQ packet to a balanced queue
		 *
		 * @param {Packet} packet
		 * @returns {Promise}
		 *
		 * @memberof BaseTransporter
		 */
		publishBalancedRequest(packet) {
			const topic = `${this.prefix}.${packets.PACKET_REQUEST}B.${packet.payload.action}`;
			const data = this.serialize(packet);

			return this.send(topic, data, { packet, balanced: true });
		}

		/**
		 * Send data buffer.
		 *
		 * @param {String} topic
		 * @param {Buffer} data
		 * @param {Object} meta
		 *
		 * @returns {Promise}
		 */
		send(topic, data, meta) {
			throw new Error("Not implemented!");
		}

		/**
		 * Get topic name from command & target nodeID
		 *
		 * @param {string} cmd
		 * @param {string=} nodeID
		 *
		 * @memberof BaseTransporter
		 */
		getTopicName(cmd, nodeID) {
			return this.prefix + "." + cmd + (nodeID ? "." + nodeID : "");
		}

		/**
		 * Initialize queues for REQUEST & EVENT packets.
		 *
		 * @returns {Promise}
		 * @memberof BaseTransporter
		 */
		makeBalancedSubscriptions() {
			if (!this.hasBuiltInBalancer) return this.broker.Promise.resolve();

			return this.unsubscribeFromBalancedCommands().then(() => {
				const services = this.broker.getLocalNodeInfo().services;
				return this.broker.Promise.all(
					services.map(service => {
						const p = [];

						// Service actions queues
						if (service.actions && typeof service.actions == "object") {
							p.push(
								Object.keys(service.actions).map(action =>
									this.subscribeBalancedRequest(action)
								)
							);
						}

						// Load-balanced/grouped events queues
						if (service.events && typeof service.events == "object") {
							p.push(
								Object.keys(service.events).map(event => {
									const group = service.events[event].group || service.name;
									this.subscribeBalancedEvent(event, group);
								})
							);
						}

						return this.broker.Promise.all(___default.compact(flatten(p)));
					})
				);
			});
		}

		/**
		 * Prepublish a packet. Handle balancing.
		 *
		 * @param {Packet} packet
		 * @returns {Promise}
		 * @memberof BaseTransporter
		 */
		prepublish(packet) {
			// Safely handle disconnected state
			if (!this.connected) {
				// For packets that are triggered intentionally by users, throw a retryable error.
				if ([packets.PACKET_REQUEST, packets.PACKET_EVENT, packets.PACKET_PING].includes(packet.type)) {
					return this.broker.Promise.reject(
						new BrokerDisconnectedError("Broker is disconnected!")
					);
				}

				// For internal packets like INFO and HEARTBEATS, skip sending and don't throw
				else {
					return this.broker.Promise.resolve();
				}
			}

			if (packet.type === packets.PACKET_EVENT && packet.target == null && packet.payload.groups) {
				const groups = /** @type {PacketEventPayload} */ (packet.payload).groups;
				// If the packet contains groups, we don't send the packet to
				// the targetted node, but we push them to the event group queues
				// and AMQP will load-balanced it.
				if (groups.length > 0) {
					groups.forEach(group => {
						// Create a copy of the packet because the `publishBalancedEvent` will modify the payload.
						const copy = ___default.cloneDeep(packet);
						// Change the groups to this group to avoid multi handling in consumers.
						copy.payload.groups = [group];
						this.publishBalancedEvent(copy, group);
					});
					return this.broker.Promise.resolve();
				}
				// If it's not contain, then it is a broadcasted event,
				// we sent it in the normal way (exchange)
			} else if (packet.type === packets.PACKET_REQUEST && packet.target == null) {
				return this.publishBalancedRequest(packet);
			}

			// Normal packet publishing...
			return this.publish(packet);
		}

		/**
		 * Serialize the Packet to Buffer
		 *
		 * @param {Packet} packet
		 * @returns {Buffer}
		 *
		 * @memberof BaseTransporter
		 */
		serialize(packet) {
			packet.payload.ver = this.broker.PROTOCOL_VERSION;
			packet.payload.sender = this.nodeID;
			return this.broker.serializer.serialize(packet.payload, packet.type);
		}

		/**
		 * Deserialize the incoming Buffer to Packet
		 *
		 * @param {String} type
		 * @param {Buffer} buf
		 * @returns {Packet}
		 *
		 * @memberof BaseTransporter
		 */
		deserialize(type, buf) {
			if (buf == null) return null;

			const msg = this.broker.serializer.deserialize(buf, type);
			return new packets.Packet(type, null, msg);
		}
	}

	var base$7 = BaseTransporter;

	const EventEmitter2 = eventemitter2.EventEmitter2;

	/**
	 * Import types
	 *
	 * @typedef {import("./fake")} FakeTransporterClass
	 */

	// Put to global to transfer messages between brokers in the same process
	commonjsGlobal.bus = new EventEmitter2({
		wildcard: true,
		maxListeners: 100
	});

	/**
	 * Fake Transporter
	 *
	 * @class FakeTransporter
	 * @extends {Transporter}
	 * @implements {FakeTransporterClass}
	 */
	class FakeTransporter extends base$7 {
		/**
		 * Creates an instance of FakeTransporter.
		 *
		 * @param {Record<string, any>} opts
		 *
		 * @memberof FakeTransporter
		 */
		constructor(opts) {
			super(opts);

			// Local event bus
			this.bus = commonjsGlobal.bus;
			this.hasBuiltInBalancer = true;

			this.subscriptions = [];
		}

		/**
		 * Connect to a NATS server
		 *
		 * @memberof FakeTransporter
		 */
		connect() {
			return this.onConnected();
		}

		/**
		 * Disconnect from a NATS server
		 *
		 * @memberof FakeTransporter
		 */
		disconnect() {
			this.connected = false;
			this.subscriptions.forEach(({ topic, handler }) => this.bus.off(topic, handler));
			this.subscriptions = [];

			return this.broker.Promise.resolve();
		}

		/**
		 * Subscribe to a command
		 *
		 * @param {String} cmd
		 * @param {String} nodeID
		 *
		 * @memberof FakeTransporter
		 */
		subscribe(cmd, nodeID) {
			const t = this.getTopicName(cmd, nodeID);
			const handler = msg => this.receive(cmd, msg);
			this.subscriptions.push({ topic: t, handler });

			this.bus.on(t, handler);
			return this.broker.Promise.resolve();
		}

		/**
		 * Subscribe to balanced action commands
		 *
		 * @memberof AmqpTransporter
		 */
		subscribeBalancedRequest() {
			return this.broker.Promise.resolve();
		}

		/**
		 * Subscribe to balanced event command
		 *
		 * @memberof AmqpTransporter
		 */
		subscribeBalancedEvent() {
			return this.broker.Promise.resolve();
		}

		/**
		 * Send data buffer.
		 *
		 * @param {String} topic
		 * @param {Buffer} data
		 *
		 * @returns {Promise}
		 */
		send(topic, data) {
			this.bus.emit(topic, data);
			return this.broker.Promise.resolve();
		}
	}

	var fake = FakeTransporter;

	const { isObject: isObject$9, isString: isString$a, isInheritedClass: isInheritedClass$5 } = utils_1;
	const { BrokerOptionsError: BrokerOptionsError$7 } = errors;

	const Transporters = {
		Base: base$7,
		Fake: fake,
		NATS: require$$19,
		MQTT: require$$19,
		Redis: require$$19,
		AMQP: require$$19,
		AMQP10: require$$19,
		Kafka: require$$19,
		TCP: require$$19
	};

	function getByName$7(name) {
		/* istanbul ignore next */
		if (!name) return null;

		let n = Object.keys(Transporters).find(n => n.toLowerCase() == name.toLowerCase());
		if (n) return Transporters[n];
	}

	/**
	 * Resolve transporter by name
	 *
	 * @param {Record<string,any>|string} opt
	 * @returns {any}
	 */
	function resolve$7(opt) {
		if (isObject$9(opt) && isInheritedClass$5(opt, Transporters.Base)) {
			return opt;
		} else if (isString$a(opt)) {
			let TransporterClass = getByName$7(opt);
			if (TransporterClass) return new TransporterClass();

			if (opt.startsWith("nats://")) TransporterClass = Transporters.NATS;
			else if (opt.startsWith("mqtt://") || opt.startsWith("mqtts://"))
				TransporterClass = Transporters.MQTT;
			else if (opt.startsWith("redis://") || opt.startsWith("rediss://"))
				TransporterClass = Transporters.Redis;
			else if (opt.startsWith("amqp://") || opt.startsWith("amqps://"))
				TransporterClass = Transporters.AMQP;
			else if (opt.startsWith("amqp10://")) TransporterClass = Transporters.AMQP10;
			else if (opt.startsWith("kafka://")) TransporterClass = Transporters.Kafka;
			else if (opt.startsWith("tcp://")) TransporterClass = Transporters.TCP;

			if (TransporterClass) return new TransporterClass(opt);
			else throw new BrokerOptionsError$7(`Invalid transporter type '${opt}'.`, { type: opt });
		} else if (isObject$9(opt)) {
			let TransporterClass = getByName$7(opt.type || "NATS");

			if (TransporterClass) return new TransporterClass(opt.options);
			else
				throw new BrokerOptionsError$7(`Invalid transporter type '${opt.type}'.`, {
					type: opt.type
				});
		}

		return null;
	}

	function register$7(name, value) {
		Transporters[name] = value;
	}

	var transporters = Object.assign(Transporters, { resolve: resolve$7, register: register$7 });

	/**
	 * Import types
	 *
	 * @typedef {import("../service-broker")} ServiceBroker
	 * @typedef {import("./base")} SerializerBaseClass
	 */

	/**
	 * Abstract serializer class
	 *
	 * @implements {SerializerBaseClass}
	 */
	class Serializer {
		/**
		 * Creates an instance of Serializer.
		 *
		 * @memberof Serializer
		 */
		constructor(/*opts*/) {}

		/**
		 * Initialize Serializer
		 *
		 * @param {ServiceBroker} broker
		 *
		 * @memberof Serializer
		 */
		init(broker) {
			this.broker = broker;
			/*if (this.broker) {
				this.logger = broker.getLogger("serializer");
			}*/
		}

		/**
		 * Serializer a JS object to Buffer
		 *
		 * @param {Object} obj
		 * @param {String?} type
		 * @returns {Buffer}
		 *
		 * @memberof Serializer
		 */
		serialize(obj, type) {
			/* istanbul ignore next */
			throw new Error("Not implemented method!");
		}

		/**
		 * Deserialize Buffer to JS object
		 *
		 * @param {Buffer} buf
		 * @param {String?} type
		 * @returns {any}
		 *
		 * @memberof Serializer
		 */
		deserialize(buf, type) {
			/* istanbul ignore next */
			throw new Error("Not implemented method!");
		}

		/**
		 * Serialize custom fields (stringify)
		 *
		 * @param {String} type
		 * @param {Object} obj
		 * @returns {Object}
		 * @memberof Serializer
		 */
		serializeCustomFields(type, obj) {
			switch (type) {
				case packets.PACKET_INFO: {
					obj.services = JSON.stringify(obj.services);
					if (obj.config) obj.config = JSON.stringify(obj.config);
					if (obj.metadata) obj.metadata = JSON.stringify(obj.metadata);
					break;
				}
				case packets.PACKET_EVENT: {
					this.convertDataToTransport(obj, "data", "dataType");
					obj.meta = JSON.stringify(obj.meta);
					break;
				}
				case packets.PACKET_REQUEST: {
					this.convertDataToTransport(obj, "params", "paramsType");
					obj.meta = JSON.stringify(obj.meta);
					break;
				}
				case packets.PACKET_RESPONSE: {
					this.convertDataToTransport(obj, "data", "dataType");
					obj.meta = JSON.stringify(obj.meta);
					if (obj.error) obj.error = JSON.stringify(obj.error);
					break;
				}
				case packets.PACKET_GOSSIP_REQ: {
					if (obj.online) obj.online = JSON.stringify(obj.online);
					if (obj.offline) obj.offline = JSON.stringify(obj.offline);
					break;
				}
				case packets.PACKET_GOSSIP_RES: {
					if (obj.online) obj.online = JSON.stringify(obj.online);
					if (obj.offline) obj.offline = JSON.stringify(obj.offline);
					break;
				}
			}

			return obj;
		}

		/**
		 * Deserialize custom fields
		 *
		 * @param {String} type
		 * @param {Object} obj
		 * @returns {Object}
		 * @memberof Serializer
		 */
		deserializeCustomFields(type, obj) {
			switch (type) {
				case packets.PACKET_INFO: {
					obj.services = JSON.parse(obj.services);
					if (obj.config) obj.config = JSON.parse(obj.config);
					if (obj.metadata) obj.metadata = JSON.parse(obj.metadata);
					break;
				}
				case packets.PACKET_EVENT: {
					this.convertDataFromTransport(obj, "data", "dataType");
					obj.meta = JSON.parse(obj.meta);
					break;
				}
				case packets.PACKET_REQUEST: {
					this.convertDataFromTransport(obj, "params", "paramsType");
					obj.meta = JSON.parse(obj.meta);
					break;
				}
				case packets.PACKET_RESPONSE: {
					this.convertDataFromTransport(obj, "data", "dataType");
					obj.meta = JSON.parse(obj.meta);
					if (obj.error) obj.error = JSON.parse(obj.error);
					break;
				}
				case packets.PACKET_GOSSIP_REQ: {
					if (obj.online) obj.online = JSON.parse(obj.online);
					if (obj.offline) obj.offline = JSON.parse(obj.offline);
					break;
				}
				case packets.PACKET_GOSSIP_RES: {
					if (obj.online) obj.online = JSON.parse(obj.online);
					if (obj.offline) obj.offline = JSON.parse(obj.offline);
					break;
				}
			}

			return obj;
		}

		/**
		 * Write the field type and convert to the object field
		 *
		 * @param {Object} obj
		 * @param {string} field
		 * @param {string} fieldType
		 */
		convertDataToTransport(obj, field, fieldType) {
			if (obj[field] === undefined) {
				obj[fieldType] = packets.DATATYPE_UNDEFINED;
			} else if (obj[field] === null) {
				obj[fieldType] = packets.DATATYPE_NULL;
			} else if (Buffer.isBuffer(obj[field])) {
				obj[fieldType] = packets.DATATYPE_BUFFER;
			} else {
				// JSON
				obj[fieldType] = packets.DATATYPE_JSON;
				obj[field] = Buffer.from(JSON.stringify(obj[field]));
			}
		}

		/**
		 * Read the field type and convert the object field
		 *
		 * @param {Object} obj
		 * @param {string} field
		 * @param {string} fieldType
		 */
		convertDataFromTransport(obj, field, fieldType) {
			const type = obj[fieldType];
			switch (type) {
				case packets.DATATYPE_UNDEFINED: {
					obj[field] = undefined;
					break;
				}
				case packets.DATATYPE_NULL: {
					obj[field] = null;
					break;
				}
				case packets.DATATYPE_BUFFER: {
					if (!Buffer.isBuffer(obj[field])) obj[field] = Buffer.from(obj[field]);
					break;
				}
				default: {
					// JSON
					obj[field] = JSON.parse(obj[field]);
					break;
				}
			}

			delete obj[fieldType];
		}
	}

	var base$8 = Serializer;

	/**
	 * Import types
	 *
	 * @typedef {import("../service-broker")} ServiceBroker
	 * @typedef {import("./json")} JSONSerializerClass
	 */

	/**
	 * JSON serializer for Moleculer
	 *
	 * @implements {JSONSerializerClass}
	 */
	class JSONSerializer extends base$8 {
		/**
		 * Creates an instance of JSONSerializer.
		 *
		 * @memberof JSONSerializer
		 */
		constructor() {
			super();
		}

		/**
		 * Serializer a JS object to Buffer
		 *
		 * @param {Object} obj
		 * @returns {Buffer}
		 *
		 * @memberof Serializer
		 */
		serialize(obj) {
			return Buffer.from(JSON.stringify(obj));
		}

		/**
		 * Deserialize Buffer to JS object
		 *
		 * @param {any} buf
		 * @returns {Object}
		 *
		 * @memberof Serializer
		 */
		deserialize(buf) {
			return JSON.parse(buf);
		}
	}

	var json = JSONSerializer;

	//const { isDate } = require("../utils");
	const { isDate: isDate$1, isRegExp, isMap, isSet } = util__default.types;

	const PREFIX_BIGINT = "[[BI]]";
	const PREFIX_MAP = "[[MP]]";
	const PREFIX_SET = "[[ST]]";
	const PREFIX_DATE = "[[DT]]";
	const PREFIX_BUFFER = "[[BF]]";
	const PREFIX_REGEXP = "[[RE]]";
	const PREFIX_ESCAPED_STRING = "[[ES]]";

	/**
	 * Import types
	 *
	 * @typedef {import("../service-broker")} ServiceBroker
	 * @typedef {import("./json-extended")} JSONExtSerializerClass
	 * @typedef {import("./json-extended").JSONExtSerializerOptions} JSONExtSerializerOptions
	 * @typedef {import("./json-extended").JSONExtSerializerOptionsCustomType} JSONExtSerializerOptionsCustomType
	 */

	/**
	 * JSON Extended serializer for Moleculer
	 *
	 * @implements {JSONExtSerializerClass}
	 */
	class JSONExtSerializer extends base$8 {
		/**
		 * Creates an instance of JSONExtSerializer.
		 *
		 * @param {JSONExtSerializerOptions} opts
		 * @memberof JSONExtSerializer
		 */
		constructor(opts) {
			super();

			/** @type {JSONExtSerializerOptions} */
			this.opts = opts || {};

			/** @type {boolean} */
			this.hasCustomTypes = this.opts?.customs?.length > 0;
		}

		/**
		 * JSON stringify replacer.
		 *
		 * @param {object} obj
		 * @param {String} key
		 * @param {any} value Already converted value
		 */
		replacer(obj, key, value) {
			if (value == null) return value;

			// Get the original value
			const v = obj[key];

			if (typeof v == "bigint") {
				return PREFIX_BIGINT + v;
			} else if (isDate$1(v)) {
				return PREFIX_DATE + v.valueOf();
			} else if (isMap(v)) {
				return PREFIX_MAP + this.serialize(Object.fromEntries(v));
			} else if (isSet(v)) {
				return PREFIX_SET + this.serialize(Array.from(v));
			} else if (isRegExp(v)) {
				return PREFIX_REGEXP + v.flags + "|" + v.source;
			} else if (Buffer.isBuffer(v)) {
				return PREFIX_BUFFER + v.toString("base64");
			} else if (this.hasCustomTypes) {
				for (const custom of this.opts.customs) {
					if (custom.check(v, key, obj)) {
						return "[[" + custom.prefix + "]]" + custom.serialize(v, key, obj);
					}
				}
			}

			// Escape plain strings that start with "[[" to avoid false positives during deserialization
			if (typeof value === "string" && value.charAt(0) === "[" && value.charAt(1) === "[") {
				return PREFIX_ESCAPED_STRING + value;
			}

			return value;
		}

		/**
		 * JSON.parse reviver.
		 *
		 * @param {String} key
		 * @param {any} value
		 */
		reviver(key, value) {
			if (typeof value === "string" && value.charAt(0) === "[" && value.charAt(1) === "[") {
				switch (value.slice(0, 6)) {
					case PREFIX_BIGINT:
						return BigInt(value.slice(6));
					case PREFIX_DATE:
						return new Date(Number(value.slice(6)));
					case PREFIX_MAP:
						return new Map(Object.entries(this.deserialize(value.slice(6))));
					case PREFIX_SET:
						return new Set(this.deserialize(value.slice(6)));
					case PREFIX_BUFFER:
						return Buffer.from(value.slice(6), "base64");
					case PREFIX_REGEXP: {
						const p = value.slice(6).split("|");
						const flags = p.shift();
						// eslint-disable-next-line security/detect-non-literal-regexp
						return new RegExp(p.join("|"), flags);
					}
					case PREFIX_ESCAPED_STRING:
						return value.slice(6);
					default: {
						if (this.hasCustomTypes) {
							for (const custom of this.opts.customs) {
								if (value.startsWith("[[" + custom.prefix + "]]")) {
									return custom.deserialize(
										value.slice(custom.prefix.length + 4),
										key
									);
								}
							}
						}
					}
				}
			}
			return value;
		}

		/**
		 * Serializer a JS object to Buffer
		 *
		 * @param {Object} obj
		 * @returns {Buffer}
		 *
		 * @memberof Serializer
		 */
		serialize(obj) {
			const self = this;
			return Buffer.from(
				JSON.stringify(obj, function (key, value) {
					return self.replacer.call(self, this, key, value);
				})
			);
		}

		/**
		 * Deserialize Buffer to JS object
		 *
		 * @param {any} buf
		 * @returns {Object}
		 *
		 * @memberof Serializer
		 */
		deserialize(buf) {
			const self = this;
			return JSON.parse(buf, function (key, value) {
				return self.reviver.call(self, key, value);
			});
		}
	}

	var jsonExtended = JSONExtSerializer;

	var require$$7 = () => {
	  console.warn('moleculer-browser: You are trying to use an unloaded serializer. You need to import it.');
	};

	const { isObject: isObject$a, isString: isString$b, isInheritedClass: isInheritedClass$6 } = utils_1;
	const { BrokerOptionsError: BrokerOptionsError$8 } = errors;

	const Serializers = {
		Base: base$8,
		JSON: json,
		JSONExt: jsonExtended,
		MsgPack: require$$7,
		Notepack: require$$7,
		CBOR: require$$7
	};

	function getByName$8(name) {
		/* istanbul ignore next */
		if (!name) return null;

		let n = Object.keys(Serializers).find(n => n.toLowerCase() == name.toLowerCase());
		if (n) return Serializers[n];
	}

	/**
	 * Resolve serializer by name
	 *
	 * @param {Record<string,any>|string} opt
	 * @returns {any}
	 * @memberof ServiceBroker
	 */
	function resolve$8(opt) {
		if (isObject$a(opt) && isInheritedClass$6(opt, Serializers.Base)) {
			return opt;
		} else if (isString$b(opt)) {
			let SerializerClass = getByName$8(opt);
			if (SerializerClass) return new SerializerClass();
			else throw new BrokerOptionsError$8(`Invalid serializer type '${opt}'.`, { type: opt });
		} else if (isObject$a(opt)) {
			let SerializerClass = getByName$8(opt.type || "JSON");
			if (SerializerClass) return new SerializerClass(opt.options);
			else
				throw new BrokerOptionsError$8(`Invalid serializer type '${opt.type}'.`, {
					type: opt.type
				});
		}

		return new Serializers.JSON();
	}

	function register$8(name, value) {
		Serializers[name] = value;
	}

	var serializers = Object.assign(Serializers, { resolve: resolve$8, register: register$8 });

	var name = "moleculer";
	var version = "0.15.0";
	var description = "Fast & powerful microservices framework for Node.JS";
	var main = "index.js";
	var type = "commonjs";
	var exports$1 = {
		".": {
			types: "./index.d.ts",
			require: "./index.js",
			"import": "./index.mjs"
		}
	};
	var types$1 = "./index.d.ts";
	var scripts = {
		bench: "node benchmark/index.js",
		ci: "jest --watch",
		"ci:leak": "jest --testMatch \"**/leak-detection/index.spc.js\" --runInBand --watch",
		coverall: "cat ./coverage/lcov.info | ./node_modules/coveralls/bin/coveralls.js",
		demo: "node examples/index.js",
		"demo:ts": "tsx --watch examples/typescript/index.ts",
		deps: "ncu -i --format group",
		postdeps: "npm test",
		dev: "nodemon dev/index.js",
		lint: "eslint benchmark bin examples src test",
		"lint:fix": "eslint --fix benchmark bin examples src test",
		perf: "nodemon --allow-natives-syntax benchmark/perf-runner.js",
		pperf: "node --inspect --expose-gc benchmark/perf-runner.js",
		memleak: "node benchmark/memleak-test.js",
		test: "jest --coverage --forceExit",
		"test:unit": "jest --testMatch \"**/unit/**/*.spec.js\" --coverage",
		"test:int": "jest --testMatch \"**/integration/**/*.spec.js\" --coverage",
		"test:e2e": "cd test/e2e && ./start.sh",
		"test:leak": "jest --testMatch \"**/leak-detection/**/*.spc.js\" --runInBand",
		"test:ts": "tsd && tsc -p test/typescript/hello-world && ts-node -P test/typescript/hello-world/tsconfig.json test/typescript/hello-world/index.ts",
		"test:esm": "node bin/moleculer-runner.mjs -c test/esm/moleculer.config.mjs test/esm/*.service.*js",
		release: "npm publish --access public && git push --follow-tags",
		"release:beta": "npm publish --tag next --access public && git push --follow-tags",
		tsc: "tsc",
		"tsc:watch": "tsc --watch",
		tsd: "tsd"
	};
	var keywords = [
		"microservice",
		"microservices",
		"framework",
		"backend",
		"messagebus",
		"rpc",
		"services",
		"micro",
		"pubsub",
		"scalable",
		"distributed"
	];
	var files = [
		"bin",
		"src",
		"types",
		"index.js",
		"index.mjs",
		"index.d.ts",
		"README.md",
		"LICENSE"
	];
	var repository = {
		type: "git",
		url: "git+https://github.com/moleculerjs/moleculer.git"
	};
	var funding = "https://github.com/moleculerjs/moleculer?sponsor=1";
	var bin = {
		"moleculer-runner": "./bin/moleculer-runner.js",
		"moleculer-runner-esm": "./bin/moleculer-runner.mjs"
	};
	var author = "MoleculerJS";
	var license = "MIT";
	var devDependencies = {
		"@eslint/js": "^10.0.1",
		"@opentelemetry/auto-instrumentations-node": "^0.64.5",
		"@opentelemetry/exporter-metrics-otlp-proto": "^0.205.0",
		"@opentelemetry/exporter-trace-otlp-proto": "^0.205.0",
		"@opentelemetry/instrumentation": "^0.205.0",
		"@opentelemetry/sdk-node": "^0.205.0",
		"@opentelemetry/semantic-conventions": "^1.37.0",
		"@platformatic/kafka": "^1.18.0",
		"@sinonjs/fake-timers": "^15.0.0",
		"@types/bunyan": "^1.8.11",
		"@types/node": "^25.5.0",
		"@types/pino": "^7.0.5",
		amqplib: "^0.10.9",
		avsc: "^5.7.9",
		benchmarkify: "^4.0.0",
		bunyan: "^1.8.15",
		"cbor-x": "^1.6.0",
		"clock-mock": "^2.0.2",
		"dd-trace": "^5.67.0",
		debug: "^4.4.3",
		dotenv: "^17.2.2",
		eslint: "^10.1.0",
		"eslint-config-prettier": "^10.1.8",
		"eslint-plugin-node": "^11.1.0",
		"eslint-plugin-prettier": "^5.5.5",
		"eslint-plugin-security": "^4.0.0",
		etcd3: "^1.1.2",
		fakerator: "^0.3.6",
		globals: "^17.4.0",
		ioredis: "^5.8.0",
		"jaeger-client": "^3.19.0",
		jest: "^29.7.0",
		"jest-cli": "^29.7.0",
		"jest-diff": "^29.7.0",
		joi: "^18.0.1",
		"lockfile-lint": "^5.0.0",
		log4js: "^6.9.1",
		"moleculer-repl": "^0.7.4",
		mqtt: "^5.14.1",
		msgpack5: "^6.0.2",
		nats: "^2.29.3",
		nodemon: "^3.1.10",
		"notepack.io": "^3.0.1",
		"npm-check-updates": "^19.0.0",
		pino: "^10.3.1",
		prettier: "^3.8.1",
		redlock: "^4.2.0",
		"rhea-promise": "^3.0.3",
		supertest: "^7.1.4",
		"ts-node": "^10.9.2",
		tsd: "^0.33.0",
		tsx: "^4.20.6",
		typescript: "^5.9.2",
		"v8-natives": "^1.2.5",
		winston: "^3.17.0",
		"winston-context": "^0.0.7"
	};
	var dependencies = {
		args: "^5.0.3",
		eventemitter2: "^6.4.9",
		"fastest-validator": "^1.19.1",
		glob: "^13.0.6",
		"ipaddr.js": "^2.3.0",
		kleur: "^4.1.5",
		lodash: "^4.17.21",
		"lru-cache": "^11.2.2",
		"recursive-watch": "^1.1.4"
	};
	var peerDependencies = {
		"@platformatic/kafka": "^1.18.0",
		amqplib: "^0.10.0",
		bunyan: "^1.0.0",
		"cbor-x": "^1.2.0",
		"dd-trace": "^5.67.0",
		debug: "^4.0.0",
		etcd3: "^1.0.0",
		ioredis: "^5.0.0",
		"jaeger-client": "^3.0.0",
		log4js: "^6.0.0",
		mqtt: "^5.0.0",
		msgpack5: "^6.0.0",
		nats: "^2.0.0",
		"notepack.io": "^3.0.0",
		pino: "^10.0.0",
		redlock: "^4.0.0",
		"rhea-promise": "^3.0.0",
		winston: "^3.0.0"
	};
	var peerDependenciesMeta = {
		amqplib: {
			optional: true
		},
		bunyan: {
			optional: true
		},
		"cbor-x": {
			optional: true
		},
		"dd-trace": {
			optional: true
		},
		debug: {
			optional: true
		},
		etcd3: {
			optional: true
		},
		ioredis: {
			optional: true
		},
		"jaeger-client": {
			optional: true
		},
		"@platformatic/kafka": {
			optional: true
		},
		log4js: {
			optional: true
		},
		mqtt: {
			optional: true
		},
		msgpack5: {
			optional: true
		},
		nats: {
			optional: true
		},
		"notepack.io": {
			optional: true
		},
		pino: {
			optional: true
		},
		redlock: {
			optional: true
		},
		"rhea-promise": {
			optional: true
		},
		winston: {
			optional: true
		}
	};
	var engines = {
		node: ">= 22.x.x"
	};
	var tsd = {
		directory: "test/typescript/tsd",
		compilerOptions: {
			noImplicitThis: true
		}
	};
	var jest = {
		coverageDirectory: "../coverage",
		coveragePathIgnorePatterns: [
			"/node_modules/",
			"/test/services/",
			"/test/typescript/",
			"/test/unit/utils.js"
		],
		transform: {
		},
		testEnvironment: "node",
		rootDir: "./src",
		roots: [
			"../test"
		]
	};
	var require$$8 = {
		name: name,
		version: version,
		description: description,
		main: main,
		type: type,
		exports: exports$1,
		types: types$1,
		scripts: scripts,
		keywords: keywords,
		files: files,
		repository: repository,
		funding: funding,
		bin: bin,
		author: author,
		license: license,
		devDependencies: devDependencies,
		dependencies: dependencies,
		peerDependencies: peerDependencies,
		peerDependenciesMeta: peerDependenciesMeta,
		engines: engines,
		tsd: tsd,
		jest: jest
	};

	const { getIpList: getIpList$1 } = utils_1;
	const MOLECULER_VERSION = require$$8.version;

	/**
	 * Import types
	 *
	 * @typedef {import("./service-broker").NodeHealthStatus} NodeHealthStatus
	 */

	const getClientInfo = () => {
		return {
			type: "browser",
			version: MOLECULER_VERSION,
			langVersion: _process.version
		};
	};

	const getCpuInfo = () => {
		const cpus = require$$0__default();
		const load = getCpuUsage.loadavg();
		const cores = Array.isArray(cpus) ? require$$0__default().length : null;
		const cpu = {
			load1: load[0],
			load5: load[1],
			load15: load[2],
			cores: cores,
			utilization: cores > 0 ? Math.min(Math.floor((load[0] * 100) / cores), 100) : null
		};

		return cpu;
	};

	const getMemoryInfo = () => {
		const mem = {
			free: (() => performance ? performance.memory.totalJSHeapSize - performance.memory.usedJSHeapSize : 0)(),
			total: (() => performance ? performance.memory.totalJSHeapSize : 0)(),
			percent: null
		};
		mem.percent = (mem.free * 100) / mem.total;

		return mem;
	};

	/**
	 *
	 * @returns {os.UserInfo| {}}
	 */
	const getUserInfo$1 = () => {
		try {
			return os__default.userInfo();
		} catch {
			return {};
		}
	};

	const getOsInfo = () => {
		return {
			uptime: os__default.uptime(),
			type: os__default.type(),
			release: os__default.release(),
			hostname: os__default.hostname(),
			arch: os__default.arch(),
			platform: os__default.platform(),
			user: getUserInfo$1()
		};
	};

	const getProcessInfo = () => {
		return {
			pid: _process.pid,
			memory: _process.memoryUsage(),
			uptime: _process.uptime(),
			argv: _process.argv
		};
	};

	const getNetworkInterfacesInfo = () => {
		return {
			ip: getIpList$1()
		};
	};

	const getDateTimeInfo = () => {
		return {
			now: Date.now(),
			iso: new Date().toISOString(),
			utc: new Date().toUTCString()
		};
	};

	/**
	 *
	 * @returns {NodeHealthStatus}
	 */
	const getHealthStatus = () => {
		return {
			cpu: getCpuInfo(),
			mem: getMemoryInfo(),
			os: getOsInfo(),
			process: getProcessInfo(),
			client: getClientInfo(),
			net: getNetworkInterfacesInfo(),
			time: getDateTimeInfo()
		};
	};

	var health = {
		getHealthStatus,
		getCpuInfo,
		getMemoryInfo,
		getOsInfo,
		getProcessInfo,
		getClientInfo,
		getNetworkInterfacesInfo,
		getDateTimeInfo
	};

	/**
	 * @typedef {import("../service")} Service
	 */


	const { isFunction: isFunction$4, isString: isString$c, match: match$3 } = utils_1;

	var actionHook = function actionHookMiddleware(broker) {
		function callHook(hook, service, ctx, res) {
			if (isFunction$4(hook)) {
				return hook.call(service, ctx, res);
			} else if (Array.isArray(hook)) {
				return hook.reduce(
					(p, fn) => p.then(res => fn.call(service, ctx, res)),
					broker.Promise.resolve(res)
				);
			}
		}

		function callErrorHook(hook, service, ctx, err) {
			if (isFunction$4(hook)) {
				return hook.call(service, ctx, err);
			} else if (Array.isArray(hook)) {
				return hook.reduce(
					(p, fn) => p.catch(err => fn.call(service, ctx, err)),
					broker.Promise.reject(err)
				);
			}
		}

		/**
		 * Sanitize hooks. If the hook is a string, convert it to Service method calling.
		 *
		 * @param {Function|String|Array<any>} hooks
		 * @param {Service?} service
		 * @returns
		 */
		function sanitizeHooks(hooks, service) {
			if (isString$c(hooks)) return service && isFunction$4(service[hooks]) ? service[hooks] : null;

			if (Array.isArray(hooks)) {
				return ___default.compact(
					hooks.map(h => {
						if (isString$c(h)) return service && isFunction$4(service[h]) ? service[h] : null;

						return h;
					})
				);
			}

			return hooks;
		}

		function wrapActionHookMiddleware(handler, action) {
			const name = action.rawName || action.name;
			const hooks = action.service && action.service.schema ? action.service.schema.hooks : null;
			if (hooks || action.hooks) {
				// Global hooks
				const beforeAllHook =
					hooks && hooks.before ? sanitizeHooks(hooks.before["*"], action.service) : null;
				const afterAllHook =
					hooks && hooks.after ? sanitizeHooks(hooks.after["*"], action.service) : null;
				const errorAllHook =
					hooks && hooks.error ? sanitizeHooks(hooks.error["*"], action.service) : null;

				// Hooks in service
				const matchHook = hookName => {
					if (hookName === "*") return false;
					const patterns = hookName.split("|");
					return patterns.some(pattern => match$3(name, pattern));
				};

				const beforeHookMatches =
					hooks && hooks.before ? Object.keys(hooks.before).filter(matchHook) : null;

				/** @type {Array<Function>?} List of hooks that match the action name */
				const beforeHook =
					beforeHookMatches && beforeHookMatches.length > 0
						? beforeHookMatches.map(hookName =>
								sanitizeHooks(hooks.before[hookName], action.service)
							)
						: null;

				/** @type {Array<String>?} List of hooks names that match the action name */
				const afterHookMatches =
					hooks && hooks.after ? Object.keys(hooks.after).filter(matchHook) : null;

				/** @type {Array<Function>?} List of hooks that match the action name */
				const afterHook =
					afterHookMatches && afterHookMatches.length > 0
						? afterHookMatches.map(hookName =>
								sanitizeHooks(hooks.after[hookName], action.service)
							)
						: null;

				/** @type {Array<String>?} List of hooks names that match the action name */
				const errorHookMatches =
					hooks && hooks.error ? Object.keys(hooks.error).filter(matchHook) : null;

				/** @type {Array<Function>?} List of hooks that match the action name */
				const errorHook =
					errorHookMatches && errorHookMatches.length > 0
						? errorHookMatches.map(hookName =>
								sanitizeHooks(hooks.error[hookName], action.service)
							)
						: null;

				// Hooks in action definition
				const actionBeforeHook =
					action.hooks && action.hooks.before
						? sanitizeHooks(action.hooks.before, action.service)
						: null;
				const actionAfterHook =
					action.hooks && action.hooks.after
						? sanitizeHooks(action.hooks.after, action.service)
						: null;
				const actionErrorHook =
					action.hooks && action.hooks.error
						? sanitizeHooks(action.hooks.error, action.service)
						: null;

				// Show info for debugging purposes
				broker.logger.debug(`Service Level 'Before' Hooks of '${name}' action:`, [
					...(beforeAllHook ? ["*"] : []),
					...(beforeHookMatches ? beforeHookMatches : [])
				]);
				broker.logger.debug(`Service Level 'After' Hooks of '${name}' action:`, [
					...(afterHookMatches ? afterHookMatches : []),
					...(afterAllHook ? ["*"] : [])
				]);
				broker.logger.debug(`Service Level 'Error' Hooks of '${name}' action:`, [
					...(errorHookMatches ? errorHookMatches : []),
					...(errorAllHook ? ["*"] : [])
				]);

				if (
					beforeAllHook ||
					beforeHook ||
					actionBeforeHook ||
					afterAllHook ||
					afterHook ||
					actionAfterHook ||
					errorAllHook ||
					errorHook ||
					actionErrorHook
				) {
					return function actionHookMiddleware(ctx) {
						let p = broker.Promise.resolve();

						// Before hook all
						if (beforeAllHook) p = p.then(() => callHook(beforeAllHook, ctx.service, ctx));

						// Before hook
						if (beforeHook) {
							beforeHook.forEach(fnHook => {
								p = p.then(() => callHook(fnHook, ctx.service, ctx));
							});
						}

						// Before hook in action definition
						if (actionBeforeHook)
							p = p.then(() => callHook(actionBeforeHook, ctx.service, ctx));

						// Action hook handler
						p = p.then(() => handler(ctx));

						// After hook in action definition
						if (actionAfterHook)
							p = p.then(res => callHook(actionAfterHook, ctx.service, ctx, res));

						// After hook
						if (afterHook) {
							afterHook.forEach(fnHook => {
								p = p.then(res => callHook(fnHook, ctx.service, ctx, res));
							});
						}

						// After hook all
						if (afterAllHook)
							p = p.then(res => callHook(afterAllHook, ctx.service, ctx, res));

						// Error hook in action definition
						if (actionErrorHook)
							p = p.catch(err => callErrorHook(actionErrorHook, ctx.service, ctx, err));

						// Error hook
						if (errorHook) {
							errorHook.forEach(fnHook => {
								p = p.catch(err => callErrorHook(fnHook, ctx.service, ctx, err));
							});
						}

						// Error hook all
						if (errorAllHook)
							p = p.catch(err => callErrorHook(errorAllHook, ctx.service, ctx, err));

						return p;
					};
				}
			}

			return handler;
		}

		return {
			name: "ActionHook",
			localAction: wrapActionHookMiddleware
		};
	};

	/*
	 * moleculer
	 * Copyright (c) 2021 MoleculerJS (https://github.com/moleculerjs/moleculer)
	 * MIT Licensed
	 */

	var cacher = function CacherMiddleware(broker) {
		return broker.cacher ? broker.cacher.middleware() : null;
	};

	const { isFunction: isFunction$5 } = utils_1;

	var validator$1 = function ValidatorMiddleware(broker) {
		if (broker.validator && isFunction$5(broker.validator.middleware)) {
			return broker.validator.middleware(broker);
		}

		return null;
	};

	const { QueueIsFullError } = errors;
	const { METRIC: METRIC$5 } = metrics;

	var bulkhead = function bulkheadMiddleware(broker) {
		function wrapActionBulkheadMiddleware(handler, action) {
			const service = action.service;

			const opts = Object.assign({}, this.options.bulkhead || {}, action.bulkhead || {});
			if (opts.enabled) {
				const queue = [];
				let currentInFlight = 0;

				// Call the next request from the queue
				const callNext = function callNext() {
					/* istanbul ignore next */
					if (queue.length === 0) return;

					/* istanbul ignore next */
					if (currentInFlight >= opts.concurrency) return;

					const item = queue.shift();

					currentInFlight++;
					broker.metrics.set(METRIC$5.MOLECULER_REQUEST_BULKHEAD_INFLIGHT, currentInFlight, {
						action: action.name,
						service: service.fullName
					});
					broker.metrics.set(METRIC$5.MOLECULER_REQUEST_BULKHEAD_QUEUE_SIZE, queue.length, {
						action: action.name,
						service: service.fullName
					});

					handler(item.ctx)
						.then(res => {
							currentInFlight--;
							broker.metrics.set(
								METRIC$5.MOLECULER_REQUEST_BULKHEAD_INFLIGHT,
								currentInFlight,
								{ action: action.name, service: service.fullName }
							);
							broker.metrics.set(
								METRIC$5.MOLECULER_REQUEST_BULKHEAD_QUEUE_SIZE,
								queue.length,
								{ action: action.name, service: service.fullName }
							);
							item.resolve(res);
							callNext();
						})
						.catch(err => {
							currentInFlight--;
							broker.metrics.set(
								METRIC$5.MOLECULER_REQUEST_BULKHEAD_INFLIGHT,
								currentInFlight,
								{ action: action.name, service: service.fullName }
							);
							broker.metrics.set(
								METRIC$5.MOLECULER_REQUEST_BULKHEAD_QUEUE_SIZE,
								queue.length,
								{ action: action.name, service: service.fullName }
							);
							item.reject(err);
							callNext();
						});
				};

				return function bulkheadMiddleware(ctx) {
					// Call handler without waiting
					if (currentInFlight < opts.concurrency) {
						currentInFlight++;
						broker.metrics.set(
							METRIC$5.MOLECULER_REQUEST_BULKHEAD_INFLIGHT,
							currentInFlight,
							{ action: action.name, service: service.fullName }
						);
						broker.metrics.set(METRIC$5.MOLECULER_REQUEST_BULKHEAD_QUEUE_SIZE, queue.length, {
							action: action.name,
							service: service.fullName
						});
						return handler(ctx)
							.then(res => {
								currentInFlight--;
								broker.metrics.set(
									METRIC$5.MOLECULER_REQUEST_BULKHEAD_INFLIGHT,
									currentInFlight,
									{ action: action.name, service: service.fullName }
								);
								broker.metrics.set(
									METRIC$5.MOLECULER_REQUEST_BULKHEAD_QUEUE_SIZE,
									queue.length,
									{ action: action.name, service: service.fullName }
								);
								callNext();
								return res;
							})
							.catch(err => {
								currentInFlight--;
								broker.metrics.set(
									METRIC$5.MOLECULER_REQUEST_BULKHEAD_INFLIGHT,
									currentInFlight,
									{ action: action.name, service: service.fullName }
								);
								broker.metrics.set(
									METRIC$5.MOLECULER_REQUEST_BULKHEAD_QUEUE_SIZE,
									queue.length,
									{ action: action.name, service: service.fullName }
								);
								callNext();
								return broker.Promise.reject(err);
							});
					}

					// Check whether the queue is full
					if (opts.maxQueueSize && queue.length >= opts.maxQueueSize) {
						return broker.Promise.reject(
							new QueueIsFullError({ action: ctx.action.name, nodeID: ctx.nodeID })
						);
					}

					// Store the request in the queue
					const p = new Promise((resolve, reject) => queue.push({ resolve, reject, ctx }));
					broker.metrics.set(METRIC$5.MOLECULER_REQUEST_BULKHEAD_QUEUE_SIZE, queue.length, {
						action: action.name,
						service: service.fullName
					});

					return p;
				}.bind(this);
			}

			return handler;
		}

		function wrapEventBulkheadMiddleware(handler, event) {
			const service = event.service;

			const opts = Object.assign({}, this.options.bulkhead || {}, event.bulkhead || {});
			if (opts.enabled) {
				const queue = [];
				let currentInFlight = 0;

				// Call the next request from the queue
				const callNext = function callNext() {
					/* istanbul ignore next */
					if (queue.length === 0) return;

					/* istanbul ignore next */
					if (currentInFlight >= opts.concurrency) return;

					const item = queue.shift();

					currentInFlight++;
					broker.metrics.set(METRIC$5.MOLECULER_EVENT_BULKHEAD_INFLIGHT, currentInFlight, {
						event: event.name,
						service: service.fullName
					});
					broker.metrics.set(METRIC$5.MOLECULER_EVENT_BULKHEAD_QUEUE_SIZE, queue.length, {
						event: event.name,
						service: service.fullName
					});

					handler(item.ctx)
						.then(res => {
							currentInFlight--;
							broker.metrics.set(
								METRIC$5.MOLECULER_EVENT_BULKHEAD_INFLIGHT,
								currentInFlight,
								{ event: event.name, service: service.fullName }
							);
							broker.metrics.set(
								METRIC$5.MOLECULER_EVENT_BULKHEAD_QUEUE_SIZE,
								queue.length,
								{ event: event.name, service: service.fullName }
							);
							item.resolve(res);
							callNext();
						})
						.catch(err => {
							currentInFlight--;
							broker.metrics.set(
								METRIC$5.MOLECULER_EVENT_BULKHEAD_INFLIGHT,
								currentInFlight,
								{ event: event.name, service: service.fullName }
							);
							broker.metrics.set(
								METRIC$5.MOLECULER_EVENT_BULKHEAD_QUEUE_SIZE,
								queue.length,
								{ event: event.name, service: service.fullName }
							);
							item.reject(err);
							callNext();
						});
				};

				return function bulkheadMiddleware(ctx) {
					// Call handler without waiting
					if (currentInFlight < opts.concurrency) {
						currentInFlight++;
						broker.metrics.set(METRIC$5.MOLECULER_EVENT_BULKHEAD_INFLIGHT, currentInFlight, {
							event: event.name,
							service: service.fullName
						});
						broker.metrics.set(METRIC$5.MOLECULER_EVENT_BULKHEAD_QUEUE_SIZE, queue.length, {
							event: event.name,
							service: service.fullName
						});
						return handler(ctx)
							.then(res => {
								currentInFlight--;
								broker.metrics.set(
									METRIC$5.MOLECULER_EVENT_BULKHEAD_INFLIGHT,
									currentInFlight,
									{ event: event.name, service: service.fullName }
								);
								broker.metrics.set(
									METRIC$5.MOLECULER_EVENT_BULKHEAD_QUEUE_SIZE,
									queue.length,
									{ event: event.name, service: service.fullName }
								);
								callNext();
								return res;
							})
							.catch(err => {
								currentInFlight--;
								broker.metrics.set(
									METRIC$5.MOLECULER_EVENT_BULKHEAD_INFLIGHT,
									currentInFlight,
									{ event: event.name, service: service.fullName }
								);
								broker.metrics.set(
									METRIC$5.MOLECULER_EVENT_BULKHEAD_QUEUE_SIZE,
									queue.length,
									{ event: event.name, service: service.fullName }
								);
								callNext();
								return broker.Promise.reject(err);
							});
					}

					// Check whether the queue is full
					if (opts.maxQueueSize && queue.length >= opts.maxQueueSize) {
						return broker.Promise.reject(
							new QueueIsFullError({
								event: ctx.eventName,
								service: service.fullName,
								nodeID: ctx.nodeID
							})
						);
					}

					// Store the request in the queue
					const p = new Promise((resolve, reject) => queue.push({ resolve, reject, ctx }));
					broker.metrics.set(METRIC$5.MOLECULER_EVENT_BULKHEAD_QUEUE_SIZE, queue.length, {
						event: event.name,
						service: service.fullName
					});

					return p;
				}.bind(this);
			}

			return handler;
		}

		return {
			name: "Bulkhead",

			created() {
				if (broker.isMetricsEnabled()) {
					broker.metrics.register({
						name: METRIC$5.MOLECULER_REQUEST_BULKHEAD_INFLIGHT,
						type: METRIC$5.TYPE_GAUGE,
						labelNames: ["action", "service"]
					});
					broker.metrics.register({
						name: METRIC$5.MOLECULER_REQUEST_BULKHEAD_QUEUE_SIZE,
						type: METRIC$5.TYPE_GAUGE,
						labelNames: ["action", "service"]
					});

					broker.metrics.register({
						name: METRIC$5.MOLECULER_EVENT_BULKHEAD_INFLIGHT,
						type: METRIC$5.TYPE_GAUGE,
						labelNames: ["event", "service"]
					});
					broker.metrics.register({
						name: METRIC$5.MOLECULER_EVENT_BULKHEAD_QUEUE_SIZE,
						type: METRIC$5.TYPE_GAUGE,
						labelNames: ["event", "service"]
					});
				}
			},

			localAction: wrapActionBulkheadMiddleware,
			localEvent: wrapEventBulkheadMiddleware
		};
	};

	const { GracefulStopTimeoutError } = errors;

	var contextTracker = function ContextTrackerMiddleware(broker) {
		function addContext(ctx) {
			if (ctx.service) {
				// Local request
				ctx.service._trackedContexts.push(ctx);
			} else {
				// Remote request
				ctx.broker._trackedContexts.push(ctx);
			}
		}

		function removeContext(ctx) {
			if (ctx.service) {
				const idx = ctx.service._trackedContexts.indexOf(ctx);
				if (idx !== -1) ctx.service._trackedContexts.splice(idx, 1);
			} else {
				const idx = ctx.broker._trackedContexts.indexOf(ctx);
				if (idx !== -1) ctx.broker._trackedContexts.splice(idx, 1);
			}
		}

		function wrapTrackerMiddleware(handler) {
			if (this.options.tracking && this.options.tracking.enabled) {
				return function ContextTrackerMiddleware(ctx) {
					const tracked =
						ctx.options.tracking != null
							? ctx.options.tracking
							: this.options.tracking.enabled;

					// If no need to track
					if (!tracked) return handler(ctx);

					// Track the context
					addContext(ctx);

					// Call the handler
					let p;
					try {
						p = handler(ctx);
					} catch (error) {
						removeContext(ctx);
						throw error;
					}

					p = p
						.then(res => {
							removeContext(ctx);
							return res;
						})
						.catch(err => {
							removeContext(ctx);
							throw err;
						});

					return p;
				}.bind(this);
			}

			return handler;
		}

		function waitingForActiveContexts(list, logger, time, service) {
			if (!list || list.length === 0) return broker.Promise.resolve();

			return new broker.Promise(resolve => {
				let timedOut = false;
				const timeout = timersBrowserify.setTimeout(() => {
					timedOut = true;
					logger.error(new GracefulStopTimeoutError({ service }));
					list.length = 0; // Clear pointers
					resolve();
				}, time);

				let first = true;
				const checkForContexts = () => {
					if (list.length === 0) {
						clearTimeout(timeout);
						resolve();
					} else {
						if (first) {
							logger.warn(`Waiting for ${list.length} running context(s)...`);
							first = false;
						}
						if (!timedOut) timersBrowserify.setTimeout(checkForContexts, 100);
					}
				};
				setImmediate(checkForContexts);
			});
		}

		return {
			name: "ContextTracker",

			localAction: wrapTrackerMiddleware,
			remoteAction: wrapTrackerMiddleware,

			localEvent: wrapTrackerMiddleware,

			// After the broker created
			created(broker) {
				broker._trackedContexts = [];
			},

			// Before a local service started
			serviceStarting(service) {
				service._trackedContexts = [];
			},

			// Before a local service stopping
			serviceStopping(service) {
				return waitingForActiveContexts(
					service._trackedContexts,
					service.logger,
					service.settings.$shutdownTimeout ||
						service.broker.options.tracking.shutdownTimeout,
					service
				);
			},

			// Before broker stopping
			stopping(broker) {
				return waitingForActiveContexts(
					broker._trackedContexts,
					broker.logger,
					broker.options.tracking.shutdownTimeout
				);
			}
		};
	};

	/**
	 * @typedef {import("../registry/endpoint-action")} ActionEndpoint
	 * @typedef {import("../service")} Service
	 * @typedef {import("../context")} Context
	 * @typedef {import("../service").ActionSchema} ActionSchema
	 */


	const { METRIC: METRIC$6 } = metrics;

	var circuitBreaker = function circuitBreakerMiddleware(broker) {
		let windowTimer;
		const store = new Map();
		let logger;

		/**
		 * Create timer to clear endpoint store
		 *
		 * @param {Number} windowTime
		 */
		function createWindowTimer(windowTime) {
			if (!windowTimer) {
				windowTimer = timersBrowserify.setInterval(() => resetStore(), (windowTime || 60) * 1000);
				windowTimer.unref();
			}
		}

		/**
		 * Clear endpoint state store
		 */
		function resetStore() {
			if (!logger) return;

			logger.debug("Reset circuit-breaker endpoint states...");
			store.forEach((item, key) => {
				if (item.count === 0) {
					logger.debug(`Remove '${key}' endpoint state because it is not used`);
					store.delete(key);
					return;
				}

				logger.debug(`Clean '${key}' endpoint state.`);
				item.count = 0;
				item.failures = 0;
			});
		}

		/**
		 * Get Endpoint state from store. If not exists, create it.
		 *
		 * @param {ActionEndpoint} ep
		 * @param {Service} service
		 * @param {Object} opts
		 * @returns {Object}
		 */
		function getEpState(ep, service, opts) {
			let item = store.get(ep.name);
			if (!item) {
				item = {
					ep,
					service,
					opts,
					count: 0,
					failures: 0,
					state: constants.CIRCUIT_CLOSE,
					cbTimer: null
				};
				store.set(ep.name, item);
			}
			return item;
		}

		/**
		 * Increment failure counter
		 *
		 * @param {Object} item
		 * @param {Error} err
		 * @param {Context} ctx
		 */
		function failure(item, err, ctx) {
			item.count++;
			item.failures++;

			checkThreshold(item);
		}

		/**
		 * Increment request counter and switch CB to CLOSE if it is on HALF_OPEN_WAIT.
		 *
		 * @param {Object} item
		 * @param {Context} ctx
		 */
		function success(item, ctx) {
			item.count++;

			if (item.state === constants.CIRCUIT_HALF_OPEN_WAIT) circuitClose(item);
			else checkThreshold(item);
		}

		/**
		 * Check circuit-breaker failure threshold of Endpoint
		 *
		 * @param {Object} item
		 * @param {Context} ctx
		 */
		function checkThreshold(item, ctx) {
			if (item.count >= item.opts.minRequestCount) {
				const rate = item.failures / item.count;
				if (rate >= item.opts.threshold) trip(item);
			}
		}

		/**
		 * Trip the circuit-breaker, change the status to open
		 *
		 * @param {Object} item
		 * @param {Context} ctx
		 */
		function trip(item, ctx) {
			if (item.state == constants.CIRCUIT_OPEN) return;

			item.state = constants.CIRCUIT_OPEN;
			item.ep.state = false;

			if (item.cbTimer) {
				clearTimeout(item.cbTimer);
				item.cbTimer = null;
			}

			item.cbTimer = timersBrowserify.setTimeout(() => halfOpen(item), item.opts.halfOpenTime);
			item.cbTimer.unref();

			const action = item.ep.action;
			const service = item.service.fullName;

			const rate = item.count > 0 ? item.failures / item.count : 0;
			logger.debug(`Circuit breaker has been opened on '${item.ep.name}' endpoint.`, {
				nodeID: item.ep.id,
				service,
				action: action.name,
				failures: item.failures,
				count: item.count,
				rate
			});
			broker.broadcast("$circuit-breaker.opened", {
				nodeID: item.ep.id,
				service,
				action: action.name,
				failures: item.failures,
				count: item.count,
				rate
			});

			broker.metrics.set(METRIC$6.MOLECULER_CIRCUIT_BREAKER_OPENED_ACTIVE, 1, {
				affectedNodeID: item.ep.id,
				service,
				action: action.name
			});
			broker.metrics.increment(METRIC$6.MOLECULER_CIRCUIT_BREAKER_OPENED_TOTAL, {
				affectedNodeID: item.ep.id,
				service,
				action: action.name
			});
		}

		/**
		 * Change circuit-breaker status to half-open
		 *
		 * @param {Object} item
		 * @param {Context} ctx
		 */
		function halfOpen(item, ctx) {
			item.state = constants.CIRCUIT_HALF_OPEN;
			item.ep.state = true;

			const action = item.ep.action;
			const service = item.service.fullName;

			logger.debug(`Circuit breaker has been half-opened on '${item.ep.name}' endpoint.`, {
				nodeID: item.ep.id,
				service,
				action: action.name
			});

			broker.broadcast("$circuit-breaker.half-opened", {
				nodeID: item.ep.id,
				service,
				action: action.name
			});

			broker.metrics.set(METRIC$6.MOLECULER_CIRCUIT_BREAKER_OPENED_ACTIVE, 0, {
				affectedNodeID: item.ep.id,
				service,
				action: action.name
			});
			broker.metrics.set(METRIC$6.MOLECULER_CIRCUIT_BREAKER_HALF_OPENED_ACTIVE, 1, {
				affectedNodeID: item.ep.id,
				service,
				action: action.name
			});

			if (item.cbTimer) {
				clearTimeout(item.cbTimer);
				item.cbTimer = null;
			}
		}

		/**
		 * Change circuit-breaker status to half-open waiting. First request is invoked after half-open.
		 *
		 * @param {Object} item
		 * @param {Context} ctx
		 */
		function halfOpenWait(item, ctx) {
			item.state = constants.CIRCUIT_HALF_OPEN_WAIT;
			item.ep.state = false;

			// Anti-stick protection
			item.cbTimer = timersBrowserify.setTimeout(() => halfOpen(item), item.opts.halfOpenTime);
			item.cbTimer.unref();
		}

		/**
		 * Change circuit-breaker status to close
		 *
		 * @param {Object} item
		 * @param {Context} ctx
		 */
		function circuitClose(item, ctx) {
			item.state = constants.CIRCUIT_CLOSE;
			item.ep.state = true;
			item.failures = 0;
			item.count = 0;

			const action = item.ep.action;
			const service = item.service.fullName;

			logger.debug(`Circuit breaker has been closed on '${item.ep.name}' endpoint.`, {
				nodeID: item.ep.id,
				service,
				action: action.name
			});

			broker.broadcast("$circuit-breaker.closed", {
				nodeID: item.ep.id,
				service,
				action: action.name
			});

			broker.metrics.set(METRIC$6.MOLECULER_CIRCUIT_BREAKER_OPENED_ACTIVE, 0, {
				affectedNodeID: item.ep.id,
				service,
				action: action.name
			});
			broker.metrics.set(METRIC$6.MOLECULER_CIRCUIT_BREAKER_HALF_OPENED_ACTIVE, 0, {
				affectedNodeID: item.ep.id,
				service,
				action: action.name
			});

			if (item.cbTimer) {
				clearTimeout(item.cbTimer);
				item.cbTimer = null;
			}
		}

		/**
		 * Middleware wrapper function
		 *
		 * @param {Function} handler
		 * @param {ActionSchema} action
		 * @returns {Function}
		 */
		function wrapCBMiddleware(handler, action) {
			const service = action.service;
			// Merge action option and broker options
			const opts = Object.assign(
				{},
				this.options.circuitBreaker || {},
				action.circuitBreaker || {}
			);
			if (opts.enabled) {
				return function circuitBreakerMiddleware(ctx) {
					// Get endpoint state item
					const ep = ctx.endpoint;
					const item = getEpState(ep, service, opts);

					// Handle half-open state in circuit breaker
					if (item.state == constants.CIRCUIT_HALF_OPEN) {
						halfOpenWait(item);
					}

					// Call the handler
					return handler(ctx)
						.then(res => {
							const item = getEpState(ep, service, opts);
							success(item);

							return res;
						})
						.catch(err => {
							if (opts.check && opts.check(err)) {
								// Failure if error is created locally (not came from a 3rd node error)
								if (item && (!err.nodeID || err.nodeID == ctx.nodeID)) {
									const item = getEpState(ep, service, opts);
									failure(item);
								}
							}

							return this.Promise.reject(err);
						});
				}.bind(this);
			}

			return handler;
		}

		return {
			name: "CircuitBreaker",

			created(broker) {
				logger = broker.getLogger("circuit-breaker");

				// Expose the internal state store.
				broker.CircuitBreakerStore = store;

				const opts = broker.options.circuitBreaker;
				if (opts.enabled) {
					createWindowTimer(opts.windowTime);

					if (broker.isMetricsEnabled()) {
						broker.metrics.register({
							name: METRIC$6.MOLECULER_CIRCUIT_BREAKER_OPENED_ACTIVE,
							type: METRIC$6.TYPE_GAUGE,
							labelNames: ["affectedNodeID", "service", "action"],
							description: "Number of active opened circuit-breakers"
						});
						broker.metrics.register({
							name: METRIC$6.MOLECULER_CIRCUIT_BREAKER_OPENED_TOTAL,
							type: METRIC$6.TYPE_COUNTER,
							labelNames: ["affectedNodeID", "service", "action"],
							description: "Number of opened circuit-breakers"
						});
						broker.metrics.register({
							name: METRIC$6.MOLECULER_CIRCUIT_BREAKER_HALF_OPENED_ACTIVE,
							type: METRIC$6.TYPE_GAUGE,
							labelNames: ["affectedNodeID", "service", "action"],
							description: "Number of active half-opened circuit-breakers"
						});
					}
				}
			},

			localAction: wrapCBMiddleware,
			remoteAction: wrapCBMiddleware,

			stopped() {
				if (windowTimer) {
					clearInterval(windowTimer);
				}

				delete broker.CircuitBreakerStore;
			}
		};
	};

	const { TimeoutError, RequestTimeoutError } = errors;
	const { Stream } = require$$0__default$1;
	const { METRIC: METRIC$7 } = metrics;

	var timeout = function (broker) {
		function wrapTimeoutMiddleware(handler, action) {
			const actionTimeout = action.timeout;
			const actionName = action.name;
			const service = action.service ? action.service.fullName : null;

			return function timeoutMiddleware(ctx) {
				// Load opts with default values
				if (ctx.options.timeout == null) {
					if (actionTimeout != null) ctx.options.timeout = actionTimeout;
					else ctx.options.timeout = broker.options.requestTimeout;
				}

				if (ctx.options.timeout > 0 && !ctx.startHrTime) {
					// For distributed timeout calculation need to be set
					ctx.startHrTime = _process.hrtime();
				}

				// Call the handler
				const p = handler(ctx);
				if (ctx.options.timeout > 0 && p.timeout) {
					return p.timeout(ctx.options.timeout).catch(err => {
						if (err instanceof TimeoutError) {
							const nodeID = ctx.nodeID;
							this.logger.warn(`Request '${actionName}' is timed out.`, {
								requestID: ctx.requestID,
								nodeID,
								timeout: ctx.options.timeout
							});

							if (ctx.params instanceof Stream) {
								ctx.params.emit("moleculer-timeout-middleware", ctx.options.timeout);
							}

							err = new RequestTimeoutError({ action: actionName, nodeID });

							broker.metrics.increment(METRIC$7.MOLECULER_REQUEST_TIMEOUT_TOTAL, {
								service,
								action: actionName
							});
						}
						throw err;
					});
				}

				return p;
			}.bind(this);
		}

		return {
			name: "Timeout",

			created(broker) {
				if (broker.isMetricsEnabled()) {
					broker.metrics.register({
						name: METRIC$7.MOLECULER_REQUEST_TIMEOUT_TOTAL,
						type: METRIC$7.TYPE_COUNTER,
						labelNames: ["service", "action"],
						description: "Number of timed out requests",
						rate: true
					});
				}
			},

			localAction: wrapTimeoutMiddleware,
			remoteAction: wrapTimeoutMiddleware
		};
	};

	const { METRIC: METRIC$8 } = metrics;

	var retry = function RetryMiddleware(broker) {
		function wrapRetryMiddleware(handler, action) {
			const actionName = action.name;
			const service = action.service ? action.service.fullName : null;
			// Merge action option and broker options
			const opts = Object.assign({}, this.options.retryPolicy, action.retryPolicy || {});
			if (opts.enabled) {
				return function retryMiddleware(ctx) {
					const attempts =
						typeof ctx.options.retries === "number" ? ctx.options.retries : opts.retries;
					if (ctx._retryAttempts == null) ctx._retryAttempts = 0;

					// Call the handler
					return handler(ctx).catch(err => {
						// Skip retry if it is a remote call. The retry logic will run on the caller node
						// because the Retry middleware wrap the `remoteAction` hook, as well.
						if (ctx.nodeID != broker.nodeID && ctx.endpoint.local)
							return Promise.reject(err);

						// Check the error's `retryable` property.
						if (opts.check(err)) {
							broker.metrics.increment(METRIC$8.MOLECULER_REQUEST_RETRY_ATTEMPTS_TOTAL, {
								service,
								action: action.name
							});

							if (ctx._retryAttempts < attempts) {
								// Retry call
								ctx._retryAttempts++;

								// Correct tracing
								if (ctx.span) {
									ctx.span.setError(err);
									ctx.span.addTags({ retryAttempts: ctx._retryAttempts });
									ctx.finishSpan(ctx.span);
								}

								// Calculate next delay
								const delay = Math.min(
									opts.delay * Math.pow(opts.factor, ctx._retryAttempts - 1),
									opts.maxDelay
								);

								broker.logger.warn(
									`Retry to call '${actionName}' action after ${delay} ms...`,
									{ requestID: ctx.requestID, attempts: ctx._retryAttempts }
								);

								// Wait & recall
								return broker.Promise.delay(delay).then(() => {
									const newCtx = ctx.copy();
									newCtx._retryAttempts = ctx._retryAttempts;

									if (action.visibility == "private")
										return ctx.service.actions[action.rawName](ctx.params, {
											ctx: newCtx
										});

									return broker.call(actionName, ctx.params, { ctx: newCtx });
								});
							}
						}

						// Throw error
						return Promise.reject(err);
					});
				}.bind(this);
			}

			return handler;
		}

		return {
			name: "Retry",

			created() {
				if (broker.isMetricsEnabled()) {
					broker.metrics.register({
						name: METRIC$8.MOLECULER_REQUEST_RETRY_ATTEMPTS_TOTAL,
						type: METRIC$8.TYPE_COUNTER,
						labelNames: ["service", "action"],
						description: "Number of retries",
						rate: true
					});
				}
			},

			localAction: wrapRetryMiddleware,
			remoteAction: wrapRetryMiddleware
		};
	};

	const { MoleculerError } = errors;
	const { METRIC: METRIC$9 } = metrics;
	const { isFunction: isFunction$6, isString: isString$d } = utils_1;

	var fallback = function FallbackMiddleware(broker) {
		function handleContextFallback(ctx, err) {
			broker.logger.warn(
				`The '${ctx.action.name}' request is failed. Return fallback response.`,
				{ requestID: ctx.requestID, err: err.message }
			);
			broker.metrics.increment(METRIC$9.MOLECULER_REQUEST_FALLBACK_TOTAL, {
				action: ctx.action.name
			});
			ctx.fallbackResult = true;

			if (isFunction$6(ctx.options.fallbackResponse)) return ctx.options.fallbackResponse(ctx, err);
			else return Promise.resolve(ctx.options.fallbackResponse);
		}

		function wrapFallbackMiddleware(handler, action) {
			return function fallbackMiddleware(ctx) {
				// Call the handler
				return handler(ctx).catch(err => {
					// Handle fallback response from calling options
					if (ctx.options.fallbackResponse) {
						return handleContextFallback(ctx, err);
					}

					// Handle fallback from Action Definition (only locally)
					if (action.fallback && action.service) {
						const svc = action.service;

						const fallback = isString$d(action.fallback)
							? svc[action.fallback]
							: action.fallback;
						if (!isFunction$6(fallback)) {
							/* istanbul ignore next */
							throw new MoleculerError(
								`The 'fallback' of '${action.name}' action is not a Function or valid method name: ${action.fallback}`
							);
						}

						svc.logger.warn(
							`The '${ctx.action.name}' request is failed. Return fallback response.`,
							{ requestID: ctx.requestID, err: err.message }
						);
						broker.metrics.increment(METRIC$9.MOLECULER_REQUEST_FALLBACK_TOTAL, {
							service: svc.fullName,
							action: action.name
						});
						ctx.fallbackResult = true;

						return fallback.call(svc, ctx, err);
					}

					return Promise.reject(err);
				});
			}.bind(this);
		}

		return {
			name: "Fallback",

			created(broker) {
				if (broker.isMetricsEnabled()) {
					broker.metrics.register({
						name: METRIC$9.MOLECULER_REQUEST_FALLBACK_TOTAL,
						type: METRIC$9.TYPE_COUNTER,
						labelNames: ["service", "action"],
						description: "Number of fallbacked requests",
						rate: true
					});
				}
			},

			localAction: wrapFallbackMiddleware,
			remoteAction: wrapFallbackMiddleware

			/*call(next) {
				return (actionName, params, opts) => {
					return next(actionName, params, opts).catch(err => {
						if (opts.fallbackResponse) {
							return handleContextFallback(null, err);
						}
						throw err;
					});
				};
			},*/
		};
	};

	const { MoleculerError: MoleculerError$1 } = errors;

	function wrapActionErrorHandler(handler) {
		return function errorHandlerMiddleware(ctx) {
			// Call the handler
			return handler(ctx).catch(err => {
				if (!(err instanceof Error)) err = new MoleculerError$1(err, 500);

				if (ctx.nodeID !== this.nodeID) {
					// Remove pending request (the request didn't reach the target service)
					if (this.transit) this.transit.removePendingRequest(ctx.id);
				}

				this.logger.debug(
					`The '${ctx.action.name}' request is rejected.`,
					{ requestID: ctx.requestID },
					err
				);

				Object.defineProperty(err, "ctx", {
					value: ctx,
					writable: true,
					enumerable: false
				});

				// Call global errorHandler
				return ctx.broker.errorHandler(err, {
					ctx,
					service: ctx.service,
					action: ctx.action
				});
			});
		}.bind(this);
	}

	function wrapEventErrorHandler(handler) {
		return function errorHandlerMiddleware(ctx) {
			// Call the handler
			return handler(ctx).catch(err => {
				if (!(err instanceof Error)) err = new MoleculerError$1(err, 500);

				this.logger.debug(
					`Error occured in the '${ctx.event.name}' event handler in the '${ctx.service.fullName}' service.`,
					{ requestID: ctx.requestID },
					err
				);

				Object.defineProperty(err, "ctx", {
					value: ctx,
					writable: true,
					enumerable: false
				});

				// Call global errorHandler
				return ctx.broker.errorHandler(err, {
					ctx,
					service: ctx.service,
					event: ctx.event
				});
			});
		}.bind(this);
	}

	var errorHandler = function () {
		return {
			name: "ErrorHandler",

			localAction: wrapActionErrorHandler,
			remoteAction: wrapActionErrorHandler,

			localEvent: wrapEventErrorHandler
		};
	};

	const { METRIC: METRIC$a } = metrics;

	var metrics$1 = function MetricsMiddleware(broker) {
		const metrics = broker.metrics;

		function getActionHandler(type, actionDef, next) {
			const action = actionDef.name;
			const service = actionDef.service ? actionDef.service.fullName : null;

			return function metricsMiddleware(ctx) {
				const caller = ctx.caller;

				metrics.increment(METRIC$a.MOLECULER_REQUEST_TOTAL, { service, action, caller, type });
				metrics.increment(METRIC$a.MOLECULER_REQUEST_ACTIVE, { service, action, caller, type });
				metrics.increment(METRIC$a.MOLECULER_REQUEST_LEVELS, {
					service,
					action,
					caller,
					level: ctx.level
				});
				const timeEnd = metrics.timer(METRIC$a.MOLECULER_REQUEST_TIME, {
					service,
					action,
					caller,
					type
				});

				// Call the next handler
				return next(ctx)
					.then(res => {
						timeEnd();
						metrics.decrement(METRIC$a.MOLECULER_REQUEST_ACTIVE, {
							service,
							action,
							caller,
							type
						});
						return res;
					})
					.catch(err => {
						timeEnd();
						metrics.decrement(METRIC$a.MOLECULER_REQUEST_ACTIVE, {
							service,
							action,
							caller,
							type
						});
						metrics.increment(METRIC$a.MOLECULER_REQUEST_ERROR_TOTAL, {
							service,
							action,
							caller,
							type,
							errorName: err ? err.name : null,
							errorCode: err ? err.code : null,
							errorType: err ? err.type : null
						});
						throw err;
					});
			};
		}

		return {
			name: "Metrics",

			created() {
				if (broker.isMetricsEnabled()) {
					// --- MOLECULER REQUEST METRICS ---
					metrics.register({
						name: METRIC$a.MOLECULER_REQUEST_TOTAL,
						type: METRIC$a.TYPE_COUNTER,
						labelNames: ["service", "action", "type", "caller"],
						unit: METRIC$a.UNIT_REQUEST,
						description: "Number of requests",
						rate: true
					});
					metrics.register({
						name: METRIC$a.MOLECULER_REQUEST_ACTIVE,
						type: METRIC$a.TYPE_GAUGE,
						labelNames: ["service", "action", "type", "caller"],
						unit: METRIC$a.UNIT_REQUEST,
						description: "Number of active requests"
					});
					metrics.register({
						name: METRIC$a.MOLECULER_REQUEST_ERROR_TOTAL,
						type: METRIC$a.TYPE_COUNTER,
						labelNames: [
							"service",
							"action",
							"type",
							"caller",
							"errorName",
							"errorCode",
							"errorType"
						],
						unit: METRIC$a.UNIT_REQUEST,
						description: "Number of request errors",
						rate: true
					});
					metrics.register({
						name: METRIC$a.MOLECULER_REQUEST_TIME,
						type: METRIC$a.TYPE_HISTOGRAM,
						labelNames: ["service", "action", "type", "caller"],
						quantiles: true,
						buckets: true,
						unit: METRIC$a.UNIT_MILLISECONDS,
						description: "Request times in milliseconds",
						rate: true
					});
					metrics.register({
						name: METRIC$a.MOLECULER_REQUEST_LEVELS,
						type: METRIC$a.TYPE_COUNTER,
						labelNames: ["level"],
						unit: METRIC$a.UNIT_REQUEST,
						description: "Number of requests by context level"
					});
					//metrics.register({ name: METRIC.MOLECULER_REQUEST_DIRECTCALL_TOTAL, type: METRIC.TYPE_COUNTER, labelNames: ["action"], unit: METRIC.UNIT_REQUEST, description: "Number of direct calls", rate: true });
					//metrics.register({ name: METRIC.MOLECULER_REQUEST_MULTICALL_TOTAL, type: METRIC.TYPE_COUNTER, unit: METRIC.UNIT_REQUEST, description: "Number of multicalls", rate: true });

					// --- MOLECULER EVENTS METRICS ---
					metrics.register({
						name: METRIC$a.MOLECULER_EVENT_EMIT_TOTAL,
						type: METRIC$a.TYPE_COUNTER,
						labelNames: ["event", "groups"],
						unit: METRIC$a.UNIT_EVENT,
						description: "Number of emitted events",
						rate: true
					});
					metrics.register({
						name: METRIC$a.MOLECULER_EVENT_BROADCAST_TOTAL,
						type: METRIC$a.TYPE_COUNTER,
						labelNames: ["event", "groups"],
						unit: METRIC$a.UNIT_EVENT,
						description: "Number of broadcast events",
						rate: true
					});
					metrics.register({
						name: METRIC$a.MOLECULER_EVENT_BROADCASTLOCAL_TOTAL,
						type: METRIC$a.TYPE_COUNTER,
						labelNames: ["event", "groups"],
						unit: METRIC$a.UNIT_EVENT,
						description: "Number of local broadcast events",
						rate: true
					});

					metrics.register({
						name: METRIC$a.MOLECULER_EVENT_RECEIVED_TOTAL,
						type: METRIC$a.TYPE_COUNTER,
						labelNames: ["service", "group", "event", "caller"],
						unit: METRIC$a.UNIT_EVENT,
						description: "Number of received events",
						rate: true
					});
					metrics.register({
						name: METRIC$a.MOLECULER_EVENT_RECEIVED_ACTIVE,
						type: METRIC$a.TYPE_GAUGE,
						labelNames: ["service", "group", "event", "caller"],
						unit: METRIC$a.UNIT_REQUEST,
						description: "Number of active event executions"
					});
					metrics.register({
						name: METRIC$a.MOLECULER_EVENT_RECEIVED_ERROR_TOTAL,
						type: METRIC$a.TYPE_COUNTER,
						labelNames: [
							"service",
							"group",
							"event",
							"caller",
							"errorName",
							"errorCode",
							"errorType"
						],
						unit: METRIC$a.UNIT_REQUEST,
						description: "Number of event execution errors",
						rate: true
					});
					metrics.register({
						name: METRIC$a.MOLECULER_EVENT_RECEIVED_TIME,
						type: METRIC$a.TYPE_HISTOGRAM,
						labelNames: ["service", "group", "event", "caller"],
						quantiles: true,
						buckets: true,
						unit: METRIC$a.UNIT_MILLISECONDS,
						description: "Execution time of events in milliseconds",
						rate: true
					});

					// --- MOLECULER TRANSIT METRICS ---

					metrics.register({
						name: METRIC$a.MOLECULER_TRANSIT_PUBLISH_TOTAL,
						type: METRIC$a.TYPE_COUNTER,
						labelNames: ["type"],
						unit: METRIC$a.UNIT_PACKET,
						description: "Number of published packets",
						rate: true
					});
					metrics.register({
						name: METRIC$a.MOLECULER_TRANSIT_RECEIVE_TOTAL,
						type: METRIC$a.TYPE_COUNTER,
						labelNames: ["type"],
						unit: METRIC$a.UNIT_PACKET,
						description: "Number of received packets",
						rate: true
					});

					metrics.register({
						name: METRIC$a.MOLECULER_TRANSIT_REQUESTS_ACTIVE,
						type: METRIC$a.TYPE_GAUGE,
						unit: METRIC$a.UNIT_REQUEST,
						description: "Number of active requests"
					});
					metrics.register({
						name: METRIC$a.MOLECULER_TRANSIT_STREAMS_SEND_ACTIVE,
						type: METRIC$a.TYPE_GAUGE,
						unit: METRIC$a.UNIT_STREAM,
						description: "Number of active sent streams"
					});
					//metrics.register({ name: METRIC.MOLECULER_TRANSIT_STREAMS_RECEIVE_ACTIVE, type: METRIC.TYPE_GAUGE, description: "" });

					// --- MOLECULER TRANSPORTER METRICS ---

					metrics.register({
						name: METRIC$a.MOLECULER_TRANSPORTER_PACKETS_SENT_TOTAL,
						type: METRIC$a.TYPE_COUNTER,
						unit: METRIC$a.UNIT_PACKET,
						description: "Number of sent packets",
						rate: true
					});
					metrics.register({
						name: METRIC$a.MOLECULER_TRANSPORTER_PACKETS_SENT_BYTES,
						type: METRIC$a.TYPE_COUNTER,
						unit: METRIC$a.UNIT_BYTE,
						description: "Number of sent bytes",
						rate: true
					});
					metrics.register({
						name: METRIC$a.MOLECULER_TRANSPORTER_PACKETS_RECEIVED_TOTAL,
						type: METRIC$a.TYPE_COUNTER,
						unit: METRIC$a.UNIT_PACKET,
						description: "Number of received packets",
						rate: true
					});
					metrics.register({
						name: METRIC$a.MOLECULER_TRANSPORTER_PACKETS_RECEIVED_BYTES,
						type: METRIC$a.TYPE_COUNTER,
						unit: METRIC$a.UNIT_BYTE,
						description: "Number of received bytes",
						rate: true
					});
				}
			},

			localAction(next, action) {
				if (broker.isMetricsEnabled()) return getActionHandler("local", action, next);

				return next;
			},

			remoteAction(next, action) {
				if (broker.isMetricsEnabled()) return getActionHandler("remote", action, next);

				return next;
			},

			// Wrap local event handlers
			localEvent(next, event) {
				const service = event.service ? event.service.name : null;
				if (broker.isMetricsEnabled()) {
					return function metricsMiddleware(ctx) {
						const group = event.group || service;
						metrics.increment(METRIC$a.MOLECULER_EVENT_RECEIVED_TOTAL, {
							service,
							event: ctx.eventName,
							group,
							caller: ctx.caller
						});
						metrics.increment(METRIC$a.MOLECULER_EVENT_RECEIVED_ACTIVE, {
							service,
							event: ctx.eventName,
							group,
							caller: ctx.caller
						});
						const timeEnd = metrics.timer(METRIC$a.MOLECULER_EVENT_RECEIVED_TIME, {
							service,
							event: ctx.eventName,
							group,
							caller: ctx.caller
						});
						return next
							.apply(this, arguments)
							.then(res => {
								timeEnd();
								metrics.decrement(METRIC$a.MOLECULER_EVENT_RECEIVED_ACTIVE, {
									service,
									event: ctx.eventName,
									group,
									caller: ctx.caller
								});
								return res;
							})
							.catch(err => {
								timeEnd();
								metrics.decrement(METRIC$a.MOLECULER_EVENT_RECEIVED_ACTIVE, {
									service,
									event: ctx.eventName,
									group,
									caller: ctx.caller
								});
								metrics.increment(METRIC$a.MOLECULER_EVENT_RECEIVED_ERROR_TOTAL, {
									service,
									event: ctx.eventName,
									group,
									caller: ctx.caller,
									errorName: err ? err.name : null,
									errorCode: err ? err.code : null,
									errorType: err ? err.type : null
								});
								throw err;
							});
					}.bind(this);
				}

				return next;
			},

			// Wrap broker.emit method
			emit(next) {
				if (broker.isMetricsEnabled()) {
					return function metricsMiddleware(/* event, payload */) {
						metrics.increment(METRIC$a.MOLECULER_EVENT_EMIT_TOTAL, { event: arguments[0] });
						return next.apply(this, arguments);
					};
				}
				return next;
			},

			// Wrap broker.broadcast method
			broadcast(next) {
				if (broker.isMetricsEnabled()) {
					return function metricsMiddleware(/* event, payload */) {
						metrics.increment(METRIC$a.MOLECULER_EVENT_BROADCAST_TOTAL, {
							event: arguments[0]
						});
						return next.apply(this, arguments);
					};
				}
				return next;
			},

			// Wrap broker.broadcastLocal method
			broadcastLocal(next) {
				if (broker.isMetricsEnabled()) {
					return function metricsMiddleware(/* event, payload */) {
						metrics.increment(METRIC$a.MOLECULER_EVENT_BROADCASTLOCAL_TOTAL, {
							event: arguments[0]
						});
						return next.apply(this, arguments);
					};
				}
				return next;
			},

			// When transit publishing a packet
			transitPublish(next) {
				const transit = this;
				if (broker.isMetricsEnabled()) {
					return function metricsMiddleware(/* packet */) {
						metrics.increment(METRIC$a.MOLECULER_TRANSIT_PUBLISH_TOTAL, {
							type: arguments[0].type
						});

						const p = next.apply(this, arguments);

						metrics.increment(
							METRIC$a.MOLECULER_TRANSIT_REQUESTS_ACTIVE,
							null,
							transit.pendingRequests.size
						);
						//metrics.increment(METRIC.MOLECULER_TRANSIT_STREAMS_RECEIVE_ACTIVE, null, transit.);
						metrics.increment(
							METRIC$a.MOLECULER_TRANSIT_STREAMS_SEND_ACTIVE,
							null,
							transit.pendingReqStreams.size + this.pendingResStreams.size
						);

						return p;
					};
				}
				return next;
			},

			// When transit receives & handles a packet
			transitMessageHandler(next) {
				if (broker.isMetricsEnabled()) {
					return function metricsMiddleware(/* cmd, packet */) {
						metrics.increment(METRIC$a.MOLECULER_TRANSIT_RECEIVE_TOTAL, {
							type: arguments[0]
						});
						return next.apply(this, arguments);
					};
				}
				return next;
			},

			// When transporter send data
			transporterSend(next) {
				if (broker.isMetricsEnabled()) {
					return function metricsMiddleware(/* topic, data, meta */) {
						const data = arguments[1];
						metrics.increment(METRIC$a.MOLECULER_TRANSPORTER_PACKETS_SENT_TOTAL);
						metrics.increment(
							METRIC$a.MOLECULER_TRANSPORTER_PACKETS_SENT_BYTES,
							null,
							data && data.length ? data.length : 0
						);
						return next.apply(this, arguments);
					};
				}
				return next;
			},

			// When transporter received data
			transporterReceive(next) {
				if (broker.isMetricsEnabled()) {
					return function metricsMiddleware(/* cmd, data, s */) {
						const data = arguments[1];
						metrics.increment(METRIC$a.MOLECULER_TRANSPORTER_PACKETS_RECEIVED_TOTAL);
						metrics.increment(
							METRIC$a.MOLECULER_TRANSPORTER_PACKETS_RECEIVED_BYTES,
							null,
							data && data.length ? data.length : 0
						);
						return next.apply(this, arguments);
					};
				}
				return next;
			}
		};
	};

	const { isFunction: isFunction$7, isPlainObject: isPlainObject$3, safetyObject } = utils_1;

	var tracing = function TracingMiddleware(broker) {
		const tracer = broker.tracer;

		function tracingLocalActionMiddleware(handler, action) {
			let opts = action.tracing;
			if (opts === true || opts === false) opts = { enabled: !!opts };
			opts = ___default.defaultsDeep({}, opts, { enabled: true });

			if (opts.enabled) {
				return function tracingLocalActionMiddleware(ctx) {
					ctx.requestID = ctx.requestID || tracer.getCurrentTraceID();
					ctx.parentID = ctx.parentID || tracer.getActiveSpanID();

					let tags = {
						callingLevel: ctx.level,
						action: ctx.action
							? {
									name: ctx.action.name,
									rawName: ctx.action.rawName
								}
							: null,
						remoteCall: ctx.nodeID !== ctx.broker.nodeID,
						callerNodeID: ctx.nodeID,
						nodeID: ctx.broker.nodeID,
						options: {
							timeout: ctx.options.timeout,
							retries: ctx.options.retries
						},
						requestID: ctx.requestID
					};
					const globalActionTags = tracer.opts.tags.action;
					/** @type {Record<string, any>} */
					let actionTags;
					// local action tags take precedence
					if (isFunction$7(opts.tags)) {
						actionTags = opts.tags;
					} else if (!opts.tags && isFunction$7(globalActionTags)) {
						actionTags = globalActionTags;
					} else {
						// By default all params are captured. This can be overridden globally and locally
						actionTags = { ...{ params: true }, ...globalActionTags, ...opts.tags };
					}

					if (isFunction$7(actionTags)) {
						const res = actionTags.call(ctx.service, ctx);
						if (res) Object.assign(tags, res);
					} else if (isPlainObject$3(actionTags)) {
						if (actionTags.params === true)
							tags.params =
								ctx.params != null && isPlainObject$3(ctx.params)
									? Object.assign({}, ctx.params)
									: ctx.params;
						else if (Array.isArray(actionTags.params))
							tags.params = ___default.pick(ctx.params, actionTags.params);

						if (actionTags.meta === true)
							tags.meta = ctx.meta != null ? Object.assign({}, ctx.meta) : ctx.meta;
						else if (Array.isArray(actionTags.meta))
							tags.meta = ___default.pick(ctx.meta, actionTags.meta);
					}

					if (opts.safetyTags) {
						tags = safetyObject(tags);
					}

					let spanName = `action '${ctx.action.name}'`;
					if (opts.spanName) {
						switch (typeof opts.spanName) {
							case "string":
								spanName = opts.spanName;
								break;
							case "function":
								spanName = opts.spanName.call(ctx.service, ctx);
								break;
						}
					}

					const span = ctx.startSpan(spanName, {
						id: ctx.id,
						type: "action",
						traceID: ctx.requestID,
						parentID: ctx.parentID,
						service: ctx.service,
						sampled: ctx.tracing,
						tags
					});

					ctx.tracing = span.sampled;

					// Call the handler
					return handler(ctx)
						.then(res => {
							const tags = {
								fromCache: ctx.cachedResult
							};

							if (isFunction$7(actionTags)) {
								const r = actionTags.call(ctx.service, ctx, res);
								if (r) Object.assign(tags, r);
							} else if (isPlainObject$3(actionTags)) {
								if (actionTags.response === true)
									tags.response =
										res != null && isPlainObject$3(res)
											? Object.assign({}, res)
											: res;
								else if (Array.isArray(actionTags.response))
									tags.response = ___default.pick(res, actionTags.response);
							}

							span.addTags(tags);
							ctx.finishSpan(span);

							//ctx.duration = span.duration;

							return res;
						})
						.catch(err => {
							span.setError(err);
							ctx.finishSpan(span);

							throw err;
						});
				}.bind(this);
			}

			return handler;
		}

		function tracingLocalEventMiddleware(handler, event) {
			const service = event.service;

			let opts = event.tracing;
			if (opts === true || opts === false) opts = { enabled: !!opts };
			opts = ___default.defaultsDeep({}, opts, { enabled: true });

			if (opts.enabled) {
				return function tracingLocalEventMiddleware(ctx) {
					ctx.requestID = ctx.requestID || tracer.getCurrentTraceID();
					ctx.parentID = ctx.parentID || tracer.getActiveSpanID();

					let tags = {
						event: {
							name: event.name,
							group: event.group
						},
						eventName: ctx.eventName,
						eventType: ctx.eventType,
						callerNodeID: ctx.nodeID,
						callingLevel: ctx.level,
						remoteCall: ctx.nodeID !== broker.nodeID,
						nodeID: broker.nodeID,
						requestID: ctx.requestID
					};

					const globalEventTags = tracer.opts.tags.event;
					/** @type {Record<string, any>} */
					let eventTags;
					// local event tags take precedence
					if (isFunction$7(opts.tags)) {
						eventTags = opts.tags;
					} else if (!opts.tags && isFunction$7(globalEventTags)) {
						eventTags = globalEventTags;
					} else {
						// By default all params are captured. This can be overridden globally and locally
						eventTags = { ...{ params: true }, ...globalEventTags, ...opts.tags };
					}

					if (isFunction$7(eventTags)) {
						const res = eventTags.call(service, ctx);
						if (res) Object.assign(tags, res);
					} else if (isPlainObject$3(eventTags)) {
						if (eventTags.params === true)
							tags.params =
								ctx.params != null && isPlainObject$3(ctx.params)
									? Object.assign({}, ctx.params)
									: ctx.params;
						else if (Array.isArray(eventTags.params))
							tags.params = ___default.pick(ctx.params, eventTags.params);

						if (eventTags.meta === true)
							tags.meta = ctx.meta != null ? Object.assign({}, ctx.meta) : ctx.meta;
						else if (Array.isArray(eventTags.meta))
							tags.meta = ___default.pick(ctx.meta, eventTags.meta);
					}

					if (opts.safetyTags) {
						tags = safetyObject(tags);
					}

					let spanName = `event '${ctx.eventName}' in '${service.fullName}'`;
					if (opts.spanName) {
						switch (typeof opts.spanName) {
							case "string":
								spanName = opts.spanName;
								break;
							case "function":
								spanName = opts.spanName.call(service, ctx);
								break;
						}
					}

					const span = ctx.startSpan(spanName, {
						id: ctx.id,
						type: "event",
						traceID: ctx.requestID,
						parentID: ctx.parentID,
						service,
						sampled: ctx.tracing,
						tags
					});

					ctx.tracing = span.sampled;

					// Call the handler
					return handler
						.apply(service, arguments)
						.then(() => {
							ctx.finishSpan(span);
						})
						.catch(err => {
							span.setError(err);
							ctx.finishSpan(span);
							throw err;
						});
				}.bind(this);
			}

			return handler;
		}

		/*
		function wrapRemoteTracingMiddleware(handler) {

			if (this.options.tracing) {
				return function tracingMiddleware(ctx) {
					if (ctx.tracing == null) {
						ctx.tracing = shouldTracing(ctx);
					}
					return handler(ctx);

				}.bind(this);
			}

			return handler;
		}*/
		return {
			name: "Tracing",

			localAction:
				broker.isTracingEnabled() && tracer.opts.actions ? tracingLocalActionMiddleware : null,
			localEvent:
				broker.isTracingEnabled() && tracer.opts.events ? tracingLocalEventMiddleware : null
			//remoteAction: wrapRemoteTracingMiddleware
		};
	};

	var debounce = function debounceMiddleware(broker) {
		function wrapEventDebounceMiddleware(handler, event) {
			if (event.debounce > 0) {
				let timer;

				return function debounceMiddleware(ctx) {
					if (timer) clearTimeout(timer);

					timer = timersBrowserify.setTimeout(() => {
						timer = null;
						return handler(ctx);
					}, event.debounce);

					return broker.Promise.resolve();
				}.bind(this);
			}
			return handler;
		}

		return {
			name: "Debounce",

			localEvent: wrapEventDebounceMiddleware
		};
	};

	/*
	 * moleculer
	 * Copyright (c) 2019 MoleculerJS (https://github.com/moleculerjs/moleculer)
	 * MIT Licensed
	 */

	var throttle = function throttleMiddleware(broker) {
		function wrapEventThrottleMiddleware(handler, event) {
			if (event.throttle > 0) {
				let lastInvoke = 0;

				return function throttleMiddleware(ctx) {
					const now = Date.now();
					if (now - lastInvoke < event.throttle) {
						return broker.Promise.resolve();
					}
					lastInvoke = now;
					return handler(ctx);
				}.bind(this);
			}
			return handler;
		}

		return {
			name: "Throttle",

			localEvent: wrapEventThrottleMiddleware
		};
	};

	const Middlewares = {
		ActionHook: actionHook,
		Cacher: cacher,
		Validator: validator$1,
		Bulkhead: bulkhead,
		ContextTracker: contextTracker,
		CircuitBreaker: circuitBreaker,
		Timeout: timeout,
		Retry: retry,
		Fallback: fallback,
		ErrorHandler: errorHandler,
		Metrics: metrics$1,
		Tracing: tracing,

		Debounce: debounce,
		Throttle: throttle,

		HotReload: require$$19,

		Transmit: {
			Encryption: require$$19,
			Compression: require$$19
		},

		Debugging: {
			TransitLogger: require$$19,
			ActionLogger: require$$19
		}
	};

	function register$9(name, value) {
		Middlewares[name] = value;
	}

	var middlewares = Object.assign(Middlewares, { register: register$9 });

	const { BrokerOptionsError: BrokerOptionsError$9 } = errors;
	const { isObject: isObject$b, isFunction: isFunction$8, isString: isString$e } = utils_1;

	/**
	 * Import types
	 *
	 * @typedef {import("./middleware")} MiddlewareClass
	 * @typedef {import("./middleware").MiddlewareCallHandlerOptions} MiddlewareCallHandlerOptions
	 * @typedef {import("./service").ActionHandler} ActionHandler
	 */

	/**
	 * class MiddlewareHandler
	 * @implements {MiddlewareClass}
	 */
	class MiddlewareHandler {
		constructor(broker) {
			this.broker = broker;

			this.list = [];

			this.registeredHooks = {};

			this.middlewareInterceptors = {};
		}

		add(mw) {
			if (!mw) return;

			if (isString$e(mw)) {
				const found = ___default.get(middlewares, mw);
				if (!found)
					throw new BrokerOptionsError$9(`Invalid built-in middleware type '${mw}'.`, {
						type: mw
					});
				mw = found;
			}

			if (isFunction$8(mw)) mw = mw.call(this.broker, this.broker);
			if (!mw) return;

			if (!isObject$b(mw))
				throw new BrokerOptionsError$9(
					`Invalid middleware type '${typeof mw}'. Accept only Object or Function.`,
					{ type: typeof mw, value: mw }
				);

			Object.keys(mw).forEach(key => {
				if (isFunction$8(mw[key])) {
					const handle = isFunction$8(this.middlewareInterceptors[key])
						? this.middlewareInterceptors[key](mw[key])
						: mw[key];
					if (Array.isArray(this.registeredHooks[key])) {
						this.registeredHooks[key].push(handle);
					} else {
						this.registeredHooks[key] = [handle];
					}
				}
			});

			this.list.push(mw);
		}

		/**
		 * Wrap a handler
		 *
		 * @param {string} method
		 * @param {Function} handler
		 * @param {Object} def
		 * @returns {Function}
		 * @memberof MiddlewareHandler
		 */
		wrapHandler(method, handler, def) {
			if (this.registeredHooks[method] && this.registeredHooks[method].length) {
				handler = this.registeredHooks[method].reduce((handler, fn) => {
					return fn.call(this.broker, handler, def);
				}, handler);
			}

			return handler;
		}

		/**
		 * Call a handler asynchronously in all middlewares
		 *
		 * @param {String} method
		 * @param {Array<any>} args
		 * @param {MiddlewareCallHandlerOptions=} opts
		 * @returns {Promise}
		 * @memberof MiddlewareHandler
		 */
		callHandlers(method, args, opts = {}) {
			if (this.registeredHooks[method] && this.registeredHooks[method].length) {
				const list = opts.reverse
					? Array.from(this.registeredHooks[method]).reverse()
					: this.registeredHooks[method];
				return list.reduce(
					(p, fn) => p.then(() => fn.apply(this.broker, args)),
					this.broker.Promise.resolve()
				);
			}

			return this.broker.Promise.resolve();
		}

		/**
		 * Call a handler synchronously in all middlewares
		 *
		 * @param {String} method
		 * @param {Array<any>} args
		 * @param {MiddlewareCallHandlerOptions=} opts
		 * @returns {Array<any>}
		 * @memberof MiddlewareHandler
		 */
		callSyncHandlers(method, args, opts = {}) {
			if (this.registeredHooks[method] && this.registeredHooks[method].length) {
				const list = opts.reverse
					? Array.from(this.registeredHooks[method]).reverse()
					: this.registeredHooks[method];
				return list.map(fn => fn.apply(this.broker, args));
			}
			return;
		}

		/**
		 * Get count of registered middlewares
		 *
		 * @returns {Number}
		 * @memberof MiddlewareHandler
		 */
		count() {
			return this.list.length;
		}

		/**
		 * Wrap a method
		 *
		 * @param {string} method
		 * @param {Function} handler
		 * @param {any=} bindTo
		 * @param {MiddlewareCallHandlerOptions=} opts
		 * @returns {Function}
		 * @memberof MiddlewareHandler
		 */
		wrapMethod(method, handler, bindTo = this.broker, opts = {}) {
			if (this.registeredHooks[method] && this.registeredHooks[method].length) {
				const list = opts.reverse
					? Array.from(this.registeredHooks[method]).reverse()
					: this.registeredHooks[method];
				handler = list.reduce((next, fn) => fn.call(bindTo, next), handler.bind(bindTo));
			}

			return handler;
		}
	}

	var middleware = MiddlewareHandler;

	/* eslint-disable no-unused-vars */


	const { isObject: isObject$c, safetyObject: safetyObject$1 } = utils_1;

	/**
	 * Import types
	 *
	 * @typedef {import("./base")} BaseTraceExporterClass
	 * @typedef {import("./base").BaseTraceExporterOptions} BaseTraceExporterOptions
	 * @typedef {import("../tracer")} Tracer
	 * @typedef {import("../span")} Span
	 */

	/**
	 * Abstract Trace Exporter
	 *
	 * @class BaseTraceExporter
	 * @implements {BaseTraceExporterClass}
	 */
	class BaseTraceExporter {
		/**
		 * Creates an instance of BaseTraceExporter.
		 * @param {BaseTraceExporterOptions?} opts
		 * @memberof BaseTraceExporter
		 */
		constructor(opts) {
			/** @type {BaseTraceExporterOptions} */
			this.opts = ___default.defaultsDeep(opts, {
				safetyTags: false
			});
			this.Promise = Promise; // default promise before logger is initialized
		}

		/**
		 * Initialize Trace Exporter.
		 *
		 * @param {Tracer} tracer
		 * @memberof BaseTraceExporter
		 */
		init(tracer) {
			this.tracer = tracer;
			this.broker = tracer.broker;
			this.Promise = this.broker.Promise;
			this.logger = this.opts.logger || this.tracer.logger;
		}

		/**
		 * Stop Trace exporter
		 */
		stop() {
			// Not implemented
		}

		/**
		 * Span is started.
		 *
		 * @param {Span} span
		 * @memberof BaseTraceExporter
		 */
		spanStarted(span) {
			// Not implemented
		}

		/**
		 * Span is finished.
		 *
		 * @param {Span} span
		 * @memberof BaseTraceExporter
		 */
		spanFinished(span) {
			// Not implemented
		}

		/**
		 * Flattening tags to one-level object.
		 * E.g.
		 *  **From:**
		 * 	```js
		 * 	{
		 * 		error: {
		 * 			name: "MoleculerError"
		 * 		}
		 * 	}
		 *  ```
		 *
		 * 	**To:**
		 * 	```js
		 *  {
		 * 		"error.name": "MoleculerError"
		 *  }
		 *  ```
		 *
		 * @param {Record<string, any>} obj
		 * @param {boolean} [convertToString=false]
		 * @param {string} [path=""]
		 * @returns {Record<string, any>}
		 * @memberof BaseTraceExporter
		 */
		flattenTags(obj, convertToString = false, path = "") {
			if (!obj) return null;

			if (this.opts.safetyTags) {
				obj = safetyObject$1(obj);
			}

			return Object.keys(obj).reduce((res, k) => {
				const o = obj[k];
				const pp = (path ? path + "." : "") + k;

				if (isObject$c(o)) Object.assign(res, this.flattenTags(o, convertToString, pp));
				else if (o !== undefined) {
					res[pp] = convertToString ? String(o) : o;
				}

				return res;
			}, {});
		}

		/**
		 * Convert Error to POJO.
		 *
		 * @param {Error|boolean} err
		 * @returns {Record<string, any>}
		 * @memberof BaseTraceExporter
		 */
		errorToObject(err) {
			if (!err || !isObject$c(err)) return null;

			return ___default.pick(err, this.tracer.opts.errorFields);
		}
	}

	var base$9 = BaseTraceExporter;

	const r = ___default.repeat;

	const { humanize, isFunction: isFunction$9 } = utils_1;



	/**
	 * Import types
	 *
	 * @typedef {import("./console")} ConsoleTraceExporterClass
	 * @typedef {import("./console").ConsoleTraceExporterOptions} ConsoleTraceExporterOptions
	 * @typedef {import("../tracer")} Tracer
	 * @typedef {import("../span")} Span
	 */

	/**
	 * Console Trace Exporter only for debugging
	 *
	 * @class ConsoleTraceExporter
	 * @implements {ConsoleTraceExporterClass}
	 */
	class ConsoleTraceExporter extends base$9 {
		/**
		 * Creates an instance of ConsoleTraceExporter.
		 * @param {ConsoleTraceExporterOptions?} opts
		 * @memberof ConsoleTraceExporter
		 */
		constructor(opts) {
			super(opts);

			/** @type {ConsoleTraceExporterOptions} */
			this.opts = ___default.defaultsDeep(this.opts, {
				logger: null,
				colors: true,
				width: 100,
				gaugeWidth: 40
			});

			if (!this.opts.colors) kleur_1.enabled = false;

			this.spans = {};
		}

		/**
		 * Initialize Trace Exporter.
		 *
		 * @param {Tracer} tracer
		 * @memberof ConsoleTraceExporter
		 */
		init(tracer) {
			super.init(tracer);
		}

		/**
		 * Stop Trace exporter
		 */
		stop() {
			this.spans = {};

			return this.broker.Promise.resolve();
		}

		/**
		 * Span is started.
		 *
		 * @param {Span} span
		 * @memberof ConsoleTraceExporter
		 */
		spanStarted(span) {
			this.spans[span.id] = {
				span,
				children: []
			};

			if (span.parentID) {
				const parentItem = this.spans[span.parentID];
				if (parentItem) parentItem.children.push(span.id);
			}
		}

		/**
		 * Span is finished.
		 *
		 * @param {Span} span
		 * @memberof ConsoleTraceExporter
		 */
		spanFinished(span) {
			//this.log(span);
			if (!this.spans[span.parentID]) {
				this.printRequest(span.id);

				// remove old printed requests
				this.removeSpanWithChildren(span.id);
			}
		}

		/**
		 * Remove a finished span with children.
		 *
		 * @param {String} spanID
		 * @memberof ConsoleTraceExporter
		 */
		removeSpanWithChildren(spanID) {
			const span = this.spans[spanID];
			if (span) {
				if (span.children && span.children.length > 0) {
					span.children.forEach(child => this.removeSpanWithChildren(child));
				}
				delete this.spans[spanID];
			}
		}

		drawTableTop() {
			this.log(kleur_1.grey("┌" + r("─", this.opts.width - 2) + "┐"));
		}

		drawHorizonalLine() {
			this.log(kleur_1.grey("├" + r("─", this.opts.width - 2) + "┤"));
		}

		drawLine(text) {
			this.log(kleur_1.grey("│ ") + text + kleur_1.grey(" │"));
		}

		drawTableBottom() {
			this.log(kleur_1.grey("└" + r("─", this.opts.width - 2) + "┘"));
		}

		getAlignedTexts(str, space) {
			const len = str.length;

			let left;
			if (len <= space) left = str + r(" ", space - len);
			else {
				left = str.slice(0, Math.max(space - 3, 0));
				left += r(".", Math.min(3, space));
			}

			return left;
		}

		drawGauge(gstart, gstop) {
			const gw = this.opts.gaugeWidth;
			const p1 = Math.floor((gw * gstart) / 100);
			const p2 = Math.max(Math.floor((gw * gstop) / 100) - p1, 1);
			const p3 = Math.max(gw - (p1 + p2), 0);

			return [
				kleur_1.grey("["),
				kleur_1.grey(r(".", p1)),
				r("■", p2),
				kleur_1.grey(r(".", p3)),
				kleur_1.grey("]")
			].join("");
		}

		getCaption(span) {
			let caption = span.name;

			if (span.tags.fromCache) caption += " *";
			if (span.tags.remoteCall) caption += " »";
			if (span.error) caption += " ×";

			return caption;
		}

		getColor(span) {
			let c = kleur_1.bold;
			if (span.tags.fromCache) c = c().yellow;
			if (span.tags.remoteCall) c = c().cyan;
			if (span.duration == null) c = c().grey;
			if (span.error) c = c().red;

			return c;
		}

		getTraceInfo(main) {
			let depth = 0;
			let total = 0;
			let check = (item, level, parents) => {
				item.level = level;
				item.parents = parents || [];
				total++;
				if (level > depth) depth = level;

				if (item.children.length > 0) {
					item.children.forEach((spanID, idx) => {
						const span = this.spans[spanID];
						span.first = idx === 0;
						span.last = idx === item.children.length - 1;
						check(span, item.level + 1, [].concat(item.parents, [item]));
					});
				}
			};

			check(main, 1);

			return { depth, total };
		}

		getSpanIndent(spanItem) {
			if (spanItem.level > 1) {
				let s = spanItem.parents
					.map((item, idx) => {
						if (idx > 0) return item.last ? "  " : "│ ";

						return "";
					})
					.join("");

				s += spanItem.last ? "└─" : "├─";

				return s + (spanItem.children.length > 0 ? "┬─" : "──") + " ";
			}

			return "";
		}

		/**
		 * Print a span row
		 *
		 * @param {Object} spanItem
		 * @param {Object} mainItem
		 * @param {number} level
		 */
		printSpanTime(spanItem, mainItem, level) {
			const span = spanItem.span;
			const mainSpan = mainItem.span;
			const margin = 2 * 2;
			const w = (this.opts.width || 80) - margin;
			const gw = this.opts.gaugeWidth || 40;

			const time = span.duration == null ? "?" : humanize(span.duration);
			const indent = this.getSpanIndent(spanItem);
			const caption = this.getCaption(span);
			const info =
				kleur_1.grey(indent) +
				this.getAlignedTexts(caption, w - gw - 3 - time.length - 1 - indent.length) +
				" " +
				time;

			const startTime = span.startTime || mainSpan.startTime;
			const finishTime = span.finishTime || mainSpan.finishTime;

			let gstart =
				((startTime - mainSpan.startTime) / (mainSpan.finishTime - mainSpan.startTime)) * 100;
			let gstop =
				((finishTime - mainSpan.startTime) / (mainSpan.finishTime - mainSpan.startTime)) * 100;

			if (Number.isNaN(gstart) && Number.isNaN(gstop)) {
				gstart = 0;
				gstop = 100;
			}
			if (gstop > 100) gstop = 100;

			const c = this.getColor(span);
			this.drawLine(c(info + " " + this.drawGauge(gstart, gstop)));

			if (spanItem.children.length > 0)
				spanItem.children.forEach(spanID =>
					this.printSpanTime(this.spans[spanID], mainItem, level + 1)
				);
		}

		/**
		 * Print request traces
		 *
		 * @param {String} id
		 */
		printRequest(id) {
			const main = this.spans[id];
			if (!main) return; // Async span

			const margin = 2 * 2;
			const w = this.opts.width - margin;

			this.drawTableTop();

			const { total, depth } = this.getTraceInfo(main);

			const truncatedID = this.getAlignedTexts(
				id,
				w -
					"ID: ".length -
					"Depth: ".length -
					("" + depth).length -
					"Total: ".length -
					("" + total).length -
					2
			);
			const line =
				kleur_1.grey("ID: ") +
				kleur_1.bold(truncatedID) +
				" " +
				kleur_1.grey("Depth: ") +
				kleur_1.bold(depth) +
				" " +
				kleur_1.grey("Total: ") +
				kleur_1.bold(total);
			this.drawLine(line);

			this.drawHorizonalLine();

			this.printSpanTime(main, main, 1);

			this.drawTableBottom();
		}

		log(...args) {
			if (isFunction$9(this.opts.logger)) {
				return this.opts.logger(...args);
			} else {
				return this.logger.info(...args);
			}
		}
	}

	var console$2 = ConsoleTraceExporter;

	const { isFunction: isFunction$a } = utils_1;

	/**
	 * Import types
	 *
	 * @typedef {import("./event")} EventTraceExporterClass
	 * @typedef {import("./event").EventTraceExporterOptions} EventTraceExporterOptions
	 * @typedef {import("../tracer")} Tracer
	 * @typedef {import("../span")} Span
	 */

	/**
	 * Event Trace Exporter.
	 *
	 * @class EventTraceExporter
	 * @implements {EventTraceExporterClass}
	 */
	class EventTraceExporter extends base$9 {
		/**
		 * Creates an instance of EventTraceExporter.
		 * @param {EventTraceExporterOptions?} opts
		 * @memberof EventTraceExporter
		 */
		constructor(opts) {
			super(opts);

			/** @type {EventTraceExporterOptions} */
			this.opts = ___default.defaultsDeep(this.opts, {
				eventName: "$tracing.spans",

				sendStartSpan: false,
				sendFinishSpan: true,

				broadcast: false,

				groups: null,

				interval: 5,

				spanConverter: null,

				defaultTags: null
			});

			this.queue = [];
		}

		/**
		 * Initialize Trace Exporter.
		 *
		 * @param {Tracer} tracer
		 * @memberof EventTraceExporter
		 */
		init(tracer) {
			super.init(tracer);

			if (this.opts.interval > 0) {
				this.timer = timersBrowserify.setInterval(() => this.flush(), this.opts.interval * 1000);
				this.timer.unref();
			}

			this.defaultTags = isFunction$a(this.opts.defaultTags)
				? this.opts.defaultTags.call(this, tracer)
				: this.opts.defaultTags;
		}

		/**
		 * Stop Trace exporter
		 */
		stop() {
			if (this.timer) {
				clearInterval(this.timer);
				this.timer = null;
			}
			return this.Promise.resolve();
		}

		/**
		 * Span is started.
		 *
		 * @param {Span} span
		 * @memberof BaseTraceExporter
		 */
		spanStarted(span) {
			if (this.opts.sendStartSpan) {
				if (span.tags.eventName == this.opts.eventName) return;

				this.queue.push(span);
				if (!this.timer) this.flush();
			}
		}

		/**
		 * Span is finished.
		 *
		 * @param {Span} span
		 * @memberof EventTraceExporter
		 */
		spanFinished(span) {
			if (this.opts.sendFinishSpan) {
				if (span.tags.eventName == this.opts.eventName) return;

				this.queue.push(span);
				if (!this.timer) this.flush();
			}
		}

		/**
		 * Flush tracing data to Datadog server
		 *
		 * @memberof EventTraceExporter
		 */
		flush() {
			if (this.queue.length === 0) return;

			const data = this.generateTracingData();
			this.queue.length = 0;

			if (this.opts.broadcast) {
				this.logger.debug(`Send tracing spans (${data.length} spans) broadcast events.`);
				this.broker.broadcast(this.opts.eventName, data, { groups: this.opts.groups });
			} else {
				this.logger.debug(`Send tracing spans (${data.length} spans) events.`);
				this.broker.emit(this.opts.eventName, data, { groups: this.opts.groups });
			}
		}

		/**
		 * Generate tracing data with custom converter
		 *
		 * @returns {Record<string, any>[]}
		 * @memberof EventTraceExporter
		 */
		generateTracingData() {
			if (isFunction$a(this.opts.spanConverter))
				return this.queue.map(span => this.opts.spanConverter.call(this, span));

			return Array.from(this.queue).map(span => {
				const newSpan = Object.assign({}, span);
				if (newSpan.error) newSpan.error = this.errorToObject(span.error);

				return newSpan;
			});
		}
	}

	var event$1 = EventTraceExporter;

	const { isObject: isObject$d, isString: isString$f, isInheritedClass: isInheritedClass$7 } = utils_1;
	const { BrokerOptionsError: BrokerOptionsError$a } = errors;

	const Exporters = {
		Base: base$9,
		Console: console$2,
		Datadog: require$$19,
		//DatadogSimple: require("./datadog-simple"),
		Event: event$1,
		Jaeger: require$$19,
		Zipkin: require$$19,
		NewRelic: require$$19
	};

	function getByName$9(name) {
		/* istanbul ignore next */
		if (!name) return null;

		let n = Object.keys(Exporters).find(n => n.toLowerCase() == name.toLowerCase());
		if (n) return Exporters[n];
	}

	/**
	 * Resolve exporter by name
	 *
	 * @param {Record<string,any>|string} opt
	 * @returns {any}
	 * @memberof ServiceBroker
	 */
	function resolve$9(opt) {
		if (isObject$d(opt) && isInheritedClass$7(opt, Exporters.Base)) {
			return opt;
		} else if (isString$f(opt)) {
			let ExporterClass = getByName$9(opt);
			if (ExporterClass) return new ExporterClass();
			else throw new BrokerOptionsError$a(`Invalid tracing exporter type '${opt}'.`, { type: opt });
		} else if (isObject$d(opt)) {
			let ExporterClass = getByName$9(opt.type);
			if (ExporterClass) return new ExporterClass(opt.options);
			else
				throw new BrokerOptionsError$a(`Invalid tracing exporter type '${opt.type}'.`, {
					type: opt.type
				});
		}

		throw new BrokerOptionsError$a(`Invalid tracing exporter type '${opt}'.`, { type: opt });
	}

	function register$a(name, value) {
		Exporters[name] = value;
	}

	var exporters = Object.assign(Exporters, { resolve: resolve$9, register: register$a });

	/**
	 * Import types
	 *
	 * @typedef {import("./rate-limiter")} RateLimiterClass
	 * @typedef {import("./rate-limiter").RateLimiterOptions} RateLimiterOptions
	 */

	/**
	 * Rate Limiter class for Tracing.
	 *
	 * Inspired by
	 * 	https://github.com/jaegertracing/jaeger-client-node/blob/master/src/rate_limiter.js
	 *
	 * @class RateLimiter
	 * @implements {RateLimiterClass}
	 */
	class RateLimiter {
		constructor(opts) {
			/** @type {RateLimiterOptions} */
			this.opts = ___default.defaultsDeep(opts, {
				tracesPerSecond: 1
			});

			this.lastTime = Date.now();
			this.balance = 0;
			this.maxBalance = this.opts.tracesPerSecond < 1 ? 1 : this.opts.tracesPerSecond;
		}

		check(cost = 1) {
			const now = Date.now();
			const elapsedTime = (now - this.lastTime) / 1000;
			this.lastTime = now;

			this.balance += elapsedTime * this.opts.tracesPerSecond;
			if (this.balance > this.maxBalance) this.balance = this.maxBalance;

			if (this.balance >= cost) {
				this.balance -= cost;
				return true;
			}

			return false;
		}
	}

	var rateLimiter = RateLimiter;

	var perf_hooks = {
		performance: typeof performance !== 'undefined' ? performance : Date
	};

	const perf$1 = perf_hooks.performance;

	function defProp(instance, propName, value, readOnly = false) {
		Object.defineProperty(instance, propName, {
			value,
			writable: !!readOnly,
			enumerable: false
		});
	}

	/**
	 * Import types
	 *
	 * @typedef {import("./tracer")} Tracer
	 * @typedef {import("./span")} SpanClass
	 * @typedef {import("./span").SpanOptions} SpanOptions
	 * @typedef {import("./span").SpanServiceInfo} SpanServiceInfo
	 * @typedef {import("../logger-factory").Logger} Logger
	 */

	/**
	 * Trace Span class
	 *
	 * @class Span
	 * @property {Tracer} tracer
	 * @implements {SpanClass}
	 */
	class Span {
		/** @type {Tracer} */
		tracer;
		/** @type {SpanOptions} */
		opts;
		/** @type {Object} */
		meta;
		/** @type {Logger} */
		logger;
		/** @type {SpanServiceInfo} */
		service;

		/**
		 * Creates an instance of Span.
		 * @param {Tracer} tracer
		 * @param {String} name
		 * @param {SpanOptions?} opts
		 *
		 * @memberof Span
		 */
		constructor(tracer, name, opts) {
			defProp(this, "tracer", tracer, true);
			defProp(this, "logger", tracer.logger, true);
			defProp(this, "opts", opts || {});
			defProp(this, "meta", {});

			this.name = name;
			this.type = this.opts.type || "custom";
			this.id = this.opts.id || this.tracer.broker.generateUid();
			this.traceID = this.opts.traceID || this.id;
			this.parentID = this.opts.parentID;

			if (this.opts.service) {
				if (typeof this.opts.service == "string") {
					this.service = {
						name: this.opts.service,
						fullName: this.opts.service
					};
				} else {
					this.service = {
						name: this.opts.service.name,
						version: this.opts.service.version,
						fullName: this.opts.service.fullName
					};
				}
			}

			this.priority = this.opts.priority != null ? this.opts.priority : 5;
			this.sampled =
				this.opts.sampled != null ? this.opts.sampled : this.tracer.shouldSample(this);

			this.startTime = null;
			this.startTicks = null;
			this.finishTime = null;
			this.duration = null;

			this.error = null;

			this.logs = [];
			this.tags = {};

			if (this.opts.defaultTags) this.addTags(this.opts.defaultTags);

			if (this.opts.tags) this.addTags(this.opts.tags);
		}

		/**
		 * Start span.
		 *
		 * @param {Number=} time
		 * @returns {Span}
		 * @memberof Span
		 */
		start(time) {
			this.logger.debug(`[${this.id}] Span '${this.name}' is started.`);

			this.startTime = time || Date.now();
			this.startTicks = perf$1.now();
			// console.log(`"${this.name}" start time: ${this.startTime}`);

			this.tracer.spanStarted(this);

			return this;
		}

		/**
		 * Get the current time.
		 *
		 * @returns {Number}
		 * @memberof Span
		 */
		getTime() {
			return this.startTime + perf$1.now() - this.startTicks;
		}

		/**
		 * Add tags. It will be merged with previous tags.
		 *
		 * @param {Object} obj
		 * @returns {Span}
		 *
		 * @memberof Span
		 */
		addTags(obj) {
			Object.assign(this.tags, obj);

			return this;
		}

		/**
		 * Log a trace event.
		 *
		 * @param {String} name
		 * @param {Object?} fields
		 * @param {Number?} time
		 * @returns {Span}
		 * @memberof Span
		 */
		log(name, fields, time) {
			time = time || this.getTime();

			this.logs.push({
				name,
				fields: fields || {},
				time,
				elapsed: time - this.startTime
			});

			this.logger.debug(`[${this.id}] Span '${this.name}' has a new log event: ${name}.`);

			return this;
		}

		/**
		 * Set error span.
		 *
		 * @param {Error} err
		 * @memberof Span
		 */
		setError(err) {
			this.error = err != null ? err : true;

			return this;
		}

		/**
		 * Finish span.
		 *
		 * @param {Number=} time
		 * @returns {Span}
		 * @memberof Span
		 */
		finish(time) {
			this.finishTime = time ? time : this.getTime();
			this.duration = this.finishTime - this.startTime;

			// console.log(`"${this.name}" stop time: ${this.finishTime}  Duration: ${this.duration}`);

			this.logger.debug(
				`[${this.id}] Span '${this.name}' is finished. Duration: ${Number(
				this.duration
			).toFixed(3)} ms`,
				this.tags
			);

			this.tracer.spanFinished(this);

			return this;
		}

		/**
		 * Check the span is active or finished.
		 *
		 * @returns {boolean}
		 */
		isActive() {
			return this.finishTime == null;
		}

		/**
		 * Start a child span.
		 *
		 * @param {String} name
		 * @param {SpanOptions?} opts
		 * @returns {Span} Child span
		 * @memberof Span
		 */
		startSpan(name, opts) {
			const r = {
				traceID: this.traceID,
				parentID: this.id,
				sampled: this.sampled,
				service: this.service
			};
			return this.tracer.startSpan(name, opts ? Object.assign(r, opts) : r);
		}
	}

	var span = Span;

	//const AsyncStorage = require("../async-storage");


	const { isFunction: isFunction$b } = utils_1;

	/**
	 * Import types
	 *
	 * @typedef {import("./tracer")} TracerClass
	 * @typedef {import("./tracer").TracerOptions} TracerOptions
	 *
	 * @typedef {import("./span").SpanOptions} SpanOptions
	 * @typedef {import("../service-broker")} ServiceBroker
	 */

	/**
	 * Moleculer Tracer class
	 * @class Tracer
	 * @implements {TracerClass}
	 */
	class Tracer {
		/**
		 * Creates an instance of Tracer.
		 *
		 * @param {ServiceBroker} broker
		 * @param {boolean|TracerOptions} opts
		 * @memberof Tracer
		 */
		constructor(broker, opts) {
			this.broker = broker;
			this.logger = broker.getLogger("tracer");

			if (opts === true || opts === false) opts = { enabled: opts };

			this.opts = ___default.defaultsDeep({}, opts, {
				enabled: true,

				exporter: null,

				sampling: {
					// Constants sampling
					rate: 1.0, // 0.0 - Never, 1.0 > x > 0.0 - Fix, 1.0 - Always

					// Ratelimiting sampling https://opencensus.io/tracing/sampling/ratelimited/
					tracesPerSecond: null, // 1: 1 trace / sec, 5: 5 traces / sec, 0.1: 1 trace / 10 secs

					minPriority: null
				},

				actions: true,
				events: false,

				errorFields: ["name", "message", "code", "type", "data"],
				stackTrace: false,

				defaultTags: null,

				tags: {
					action: null,
					event: null
				}
			});

			if (this.opts.stackTrace && this.opts.errorFields.indexOf("stack") === -1)
				this.opts.errorFields.push("stack");

			this.sampleCounter = 0;

			if (this.opts.sampling.tracesPerSecond != null && this.opts.sampling.tracesPerSecond > 0) {
				this.rateLimiter = new rateLimiter({
					tracesPerSecond: this.opts.sampling.tracesPerSecond
				});
			}

			//this.scope = new AsyncStorage(this.broker);
			//this.scope.enable();
			//this._scopeEnabled = true;

			if (this.opts.enabled) this.logger.info("Tracing: Enabled");
		}

		/**
		 * Initialize Tracer.
		 */
		init() {
			if (this.opts.enabled) {
				this.defaultTags = isFunction$b(this.opts.defaultTags)
					? this.opts.defaultTags.call(this, this)
					: this.opts.defaultTags;

				// Create Exporter instances
				if (this.opts.exporter) {
					const exporters$1 = Array.isArray(this.opts.exporter)
						? this.opts.exporter
						: [this.opts.exporter];

					this.exporter = ___default.compact(exporters$1).map(r => {
						const exporter = exporters.resolve(r);
						exporter.init(this);
						return exporter;
					});

					const exporterNames = this.exporter.map(exporter =>
						this.broker.getConstructorName(exporter)
					);
					this.logger.info(
						`Tracing exporter${exporterNames.length > 1 ? "s" : ""}: ${exporterNames.join(
						", "
					)}`
					);
				}
			}
		}

		/**
		 * Stop Tracer.
		 */
		stop() {
			if (this.exporter) {
				return this.broker.Promise.all(this.exporter.map(r => r.stop()));
			}
			return this.broker.Promise.resolve();
		}

		/**
		 * Check tracing is enabled
		 *
		 * @returns {boolean}
		 * @memberof MetricRegistry
		 */
		isEnabled() {
			return this.opts.enabled;
		}

		/**
		 * Disable trace hooks and clear the store - noop if scope is already stopped
		 *
		 * @memberof Tracer
		 *
		stopAndClearScope() {
			if (this._scopeEnabled) {
				this.scope.stop();
				this._scopeEnabled = false;
			}
		}*/

		/**
		 * Renable the trace hooks - noop if scope is already enabled
		 *
		 * @memberof Tracer
		 *
		restartScope() {
			if (!this._scopeEnabled) {
				this.scope.enable();
				this._scopeEnabled = true;
			}
		}*/

		/**
		 * Decide that span should be sampled.
		 *
		 * @param {Span} span
		 * @returns {Boolean}
		 * @memberof Tracer
		 */
		shouldSample(span) {
			if (this.opts.sampling.minPriority != null) {
				if (span.priority < this.opts.sampling.minPriority) return false;
			}

			if (this.rateLimiter) {
				return this.rateLimiter.check();
			}

			if (this.opts.sampling.rate === 0) return false;

			if (this.opts.sampling.rate === 1) return true;

			if (++this.sampleCounter * this.opts.sampling.rate >= 1.0) {
				this.sampleCounter = 0;
				return true;
			}

			return false;
		}

		/**
		 * Start a new Span.
		 *
		 * @param {String} name
		 * @param {SpanOptions?} opts
		 * @returns {Span}
		 *
		 * @memberof Tracer
		 */
		startSpan(name, opts = {}) {
			let parentOpts = {};
			if (opts.parentSpan) {
				parentOpts.traceID = opts.parentSpan.traceID;
				parentOpts.parentID = opts.parentSpan.id;
				parentOpts.sampled = opts.parentSpan.sampled;
			}

			const span$1 = new span(
				this,
				name,
				Object.assign(
					{
						type: "custom",
						defaultTags: this.defaultTags
					},
					parentOpts,
					opts,
					{ parentSpan: undefined }
				)
			);

			span$1.start();

			return span$1;
		}

		/**
		 * Invoke Exporter method.
		 *
		 * @param {String} method
		 * @param {Array<any>} args
		 * @memberof Tracer
		 */
		invokeExporter(method, args) {
			if (this.exporter) {
				this.exporter.forEach(exporter => exporter[method].apply(exporter, args));
			}
		}

		/**
		 * Set the active span
		 *
		 * @param {Span} span
		 * @memberof Tracer
		 *
		setCurrentSpan(span) {
			const state = this.scope.getSessionData() || {
				spans: []
			};

			state.spans.push(span);
			this.scope.setSessionData(state);

			span.meta.state = state;
		}*/

		/**
		 * Remove the active span (because async block destroyed)
		 *
		 * @param {Span} span
		 * @memberof Tracer
		 *
		removeCurrentSpan(span) {
			const state = span.meta.state || this.scope.getSessionData();
			if (state && state.spans.length > 0) {
				const idx = state.spans.indexOf(span);
				if (idx >= 0)
					state.spans.splice(idx, 1);
			}
		}*/

		/**
		 * Get the current active span
		 *
		 * @returns {Span}
		 * @memberof Tracer
		 *
		getCurrentSpan() {
			const state = this.scope.getSessionData();
			return state ? state.spans[state.spans.length - 1] : null;
		}*/

		/**
		 * Get the current trace ID
		 *
		 * @returns
		 * @memberof Tracer
		 */
		getCurrentTraceID() {
			return null;
			//const span = this.getCurrentSpan();
			//return span ? span.traceID : null;
		}

		/**
		 * Get the active span ID (for the next span as parent ID)
		 *
		 * @returns
		 * @memberof Tracer
		 */
		getActiveSpanID() {
			return null;
			//const span = this.getCurrentSpan();
			//return span ? span.id : null;
		}

		/**
		 * Called when a span started. Call exporters.
		 *
		 * @param {Span} span
		 * @memberof Tracer
		 */
		spanStarted(span) {
			//this.setCurrentSpan(span);

			if (span.sampled) this.invokeExporter("spanStarted", [span]);
		}

		/**
		 * Called when a span finished. Call exporters.
		 *
		 * @param {Span} span
		 * @memberof Tracer
		 */
		spanFinished(span) {
			//this.removeCurrentSpan(span);

			if (span.sampled) this.invokeExporter("spanFinished", [span]);
		}
	}

	var tracer = Tracer;

	var tracing$1 = {
		Tracer: tracer,
		Span: span,
		Exporters: exporters
	};

	const { ServiceSchemaError, MoleculerError: MoleculerError$2 } = errors;
	const { isObject: isObject$e, isFunction: isFunction$c, flatten: flatten$1, uniq } = utils_1;

	/**
	 * Import types
	 *
	 * @typedef {import("./service")} ServiceClass
	 * @typedef {import("./service-broker")} ServiceBroker
	 * @typedef {import("./service").ServiceSchema} ServiceSchema
	 * @typedef {import("./service").ServiceDependency} ServiceDependency
	 * @typedef {import("./registry/endpoint-event")} EventEndpoint
	 * @typedef {import("./registry/service-item")} ServiceItem
	 */

	/**
	 * Wrap a handler Function to an object with a `handler` property.
	 *
	 * @param {Function|Object} o
	 * @returns {Object}
	 */
	function wrapToHandler(o) {
		return isFunction$c(o) ? { handler: o } : o;
	}

	/**
	 * Wrap any value to an array.
	 * @param {any} o
	 * @returns {Array}
	 */
	function wrapToArray(o) {
		return Array.isArray(o) ? o : [o];
	}

	/**
	 * Service class
	 *
	 * @implements {ServiceClass}
	 */
	class Service {
		/**
		 * Creates an instance of Service by schema.
		 *
		 * @param {ServiceBroker} 	broker	broker of service
		 * @param {Partial<ServiceSchema>}	schema	schema of service
		 *
		 */
		constructor(broker, schema) {
			if (!isObject$e(broker)) throw new ServiceSchemaError("Must set a ServiceBroker instance!");

			this.broker = broker;

			if (broker) this.Promise = broker.Promise;
			if (schema) this.parseServiceSchema(schema);
		}

		/**
		 * Parse Service schema & register as local service
		 *
		 * @param {Partial<ServiceSchema>} schema of Service
		 */
		parseServiceSchema(schema) {
			if (!isObject$e(schema))
				throw new ServiceSchemaError(
					"The service schema can't be null. Maybe is it not a service schema?"
				);

			this.originalSchema = ___default.cloneDeep(schema);

			if (schema.mixins) {
				schema = this.applyMixins(schema);
			}

			if (isFunction$c(schema.merged)) {
				schema.merged.call(this, schema);
			} else if (Array.isArray(schema.merged)) {
				schema.merged.forEach(fn => fn.call(this, schema));
			}

			this.broker.callMiddlewareHookSync("serviceCreating", [this, schema]);

			if (!schema.name) {
				/* eslint-disable-next-line no-console */
				console.error(
					"Service name can't be empty! Maybe it is not a valid Service schema. Maybe is it not a service schema?",
					{ schema }
				);
				throw new ServiceSchemaError(
					"Service name can't be empty! Maybe it is not a valid Service schema. Maybe is it not a service schema?",
					{ schema }
				);
			}

			this.name = schema.name;
			this.version = schema.version;
			this.settings = schema.settings || {};
			this.metadata = schema.metadata || {};
			this.schema = /** @type {ServiceSchema} */ (schema);

			this.fullName = Service.getVersionedFullName(
				this.name,
				this.settings.$noVersionPrefix !== true ? this.version : undefined
			);

			this.logger = this.broker.getLogger(this.fullName, {
				svc: this.name,
				ver: this.version
			});

			this.actions = {}; // external access to actions
			this.events = {}; // external access to event handlers.

			// Service item for Registry
			const serviceSpecification = {
				name: this.name,
				version: this.version,
				fullName: this.fullName,
				settings: this._getPublicSettings(this.settings),
				metadata: this.metadata,
				actions: {},
				events: {}
			};

			// Register methods
			if (isObject$e(schema.methods)) {
				___default.forIn(schema.methods, (method, name) => {
					/* istanbul ignore next */
					if (
						[
							"name",
							"version",
							"settings",
							"metadata",
							"dependencies",
							"schema",
							"broker",
							"actions",
							"logger",
							"created",
							"started",
							"stopped",
							"_start",
							"_stop",
							"_init",
							"applyMixins"
						].indexOf(name) !== -1 ||
						name.startsWith("mergeSchema")
					) {
						throw new ServiceSchemaError(
							`Invalid method name '${name}' in '${this.name}' service!`
						);
					}

					this._createMethod(method, name);
				});
			}

			// Register actions
			if (isObject$e(schema.actions)) {
				___default.forIn(schema.actions, (action, name) => {
					if (action === false) return;

					let innerAction = this._createAction(action, name);

					serviceSpecification.actions[innerAction.name] = innerAction;

					const wrappedHandler = this.broker.middlewares.wrapHandler(
						"localAction",
						innerAction.handler,
						innerAction
					);

					// Expose to be callable as `this.actions.find({ ...params })`
					const ep = this.broker.registry.createPrivateActionEndpoint(innerAction);
					this.actions[name] = (params, opts) => {
						let ctx;
						if (opts && opts.ctx) {
							// Reused context (in case of retry)
							ctx = opts.ctx;
						} else {
							ctx = this.broker.ContextFactory.create(
								this.broker,
								ep,
								params,
								opts || {}
							);
						}
						return wrappedHandler(ctx);
					};
				});
			}

			// Event subscriptions
			if (isObject$e(schema.events)) {
				___default.forIn(schema.events, (event, name) => {
					const innerEvent = this._createEvent(event, name);
					serviceSpecification.events[innerEvent.name] = innerEvent;

					// Expose to be callable as `this.events[''](params, opts);
					this.events[innerEvent.name] = (params, opts) => {
						let ctx;
						if (opts && opts.ctx) {
							// Reused context (in case of retry)
							ctx = opts.ctx;
						} else {
							const ep = /** @type {EventEndpoint} */ ({
								id: this.broker.nodeID,
								event: innerEvent,
								broker: this.broker,
								service: null,
								node: null,
								local: true,
								state: true
							});
							ctx = this.broker.ContextFactory.create(
								this.broker,
								ep,
								params,
								opts || {}
							);
						}
						ctx.eventName = name;
						ctx.eventType = "emit";
						ctx.eventGroups = [innerEvent.group || this.name];

						return innerEvent.handler(ctx);
					};
				});
			}

			this._serviceSpecification = serviceSpecification;

			// Initialize
			this._init();
		}

		/**
		 * Return a service settings without protected properties.
		 *
		 * @param {Record<string, any>?} settings
		 */
		_getPublicSettings(settings) {
			if (settings && Array.isArray(settings.$secureSettings)) {
				return ___default.omit(settings, [].concat(settings.$secureSettings, ["$secureSettings"]));
			}

			return settings;
		}

		/**
		 * Initialize service. It called `created` handler in schema
		 */
		_init() {
			this.logger.debug(`Service '${this.fullName}' is creating...`);
			if (isFunction$c(this.schema.created)) {
				this.schema.created.call(this);
			} else if (Array.isArray(this.schema.created)) {
				this.schema.created.forEach(fn => fn.call(this));
			}

			this.broker.addLocalService(this);

			this.broker.callMiddlewareHookSync("serviceCreated", [this]);

			this.logger.debug(`Service '${this.fullName}' created.`);
		}

		/**
		 * Start service
		 *
		 * @returns {Promise}
		 */
		_start() {
			this.logger.debug(`Service '${this.fullName}' is starting...`);
			return this.Promise.resolve()
				.then(() => {
					return this.broker.callMiddlewareHook("serviceStarting", [this]);
				})
				.then(() => {
					// Wait for dependent services
					if (this.schema.dependencies)
						return this.waitForServices(
							this.schema.dependencies,
							this.settings.$dependencyTimeout || this.broker.options.dependencyTimeout,
							this.settings.$dependencyInterval || this.broker.options.dependencyInterval
						);
				})
				.then(() => {
					if (isFunction$c(this.schema.started))
						return this.Promise.method(this.schema.started).call(this);

					if (Array.isArray(this.schema.started)) {
						return this.schema.started
							.map(fn => this.Promise.method(fn.bind(this)))
							.reduce((p, fn) => p.then(() => fn()), this.Promise.resolve());
					}
				})
				.then(() => {
					// Register service
					return this.broker.registerLocalService(
						/** @type {ServiceItem} */ (this._serviceSpecification)
					);
				})
				.then(() => {
					return this.broker.callMiddlewareHook("serviceStarted", [this]);
				})
				.then(() => this.logger.info(`Service '${this.fullName}' started.`));
		}

		/**
		 * Stop service
		 *
		 * @returns {Promise}
		 */
		_stop() {
			this.logger.debug(`Service '${this.fullName}' is stopping...`);
			return this.Promise.resolve()
				.then(() => {
					return this.broker.callMiddlewareHook("serviceStopping", [this], { reverse: true });
				})
				.then(() => {
					if (isFunction$c(this.schema.stopped))
						return this.Promise.method(this.schema.stopped).call(this);

					if (Array.isArray(this.schema.stopped)) {
						const arr = Array.from(this.schema.stopped).reverse();
						return arr
							.map(fn => this.Promise.method(fn.bind(this)))
							.reduce((p, fn) => p.then(() => fn()), this.Promise.resolve());
					}

					return this.Promise.resolve();
				})
				.then(() => {
					return this.broker.callMiddlewareHook("serviceStopped", [this], { reverse: true });
				})
				.then(() => this.logger.info(`Service '${this.fullName}' stopped.`));
		}

		/**
		 * Create an external action handler for broker (internal command!)
		 *
		 * @param {Object|Function} actionDef
		 * @param {String} name
		 * @returns {Object}
		 *
		 * @private
		 */
		_createAction(actionDef, name) {
			let action;
			if (isFunction$c(actionDef)) {
				// Wrap to an object
				action = {
					handler: actionDef
				};
			} else if (isObject$e(actionDef)) {
				action = ___default.cloneDeep(actionDef);
			} else {
				throw new ServiceSchemaError(
					`Invalid action definition in '${name}' action in '${this.fullName}' service!`
				);
			}

			let handler = action.handler;
			if (!isFunction$c(handler)) {
				throw new ServiceSchemaError(
					`Missing action handler on '${name}' action in '${this.fullName}' service!`
				);
			}

			action.rawName = action.name || name;
			if (this.settings.$noServiceNamePrefix !== true)
				action.name = this.fullName + "." + action.rawName;
			else action.name = action.rawName;

			if (action.cache === undefined && this.settings.$cache !== undefined) {
				action.cache = this.settings.$cache;
			}

			action.service = this;
			action.handler = this.Promise.method(handler.bind(this));

			return action;
		}

		/**
		 * Create an internal service method.
		 *
		 * @param {Record<string, any>|Function} methodDef
		 * @param {String} name
		 * @returns {Record<string, any>}
		 */
		_createMethod(methodDef, name) {
			let method;
			if (isFunction$c(methodDef)) {
				// Wrap to an object
				method = {
					handler: methodDef
				};
			} else if (isObject$e(methodDef)) {
				method = methodDef;
			} else {
				throw new ServiceSchemaError(
					`Invalid method definition in '${name}' method in '${this.fullName}' service!`
				);
			}

			if (!isFunction$c(method.handler)) {
				throw new ServiceSchemaError(
					`Missing method handler on '${name}' method in '${this.fullName}' service!`
				);
			}

			method.name = name;
			method.service = this;
			method.handler = method.handler.bind(this);

			this[name] = this.broker.middlewares.wrapHandler("localMethod", method.handler, method);

			return method;
		}

		/**
		 * Create an event subscription for broker
		 *
		 * @param {Record<string, any>|Function} eventDef
		 * @param {String} name
		 * @returns {Record<string, any>}
		 *
		 * @private
		 */
		_createEvent(eventDef, name) {
			let event;
			if (isFunction$c(eventDef) || Array.isArray(eventDef)) {
				event = {
					handler: eventDef
				};
			} else if (isObject$e(eventDef)) {
				event = ___default.cloneDeep(eventDef);
			} else {
				throw new ServiceSchemaError(
					`Invalid event definition in '${name}' event in '${this.fullName}' service!`
				);
			}

			if (!isFunction$c(event.handler) && !Array.isArray(event.handler)) {
				throw new ServiceSchemaError(
					`Missing event handler on '${name}' event in '${this.fullName}' service!`
				);
			}

			// Detect new or legacy parameter list of event handler
			// Legacy: handler(payload, sender, eventName)
			// New: handler(ctx)
			let handler;
			if (isFunction$c(event.handler)) {
				handler = this.Promise.method(event.handler);
			} else if (Array.isArray(event.handler)) {
				handler = event.handler.map(h => {
					h = this.Promise.method(h);
					return h;
				});
			}

			if (!event.name) event.name = name;

			event.service = this;
			const self = this;
			if (isFunction$c(handler)) {
				// Call single handler
				event.handler = function (ctx) {
					return handler.call(self, ctx);
				};
			} else if (Array.isArray(handler)) {
				// Call multiple handler
				event.handler = function (ctx) {
					return self.Promise.all(handler.map(fn => fn.call(self, ctx)));
				};
			}

			return event;
		}

		/**
		 * Call a local event handler. Useful for unit tests.
		 *
		 * @param {String} eventName
		 * @param {any?} params
		 * @param {Record<string, any>?} opts
		 */
		emitLocalEventHandler(eventName, params, opts) {
			if (!this.events[eventName])
				return Promise.reject(
					new MoleculerError$2(
						`No '${eventName}' registered local event handler`,
						500,
						"NOT_FOUND_EVENT",
						{ eventName }
					)
				);

			return this.events[eventName](params, opts);
		}

		/**
		 * Getter of current Context.
		 * @returns {Context?}
		 *
		 *
		get currentContext() {
			return this.broker.getCurrentContext();
		}*/

		/**
		 * Setter of current Context
		 *
		 *
		set currentContext(ctx) {
			this.broker.setCurrentContext(ctx);
		}*/

		/**
		 * Wait for other services
		 *
		 * @param {string | ServiceDependency | (string | ServiceDependency)[]} serviceNames
		 * @param {number?} timeout Timeout in milliseconds
		 * @param {number?} interval Check interval in milliseconds
		 * @returns {Promise}
		 */
		waitForServices(serviceNames, timeout, interval) {
			return this.broker.waitForServices(serviceNames, timeout, interval, this.logger);
		}

		/**
		 * Apply `mixins` list in schema. Merge the schema with mixins schemas. Returns with the mixed schema
		 *
		 * @param {Partial<ServiceSchema>} schema
		 * @returns {Partial<ServiceSchema>}
		 *
		 */
		applyMixins(schema) {
			if (schema.mixins) {
				const mixins = Array.isArray(schema.mixins) ? schema.mixins : [schema.mixins];
				if (mixins.length > 0) {
					const mixedSchema = Array.from(mixins)
						.reverse()
						.reduce((s, mixin) => {
							if (mixin.mixins) mixin = this.applyMixins(mixin);

							return s ? this.mergeSchemas(s, mixin) : mixin;
						}, null);

					return this.mergeSchemas(mixedSchema, schema);
				}
			}

			/* istanbul ignore next */
			return schema;
		}

		/**
		 * Merge two Service schema
		 *
		 * @param {Partial<ServiceSchema>} mixinSchema		Mixin schema
		 * @param {Partial<ServiceSchema>} svcSchema 		Service schema
		 * @returns {Partial<ServiceSchema>} Mixed schema
		 *
		 */
		mergeSchemas(mixinSchema, svcSchema) {
			const res = ___default.cloneDeep(mixinSchema);
			if (!svcSchema) return res;
			const mods = ___default.cloneDeep(svcSchema);
			if (!mixinSchema) return mods;

			Object.keys(mods).forEach(key => {
				if ((key === "name" || key === "version") && mods[key] !== undefined) {
					// Simple overwrite
					res[key] = mods[key];
				} else if (key === "settings") {
					// Merge with defaultsDeep
					res[key] = this.mergeSchemaSettings(mods[key], res[key]);
				} else if (key === "metadata") {
					// Merge with defaultsDeep
					res[key] = this.mergeSchemaMetadata(mods[key], res[key]);
				} else if (key === "hooks") {
					// Merge & concat
					res[key] = this.mergeSchemaHooks(mods[key], res[key] || {});
				} else if (key === "actions") {
					// Merge with defaultsDeep
					res[key] = this.mergeSchemaActions(mods[key], res[key] || {});
				} else if (key === "methods") {
					// Overwrite
					res[key] = this.mergeSchemaMethods(mods[key], res[key]);
				} else if (key === "events") {
					// Merge & concat by groups
					res[key] = this.mergeSchemaEvents(mods[key], res[key] || {});
				} else if (["merged", "created", "started", "stopped"].indexOf(key) !== -1) {
					// Concat lifecycle event handlers
					res[key] = this.mergeSchemaLifecycleHandlers(mods[key], res[key]);
				} else if (key === "mixins") {
					// Concat mixins
					res[key] = this.mergeSchemaUniqArray(mods[key], res[key]);
				} else if (key === "dependencies") {
					// Concat mixins
					res[key] = this.mergeSchemaUniqArray(mods[key], res[key]);
				} else {
					const customFnName = "mergeSchema" + key.replace(/./, key[0].toUpperCase()); // capitalize first letter
					// TODO: add middleware hook
					if (isFunction$c(this[customFnName])) {
						res[key] = this[customFnName](mods[key], res[key]);
					} else {
						res[key] = this.mergeSchemaUnknown(mods[key], res[key]);
					}
				}
			});

			return res;
		}

		/**
		 * Merge `settings` property in schema
		 *
		 * @param {Object} src Source schema property
		 * @param {Object} target Target schema property
		 *
		 * @returns {Object} Merged schema
		 */
		mergeSchemaSettings(src, target) {
			if ((target && target.$secureSettings) || (src && src.$secureSettings)) {
				const srcSS = src && src.$secureSettings ? src.$secureSettings : [];
				const targetSS = target && target.$secureSettings ? target.$secureSettings : [];
				if (!target) target = {};

				target.$secureSettings = uniq([...srcSS, ...targetSS]);
			}

			return ___default.defaultsDeep(src, target);
		}

		/**
		 * Merge `metadata` property in schema
		 *
		 * @param {Object} src Source schema property
		 * @param {Object} target Target schema property
		 *
		 * @returns {Object} Merged schema
		 */
		mergeSchemaMetadata(src, target) {
			return ___default.defaultsDeep(src, target);
		}

		/**
		 * Merge `mixins` property in schema
		 *
		 * @param {Object} src Source schema property
		 * @param {Object} target Target schema property
		 *
		 * @returns {Object} Merged schema
		 */
		mergeSchemaUniqArray(src, target) {
			return ___default.uniqWith(___default.compact(flatten$1([src, target])), ___default.isEqual);
		}

		/**
		 * Merge `dependencies` property in schema
		 *
		 * @param {Object} src Source schema property
		 * @param {Object} target Target schema property
		 *
		 * @returns {Object} Merged schema
		 */
		mergeSchemaDependencies(src, target) {
			return this.mergeSchemaUniqArray(src, target);
		}

		/**
		 * Merge `hooks` property in schema
		 *
		 * @param {Object} src Source schema property
		 * @param {Object} target Target schema property
		 *
		 * @returns {Object} Merged schema
		 */
		mergeSchemaHooks(src, target) {
			Object.keys(src).forEach(k => {
				if (target[k] == null) target[k] = {};

				Object.keys(src[k]).forEach(k2 => {
					const modHook = wrapToArray(src[k][k2]);
					const resHook = wrapToArray(target[k][k2]);

					target[k][k2] = ___default.compact(
						flatten$1(k === "before" ? [resHook, modHook] : [modHook, resHook])
					);
				});
			});

			return target;
		}

		/**
		 * Merge `actions` property in schema
		 *
		 * @param {Object} src Source schema property (real schema)
		 * @param {Object} target Target schema property (mixin schema)
		 *
		 * @returns {Object} Merged schema
		 */
		mergeSchemaActions(src, target) {
			Object.keys(src).forEach(k => {
				if (src[k] === false && target[k]) {
					delete target[k];
					return;
				}

				const srcAction = wrapToHandler(src[k]);
				const targetAction = wrapToHandler(target[k]);

				if (srcAction && srcAction.hooks && targetAction && targetAction.hooks) {
					Object.keys(srcAction.hooks).forEach(k => {
						const modHook = wrapToArray(srcAction.hooks[k]);
						const resHook = wrapToArray(targetAction.hooks[k]);

						srcAction.hooks[k] = ___default.compact(
							flatten$1(k === "before" ? [resHook, modHook] : [modHook, resHook])
						);
					});
				}

				target[k] = ___default.defaultsDeep(srcAction, targetAction);
			});

			return target;
		}

		/**
		 * Merge `methods` property in schema
		 *
		 * @param {Object} src Source schema property
		 * @param {Object} target Target schema property
		 *
		 * @returns {Object} Merged schema
		 */
		mergeSchemaMethods(src, target) {
			return Object.assign(target || {}, src || {});
		}

		/**
		 * Merge `events` property in schema
		 *
		 * @param {Object} src Source schema property
		 * @param {Object} target Target schema property
		 *
		 * @returns {Object} Merged schema
		 */
		mergeSchemaEvents(src, target) {
			Object.keys(src).forEach(k => {
				const modEvent = wrapToHandler(src[k]);
				const resEvent = wrapToHandler(target[k]);

				let handler = ___default.compact(
					flatten$1([resEvent ? resEvent.handler : null, modEvent ? modEvent.handler : null])
				);
				if (handler.length === 1) handler = handler[0];

				target[k] = ___default.defaultsDeep(modEvent, resEvent);
				target[k].handler = handler;
			});

			return target;
		}

		/**
		 * Merge `started`, `stopped`, `created` event handler properties in schema
		 *
		 * @param {Object} src Source schema property
		 * @param {Object} target Target schema property
		 *
		 * @returns {Object} Merged schema
		 */
		mergeSchemaLifecycleHandlers(src, target) {
			return ___default.compact(flatten$1([target, src]));
		}

		/**
		 * Merge unknown properties in schema
		 *
		 * @param {Object} src Source schema property
		 * @param {Object} target Target schema property
		 *
		 * @returns {Object} Merged schema
		 */
		mergeSchemaUnknown(src, target) {
			if (src !== undefined) return src;

			return target;
		}

		/**
		 * Return a versioned full service name.
		 * @param {String} name
		 * @param {String|Number?} version
		 */
		static getVersionedFullName(name, version) {
			if (version != null)
				return (typeof version == "number" ? "v" + version : version) + "." + name;

			return name;
		}
	}

	var service = Service;

	const { pick: pick$2 } = ___default;
	const { RequestSkippedError, MaxCallLevelError } = errors;

	/**
	 * @typedef {import("./context")} ContextClass
	 * @typedef {import("./service-broker").MCallDefinition} MCallDefinition
	 * @typedef {import("./service-broker").MCallCallingOptions} MCallCallingOptions
	 * @typedef {import("./service-broker")} ServiceBroker Moleculer Service Broker instance
	 * @typedef {import("./service-broker").CallingOptions} CallingOptions Calling Options
	 * @typedef {import("./registry/endpoint")} Endpoint Registry Endpoint
	 * @typedef {import("./registry/endpoint-action")} ActionEndpoint Registry Action Endpoint
	 * @typedef {import("./registry/endpoint-event")} EventEndpoint Registry Event Endpoint
	 * @typedef {import("./tracing/span")} Span Tracing Span
	 */

	/**
	 * Merge metadata
	 *
	 * @param {Context} ctx
	 * @param {Object} newMeta
	 */
	function mergeMeta(ctx, newMeta) {
		if (newMeta) Object.assign(ctx.meta, newMeta);
		return ctx.meta;
	}

	/**
	 * Context class for action calls
	 *
	 * @class Context
	 * @implements {ContextClass}
	 */
	class Context {
		/**
		 * Creates an instance of Context.
		 *
		 * @param {ServiceBroker} broker - Broker instance
		 * @param {ActionEndpoint|EventEndpoint=} endpoint
		 *
		 * @memberof Context
		 */
		constructor(broker, endpoint) {
			this.broker = broker;
			if (this.broker) {
				this.nodeID = this.broker.nodeID;
				this.id = this.broker.generateUid();
			} else {
				this.nodeID = null;
			}

			if (endpoint) {
				this.setEndpoint(endpoint);
			} else {
				this.endpoint = null;
				this.service = null;
				this.action = null;
				this.event = null;
			}

			// The emitted event "user.created" because `ctx.event.name` can be "user.**"
			this.eventName = null;
			// Type of event ("emit" or "broadcast")
			this.eventType = null;
			// The groups of event
			this.eventGroups = null;

			/** @type {CallingOptions} */
			this.options = {
				timeout: null,
				retries: null
			};

			this.parentID = null;
			this.caller = null;

			this.level = 1;

			this.params = null;
			this.meta = {};
			this.headers = {};
			this.responseHeaders = {};
			this.locals = {};

			this.stream = null;

			this.requestID = this.id;

			this.tracing = null;
			this.span = null;
			this._spanStack = [];

			this.needAck = null;
			this.ackID = null;

			this.startHrTime = null;

			this.cachedResult = false;
		}

		/**
		 * Create a new Context instance
		 *
		 * @param {ServiceBroker} broker
		 * @param {ActionEndpoint|EventEndpoint} endpoint
		 * @param {Object?} params
		 * @param {CallingOptions} opts
		 * @returns {Context}
		 *
		 * @static
		 * @memberof Context
		 */
		static create(broker, endpoint, params, opts = {}) {
			const ctx = new broker.ContextFactory(broker, endpoint);

			if (endpoint != null) ctx.setEndpoint(endpoint);

			if (params != null) {
				let cloning = broker ? broker.options.contextParamsCloning : false;
				if (opts.paramsCloning != null) cloning = opts.paramsCloning;
				ctx.setParams(params, cloning);
			}

			//Object.assign(ctx.options, opts);
			ctx.options = opts;

			// RequestID
			if (opts.requestID != null) ctx.requestID = opts.requestID;
			else if (opts.parentCtx != null && opts.parentCtx.requestID != null)
				ctx.requestID = opts.parentCtx.requestID;

			// Meta
			if (opts.parentCtx != null && opts.parentCtx.meta != null)
				ctx.meta = Object.assign({}, opts.parentCtx.meta || {}, opts.meta || {});
			else if (opts.meta != null) ctx.meta = opts.meta;

			// Headers
			if (opts.headers) {
				ctx.headers = opts.headers;
			}

			// ParentID, Level, Caller, Tracing
			if (opts.parentCtx != null) {
				ctx.tracing = opts.parentCtx.tracing;
				ctx.level = opts.parentCtx.level + 1;

				if (opts.parentCtx.span) ctx.parentID = opts.parentCtx.span.id;
				else ctx.parentID = opts.parentCtx.id;

				if (opts.parentCtx.service) ctx.caller = opts.parentCtx.service.fullName;
			}

			// caller
			if (opts.caller) {
				ctx.caller = opts.caller;
			}

			// Parent span
			if (opts.parentSpan != null) {
				ctx.parentID = opts.parentSpan.id;
				ctx.requestID = opts.parentSpan.traceID;
				ctx.tracing = opts.parentSpan.sampled;
			}

			// Event acknowledgement
			// if (opts.needAck) {
			// 	ctx.needAck = opts.needAck;
			// }

			return ctx;
		}

		/**
		 * Copy itself without ID.
		 *
		 * @param {ActionEndpoint|EventEndpoint} ep
		 * @returns {Context}
		 */
		copy(ep) {
			/** @type {any} */
			const ctor = this.constructor;

			/** @type {Context} */
			const newCtx = new ctor(this.broker);

			newCtx.nodeID = this.nodeID;
			newCtx.setEndpoint(ep || this.endpoint);
			newCtx.options = this.options;
			newCtx.parentID = this.parentID;
			newCtx.caller = this.caller;
			newCtx.level = this.level;
			newCtx.params = this.params;
			newCtx.meta = this.meta;
			newCtx.headers = this.headers;
			newCtx.responseHeaders = this.responseHeaders;
			newCtx.locals = this.locals;
			newCtx.requestID = this.requestID;
			newCtx.tracing = this.tracing;
			newCtx.span = this.span;
			newCtx.needAck = this.needAck;
			newCtx.ackID = this.ackID;
			newCtx.eventName = this.eventName;
			newCtx.eventType = this.eventType;
			newCtx.eventGroups = this.eventGroups;
			newCtx.stream = this.stream;

			newCtx.cachedResult = this.cachedResult;

			return newCtx;
		}

		/**
		 *
		 * @param {ActionEndpoint|EventEndpoint} ep
		 * @returns {ep is ActionEndpoint}
		 */
		isActionEndpoint(ep) {
			// @ts-ignore
			return ep?.action != null;
		}

		/**
		 *
		 * @param {ActionEndpoint|EventEndpoint} ep
		 * @returns {ep is EventEndpoint}
		 */
		isEventEndpoint(ep) {
			// @ts-ignore
			return ep?.event != null;
		}

		/**
		 * Set endpoint of context
		 *
		 * @param {ActionEndpoint|EventEndpoint} endpoint
		 * @memberof Context
		 */
		setEndpoint(endpoint) {
			this.endpoint = endpoint;
			if (endpoint) {
				this.nodeID = endpoint.id;
				if (this.isActionEndpoint(endpoint)) {
					this.action = endpoint.action;
					this.service = this.action.service;
					this.event = null;
				} else if (this.isEventEndpoint(endpoint)) {
					this.event = endpoint.event;
					this.service = this.event.service;
					this.action = null;
				}
			}
		}

		/**
		 * Set params of context
		 *
		 * @param {Object} newParams
		 * @param {Boolean} cloning
		 *
		 * @memberof Context
		 */
		setParams(newParams, cloning = false) {
			if (cloning && newParams) this.params = structuredClone(newParams);
			else this.params = newParams;
		}

		/**
		 * Call an other action. It creates a sub-context.
		 *
		 * @param {String} actionName
		 * @param {Object=} params
		 * @param {Object=} _opts
		 * @returns {Promise}
		 *
		 * @example <caption>Call an other service with params & options</caption>
		 * ctx.call("posts.get", { id: 12 }, { timeout: 1000 });
		 *
		 * @memberof Context
		 */
		call(actionName, params, _opts) {
			const opts = Object.assign(
				{
					parentCtx: this
				},
				_opts
			);

			if (this.options.timeout > 0 && this.startHrTime) {
				// Distributed timeout handling. Decrementing the timeout value with the elapsed time.
				// If the timeout below 0, skip the call.
				const diff = _process.hrtime(this.startHrTime);
				const duration = diff[0] * 1e3 + diff[1] / 1e6;
				const distTimeout = this.options.timeout - duration;

				if (distTimeout <= 0) {
					return this.broker.Promise.reject(
						new RequestSkippedError({ action: actionName, nodeID: this.broker.nodeID })
					);
				}

				if (!opts.timeout || distTimeout < opts.timeout) opts.timeout = distTimeout;
			}

			// Max calling level check to avoid calling loops
			if (
				this.broker.options.maxCallLevel > 0 &&
				this.level >= this.broker.options.maxCallLevel
			) {
				return this.broker.Promise.reject(
					new MaxCallLevelError({ nodeID: this.broker.nodeID, level: this.level })
				);
			}

			let p = this.broker.call(actionName, params, opts);

			// Merge metadata with sub context metadata
			return p
				.then(res => {
					if (p.ctx) mergeMeta(this, p.ctx.meta);

					return res;
				})
				.catch(err => {
					if (p.ctx) mergeMeta(this, p.ctx.meta);

					return this.broker.Promise.reject(err);
				});
		}

		/**
		 * @overload
		 * @param {Record<string, MCallDefinition>} def
		 * @param {MCallCallingOptions=} _opts
		 * @returns {Promise<Record<string, TResult>>}
		 */
		/**
		 * @overload
		 * @param {MCallDefinition[]} def
		 * @param {MCallCallingOptions=} _opts
		 * @returns {Promise<TResult[]>}
		 */
		/**
		 * Multiple action calls.
		 *
		 * @template TResult
		 * @param {Record<string, MCallDefinition>|MCallDefinition[]} def
		 * @param {MCallCallingOptions=} _opts
		 * @returns {Promise<Record<string, TResult> | TResult[]>}
		 */
		mcall(def, _opts) {
			const opts = Object.assign(
				{
					parentCtx: this
				},
				_opts
			);

			if (this.options.timeout > 0 && this.startHrTime) {
				// Distributed timeout handling. Decrementing the timeout value with the elapsed time.
				// If the timeout below 0, skip the call.
				const diff = _process.hrtime(this.startHrTime);
				const duration = diff[0] * 1e3 + diff[1] / 1e6;
				const distTimeout = this.options.timeout - duration;

				if (distTimeout <= 0) {
					const action = (Array.isArray(def) ? def : Object.values(def))
						.map(d => d.action)
						.join(", ");
					return this.broker.Promise.reject(
						new RequestSkippedError({ action, nodeID: this.broker.nodeID })
					);
				}

				if (!opts.timeout || distTimeout < opts.timeout) opts.timeout = distTimeout;
			}

			// Max calling level check to avoid calling loops
			if (
				this.broker.options.maxCallLevel > 0 &&
				this.level >= this.broker.options.maxCallLevel
			) {
				return this.broker.Promise.reject(
					new MaxCallLevelError({ nodeID: this.broker.nodeID, level: this.level })
				);
			}

			let p = this.broker.mcall(/** @type {MCallDefinition[]} */ (def), opts);

			// Merge metadata with sub context metadata
			return p
				.then(res => {
					if (Array.isArray(p.ctx) && p.ctx.length)
						p.ctx.forEach(ctx => mergeMeta(this, ctx.meta));

					return res;
				})
				.catch(err => {
					if (Array.isArray(p.ctx) && p.ctx.length)
						p.ctx.forEach(ctx => mergeMeta(this, ctx.meta));

					return this.broker.Promise.reject(err);
				});
		}

		/**
		 * Emit an event (grouped & balanced global event)
		 *
		 * @param {string} eventName
		 * @param {any=} data
		 * @param {Object=} opts
		 * @returns {Promise}
		 *
		 * @example
		 * ctx.emit("user.created", { entity: user, creator: ctx.meta.user });
		 *
		 * @memberof Context
		 */
		emit(eventName, data, opts) {
			opts = opts ?? {};
			opts.parentCtx = this;

			if (opts.groups && !Array.isArray(opts.groups)) opts.groups = [opts.groups];

			return this.broker.emit(eventName, data, opts);
		}

		/**
		 * Emit an event for all local & remote services
		 *
		 * @param {string} eventName
		 * @param {any=} data
		 * @param {Object=} opts
		 * @returns {Promise}
		 *
		 * @example
		 * ctx.broadcast("user.created", { entity: user, creator: ctx.meta.user });
		 *
		 * @memberof Context
		 */
		broadcast(eventName, data, opts) {
			opts = opts ?? {};
			opts.parentCtx = this;

			if (opts.groups && !Array.isArray(opts.groups)) opts.groups = [opts.groups];

			return this.broker.broadcast(eventName, data, opts);
		}

		/**
		 * Start a new child tracing span.
		 *
		 * @param {String} name
		 * @param {Object=} opts
		 * @returns {Span}
		 * @memberof Context
		 */
		startSpan(name, opts) {
			let span;
			if (this.span) {
				span = this.span.startSpan(name, Object.assign({ ctx: this }, opts));
			} else {
				span = this.broker.tracer.startSpan(name, Object.assign({ ctx: this }, opts));
			}

			this._spanStack.push(span);
			this.span = span;

			return span;
		}

		/**
		 * Finish an active span.
		 *
		 * @param {Span} span
		 * @param {Number=} time
		 */
		finishSpan(span, time) {
			if (!span.isActive()) return;

			span.finish(time);

			const idx = this._spanStack.findIndex(sp => sp == span);
			if (idx !== -1) {
				this._spanStack.splice(idx, 1);
				this.span = this._spanStack[this._spanStack.length - 1];
			} else {
				/* istanbul ignore next */
				this.service.logger.warn("This span is not assigned to this context", span);
			}
		}

		/**
		 * Convert Context to a printable POJO object.
		 */
		toJSON() {
			const res = pick$2(this, [
				"id",
				"nodeID",
				"action.name",
				"event.name",
				"service.name",
				"service.version",
				"service.fullName",
				"options",
				"parentID",
				"caller",
				"level",
				"params",
				"meta",
				"headers",
				"responseHeaders",
				//"locals",
				"requestID",
				"tracing",
				"span",
				"needAck",
				"ackID",
				"eventName",
				"eventType",
				"eventGroups",
				"cachedResult"
			]);

			return res;
		}

		/* istanbul ignore next */
		[util__default.inspect.custom](depth, options) {
			// https://nodejs.org/docs/latest-v8.x/api/util.html#util_custom_inspection_functions_on_objects
			if (depth < 0) {
				return options.stylize("[Context]", "special");
			}

			const inner = util__default.inspect(this.toJSON(), options);
			return `${options.stylize("Context", "special")}< ${inner} >`;
		}
	}

	var context = Context;

	const { MoleculerClientError } = errors;


	/**
	 * Internal service ($node.*)
	 */
	var internals = function () {
		/** @type {import("./service").ServiceSchema} */
		const schema = {
			name: "$node",

			actions: {
				list: {
					cache: false,
					tracing: false,
					params: {
						withServices: {
							type: "boolean",
							optional: true,
							convert: true,
							default: false
						},
						onlyAvailable: {
							type: "boolean",
							optional: true,
							convert: true,
							default: false
						}
					},
					handler(ctx) {
						return this.broker.registry.getNodeList(ctx.params);
					}
				},

				services: {
					cache: false,
					tracing: false,
					params: {
						onlyLocal: { type: "boolean", optional: true, convert: true, default: false },
						skipInternal: {
							type: "boolean",
							optional: true,
							convert: true,
							default: false
						},
						withActions: { type: "boolean", optional: true, convert: true, default: false },
						withEvents: { type: "boolean", optional: true, convert: true, default: false },
						onlyAvailable: {
							type: "boolean",
							optional: true,
							convert: true,
							default: false
						},
						grouping: { type: "boolean", optional: true, convert: true, default: true }
					},
					handler(ctx) {
						return this.broker.registry.getServiceList(ctx.params);
					}
				},

				actions: {
					cache: false,
					tracing: false,
					params: {
						onlyLocal: { type: "boolean", optional: true, convert: true, default: false },
						skipInternal: {
							type: "boolean",
							optional: true,
							convert: true,
							default: false
						},
						withEndpoints: {
							type: "boolean",
							optional: true,
							convert: true,
							default: false
						},
						onlyAvailable: {
							type: "boolean",
							optional: true,
							convert: true,
							default: false
						}
					},
					handler(ctx) {
						return this.broker.registry.getActionList(ctx.params);
					}
				},

				events: {
					cache: false,
					tracing: false,
					params: {
						onlyLocal: { type: "boolean", optional: true, convert: true, default: false },
						skipInternal: {
							type: "boolean",
							optional: true,
							convert: true,
							default: false
						},
						withEndpoints: {
							type: "boolean",
							optional: true,
							convert: true,
							default: false
						},
						onlyAvailable: {
							type: "boolean",
							optional: true,
							convert: true,
							default: false
						}
					},
					handler(ctx) {
						return this.broker.registry.getEventList(ctx.params);
					}
				},

				health: {
					cache: false,
					tracing: false,
					handler() {
						return this.broker.getHealthStatus();
					}
				},

				options: {
					cache: false,
					tracing: false,
					params: {},
					handler() {
						return utils_1.safetyObject(this.broker.options, this.broker.options);
					}
				},

				metrics: {
					cache: false,
					tracing: false,
					params: {
						types: {
							type: "multi",
							optional: true,
							rules: [{ type: "string" }, { type: "array", items: "string" }]
						},
						includes: {
							type: "multi",
							optional: true,
							rules: [{ type: "string" }, { type: "array", items: "string" }]
						},
						excludes: {
							type: "multi",
							optional: true,
							rules: [{ type: "string" }, { type: "array", items: "string" }]
						}
					},
					handler(ctx) {
						if (!this.broker.isMetricsEnabled())
							return this.Promise.reject(
								new MoleculerClientError(
									"Metrics feature is disabled",
									400,
									"METRICS_DISABLED"
								)
							);

						return this.broker.metrics.list(ctx.params);
					}
				}
			}
		};

		return schema;
	};

	const EventEmitter2$1 = eventemitter2.EventEmitter2;

	const { globSync } = null;

	const { format } = util__default;







	//const AsyncStorage 			= require("./async-storage");




	const Errors = errors;




	const { MetricRegistry: MetricRegistry$1, METRIC: METRIC$b } = metrics;
	const { Tracer: Tracer$1 } = tracing$1;


	/**
	 * Import types
	 *
	 * @typedef {import("./context")} Context
	 * @typedef {import("./registry/endpoint-action")} ActionEndpoint
	 * @typedef {import("./service")} Service
	 * @typedef {import("./service").ServiceSchema} ServiceSchema
	 * @typedef {import("./service").ServiceDependency} ServiceDependency
	 * @typedef {import("./service").ActionHandler} ActionHandler
	 * @typedef {import("./service-broker")} ServiceBrokerClass
	 * @typedef {import("./service-broker").BrokerOptions} BrokerOptions
	 * @typedef {import("./service-broker").CallingOptions} CallingOptions
	 * @typedef {import("./service-broker").NodeHealthStatus} NodeHealthStatus
	 * @typedef {import("./service-broker").MCallDefinition} MCallDefinition
	 * @typedef {import("./service-broker").MCallCallingOptions} MCallCallingOptions
	 * @typedef {import("./logger-factory").Logger} Logger
	 * @typedef {import("./registry").NodeRawInfo} NodeRawInfo
	 * @typedef {import("./registry/service-item")} ServiceItem
	 */

	/**
	 * Default broker options
	 *
	 * @type {BrokerOptions}
	 */
	const defaultOptions = {
		namespace: "",
		nodeID: null,

		logger: true,
		logLevel: null,

		transporter: null, //"TCP",

		errorRegenerator: null,

		requestTimeout: 0 * 1000,
		retryPolicy: {
			enabled: false,
			retries: 5,
			delay: 100,
			maxDelay: 1000,
			factor: 2,
			// @ts-ignore
			check: err => err && !!err.retryable
		},

		contextParamsCloning: false,
		maxCallLevel: 0,
		heartbeatInterval: 10,
		heartbeatTimeout: 30,

		tracking: {
			enabled: false,
			shutdownTimeout: 5000
		},

		disableBalancer: false,

		registry: {
			strategy: "RoundRobin",
			preferLocal: true,
			stopDelay: 100,
			discoverer: "Local"
		},

		circuitBreaker: {
			enabled: false,
			threshold: 0.5,
			windowTime: 60,
			minRequestCount: 20,
			halfOpenTime: 10 * 1000,
			// @ts-ignore
			check: err => err && err.code >= 500
		},

		bulkhead: {
			enabled: false,
			concurrency: 10,
			maxQueueSize: 100
		},

		transit: {
			maxQueueSize: 50 * 1000, // 50k ~ 400MB,
			maxChunkSize: 256 * 1024, // 256KB
			disableReconnect: false,
			disableVersionCheck: false,
			serviceChangedDebounceTime: 1000
		},

		uidGenerator: null,

		errorHandler: null,

		cacher: null,
		serializer: null,

		validator: true,

		metrics: { enabled: false },
		tracing: { enabled: false },

		internalServices: true,
		internalMiddlewares: true,

		dependencyInterval: 1000,
		dependencyTimeout: 0,

		hotReload: false,

		middlewares: null,

		replOptions: null,

		metadata: {},

		skipProcessEventRegistration: false,

		/**
		 * Maximum size of objects that can be serialized
		 *
		 * On serialization process, check each object property size (based on length or size property value)
		 * and trim it, if object size bigger than maxSafeObjectSize value
		 *
		 * @type {(number|null)}
		 */
		maxSafeObjectSize: null
		// ServiceFactory: null,
		// ContextFactory: null
		// Promise: null
	};

	const INTERNAL_MIDDLEWARES = [
		"ActionHook",
		"Validator",
		"Bulkhead",
		"Cacher",
		"ContextTracker",
		"CircuitBreaker",
		"Timeout",
		"Retry",
		"Fallback",
		"ErrorHandler",
		"Tracing",
		"Metrics",
		"Debounce",
		"Throttle"
	];

	/**
	 * Service broker class
	 *
	 * @class ServiceBroker
	 * @implements {ServiceBrokerClass}
	 */
	class ServiceBroker {
		/**
		 * Creates an instance of ServiceBroker.
		 *
		 * @param {BrokerOptions} options
		 *
		 * @memberof ServiceBroker
		 */
		constructor(options) {
			try {
				this.options = ___default.defaultsDeep(options, defaultOptions);

				// Custom Promise lib
				if (this.options.Promise) {
					this.Promise = this.options.Promise;
				} else {
					// Use native Promise lib
					this.Promise = Promise;
				}
				utils_1.polyfillPromise(this.Promise);

				// Broker started flag
				this.started = false;

				/** @type {Boolean} Broker is starting inital services flag*/
				this.servicesStarting = false;

				/** @type {Boolean} Broker stopping flag*/
				this.stopping = false;

				// Class factories
				this.ServiceFactory = this.options.ServiceFactory || service;
				this.ContextFactory = this.options.ContextFactory || context;

				// Namespace
				this.namespace = this.options.namespace || "";

				// Metadata
				this.metadata = this.options.metadata || {};

				// Self nodeID
				this.nodeID = this.options.nodeID || utils_1.getNodeID();

				// Instance ID
				this.instanceID = utils_1.generateToken();

				// Internal maps
				this.services = [];

				// Internal event bus
				this.localBus = new EventEmitter2$1({
					wildcard: true,
					maxListeners: 100
				});

				// Log Factory
				this.loggerFactory = new loggerFactory(this);
				this.loggerFactory.init(this.options.logger);

				// Logger
				this.logger = this.getLogger("broker");

				this.logger.info(`Moleculer v${this.MOLECULER_VERSION} is starting...`);
				this.logger.info(`Namespace: ${this.namespace || "<not defined>"}`);
				this.logger.info(`Node ID: ${this.nodeID}`);

				// Async storage for Contexts
				//this.scope = new AsyncStorage(this);

				// Metrics Registry
				this.metrics = new MetricRegistry$1(this, this.options.metrics);
				this.metrics.init(this);
				this.registerMoleculerMetrics();

				// Middleware handler
				this.middlewares = new middleware(this);
				this.middlewares.middlewareInterceptors["call"] = this.interceptCallMiddleware;

				// Service registry
				this.registry = new registry$2(this);

				// Cacher
				this.cacher = cachers.resolve(this.options.cacher);
				if (this.cacher) {
					this.cacher.init(this);

					const name = utils_1.getConstructorName(this.cacher);
					this.logger.info(`Cacher: ${name}`);
				}

				// Serializer
				this.serializer = serializers.resolve(this.options.serializer);
				this.serializer.init(this);

				// Error regenerator
				this.errorRegenerator = Errors.resolveRegenerator(this.options.errorRegenerator);
				this.errorRegenerator.init(this);

				const serializerName = utils_1.getConstructorName(this.serializer);
				this.logger.info(`Serializer: ${serializerName}`);

				// Validator
				if (this.options.validator) {
					this.validator = validators.resolve(this.options.validator);
					if (this.validator) {
						const validatorName = utils_1.getConstructorName(this.validator);
						this.logger.info(`Validator: ${validatorName}`);
						this.validator.init(this);
					}
				}

				// Tracing
				this.tracer = new Tracer$1(this, this.options.tracing);
				this.tracer.init();

				// Register middlewares
				this.registerMiddlewares(this.options.middlewares);

				// Transit & Transporter
				if (this.options.transporter) {
					const tx = transporters.resolve(this.options.transporter);
					this.transit = new transit(this, tx, this.options.transit);

					const txName = utils_1.getConstructorName(tx);
					this.logger.info(`Transporter: ${txName}`);

					if (this.options.disableBalancer) {
						if (tx.hasBuiltInBalancer) {
							this.logger.info("The broker built-in balancer is DISABLED.");
						} else {
							this.logger.warn(
								`The ${txName} has no built-in balancer. Broker balancer is ENABLED.`
							);
							this.options.disableBalancer = false;
						}
					}
				}

				// Change the call method if balancer is disabled
				if (this.options.disableBalancer) {
					this.call = this.callWithoutBalancer;
				}

				if (this.options.transit.serviceChangedDebounceTime > 0) {
					// Create debounced localServiceChanged
					const origLocalServiceChanged = this.localServiceChanged;
					this.localServiceChanged = ___default.debounce(
						() => origLocalServiceChanged.call(this),
						this.options.transit.serviceChangedDebounceTime
					);
				}

				this.registry.init();

				// Register internal actions
				if (this.options.internalServices)
					this.registerInternalServices(this.options.internalServices);

				// Call `created` event handler in middlewares
				this.callMiddlewareHookSync("created", [this]);

				// Call `created` event handler from options
				if (utils_1.isFunction(this.options.created)) this.options.created(this);

				// Graceful exit
				this._closeFn = () => {
					/* istanbul ignore next */
					this.stop()
						.catch(err => this.logger.error(err))
						.then(() => _process.exit(0));
				};

				_process.setMaxListeners(0);
				if (this.options.skipProcessEventRegistration === false) {
					_process.on("beforeExit", this._closeFn);
					_process.on("exit", this._closeFn);
					_process.on("SIGINT", this._closeFn);
					_process.on("SIGTERM", this._closeFn);
				}
			} catch (err) {
				if (this.logger) this.fatal("Unable to create ServiceBroker.", err, true);
				else {
					/* eslint-disable-next-line no-console */
					console.error("Unable to create ServiceBroker.", err);
					_process.exit(1);
				}
			}
		}

		/**
		 * Register middlewares (user & internal)
		 *
		 * @param {MiddlewareHandler.Middleware[]} userMiddlewares
		 * @memberof ServiceBroker
		 */
		registerMiddlewares(userMiddlewares) {
			// Register user middlewares
			if (Array.isArray(userMiddlewares) && userMiddlewares.length > 0) {
				___default.compact(userMiddlewares).forEach(mw => this.middlewares.add(mw));
			}

			if (this.options.internalMiddlewares) {
				// Register internal middlewares
				INTERNAL_MIDDLEWARES.forEach(mw => this.middlewares.add(mw));

				if (this.options.hotReload) {
					// 14. Hot Reload
					this.middlewares.add("HotReload");
				}
			}
			this.logger.info(`Registered ${this.middlewares.count()} middleware(s).`);

			this.createService = this.wrapMethod("createService", this.createService);
			this.registerLocalService = this.wrapMethod(
				"registerLocalService",
				this.registerLocalService
			);
			this.destroyService = this.wrapMethod("destroyService", this.destroyService);
			this.call = this.wrapMethod("call", this.call);
			this.callWithoutBalancer = this.wrapMethod("call", this.callWithoutBalancer);
			this.mcall = this.wrapMethod("mcall", this.mcall);
			this.emit = this.wrapMethod("emit", this.emit);
			this.broadcast = this.wrapMethod("broadcast", this.broadcast);
			this.broadcastLocal = this.wrapMethod("broadcastLocal", this.broadcastLocal);

			this.metrics.set(METRIC$b.MOLECULER_BROKER_MIDDLEWARES_TOTAL, this.middlewares.count());
		}

		/**
		 * It is necessary to keep the context of the call when using call middleware.
		 */
		interceptCallMiddleware(createMiddleware) {
			return next => {
				let result = null;
				const call = createMiddleware((...args) => (result = next(...args)));
				return (...args) => {
					const promise = call(...args);
					if (result) promise.ctx = result.ctx;
					return promise;
				};
			};
		}

		/**
		 * Register Moleculer Core metrics.
		 */
		registerMoleculerMetrics() {
			if (!this.isMetricsEnabled()) return;

			// --- MOLECULER NODE METRICS ---

			this.metrics
				.register({
					name: METRIC$b.MOLECULER_NODE_TYPE,
					type: METRIC$b.TYPE_INFO,
					description: "Moleculer implementation type"
				})
				.set("nodejs");
			this.metrics
				.register({
					name: METRIC$b.MOLECULER_NODE_VERSIONS_MOLECULER,
					type: METRIC$b.TYPE_INFO,
					description: "Moleculer version number"
				})
				.set(ServiceBroker.MOLECULER_VERSION);
			this.metrics
				.register({
					name: METRIC$b.MOLECULER_NODE_VERSIONS_PROTOCOL,
					type: METRIC$b.TYPE_INFO,
					description: "Moleculer protocol version"
				})
				.set(ServiceBroker.PROTOCOL_VERSION);

			// --- MOLECULER BROKER METRICS ---

			this.metrics
				.register({
					name: METRIC$b.MOLECULER_BROKER_NAMESPACE,
					type: METRIC$b.TYPE_INFO,
					description: "Moleculer namespace"
				})
				.set(this.namespace);
			this.metrics
				.register({
					name: METRIC$b.MOLECULER_BROKER_STARTED,
					type: METRIC$b.TYPE_GAUGE,
					description: "ServiceBroker started"
				})
				.set(0);
			this.metrics
				.register({
					name: METRIC$b.MOLECULER_BROKER_LOCAL_SERVICES_TOTAL,
					type: METRIC$b.TYPE_GAUGE,
					description: "Number of local services"
				})
				.set(0);
			this.metrics
				.register({
					name: METRIC$b.MOLECULER_BROKER_MIDDLEWARES_TOTAL,
					type: METRIC$b.TYPE_GAUGE,
					description: "Number of local middlewares"
				})
				.set(0);
		}

		/**
		 * Start broker. If has transporter, transporter.connect will be called.
		 *
		 * @memberof ServiceBroker
		 */
		start() {
			const startTime = Date.now();

			return this.Promise.resolve()
				.then(() => {
					//this.tracer.restartScope();
					//this.scope.enable();
				})
				.then(() => {
					return this.callMiddlewareHook("starting", [this]);
				})
				.then(() => {
					if (this.transit) return this.transit.connect();
				})
				.then(() => {
					// Call service `started` handlers
					const startingServices = this.services.map(svc => svc._start.call(svc));
					// Set servicesStarting, so new services created from now on will be started when registered
					this.servicesStarting = true;
					// Wait for services `started` handlers
					return this.Promise.all(startingServices).catch(err => {
						/* istanbul ignore next */
						this.logger.error("Unable to start all services.", err);
						throw err;
					});
				})
				.then(() => {
					this.started = true;
					this.servicesStarting = false;
					this.metrics.set(METRIC$b.MOLECULER_BROKER_STARTED, 1);
					this.broadcastLocal("$broker.started");
				})
				.then(() => {
					if (this.transit) return this.transit.ready();
				})
				.then(() => {
					return this.callMiddlewareHook("started", [this]);
				})
				.then(() => {
					if (utils_1.isFunction(this.options.started)) return this.options.started(this);
				})
				.then(() => {
					const duration = Date.now() - startTime;
					this.logger.info(
						`✔ ServiceBroker with ${
						this.services.length
					} service(s) started successfully in ${utils_1.humanize(duration)}.`
					);
				});
		}

		/**
		 * Stop broker. If has transporter, transporter.disconnect will be called.
		 *
		 * @memberof ServiceBroker
		 */
		stop() {
			this.started = false;
			return this.Promise.resolve()
				.then(() => {
					if (this.transit) {
						this.registry.regenerateLocalRawInfo(true, true);
						// Send empty node info in order to block incoming requests
						return this.registry.discoverer.sendLocalNodeInfo();
					}
				})
				.then(() => {
					return this.Promise.delay(this.options.registry.stopDelay);
				})
				.then(() => {
					this.stopping = true;

					return this.callMiddlewareHook("stopping", [this], { reverse: true });
				})
				.then(() => {
					// Call service `stopped` handlers
					return this.Promise.all(this.services.map(svc => svc._stop.call(svc))).catch(
						err => {
							/* istanbul ignore next */
							this.logger.error("Unable to stop all services.", err);

							this.broadcastLocal("$broker.error", {
								error: err,
								module: "broker",
								type: constants.FAILED_STOPPING_SERVICES
							});
						}
					);
				})
				.then(() => {
					if (this.transit) {
						return this.transit.disconnect();
					}
				})
				.then(() => {
					if (this.cacher) {
						return this.cacher.close();
					}
				})
				.then(() => {
					if (this.metrics) {
						return this.metrics.stop();
					}
				})
				.then(() => {
					if (this.tracer) {
						return this.tracer.stop();
					}
				})
				.then(() => {
					return this.registry.stop();
				})
				.then(() => {
					return this.callMiddlewareHook("stopped", [this], { reverse: true });
				})
				.then(() => {
					if (utils_1.isFunction(this.options.stopped)) return this.options.stopped(this);
				})
				.catch(err => {
					/* istanbul ignore next */
					this.logger.error(err);
				})
				.then(() => {
					this.logger.info("ServiceBroker is stopped. Good bye.");
					this.metrics.set(METRIC$b.MOLECULER_BROKER_STARTED, 0);

					this.broadcastLocal("$broker.stopped");

					if (this.options.skipProcessEventRegistration === false) {
						_process.removeListener("beforeExit", this._closeFn);
						_process.removeListener("exit", this._closeFn);
						_process.removeListener("SIGINT", this._closeFn);
						_process.removeListener("SIGTERM", this._closeFn);
					}
				})
				.then(() => {
					return this.loggerFactory.stop();
				})
				.catch(() => {
					// Silent
				});
		}

		/**
		 * Switch the console to REPL mode.
		 *
		 * @example
		 * broker.start().then(() => broker.repl());
		 * @returns
		 */
		repl() {
			let repl;
			try {
				repl = require$$19;
			} catch (error) {
				// eslint-disable-next-line no-console
				console.error(
					"The 'moleculer-repl' package is missing. Please install it with 'npm install moleculer-repl' command."
				);
				this.logger.error(
					"The 'moleculer-repl' package is missing. Please install it with 'npm install moleculer-repl' command."
				);
				this.logger.debug("ERROR", error);
				return;
			}

			if (repl) {
				return repl(this, this.options.replOptions);
			}
		}

		/**
		 * Global error handler.
		 *
		 * @param {Error} err
		 * @param {object} info
		 * @returns
		 * @memberof ServiceBroker
		 */
		errorHandler(err, info) {
			if (this.options.errorHandler) {
				return this.options.errorHandler.call(this, err, info);
			}

			throw err;
		}

		/**
		 * Wrap a method with middlewares
		 *
		 * @param {string} name
		 * @param {Function} handler
		 * @param {any=} bindTo
		 * @param {Object=} opts
		 * @returns {any}
		 *
		 * @memberof ServiceBroker
		 */
		wrapMethod(name, handler, bindTo, opts) {
			return this.middlewares.wrapMethod(name, handler, bindTo, opts);
		}

		/**
		 * Call a handler asynchronously in all middlewares
		 *
		 * @param {String} name
		 * @param {Array<any>} args
		 * @param {Object=} opts
		 * @returns {Promise}
		 *
		 * @memberof ServiceBroker
		 */
		callMiddlewareHook(name, args, opts) {
			return this.middlewares.callHandlers(name, args, opts);
		}

		/**
		 * Call a handler synchronously in all middlewares
		 *
		 * @param {String} name
		 * @param {Array<any>} args
		 * @param {Object=} opts
		 * @returns
		 *
		 * @memberof ServiceBroker
		 */
		callMiddlewareHookSync(name, args, opts) {
			return this.middlewares.callSyncHandlers(name, args, opts);
		}

		/**
		 * Check metrics are enabled.
		 *
		 * @returns {boolean}
		 * @memberof ServiceBroker
		 */
		isMetricsEnabled() {
			return this.metrics.isEnabled();
		}

		/**
		 * Check tracing is enabled.
		 *
		 * @returns {boolean}
		 * @memberof ServiceBroker
		 */
		isTracingEnabled() {
			return this.tracer.isEnabled();
		}

		/**
		 * Get a custom logger for sub-modules (service, transporter, cacher, context...etc)
		 *
		 * @param {String} mod	Name of module
		 * @param {Record<string, any>=} props	Module properties (service name, version, ...etc
		 * @returns {Logger}
		 *
		 * @memberof ServiceBroker
		 */
		getLogger(mod, props) {
			let bindings = Object.assign(
				{
					nodeID: this.nodeID,
					ns: this.namespace,
					mod
				},
				props
			);

			return this.loggerFactory.getLogger(bindings);
		}

		/**
		 * Fatal error. Print the message to console and exit the process (if need)
		 *
		 * @param {String} message
		 * @param {Error=} err
		 * @param {boolean=} [needExit=true]
		 *
		 * @memberof ServiceBroker
		 */
		fatal(message, err, needExit = true) {
			if (this.logger) this.logger.fatal(message, err);
			else console.error(message, err); // eslint-disable-line no-console

			if (needExit) _process.exit(1);
		}

		/**
		 * Load services from a folder
		 *
		 * @param {string} [folder="./services"]		Folder of services
		 * @param {string} [fileMask="**\/*.service.js"]	Service filename mask
		 * @returns	{Number}							Number of found services
		 *
		 * @memberof ServiceBroker
		 */
		loadServices(folder = "./services", fileMask = "**/*.service.js") {
			this.logger.debug(`Search services in '${folder}/${fileMask}'...`);

			let serviceFiles;

			if (Array.isArray(fileMask)) serviceFiles = fileMask.map(f => path__default.join(folder, f));
			else serviceFiles = globSync(folder + "/" + fileMask);

			if (serviceFiles) serviceFiles.forEach(filename => this.loadService(filename));

			return serviceFiles.length;
		}

		/**
		 * Load a service from file
		 *
		 * @param {string} filePath
		 * @returns	{Service}
		 *
		 * @memberof ServiceBroker
		 */
		loadService(filePath) {
			let fName, schema;

			try {
				fName = require.resolve(path__default.resolve(filePath));
				this.logger.debug(`Load service '${path__default.basename(fName)}'...`);

				const r = commonjsRequire(fName);
				schema = r.default != null ? r.default : r;

				let svc;
				schema = this.normalizeSchemaConstructor(schema);
				if (utils_1.isInheritedClass(schema, this.ServiceFactory)) {
					// Service implementation
					// @ts-ignore
					svc = new schema(this);

					// If broker is started, call the started lifecycle event of service
					if (this.started || this.servicesStarting) this._restartService(svc);
				} else if (utils_1.isFunction(schema)) {
					// Function
					svc = schema(this);
					if (!utils_1.isInheritedClass(svc, this.ServiceFactory)) {
						svc = this.createService(svc);
					} else {
						// If broker is started, call the started lifecycle event of service
						if (this.started || this.servicesStarting) this._restartService(svc);
					}
				} else if (schema) {
					// Schema object
					svc = this.createService(schema);
				}

				if (svc) {
					svc.__filename = fName;
				}

				return svc;
			} catch (e) {
				this.logger.error(`Failed to load service '${filePath}'`, e);
				this.broadcastLocal("$broker.error", {
					error: e,
					module: "broker",
					type: constants.FAILED_LOAD_SERVICE
				});
				throw e;
			}
		}

		/**
		 * Create a new service by schema
		 *
		 * @param {ServiceSchema} schema	Schema of service or a Service class
		 * @param {ServiceSchema=} schemaMods	Modified schema
		 * @returns {Service}
		 *
		 * @memberof ServiceBroker
		 */
		createService(schema, schemaMods) {
			/** @type {Service} */
			let service;

			schema = this.normalizeSchemaConstructor(schema);
			if (Object.prototype.isPrototypeOf.call(this.ServiceFactory, schema)) {
				// @ts-ignore
				service = new schema(this, schemaMods);
			} else {
				service = new this.ServiceFactory(this, schema, schemaMods);
			}

			// If broker has began to start its initial services yet, call the started lifecycle event of service
			if (this.started || this.servicesStarting) this._restartService(service);

			return service;
		}

		/**
		 * Restart a hot-reloaded service after creation.
		 *
		 * @param {Service} service
		 * @returns {Promise}
		 * @memberof ServiceBroker
		 */
		_restartService(service) {
			return service._start.call(service).catch(err => {
				this.logger.error("Unable to start service.", err);

				this.broadcastLocal("$broker.error", {
					error: err,
					module: "broker",
					type: constants.FAILED_RESTART_SERVICE
				});
			});
		}

		/**
		 * Add a local service instance
		 *
		 * @param {Service} service
		 * @memberof ServiceBroker
		 */
		addLocalService(service) {
			this.services.push(service);
			this.metrics.set(METRIC$b.MOLECULER_BROKER_LOCAL_SERVICES_TOTAL, this.services.length);
		}

		/**
		 * Register a local service to Service Registry
		 *
		 * @param {ServiceItem} registryItem
		 * @memberof ServiceBroker
		 */
		registerLocalService(registryItem) {
			this.registry.registerLocalService(registryItem);

			return null;
		}

		/**
		 * Destroy a local service
		 *
		 * @param {Service|string|ServiceDependency} service
		 * @returns Promise<void>
		 * @memberof ServiceBroker
		 */
		destroyService(service) {
			let serviceName;
			let serviceVersion;
			/** @type {Service} */
			let svc;
			if (utils_1.isString(service)) {
				serviceName = service;
				svc = this.getLocalService(service);
			} else if (utils_1.isPlainObject(service)) {
				serviceName = service.name;
				serviceVersion = service.version;
				svc = this.getLocalService(service);
			} else {
				svc = service;
			}

			if (!svc) {
				return this.Promise.reject(
					new errors.ServiceNotFoundError({ service: serviceName, version: serviceVersion })
				);
			}

			return this.Promise.resolve()
				.then(() => svc._stop())
				.catch(err => {
					/* istanbul ignore next */
					this.logger.error(`Unable to stop '${svc.fullName}' service.`, err);

					this.broadcastLocal("$broker.error", {
						error: err,
						module: "broker",
						type: constants.FAILED_DESTRUCTION_SERVICE
					});
				})
				.then(() => {
					utils_1.removeFromArray(this.services, svc);
					this.registry.unregisterService(svc.fullName, this.nodeID);

					this.logger.info(`Service '${svc.fullName}' is stopped.`);
					this.servicesChanged(true);

					this.metrics.set(
						METRIC$b.MOLECULER_BROKER_LOCAL_SERVICES_TOTAL,
						this.services.length
					);
				});
		}

		/**
		 * It will be called when a new local or remote service
		 * is registered or unregistered.
		 *
		 * @memberof ServiceBroker
		 */
		servicesChanged(localService = false) {
			this.broadcastLocal("$services.changed", { localService });
			// Should notify remote nodes, because our service list is changed.
			if (localService && this.transit) {
				this.localServiceChanged();
			}
		}

		/**
		 * It's a debounced method to send INFO packets to remote nodes.
		 */
		localServiceChanged() {
			if (!this.stopping) {
				this.registry.discoverer.sendLocalNodeInfo();
			}
		}

		/**
		 * Register internal services
		 * @param {Partial<ServiceSchema>?} opts
		 *
		 * @memberof ServiceBroker
		 */
		registerInternalServices(opts) {
			opts = utils_1.isObject(opts) ? opts : {};
			/** @type {import("./service").ServiceSchema} */
			const internalsSchema = internals();
			// If it's present any custom definition, define it as the root schema and the default one as a mixin
			if (opts["$node"]) {
				const definitiveSchema = opts["$node"];
				if (!definitiveSchema.mixins) definitiveSchema.mixins = [];
				definitiveSchema.mixins.push(internalsSchema);
				this.createService(definitiveSchema);
			} else {
				// Otherwise, just use the default one
				this.createService(internalsSchema);
			}
		}

		/**
		 * Get a local service by name
		 *
		 * Example:
		 * 	getLocalService("v2.posts");
		 * 	getLocalService({ name: "posts", version: 2 });
		 *
		 * @param {String|ServiceDependency} name
		 * @returns {Service}
		 *
		 * @memberof ServiceBroker
		 */
		getLocalService(name) {
			if (utils_1.isString(name)) return this.services.find(service => service.fullName == name);
			else if (utils_1.isPlainObject(name))
				return this.services.find(
					service => service.name == name.name && service.version == name.version
				);
		}

		/**
		 * Wait for other services
		 *
		 * @param {String|Array<String>|ServiceDependency|Array<ServiceDependency>} service
		 * @param {Number=} timeout Timeout in milliseconds
		 * @param {Number=} interval Check interval in milliseconds
		 * @returns {Promise}
		 *
		 * @memberof ServiceBroker
		 */
		waitForServices(
			service,
			timeout = this.options.dependencyTimeout,
			interval = this.options.dependencyInterval,
			logger = this.logger
		) {
			let serviceNames = Array.isArray(service) ? service : [service];

			serviceNames = utils_1.uniq(
				___default.compact(
					serviceNames.map(x => {
						if (utils_1.isPlainObject(x) && x.name) {
							if (Array.isArray(x.version)) {
								return x.version.map(v =>
									this.ServiceFactory.getVersionedFullName(x.name, v)
								);
							} else {
								return this.ServiceFactory.getVersionedFullName(x.name, x.version);
							}
						} else if (utils_1.isString(x)) {
							return x;
						}
					})
				)
			);

			if (serviceNames.length === 0) return this.Promise.resolve({ services: [], statuses: [] });

			logger.info(
				`Waiting for service(s) '${serviceNames
				.map(n => (Array.isArray(n) ? n.join(" OR ") : n))
				.join(", ")}'...`
			);

			const startTime = Date.now();
			return new this.Promise((resolve, reject) => {
				const check = () => {
					const serviceStatuses = serviceNames.map(name => {
						if (Array.isArray(name)) {
							return name.map(n => ({
								name: n,
								available: this.registry.hasService(n)
							}));
						} else {
							return {
								name,
								available: this.registry.hasService(name)
							};
						}
					});
					const flattenedStatuses = ___default.flatMap(serviceStatuses, s => s);
					const names = flattenedStatuses.map(s => s.name);
					const availableServices = flattenedStatuses.filter(s => s.available);

					const isReady = serviceStatuses.every(status =>
						Array.isArray(status) ? status.some(n => n.available) : status.available
					);
					if (isReady) {
						logger.info(
							`Service(s) '${availableServices
							.map(s => s.name)
							.join(", ")}' are available.`
						);
						return resolve({ services: names, statuses: flattenedStatuses });
					}

					const unavailableServices = flattenedStatuses.filter(s => !s.available);
					logger.debug(
						format(
							"%d (%s) of %d services are available. %d (%s) are still unavailable. Waiting further...",
							availableServices.length,
							availableServices.map(s => s.name).join(", "),
							serviceStatuses.length,
							unavailableServices.length,
							unavailableServices.map(s => s.name).join(", ")
						)
					);

					if (timeout && Date.now() - startTime > timeout)
						return reject(
							new errors.MoleculerServerError(
								"Services waiting is timed out.",
								500,
								"WAITFOR_SERVICES",
								{ services: names, statuses: flattenedStatuses }
							)
						);

					timersBrowserify.setTimeout(check, interval);
				};

				check();
			});
		}

		/**
		 * Find the next available endpoint for action
		 *
		 * @param {String |ActionEndpoint} actionName
		 * @param {Object?} opts
		 * @param {Context?} ctx
		 * @returns {ActionEndpoint|E.MoleculerRetryableError}
		 *
		 * @performance-critical
		 * @memberof ServiceBroker
		 */
		findNextActionEndpoint(actionName, opts, ctx) {
			if (typeof actionName !== "string") {
				return actionName;
			} else {
				if (opts && opts.nodeID) {
					const nodeID = opts.nodeID;
					// Direct call
					const endpoint = this.registry.getActionEndpointByNodeId(actionName, nodeID);
					if (!endpoint) {
						this.logger.warn(`Service '${actionName}' is not found on '${nodeID}' node.`);
						return new errors.ServiceNotFoundError({ action: actionName, nodeID });
					}
					return endpoint;
				} else {
					// Get endpoint list by action name
					const epList = this.registry.getActionEndpoints(actionName);
					if (!epList) {
						this.logger.warn(`Service '${actionName}' is not registered.`);
						return new errors.ServiceNotFoundError({ action: actionName });
					}

					// Get the next available endpoint
					const endpoint = epList.next(ctx);
					if (!endpoint) {
						const errMsg = `Service '${actionName}' is not available.`;
						this.logger.warn(errMsg);
						return new errors.ServiceNotAvailableError({ action: actionName });
					}
					return endpoint;
				}
			}
		}

		/**
		 * Call an action
		 *
		 * @param {String} actionName		name of action
		 * @param {Object=} params			params of action
		 * @param {CallingOptions=} opts	options of call (optional)
		 * @returns {Promise}
		 *
		 * @performance-critical
		 * @memberof ServiceBroker
		 */
		call(actionName, params, opts = {}) {
			if (params === undefined) params = {}; // Backward compatibility

			// Create context
			let ctx;
			if (opts.ctx != null) {
				const endpoint = this.findNextActionEndpoint(actionName, opts, opts.ctx);
				if (endpoint instanceof Error) {
					return this.Promise.reject(endpoint).catch(err =>
						this.errorHandler(err, { actionName, params, opts })
					);
				}

				// Reused context
				ctx = opts.ctx;
				ctx.endpoint = endpoint;
				ctx.nodeID = endpoint.id;
				ctx.action = endpoint.action;
				ctx.service = endpoint.action.service;
			} else {
				// New root context
				ctx = this.ContextFactory.create(this, null, params, opts);

				const endpoint = this.findNextActionEndpoint(actionName, opts, ctx);
				if (endpoint instanceof Error) {
					return this.Promise.reject(endpoint).catch(err =>
						this.errorHandler(err, { actionName, params, opts })
					);
				}

				ctx.setEndpoint(endpoint);
			}

			if (ctx.endpoint.local) {
				this.logger.debug("Call action locally.", {
					action: ctx.action.name,
					requestID: ctx.requestID
				});

				// Stream redirection
				if (opts.stream) {
					ctx.stream = opts.stream;
				}
			} else {
				this.logger.debug("Call action on remote node.", {
					action: ctx.action.name,
					nodeID: ctx.nodeID,
					requestID: ctx.requestID
				});
			}

			//this.setCurrentContext(ctx);

			let p = ctx.endpoint.action.handler(ctx);

			// Pointer to Context
			p.ctx = ctx;

			return p;
		}

		/**
		 * Call an action without built-in balancer.
		 * You don't call it directly. Broker will replace the
		 * original 'call' method to this if you disable the
		 * built-in balancer with the "disableBalancer" option.
		 *
		 * @param {String} actionName	name of action
		 * @param {Object=} params		params of action
		 * @param {Object=} opts 		options of call (optional)
		 * @returns {Promise}
		 *
		 * @memberof ServiceBroker
		 */
		callWithoutBalancer(actionName, params, opts = {}) {
			if (params === undefined) params = {}; // Backward compatibility

			let nodeID = null;
			/** @type {ActionEndpoint} */
			let endpoint;
			if (typeof actionName !== "string") {
				endpoint = actionName;
				actionName = endpoint.action.name;
				nodeID = endpoint.id;
			} else {
				if (opts.nodeID) {
					nodeID = opts.nodeID;
					endpoint = this.registry.getActionEndpointByNodeId(actionName, nodeID);
					if (!endpoint) {
						this.logger.warn(`Service '${actionName}' is not found on '${nodeID}' node.`);
						return this.Promise.reject(
							new errors.ServiceNotFoundError({ action: actionName, nodeID })
						).catch(err => this.errorHandler(err, { nodeID, actionName, params, opts }));
					}
				} else {
					// Get endpoint list by action name
					const epList = this.registry.getActionEndpoints(actionName);
					if (epList == null) {
						this.logger.warn(`Service '${actionName}' is not registered.`);
						return this.Promise.reject(
							new errors.ServiceNotFoundError({ action: actionName })
						).catch(err => this.errorHandler(err, { actionName, params, opts }));
					}

					endpoint = epList.getFirst();
					if (endpoint == null) {
						const errMsg = `Service '${actionName}' is not available.`;
						this.logger.warn(errMsg);
						return this.Promise.reject(
							new errors.ServiceNotAvailableError({ action: actionName })
						).catch(err => this.errorHandler(err, { actionName, params, opts }));
					}
				}
			}

			// Create context
			let ctx;
			if (opts.ctx != null) {
				// Reused context
				ctx = opts.ctx;
				if (endpoint) {
					ctx.endpoint = endpoint;
					ctx.action = endpoint.action;
				}
			} else {
				// New root context
				ctx = this.ContextFactory.create(this, endpoint, params, opts);
			}
			ctx.nodeID = nodeID;

			this.logger.debug("Call action on a node.", {
				action: ctx.action.name,
				nodeID: ctx.nodeID,
				requestID: ctx.requestID
			});

			let p = endpoint.action.remoteHandler(ctx);

			// Pointer to Context
			p.ctx = ctx;

			return p;
		}

		/**
		 *
		 * @param {string} actionName
		 * @param {Context=} ctx
		 * @returns
		 */
		_getLocalActionEndpoint(actionName, ctx) {
			// Find action by name
			let epList = this.registry.getActionEndpoints(actionName);
			if (epList == null || !epList.hasLocal()) {
				this.logger.warn(`Service '${actionName}' is not registered locally.`);
				throw new errors.ServiceNotFoundError({ action: actionName, nodeID: this.nodeID });
			}

			// Get local endpoint
			let endpoint = epList.nextLocal(ctx);
			if (!endpoint) {
				this.logger.warn(`Service '${actionName}' is not available locally.`);
				throw new errors.ServiceNotAvailableError({ action: actionName, nodeID: this.nodeID });
			}

			return endpoint;
		}

		/**
		 * @overload
		 * @param {Record<string, MCallDefinition>} def
		 * @param {MCallCallingOptions=} opts
		 * @returns {Promise<Record<string, TResult>>}
		 */
		/**
		 * @overload
		 * @param {MCallDefinition[]} def
		 * @param {MCallCallingOptions=} opts
		 * @returns {Promise<TResult[]>}
		 */
		/**
		 * Multiple action calls.
		 *
		 * @template TResult
		 * @param {Record<string, MCallDefinition>|MCallDefinition[]} def
		 * @param {MCallCallingOptions=} opts
		 * @returns {Promise<Record<string, TResult> | TResult[]>}
		 * @memberof ServiceBroker
		 */
		mcall(def, opts = {}) {
			const { settled, ...options } = opts;
			if (Array.isArray(def)) {
				return /** @type {Promise<TResult[]>} */ (
					utils_1.promiseAllControl(
						def.map(item => this.call(item.action, item.params, item.options || options)),
						settled,
						this.Promise
					)
				);
			} else if (utils_1.isObject(def)) {
				/** @type {Record<string, TResult>} */
				const results = {};
				const promises = Object.keys(def).map(name => {
					const item = def[name];
					const callOptions = item.options || options;
					return this.call(item.action, item.params, callOptions).then(
						res => (results[name] = res)
					);
				});

				const p = utils_1.promiseAllControl(promises, settled, this.Promise);

				// Pointer to Context
				// @ts-ignore
				p.ctx = promises.map(promise => promise.ctx);

				return p.then(() => results);
			} else {
				return this.Promise.reject(
					new errors.MoleculerServerError("Invalid calling definition.", 500, "INVALID_PARAMETERS")
				);
			}
		}

		/**
		 * Emit an event (grouped & balanced global event)
		 *
		 * @param {string} eventName
		 * @param {any=} payload
		 * @param {Object=} opts
		 * @returns {Promise<any>}
		 *
		 * @memberof ServiceBroker
		 */
		emit(eventName, payload, opts) {
			if (Array.isArray(opts) || utils_1.isString(opts)) opts = { groups: opts };
			else if (opts == null) opts = {};

			if (opts.groups && !Array.isArray(opts.groups)) opts.groups = [opts.groups];

			const promises = [];

			const ctx = this.ContextFactory.create(this, null, payload, opts);
			ctx.eventName = eventName;
			ctx.eventType = "emit";
			ctx.eventGroups = opts.groups;

			this.logger.debug(
				`Emit '${eventName}' event` +
					(opts.groups ? ` to '${opts.groups.join(", ")}' group(s)` : "") +
					"."
			);

			// Call local/internal subscribers
			if (/^\$/.test(eventName)) this.localBus.emit(eventName, payload);

			if (!this.options.disableBalancer) {
				const endpoints = this.registry.events.getBalancedEndpoints(
					eventName,
					opts.groups,
					ctx
				);

				// Grouping remote events (reduce the network traffic)
				const groupedEP = {};

				endpoints.forEach(([ep, group]) => {
					if (ep.id === this.nodeID) {
						// Local service, call handler
						const newCtx = ctx.copy(ep);
						promises.push(
							this.registry.events.callEventHandler(newCtx).catch(err => {
								// Catch and log the error because it's a local event handler, not throwing further.
								this.logger.error(err);
							})
						);
					} else {
						// Remote service
						const e = groupedEP[ep.id];
						if (e) e.groups.push(group);
						else
							groupedEP[ep.id] = {
								ep,
								groups: [group]
							};
					}
				});

				if (this.transit) {
					// Remote service
					___default.forIn(groupedEP, item => {
						const newCtx = ctx.copy(item.ep);
						newCtx.eventGroups = item.groups;
						promises.push(this.transit.sendEvent(newCtx));
					});
				}
			} else if (this.transit) {
				// Disabled balancer case
				let groups = opts.groups;

				if (!groups || groups.length === 0) {
					// Apply to all groups
					groups = this.getEventGroups(eventName);
				}

				if (groups.length === 0) return this.Promise.resolve(true);

				ctx.eventGroups = groups;
				promises.push(this.transit.sendEvent(ctx));
			}

			const p = this.Promise.allSettled(promises).then(results => {
				const err = results.find(r => r.status == "rejected");
				if (err) return this.Promise.reject(err.reason);
				return true;
			});

			if (opts.throwError) {
				return p;
			}
			return p.catch(() => {
				// swallow the error. It's already logged.
			});
		}

		/**
		 * Broadcast an event for all local & remote services
		 *
		 * @param {string} eventName
		 * @param {any=} payload
		 * @param {Object=} opts
		 * @returns {Promise}
		 *
		 * @memberof ServiceBroker
		 */
		broadcast(eventName, payload, opts) {
			if (Array.isArray(opts) || utils_1.isString(opts)) opts = { groups: opts };
			else if (opts == null) opts = {};

			if (opts.groups && !Array.isArray(opts.groups)) opts.groups = [opts.groups];

			const promises = [];

			this.logger.debug(
				`Broadcast '${eventName}' event` +
					(opts.groups ? ` to '${opts.groups.join(", ")}' group(s)` : "") +
					"."
			);

			if (this.transit) {
				const ctx = this.ContextFactory.create(this, null, payload, opts);
				ctx.eventName = eventName;
				ctx.eventType = "broadcast";
				ctx.eventGroups = opts.groups;

				if (!this.options.disableBalancer) {
					const endpoints = this.registry.events.getAllEndpoints(eventName, opts.groups);

					// Send to remote services
					endpoints.forEach(ep => {
						if (ep.id != this.nodeID) {
							const newCtx = ctx.copy(ep);
							promises.push(this.transit.sendEvent(newCtx));
						}
					});
				} else {
					// Disabled balancer case
					let groups = opts.groups;

					if (!groups || groups.length === 0) {
						// Apply to all groups
						groups = this.getEventGroups(eventName);
					}

					if (groups.length === 0) return; // Return here because balancer disabled, so we can't call the local services.

					const endpoints = this.registry.events.getAllEndpoints(eventName, groups);

					// Return here because balancer disabled, so we can't call the local services.
					endpoints.forEach(ep => {
						const newCtx = ctx.copy(ep);
						newCtx.eventGroups = groups;
						promises.push(this.transit.sendEvent(newCtx));
					});
				}
			}

			if (!this.options.disableBalancer) {
				// Send to local services
				promises.push(this.broadcastLocal(eventName, payload, opts));
			}

			const p = this.Promise.allSettled(promises).then(results => {
				const err = results.find(r => r.status == "rejected");
				if (err) return this.Promise.reject(err.reason);
				return true;
			});

			if (opts.throwError) {
				return p;
			}
			return p.catch(() => {
				// swallow the error. It's already logged.
			});
		}

		/**
		 * Broadcast an event for all local services
		 *
		 * @param {string} eventName
		 * @param {any=} payload
		 * @param {Object=} opts
		 * @returns
		 *
		 * @memberof ServiceBroker
		 */
		broadcastLocal(eventName, payload, opts) {
			if (Array.isArray(opts) || utils_1.isString(opts)) opts = { groups: opts };
			else if (opts == null) opts = {};

			if (opts.groups && !Array.isArray(opts.groups)) opts.groups = [opts.groups];

			this.logger.debug(
				`Broadcast '${eventName}' local event` +
					(opts.groups ? ` to '${opts.groups.join(", ")}' group(s)` : "") +
					"."
			);

			// Call internal subscribers
			if (/^\$/.test(eventName)) this.localBus.emit(eventName, payload);

			const ctx = this.ContextFactory.create(this, null, payload, opts);
			ctx.eventName = eventName;
			ctx.eventType = "broadcastLocal";
			ctx.eventGroups = opts.groups;

			const p = this.emitLocalServices(ctx);

			if (opts.throwError) {
				return p;
			}

			return p.catch(err => {
				// Catch and log the error because it's a local event handler, not throwing further.
				this.logger.error(err);
			});
		}

		/**
		 * Send ping to a node (or all nodes if nodeID is null)
		 *
		 * @param {String|Array<String>?} nodeID
		 * @param {Number?} timeout
		 * @returns {Promise}
		 * @memberof ServiceBroker
		 */
		ping(nodeID, timeout = 2000) {
			if (this.transit && this.transit.connected) {
				if (utils_1.isString(nodeID)) {
					// Ping a single node
					return new this.Promise(resolve => {
						const timer = timersBrowserify.setTimeout(() => {
							this.localBus.off("$node.pong", handler);
							resolve(null);
						}, timeout);

						const handler = pong => {
							if (pong.nodeID == nodeID) {
								clearTimeout(timer);
								this.localBus.off("$node.pong", handler);
								resolve(pong);
							}
						};

						this.localBus.on("$node.pong", handler);

						this.transit.sendPing(nodeID);
					});
				} else {
					const pongs = {};
					let nodes = nodeID;
					if (!nodes) {
						nodes = this.registry
							.getNodeList({ onlyAvailable: true })
							.filter(node => node.id != this.nodeID)
							.map(node => node.id);
					}

					nodes.forEach(id => (pongs[id] = null));
					const processing = new Set(nodes);

					// Ping multiple nodes
					return new this.Promise(resolve => {
						const timer = timersBrowserify.setTimeout(() => {
							this.localBus.off("$node.pong", handler);
							resolve(pongs);
						}, timeout);

						const handler = pong => {
							pongs[pong.nodeID] = pong;
							processing.delete(pong.nodeID);

							if (processing.size === 0) {
								clearTimeout(timer);
								this.localBus.off("$node.pong", handler);
								resolve(pongs);
							}
						};

						this.localBus.on("$node.pong", handler);

						nodes.forEach(id => this.transit.sendPing(id));
					});
				}
			}

			return this.Promise.resolve(nodeID ? null : []);
		}

		/**
		 * Get local node health status
		 *
		 * @returns {NodeHealthStatus}
		 * @memberof ServiceBroker
		 */
		getHealthStatus() {
			return health.getHealthStatus();
		}

		/**
		 * Get local node info.
		 *
		 * @returns {NodeRawInfo}
		 * @memberof ServiceBroker
		 */
		getLocalNodeInfo() {
			return this.registry.getLocalNodeInfo();
		}

		/**
		 * Get event groups by event name
		 *
		 * @param {String} eventName
		 * @returns
		 * @memberof ServiceBroker
		 */
		getEventGroups(eventName) {
			return this.registry.events.getGroups(eventName);
		}

		/**
		 * Has registered event listener for an event name?
		 *
		 * @param {String} eventName
		 * @returns {boolean}
		 */
		hasEventListener(eventName) {
			return this.registry.events.getAllEndpoints(eventName).length > 0;
		}

		/**
		 * Get all registered event listener for an event name.
		 *
		 * @param {String} eventName
		 * @returns {Array<Object>}
		 */
		getEventListeners(eventName) {
			return this.registry.events.getAllEndpoints(eventName);
		}

		/**
		 * Emit event to local nodes. It is called from transit when a remote event received
		 * or from `broadcastLocal`
		 *
		 * @param {Context} ctx
		 * @returns {Promise<any>}
		 * @memberof ServiceBroker
		 */
		emitLocalServices(ctx) {
			return this.registry.events.emitLocalServices(ctx);
		}

		/**
		 * Set the current Context to the async storage.
		 *
		 * @param {Context} ctx
		 * @memberof ServiceBroker
		 *
		setCurrentContext(ctx) {
			this.scope.setSessionData(ctx);
		}*/

		/**
		 * Get the current Context from the async storage.
		 *
		 * @returns {Context?}
		 * @memberof ServiceBroker
		 *
		getCurrentContext() {
			return this.scope.getSessionData();
		}*/

		/**
		 * Get node overall CPU usage
		 *
		 * @returns {Promise<object>}
		 * @memberof ServiceBroker
		 */
		getCpuUsage() {
			return getCpuUsage();
		}

		/**
		 * Generate an UUID.
		 *
		 * @returns {String} uuid
		 */
		generateUid() {
			if (this.options.uidGenerator) return this.options.uidGenerator.call(this, this);

			return utils_1.generateToken();
		}

		/**
		 * Only for backward compatibility
		 */
		getConstructorName(obj) {
			return utils_1.getConstructorName(obj);
		}

		/**
		 * Ensure the service schema will be prototype of ServiceFactory;
		 *
		 * @param {ServiceSchema} schema
		 * @returns {ServiceSchema}
		 *
		 */
		normalizeSchemaConstructor(schema) {
			if (Object.prototype.isPrototypeOf.call(this.ServiceFactory, schema)) {
				return schema;
			}
			// Sometimes the schame was loaded from another node_module or is a object copy.
			// Then we will check if the constructor name is the same, asume that is a derivate object
			// and adjust the prototype of the schema.
			let serviceName = utils_1.getConstructorName(this.ServiceFactory);
			let target = utils_1.getConstructorName(schema);
			if (serviceName === target) {
				Object.setPrototypeOf(schema, this.ServiceFactory);
				return schema;
			}
			// Depending how the schema was create the correct constructor name (from base class) will be locate on __proto__.
			target = utils_1.getConstructorName(Object.getPrototypeOf(schema));
			if (serviceName === target) {
				Object.setPrototypeOf(Object.getPrototypeOf(schema), this.ServiceFactory);
				return schema;
			}
			// This is just to handle some idiosyncrasies from Jest.
			if (schema._isMockFunction) {
				target = utils_1.getConstructorName(Object.getPrototypeOf(schema.prototype));
				if (serviceName === target) {
					Object.setPrototypeOf(schema, this.ServiceFactory);
					return schema;
				}
			}
			return schema;
		}
	}

	/**
	 * Version of Moleculer
	 */
	ServiceBroker.MOLECULER_VERSION = require$$8.version;
	ServiceBroker.prototype.MOLECULER_VERSION = ServiceBroker.MOLECULER_VERSION;

	/**
	 * Version of Protocol
	 */
	ServiceBroker.PROTOCOL_VERSION = "5";
	ServiceBroker.prototype.PROTOCOL_VERSION = ServiceBroker.PROTOCOL_VERSION;

	/**
	 * Internal middlewares (order)
	 */
	ServiceBroker.INTERNAL_MIDDLEWARES = INTERNAL_MIDDLEWARES;

	/**
	 * Default configuration
	 */
	ServiceBroker.defaultOptions = defaultOptions;

	var serviceBroker = ServiceBroker;

	const {
		CIRCUIT_CLOSE,
		CIRCUIT_HALF_OPEN,
		CIRCUIT_HALF_OPEN_WAIT,
		CIRCUIT_OPEN
	} = constants;

	/**
	 * !!! PLEASE NOTE !!!
	 *
	 * !! If you update this file, don't forget to update the same in the index.mjs file.
	 */

	var moleculer = {
		ServiceBroker: serviceBroker,
		Loggers: loggers,
		Service: service,
		Context: context,

		Cachers: cachers,

		Transporters: transporters,
		Serializers: serializers,
		Strategies: strategies,
		Validators: validators,
		TracerExporters: exporters,
		MetricTypes: types,
		MetricReporters: reporters,
		METRIC: constants$1,

		Transit: transit,

		Registry: registry$2,
		Discoverers: discoverers,

		Middlewares: middlewares,

		Errors: errors,

		Runner: require$$19,
		Utils: utils_1,

		CIRCUIT_CLOSE,
		CIRCUIT_HALF_OPEN,
		CIRCUIT_HALF_OPEN_WAIT,
		CIRCUIT_OPEN,

		MOLECULER_VERSION: serviceBroker.MOLECULER_VERSION,
		PROTOCOL_VERSION: serviceBroker.PROTOCOL_VERSION,
		INTERNAL_MIDDLEWARES: serviceBroker.INTERNAL_MIDDLEWARES
	};

	var src = moleculer;

	return src;

})));
//# sourceMappingURL=moleculer.umd.js.map
