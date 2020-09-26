import path from 'path'

import json from '@rollup/plugin-json'
import resolve from '@rollup/plugin-node-resolve' // works only with v7.0.0
import commonjs from '@rollup/plugin-commonjs'
import alias from '@rollup/plugin-alias'
import inject from '@rollup/plugin-inject'
import analyze from 'rollup-plugin-analyzer'
import replace from '@rollup/plugin-replace'
import visualizer from 'rollup-plugin-visualizer'
import { terser } from 'rollup-plugin-terser'

import { externalResolve } from './rollup-config/module-resolver'
import { aliasModules, builtInModules } from './rollup-config/moleculer'
import { normalizePath } from './src/utils'

import pkg from './package.json'

const isProduction = process.env.NODE_ENV === 'production'

const moleculerSrcPath = 'node_modules/moleculer/src/**'

const config = async () => {
  const external = await externalResolve(builtInModules)
  console.log('resolve', resolve)

  return {
    input: 'src/index.js',
    output: {
      name: 'Moleculer',
      file: pkg.main,
      format: 'umd',
      sourcemap: true,
      interop: 'auto',
      externalLiveBindings: false
    },
    plugins: [
      // builtins(),

      replace({
        include: moleculerSrcPath,
        'os.cpus': 'require("cpus")',
        'os.loadavg': `require("${normalizePath(path.resolve('src/cpu-usage.js'))}").loadavg`,
        'os.totalmem': '(() => performance ? performance.memory.totalJSHeapSize : 0)',
        'os.freemem': '(() => performance ? performance.memory.totalJSHeapSize - performance.memory.usedJSHeapSize : 0)'
      }),
      replace({
        include: moleculerSrcPath,
        nodejs: 'type: "browser"',
        delimiters: ['type: "', '"']
      }),
      replace({
        include: moleculerSrcPath,
        v8: 'null',
        'gc-stats': 'null',
        'event-loop-stats': 'null',
        kleur: `require("${normalizePath(path.resolve('src/kleur.js'))}")`,
        delimiters: ['require("', '")']
      }),
      // For some reason injecting `process` breaks the sourcemap so we have to replace the `process` keyword.
      /* replace({
        include: moleculerSrcPath,
        exclude: 'node_modules/moleculer/src/metrics/constants.js',
        process: `require('${normalizePath(path.resolve('src/shims/process.js'))}').`,
        delimiters: ['', '.']
      }), */
      alias({ entries: aliasModules }),
      json(),
      resolve({
        preferBuiltins: true,
        resolveOnly: ['moleculer']
      }),
      commonjs({
        requireReturnsDefault: 'auto'
      }),
      inject({
        include: moleculerSrcPath,
        modules: {
          process: normalizePath(path.resolve('src/shims/process.js')),
          setTimeout: normalizePath(path.resolve('src/shims/timeout.js')),
          setInterval: normalizePath(path.resolve('src/shims/interval.js'))
        }
      }),
      isProduction && terser(),
      !isProduction && visualizer({ template: 'treemap' }),
      analyze({ hideDeps: true, limit: 0 })
    ],
    external
  }
}

export default config()
