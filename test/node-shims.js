// Provide browser-compatible shims for Node.js globals and modules
// that moleculer-browser's UMD bundle expects at runtime.

if (typeof globalThis.process === 'undefined') {
  globalThis.process = {
    env: {},
    argv: [],
    pid: 0,
    versions: { node: '20.0.0' },
    cwd: function() { return '/'; },
    hrtime: function(prev) {
      var now = performance.now() * 1e-3;
      var sec = Math.floor(now);
      var nsec = Math.floor((now % 1) * 1e9);
      if (prev) { sec -= prev[0]; nsec -= prev[1]; if (nsec < 0) { sec--; nsec += 1e9; } }
      return [sec, nsec];
    },
    memoryUsage: function() { return { rss: 0, heapTotal: 0, heapUsed: 0, external: 0 }; },
    uptime: function() { return Math.floor(performance.now() / 1000); },
    on: function() { return this; },
    once: function() { return this; },
    off: function() { return this; },
    emit: function() { return this; },
    addListener: function() { return this; },
    removeListener: function() { return this; },
    removeAllListeners: function() { return this; },
    _getActiveHandles: function() { return []; },
    _getActiveRequests: function() { return []; },
    exit: function() {},
    nextTick: function(fn) { Promise.resolve().then(fn); },
    platform: 'browser',
    arch: 'browser',
    release: { name: 'browser' },
    type: 'browser'
  };
}
