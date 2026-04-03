import path from 'path'

import { aliasResolve } from './module-resolver'

import { normalizePath } from '../src/utils'

const moleculerModules = (paths, namespace = '') => {
  const fullPaths = paths.map(pathname => normalizePath(path.resolve(`node_modules/moleculer/src/${namespace}/${pathname}`)))
  return [
    ...paths,
    ...fullPaths
  ]
}

const builtInModules = [
  'moleculer',
  'moleculer-repl',
  'eventemitter2',
  'lru-cache',
  'fastest-validator'
]

const transporters = moleculerModules([
  './amqp',
  './amqp10',
  './kafka',
  './mqtt',
  './nats',
  './redis',
  './tcp'
], 'transporters')

const cachers = moleculerModules([
  './redis'
], 'cachers')

const Discoverers = moleculerModules([
  './etcd3',
  './redis'
], 'registry/discoverers')

const strategies = moleculerModules([
  './cpu-usage'
], 'strategies')

const serializers = moleculerModules([
  './msgpack',
  './notepack',
  './cbor'
], 'serializers')

const MetricReporters = moleculerModules([
  './csv',
  './datadog',
  './prometheus',
  './statsd'
], 'metrics/reporters')

const TracingExporters = moleculerModules([
  './datadog',
  './datadog-simple',
  './jaeger',
  './newrelic',
  './zipkin'
], 'tracing/exporters')

const Middlewares = moleculerModules([
  './hot-reload',
  './transmit/compression',
  './transmit/encryption',
  './debugging/action-logger',
  './debugging/transit-logger'
], 'middlewares')

const Loggers = moleculerModules([
  './bunyan',
  './datadog',
  './debug',
  './file',
  './formatted',
  './log4js',
  './pino',
  './winston'
], 'loggers')

let aliasModules = aliasResolve([
  ...transporters,
  ...cachers,
  ...strategies,
  ...Loggers,
  ...Discoverers,
  ...MetricReporters,
  ...TracingExporters,
  ...Middlewares,
  './src/runner',
  normalizePath(path.resolve('node_modules/moleculer/src/runner.js')),
  'moleculer-repl'
], 'src/fallback/non-compatible.js')

aliasModules = aliasResolve([
  ...serializers
], 'src/fallback/unloaded-serializer.js', aliasModules)

aliasModules['./cpu-usage'] = normalizePath(path.resolve('src/cpu-usage.js'))
// aliasModules['./logger'] = normalizePath(path.resolve('src/logger.js'))

// Force lru-cache to use the top-level v7 (Rollup 2.x can't parse v11's private class fields)
aliasModules['lru-cache'] = normalizePath(path.resolve('node_modules/lru-cache/index.js'))

// console.log('Alias modules', aliasModules)

export {
  aliasModules,

  builtInModules
}
