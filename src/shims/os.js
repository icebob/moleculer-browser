const cpus = require('cpus')
const { loadavg } = require('../cpu-usage.js')

module.exports = {
  hostname: () => 'browser',
  type: () => 'Browser',
  platform: () => 'browser',
  arch: () => 'browser',
  release: () => '0.0.0',
  uptime: () => 0,
  cpus,
  loadavg,
  totalmem: () => typeof performance !== 'undefined' && performance.memory ? performance.memory.totalJSHeapSize : 0,
  freemem: () => typeof performance !== 'undefined' && performance.memory ? performance.memory.totalJSHeapSize - performance.memory.usedJSHeapSize : 0,
  networkInterfaces: () => ({})
}
